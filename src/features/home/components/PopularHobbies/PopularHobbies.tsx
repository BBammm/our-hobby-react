'use client'

import { useEffect, useRef, useState } from 'react'
import KeenSlider from 'keen-slider'
import 'keen-slider/keen-slider.min.css'
import { tagService } from '@/shared/lib/api/tagService'

interface Tag {
  _id: string
  name: string
}

export default function PopularHobbies() {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [sliderInstance, setSliderInstance] = useState<any>(null)

  useEffect(() => {
    const fetchTags = async () => {
      const res: any = await tagService.getAllTags()
      setTags(res)
    }
    fetchTags()
  }, [])

  useEffect(() => {
    if (sliderRef.current && tags.length > 0) {
      const slider = new KeenSlider(sliderRef.current, {
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
      setSliderInstance(slider)

      return () => {
        slider.destroy()
      }
    }
  }, [tags])

  return (
    <section className="w-full px-4 py-6 flex justify-center">
      <div className="w-full max-w-[1200px]">
        <h2 className="text-lg font-bold mb-4 text-gray-800">추천 취미 태그</h2>
        <div ref={sliderRef} className="keen-slider">
          {tags.map((tag) => (
            <a
              key={tag._id}
              href={`/search?tag=${encodeURIComponent(tag.name)}`}
              className="keen-slider__slide shrink-0 basis-[20%] p-4 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition hover:brightness-95"
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