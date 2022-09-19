import { getSession, GetSessionParams } from 'next-auth/react'
import Head from 'next/head'
import  Header  from '../components/Header'
import  Login from '../components/Login'
import  Sidebar from '../components/Sidebar'
import  Feed from '../components/Feed'
import  Widgets from '../components/Widgets'
import { db } from '../firebase'
import { collection, getDocs, orderBy } from 'firebase/firestore'

export default function Home({session, posts}) {
  if (!session) return <Login/>
  return (
    <div className=' bg-gray-100 overflow-hidden' >
      <Head>
        <title>facebook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      
      <Header />

      <main className='flex'>
        {/* sidebar */}
        <Sidebar/>
        {/* Feed */}
        <Feed posts={posts}/>
        {/* widgets */}
        <Widgets/>
      </main>

    </div>
  )
}


export async function getServerSideProps(context) {
  //Get the user
  const session = await getSession(context);
  
  const posts = await getDocs(collection(db,'posts'),orderBy('timestamp','desc'))

  const docs = posts.docs.map(post => ({
    id:post.id,
    ...post.data(),
    timestamp:null
  }))
  return {
    props:{
      session,
      posts:docs
    }
  }
}
