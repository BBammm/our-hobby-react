import React from 'react';
import Link from 'next/link'

import styles from './CardItem.module.scss';
import Image from 'next/image';

export interface CardItemProps {
  image: string;
  title: string;
  description: string;
  href?: string
}

export default function CardItem({ image, title, description, href }: CardItemProps) {
  const content = (
    <div className="block font-medium mb-1">
      <Image src={image} alt={title} />
      <div className={styles.info}>
        <h3 className='text-gray-600'>{title}</h3>
        <p className='text-gray-400'>{description}</p>
      </div>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
