import { AppLink } from '@/infrastructure/ui/components/common/app-link';
import { Image, Text, Card } from '@/infrastructure/ui/components/primitives';
import { Podcast } from '@/domain/models/podcast';
import './podcast-detail-sidebar.css';

interface PodcastDetailSidebarProps {
  podcast: Podcast;
}

export function PodcastDetailSidebar({ podcast }: PodcastDetailSidebarProps) {
  return (
    <aside className="podcast-sidebar">
      <Card className="podcast-sidebar__card">
        <AppLink href={`/podcast/${podcast.id}`} className="podcast-sidebar__link">
          <div className="podcast-sidebar__image-container">
            <Image
              src={podcast.image}
              alt={podcast.title}
              className="podcast-sidebar__image"
              width={300}
              height={300}
              priority
              unoptimized
            />
          </div>
        </AppLink>
        <div className="podcast-sidebar__info">
          <AppLink href={`/podcast/${podcast.id}`} className="podcast-sidebar__link">
            <Text as="h2" variant="subheading" className="podcast-sidebar__title">
              {podcast.title}
            </Text>
          </AppLink>
          <AppLink href={`/podcast/${podcast.id}`} className="podcast-sidebar__link">
            <Text as="p" variant="caption" className="podcast-sidebar__author">
              by {podcast.author}
            </Text>
          </AppLink>
        </div>
        <div className="podcast-sidebar__description">
          <Text as="h3" variant="label" className="podcast-sidebar__description-title">
            Description:
          </Text>
          <Text as="p" variant="body" className="podcast-sidebar__description-text">
            {podcast.summary}
          </Text>
        </div>
      </Card>
    </aside>
  );
}
