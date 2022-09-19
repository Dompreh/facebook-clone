import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  ChatAltIcon,
  ThumbUpIcon,
  ShareIcon
} from "@heroicons/react/outline";
import {
  ThumbUpIcon as ThumbUpIconFilled,
} from "@heroicons/react/solid";
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';

function Post({name, message, email, timestamp, postImage, image, id}) {
  const { data: session, status } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasLiked] = useState(false);

  useEffect(
    ()=>
    setHasLiked
    (likes.findIndex((like) => (like.id === session?.user?.uid))!== -1 ),
  [likes]
  )

  useEffect(
    ()=> onSnapshot(collection(db, 'posts',id,'likes'),(snapshot)=> setLikes(snapshot.docs)
  ),
  [db, id]
  )

  const likePost = async ()=>{
    
    if (hasliked){
      await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))

    }
    else{
      await setDoc(doc(db,'posts',id,'likes',session.user.uid),
    {
      username: session.user.name,
    })
    } 
  }

  console.log(likes)

  return (
    <div className="flex flex-col">
        <div className='p-5 bg-white mt-5 rounded-t-2xl shadow-sm'>
          <div className='flex items-center space-x-2'>
            <img className='rounded-full' src={image} width={40} height={40} alt="" />
            <div>
              <p className='font-medium'>{name}</p>
              {timestamp ? (
                 <p className='text-xs text-gray-400'>
                 {new Date(timestamp?.toDate()).toLocaleString()}
               </p>
              ):(
                <p className='text-xs text-gray-400'>Loading ..</p>
              )}
             
            </div>
          </div>
          <p className='pt-4'>{message}</p>
        </div>

        {postImage && (
          <div className='relative h-56 md:h-72  lg:h-96 bg-white'>
            <Image src={postImage} objectFit="cover" alt='post' layout='fill' />
          </div>
        )}

        {/* Footer of the post */}
        <div className="bg-white shadow-md ">
        <div className='flex items-center justify-between bg-white  text-gray-400 border-t'>
          <div>
            {hasliked ? (
              <div onClick={likePost} className="inputIcon rounded-none rounded-bl-2xl ">
               <ThumbUpIconFilled  className='h-4 text-blue-500'/>
               <p className={`text-xs sm:text-base ${hasliked && 'text-blue-500'} `}>Like</p>
               </div>
               
            ):(
              <div onClick={likePost} className="inputIcon rounded-none rounded-bl-2xl ">
              <ThumbUpIcon  className='h-4'/> 
              <p className={`text-xs sm:text-base ${hasliked && 'text-blue-500'} `}>Like</p>
              </div>          
            )}
           
          </div>
          <div className="inputIcon rounded-none ">
          <ChatAltIcon className='h-4'/>
            <p className='text-xs sm:text-base'>Comment</p>
          </div>
          <div className="inputIcon rounded-none rounded-br-2xl">
          <ShareIcon className='h-4'/>
            <p className='text-xs sm:text-base'>Share</p>
          </div>
        </div>
        <p className="p-1 truncate">
            {likes.length > 0 && (
              <p className="font-bold mb-1">{likes.length} likes</p>
         )}
         </p>
        </div>

        
    </div>
  )
}

export default Post