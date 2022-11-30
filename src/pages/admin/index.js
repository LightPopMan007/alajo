// import Content from '../components/content';
import React, { useState, useEffect, useCallback } from 'react';
import Breadcumb from '../../components/breadcumb';
import Statistics from '../../components/statistics';
import AreaChart from '../../components/chart';
import DoughnutChart from '../../components/donut';
import DropdownRender from '../../components/dropdown';
import { FiUserPlus, FiDollarSign, FiActivity, FiEye } from 'react-icons/fi'
import AdminLayout from '../../dashboard/AdminLayout';
import { Server, imageLoader } from '../api/lib/service';
import { getSession } from 'next-auth/react';
import moment from 'moment';
import Error from 'next/error'
import Image from 'next/image' 
import Head from "next/head";

export default function HomePage(props) {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Today", "A week ago", "A month ago", "A year ago"];
  const [trades, setTrades] = useState([]);
  const [typeValue, setTypeValue] = React.useState('');
  const [graphValue, setGraphValue] = React.useState('');
  const [graphData, setGraphData] = React.useState([]);

  const filterDay = useCallback((day) => {
    const filtered = props.trades.filter(trade => {
      const date = moment(trade.created_at).format('YYYY-MM-DD');
      const today = moment().format('YYYY-MM-DD');
      const lastWeek = moment().subtract(7, 'days').format('YYYY-MM-DD');
      const lastMonth = moment().subtract(30, 'days').format('YYYY-MM-DD');
      const lastYear = moment().subtract(365, 'days').format('YYYY-MM-DD');
      if (day === "Today") {
        return date === today;
      } else if (day === "A week ago") {
        return date === lastWeek;
      } else if (day === "A month ago") {
        return date === lastMonth;
      } else if (day === "A year ago") {
        return date === lastYear;
      } else {
        return day === "24 hours ago";
      }
    });
    setTrades(filtered);
  }, []);

  // filter by month
  const filterMonth = useCallback((month) => {
    const filtered = props.trades.filter(trade => {
      const date = moment(trade.created_at).format('YYYY-MM');
      const January = moment().subtract(1, 'months').format('YYYY-MM');
      const February = moment().subtract(2, 'months').format('YYYY-MM');
      const March = moment().subtract(3, 'months').format('YYYY-MM');
      const April = moment().subtract(4, 'months').format('YYYY-MM');
      const May = moment().subtract(5, 'months').format('YYYY-MM');
      const June = moment().subtract(6, 'months').format('YYYY-MM');
      const July = moment().subtract(7, 'months').format('YYYY-MM');
      const August = moment().subtract(8, 'months').format('YYYY-MM');
      const September = moment().subtract(9, 'months').format('YYYY-MM');
      const October = moment().subtract(10, 'months').format('YYYY-MM');
      const November = moment().subtract(11, 'months').format('YYYY-MM');
      const December = moment().subtract(12, 'months').format('YYYY-MM');
      const year = moment().format('YYYY');
      if (month === "January") {
        return date === January;
      } else if (month === "February") {
        return date === February;
      } else if (month === "March") {
        return date === March;
      } else if (month === "April") {
        return date === April;
      } else if (month === "May") {
        return date === May;
      } else if (month === "June") {
        return date === June;
      } else if (month === "July") {
        return date === July;
      } else if (month === "August") {
        return date === August;
      } else if (month === "September") {
        return date === September;
      } else if (month === "October") {
        return date === October;
      } else if (month === "November") {
        return date === November;
      } else if (month === "December") {
        return date === December;
      } else if (month === "This year") {
        return date === year;
      } else {
        return true;
      }
    });
    setTrades(filtered);
  }, []);
 
  // loop through each card id and count total time it appears in each trade by there types and put into an array of graphdata
  const graphDataArray = (x) => props.cards.map(card => {
    const filtered = props.trades.filter(trade => (trade.cardType.card_id === card.id && trade.cardType.type_id === x));
    const all = {
      name: card.name,
      type : x == 1 ? "Ecode" : "Physical",
      total: filtered.length
    }
    return all.total
  });

  const dounutDataArray = () => props.cards.map(card => {
    const filtered = props.trades.filter(trade => (trade.cardType.card_id === card.id));
    const all = {
      name: card.name,
      total: filtered.length
    }
    return all.total
  });

  const sle = (id) => props.cards.filter(card => card.id === id);

  useEffect(() => {
    filterDay(typeValue)
  }, [typeValue])

  useEffect(() => {
    filterMonth(graphValue)
  }, [graphValue])

  useEffect(() => {
    filterDay('Today')
  }, [])





  const data = {
    labels: [...props.cards.map(card => card.name)],
    datasets: [
      {
        label: 'Cash Receipt',
        backgroundColor: 'rgba(255, 153, 255, 0.3)',
        borderColor: 'rgba(255, 153, 255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 153, 255,0.8)',
        hoverBorderColor: 'rgba(255, 153, 255,1)',
        borderCapStyle: 'round',
        data: [...graphDataArray(1)]
      },
      {
        label: 'Credit Receipt',
        backgroundColor: 'rgba(153, 76, 0,0.3)',
        borderColor: 'rgba(153, 76, 0,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153, 76, 0,0.8)',
        hoverBorderColor: 'rgba(153, 76, 0, 1)',
        borderCapStyle: 'round',
        data: [...graphDataArray(2)]
      },

      {
        label: 'Debit Receipt',
        backgroundColor: 'rgba(10, 118, 34,0.3)',
        borderColor: 'rgba(10, 118, 34,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(10, 118, 34,0.8)',
        hoverBorderColor: 'rgba(10, 118, 34,1)',
        borderCapStyle: 'round',
        data: [...graphDataArray(3)]
      },
      {
        label: 'No Receipt',
        backgroundColor: 'rgba(123, 138, 22,0.3)',
        borderColor: 'rgba(123, 138, 22,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(123, 138, 22,0.8)',
        hoverBorderColor: 'rgba(123, 138, 22,1)',
        borderCapStyle: 'round',
        data: [...graphDataArray(4)]
      },
    ]
  };
  const donutData = {
    labels: [...props.cards.map(card => card.name)],
    datasets: [
      {
        label: '# of Votes',
        data: [...dounutDataArray()],
        backgroundColor: [
          ...dounutDataArray().map(() => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
          }),
        ],
        borderColor: [
          //loop dounutDataArray through to generate random hexa color
          dounutDataArray().map(() => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
          }),
        ],
        borderWidth: 2,


      },
    ],
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
          <div className="flex flex-row justify-between">
            <p className='dark:text-gray-100 text-black text-2xl pb-6 font-bold'>Contributions Received</p>
            <div className="pr-4">
              <div className="flex justify-center">
                <div>
                  {/* <div className="relative inline-flex self-center"> */}
                  <select
                    className="text-sm font-bold rounded border-1 border-yellow-700 text-gray-600 h-10 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                    value={typeValue}
                    onChange={(e) => setTypeValue(e.target.value)}
                  >
                    {/* <option value="">View Previous data</option> */}
                    {days.map((day, index) => (
                      <option value={day} key={index}>{day}</option>
                    ))}
                  </select>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <section className="container mx-auto p-6 font-mono">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  uppercase border-b border-gray-600">
                      <th className="px-4 py-3">Agent Id</th>
                      <th className="px-4 py-3">Agent</th>
                      <th className="px-4 py-3">Total Users</th>
                      <th className="px-4 py-3">Total Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {
                      trades.length > 0 ? trades.map((agent, index) => (
                        <tr className="text-gray-700" key={index}>
                          <td className="px-4 py-3 text-ms font-semibold border">Agent00{agent?.id}</td>
                          <td className="px-4 py-3 border">
                            <div className="flex items-center text-sm">
                              <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                <Image
                                    loader={imageLoader}
                                    src={agent?.user?.picture}
                                    width={500}
                                    height={500}
                                                // key={index}
                                    className="object-cover w-full h-full rounded-full"
                                            />
                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                              </div>
                              <div>
                                <p className="font-semibold text-black">{agent?.user?.full_name.split(' ')[0]}</p>
                                <p className="text-xs text-gray-600">{agent?.user?.customer_id}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className='font-semibold text-black'>25</p>
                          </td>

                          <td>
                            <p className='font-semibold text-black'>$500</p>
                          </td>
                          
                          <td className="px-4 py-3 text-xs border">
                            {
                              agent?.agentStatus?.name === 'pending' ? <span className="px-2 py-1 font-semibold leading-tight text-blue-700 bg-blue-100 rounded-sm"> {agent?.agentStatus.name} </span>
                                : agent?.agentStatus?.name === 'failed' ? <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> {agent?.agentStatus.name} </span>
                                  : agent?.agentStatus?.name === 'completed' ? <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {agent?.agentStatus.name} </span>
                                    : <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Processing </span>
                            }
                          </td>

                          <td className="px-4 py-3 text-sm border">
                            <a className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-orange-100 py-2 px-4 rounded inline-flex items-center" href={`admin/agent/${agent?.id}`}>
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
                          <td colSpan="8" className="text-center text-gray-500">No Contributions Yet</td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap mt-8">
        <div className="w-full lg:w-8/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
          <div className="flex flex-row justify-between">
            <h1 className='dark:text-gray-100 text-black'>Contributions Analytics</h1>
          </div>
          <AreaChart data={data} />
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    const trades = await Server.get('/admin/card-transactions', {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const errorCode = trades.status != 200 ? true : false;
    const cards = await Server.get('/card')
    return {
      props: {
        trades: trades.data.message,
        cards: cards.data.message,
        paymentLog: 'google',
        errorCode,
      },
    };
  } catch(e){
    return {
      redirect: {
          destination: '/auth/logout'
      }
  };
  }
 
}