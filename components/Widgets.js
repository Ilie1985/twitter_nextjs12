import React from "react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import News from "./News";

const Widgets = () => {
  const [users, setUsers] = useState([]);
  const[usersNum,setUsersNum]=useState(3)
  const [articles, setArticles] = useState([]);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    const fetchArticlesData = async () => {
      const res = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
      );
      const data = await res.json();
      setArticles(data.articles);
    };

    fetchArticlesData();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      const res = await fetch(
        "https://randomuser.me/api/?results=50&inc=name,login,picture"
      );
      const data = await res.json();
      console.log(data);
      setUsers(data.results);
    };

    fetchUsersData();
  }, []);

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full relative">
          <SearchIcon className="h-5 z-50 text-gray-500 " />
          <input
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Whats Happening</h4>
        {articles?.slice(0, articleNum).map((article) => {
          return <News key={article.title} article={article} />;
        })}
        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => {
            return setArticleNum(articleNum + 3);
          }}
        >
          Show more
        </button>
      </div>

      <div className=" sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {users.slice(0, usersNum).map((user) => {
          return (
            <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200" key={user.login.username}>
              <img
                src={user.picture.thumbnail}
                alt="random-user"
                className="rounded-full"
                width="40"
              />
              <div className="truncate ml-4 leading-5">
                <h4 className="font-bold hover:underline text-[14px] truncate ">{user.login.username}</h4>
                <h5 className="text-[13px] text-gray-500 truncate">{user.name.first + " " + user.name.last}</h5>
              </div>
              <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Follow</button>
            </div>
          );
        })}
        <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400" onClick={()=>{
          return setUsersNum(usersNum + 3)
        }}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
