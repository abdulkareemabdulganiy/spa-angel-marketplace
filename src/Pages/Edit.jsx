import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleSider from '../components/SimpleSider/SimpleSider';
import { getSpecific, editProduct } from '../services/productData';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getSpecific(id)
            .then(res => setProduct(res))
            .catch(err => console.log(err));
    }, [id]);

    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value });
        if (e.target.files) {
            setProduct({ ...product, image: e.target.files[0] });
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let { _id, title, price, description, city, category, image } = product;
        let obj = { title, price, description, city, category };
        setLoading(true);
        if (typeof image == 'object') {
            getBase64(image)
                .then((data) => {
                    obj['image'] = data;
                    editProduct(_id, obj)
                        .then(res => {
                            if (!res.error) {
                                navigate(`/categories/${category}/${_id}/details`);
                            } else {
                                setLoading(false);
                                setError(res.error);
                                setAlertShow(true);
                            }
                        })
                        .catch(err => console.error('edit product err: ', err));
                })
                .catch(err => console.log('base64 error: ', err));
        } else {
            editProduct(_id, obj)
                .then(res => {
                    if (!res.error) {
                        navigate(`/categories/${category}/${_id}/details`);
                    } else {
                        setLoading(false);
                        setError(res.error);
                        setAlertShow(true);
                    }
                })
                .catch(err => console.error('edit product err: ', err));
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
            <SimpleSider params="Edit product" />
            <div className="container mx-auto px-4">
                <form className="max-w-4xl mx-auto" onSubmit={onSubmitHandler}>
                    {alertShow && (
                        <div className="bg-red-900/30 text-red-300 border border-red-800 p-4 mb-4 rounded-md" role="alert">
                            <span className="block sm:inline">{error}</span>
                            <button 
                                className="absolute top-0 right-0 p-4 text-red-300 hover:text-red-100"
                                onClick={() => setAlertShow(false)}
                            >
                                &times;
                            </button>
                        </div>
                    )}
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block text-sm font-medium text-text-secondary mb-1" htmlFor="title">
                                Title
                            </label>
                            <input 
                                className="block w-full px-3 py-2 bg-background-secondary border border-background-tertiary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                id="title" 
                                type="text" 
                                name="title" 
                                value={product.title || ''} 
                                onChange={onChangeHandler} 
                                required 
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block text-sm font-medium text-text-secondary mb-1" htmlFor="price">
                                Price
                            </label>
                            <input 
                                className="block w-full px-3 py-2 bg-background-secondary border border-background-tertiary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                id="price" 
                                type="number" 
                                step="0.01" 
                                name="price" 
                                value={product.price || ''} 
                                onChange={onChangeHandler} 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-text-secondary mb-1" htmlFor="description">
                            Description
                        </label>
                        <textarea 
                            className="block w-full px-3 py-2 bg-background-secondary border border-background-tertiary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                            id="description" 
                            name="description" 
                            rows="3" 
                            defaultValue={product.description} 
                            onChange={onChangeHandler} 
                            required
                        ></textarea>
                    </div>
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block text-sm font-medium text-text-secondary mb-1" htmlFor="city">
                                City
                            </label>
                            <input 
                                className="block w-full px-3 py-2 bg-background-secondary border border-background-tertiary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                id="city" 
                                type="text" 
                                name="city" 
                                value={product.city || ''} 
                                onChange={onChangeHandler} 
                                required 
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block text-sm font-medium text-text-secondary mb-1" htmlFor="category">
                                Category
                            </label>
                            <select 
                                className="block w-full px-3 py-2 bg-background-secondary border border-background-tertiary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                id="category" 
                                name="category" 
                                value={product.category || ''} 
                                onChange={onChangeHandler} 
                                required
                            >
                                <option>Choose...</option>
                                <option>properties</option>
                                <option>auto</option>
                                <option>electronics</option>
                                <option>clothes</option>
                                <option>toys</option>
                                <option>home</option>
                                <option>garden</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block text-sm font-medium text-text-secondary mb-1" htmlFor="image">
                                Image
                            </label>
                            <input 
                                className="block w-full px-3 py-2 bg-background-secondary border border-background-tertiary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary"
                                id="image" 
                                type="file" 
                                name="image" 
                                onChange={onChangeHandler} 
                            />
                        </div>
                    </div>
                    
                    {loading ? (
                        <button 
                            className="w-full bg-accent-primary text-white py-2 px-4 rounded opacity-50 cursor-not-allowed flex items-center justify-center" 
                            disabled
                        >
                            Please wait... 
                            <div className="ml-2 animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        </button>
                    ) : (
                        <button 
                            className="w-full bg-accent-primary hover:bg-accent-secondary text-white font-bold py-2 px-4 rounded focus:outline-none transition-colors duration-300" 
                            type="submit"
                        >
                            Update product
                        </button>
                    )}
                </form>
            </div>
        </>
    );
}

export default Edit;