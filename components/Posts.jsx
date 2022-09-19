import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

function Posts({ posts }) {
  const [posts1, setPosts1] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts1(snapshot.docs);
        }
      ),
    [db]
  );

  

  console.log(posts1);
  return (
    <div>
      {posts
        ? posts1.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.data().name}
              email={post.data().email}
              image={post.data().image}
              postImage={post.data().postImage}
              message={post.data().message}
              timestamp={post.data().timestamp}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.name}
              email={post.email}
              image={post.image}
              postImage={post.postImage}
              message={post.message}
              timestamp={post.timestamp}
            />
          ))}
    </div>
  );
}

export default Posts;
