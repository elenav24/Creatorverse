import CreatorCard from '../components/CreatorCard';
import type { Creator } from '../utils/types';
import './Homepage.css';

interface ShowCreatorsProps {
  creators: Creator[];
}

export default function ShowCreators({ creators }: ShowCreatorsProps) {
  return (
    <div>
      <h1>All Creators</h1>
      <div className="creator-cards-container">
        {creators && creators.length > 0 ? (
          creators.map((creator: Creator) => (
            <CreatorCard
              key={creator.id}
              name={creator.name}
              bio={creator.description}
              link={creator.url}
              imageUrl={creator.image_url ?? undefined}
            />
          ))
        ) : (
          <p>No creators yet, add one above!</p>
        )}
      </div>
    </div>
  );
}
