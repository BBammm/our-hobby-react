'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

interface Hobby {
  name: string
  image: string
}

const hobbies: Hobby[] = [
  { name: '등산', image: '/images/home-popular-hiking.png' },
  { name: '볼링', image: '/images/home-popular-bowling.png' },
  { name: '보드게임', image: '/images/home-popular-game.png' },
  { name: '테니스', image: '/images/home-popular-tennis.png' },
  { name: '요가', image: '/images/home-popular-yoga.png' },
  { name: '댄스', image: '/images/home-popular-dance.png' },
]

export default function PopularHobbies() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slides: {
      perView: 6,
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
        <h2 className="text-lg font-bold mb-4 text-gray-800">추천 취미 장르</h2>
        <div ref={sliderRef} className="keen-slider">
          {hobbies.map((hobby, index) => (
            <a
            key={index}
            href={`/search?hobby=${encodeURIComponent(hobby.name)}`}
            className="keen-slider__slide rounded-lg p-4 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition hover:brightness-95"
            >
              <img
                src={hobby.image}
                alt={hobby.name}
                className="h-24 w-24 object-cover mb-2"
              />
              <span className="text-sm font-medium text-gray-600">{hobby.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}