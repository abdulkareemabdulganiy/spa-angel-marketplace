import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleSider from '../components/Siders/SimpleSider';
import { getSpecific } from '../services/productData';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdArchive } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md';
import { FaSellsy } from 'react-icons/fa';
import { archiveSell, wishProduct } from '../services/productData';
import { createChatRoom } from '../services/messagesData';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [wish, setWish] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [message, setMessage] = useState("");
   
    useEffect(() => {
        window.scrollTo(0, 0);
        getSpecific(id)
            .then(res => {
                setProduct(res);
                setWish(res.isWished || false);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [id]);

    const onHeartClick = () => {
        wishProduct(id)
            .then(res => {
                setWish(!wish);
            })
            .catch(err => console.log(err));
    };

    const handleMsgChange = (e) => {
        setMessage(e.target.value);
    };

    const onMsgSent = (e) => {
        e.preventDefault();
        createChatRoom(product.sellerId, message)
            .then((res) => {
                navigate(`/messages/${res.messageId}`);
            })
            .catch(err => console.log(err));
    };

    const handleSubmitArchive = (e) => {
        e.preventDefault();
        archiveSell(id)
            .then(res => {
                setShowArchive(false);
                navigate(`/profile/${product.seller}`);
            })
            .catch(err => console.log(err));
    };

    const handleBackdropClick = (e) => {
        // Close modal if the backdrop (the parent div) is clicked directly
        if (e.target === e.currentTarget) {
            setShowMsg(false);
        }
    };

    const handleArchiveBackdropClick = (e) => {
        // Close modal if the backdrop (the parent div) is clicked directly
        if (e.target === e.currentTarget) {
            setShowArchive(false);
        }
    };

    return (
        <>
            <SimpleSider />
            <div className="container mx-auto px-4">
                <h1 className="text-xl font-medium text-white mb-6">Product details</h1>
                {!loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.nav 
                            className="flex py-3 px-5 text-text-secondary bg-background-tertiary rounded-lg mb-5"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Link to="/" className="hover:text-accent-primary transition-colors duration-300">Home</Link>
                            <span className="mx-2">/</span>
                            <Link to={`/categories/${product.category}`} className="hover:text-accent-primary transition-colors duration-300">{product.category}</Link>
                            <span className="mx-2">/</span>
                            <span className="text-text-muted">{product.title}</span>
                        </motion.nav>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <motion.div 
                                className="lg:col-span-2"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="relative group overflow-hidden rounded-lg">
                                    <motion.img 
                                        className="w-full h-auto rounded-lg mb-4 border border-background-tertiary"
                                        src={product.image} 
                                        alt={product.title}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                </div>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-medium text-accent-primary">{product.title}</h2>
                                    
                                    {product.isAuth && (
                                        <motion.span 
                                            className="text-3xl cursor-pointer text-accent-tertiary hover:text-accent-secondary transition-colors duration-300" 
                                            onClick={onHeartClick}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {!wish ? <BsHeart title="Add to Wishlist" /> : <BsHeartFill title="Remove from Wishlist" />}
                                        </motion.span>
                                    )}
                                </div>
                                
                                <motion.div 
                                    className="bg-background-secondary rounded-lg shadow-md p-6 mb-6 border border-background-tertiary"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium mb-2 text-accent-primary">Details</h3>
                                        <p className="text-text-secondary">{product.description}</p>
                                    </div>
                                    <hr className="my-4 border-background-tertiary" />
                                    <p className="text-right text-text-muted">
                                        Product listed at {moment(product.addedAt).format('D MMM YYYY (dddd) HH:mm')}
                                    </p>
                                </motion.div>
                            </motion.div>
                            
                            <motion.div 
                                className="lg:col-span-1"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="bg-background-secondary rounded-lg shadow-md p-6 mb-6 border border-background-tertiary sticky top-24">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium text-accent-primary">Product price</h3>
                                        
                                        {product.isSeller && (
                                            <div className="flex space-x-2">
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                    <Link 
                                                        to={`/categories/${product.category}/${product._id}/edit`}
                                                        className="text-text-secondary hover:text-accent-primary transition-colors duration-300"
                                                        title="Edit the selling"
                                                    >
                                                        <GrEdit className="text-xl filter invert opacity-70 hover:opacity-100" />
                                                    </Link>
                                                </motion.div>
                                                
                                                <motion.span 
                                                    className="text-text-secondary hover:text-accent-tertiary cursor-pointer text-xl transition-colors duration-300"
                                                    onClick={() => setShowArchive(true)}
                                                    title="Archive"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <MdArchive />
                                                </motion.span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {product.price && (
                                        <motion.h1 
                                            className="text-3xl font-bold text-accent-secondary"
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                        >
                                            {(product.price).toFixed(2)}€
                                        </motion.h1>
                                    )}
                                    
                                    {product.isAuth ? (
                                        <>
                                            {!product.isSeller && (
                                                <motion.button 
                                                    className="w-full bg-accent-primary text-white font-bold py-2 px-4 rounded flex items-center justify-center mt-6 hover:bg-accent-secondary transition-colors duration-300 shadow-lg hover:shadow-accent-primary/20"
                                                    onClick={() => setShowMsg(true)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <RiMessage3Fill className="mr-2" />
                                                    Contact seller
                                                </motion.button>
                                            )}
                                            
                                            <Link to={`/profile/${product.sellerId}`} className="block mt-6">
                                                <motion.div 
                                                    className="flex flex-col items-center p-4 bg-background-tertiary rounded-lg border border-background hover:border-accent-primary/30 transition-all duration-300"
                                                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 120, 212, 0.1)' }}
                                                >
                                                    <motion.img 
                                                        className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-accent-primary" 
                                                        src={product.avatar} 
                                                        alt="user-avatar"
                                                        whileHover={{ scale: 1.05 }}
                                                    />
                                                    <p className="flex items-center mb-1 text-text-secondary">
                                                        <BsFillPersonFill className="mr-2 text-accent-primary" /> {product.name}
                                                    </p>
                                                    <p className="flex items-center mb-1 text-text-secondary">
                                                        <MdEmail className="mr-2 text-accent-secondary" /> {product.email}
                                                    </p>
                                                    <p className="flex items-center mb-1 text-text-secondary">
                                                        <MdPhoneAndroid className="mr-2 text-accent-tertiary" /> {product.phoneNumber}
                                                    </p>
                                                    <p className="flex items-center text-text-secondary">
                                                        <FaSellsy className="mr-2 text-accent-primary" /> {product.createdSells} sells in total
                                                    </p>
                                                </motion.div>
                                            </Link>
                                        </>
                                    ) : (
                                        <motion.p 
                                            className="text-center font-bold mt-6 p-4 bg-background-tertiary rounded-lg border border-background"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <Link to="/auth/login" className="text-accent-primary hover:text-accent-secondary transition-colors duration-300">Sign in</Link> now to contact the seller!
                                        </motion.p>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Message Modal */}
                        <AnimatePresence>
                            {showMsg && (
                                <motion.div 
                                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={handleBackdropClick}
                                >
                                    <motion.div 
                                        className="bg-background-secondary rounded-lg shadow-lg w-full max-w-md border border-background-tertiary"
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.9, y: 20 }}
                                    >
                                        <div className="flex justify-between items-center p-4 border-b border-background-tertiary">
                                            <h3 className="text-lg font-medium text-text-primary">Message</h3>
                                            <button 
                                                className="text-text-muted hover:text-accent-tertiary transition-colors duration-300"
                                                onClick={() => setShowMsg(false)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                        
                                        <div className="p-4">
                                            <textarea 
                                                className="w-full bg-background-tertiary border border-background rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary resize-none transition-all duration-300"
                                                rows="3"
                                                value={message}
                                                onChange={handleMsgChange}
                                                placeholder="Write your message here..."
                                                autoFocus
                                            ></textarea>
                                        </div>
                                        
                                        <div className="flex justify-end p-4 border-t border-background-tertiary">
                                            <motion.button 
                                                className="bg-accent-primary hover:bg-accent-secondary text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
                                                onClick={onMsgSent}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                disabled={!message.trim()}
                                            >
                                                Send
                                            </motion.button>
                                            <motion.button 
                                                className="bg-background-tertiary hover:bg-background text-text-primary font-bold py-2 px-4 rounded transition-colors duration-300"
                                                onClick={() => setShowMsg(false)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Close
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {/* Archive Modal */}
                        <AnimatePresence>
                            {showArchive && (
                                <motion.div 
                                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={handleArchiveBackdropClick}
                                >
                                    <motion.div 
                                        className="bg-background-secondary rounded-lg shadow-lg w-full max-w-md border border-background-tertiary"
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.9, y: 20 }}
                                    >
                                        <div className="flex justify-between items-center p-4 border-b border-background-tertiary">
                                            <h3 className="text-lg font-medium text-text-primary">Are you sure you want to archive this item?</h3>
                                            <button 
                                                className="text-text-muted hover:text-accent-tertiary transition-colors duration-300"
                                                onClick={() => setShowArchive(false)}
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
                                            <motion.button 
                                                className="bg-background-tertiary hover:bg-background text-text-primary font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
                                                onClick={() => setShowArchive(false)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Close
                                            </motion.button>
                                            <motion.button 
                                                className="bg-success hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                                onClick={handleSubmitArchive}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Archive
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
                        <p className="mt-4 text-text-muted">Loading product details...</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Details;