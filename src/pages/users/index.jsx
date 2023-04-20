import React from 'react'
import Link from 'next/link';

export default function UserList({users}) {
  return (
    <div className='flex gap-8'>
        {users.map((user) => 
            <article key={user.id} className='dark:bg-gray-300 rounded-xl p-3'>
                <Link href={`/users/${user.id}`}>
                    <h2 className='text-xl font-semibold text-indogo-600'>{user.username}</h2>
                    <p className='dark:text-black/90'>Real name: {user.name}</p>
                    <p className='dark:text-black/90'>Email : {user.email}</p>

                </Link>
            </article>
        )}
    </div>
  )
}

export const getServerSideProps = async () => {

    const res = await fetch("https://jsonplaceholder.typicode.com/users/");

    const users = await res.json();

    return {
        props: {
            users,
        },
    };
}