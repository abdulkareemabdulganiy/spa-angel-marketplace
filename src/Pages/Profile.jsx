import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileSection from '../components/Profile/ProfileSection';
import Wishlist from '../components/Profile/Wishlist/Wishlist';
import ActiveSells from '../components/Profile/Sells/ActiveSells';
import ArchivedSells from '../components/Profile/Sells/ArchivedSells';
import SellerProfile from '../components/Profile/SellerProfile';
import { getUserById } from '../services/userData';

import '../components/Profile/Profile.css';

function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [active, setActive] = useState(true);
    const [archived, setArchived] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleActive = () => {
        setActive(true);
        setArchived(false);
        setWishlist(false);
    };

    const handleArchived = () => {
        setActive(false);
        setArchived(true);
        setWishlist(false);
    };

    const handleWish = () => {
        setActive(false);
        setArchived(false);
        setWishlist(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        getUserById(id)
            .then(res => {
                setUser(res.user);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);
   
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
                <p className="ml-4 text-text-secondary">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-medium text-accent-tertiary mb-4">User not found</h2>
                <p className="text-text-secondary mb-8">The user profile you're looking for doesn't exist or has been removed.</p>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-accent-primary hover:bg-accent-secondary text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                    Return to Home
                </button>
            </div>
        );
    }
   
    return (
        <>
            {user.isMe ? (
                <>
                    <ProfileSection params={user} />
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/6 border-r border-background-tertiary p-4">
                                <div className="flex flex-col space-y-3">
                                    <button 
                                        className={`py-2 px-4 rounded text-left ${active ? 'bg-accent-primary text-white' : 'bg-background-tertiary text-text-primary hover:bg-background'}`}
                                        onClick={handleActive}
                                    >
                                        Active sells
                                    </button>
                                    <button 
                                        className={`py-2 px-4 rounded text-left ${archived ? 'bg-accent-primary text-white' : 'bg-background-tertiary text-text-primary hover:bg-background'}`}
                                        onClick={handleArchived}
                                    >
                                        Archived
                                    </button>
                                    <button 
                                        className={`py-2 px-4 rounded text-left ${wishlist ? 'bg-accent-primary text-white' : 'bg-background-tertiary text-text-primary hover:bg-background'}`}
                                        onClick={handleWish}
                                    >
                                        Wishlist
                                    </button>
                                </div>
                            </div>
                            <div className="md:w-5/6">
                                {active && <ActiveSells params={user}/>}
                                {archived && <ArchivedSells history={navigate} />}
                                {wishlist && <Wishlist />}
                            </div>
                        </div>
                    </div>
                </>
            ) : ( 
                <SellerProfile params={user} history={navigate}/>
            )}
        </>
    );
}

export default Profile;