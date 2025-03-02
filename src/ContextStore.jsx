import React, { useState, useEffect, useMemo } from 'react';
import { getUser } from './services/userData';

export const Context = React.createContext();

export const ContextStore = ({ children }) => {
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        console.log("ContextStore: Fetching user data");
        // Get user data from mock service
        getUser()
            .then(res => {
                console.log("ContextStore: User data received", res);
                if (res.user) {
                    setUserData(res.user);
                }
            })
            .catch(err => {
                console.error("ContextStore: Error fetching user data", err);
            });
    }, []);

    const providerValue = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

    return (
        <Context.Provider value={providerValue}>
            {children}
        </Context.Provider>
    );
};