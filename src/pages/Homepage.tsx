import CreatorCard from '../components/CreatorCard';
import { useNavigate } from 'react-router-dom';
import type { Creator } from '../utils/types';
import './Homepage.css';

type HomepageProps = {
  creators: Creator[];
};

function checkCreators(creators: Creator[] | null | undefined): boolean {
  return Array.isArray(creators) && creators.length > 0;
}

export default function Homepage({ creators }: HomepageProps) {
  const limitedCreators = creators?.slice(0, 5) ?? [];
  const navigate = useNavigate();
  return (
    <div>
      <div className="buttons-container">
        <button className="btn view-all-creators" onClick={() => navigate('/creators')}>
          View All Creators
        </button>
        <button className="btn add-creator" onClick={() => navigate('/add-creator')}>
          Add a Creator
        </button>
      </div>
      <p className="homepage-subtitle">See 5 Featured Creators Below</p>
      <div className="creator-cards-container">
        {checkCreators(limitedCreators) ? (limitedCreators.map((creator: Creator) => (
          <CreatorCard
            key={creator.id}
            name={creator.name}
            bio={creator.description}
            link={creator.url}
            imageUrl={creator.image_url ?? undefined}
            onClick={() => navigate(`/creator/${creator.id}`)}
          />
        ))) : (<p>No creators yet, add one above!</p>)}
      </div>
    </div>
  );
}
