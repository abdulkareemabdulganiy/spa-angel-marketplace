import { useState } from 'react';
import ActiveSells from './Sells/ActiveSells';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { FaSellsy } from 'react-icons/fa';
import { RiMessage3Fill } from 'react-icons/ri';
import { createChatRoom } from '../../services/messagesData';

function SellerProfile({ params, history }) {
    const [showMsg, setShowMsg] = useState(false);
    const [message, setMessage] = useState("");

    const handleMsgChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    };

    const onMsgSent = (e) => {
        e.preventDefault();
        createChatRoom(params._id, message)
            .then((res) => {
                history(`/messages`);
            })
            .catch(err => console.log(err));
    };

    const handleBackdropClick = (e) => {
        // Close modal if the backdrop (the parent div) is clicked directly
        if (e.target === e.currentTarget) {
            setShowMsg(false);
        }
    };

    return (
        <>
            <div id="profile-head" className="bg-gradient-to-b from-background-secondary to-background-tertiary py-6 mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="flex-shrink-0 text-center md:text-left">
                            <img 
                                id="avatar" 
                                alt="avatar" 
                                src={params.avatar} 
                                className="w-36 h-36 rounded-full object-cover mx-auto md:mx-0"
                            />
                        </div>
                        <div className="flex-grow space-y-2">
                            <p className="flex items-center justify-center md:justify-start">
                                <BsFillPersonFill className="mr-2 text-accent-primary" /> {params.name}
                            </p>
                            <p className="flex items-center justify-center md:justify-start">
                                <MdEmail className="mr-2 text-accent-secondary" /> {params.email}
                            </p>
                            <p className="flex items-center justify-center md:justify-start">
                                <MdPhoneAndroid className="mr-2 text-accent-tertiary" /> {params.phoneNumber}
                            </p>
                            <p className="flex items-center justify-center md:justify-start">
                                <FaSellsy className="mr-2 text-accent-primary" /> {params.totalSells} sells in total
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                className="bg-accent-primary hover:bg-accent-secondary text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-300"
                                onClick={() => setShowMsg(true)}
                            >
                                <RiMessage3Fill className="mr-2" />Contact Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto px-4">
                <ActiveSells params={params} />
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
                                onClick={() => setShowMsg(false)}
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
                                onClick={() => setShowMsg(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SellerProfile;