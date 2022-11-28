// import Content from '../components/content';
import Breadcumb from '../../../components/breadcumb';
import { RiBankFill } from 'react-icons/ri'
import { FiUserPlus, FiDollarSign, FiActivity, FiEye } from 'react-icons/fi'
import AdminLayout from '../../../dashboard/AdminLayout';

import React, { Fragment, useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { Server, imageLoader, CardLoader } from '../../api/lib/service';
import Image from 'next/image';
import moment from 'moment';

export default function Id(props) {
    const role = ['seun', 'tope', 'sade',];
    const days = ["24 hrs ago", "A week ago", "A month ago", "A year ago"];

    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState({})
    const [query, setQuery] = useState('')
    useEffect(() => {
       setData(props.data)
    }, [])

    console.log(props.data)

    return (
        <AdminLayout>
            <div className="modal" id="my-modal-2">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-yellow-400">Query Trade.</h3>
                    <p className="py-4">Kindly say why you want to query this trade.</p>
                    <div className="form">
                        <textarea className="w-full rounded py-2 px-3 resize-none h-36"></textarea>
                    </div>
                    <div className="modal-action flex">
                        <a href="#" className="btn bg-red-600 mx-1 text-slate-100 transition">Cancel</a>
                        <a href="#" className="btn bg-green-600 mx-1 text-slate-100 hover:bg-green-800 transition">Submit</a>
                    </div>
                </div>
            </div>

            <div className="modal" id="my-modal-1">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Fault Trade</h3>
                    <p className="py-4">Kindly say why you want to fault this trade</p>
                    <div className="form">
                        <textarea className="w-full rounded py-2 px-3 resize-none h-36"></textarea>
                    </div>
                    <div className="modal-action">
                        <a href="#" className="btn bg-red-600 mx-1 text-slate-100 transition">Cancel</a>
                        <a href="#" className="btn bg-green-600 mx-1 text-slate-100 hover:bg-green-800 transition">Submit</a>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 pt-6 pb-24 bg-gray-300 dark:bg-gray-800 px-6 rounded-3xl">
                    <Breadcumb title={'Withdrawal'} />
                    <div className="flex-col h-full flex justify-between">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-4/12 mx-3">
                                
                                <div className="bg-yellow-50 flex justify-between items-center p-3 rounded-sm shadow-sm">
                                    <div className="flex justify-start items-center gap-2">
                                        <RiBankFill color={'gold'} size={20} />
                                        <div>
                                            <p className="text-gray-700 font-bold tracking-wider pr-2">
                                               {data.bank !== '' ? data.bank : data.userBank[0]?.bank_name}
                                            </p>
                                            <p className="text-gray-400 text-sm">0232882872</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="w-full lg:w-4/12 mx-3">

                                <div className="bg-yellow-50 flex justify-between items-center p-3 rounded-sm shadow-sm">
                                    <div className="flex justify-start items-center gap-2">
                                        <FiDollarSign color={'gold'} size={20} />
                                        <div>
                                            <p className="text-gray-700 font-bold tracking-wider pr-2">
                                                Wallet Balance
                                            </p>
                                            <p className="text-gray-400 text-sm">2,500</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="w-full lg:w-3/12 mx-3">

                            </div>
                        </div>

                        <div className="receipt w-full lg:w-2/12">
                            <img src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="card image" />
                        </div>


                        <div className="flex justify-between">

                            <button type="button" className="inline-flex mx-1 items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-400 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                                Upload Receipts
                            </button>

                            <a href="#my-modal-2" type="button"
                                className="inline-flex mx-1 items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                                Query Transactions
                            </a>

                            <a href="#my-modal-1" type="button"
                                className="inline-flex mx-1 items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-400 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                            >
                                Fault Transactions
                            </a>
                        </div>
                    </div>

                </div>

                <div className="w-full mt-8 lg:mt-0 lg:w-3/12 lg:pl-4 bg-gray-300 dark:bg-gray-800 rounded-3xl px-6 mx-4">
                    <div className="max-w-sm pb-5 mx-auto mt-4 overflow-hidden rounded-lg shadow-lg bg-slate-700">
                        <div className="h-40 bg-gradient-to-br from-yellow-400 via-yellow-500 to-black-600">
                            <div className="flex justify-center">
                                <span className="mt-10 text-2xl font-extrabold text-white">{data.user?.full_name}</span>
                            </div>
                            <div className="flex justify-center">
                                {/* <img className="object-cover w-24 h-24 mt-4 border-4 border-blue-600 rounded-full" src="https://im.indiatimes.in/content/2019/Jun/marvel_fans_start_a_petition_to_demand_robert_downey_jr_aka_tony_stark_aka_iron_man_back_1559715390_725x725.jpg" /> */}
                                <img src={imageLoader({ src: data.user?.picture, width: 100, height: 100 })} className="object-cover w-24 h-24 mt-4 border-4 border-yellow-100 rounded-full" />
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-slate-200">
                            <div className="flex justify-center mt-10 mb-4 text-xl font-medium"></div>
                            <div className="flex w-full text-gray-600 text-center">

                                <div className="font-bold"> Withdrawal00{data.id}</div>
                            </div>

                            <div className="flex my-1 text-gray-600">
                                <div>Total Amount: <span className="font-bold">{data.amount}</span> </div>
                            </div>

                            <div className="flex text-gray-600">
                                <div>Comment: <span className="font-bold">{data.comment}</span></div>
                            </div>

                            <div className="flex text-gray-600">
                                <div>created : <span className="font-bold">{moment(data.created_at).calendar()}</span></div>
                            </div>

                            <div className="flex text-gray-600">
                                <div>Last Updated : <span className="font-bold">{moment(data.updated_at).calendar()}</span></div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-2">
                            <a href={`../users/${data.user?.id}`} type="button" className="inline-flex items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-900 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">

                                View Profile
                            </a>

                        </div>
                    </div>
                    </div>

            </div>



        </AdminLayout>
    );
}


export async function getServerSideProps(context) {
    const session = await getSession(context);
    const token = session?.accessToken;
    const id = context.params.id;
    const req = await Server.get(`/admin/withdrawal/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {
        props: {
            data: req.data.message,
        },
    };
}