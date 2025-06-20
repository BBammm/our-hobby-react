import Image from "next/image";
import { SearchSection, EventSlider, PopularHobbies } from "../../features/home/components";
import RequireLoginButton from "@/shared/components/RequireLoginButton/RequireLoginButton";

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
    <div>
      <section className="relative w-full min-h-[560px] flex items-center justify-center bg-[#fff4e6] overflow-x-hidden">
        <div className="flex flex-row items-center justify-center w-full max-w-7xl gap-8 px-4">
          <div className="flex flex-col items-center justify-center flex-[1.3]">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 text-center">
              나의 취미 스타일은?<br />혹은 내 취미를 공유해보세요.
            </h2>
            <RequireLoginButton to="/my-hobbies/create">
              취미만들기
            </RequireLoginButton>
          </div>
          {/* 이미지 */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/images/visual_img_1.png"
              alt="비주얼이미지1"
              width={420}
              height={320}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
      <SearchSection />
      <EventSlider slides={events}/>
      <PopularHobbies/>
      <main className={`p-4 rounded-lg`}>
        {/* 카드 컴포넌트 리스트도 여기에 추가할 수 있음 */}
      </main>
    </div>
  );
}