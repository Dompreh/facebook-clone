import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable, uploadString } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc
} from "firebase/firestore";

function InputBox() {
  const { data: session, loading } = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    await addDoc(collection(db, "posts"), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp()
    }).then((docu) => {
      if (imageToPost) {
        const storageRef = ref(storage, `/posts/${docu.id}`);
        const uploadTask = uploadString(storageRef, imageToPost, 'data_url').then( (snapshot) => {
          //when the image is uploaded
          getDownloadURL(storageRef).then(async (url) => {
            // console.log('File available at', url);
      
            await setDoc(doc(db, "posts", docu.id),
              {
                postImage: url
              }, 
              {merge:true}
            );
          });
        })

        removeImage();

        // uploadTask.then(
        //   "state_changed",
        //   (snapshot) => {
        //     // Observe state change events such as progress, pause, and resume
        //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //       case 'paused':
        //         console.log('Upload is paused');
        //         break;
        //       case 'running':
        //         console.log('Upload is running');
        //         break;
        //     }
        //   },
        //   (error) => {
        //     console.log(error);
        //   },
         
        
      }
    });

    inputRef.current.value = " ";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvents) => {
      setImageToPost(readerEvents.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="mt-6 bg-white p-2 rounded-2xl shadow-md text-gray-700 font-medium ">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          src={session.user.image}
          className="rounded-full"
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className=" rounded-full h-12 px-5 bg-gray-100 focus:outline-none flex-grow"
            type={"text"}
            ref={inputRef}
            placeholder={`What's on your mind, ${
              session.user.name.split(" ")[0]
            }?`}
          />
          <button type="submit" onClick={sendPost} hidden>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              src={imageToPost}
              alt="selected image"
              className="h-10 object-contain"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500 " />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400 " />
          <p className="text-xs sm:text-sm xl:text-base">Photo/View</p>
          <input
            type="file"
            ref={filepickerRef}
            onChange={addImageToPost}
            hidden
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300 " />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
