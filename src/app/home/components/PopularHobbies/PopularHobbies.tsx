'use client'

import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { getAllTags } from '@/lib/api/tagService'

interface Tag {
  _id: string
  name: string
}

export default function PopularHobbies() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slides: {
      perView: 5,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 8,
        },
      },
    },
  })

  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    const fetchTags = async () => {
      const res: any = await getAllTags()
      setTags(res)
    }
    fetchTags()
  }, [])

  return (
    <section className="w-full px-4 py-6 flex justify-center">
      <div className="w-full max-w-[1200px]">
        <h2 className="text-lg font-bold mb-4 text-gray-800">추천 취미 태그</h2>
        <div ref={sliderRef} className="keen-slider">
          {tags.map((tag) => (
            <a
              key={tag._id}
              href={`/search?tag=${encodeURIComponent(tag.name)}`}
              className="keen-slider__slide rounded-lg p-4 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition hover:brightness-95"
            >
              <div className="h-24 w-24 bg-blue-100 text-blue-800 font-bold flex items-center justify-center rounded-full text-lg mb-2">
                #{tag.name}
              </div>
              <span className="text-sm font-medium text-gray-600">{tag.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}