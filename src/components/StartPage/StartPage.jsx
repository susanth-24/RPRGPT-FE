import React from 'react';
import logo from '../../assets/rprgpt.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(user)
  let route = "/";
  if (user?.result?.post === 'Admin') {
    route = "/admin/chat";
  } else if (user?.result?.post === 'User') {
    route = "/user/chat";
  }


  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-20 sm:py-48 lg:py-6">
          <div className="flex items-center justify-center mb-8">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6">
              <div className="flex items-center justify-center">
                <img src={logo} alt="logo" className="h-[170px] object-contain" />
              </div>
            </div>
          </div>


          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
              RPR GPT
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
            RPR GPT is a smart chatbot built to provide accurate and instant answers to a wide range of queries related to IIT Ropar. Whether it's about academics, campus life, events, or facilities, RPR GPT aims to be a one-stop solution for all informational needs at the institute.

            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {/* <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a> */}
              {(!user?.result) ? (
                <>
                <Link to="/auth/signin">
                  <button type="button" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                </Link>
                <Link to="/auth/signup">
                <button type="button" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SignUp</button>
              </Link>
              </>
              ) : (
                <Link to={route}>
                <button type="button" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Chat</button>
                </Link>
              )}
              <a href="docs" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
