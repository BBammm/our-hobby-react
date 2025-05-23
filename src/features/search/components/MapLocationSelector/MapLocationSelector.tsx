'use client'

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api'
import { useState, useCallback, useRef } from 'react'

interface Location {
  lat: number
  lng: number
  address: string
}

interface Props {
  onChange: (location: Location) => void
}

const containerStyle = {
  width: '100%',
  height: '400px',
}

const defaultCenter = {
  lat: 37.5665,
  lng: 126.9780, // 서울 중심
}

export default function MapLocationSelector({ onChange }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })

  const [selected, setSelected] = useState<Location | null>(null)
  const [searchText, setSearchText] = useState('')
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        if (!geocoderRef.current) {
          geocoderRef.current = new window.google.maps.Geocoder()
        }

        geocoderRef.current.geocode(
          { location: { lat, lng } },
          (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const address = results[0].formatted_address
              const locationData = { lat, lng, address }
              setSelected(locationData)
              onChange(locationData)
            }
          }
        )
      }
    },
    [onChange]
  )

  const handleSearch = () => {
    if (!geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder()
    }

    geocoderRef.current.geocode(
      { address: searchText },
      (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location
          const lat = loc.lat()
          const lng = loc.lng()
          const address = results[0].formatted_address
          const locationData = { lat, lng, address }
          setSelected(locationData)
          map?.panTo({ lat, lng })
          onChange(locationData)
        }
      }
    )
  }

  if (!isLoaded) return <p>지도를 불러오는 중...</p>

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 placeholder-gray-500"
          placeholder="위치를 입력하세요 (예: 강남역)"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          검색
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selected || defaultCenter}
        zoom={13}
        onClick={onMapClick}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  )
}