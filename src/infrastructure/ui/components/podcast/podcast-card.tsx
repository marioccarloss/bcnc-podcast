import { AppLink } from '@/infrastructure/ui/components/common/app-link';
import Image from 'next/image';
import { Podcast } from '@/domain/models/podcast';
import './podcast-card.css';

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <AppLink href={`/podcast/${podcast.id}`} className="podcast-card">
      <div className="podcast-card__image-container">
        <Image
          src={podcast.image}
          alt={podcast.title}
          className="podcast-card__image"
          width={80}
          height={80}
          unoptimized
        />
      </div>
      <div className="podcast-card__content">
        <h3 className="podcast-card__title">{podcast.title.toUpperCase()}</h3>
        <p className="podcast-card__author">Author: {podcast.author}</p>
      </div>
    </AppLink>
  );
}
