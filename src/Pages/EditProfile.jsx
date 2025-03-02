import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActiveSells from '../components/Profile/Sells/ActiveSells';
import { getUser, editUserProfile } from '../services/userData';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { AiFillCloseSquare } from 'react-icons/ai';

function EditProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", phoneNumber: "", email: "", avatar: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [alertShow, setAlertShow] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUser()
            .then(res => setUser(res.user))
            .catch(err => console.log(err));
    }, [setUser]);

    const handleDiscard = () => { navigate(`/profile/${user._id}`); };
    
    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        if (e.target.files) {
            setUser({ ...user, avatar: e.target.files[0] });
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        let { _id, name, phoneNumber, email, avatar } = user;
        let obj = { name, phoneNumber, email };
        setLoading(true);
        if (typeof avatar == 'object') {
            getBase64(avatar)
                .then((data) => {
                    obj['avatar'] = data;
                    editUserProfile(_id, obj)
                        .then(res => {
                            if (!res.error) {
                                navigate(`/profile/${_id}`);
                            } else {
                                setLoading(false);
                                setError(res.error);
                                setAlertShow(true);
                            }
                        })
                        .catch(err => console.error('edit profile err: ', err));
                })
                .catch(err => console.log('base64 error: ', err));
        } else {
            editUserProfile(_id, obj)
                .then(res => {
                    if (!res.error) {
                        navigate(`/profile/${_id}`);
                    } else {
                        setLoading(false);
                        setError(res.error);
                        setAlertShow(true);
                    }
                })
                .catch(err => console.error('edit profile err: ', err));
        }
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <>
            <div id="profile-head" className="bg-gradient-to-b from-background-secondary to-background-tertiary py-6 mb-8">
                <div className="container mx-auto px-4">
                    <form className="w-full">
                        {alertShow && (
                            <div className="bg-red-900/30 text-red-300 border border-red-800 p-4 mb-4 rounded-md" role="alert">
                                <p>{error}</p>
                                <button 
                                    className="absolute top-0 right-0 p-4 text-red-300 hover:text-red-100"
                                    onClick={() => setAlertShow(false)}
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                        
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="flex-shrink-0 text-center md:text-left">
                                <label htmlFor="file-upload" className="cursor-pointer block">
                                    <img 
                                        id="avatar" 
                                        src={user.avatar} 
                                        alt="user-avatar" 
                                        className="w-36 h-36 rounded-full object-cover mx-auto md:mx-0 hover:opacity-80 transition-opacity duration-300"
                                        title="Click to select a photo"
                                    />
                                </label>
                                <input 
                                    id="file-upload" 
                                    type="file" 
                                    name="avatar" 
                                    className="hidden" 
                                    onChange={handleChanges} 
                                />
                            </div>
                            
                            <div className="flex-grow space-y-4">
                                <div className="flex items-center">
                                    <BsFillPersonFill className="mr-2 text-accent-primary" />
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={user.name} 
                                        onChange={handleChanges} 
                                        className="bg-background-tertiary border border-background rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                        required 
                                    />
                                </div>
                                <div className="flex items-center">
                                    <MdEmail className="mr-2 text-accent-secondary" />
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={user.email} 
                                        onChange={handleChanges} 
                                        className="bg-background-tertiary border border-background rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                        required 
                                    />
                                </div>
                                <div className="flex items-center">
                                    <MdPhoneAndroid className="mr-2 text-accent-tertiary" />
                                    <input 
                                        type="text" 
                                        name="phoneNumber" 
                                        value={user.phoneNumber} 
                                        onChange={handleChanges} 
                                        className="bg-background-tertiary border border-background rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="flex-shrink-0 flex space-x-4 text-3xl">
                                {loading ? (
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary"></div>
                                ) : (
                                    <>
                                        <button 
                                            onClick={handleSave}
                                            className="text-accent-primary hover:text-accent-secondary transition-colors duration-300"
                                            title="Save changes"
                                        >
                                            <TiTick />
                                        </button>
                                        <button 
                                            onClick={handleDiscard}
                                            className="text-accent-tertiary hover:text-red-500 transition-colors duration-300"
                                            title="Discard changes"
                                        >
                                            <AiFillCloseSquare />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/6 border-r border-background-tertiary p-4">
                        <div className="flex flex-col space-y-3">
                            <button 
                                className="py-2 px-4 rounded text-left bg-accent-primary text-white cursor-not-allowed opacity-70"
                                disabled
                            >
                                Active sells
                            </button>
                            <button 
                                className="py-2 px-4 rounded text-left bg-background-tertiary text-text-primary cursor-not-allowed opacity-70"
                                disabled
                            >
                                Archived
                            </button>
                            <button 
                                className="py-2 px-4 rounded text-left bg-background-tertiary text-text-primary cursor-not-allowed opacity-70"
                                disabled
                            >
                                Wishlist
                            </button>
                        </div>
                    </div>
                    <div className="md:w-5/6 opacity-70">
                        <ActiveSells params={user}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfile;