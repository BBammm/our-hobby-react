'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api'

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
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.5665, lng: 126.9780 }) // 기본값: 서울
  const [hoveredHobbyId, setHoveredHobbyId] = useState<string | null>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  useEffect(() => {
    const fetchHobbiesByQuery = async (query: string) => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        const geocodeRes = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
        )
        const geocodeData = await geocodeRes.json()

        if (geocodeData.status === 'OK' && geocodeData.results.length > 0) {
          const location = geocodeData.results[0].geometry.location
          setCenter({ lat: location.lat, lng: location.lng })

          const hobbyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hobbies/search?lat=${location.lat}&lng=${location.lng}`)
          const hobbyData = await hobbyRes.json()
          if (Array.isArray(hobbyData)) setHobbies(hobbyData)
        }
      } catch (err) {
        console.error('주소 기반 검색 오류:', err)
      }
    }

    const fetchHobbiesByGeolocation = () => {
      if (!navigator.geolocation) {
        console.warn('위치 정보 접근이 불가능한 브라우저입니다.')
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setCenter({ lat: latitude, lng: longitude })

          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hobbies/search?lat=${latitude}&lng=${longitude}`)
            const data = await res.json()
            if (Array.isArray(data)) setHobbies(data)
          } catch (err) {
            console.error('위치 기반 검색 오류:', err)
          }
        },
        (err) => {
          console.error('위치 접근 거부:', err)
        }
      )
    }

    if (query) {
      fetchHobbiesByQuery(query)
    } else {
      fetchHobbiesByGeolocation()
    }
  }, [query])

  if (!isLoaded) return <div>Loading Map...</div>

  return (
    <div className="w-screen h-screen">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={13}
        options={{
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
          disableDefaultUI: true,
        }}
      >
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
    </div>
  )
}