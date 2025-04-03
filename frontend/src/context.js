import React, {createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({children }) => {
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // Save userId to localStorage when it changes
    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
        }
    }, [userId]);

    return(
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
}