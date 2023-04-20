import React from 'react'

export default function Post( { post }) {
  return (
    <div>
        <h1 className='text-3xl text-indigo'>{post.title}</h1>
        <p>{post.body}</p>
        <p>{post.userId}</p>
    </div>
  )
}

//fallback : cho biết nếu truy cập vào đường dẫn không tồn tại
export const getStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();

    const paths = posts.map((post) => ({ params: { postId: String(post.id) } }))

    return {
        paths,
        fallback: false,
    }
};

// Lấy dữ liệu tương ứng cho từng trang
// Trả về cấu trúc { róp: {} }
// Dữ liệu trả về từ getstaticProps sẽ được truyền vào Page
export const getStaticProps = async ({params}) => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + params.postId
    );
    const post = await res.json();

    return {
        props: {
            post,
        },
    }
};