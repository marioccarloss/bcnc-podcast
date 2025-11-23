import { AppLink } from '@/infrastructure/ui/components/common/app-link';
import Image from 'next/image';
import { Podcast } from '@/domain/models/podcast';
import './podcast-detail-sidebar.css';

interface PodcastDetailSidebarProps {
  podcast: Podcast;
}

export function PodcastDetailSidebar({ podcast }: PodcastDetailSidebarProps) {
  return (
    <aside className="podcast-sidebar">
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
          <h2 className="podcast-sidebar__title">{podcast.title}</h2>
        </AppLink>
        <AppLink href={`/podcast/${podcast.id}`} className="podcast-sidebar__link">
          <p className="podcast-sidebar__author">by {podcast.author}</p>
        </AppLink>
      </div>
      <div className="podcast-sidebar__description">
        <h3 className="podcast-sidebar__description-title">Description:</h3>
        <p className="podcast-sidebar__description-text">{podcast.summary}</p>
      </div>
    </aside>
  );
}
