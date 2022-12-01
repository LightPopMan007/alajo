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
import Visibility from '@material-ui/icons/Visibility'
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

const Id = ({ user, agent, contributor, cards }) => {
  const Router = useRouter();

  const column = [
    {
      title: "Agent ID", field: "agent_id", editable: false, headerStyle: {
        backgroundColor: 'orange',
        fontWeight: 'bold',
      }, render: (rowData) => <p className="text-ms font-semibold">TC{rowData.agentId}</p>
    },

    {
      title: "Agent", editable: false,
      headerStyle: {
        backgroundColor: 'orange',
        fontWeight: 'bold',
      },
      render: (rowData) => {
        return (
          <div className="flex text-sm">
            <div>
              <p className="font-semibold text-black">{rowData.firstName} {rowData.lastName}</p>
              <p className="text-xs text-gray-600">Joined {moment(rowData.created_at).fromNow()}</p>
            </div>
          </div>
        )
      }
    },

    {
      title: "Status", field: "status",
      lookup: { true: "Active", false: "Banned", 'true': "Active", 'false': "Banned" },
      headerStyle: {
        backgroundColor: 'orange',
        fontWeight: 'bold',
      },
      render: rowData => {
        return (
          <div className="flex items-center">
            {
              rowData.status == true || rowData.status == 'true' ? (
                <div className="badge badge-success gap-2">
                  Active
                </div>
              ) : (
                <div className="badge badge-error gap-2">
                  Banned
                </div>
              )
            }
          </div>
        )
      },
    },
    {
      title: "Available Balance", editable: false, headerStyle: {
        backgroundColor: 'orange',
        fontWeight: 'bold',
      },
      render: rowData => {
        return (
          <div className="flex items-center">
            {
              rowData !== undefined || rowData.amount != '0' ? (
                <p className="text-ms font-semibold">${rowData.amount}</p>) : (
                <p className="text-ms font-semibold">0</p>
              )
            }
          </div>
        )
      }
    }
  ]

  // const [data, setData] = useState(user)
  // const [cardType, setCardType] = useState([])
  // const [selectedRow, setSelectedRow] = useState(null);

  // const sle = (id) => cards?.filter(card => card.id == id);

  return (
    <AdminLayout>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
          <Breadcumb title={'Agent Dashboard 🦸‍♂️'} />

          <div className="border-t solid border-gray-700 py-2 flex flex-wrap 2xl:items-start w-full ">
            <div className="w-full lg:w-3/12 px-1 pl-0 my-1">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg rounded-lg w-full flex justify-between items-center">
                <div className="py-5 px-5">
                  <span className="font-light text-slate-100 text-sm">Total Contributors</span>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-slate-100 font-bold">
                      {agent?.contributors}
                    </div>
                  </div>
                </div>

                <div className='pr-5'>
                  <FaUsers className='text-white' size={40} />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/12 px-1 my-1">
              <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-lg rounded-lg w-full flex justify-between items-center">
                <div className="py-5 px-5">
                  <span className="font-light text-slate-100 text-sm">Total Withdrawals</span>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-slate-100 font-bold">
                      {agent?.withdrawals}
                    </div>
                  </div>
                </div>

                <div className='pr-5'>
                  <FaWallet className='text-white' size={40} />
                </div>
              </div>
            </div>

           

            <div className="w-full lg:w-3/12 px-1 pr-0 my-1">
              <div className="bg-gradient-to-r from-lime-400 to-lime-600 shadow-lg rounded-lg w-full flex justify-between items-center">
                <div className="py-5 px-5">
                  <span className="font-light text-slate-100 text-sm">Total Money Collected</span>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-slate-100 font-bold">
                      {agent?.amount}
                    </div>
                  </div>
                </div>

                <div className='pr-5'>
                  <FaMoneyBillWave className='text-white' size={40} />
                </div>
              </div>
            </div>


            <div className="w-full lg:w-3/12 px-1 my-1">
              <div className="bg-gradient-to-r from-lime-400 to-lime-600 shadow-lg rounded-lg w-full flex justify-between items-center">
                <div className="py-5 px-5">
                  <span className="font-light text-slate-100 text-sm">Agents</span>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-slate-100 font-bold">
                      121
                    </div>
                  </div>
                </div>

                <div className='pr-5'>
                  <FaUserSecret className='text-white' size={40} />
                </div>
              </div>
            </div>


          </div>

          <div className="px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-yellow-600 rounded-xl mt-4">
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
                  Contributors <span className="text-md text-green-500"></span>
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
                  Contribution
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

                  <div className="flex flex-wrap mt-8">
                    <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                      <div className="flex flex-row justify-between">
                        <p className='dark:text-gray-100 text-black text-2xl pb-6 font-bold'>Contributors</p>
                      </div>
                      <section className="container mx-auto p-6 font-mono">
                        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                          <div className="w-full overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  uppercase border-b border-gray-600">
                                  <th className="px-4 py-3">Contributor Id</th>
                                  <th className="px-4 py-3">Trade Type</th>
                                  {/* <th className="px-4 py-3">Customer</th> */}
                                  <th className="px-4 py-3">Address</th>
                                  <th className="px-4 py-3">phoneNumber</th>
                                  <th className="px-4 py-3">Date</th>
                                  <th className="px-4 py-3">email</th>
                                  <th className="px-4 py-3">Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {
                                  user?.length > 0 ?
                                    user?.map((item, index) => (
                                      <tr className="text-gray-700" key={index}>
                                        <td className="px-4 py-3 text-ms font-semibold border">Trade00{item?.id}</td>
                                        <td className="px-4 py-3 border">
                                          <div className="flex items-center text-sm">
                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                              {/* <img className="object-cover w-full h-full rounded-full" src={} alt="" loading="lazy" /> */}
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

                {/* Contributions */}
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
                                  <th className="px-4 py-3">Contributor Id</th>
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
                                  user?.length > 0 ?
                                    user?.map((item, index) => (
                                      <tr className="text-gray-700" key={index}>
                                        <td className="px-4 py-3 text-ms font-semibold border">Trade00{item?.id}</td>
                                        <td className="px-4 py-3 border">
                                          <div className="flex items-center text-sm">
                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                              {/* <img className="object-cover w-full h-full rounded-full" src={} alt="" loading="lazy" /> */}
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




                {/* Withdraw Tabs */}
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
    const agent = {
      id: 2,
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '555 7675 2451',
      email: 'johnsmith@gmail.com',
      amount: '3,500',
      contributors: '15',
      withdrawals: '25'
    }

    const contributor = [

    ]

    const contribution = [

    ]

    const trans = [

    ]
    // const req = await Server.get(`/admin/user/${id}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // const cards = await Server.get('/card/card-type')
    // const user = await req.data.message;
    // console.log(user)
    return {
      props: {
        agent,
        contribution,
        contributor,
        trans
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