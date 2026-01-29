import { LuLink } from "react-icons/lu";
import './CreatorCard.css';

interface CreatorCardProps {
    name: string;
    bio: string;
    link: string;
    imageUrl: string | undefined;
}

export default function CreatorCard({ name, bio, link, imageUrl }: CreatorCardProps) {

    return (
        <div className="creator-card">
            <div className="creator-image-container">
                <img className="creator-image" src={imageUrl ?? '../assets/default.jpg'} alt={name} />
            </div>
            <h2 className="creator-name">{name}</h2>
            <p className="creator-bio">{bio}</p>
            <a href={link} target="_blank" className="creator-link"><LuLink /> View their channel or page</a>
        </div>
    )
}
