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
  const [contribution, setContribution] = useState([]);
  const [typeValue, setTypeValue] = React.useState('');
  const [graphValue, setGraphValue] = React.useState('');
  const [graphData, setGraphData] = React.useState([]);

  const filterDay = useCallback((day) => {
    const filtered = props.contribution.filter(trade => {
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
    setContribution(filtered);
  }, []);

  // filter by month
  const filterMonth = useCallback((month) => {
    const filtered = props.contribution.filter(trade => {
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
    setContribution(filtered);
  }, []);



  useEffect(() => {
    filterDay(typeValue)
  }, [typeValue])

  useEffect(() => {
    filterMonth(graphValue)
  }, [graphValue])

  useEffect(() => {
    filterDay('Today')
  }, [])


  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
          <div className="flex flex-row justify-between">
            <p className='dark:text-gray-100 text-black text-2xl pb-6 font-bold'>Contribution Received</p>
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
                      <th className="px-4 py-3">Customer Name</th>
                      <th className="px-4 py-3">Plan</th>
                      <th className="px-4 py-3">Total Amount</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {
                      contribution?.length > 0 ? contribution.map((data, index) => (
                        <tr className="text-gray-700" key={index}>
                          <td className="px-4 py-3 text-ms font-semibold border">Agent{data?.id}</td>
                          <td className="px-4 py-3 text-ms font-semibold border">{data?.firstName} {data?.lastName}</td>
                          <td className="px-4 py-3 text-ms font-semibold border"> {data?.plan}</td>

                          <td className="px-4 py-3 text-ms font-semibold border">${data?.amount}</td>
                          
                         

                          <td className="px-4 py-3 text-sm border">
                            <a className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-orange-100 py-2 px-4 rounded inline-flex items-center" href={`admin/agent/${data?.id}`}>
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
                          <td colSpan="8" className="text-center text-gray-500">No contribution Yet</td>
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

      {/* <div className="flex flex-wrap mt-8">
        <div className="w-full bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
          <div className="flex flex-row justify-between">
            <h1 className='dark:text-gray-100 text-black'>contribution Analytics</h1>
          </div>
          <AreaChart data={data} />
        </div>
      </div> */}
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    const contribution = [
      {
        id: '001',
        agentId: '1',
        firstName: 'John',
        lastName: 'Smith',
        amount: '3,400',
        plan: "Daily",
        addres: 'Raven Avenue, P.O Box 350',
        phone: '555 5555 555',
        email: 'johnfsmith@gmail.com',
        createdAt: 'May 16, 2016',
        updatedAt: 'May 14, 2022'
      },
      {
        id: '002',
        agentId: '2',
        firstName: 'Angela',
        lastName: 'Ramos',
        amount: '300',
        plan: "Weekly",
        addres: 'Raven Avenue, P.O Box 350',
        phone: '555 5555 555',
        email: 'angelaramos@gmail.com',
        createdAt: 'May 16, 2016',
        updatedAt: 'May 14, 2022'
      },
      {
        id: '003',
        agentId: '3',
        firstName: 'Joseph',
        plan: "Monthly",
        lastName: 'Emma',
        amount: '2,500',
        addres: 'Raven Avenue, P.O Box 350',
        phone: '555 5555 555',
        email: 'joeemma@gmail.com',
        createdAt: 'May 16, 2016',
        updatedAt: 'May 14, 2022'
      }
    ]
    const errorCode = contribution.status != 200 ? true : false;
    const cards = await Server.get('/card')
    return {
      props: {
        contribution,
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