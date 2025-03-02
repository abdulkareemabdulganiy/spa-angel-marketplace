import { useState } from 'react';
import { activateSell } from '../../services/productData';
import { RiDeviceRecoverFill } from 'react-icons/ri';

function DisabledCard({ params, history }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        activateSell(params._id)
            .then(res => {
                history(`/categories/${params.category}/${params._id}/details`);
                setShow(false);
            })
            .catch(err => console.log(err));
    };

    const handleBackdropClick = (e) => {
        // Close modal if the backdrop (the parent div) is clicked directly
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className="disabled-card">
            <div className="bg-background-secondary rounded-lg shadow-md overflow-hidden mb-8 border border-background-tertiary opacity-75 grayscale flex flex-col h-full">
                <div className="relative">
                    <img 
                        className="w-full h-48 object-cover" 
                        src={params.image} 
                        alt={params.title} 
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-text-primary line-clamp-2 h-14">{params.title}</h3>
                    <p className="text-right font-bold text-accent-primary mt-auto">{(params.price).toFixed(2)}€</p>
                </div>
                <div className="px-4 py-3 bg-background-tertiary text-right text-sm text-text-muted flex justify-between items-center">
                    <span>
                        {params.addedAt} - {params.city}
                    </span>
                    <span 
                        className="text-2xl cursor-pointer text-accent-primary hover:text-accent-secondary transition-colors duration-300" 
                        onClick={handleShow}
                    >
                        <RiDeviceRecoverFill />
                    </span>
                </div>
            </div>

            {show && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <div className="bg-background-secondary rounded-lg shadow-lg w-full max-w-md border border-background-tertiary">
                        <div className="flex justify-between items-center p-4 border-b border-background-tertiary">
                            <h3 className="text-lg font-semibold text-text-primary">Are you sure you want to make this item active?</h3>
                            <button 
                                className="text-text-muted hover:text-accent-tertiary transition-colors duration-300"
                                onClick={handleClose}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="p-4 text-text-secondary">
                            <p>
                                By clicking <strong className="text-accent-primary">Make Active</strong>, this sell will change
                                it's status to <strong className="text-accent-primary">Active</strong>,
                                which means that everyone on this Web site will see it.
                            </p>
                        </div>
                        
                        <div className="flex justify-end p-4 border-t border-background-tertiary">
                            <button 
                                className="bg-background-tertiary hover:bg-background text-text-primary font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            <button 
                                className="bg-success hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                onClick={handleSubmit}
                            >
                                Make Active
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DisabledCard;