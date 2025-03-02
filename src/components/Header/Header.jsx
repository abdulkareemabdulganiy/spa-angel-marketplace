import { useContext, useState, useEffect } from 'react';
import { Context } from '../../ContextStore';
import { NavLink, useLocation } from 'react-router-dom';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { IoFlash } from "react-icons/io5";

function Header() {
    const { userData, setUserData } = useContext(Context);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Close dropdown and mobile menu when route changes
    useEffect(() => {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
    }, [location]);

    // Add scroll effect to header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className={`bg-background py-2 border-b border-background-tertiary sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-background/95 backdrop-blur-sm' : ''}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center">
                    <NavLink className="flex items-center text-xl font-medium text-white mr-8 hover:opacity-80 transition-opacity duration-300" to="/">
                        {/* <svg className="w-6 h-6 mr-2 transition-transform duration-300 hover:rotate-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 5L21 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M13 12L21 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M13 19L21 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M1 19L5 19" stroke="#0078d4" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M1 12H9" stroke="#0078d4" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M1 5L5 5" stroke="#0078d4" strokeWidth="2" strokeLinecap="round"/>
                        </svg> */}
                      <IoFlash />
                        <span className="relative">
                            Marketplace
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </NavLink>
                    
                    <div className="hidden md:flex space-x-6">
                        <NavLink 
                            className={({ isActive }) => 
                                `text-gray-300 hover:text-white transition-colors duration-300 text-sm relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent-primary after:transition-all after:duration-300 ${isActive ? 'text-white after:w-full' : 'after:w-0'} hover:after:w-full`
                            }
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            className={({ isActive }) => 
                                `text-gray-300 hover:text-white transition-colors duration-300 text-sm relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent-primary after:transition-all after:duration-300 ${isActive ? 'text-white after:w-full' : 'after:w-0'} hover:after:w-full`
                            }
                            to="/categories/all"
                        >
                            Products
                        </NavLink>
                    </div>
                </div>
                
                {/* Mobile menu button */}
                <button 
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    onClick={toggleMobileMenu}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
                </button>
                
                <div className="hidden md:flex items-center">
                    {userData ? (
                        <div className="flex items-center space-x-4">
                            <NavLink 
                                className="text-2xl text-accent-primary hover:text-accent-secondary transform hover:scale-110 transition-all duration-300" 
                                to="/add-product"
                                title="Add a sell"
                            >
                                <BsFillPlusCircleFill />
                            </NavLink>

                            <div className="relative">
                                <button 
                                    className="flex items-center focus:outline-none" 
                                    onClick={toggleDropdown}
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <img 
                                        className="w-8 h-8 rounded-full object-cover border border-accent-primary transition-transform duration-300 hover:scale-110" 
                                        src={userData.avatar} 
                                        alt="user avatar" 
                                    />
                                </button>
                                
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-background-secondary rounded-md shadow-lg py-1 z-10 border border-background-tertiary fade-in">
                                        <NavLink 
                                            className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary transition-colors duration-200" 
                                            to={`/profile/${userData._id}`}
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <BsFillPersonFill className="mr-2 text-accent-primary" /> Profile
                                        </NavLink>
                                        
                                        <NavLink 
                                            className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary transition-colors duration-200" 
                                            to="/messages"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <BsFillEnvelopeFill className="mr-2 text-accent-secondary" /> Messages
                                        </NavLink>
                                        
                                        <div className="border-t border-background my-1"></div>
                                        
                                        <NavLink 
                                            className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary transition-colors duration-200" 
                                            to="/auth/logout" 
                                            onClick={() => {
                                                setUserData(null);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <IoLogOut className="mr-2 text-accent-tertiary" /> Log out
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <NavLink 
                                className="px-4 py-1.5 bg-accent-primary hover:bg-accent-secondary text-white rounded text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-accent-primary/20" 
                                to="/auth/login"
                            >
                                Sign In
                            </NavLink>
                            
                            <NavLink 
                                className="px-4 py-1.5 text-gray-300 hover:text-white text-sm relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent-primary after:transition-all after:duration-300 after:w-0 hover:after:w-full" 
                                to="/auth/register"
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pt-2 pb-4 space-y-3 bg-background-secondary border-t border-background-tertiary">
                    <NavLink 
                        className={({ isActive }) => 
                            `block py-2 text-base font-medium ${isActive ? 'text-accent-primary' : 'text-gray-300'} hover:text-white transition-colors duration-300`
                        }
                        to="/"
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => 
                            `block py-2 text-base font-medium ${isActive ? 'text-accent-primary' : 'text-gray-300'} hover:text-white transition-colors duration-300`
                        }
                        to="/categories/all"
                    >
                        Products
                    </NavLink>
                    
                    {userData ? (
                        <>
                            <NavLink 
                                className={({ isActive }) => 
                                    `block py-2 text-base font-medium ${isActive ? 'text-accent-primary' : 'text-gray-300'} hover:text-white transition-colors duration-300`
                                }
                                to="/add-product"
                            >
                                Add Product
                            </NavLink>
                            <NavLink 
                                className={({ isActive }) => 
                                    `block py-2 text-base font-medium ${isActive ? 'text-accent-primary' : 'text-gray-300'} hover:text-white transition-colors duration-300`
                                }
                                to={`/profile/${userData._id}`}
                            >
                                Profile
                            </NavLink>
                            <NavLink 
                                className={({ isActive }) => 
                                    `block py-2 text-base font-medium ${isActive ? 'text-accent-primary' : 'text-gray-300'} hover:text-white transition-colors duration-300`
                                }
                                to="/messages"
                            >
                                Messages
                            </NavLink>
                            <NavLink 
                                className="block py-2 text-base font-medium text-gray-300 hover:text-white transition-colors duration-300"
                                to="/auth/logout"
                                onClick={() => setUserData(null)}
                            >
                                Log out
                            </NavLink>
                        </>
                    ) : (
                        <div className="pt-2 flex flex-col space-y-2">
                            <NavLink 
                                className="w-full py-2 bg-accent-primary hover:bg-accent-secondary text-white rounded text-center text-sm font-medium transition-colors duration-300" 
                                to="/auth/login"
                            >
                                Sign In
                            </NavLink>
                            
                            <NavLink 
                                className="w-full py-2 border border-accent-primary text-accent-primary hover:bg-accent-primary/10 rounded text-center text-sm font-medium transition-colors duration-300" 
                                to="/auth/register"
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;