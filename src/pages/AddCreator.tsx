import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import './AddCreator.css';

export default function AddCreator() {
    const [name, setName] = useState('');
    const maxNameLength = 30;
    const [description, setDescription] = useState('');
    const maxDescriptionLength = 250;
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');
    const [urlError, setUrlError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setImageUrlError('');
        if (imageUrl && !imageUrl.startsWith('https://')) {
            setImageUrlError('Image URL must start with https://');
            return;
        }
        setLoading(true);
        const { error } = await supabase.from('creators').insert([
            {
                name,
                description,
                url,
                image_url: imageUrl || null,
            },
        ]);
        setLoading(false);
        if (error) {
            setError('Failed to add creator.');
        } else {
            navigate('/', { replace: true });
        }
    }

    return (
        <div className="add-creator-page">
            <div className="add-creator-form-container">
                <h2 className="add-creator-title">Add a Creator</h2>
                <form className="add-creator-form" onSubmit={handleSubmit}>
                    <label>
                        <p className="add-creator-label">Name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={e => {
                                if (e.target.value.length <= maxNameLength) {
                                    setName(e.target.value);
                                }
                            }}
                            maxLength={maxNameLength}
                            required
                        />
                        <div className="char-count">
                            {name.length} / {maxNameLength} characters
                        </div>
                    </label>
                    <label>
                        <p className="add-creator-label">Description</p>
                        <textarea
                            value={description}
                            onChange={e => {
                                if (e.target.value.length <= maxDescriptionLength) {
                                    setDescription(e.target.value);
                                }
                            }}
                            maxLength={maxDescriptionLength}
                            required
                        />
                        <div className="char-count">
                            {description.length} / {maxDescriptionLength} characters
                        </div>
                    </label>
                    <label>
                        <p className="add-creator-label">URL to their channel/page</p>
                        <input
                            type="url"
                            value={url}
                            onChange={e => {
                                setUrl(e.target.value);
                                if (e.target.value && !e.target.value.startsWith('https://')) {
                                    setUrlError('URL must start with https://');
                                } else {
                                    setUrlError('');
                                }
                            }}
                        />
                        {urlError && <div className="form-error">{urlError}</div>}
                    </label>
                    <label>
                        <p className="add-creator-label">Image URL (optional)</p>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={e => {
                                setImageUrl(e.target.value);
                                if (e.target.value && !e.target.value.startsWith('https://')) {
                                    setImageUrlError('Image URL must start with https://');
                                } else {
                                    setImageUrlError('');
                                }
                            }}
                        />
                        {imageUrlError && <div className="form-error">{imageUrlError}</div>}
                    </label>
                    {error && <div className="form-error">{error}</div>}
                    <button className="btn add-creator-btn" type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}
