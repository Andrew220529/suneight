import { cmsClient } from '@/lib/microcms'
import Link from 'next/link'
import React from 'react'

function Blog({ blog }) {
    return (
        <div>
            <ul>
                {blog.map((blog) => (
                    <li key={blog.id}>
                        <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Blog

export const getStaticProps = async () => {
    const data = await cmsClient.get({
        endpoint: 'blog'
    })
        .catch((err) => console.log(err))

    return {
        props: {
            blog: data.contents,
        }
    }
}