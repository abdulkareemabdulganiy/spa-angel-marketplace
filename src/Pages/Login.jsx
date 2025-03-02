import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../ContextStore';
import { loginUser } from '../services/userData';
import { Link } from 'react-router-dom';
import SimpleSider from '../components/SimpleSider/SimpleSider';
import { motion } from 'framer-motion';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { setUserData } = useContext(Context);

    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        loginUser(user)
            .then(res => {
                if (!res.error) {
                    setUserData(res.user);
                    navigate('/');
                } else {
                    setLoading(false);
                    setError(res.error.message);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from login: ', err));
    };

    // Close alert after 5 seconds
    useEffect(() => {
        if (alertShow) {
            const timer = setTimeout(() => {
                setAlertShow(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alertShow]);

    const handleAlertBackdropClick = (e) => {
        // Only close if clicking directly on the alert container, not its children
        if (e.target === e.currentTarget) {
            setAlertShow(false);
        }
    };

    return (
        <>
            <SimpleSider params="Sign in" />
            <div className="container mx-auto px-4">
                <motion.form 
                    className="max-w-md mx-auto bg-background-secondary p-8 rounded-lg shadow-lg border border-background-tertiary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmitLogin}
                >
                    {alertShow && (
                        <motion.div 
                            className="bg-red-900/30 text-red-300 border border-red-800 p-4 mb-4 rounded-md relative" 
                            role="alert"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            onClick={handleAlertBackdropClick}
                        >
                            <span className="block sm:inline">{error}</span>
                            <button 
                                className="absolute top-2 right-2 text-red-300 hover:text-red-100 transition-colors duration-300"
                                onClick={() => setAlertShow(false)}
                                aria-label="Close alert"
                            >
                                &times;
                            </button>
                        </motion.div>
                    )}
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="email">
                            Email address
                        </label>
                        <input 
                            className="block w-full px-4 py-3 bg-background-tertiary border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary transition-all duration-300"
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder="Enter email" 
                            onChange={handleChanges} 
                            required 
                        />
                    </div>
                    
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-text-secondary" htmlFor="password">
                                Password
                            </label>
                            <a href="#" className="text-xs text-accent-primary hover:text-accent-secondary transition-colors duration-300">
                                Forgot password?
                            </a>
                        </div>
                        <input 
                            className="block w-full px-4 py-3 bg-background-tertiary border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary transition-all duration-300"
                            id="password" 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            onChange={handleChanges} 
                            required 
                        />
                    </div>
                    
                    <motion.button 
                        className="w-full bg-accent-primary hover:bg-accent-secondary text-white font-bold py-3 px-4 rounded focus:outline-none transition-all duration-300 shadow-lg hover:shadow-accent-primary/20"
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <span>Signing in</span>
                                <div className="ml-2 animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            "Sign in"
                        )}
                    </motion.button>
                    
                    <p className="text-center mt-6 text-text-secondary">
                        Don't have an account? <Link to="/auth/register" className="text-accent-primary hover:text-accent-secondary transition-colors duration-300 font-medium">Sign up</Link>!
                    </p>
                </motion.form>
            </div>
        </>
    );
}

export default Login;