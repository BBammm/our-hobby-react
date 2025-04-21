'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

interface Hobby {
  name: string
  image: string
}

const hobbies: Hobby[] = [
  { name: '등산', image: '/images/hobby-hiking.png' },
  { name: '볼링', image: '/images/hobby-bowling.png' },
  { name: '보드게임', image: '/images/hobby-boardgame.png' },
  { name: '테니스', image: '/images/hobby-tennis.png' },
  { name: '요가', image: '/images/hobby-yoga.png' },
  { name: '댄스', image: '/images/hobby-dance.png' },
]

export default function PopularHobbies() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slides: {
      perView: 4,
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

  return (
    <section className="w-full px-4 py-6 flex justify-center">
      <div className='w-full max-w-[1200px]'>
        <h2 className="text-lg font-bold mb-4">추천 취미 장르</h2>
        <div ref={sliderRef} className="keen-slider">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="keen-slider__slide bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center"
            >
              <img
                src={hobby.image}
                alt={hobby.name}
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <span className="text-sm font-medium text-gray-800">{hobby.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}