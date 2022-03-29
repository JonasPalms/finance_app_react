import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out

        try {
            await projectAuth.signOut()

            // dispatch logout action (just skip the payload as user is now null)
            dispatch({ type: 'LOGOUT' })

            // update state
            if (!isCancelled) {
                setIsPending(false);
                setError(false);
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

    return { logout, error, isPending }
}

