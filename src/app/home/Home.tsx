import styles from './Home.module.scss';
import { SearchSection } from "./components/SearchSection/SearchSection";


export interface HomeProps {
  prop?: string;
}

export default function Home() {
  return (
    <>
      <SearchSection />
      <main className={`bg-yellow-100 p-4 rounded-lg ${styles.test}`}>
        <h2>인기 숙소</h2>
        {/* 카드 컴포넌트 리스트도 여기에 추가할 수 있음 */}
      </main>
    </>
  );
}