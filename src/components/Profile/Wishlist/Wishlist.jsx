import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { getUserWishlist } from '../../../services/userData';

import './Wishlist.css';

function Wishlist() {
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserWishlist()
            .then(res => {
                setProduct(res.wishlist.filter(x => x.active === true));
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [setProduct, setLoading]);

    return (
        <>
            {!loading ? (
                <>
                    <h1 className="text-xl font-medium text-white mb-6">Wishlist</h1>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(x =>
                                <div key={x._id.toString()}>
                                    <ProductCard params={x} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-text-muted">Nothing to show</p>
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
                </div>
            )}
        </>
    );
}

export default Wishlist;