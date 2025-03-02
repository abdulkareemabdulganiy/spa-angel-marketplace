import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdArchive } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { FaSellsy } from 'react-icons/fa';
import { archiveSell } from '../../../services/productData';
import { createChatRoom } from '../../../services/messagesData';
import './Aside.css';

function Aside({ params, history }) {
    const [showMsg, setShowMdg] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [message, setMessage] = useState("");
    
    const handleClose = () => setShowMdg(false);
    const handleShow = () => setShowMdg(true);

    const handleCloseArchive = () => setShowArchive(false);
    const handleShowArchive = () => setShowArchive(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        archiveSell(params._id)
            .then(res => {
                setShowArchive(false);
                history(`/profile/${params.seller}`);
            })
            .catch(err => console.log(err));
    }

    const handleMsgChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    }
    
    const onMsgSent = (e) => {
        e.preventDefault();
        createChatRoom(params.sellerId, message)
            .then((res) => {
                history(`/messages/${res.messageId}`);
            })
            .catch(err => console.log(err));
    }

    const handleBackdropClick = (e) => {
        // Close modal if the backdrop (the parent div) is clicked directly
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleArchiveBackdropClick = (e) => {
        // Close modal if the backdrop (the parent div) is clicked directly
        if (e.target === e.currentTarget) {
            handleCloseArchive();
        }
    };

    return (
        <aside>
            <div className="product-details-seller">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-accent-primary">Product Price</h4>
                    
                    {params.isSeller && (
                        <div className="flex space-x-2">
                            <Link 
                                to={`/categories/${params.category}/${params._id}/edit`}
                                className="text-text-secondary hover:text-accent-primary transition-colors duration-300"
                                title="Edit the selling"
                            >
                                <GrEdit className="text-xl filter invert opacity-70 hover:opacity-100" />
                            </Link>
                            
                            <span 
                                className="text-text-secondary hover:text-accent-tertiary cursor-pointer text-xl transition-colors duration-300"
                                onClick={handleShowArchive}
                                title="Archive"
                            >
                                <MdArchive />
                            </span>
                        </div>
                    )}
                </div>
                
                {params.price && (
                    <h1 className="text-3xl font-bold text-accent-secondary">{(params.price).toFixed(2)}€</h1>
                )}
                
                {params.isAuth ? (
                    <>
                        {!params.isSeller && (
                            <button 
                                className="w-full bg-accent-primary text-white font-bold py-2 px-4 rounded flex items-center justify-center mt-6 hover:bg-accent-secondary transition-colors duration-300"
                                onClick={handleShow}
                            >
                                <RiMessage3Fill className="mr-2" />
                                Contact Seller
                            </button>
                        )}
                        
                        <Link to={`/profile/${params.sellerId}`} className="block mt-6">
                            <div className="flex flex-col items-center p-4 bg-background-tertiary rounded-lg border border-background">
                                <img 
                                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-accent-primary" 
                                    src={params.avatar} 
                                    alt="user-avatar" 
                                />
                                <p className="flex items-center mb-1 text-text-secondary">
                                    <BsFillPersonFill className="mr-2 text-accent-primary" /> {params.name}
                                </p>
                                <p className="flex items-center mb-1 text-text-secondary">
                                    <MdEmail className="mr-2 text-accent-secondary" /> {params.email}
                                </p>
                                <p className="flex items-center mb-1 text-text-secondary">
                                    <MdPhoneAndroid className="mr-2 text-accent-tertiary" /> {params.phoneNumber}
                                </p>
                                <p className="flex items-center text-text-secondary">
                                    <FaSellsy className="mr-2 text-accent-primary" /> {params.createdSells} sells in total
                                </p>
                            </div>
                        </Link>
                    </>
                ) : (
                    <p className="text-center font-bold mt-6 p-4 bg-background-tertiary rounded-lg border border-background">
                        <Link to="/auth/login" className="text-accent-primary hover:text-accent-secondary transition-colors duration-300">Sign In</Link> now to contact the seller!
                    </p>
                )}
            </div>
            
            {/* Message Modal */}
            {showMsg && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <div className="bg-background-secondary rounded-lg shadow-lg w-full max-w-md border border-background-tertiary">
                        <div className="flex justify-between items-center p-4 border-b border-background-tertiary">
                            <h3 className="text-lg font-semibold text-text-primary">Message</h3>
                            <button 
                                className="text-text-muted hover:text-accent-tertiary transition-colors duration-300"
                                onClick={handleClose}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="p-4">
                            <textarea 
                                className="w-full bg-background-tertiary border border-background rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                rows="3"
                                value={message}
                                onChange={handleMsgChange}
                            ></textarea>
                        </div>
                        
                        <div className="flex justify-end p-4 border-t border-background-tertiary">
                            <button 
                                className="bg-accent-primary hover:bg-accent-secondary text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
                                onClick={onMsgSent}
                            >
                                Send
                            </button>
                            <button 
                                className="bg-background-tertiary hover:bg-background text-text-primary font-bold py-2 px-4 rounded transition-colors duration-300"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Archive Modal */}
            {showArchive && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm"
                    onClick={handleArchiveBackdropClick}
                >
                    <div className="bg-background-secondary rounded-lg shadow-lg w-full max-w-md border border-background-tertiary">
                        <div className="flex justify-between items-center p-4 border-b border-background-tertiary">
                            <h3 className="text-lg font-semibold text-text-primary">Are you sure you want to archive this item?</h3>
                            <button 
                                className="text-text-muted hover:text-accent-tertiary transition-colors duration-300"
                                onClick={handleCloseArchive}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="p-4 text-text-secondary">
                            <p className="mb-4">
                                By clicking <strong className="text-accent-primary">Archive</strong>, this sell will change
                                it's status to <strong className="text-accent-primary">Archived</strong>,
                                which means that no one but you will be able see it.
                                You may want to change the status to <strong className="text-accent-primary">Actived</strong> if you have
                                sold the item or you don't want to sell it anymore.
                            </p>
                            
                            <p>Don't worry, you can unarchive it at any time from Profile - Sells!</p>
                        </div>
                        
                        <div className="flex justify-end p-4 border-t border-background-tertiary">
                            <button 
                                className="bg-background-tertiary hover:bg-background text-text-primary font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
                                onClick={handleCloseArchive}
                            >
                                Close
                            </button>
                            <button 
                                className="bg-success hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                onClick={handleSubmit}
                            >
                                Archive
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Aside;