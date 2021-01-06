import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Cookies from 'cookies'
import client from '../components/client'
import { useForestryForm, useTinaAuthRedirect } from '@forestryio/client'
import { DocumentUnion, Index as IndexResponse } from "../.tina/types";

export default function Home(props) {

  useTinaAuthRedirect();


  console.log(props);
  
  const data = props.preview ? useForestryForm<IndexResponse>(props).data : props.document?.node.data || {}

console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {data.title}
        </h1>
        {props.preview && <p>You are currently in edit mode.</p> }
        {!props.preview && <p>To edit this site, go to <a href="/login">login</a></p> }
      </main>


    </div>
  )
}

export async function getServerSideProps(props) {
  const relativePath = `index.md`;
  const section = 'pages';

  const cookies = new Cookies(props.req, props.res)
  const authToken = cookies.get('tinaio_token')

  const getTokenFn = () => authToken || ""

  const forestryClient = client(props.preview, getTokenFn)

  
  const content = await forestryClient.getContentForSection<DocumentUnion>({
    relativePath: relativePath,
    section: section
  });

  return { 
    props: {
      ...content,
      relativePath,
      section,
      preview: !!props.preview
    }
  };
  

  
}