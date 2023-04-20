import React from 'react'
import Link from 'next/link';

export default function TodoList({todos}) {
  return (
    <div className='flex gap-8'>
        {todos.map((todo) => (
            <article key={todos.id}>
                <Link href={`/todos/${todo.id}`}>
                    <h2 className='text-xl font-semibold text-indogo-600'>{todo.title}</h2>
                </Link>
            </article>
        ))}
    </div>
  )
}

export const getStaticProps = async () => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos/"
    );
    const todos = await res.json();

    return {
        props: {
            todos,
        },
    }
};
