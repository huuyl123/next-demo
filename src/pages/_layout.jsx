import React, {useEffect} from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { signout } from '@/lib/auth';
import app from '@/lib/firebase';

export default function ({children}) {
  const { user } = useAuthContext();

  useEffect(() =>  {
    if(user) {
      const db = getFirestore(app)
      const useRef = collection(db, "user")
      const docRef = doc(useRef, user.uid)
      
      getDoc(docRef)
        .then((doc) => {
          console.log(doc.exists());
          return doc.data();
        })
        .then((data) => {
          console.log(data);
        });
    }
  }, [user])

  return (
    <div id="container mx-auto">
        <header>
            <nav className='flex items-center mr-1'>
                <Link href="/" className="mr-4 text-2xl text-indigo-600">
                    Logo
                </Link>
                <Link href="/">Homepage</Link>
                <Link href="/About">About</Link>
                <Link href="/posts">Posts</Link>
                <Link href="/users">Users</Link>
                <Link href="/todos">Todos</Link>
                <Link href="/signup">Sign Up</Link>
            </nav>

            {!user ? (
              <Link href="/login">Login</Link>
            ) : (
              <div>
                {user.email} <button onClick={signout}>Logout</button>
              </div>
            )}
        </header>

        {children}

        <footer>Copyright 2023</footer>
    </div>
  )
}
