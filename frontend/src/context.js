import React, {useRef, createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();
export const UserProvider = ({children }) => {
    const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
    const [fromComponent, setFromComponent] = useState(() => localStorage.getItem("FormComponent") || null);
    const [editedStoryId, setEditedStoryId] = useState(() => localStorage.getItem("EditedStoryId") || "");
    // Save userId to localStorage when it changes
    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
        }
    }, [userId]);

    useEffect(() => {
        if (editedStoryId){
            localStorage.setItem("EditedStoryId", editedStoryId);
        }
        console.log("Saving story Id in context");
    }, [editedStoryId]);

    useEffect(() => {
        if (fromComponent && editedStoryId){
            localStorage.setItem("FormComponent",fromComponent)
        }
        console.log("Navigated From:", fromComponent, "with edited story id:", editedStoryId);
    }, [fromComponent,editedStoryId]);

    return(
        <UserContext.Provider value={{ userId, setUserId, fromComponent, setFromComponent, setEditedStoryId, editedStoryId }}>
            {children}
        </UserContext.Provider>
    );
}