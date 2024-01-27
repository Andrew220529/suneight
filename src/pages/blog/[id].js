import { cmsClient } from "@/lib/microcms"

const Article = ({data}) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
    )
}

export default Article;

export const getStaticPaths = async () => {
    const data = await cmsClient.get({
        endpoint: 'blog',

    })

    const paths = data.contents.map(
        (content) => `/blog/${content.id}`
    )
    return { paths, fallback: true }
}

export const getStaticProps = async (context) => {
    const id = context.params?.id
    const data = await cmsClient.get({
        endpoint: 'blog',
        contentId: String(id)
    })
    .catch((err) => console.log(err))

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            data
        }
    }
}