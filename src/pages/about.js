import React from "react";
import { useTheme } from 'next-themes'
import { FiSunrise, FiMoon, FiMenu } from 'react-icons/fi'
import { AiFillAndroid, AiFillApple, AiOutlineCheck } from "react-icons/ai";
import Navbar from '../components/navbar';
import Footer from '../components/footer'

function About () {
    const { theme, setTheme } = useTheme()
    return (
        <div>
            <Navbar />

            <section className="bg-slate-100 dark:bg-slate-900 pt-16">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl dark:text-slate-100 text-zinc-900">
                            <span className="text-yellow-400">Dauntless</span>
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 text-zinc-900 dark:text-slate-400">About Us</p>
                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-112 xl:h-112 2xl:h-128">
                        <img src="images/about-img.png" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 rounded" />
                    </div>
                </div>
            </section>

            <section className="bg-slate-200 dark:bg-slate-800 dark:text-coolGray-100 mb-8">
                <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl text-zinc-900 dark:text-slate-200">About Dauntless</h2>
                        {/* <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-yellow-400">Dauntless is </p> */}
                    </div>
                    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-yellow-400">Why is Dauntless the best?</h3>
                            <p className="mt-6 space-y-12 text-slate-800 dark:text-slate-200">
                                A platform designed for YOU to trade, buy, and sell digital assets such as gift cards, Bitcoins, Tether, Litecoins, Dogecoins, Airtime, and Data topup.
                                Payment options include Naira, Cedis, Bitcoin, and USDT. 
                            </p>
                            <p className="mt-6 space-y-12 text-slate-800 dark:text-slate-200">
                                As a Dauntless user, you have access to highly secure Bitcoin, TETHER (USDT), Dogecoin, and Litecoin wallet addresses that are unique to each account
                                and can be used to receive crypto from anywhere in the world at any time in exchange for naira or cedis.
                            </p>
                            <p className="mt-6 space-y-12 text-slate-800 dark:text-slate-200">
                                Dauntless is Nigeria's leading online gift card and cryptocurrency exchange platform.
                                Thousands of customers across the country have tried and trusted it.
                                No more losing hard-earned bitcoin and gift cards to rippers; instead, sell on Dauntless and rest easy. 
                            </p>
                            
                        </div>
                        <div aria-hidden="true" className="mt-10 lg:mt-0">
                            <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lmdCUyMGNhcmQlMjB0cmFkZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="image" className="mx-auto rounded-lg shadow-lg dark:bg-coolGray-500" />
                        </div>
                    </div>
                    <div>
                    
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default About