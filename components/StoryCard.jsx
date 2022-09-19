import React from 'react'
import Image from 'next/image'

function StoryCard({ src, profile, name}) {
  return (
    <div className="w-14 h-14 relative p-3 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
      
     <Image className='absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10' width={40} height={40} src={profile}layout="fixed" objectFit='cover'/>

     <Image src={src} priority layout="fill" className='object-cover filter brightness-75 rounded-full lg:rounded-3xl'/>

     <p className='absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate'>{name}</p>
    </div>
  )
}

export default StoryCard