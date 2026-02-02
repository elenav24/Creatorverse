import { LuLink } from "react-icons/lu";
import './CreatorCard.css';

interface CreatorCardProps {
    name: string;
    bio: string;
    link: string;
    imageUrl: string | undefined;
    onClick?: () => void;
}

export default function CreatorCard({ name, bio, link, imageUrl, onClick }: CreatorCardProps) {
    return (
        <div className="creator-card" onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
            <div className="creator-image-container">
                <img className="creator-image" src={imageUrl ?? '../public/default.jpg'} alt={name} />
            </div>
            <h2 className="creator-name">{name}</h2>
            <p className="creator-bio">{bio}</p>
            <a href={link} target="_blank" className="creator-link" onClick={e => e.stopPropagation()}><LuLink /> View their channel or page</a>
        </div>
    )
}
