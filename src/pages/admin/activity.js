import React, { useState, useEffect, useCallback } from 'react';
import Breadcumb from '../../components/breadcumb';
import Statistics from '../../components/statistics';
import AreaChart from '../../components/chart';
import DoughnutChart from '../../components/donut';
import DropdownRender from '../../components/dropdown';
import { FaUsers, FaWallet, FaUserPlus, FaMoneyBillWave, FaDollarSign, FaUserSecret, FaStar } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import AdminLayout from '../../dashboard/AdminLayout';
import { Server } from '../api/lib/service';
import { getSession } from 'next-auth/react';
import moment from 'moment';
import Error from 'next/error'

export default function HomePage(props) {


    // loop through each card id and count total time it appears in each trade by there types and put into an array of graphdata
    const graphDataArray = (x) => props.cards.map(card => {
        const filtered = props.trades.filter(trade => (trade.cardType.card_id === card.id && trade.cardType.type_id === x));
        const all = {
            name: card.name,
            type: x == 1 ? "Ecode" : "Physical",
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





    const data = {
        labels: [...props.cards.map(card => card.name)],
        datasets: [
            {
                label: 'June',
                backgroundColor: 'rgba(217, 188, 41, 0.3)',
                borderColor: 'rgba(217,188, 41, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(217, 188, 41,0.8)',
                hoverBorderColor: 'rgba(217, 188, 41,1)',
                borderCapStyle: 'round',
                data: [...graphDataArray(2)]
            },
            {
                label: 'July',
                backgroundColor: 'rgba(123, 138, 22,0.3)',
                borderColor: 'rgba(123, 138, 22,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(123, 138, 22,0.8)',
                hoverBorderColor: 'rgba(123, 138, 22,1)',
                borderCapStyle: 'round',
                data: [...graphDataArray(1)]
            },
            {
                label: 'August',
                backgroundColor: 'rgba(13, 128, 22,0.3)',
                borderColor: 'rgba(123, 138, 22,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(13, 128, 22,0.8)',
                hoverBorderColor: 'rgba(13, 128, 22,1)',
                borderCapStyle: 'round',
                data: [...graphDataArray(1)]
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
                <div className="w-full mt-8 lg:mt-0 lg:w-12/12 lg:pl-4">
                    <div className="dark:bg-gray-800 bg-gray-300 rounded-3xl px-6 pt-6">
                        <div className="flex dark:text-gray-100 text-black text-2xl pb-6 font-bold">
                            <p>Activity Records</p>

                        </div>

                        <div>
                            <div className="border-t solid border-gray-700 py-2 flex flex-wrap 2xl:items-start w-full ">
                                <div className="w-full lg:w-3/12 px-1 pl-0 my-1">
                                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg rounded-lg w-full flex justify-between items-center">
                                        <div className="py-5 px-5">
                                            <span className="font-light text-slate-100 text-sm">Total Users</span>
                                            <div className="flex items-center justify-between">
                                                <div className="text-3xl text-slate-100 font-bold">
                                                    2,784
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
                                                    12.8K
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pr-5'>
                                            <FaWallet className='text-white' size={40} />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-3/12 px-1 my-1">
                                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 shadow-lg rounded-lg w-full flex justify-between items-center">
                                        <div className="py-5 px-5">
                                            <span className="font-light text-slate-100 text-sm">New Contacts</span>
                                            <div className="flex items-center justify-between">
                                                <div className="text-3xl text-slate-100 font-bold">
                                                    81
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pr-5'>
                                            <FaUserPlus className='text-white' size={40} />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-3/12 px-1 pr-0 my-1">
                                    <div className="bg-gradient-to-r from-lime-400 to-lime-600 shadow-lg rounded-lg w-full flex justify-between items-center">
                                        <div className="py-5 px-5">
                                            <span className="font-light text-slate-100 text-sm">Total Money Earned</span>
                                            <div className="flex items-center justify-between">
                                                <div className="text-3xl text-slate-100 font-bold">
                                                    $30,897
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pr-5'>
                                            <FaMoneyBillWave className='text-white' size={40} />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-3/12 px-1 my-1">
                                    <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-lg rounded-lg w-full flex justify-between items-center">
                                        <div className="py-5 px-5">
                                            <span className="font-light text-slate-100 text-sm">Last Month Profit</span>
                                            <div className="flex items-center justify-between">
                                                <div className="text-3xl text-slate-100 font-bold">
                                                    $1,249
                                                </div>
                                            </div>
                                        </div>

                                        <div className='pr-5'>
                                            <FaDollarSign className='text-white' size={40} />
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

                            <div className="border-t flex flex-wrap py-2 border-gray-700">
                                <div className="w-full lg:w-4/12 my-1 px-3 py-2">
                                    <div className="flex flex-col">
                                        <h2>Customer rating</h2>
                                        <div className='flex items-center mt-1'>
                                            <FaStar className='text-yellow-400' size={20} />
                                            <FaStar className='text-yellow-400' size={20} />
                                            <FaStar className='text-yellow-400' size={20} />
                                            <FaStar className='text-yellow-400' size={20} />
                                            <FaStar className='text-yellow-400' size={20} />

                                            <span>&nbsp; (23,126)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-4/12 my-1 px-3 py-2">
                                    <div className="flex flex-col">
                                        <h2>All Time Trades</h2>
                                        <div className='flex items-center mt-1 text-white'>
                                            <span className='text-xl font-semibold'>231,126</span>
                                        </div>
                                    </div>
                                </div>
{/* https://cdn2.iconfinder.com/data/icons/avatars-60/5985/36-Grandfather-256.png */}

                                <div className="w-full lg:w-4/12 my-1 px-3 py-2">
                                    <div className="flex flex-col">
                                        <h2>Top Trader</h2>
                                        <div className='flex items-center mt-1 text-white'>
                                            <span className='text-xl font-semibold'>John Doe &nbsp;</span>
                                            <img src="https://cdn2.iconfinder.com/data/icons/avatars-60/5985/36-Grandfather-256.png" alt="trader img" className="w-8 rounded-3xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap mt-8 lg:pl-4">
                    <div className="w-full lg:w-8/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                        <div className="flex flex-row justify-between">
                            <h1 className='dark:text-gray-100 text-black'>Lead Stats (By Month) </h1>
                            <div className="flex justify-center">
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                        <AreaChart data={data} />
                    </div>

                    <div className="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
                        <div className="dark:bg-gray-800 bg-gray-300 rounded-3xl px-6 pt-6">
                            <div className="flex dark:text-gray-100 text-black text-2xl pb-6 font-bold">
                                <p>Total Withdrawals</p>

                            </div>

                            <div>
                                <div className="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full ">
                                    <DoughnutChart data={donutData} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-6/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl lg:pl-4 mt-4">
                        <div className="flex flex-row justify-between">
                            <h1 className='dark:text-gray-100 text-black'>Money Earned</h1>
                            <div className="flex justify-center">
                                <div>

                                </div>
                            </div>
                        </div>
                        <AreaChart data={data} />
                    </div>

                    <div className='w-full lg:w-6/12 pl-2'>
                        <div className="bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl mt-4">
                            <div className="flex flex-row justify-between">
                                <h1 className='dark:text-gray-100 text-black'>Visits by Device type</h1>
                                <div className="flex justify-center">
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <AreaChart data={data} />
                        </div>
                    </div>
                </div>
            </div>
            


        </AdminLayout>
    );
}


export async function getServerSideProps(context) {
    const session = await getSession(context);
    console.log(session)
    // const trades = await Server.get('/admin/card-transactions', {
    //     headers: {
    //         Authorization: `Bearer ${session?.accessToken}`,
    //     },
    // });
    // const type = await Server.get('/type')
    const errorCode =''
    const cards = []
    // console.log(trades.data.message[0])
    return {
        props: {
            trades: [],
            cards: [],
            paymentLog: 'google',
            errorCode,
        },
    };
}