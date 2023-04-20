import React from "react";
import Link from "next/link";

export default function todo({todo}) {
    const isCompleted = todo.completed;

    return (
        <div>
            <h1 className='text-3xl text-indigo'>User ID : {todo.userId}</h1>
            <p>Title : {todo.title}</p>
            <p>completed : {isCompleted ? 'true' : 'false'}</p>
        </div>
    )
}

export const getStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();

    const paths = todos.map((todo) => ({ params: { todoId: String(todo.id) } }))

    return {
        paths,
        fallback: false,
    }
};

export const getStaticProps = async ({params}) => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + params.todoId
    );
    const todo = await res.json();

    return {
        props: {
            todo,
        },
    }
};