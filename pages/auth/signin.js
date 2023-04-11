import React from "react";
import { getProviders, signIn } from "next-auth/react";

const Signin = ({ providers }) => {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      <img
        src="https://www.techbooky.com/wp-content/uploads/2021/07/4859E08D-388B-4475-9FCC-C05914CC654A.png"
        alt="twitter puppy image"
        className="hidden object-cover md:w-44 md:h-80 rotate-6 md:inline-flex"
      />
      <div className="">
        {Object.values(providers).map((provider) => {
          return (
            <div className="flex flex-col items-center">
              <img
                className="w-36 object-cover "
                src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/twitter_logo_blue.png.twimg.768.png"
                alt="twitter logo"
              />
              <p className="text-center text-sm italic my-10 ">
                This app is created for learning purposes
              </p>
              <button
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
                onClick={() => {
                  signIn(provider.id,{callbackUrl:"/"});
                }}
              >
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Signin;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
