import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import type { Creator } from '../utils/types';
import { LuLink } from "react-icons/lu";
import './ViewCreator.css';

export default function ViewCreator() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState<Creator | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCreator() {
            setLoading(true);
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                setError('Creator not found.');
                setCreator(null);
            } else {
                setCreator(data);
            }
            setLoading(false);
        }
        fetchCreator();
    }, [id, navigate]);

    async function handleDelete() {
        if (!window.confirm('Are you sure you want to continue?')) return;
        setLoading(true);
        const { error } = await supabase.from('creators').delete().eq('id', id);
        setLoading(false);
        if (error) {
            setError('Failed to delete creator.');
        } else {
            navigate('/', { replace: true });
        }
    }

    function handleEdit() {
        navigate(`/edit-creator/${id}`);
    }

    if (loading) return <div className="view-creator-container">Loading...</div>;
    if (error) return <div className="view-creator-container form-error">{error}</div>;
    if (!creator) return null;

    return (
        <div className="view-creator-page">
            <div className="view-creator-container">
                <img
                    src={creator.image_url || '../public/default.jpg'}
                    alt={creator.name}
                    className="view-creator-image"
                />
                <h2 className="view-creator-name">{creator.name}</h2>
                <p className="view-creator-description">{creator.description}</p>
                <a href={creator.url} target="_blank" rel="noopener noreferrer" className="view-creator-link">
                    <LuLink/> Visit their channel/page
                </a>
                <div className="view-creator-btns">
                    <button className="btn add-creator-btn" onClick={handleEdit}>Edit</button>
                    <button className="btn add-creator-btn" style={{ background: '#dc2626' }} onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}
