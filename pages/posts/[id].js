import Date from '../../components/date'
import { formatWithValidation } from 'next/dist/next-server/lib/utils'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilsStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilsStyles.headingXl}>{postData
                    .title}</h1>
                <div className={utilsStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <h2 className={utilsStyles.headingXl}>{postData
                    .title}</h2>
           
            </article>
        </Layout>
    )
}
