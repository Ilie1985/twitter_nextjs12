import React, { useEffect, useState } from "react";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { postIdState } from "../atom/modalAtom";
import { userState } from "../atom/userAtom";
import { useRouter } from "next/router";

const Post = ({ post, id }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => {
        return like.id === currentUser?.uid;
      }) !== -1
    );
  }, [likes, currentUser]);

  const likePost = async () => {
    if (currentUser) {
      if (hasLikes) {
        await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
          username: currentUser?.username,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  };

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 ">
      {/*User Image */}
      <img
        src={post?.data()?.userImg}
        alt="user-image"
        className="h-11 w-11 rounded-full mr-4"
      />

      {/* Right Side */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between ">
          {/*  Post user info */}
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px] sm:mt-1">
              @{post?.data()?.username}-{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline sm:mt-1">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* Dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* Post text */}
        <p
          className="text-gray-800 text-[15px] sm:text-[16px] mb-2 "
          onClick={() => {
            return router.push(`/posts/${id}`);
          }}
        >
          {post?.data()?.text}
        </p>

        {/*Post Image */}
        <img
          src={post?.data()?.image}
          alt="posted images"
          className="rounded-2xl mr-2"
          onClick={() => {
            return router.push(`/posts/${id}`);
          }}
        />

        {/* Icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatIcon
              onClick={() => {
                if (!currentUser) {
                  // signIn();
                  router.push("/auth/signin");
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />

            {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )}
          </div>

          {currentUser?.uid === post?.data()?.id && (
            <TrashIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              onClick={deletePost}
            />
          )}

          <div className="flex items-center">
            {hasLikes ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}

            {likes.length > 0 && (
              <span
                className={`${hasLikes && "text-red-600"} text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;
