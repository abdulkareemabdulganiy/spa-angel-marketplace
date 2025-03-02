import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/userData';
import SimpleSider from '../components/SimpleSider/SimpleSider';
import { motion } from 'framer-motion';

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        name: null,
        lastName: null,
        gender: null,
        phoneNumber: '',
        email: "",
        password: "",
        repeatPassword: ""
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChanges = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
        
        // Check password strength
        if (e.target.name === 'password') {
            const password = e.target.value;
            let strength = 0;
            
            if (password.length >= 8) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^A-Za-z0-9]/)) strength += 1;
            
            setPasswordStrength(strength);
        }
        
        // Check if passwords match
        if (e.target.name === 'repeatPassword' || e.target.name === 'password') {
            if (e.target.name === 'repeatPassword' && userData.password !== e.target.value) {
                setPasswordMatch(false);
            } else if (e.target.name === 'password' && userData.repeatPassword && userData.repeatPassword !== e.target.value) {
                setPasswordMatch(false);
            } else {
                setPasswordMatch(true);
            }
        }
    };

    const handleSubmitReg = (e) => {
        e.preventDefault();
        setLoading(true);
        registerUser(userData)
            .then(res => {
                if (!res.error) {
                    navigate('/auth/login');
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from register: ', err));
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

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return 'bg-red-600';
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-green-500';
            case 4: return 'bg-green-600';
            default: return 'bg-gray-300';
        }
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Medium';
            case 3: return 'Strong';
            case 4: return 'Very Strong';
            default: return '';
        }
    };

    const handleAlertBackdropClick = (e) => {
        // Only close if clicking directly on the alert container, not its children
        if (e.target === e.currentTarget) {
            setAlertShow(false);
        }
    };

    return (
        <>
            <SimpleSider params="Sign up" />
            <div className="container mx-auto px-4">
                <motion.form 
                    className="max-w-2xl mx-auto bg-background-secondary p-8 rounded-lg shadow-lg border border-background-tertiary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmitReg}
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
                    
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="name">
                                Name *
                            </label>
                            <input 
                                className="block w-full px-4 py-3 bg-background-tertiary border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary transition-all duration-300"
                                id="name" 
                                type="text" 
                                name="name" 
                                placeholder="Ivan Ivanov" 
                                onChange={handleChanges} 
                                required 
                            />
                            <p className="text-xs text-text-muted mt-1">
                                The name can be your real one or a username.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="gender">
                                Gender
                            </label>
                            <select 
                                className="block w-full px-4 py-3 bg-background-tertiary border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary transition-all duration-300"
                                id="gender" 
                                name="gender" 
                                defaultValue="not specified" 
                                onChange={handleChanges}
                            >
                                <option>male</option>
                                <option>female</option>
                                <option>not specified</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="phoneNumber">
                            Phone Number *
                        </label>
                        <input 
                            className="block w-full px-4 py-3 bg-background-tertiary border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary transition-all duration-300"
                            id="phoneNumber" 
                            type="text" 
                            name="phoneNumber" 
                            placeholder="+359888888888" 
                            onChange={handleChanges} 
                            required 
                        />
                        <p className="text-xs text-text-muted mt-1">
                            Phone Number should be a valid BG number.
                        </p>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="email">
                            Email address *
                        </label>
                        <input 
                            className="block w-full px-4 py-3 bg-background-tertiary border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary transition-all duration-300"
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder="ivan@abv.bg" 
                            onChange={handleChanges} 
                            required 
                        />
                    </div>
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="password">
                                Password *
                            </label>
                            <input 
                                className="block w-full px-4 py-3 bg-background-tertiary border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary transition-all duration-300"
                                id="password" 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                onChange={handleChanges} 
                                required 
                            />
                            {userData.password && (
                                <div className="mt-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                                            <div className={`h-full ${getPasswordStrengthColor()}`} style={{ width: `${passwordStrength * 25}%` }}></div>
                                        </div>
                                        <span className="text-xs ml-2 text-text-muted">{getPasswordStrengthText()}</span>
                                    </div>
                                    <p className="text-xs text-text-muted">
                                        Your password must be 8-20 characters long
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="repeatPassword">
                                Repeat Password *
                            </label>
                            <input 
                                className={`block w-full px-4 py-3 bg-background-tertiary border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary transition-all duration-300 ${
                                    userData.repeatPassword && !passwordMatch ? 'border-red-500' : 'border-background'
                                }`}
                                id="repeatPassword" 
                                type="password" 
                                name="repeatPassword" 
                                placeholder="Repeat password" 
                                onChange={handleChanges} 
                                required 
                            />
                            {userData.repeatPassword && !passwordMatch && (
                                <p className="text-xs text-red-400 mt-1">
                                    Passwords do not match
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <motion.button 
                        className="w-full bg-accent-primary hover:bg-accent-secondary text-white font-bold py-3 px-4 rounded focus:outline-none transition-all duration-300 shadow-lg hover:shadow-accent-primary/20"
                        type="submit"
                        disabled={loading || (userData.repeatPassword && !passwordMatch)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <span>Creating account</span>
                                <div className="ml-2 animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            "Sign up"
                        )}
                    </motion.button>
                    
                    <p className="text-center mt-6 text-text-secondary">
                        Already have an account? <Link to="/auth/login" className="text-accent-primary hover:text-accent-secondary transition-colors duration-300 font-medium">Sign in</Link>!
                    </p>
                </motion.form>
            </div>
        </>
    );
}

export default Register;