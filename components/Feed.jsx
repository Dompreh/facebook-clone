import React from 'react'
import Stories from './Stories'
import InputBox from './InputBox'
import Posts from './Posts'
import { useSession } from 'next-auth/react';

function Feed( {posts}) {
  const { data: session } = useSession();
  return (
    <div className='pb-44 flex-grow h-screen pt-6 mr-4 xl:mr-40 overflow-y-auto no-scrollbar '>
        <div className="mx-auto max-w-md md:max-w-xl">
            {/* Stories */}
            <Stories/>

            {/* inputbox */}
            {session && (
              <InputBox/>
            )}
            

            {/* Posts */}
            <Posts posts={posts}/>
        </div>
    </div>
  )
}

export default Feed