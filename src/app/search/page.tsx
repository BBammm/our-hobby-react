'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
  Circle,
} from '@react-google-maps/api'

interface Hobby {
  _id: string
  name: string
  description: string
  location: {
    type: string
    coordinates: [number, number]
    address: string
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [hoveredHobbyId, setHoveredHobbyId] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null)
  const [radius, setRadius] = useState(3000)
  const mapRef = useRef<google.maps.Map | null>(null)
  const initialCenterRef = useRef<{ lat: number; lng: number }>({ lat: 37.5665, lng: 126.9780 }) // 기본값: 서울

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  const fetchHobbies = async (lat: number, lng: number, radius: number) => {
    try {
      const hobbyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hobbies/search?lat=${lat}&lng=${lng}&radius=${radius}`)
      const hobbyData = await hobbyRes.json()
      if (Array.isArray(hobbyData)) {
        setHobbies(hobbyData)
      } else {
        console.error('서버 응답 오류:', hobbyData)
      }
    } catch (err) {
      console.error('검색 오류:', err)
    }
  }

  useEffect(() => {
    const fetchByQuery = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      const geocodeRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
      )
      const geocodeData = await geocodeRes.json()

      if (geocodeData.status === 'OK' && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].geometry.location
        const newCenter = { lat: location.lat, lng: location.lng }
        initialCenterRef.current = newCenter
        setMapCenter(newCenter)
        fetchHobbies(newCenter.lat, newCenter.lng, radius)
      }
    }

    const fetchByGeo = () => {
      if (!navigator.geolocation) return
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          const newCenter = { lat: latitude, lng: longitude }
          initialCenterRef.current = newCenter
          setMapCenter(newCenter)
          fetchHobbies(latitude, longitude, radius)
        },
        (err) => {
          console.error('위치 접근 거부:', err)
        }
      )
    }

    if (query) {
      fetchByQuery()
    } else {
      fetchByGeo()
    }
  }, [query])

  const handleMapIdle = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter()
      if (newCenter) {
        setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() })
      }
    }
  }

  const increaseRadius = () => {
    setRadius((prev) => Math.min(prev + 1000, 10000))
  }

  const decreaseRadius = () => {
    setRadius((prev) => Math.max(prev - 1000, 3000))
  }

  if (!isLoaded || !mapCenter) return <div>Loading Map...</div>

  return (
    <div className="w-screen h-screen relative">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={initialCenterRef.current}
        zoom={13}
        onLoad={(map) => {
          mapRef.current = map
        }}
        onIdle={handleMapIdle}
        options={{
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
          disableDefaultUI: true,
        }}
      >
        <Circle
          center={mapCenter}
          radius={radius}
          options={{
            strokeColor: '#3B82F6',
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: '#93C5FD',
            fillOpacity: 0.25,
          }}
        />

        {hobbies.map((hobby) => {
          const [lng, lat] = hobby.location.coordinates
          return (
            <Marker
              key={hobby._id}
              position={{ lat, lng }}
              onMouseOver={() => setHoveredHobbyId(hobby._id)}
              onMouseOut={() => setHoveredHobbyId(null)}
              onClick={() => {
                window.location.href = `/hobbies/${hobby._id}`
              }}
            >
              {hoveredHobbyId === hobby._id && (
                <InfoWindow position={{ lat, lng }} options={{ disableAutoPan: true }}>
                  <div className="p-1 rounded-lg shadow-lg bg-white w-36">
                    <h3 className="text-sm font-semibold text-gray-800">{hobby.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{hobby.description}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          )
        })}
      </GoogleMap>

      <button
        className="absolute top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition"
        onClick={() => fetchHobbies(mapCenter.lat, mapCenter.lng, radius)}
      >
        이 지역으로 검색하기
      </button>

      <div className="absolute top-5 right-4 z-10 flex flex-col items-center gap-2">
        <button
          onClick={increaseRadius}
          className="bg-white border border-gray-300 rounded-full shadow w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        >
          ⬆️
        </button>
        <span className="text-sm text-gray-700 bg-white px-2 py-1 rounded shadow">
          반경 {radius / 1000}km
        </span>
        <button
          onClick={decreaseRadius}
          className="bg-white border border-gray-300 rounded-full shadow w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        >
          ⬇️
        </button>
      </div>
    </div>
  )
}