import { useState, useEffect } from 'react';
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {

        setError(null)
        setIsPending(true)

        // sign the user in
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch action 
            dispatch({ type: 'LOGIN', payload: res.user })

            // update state
            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    // cleanup function stops async state change when component unmounts
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, error, isPending }
}
