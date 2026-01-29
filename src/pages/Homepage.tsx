import CreatorCard from '../components/CreatorCard';
import type { Creator } from '../utils/types';
import './Homepage.css';

type HomepageProps = {
  creators: Creator[];
};

function checkCreators(creators: Creator[] | null | undefined): boolean {
  return Array.isArray(creators) && creators.length > 0;
}

export default function Homepage({ creators }: HomepageProps) {
  return (
    <div>
      <h1>Creatorverse</h1>
      <div className="creator-cards-container">
        {checkCreators(creators) ? (creators.map((creator: Creator) => (
          <CreatorCard
            key={creator.id}
            name={creator.name}
            bio={creator.description}
            link={creator.url}
            imageUrl={creator.image_url ?? undefined}
          />
        ))) : (<p>No creators yet, add one above!</p>)}
      </div>
    </div>
  );
}
