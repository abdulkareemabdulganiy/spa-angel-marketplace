import { useState, useEffect } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { wishProduct } from '../../../services/productData';
import moment from 'moment';

function ProductInfo({ params }) {
    const [wish, setWish] = useState(false);
    const [activeTab, setActiveTab] = useState('details');

    useEffect(() => {
        if (params.isWished === true) {
            setWish(true);
        } else {
            setWish(false);
        }
    }, [params.isWished, setWish]);

    const onHearthClick = () => {
        if (wish === false) {
            wishProduct(params._id)
                .then(res => {
                    setWish(true);
                })
                .catch(err => console.log(err));
        } else {
            wishProduct(params._id)
                .then(res => {
                    setWish(false);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <>
            <img 
                className="w-full h-auto rounded-lg mb-4 border border-background-tertiary" 
                src={params.image} 
                alt={params.title} 
            />
            
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-accent-primary">{params.title}</h1>
                
                {params.isAuth && (
                    <span 
                        className="text-3xl cursor-pointer text-accent-tertiary hover:text-accent-secondary transition-colors duration-300" 
                        onClick={onHearthClick}
                        title={wish ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        {!wish ? <BsHeart /> : <BsHeartFill />}
                    </span>
                )}
            </div>
            
            <div className="bg-background-secondary rounded-lg shadow-md p-6 mb-6 border border-background-tertiary">
                <div className="border-b border-background-tertiary mb-4">
                    <div className="flex">
                        <button
                            className={`py-2 px-4 border-b-2 ${
                                activeTab === 'details' 
                                    ? 'border-accent-primary text-accent-primary' 
                                    : 'border-transparent text-text-muted hover:text-text-primary'
                            } transition-colors duration-300`}
                            onClick={() => setActiveTab('details')}
                        >
                            Details
                        </button>
                    </div>
                </div>
                
                <div className="mb-4">
                    {activeTab === 'details' && (
                        <>
                            <p className="text-text-secondary">{params.description}</p>
                            <hr className="my-4 border-background-tertiary" />
                            <p className="text-right text-text-muted">
                                Product listed at {moment(params.addedAt).format('D MMM YYYY (dddd) HH:mm')}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductInfo;