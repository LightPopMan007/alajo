import React, { useEffect, useState } from "react";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";
import { FaHandshake, FaDollarSign, FaMobileAlt } from "react-icons/fa";
import Navbar from '../components/navbar';
import Footer from '../components/footer'
import { signOut, useSession } from 'next-auth/react'

import Stack from '@mui/material/Stack';
import { Server } from './api/lib/service';


function Index({ cards, cardType }) {
  const { session: session, status } = useSession();
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);

  const [brand, setBrand] = useState('')

  useEffect(() => {
    setData(cards);
  }, []);

  const cardBrandSelect = async (event) => {
    setBrand(event.target.value);
    console.log(event.target.value)
    
    const type =  cardType.filter((card) => card.card_id == event.target.value)
    setType(type.length > 0 ? type : []);
  }




  return (
    <div>
      <Navbar
        login={
          status === 'authenticated' ? (true) : (false)
        }
      />

      {/* Modal */}

      <div className="modal" id="my-modal-1">
        <div className="modal-box">
          <iframe src="https://www.youtube.com/embed/stNnNjM-Rhk" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="w-100" allowFullScreen></iframe>

          <div className="modal-action">
            <a href="#" className="btn bg-red-600 mx-1 text-slate-100 transition">Cancel</a>
          </div>
        </div>
      </div>


      <section className="bg-slate-100 dark:bg-slate-900 pt-12">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 sm:pt-24 lg:py-20 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold leading-none dark:text-slate-100 text-zinc-900">Welcome to <br />
              <span className="text-yellow-400">Dauntless</span> GC
            </h1>
            <p className="mt-6 mb-8 text-sm md:text-lg sm:mb-12 text-zinc-900 dark:text-slate-400">
              <br className="hidden md:inline lg:hidden" />Welcome to trading experience and satisfaction you won't find anywhere else.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a href="#" className="px-8 py-3 text-lg font-semibold rounded bg-yellow-400 hover:bg-yellow-600 text-slate-100 flex items-center justify-center">
                <AiFillAndroid /> <span className="inline-block">&nbsp; Android</span></a>
              <a href="#" className="px-8 py-3 text-lg font-semibold rounded border border-yellow-400 hover:bg-yellow-400 dark:text-slate-100 text-zinc-900 flex items-center justify-center">
                <AiFillApple /> &nbsp; iOS App</a>
            </div>
          </div>


          <div className="items-center relative text-center py-6 md:py-6 mt-4 md:mt-8 flex">
            <img src="images/header-img.png" alt="" className="header-img" data-aos="fade-up" data-aos-duration="500" data-aos-delay="6000" />
            <img src="images/card-float.png" alt="" className="card-float one" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="600" />
            <img src="images/card-float2.png" alt="" className="card-float two" data-aos="fade-left" data-aos-duration="1700" data-aos-delay="800" />
            <img src="images/card-float3.png" alt="" className="card-float three" data-aos="fade-down" data-aos-duration="1500" data-aos-delay="800" />
          </div>
        </div>
      </section>

      {/* h-72 sm:h-80 lg:h-112 xl:h-112 2xl:h-128 */}


      <section className="pt-8 pb-6 px-16 md:px-36 bgimg">
        <span className="block mb-2 text-sm font-bold  uppercase lg:text-center text-yellow-400">Exchange your gift card at your convenience.</span>
        <h2 className="text-3xl md:text-5xl font-bold lg:text-center text-slate-200">Our Values</h2>
        <div className="grid gap-6 my-16 lg:grid-cols-3">

          <div className="card-info bg-slate-100 dark:bg-slate-900 hover:bg-yellow-400 dark:hover:bg-yellow-400 space-y-4 p-8" data-aos="fade-up" data-aos-duration="1000">
            <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full"> <FaHandshake /> </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white hover:text-white">Honesty.</h3>
            <p className="text-slate-700 dark:text-slate-100 hover:text-white">Trade with high confidence, as we assure you the highest level of honesty and professionalism.</p>
            <p className="text-slate-700 dark:text-slate-100 hover:text-white">Doing what is ethical because it is the right thing to do is the essential core belief at Dauntless.</p>
            {/* <p className="text-slate-700 dark:text-slate-100 hover:text-white">Trade with high confidence, as we assure you the highest level of encryption and professionally audited exchange system.</p> */}
          </div>

          <div className="card-info bg-slate-100 dark:bg-slate-900 hover:bg-yellow-400 dark:hover:bg-yellow-400 space-y-4 p-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full"> <FaDollarSign /> </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white hover:text-white">Fast Payment</h3>
            <p className="text-slate-700 dark:text-slate-100 hover:text-white">Using fast and reliable payment procedures, you are guaranteed to get your payment sent to your account within minutes.</p>
          </div>

          <div className="card-info bg-slate-100 dark:bg-slate-900 hover:bg-yellow-400 dark:hover:bg-yellow-400 space-y-4 p-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full"> <FaMobileAlt /> </span>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white hover:text-white">Transparency</h3>
            <p className="text-slate-700 dark:text-slate-100 hover:text-white">Transparency and Trust are the core pillars of any company to customer relationship.</p>
            <p className="text-slate-700 dark:text-slate-100 hover:text-white">Dauntless looks to build trust and loyalty with their customers by promoting a transparent culture.</p>
          </div>
        </div>
      </section>

      <div className="p-8 space-y-8 lg:col-span-full lg:py-12 bg-slate-100 dark:bg-slate-900">
        <div className="md:w-7/12 w-full mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-4 font-bold text-slate-900 dark:text-slate-200">Why Us?</h2>
          <p className="mt-2 text-lg medium-font text-slate-800 dark:text-slate-200">
            Dauntless is a registered gift card trading platform dedicated to providing you with the best trading experience.</p>
          <p className="mt-2 text-lg medium-font text-slate-800 dark:text-slate-200">At Dauntless, we believe there is a better way to do Gift card trading. Our expertise lies in providing you with fast and easy trades and transactions.</p>

          <p className="mt-2 text-lg medium-font text-slate-800 dark:text-slate-200">With the following features, we are able to provide you with the best trading experience.
          </p>
          <div className="grid gap-6 my-16 lg:grid-cols-3">

            <div>
              <p className="font-bold text-yellow-400 inline-block"> - TRADING IS EASY AND FAST
              </p>
              <p className="dark:text-slate-200 text-slate-700 mb-2 inline-block">Selling a gift card is quick and simple.
                Create an account, link your Nigerian bank account, and then begin trading and withdrawing money. </p>
            </div>

            <div>
              <p className="font-bold text-yellow-400 inline-block"> - 20+ GIFT CARDS SUPPORTED
              </p>
              <p className="dark:text-slate-200 text-slate-700 mb-2 inline-block">We offer you the best experience when you trade your Vanilla, American Express, Visa and Mastercard Prepaid Debit Cards to us.
                We also support and trade Steam, Apple iTunes, Sephora, Google Play, Nordstrom and many more.
              </p>
            </div>

            <div>
              <p className="font-bold text-yellow-400 inline-block"> - QUICK CONFIRMATIONS
              </p>
              <p className="dark:text-slate-200 text-slate-700 mb-2 inline-block">We know you like to trade fast and get paid fast, this is what the DC Trader offers you as we believe our app was built for this and once trade is confirmed, we will release your funds.
              </p>
            </div>
          </div>
        
    
        </div>  
      </div>

      <section className="bg-slate-200 dark:bg-slate-800 dark:text-coolGray-100">
        <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:justify-between">
          <div className="flex-1 justify-center p-6 mt-8 lg:mt-0" data-aos="fade-right" data-aos-duration="1200">
            <img src="images/mobile.png" alt="smartphone" className="object-contain rounded w-7/12 m-auto" />
          </div>

          <div className="flex-1">
            <div className="flex-col justify-center px-6 py-12 text-left rounded-sm lg:max-w-md xl:max-w-lg">
              <h1 className="text-2xl font-bold leading-none sm:text-5xl text-slate-900 dark:text-slate-200">Trade with us on
                <span className="text-yellow-400"> Dauntless GC</span> Mobile App
              </h1>
              <p className="mt-6 text-lg sm:mb-3 medium-font text-slate-800 dark:text-slate-200">
                Dauntless GC Trader offers you the best trading experience
                when you sell your Vanilla , American Express, Visa, and Mastercard Prepaid Debit Cards to us.
              </p>
              <p className="mt-6 text-lg sm:mb-3 medium-font text-slate-800 dark:text-slate-200">You're also allowed to trade gift cards from a variety of retailers,
                including iTunes, Amazon, Steam Wallet, Google Play, Apple Store, eBay, Walmart, Sephora,
                OneVanilla, Nordstrom, Target, JCPenney, Best Buy, Nike, Hotels.com, Macy's, Gamestop,
                and others.</p>
              <p className="mt-2 text-lg sm:mb-12 medium-font text-slate-800 dark:text-slate-200">Our payment system is superb. Once your trade is confirmed, you'll get your money in your in-app wallet.
              Simply login, go to <span className="italic text-yellow-400">My Money</span> tab, and you'll find your money there.
                <br /> Don't worry about rates. We offer the best payout for your assets based on the current market value.
              </p>
              <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                <a href="#rates" type="button"
                  className="px-8 py-3 text-lg font-semibold rounded border border-yellow-400 hover:bg-yellow-400 dark:text-slate-100 text-zinc-900 flex items-center justify-center">
                  Check Out Our Rates Below
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>


      <section id="rates" className="bg-slate-100 dark:bg-slate-900 px-16 pb-16 md:px-36" data-aos="fade-up" data-aos-duration="1200">
        <span className="font-bold block text-2xl dark:text-yellow-400 pt-10 text-yellow-400">Cards Rate and Values</span>

        <div className="flex flex-wrap items-center justify-between w-full mt-6">
            
          <select className="select max-w-xs mt-1"
            value={brand}
            onChange={(e) => cardBrandSelect(e)}>
            <option selected>Select a card</option>
            {
              data.map((item, index) => {
                return <option key={index} value={item.id}>{item.name}</option>
              })
            }
          </select>

        </div>
        {
          type.length > 0 && (
            <div className="cards mt-8" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
              <span className="cardName mb-6 block text-slate-800 dark:text-slate-200 text-2xl font-bold">{type[0]?.card?.name} Cards</span>

              <div className="p-8 space-y-4 rounded-md bg-slate-300 dark:bg-gray-800 flex flex-wrap items-center">
                <div className="w-full lg:w-4/12">
                  <img className="rounded" src={type[0]?.card.picture} alt="giftcard" />
                </div>

                <div className="w-full lg:w-7/12 ml-2">
                  <div className="overflow-x-auto">
                    <table className="table w-full">

                      <thead>
                        <tr>
                          <th>Cards</th>
                          <th>Rate (rate in naira to dollars)</th>
                          <th>Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        type.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>&#8358;{item.rate}/$</td>
                              <td>{item.type?.name}</td>
                              <td>{item.status == 0 ? 'Not Taking Trading' : 'Taking Trades'}</td>
                            </tr>
                          )
                        })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )
        }


      </section>

      <section className="bg-slate-200 dark:bg-slate-800 dark:text-coolGray-100 py-4">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left" data-aos="fade-right">
            <h1 className="text-4xl font-bold leading-none sm:text-5xl text-slate-900 dark:text-slate-200">Download
              <span className="text-yellow-400"> Dauntless GC</span> App
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12 text-slate-800 dark:text-slate-200">Experience the best of Dauntless GC Trading platform as you download our mobile application to your phone or tablet.
              <br /> Available for iOS and Android operating systems.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded bg-yellow-400 hover:bg-yellow-600 text-slate-100 flex items-center justify-center">
                <AiFillAndroid /> <span className="inline-block">&nbsp; Android</span></a>
              <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded border border-yellow-400 hover:bg-yellow-400 dark:text-slate-100 text-zinc-900 flex items-center justify-center">
                <AiFillApple /> &nbsp; iOS App</a>
            </div>
          </div>


          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" data-aos="fade-up">
            <img src="images/androidios.png" alt="" className="object-contain rounded h-76 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 dark:bg-coolGray-500" />
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-6 dark:bg-slate-900">
        <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:justify-between">
          <div className="flex-1 justify-center pb-8 mt-8 lg:mt-0" data-aos="fade-up" data-aos-duration="1200">
            <div className="w-full rounded">
              <p className="text-5xl font-bold leading-7 text-center text-slate-900 dark:text-slate-100 l-height">Contact Us</p>
              <form action="" method="post">
                <div className="md:flex items-center mt-12">
                  <div className="w-full md:w-1/2 flex flex-col">
                    <label className="font-semibold leading-none text-slate-800 dark:text-slate-100">Name</label>
                    <input type="text" className="leading-none p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 text-slate-900 dark:text-gray-50 bg-slate-200 dark:bg-gray-800 rounded" />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                    <label className="font-semibold leading-none text-slate-800 dark:text-slate-100">Phone</label>
                    <input type="email" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 text-slate-900 dark:text-gray-50 bg-slate-200 dark:bg-gray-800 rounded" />
                  </div>
                </div>
                <div className="md:flex items-center mt-8">
                  <div className="w-full flex flex-col">
                    <label className="font-semibold leading-none text-slate-800 dark:text-slate-100">Subject</label>
                    <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 text-slate-900 dark:text-gray-50 bg-slate-200 dark:bg-gray-800 rounded" />
                  </div>

                </div>
                <div>
                  <div className="w-full flex flex-col mt-8">
                    <label className="font-semibold leading-none text-slate-800 dark:text-slate-100">Message</label>
                    <textarea type="text" className="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 text-slate-900 dark:text-gray-50 bg-slate-200 dark:bg-gray-800 border-0 rounded resize-none"></textarea>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full">
                  <button className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex-1 hidden md:flex" data-aos="fade-up" data-aos-delay="300">
            <img src="images/smartphone.png" alt="" className="object-contain rounded w-12/12 m-auto" />
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <Footer />
    </div >



  )
}

export default Index

export async function getServerSideProps(context) {
  const card = await Server.get('/card')
  const cardType = await Server.get('/card/card-type')
  console.log(cardType.data.message)
  return {
    props: {
      cards: card.data?.message,
      cardType: cardType.data?.message
    }
  }
}