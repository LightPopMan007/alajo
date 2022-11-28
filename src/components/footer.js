import React from 'react';
import { FiTwitter, FiMoon, FiMenu } from 'react-icons/fi';
import { AiOutlineTwitter, AiFillInstagram, AiFillFacebook } from "react-icons/ai";

export default function Footer() {
  return (
      <footer className="-mt-12">
          <div className="bg-zinc-900">
              <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 text-center">
                  <div className="mb-8 lg:grid-cols-6 inline-block">
                      <div className="md:max-w-md lg:col-span-2">
                          <span className="text-base font-medium tracking-wide text-gray-300">Subscribe for updates</span>
                          <form className="flex flex-col mt-4 md:flex-row">
                              <input
                                  placeholder="Email"
                                  required=""
                                  type="text"
                                  className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                              />
                              <button
                                  type="submit"
                                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-yellow-400 hover:bg-yellow-700 focus:shadow-outline focus:outline-none"
                              >
                                  Subscribe
                              </button>
                          </form>
                          <p className="mt-4 text-sm text-gray-500">
                              Get priceless emails packed with value offers every week. Don't miss out!
                          </p>
                      </div>
                  </div>
                  <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
                      <p className="text-sm text-gray-500">
                          © Copyright 2022 Dauntless Inc. All rights reserved.
                      </p>
                      <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                          <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400">
                              <AiOutlineTwitter size={"25px"} />
                          </a>
                          <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400">
                              <AiFillInstagram size={"25px"} />
                          </a>
                          <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400">
                              <AiFillFacebook size={"25px"} />
                          </a>
                      </div>
                  </div>
                  <div className="w-full text-center text-sm text-white pb-2">
                    <h1>Powered by Perfcreg Solutions.</h1>
                  </div>
              </div>
          </div>
      </footer>
  )
}
