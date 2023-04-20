import React from 'react';
import Link from 'next/link';

export default function PostList({posts}) {


  return (
    <div className='flex gap-8'>
        {posts.map((post) => (
            <article key={post.id} className='dark:bg-gray-300 rounded-xl p-3'>
                <Link href={`/posts/${post.id}`}>
                    <h2 className='text-xl font-semibold text-indogo-600'>{post.title}</h2>
                    <p className='dark:text-black/90'>{post.body}</p>
                </Link>
            </article>
        ))}
    </div>
  )
}

// export const getStaticPaths = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = await res.json();

//     const paths = posts.map((post) => ({ params: { postId: String(post.id) } }));

//     return {
//         paths,
//         fallback: false,
//     }
// };

export const getStaticProps = async ({params}) => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"
    );
    const posts = await res.json();

    return {
        props: {
            posts,
        },
    }
};
