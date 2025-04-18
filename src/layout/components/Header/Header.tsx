import React from 'react';

import styles from './Header.module.scss';

export interface HeaderProps {
  prop?: string;
}

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>OUR HOBBY</div>
      <div className={styles.auth}>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </header>
  );
}