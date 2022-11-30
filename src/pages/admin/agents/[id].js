// import Content from '../components/content';
import React, { useState, useEffect } from 'react';
import Breadcumb from '../../../components/breadcumb';
import { RiBankFill } from 'react-icons/ri'
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from 'react-icons/ai'
import AdminLayout from '../../../dashboard/AdminLayout';
import MaterialTable, { Column } from "@material-table/core";
import { Tab } from '@headlessui/react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FiCamera, FiEye } from 'react-icons/fi';
import { RiExchangeLine } from 'react-icons/ri';

import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Server, imageLoader } from '../../api/lib/service';
import { FaUsers, FaWallet, FaUserPlus, FaMoneyBillWave, FaDollarSign, FaUserSecret, FaStar } from "react-icons/fa";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Input = styled('input')({
  display: 'none',
});

const Id = ({ user, cards }) => {
  const Router = useRouter()

  const [data, setData] = useState(user)
  const [cardType, setCardType] = useState([])
  const [selectedRow, setSelectedRow] = useState(null);

  const sle = (id) => cards?.filter(card => card.id == id);

  return (
    <AdminLayout>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
          <Breadcumb title={'User 🦸‍♂️'} />

          <div className="px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-yellow-600 rounded-xl">
                {/* {Object.keys(categories).map((category) => ( */}
                <Tab
                  // key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  User Profile <span className="text-md text-green-500"></span>
                </Tab>

                <Tab
                  // key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Trades
                  <span className="text-md text-green-500"></span>

                </Tab>

                <Tab
                  // key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Withdrawals <span className="text-md text-red-500"></span>
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  // key={idx}
                  className={classNames(
                    'bg-white dark:bg-gray-700 rounded-xl p-3',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                  )}
                >

                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-8/12  bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                      <div className='flex-row'>
                        <div className="flex text-white text-2xl pb-6 font-bold">
                          <p className='dark:text-gray-100 text-black'>User Profile</p>
                        </div>
                        <div className="w-full pb-5 mt-4 overflow-hidden rounded-lg shadow-lg dark:bg-slate-300 bg-white">
                          <div className="h-40 bg-gradient-to-br from-orange-400 via-yellow-500 to-gray-600">
                            <div className="flex justify-center">
                              <span className="mt-10 text-4xl font-extrabold  text-white">{user?.full_name}</span>
                            </div>
                            <div className="flex justify-center">
                              <img className="object-cover w-24 h-24 mt-4 border-4 border-orange-400 rounded-full" src={imageLoader({ src: user?.picture, width: 100, quality: 1 })} />
                            </div>
                          </div>
                          <div className="px-6 py-4">
                            <div className="flex justify-center mt-10 mb-4 text-xl font-medium">Joined {moment(user?.created_at).fromNow()}</div>
                            <div className="flex my-1 text-gray-600">
                              <AiOutlineMail size={20} className="h-5 mt-1 mr-2" />
                              <span>{user?.email}</span>
                            </div>

                            <div className="flex text-gray-600">
                              <AiOutlinePhone size={20} className="h-5 mt-1 mr-2" />

                              <span>{user?.phone_number}</span>
                            </div>

                            <div className="flex text-gray-600">
                              <AiOutlineUser size={20} className="h-5 mt-1 mr-2" />
                              <span>Daunt00{user?.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-col mt-5 gap-7 text-sm">
                        <div
                          className="bg-yellow-50 flex justify-between items-center p-3 rounded-sm shadow-sm"
                        >{
                            user?.userBanks?.length ?
                              user?.userBanks.map((item) => (
                                <div className="flex justify-start items-center gap-2">
                                  <RiBankFill color={'gold'} size={20} />
                                  <div>
                                    <p className="text-gray-700 font-bold tracking-wider pr-2">
                                      {item?.account_number}
                                    </p>
                                    <p className="text-gray-400 text-sm">{item?.account_name}</p>
                                    <p className="text-gray-400 text-sm">{item?.bank_name}</p>
                                  </div>
                                </div>
                              )) :
                              (
                                <div className="flex justify-start items-center gap-2">
                                  {/* <RiBankFill color={'gold'} size={20} /> */}
                                  <div>
                                    <p className="text-gray-700 font-bold tracking-wider pr-2">
                                      User has No account yet
                                    </p>
                                    {/* <p className="text-gray-400 text-sm">0232882872</p> */}
                                  </div>
                                </div>
                              )

                          }


                        </div>


                      </div>
                    </div>
                    {/* account card info */}


                    <div className="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
                      <div className="dark:bg-gray-800 bg-gray-300 rounded-3xl px-6 pt-6">
                        <div className="flex text-white text-2xl pb-6 font-bold">
                          <p className='dark:text-gray-100 text-black'>User Stats</p>
                        </div>
                        <div className="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full dark:hover:bg-gray-700  hover:bg-gray-200">

                          <div className="bg-gradient-to-r from-lime-400 to-lime-600 shadow-lg rounded-lg w-full flex justify-between items-center">
                            <div className="py-5 px-5">
                              <span className="font-light text-slate-100 text-sm">Available Balance</span>
                              <div className="flex items-center justify-between">
                                <div className="text-3xl text-slate-100 font-bold">
                                  &#x20A6; {user?.userWallet?.amount}
                                </div>
                              </div>
                            </div>

                            <div className='pr-5'>
                              <FaMoneyBillWave className='text-white' size={40} />
                            </div>
                          </div>
                        </div>
                        <div className="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full dark:hover:bg-gray-700 hover:bg-gray-200">
                          <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-lg rounded-lg w-full flex justify-between items-center">
                            <div className="py-5 px-5">
                              <span className="font-light text-slate-100 text-sm">Total Trades</span>
                              <div className="flex items-center justify-between">
                                <div className="text-3xl text-slate-100 font-bold">
                                  {user?.cardTransactions?.length}
                                </div>
                              </div>
                            </div>

                            <div className='pr-5'>
                              <RiExchangeLine className='text-white' size={40} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>



                  </div>
                </Tab.Panel>

                <Tab.Panel
                  // key={idx}
                  className={classNames(
                    'bg-white dark:bg-gray-700 rounded-xl p-3',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                  )}
                >

                  <div className="flex flex-wrap mt-8">
                    <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                      <div className="flex flex-row justify-between">
                        <p className='dark:text-gray-100 text-black text-2xl pb-6 font-bold'>Trades</p>
                      </div>
                      <section className="container mx-auto p-6 font-mono">
                        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                          <div className="w-full overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  uppercase border-b border-gray-600">
                                  <th className="px-4 py-3">Reference Id</th>
                                  <th className="px-4 py-3">Trade Type</th>
                                  {/* <th className="px-4 py-3">Customer</th> */}
                                  <th className="px-4 py-3">Total</th>
                                  <th className="px-4 py-3">Status</th>
                                  <th className="px-4 py-3">Date</th>
                                  <th className="px-4 py-3">Updated</th>
                                  <th className="px-4 py-3">Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {
                                  user?.cardTransactions?.length > 0 ?
                                    user?.cardTransactions.map((item, index) => (
                                      <tr className="text-gray-700" key={index}>
                                        <td className="px-4 py-3 text-ms font-semibold border">Trade00{item?.id}</td>
                                        <td className="px-4 py-3 border">
                                          <div className="flex items-center text-sm">
                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                              <img className="object-cover w-full h-full rounded-full" src={sle(item.card_type_id)[0]?.card?.picture} alt="" loading="lazy" />
                                              <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true">
                                                { }
                                              </div>
                                            </div>
                                            <div>
                                              <p className="font-semibold text-black">{item?.name}</p>
                                              <p className="text-xs text-gray-600">{sle(item?.card_type_id)[0]?.name} * {item?.count}</p>
                                              <p className="text-md text-gray-600">{sle(item.card_type_id)[0]?.type?.name == "Ecode" ? "Ecode" : "Physical"}</p>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3 text-ms font-semibold border">#{item?.total}</td>
                                        <td className="px-4 py-3 text-xs border">
                                          {
                                            item?.trade_status_id == 2 ? <span className="px-2 py-1 font-semibold leading-tight text-blue-700 bg-blue-100 rounded-sm"> Pending </span>
                                              : item?.trade_status_id == 3 ? <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> Failed </span>
                                                : item?.trade_status_id == 1 ? <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Completed </span>
                                                  : <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Processing </span>
                                          }
                                        </td>
                                        <td className="px-4 py-3 text-sm border">{moment(item?.created_at).calendar()}</td>
                                        <td className="px-4 py-3 text-sm border">{moment(item?.updated_at).calendar()}</td>

                                        <td className="px-4 py-3 text-sm border">
                                          <a className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-orange-100 py-2 px-4 rounded inline-flex items-center" href={`../trade/${item?.id}`}>
                                            <span>
                                              <FiEye
                                                size={20}
                                              />
                                            </span>
                                          </a>

                                        </td>

                                      </tr>
                                    )) : (
                                      <tr>
                                        <p>No Trade Yet</p>

                                      </tr>
                                    )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>

                </Tab.Panel>
                <Tab.Panel
                  // key={idx}
                  className={classNames(
                    'bg-white dark:bg-gray-700 rounded-xl p-3',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                  )}
                >

<div className="flex flex-wrap mt-8">
                    <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                      <div className="flex flex-row justify-between">
                        <p className='dark:text-gray-100 text-black text-2xl pb-6 font-bold'>Trades</p>
                      </div>
                      <section className="container mx-auto p-6 font-mono">
                        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                          <div className="w-full overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  uppercase border-b border-gray-600">
                                  <th className="px-4 py-3">Reference Id</th>
                                  <th className="px-4 py-3">amount</th>
                                  <th className="px-4 py-3">bank</th>
                                  <th className="px-4 py-3">Account Number</th>

                                  <th className="px-4 py-3">Status</th>
                                  <th className="px-4 py-3">Date</th>
                                  <th className="px-4 py-3">Updated</th>
                                  <th className="px-4 py-3">Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {
                                  user?.userWithdraw?.length > 0 ?
                                    user?.userWithdraw.map((item, index) => (
                                      <tr className="text-gray-700" key={index}>
                                        <td className="px-4 py-3 text-ms font-semibold border">withdraw00{item?.id}</td>
                                        <td className="px-4 py-3 border">
                                        {item?.amount}
                                        </td>
                                        <td className="px-4 py-3 border">
                                        {item?.account_number}
                                        </td>
                                        <td className="px-4 py-3 text-ms font-semibold border">{item?.bank}</td>
                                        <td className="px-4 py-3 text-xs border">
                                          {
                                            item?.trade_status_id == 2 ? <span className="px-2 py-1 font-semibold leading-tight text-blue-700 bg-blue-100 rounded-sm"> Pending </span>
                                              : item?.trade_status_id == 3 ? <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> Failed </span>
                                                : item?.trade_status_id == 1 ? <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Completed </span>
                                                  : <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Processing </span>
                                          }
                                        </td>
                                        <td className="px-4 py-3 text-sm border">{moment(item?.created_at).calendar()}</td>
                                        <td className="px-4 py-3 text-sm border">{moment(item?.updated_at).calendar()}</td>

                                        <td className="px-4 py-3 text-sm border">
                                          <a className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-orange-100 py-2 px-4 rounded inline-flex items-center" href={`../trade/${item?.id}`}>
                                            <span>
                                              <FiEye
                                                size={20}
                                              />
                                            </span>
                                          </a>

                                        </td>

                                      </tr>
                                    )) : (
                                      <tr>
                                        <p>No Trade Yet</p>

                                      </tr>
                                    )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>

                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>

        </div>
      </div>

    </AdminLayout>
  );
}

export default Id;


export async function getServerSideProps(context) {
  const session = await getSession(context);
  const token = session?.accessToken;
  const id = context.params.id;
  try {
    const req = await Server.get(`/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cards = await Server.get('/card/card-type')
    const user = await req.data.message;
    console.log(user)
    return {
      props: {
        user,
        cards: cards.data.message,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/logout'
      }
    };
  }
}