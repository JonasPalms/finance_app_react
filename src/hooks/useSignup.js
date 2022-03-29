import { projectAuth } from '../firebase/config';
import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {

  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {

    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error('could not complete signup')
      }

      // add display name to user 
      await res.user.updateProfile({ displayName: displayName })

      // dispath login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {


        setIsPending(false)
        setError(null)
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

  useEffect(() => {

    return () => setIsCancelled(true);
  }, [])

  return { error, isPending, signup }
}
