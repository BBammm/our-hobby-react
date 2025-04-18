import React from 'react';

import styles from './CardItem.module.scss';

export interface CardItemProps {
  image: string;
  title: string;
  description: string;
}

export function CardItem({image, title, description}: CardItemProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
