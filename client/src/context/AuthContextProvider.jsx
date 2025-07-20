import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from './AuthContext';



const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }
    const loginWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

   // console.log(user)

    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const observer = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false);
        })
        return () => {
            observer();
        }
    }, [])

    const data = {
        user,
        setUser,
        createUser,
        loginUser,
        logout,
        loading,
        updateUser,
        // resetPassword,
        loginWithGoogle
    }
    return (
        <AuthContext value={data}>
            {children}
        </AuthContext>
    )
}

export default AuthContextProvider