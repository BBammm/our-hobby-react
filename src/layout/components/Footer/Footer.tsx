import React from 'react';

import styles from './Footer.module.scss';

export interface FooterProps {
  prop?: string;
}

export default function Footer({prop = 'default value'}: FooterProps) {
  return <div className={styles.Footer}>Footer {prop}</div>;
}
