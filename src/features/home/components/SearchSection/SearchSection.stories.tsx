import styles from "./SearchSection.module.scss";

export default function SearchSection() {
  return (
    <section className={styles.searchSection}>
      <h1 className={styles.title}>어디로 여행 가시나요?</h1>
      <input
        type="text"
        placeholder="여행지나 숙소를 검색해보세요"
        className={styles.searchInput}
      />
    </section>
  );
}