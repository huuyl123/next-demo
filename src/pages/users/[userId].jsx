import React from 'react'

export default function users({user}) {
  return (
    <div>
        <h1 className='text3xl'>{user.name}</h1>
        <h1 className='text3xl'>{user.username}</h1>
        <h1 className='text3xl'>{user.email}</h1>
    </div>
  )
}

// Server Side Rendering - Tạo trang động với mỗi request
// Mỗi khi có request đến trangn ày
// Thì sẽ làm mới dữ liệu
// Và tạo trang HTML dựa trên dữ liệu mới
// Cần trả về cấu trúc tương tự getStaticProps
// { props: {}}

export const getServerSideProps = async (ctx) => {
    const { query } = ctx;

    const res = await fetch("https://jsonplaceholder.typicode.com/users/" + query.userId);

    if (!res.ok) {
        return {
            
            notFound: true,
        }
    }

    const user = await res.json();
    console.log(user)

    return {
        props: {
            user,
        },
    };
}
