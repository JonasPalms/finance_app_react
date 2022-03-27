import { useState } from "react/cjs/react.development";
import projectAuth from '../firebase/config';

import React from 'react'

export default function useSignup() {

  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false)

  const signUp = async (email, password, displayName) => {

  }
  return (
    <div>useSignup</div>
  )
}
