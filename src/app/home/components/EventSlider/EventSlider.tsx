'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState } from 'react'
import Image from 'next/image'

interface Slide {
  title: string
  description: string
  image: string
}

export default function EventSlider({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
  })

  return (
    <section className="w-full px-4 py-6 flex justify-center">
      <div className='w-full max-w-[1200px]'>
        <h2 className="text-lg font-bold mb-4 text-gray-800">이벤트</h2>
        <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden text-gray-300">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="keen-slider__slide flex items-center justify-between gap-4 bg-gray-50 px-6 py-6 rounded-xl"
            >
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">{slide.description}</p>
                <h3 className="text-lg font-bold text-gray-600">{slide.title}</h3>
              </div>
              <Image src={slide.image} alt={slide.title} width={20} height={20} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition ${
                currentSlide === idx ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}