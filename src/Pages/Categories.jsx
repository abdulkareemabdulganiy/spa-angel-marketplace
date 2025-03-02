import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoriesNav from '../components/Categories/CategoriesNav';
import ProductCard from '../components/ProductCard/ProductCard';
import { getAll } from '../services/productData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

function Categories() {
    console.log("Categories component rendering");
    const { category } = useParams();
    let currentCategory = category || 'all';
    const [products, setProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('oldest');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const searchInputRef = useRef(null);

    useEffect(() => {
        console.log("Categories: Fetching products for category", currentCategory);
        setPage(1);
        setLoading(true);
        setQuery("");
        getAll(1, currentCategory)
            .then(res => {
                console.log("Categories: Products received", res);
                setProduct(res.products);
                setLoading(false);
                setPage(page => page + 1);
                setQuery("");
            })
            .catch(err => {
                console.error("Categories: Error fetching products", err);
                setLoading(false);
            });
    }, [currentCategory]);

    useEffect(() => {
        if (query !== "") {
            console.log("Categories: Searching for", query);
            setPage(1);
            setLoading(true);
            getAll(1, currentCategory, query)
                .then(res => {
                    console.log("Categories: Search results", res);
                    setProduct(res.products);
                    setLoading(false);
                    setPage(page => page + 1);
                })
                .catch(err => {
                    console.error("Categories: Error searching products", err);
                    setLoading(false);
                });
        }
    }, [query, currentCategory]);

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('#sort-container')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Get sort icon and label based on current sort
    const getSortInfo = () => {
        switch (sort) {
            case 'oldest':
                return { icon: <BiDownArrowAlt className="ml-2 text-lg text-accent-primary" />, label: 'Oldest' };
            case 'newest':
                return { icon: <BiUpArrowAlt className="ml-2 text-lg text-accent-secondary" />, label: 'Newest' };
            case 'lowerPrice':
                return { icon: <BiSortDown className="ml-2 text-lg text-accent-tertiary" />, label: 'Price ↓' };
            case 'biggerPrice':
                return { icon: <BiSortUp className="ml-2 text-lg text-accent-primary" />, label: 'Price ↑' };
            default:
                return { icon: <BiSort className="ml-2 text-lg text-accent-primary" />, label: 'Sort' };
        }
    };

    const sortInfo = getSortInfo();

    // Focus search input when pressing Ctrl+K or /
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName))) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className="bg-gradient-to-r from-background-tertiary to-background relative h-64 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-tertiary/10"></div>
                <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/silenceiv/image/upload/v1616775706/4241166cd1c646c5_lwdbpm.jpg')] bg-cover bg-center opacity-20"></div>
                
                <motion.div 
                    className="relative z-10 w-full max-w-2xl px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                        <input 
                            ref={searchInputRef}
                            className="w-full rounded-full border-2 border-accent-primary/50 focus:border-accent-primary py-3 pl-16 pr-12 text-base bg-background-secondary/80 backdrop-blur-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all duration-300 shadow-lg focus:shadow-accent-primary/20"
                            style={{ 
                                backgroundImage: "url('https://res.cloudinary.com/silenceiv/image/upload/v1616775441/search-icon_i5dy7o.png')", 
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "24px", 
                                backgroundPosition: "20px center" 
                            }}
                            type="text" 
                            placeholder="Search for products... (Ctrl+K)" 
                            name="search" 
                            value={query} 
                            onChange={handleSearch}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center">
                            {query && (
                                <button 
                                    className="text-text-muted hover:text-accent-primary transition-colors duration-300 mr-2"
                                    onClick={() => setQuery("")}
                                >
                                    &times;
                                </button>
                            )}
                            <kbd className="hidden sm:inline-flex px-2 py-1 text-xs font-semibold text-gray-400 bg-background-tertiary rounded border border-background-tertiary">Ctrl+K</kbd>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <CategoriesNav />
            
            <div className="container mx-auto px-4">
                <div id="sort-container" className="relative z-10 inline-block text-left mb-6 mt-2">
                    <motion.button 
                        type="button" 
                        className="inline-flex items-center justify-between w-32 rounded-md border border-background-tertiary shadow-sm px-4 py-2 bg-background-secondary text-sm font-medium text-text-primary hover:bg-background-tertiary focus:outline-none transition-colors duration-300"
                        onClick={toggleDropdown}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {sortInfo.label}
                        {sortInfo.icon}
                    </motion.button>
                    
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div 
                                className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background-secondary ring-1 ring-black ring-opacity-5 focus:outline-none border border-background-tertiary z-20"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="sort-menu-button">
                                    <button 
                                        className={`flex items-center w-full text-left px-4 py-2 text-sm ${sort === 'oldest' ? 'bg-background-tertiary text-accent-primary' : 'text-text-primary hover:bg-background-tertiary'}`}
                                        onClick={() => { setSort('oldest'); setDropdownOpen(false); }}
                                        role="menuitem"
                                    >
                                        Oldest <BiDownArrowAlt className="ml-auto text-accent-primary" />
                                    </button>
                                    <button 
                                        className={`flex items-center w-full text-left px-4 py-2 text-sm ${sort === 'newest' ? 'bg-background-tertiary text-accent-secondary' : 'text-text-primary hover:bg-background-tertiary'}`}
                                        onClick={() => { setSort('newest'); setDropdownOpen(false); }}
                                        role="menuitem"
                                    >
                                        Newest <BiUpArrowAlt className="ml-auto text-accent-secondary" />
                                    </button>
                                    <button 
                                        className={`flex items-center w-full text-left px-4 py-2 text-sm ${sort === 'lowerPrice' ? 'bg-background-tertiary text-accent-tertiary' : 'text-text-primary hover:bg-background-tertiary'}`}
                                        onClick={() => { setSort('lowerPrice'); setDropdownOpen(false); }}
                                        role="menuitem"
                                    >
                                        Price (High to Low) <BiSortDown className="ml-auto text-accent-tertiary" />
                                    </button>
                                    <button 
                                        className={`flex items-center w-full text-left px-4 py-2 text-sm ${sort === 'biggerPrice' ? 'bg-background-tertiary text-accent-primary' : 'text-text-primary hover:bg-background-tertiary'}`}
                                        onClick={() => { setSort('biggerPrice'); setDropdownOpen(false); }}
                                        role="menuitem"
                                    >
                                        Price (Low to High) <BiSortUp className="ml-auto text-accent-primary" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {!loading ? (
                    products && products.length > 0 ? (
                        <InfiniteScroll
                            dataLength={products.length}
                            next={() => {
                                if (query === "") {
                                    getAll(page, currentCategory)
                                        .then(res => {
                                            setProduct([...products, ...res.products]);
                                            setPage(page + 1);
                                        });
                                }
                            }}
                            hasMore={products.length > 0}
                            loader={
                                <div className="text-center py-4">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary"></div>
                                </div>
                            }
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {products
                                .sort((a, b) => {
                                    if (sort === "oldest") {
                                        return a.addedAt.localeCompare(b.addedAt);
                                    }
                                    if (sort === "newest") {
                                        return b.addedAt.localeCompare(a.addedAt);
                                    }
                                    if (sort === "lowerPrice") {
                                        return b.price - a.price;
                                    }
                                    if (sort === "biggerPrice") {
                                        return a.price - b.price;
                                    }
                                    return 0;
                                })
                                .map(x => (
                                    <ProductCard key={x._id.toString()} params={x} />
                                ))}
                        </InfiniteScroll>
                    ) : (
                        <motion.div 
                            className="text-center py-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-lg text-text-muted mb-4">No products found</p>
                            {query && (
                                <motion.button 
                                    className="mt-4 px-4 py-2 bg-accent-primary text-white rounded hover:bg-accent-secondary transition-colors duration-300 text-sm font-medium"
                                    onClick={() => setQuery("")}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Clear search
                                </motion.button>
                            )}
                        </motion.div>
                    )
                ) : (
                    <div className="text-center py-10">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary"></div>
                        <p className="mt-4 text-text-muted">Loading products...</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Categories;