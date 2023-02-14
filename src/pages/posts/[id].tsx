import { getAllPostIds, getPostData } from 'lib/post';
import Head from 'next/head'
import homeStyles from '../../styles/home.module.css'
import { GetStaticProps } from 'next';
import React from 'react'

export default function Post({
  postData
} : { 
  postData:{
    title:string,
    date:string,
    contntHtml :string
  }
}) {
  return (
    <div>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={homeStyles.headingXl}>{postData.title}</h1>
                <div className={homeStyles.lightText}>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </div>
  )
}


export const getStaticPaths: GetStatiPaths = async ()=>{
   const paths =getAllPostIds();
   console.log( 'paths ' , paths);

    return{
      paths,
      fallback:false
    }

}

// paths  [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
// params  { id: 'pre-rendering' }
export const getStaticProps : GetStaticProps = async ({params}) =>{
   console.log('params ' ,  params);
   const postData = await getPostData(params.id as string);
   return{
      props:{
        postData
      }
   }
}



