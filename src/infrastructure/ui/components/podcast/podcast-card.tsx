import { AppLink } from '@/infrastructure/ui/components/common/app-link';
import { Card, Image, Text } from '@/infrastructure/ui/components/primitives';
import { Podcast } from '@/domain/models/podcast';
import './podcast-card.css';

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <AppLink href={`/podcast/${podcast.id}`} className="podcast-card-link">
      <Card className="podcast-card">
        <div className="podcast-card__image-container">
          <Image
            src={podcast.image}
            alt={podcast.title}
            width={80}
            height={80}
            className="podcast-card__image"
            variant="circle"
            unoptimized
          />
        </div>
        <div className="podcast-card__content">
          <Text as="h2" variant="subheading" className="podcast-card__title">
            {podcast.title.toUpperCase()}
          </Text>
          <Text as="p" variant="caption" className="podcast-card__author">
            Author: {podcast.author}
          </Text>
        </div>
      </Card>
    </AppLink>
  );
}
