import React from 'react';
import Link from 'next/link'

import styles from './CardItem.module.scss';

export interface CardItemProps {
  image: string;
  title: string;
  description: string;
  href?: string
}

export default function CardItem({ image, title, description, href }: CardItemProps) {
  const content = (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
