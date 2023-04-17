import React, { useRef, useState } from "react";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { signOut, getAuth } from "firebase/auth";

const Input = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth();

  const sendPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser.uid,
      text: input,
      userImg: currentUser.userImg,
      timestamp: serverTimestamp(),
      name: currentUser.name,
      username: currentUser.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const onSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
  };

  return (
    <>
      {currentUser && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <img
            onClick={onSignOut}
            src={currentUser?.userImg}
            alt="user-image"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className=" ">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                rows="2"
                placeholder="What`s happening"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></textarea>
            </div>

            {selectedFile && (
              <div className="relative">
                <XIcon
                  className="h-3 text-red-500 absolute cursor-pointer"
                  onClick={() => {
                    return setSelectedFile(null);
                  }}
                />
                <img
                  src={selectedFile}
                  alt="selected file"
                  className={`${loading && "animate-pulse"}`}
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2.5 ">
              {!loading && (
                <>
                  <div className="flex ">
                    <div
                      className=""
                      onClick={() => {
                        return filePickerRef.current.click();
                      }}
                    >
                      <PhotographIcon className="h-8 w-8 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />

                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImage}
                      />
                    </div>
                    <EmojiHappyIcon className="h-8 w-8 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendPost}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={!input.trim()}
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
