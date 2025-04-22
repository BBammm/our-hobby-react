import styles from './Home.module.scss';
import { SearchSection, EventSlider, PopularHobbies } from "./components";

const events = [
  {
    title: '놀라운 특가 등장! 국내여행 오픈런',
    description: '매주 월·목 오전 10시 오픈!',
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg',
  },
  {
    title: '놀라운 특가 등장! 국내여행 오픈런',
    description: '매주 월·목 오전 10시 오픈!',
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg',
  },
  {
    title: '놀라운 특가 등장! 국내여행 오픈런',
    description: '매주 월·목 오전 10시 오픈!',
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg',
  },
  {
    title: '놀라운 특가 등장! 국내여행 오픈런',
    description: '매주 월·목 오전 10시 오픈!',
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg',
  },
  {
    title: '놀라운 특가 등장! 국내여행 오픈런',
    description: '매주 월·목 오전 10시 오픈!',
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg',
  },
]
export interface HomeProps {
  prop?: string;
}

export default function Home() {
  return (
    <>
      <SearchSection />
      <EventSlider slides={events}/>
      <PopularHobbies/>
      <main className={`p-4 rounded-lg`}>
        {/* 카드 컴포넌트 리스트도 여기에 추가할 수 있음 */}
      </main>
    </>
  );
}