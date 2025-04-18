import styles from './SearchSection.module.scss';

export interface SearchSectionProps {
  prop?: string;
}

export function SearchSection({prop = 'default value'}: SearchSectionProps) {
  return <div className={styles.SearchSection}>SearchSection {prop}</div>;
}
