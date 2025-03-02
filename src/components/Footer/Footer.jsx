import { Link } from 'react-router-dom';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'; 
import { FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Footer() {
    const footerLinks = {
        product: ['Features', 'Pricing', 'API', 'Integrations'],
        resources: ['Documentation', 'Guides', 'Blog', 'Support'],
        company: ['About', 'Careers', 'Contact', 'Press'],
        legal: ['Privacy', 'Terms', 'Security', 'Cookies']
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <footer className="bg-black text-gray-300 py-12 border-t border-gray-800 mt-12">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Product Column */}
                    <motion.div variants={item}>
                        <h3 className="text-white text-lg font-medium mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/" className="hover:text-white transition-colors duration-300 relative group">
                                        {link}
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Resources Column */}
                    <motion.div variants={item}>
                        <h3 className="text-white text-lg font-medium mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/" className="hover:text-white transition-colors duration-300 relative group">
                                        {link}
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Column */}
                    <motion.div variants={item}>
                        <h3 className="text-white text-lg font-medium mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/" className="hover:text-white transition-colors duration-300 relative group">
                                        {link}
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Column */}
                    <motion.div variants={item}>
                        <h3 className="text-white text-lg font-medium mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to="/" className="hover:text-white transition-colors duration-300 relative group">
                                        {link}
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Copyright */}
                <motion.div 
                    className="text-center text-sm text-gray-500 mt-8 border-t border-gray-800 pt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <p>© 2025 All For You. All rights reserved.</p>
                    <p className="mt-2">
                        <a 
                            href="https://github.com/Angel-Sky/ReactJS-Project" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-300"
                        >
                            GitHub
                        </a>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;