import React from "react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import News from "./News";

const Widgets = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
      );
      const data = await res.json();
      setArticles(data.articles);
    };

    fetchData();
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
      <div className="">
        <h4>Whats Happening</h4>
        {articles?.map((article) => {
          return <News key={article.title} article={article} />;
        })}
        <button>Show more</button>
      </div>
    </div>
  );
};

export default Widgets;
