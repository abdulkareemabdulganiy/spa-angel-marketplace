import { Link, useParams } from 'react-router-dom';
import { BsHouseDoorFill, BsFillHouseFill, BsFillPuzzleFill } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';
import { GiFlowerPot, GiClothes } from 'react-icons/gi';
import { TiSortAlphabetically } from 'react-icons/ti';
import { MdPhoneAndroid } from 'react-icons/md';
import { motion } from 'framer-motion';

function CategoriesNav() {
    const { category } = useParams();
    const currentCategory = category || 'all';

    const categories = [
        { path: 'all', name: 'All', icon: <TiSortAlphabetically className="mr-1 text-accent-primary" /> },
        { path: 'properties', name: 'Properties', icon: <BsHouseDoorFill className="mr-1 text-orange-400" /> },
        { path: 'auto', name: 'Auto', icon: <AiFillCar className="mr-1 text-blue-400" /> },
        { path: 'home', name: 'Home', icon: <BsFillHouseFill className="mr-1 text-red-400" /> },
        { path: 'electronics', name: 'Electronics', icon: <MdPhoneAndroid className="mr-1 text-gray-300" /> },
        { path: 'clothes', name: 'Clothes', icon: <GiClothes className="mr-1 text-yellow-300" /> },
        { path: 'toys', name: 'Toys', icon: <BsFillPuzzleFill className="mr-1 text-pink-400" /> },
        { path: 'garden', name: 'Garden', icon: <GiFlowerPot className="mr-1 text-green-400" /> }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="container mx-auto px-4 py-8 text-center" id="categories">
            <h1 className="text-xl font-medium mb-6 text-white">Categories</h1>
            <motion.div 
                className="flex flex-wrap justify-center gap-2"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {categories.map((cat) => (
                    <motion.div key={cat.path} variants={item}>
                        <Link to={`/categories/${cat.path}`}>
                            <motion.button 
                                className={`bg-background-tertiary text-text-primary px-4 py-2 rounded flex items-center hover:bg-background-secondary border transition-all duration-300 text-sm font-medium ${
                                    currentCategory === cat.path 
                                        ? 'border-accent-primary bg-background-secondary' 
                                        : 'border-background'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat.icon} {cat.name}
                            </motion.button>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default CategoriesNav;