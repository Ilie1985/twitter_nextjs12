import React from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
  const posts = [
    {
      id: "1",
      name: "Marian Ilie",
      username: "marianilie",
      userImg:
        "https://media.licdn.com/dms/image/C4D03AQHlMq3vFRy6DQ/profile-displayphoto-shrink_800_800/0/1645124997754?e=2147483647&v=beta&t=lCWYwD_G_je1XkeucVLOEDFyBTUprs0V46AFOEJUDo0",
      img: "https://images.unsplash.com/photo-1680263547745-4e0555920ea2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
      text: "Nice view!",
      timestamp: "2hours ago",
    },
    {
      id: "2",
      name: "Mario",
      username: "mario",
      userImg:
        "https://media.licdn.com/dms/image/C4D03AQHlMq3vFRy6DQ/profile-displayphoto-shrink_800_800/0/1645124997754?e=2147483647&v=beta&t=lCWYwD_G_je1XkeucVLOEDFyBTUprs0V46AFOEJUDo0",
      img: "https://plus.unsplash.com/premium_photo-1675237625886-7529b3b0c1cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=60",
      text: "Yummy Yum!",
      timestamp: "2.5 hours ago",
    },
  ];
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
