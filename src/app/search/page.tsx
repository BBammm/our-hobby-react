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
    coordinates: [number, number] // [lng, lat]
    address: string
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 37.5665, lng: 126.9780 }) // 기본 서울
  const [hoveredHobbyId, setHoveredHobbyId] = useState<string | null>(null) // ✅ hover 상태 저장

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  useEffect(() => {
    const fetchNearbyHobbies = async () => {
      if (!query) return

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

          if (Array.isArray(hobbyData)) {
            setHobbies(hobbyData)
          } else {
            console.error('서버 응답 오류:', hobbyData)
          }
        } else {
          console.error('주소 변환 실패:', geocodeData.error_message || geocodeData.status)
        }
      } catch (err) {
        console.error('검색 오류:', err)
      }
    }

    fetchNearbyHobbies()
  }, [query])

  if (!isLoaded) {
    return <div>Loading Map...</div>
  }

  return (
    <div className="w-screen h-screen">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={13}
        options={{
          styles: [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
          ],
          disableDefaultUI: true,
        }}
      >
        {hobbies.map((hobby) => {
          const [lng, lat] = hobby.location.coordinates

          return (
            <Marker
              key={hobby._id}
              position={{ lat, lng }}
              onMouseOver={() => setHoveredHobbyId(hobby._id)} // ✅ 마우스 올리면 id 저장
              onMouseOut={() => setHoveredHobbyId(null)} // ✅ 마우스 나가면 초기화
              onClick={() => {
                window.location.href = `/hobbies/${hobby._id}`
              }}
            >
              {hoveredHobbyId === hobby._id && (
                <InfoWindow 
                  position={{ lat, lng }} 
                  options={{ disableAutoPan: true }}
                >
                  <div className="p-1 rounded-lg shadow-lg bg-white w-36">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {hobby.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {hobby.description}
                    </p>
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