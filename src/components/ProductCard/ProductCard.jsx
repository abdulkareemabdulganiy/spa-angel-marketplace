import { Link } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';

function ProductCard({ params }) {
    const [isHovered, setIsHovered] = useState(false);
    const formattedDate = moment(params.addedAt).format('D MMM YYYY (dddd) HH:mm');
    
    return (
        <motion.div 
            className="bg-background-secondary rounded-lg shadow-md overflow-hidden mb-8 border border-background-tertiary hover:border-accent-primary/50 transition-all duration-300 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 120, 212, 0.1), 0 8px 10px -6px rgba(0, 120, 212, 0.1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/categories/${params.category}/${params._id}/details`} className="flex-grow flex flex-col">
                <div className="relative overflow-hidden">
                    <motion.img 
                        className="w-full h-48 object-cover transition-transform duration-700 ease-in-out"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        src={params.image} 
                        alt={params.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-primary/80 text-white">
                            {params.category}
                        </span>
                    </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-medium mb-2 text-text-primary line-clamp-2 h-14 group-hover:text-accent-primary transition-colors duration-300">{params.title}</h3>
                    <motion.p 
                        className="text-right font-semibold text-accent-primary mt-auto"
                        animate={{ 
                            scale: isHovered ? 1.05 : 1,
                            color: isHovered ? '#3794ff' : '#0078d4'
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {(params.price).toFixed(2)}€
                    </motion.p>
                </div>
            </Link>
            <div className="px-4 py-3 bg-background-tertiary text-right text-xs text-text-muted flex justify-between items-center">
                <span className="truncate max-w-[120px]">{params.city}</span>
                <span>{formattedDate}</span>
            </div>
        </motion.div>
    );
}

export default ProductCard;