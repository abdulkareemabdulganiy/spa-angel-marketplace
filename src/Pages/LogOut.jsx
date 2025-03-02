import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../ContextStore';

function LogOut() {
    const navigate = useNavigate();
    const { setUserData } = useContext(Context);
    
    useEffect(() => {
        fetch('/auth/logout')
            .then(res => res.json())
            .then(res => {
                setUserData(null);
                navigate('/');
            })
            .catch(err => console.log(err));
    }, [navigate, setUserData]);
    
    return null;
}

export default LogOut;