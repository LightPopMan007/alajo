// import React, {Fragement} from 'react';
import Breadcumb from '../../../components/breadcumb';
import Statistics from '../../../components/statistics';
import AreaChart from '../../../components/chart';
import DoughnutChart from '../../../components/donut';
import DropdownRender from '../../../components/dropdown';
import { FiUserPlus, FiDollarSign, FiActivity, FiEye, FiCopy } from 'react-icons/fi'
import AdminLayout from '../../../dashboard/AdminLayout';
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { Server, imageLoader, CardLoader } from '../../api/lib/service';
import Image from 'next/image';
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router'


const bg = require('./bg.png');
const logo = require('./2-fav.png');



const TradeId = (props) => {
    const [comment, setSetComment] = useState('')
    const router = useRouter()
    const sle = (id) => props.card.filter(card => card.id === id);

    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState({})
    const [query, setQuery] = useState('')
    useEffect(() => {
        setData(props.trade[0])
    }, [])
    const obj = JSON.parse(props.trade[0].data)
    const image = Object.values(obj);
    const comments = props.trade[0].note !== null ? props.trade[0].note.split(",") : [];
    const type = (id) => props.type.filter(e => e.type_id === id);
    // console.log(comments)
    const confirmTrade = async () => {
        toast.info('Processing Request...', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-info",
        });
        fetch('/api/trade/confirm', {
            body: JSON.stringify({
                id: props.trade[0].id,
                note: comment
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
        }).then(res => {
            closeModal()
            router.reload();
        }).catch(err => {
            console.log(err)
        })
    }

    const queryTrade = async () => {
        toast.info('Processing Request...', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-info",
        });
        fetch('/api/trade/query', {
            body: JSON.stringify({
                id: props.trade[0].id,
                comment: comment
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
        }).then(res=> {
            closeModal()
        }).catch(err => {
            console.log(err)
        })
    }


    

    function closeModal() {
        setIsOpen(false)
        setComment('')
    }

    function openModal() {
        setIsOpen(true)
    }

    // console.log(data)
    return (
        <AdminLayout>
            <ToastContainer />

            <div className="modal" id="my-modal-1">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Trade</h3>
                    <p className="py-4">Kindly drop  note</p>
                    <form className="mt-4"
                        onSubmit={(e) => confirmTrade(e)}
                        data-toggle="validator"
                        autoComplete="off">
                        <div className="form">

                            <textarea className="w-full rounded py-2 px-3 resize-none h-36" value={comment}
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setSetComment(e.target.value)
                                }}>

                            </textarea>
                        </div>
                        <div className="modal-action">
                            <a href="#" className="btn bg-red-600 mx-1 text-slate-100 transition">Cancel</a>
                            <button href="#" type='submit' className="btn bg-green-600 mx-1 text-slate-100 hover:bg-green-800 transition">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="modal" id="my-modal-2">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-yellow-400">Query Trade.</h3>
                    <p className="py-4">Kindly say why you want to query this trade.</p>
                    <form className="mt-4"
                        onSubmit={(e) => queryTrade(e)}
                        data-toggle="validator"
                        autoComplete="off">
                        <div className="form">
                            <textarea className="w-full rounded py-2 px-3 resize-none h-36" value={comment}
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setSetComment(e.target.value)
                                }}></textarea>
                        </div>
                        <div className="modal-action flex">
                            <a href="#" className="btn bg-red-600 mx-1 text-slate-100 transition">Cancel</a>
                            <button href="#" type='submit' className="btn bg-green-600 mx-1 text-slate-100 hover:bg-green-800 transition">Submit</button>
                        </div>
                    </form>
                </div>
            </div>


            <div className="modal" id="my-modal-3">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Fault Trade</h3>
                    <p className="py-4">Kindly say why you want to fault this trade</p>
                    <div className="form">
                        <textarea className="w-full rounded py-2 px-3 resize-none h-36" value={comment}
                            onChange={(e) => {
                                console.log(e.target.value)
                                setSetComment(e.target.value)
                            }}>

                        </textarea>
                    </div>
                    <div className="modal-action">
                        <a href="#" className="btn bg-red-600 mx-1 text-slate-100 transition">Cancel</a>
                        <a href="#" className="btn bg-green-600 mx-1 text-slate-100 hover:bg-green-800 transition">Submit</a>
                    </div>
                </div>
            </div>


            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 pt-6 pb-24 bg-gray-300 dark:bg-gray-800 px-6 rounded-3xl">
                    <Breadcumb title={`Trade00${data.id}`} />

                    <div className="flex-col h-full flex justify-between">
                        <div className="flex flex-wrap">
                            {image.map((item, index) => (
                                        <div className="w-4/12 mx-4">
                                           <Image
                                                loader={imageLoader}
                                                src={item}
                                                width={800}
                                                height={800}
                                                key={index}
                                                className={"scale:100 hover:scale-75 ease-in duration-500 rounded shadow-sm min-h-48 bg-coolGray-500 aspect-square"}
                                            />
                                            </div>
                                    )
                                )
                            }
                        </div>



                        <h5 className="text-slate-400 font-bold">Status: <span className="text-slate-100 font-normal">{data.tradeStatus?.name}</span></h5>
                        <h5 className="text-slate-400 font-bold">Payment: <span className="text-slate-100 font-normal">{data.payment == true ? 'wallet' : 'Instant Withdrawal'}</span></h5>



                        <div className="flex justify-between dark:text-gray-100 text-black  items-center">
                            <h5 className="text-1xl font-bold">Card Info: <span className="text-slate-100 font-normal">{CardLoader(props.card, data.cardType?.card_id)[0]?.name} {type(data.cardType?.type_id)[0]?.type?.name}</span></h5>
                        </div>
                        {
                                    data.tradeStatus?.name !== 'completed' && (
                                        <div className="flex justify-between">

                                            <a href="#my-modal-1" type="button" className="inline-flex mx-1 items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-400 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                                                Confirm Trade
                                            </a>

                                            <a href="#my-modal-2" type="button"
                                                className="inline-flex mx-1 items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                                                Query Trade
                                            </a>


                                            <button type="button"
                                                className="inline-flex mx-1 items-center px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-400 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                                            >
                                                Fault Trade
                                            </button>
                                        </div>

                                    )
                                }

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

                                    <div className="font-bold"> Trade 00{data.id}</div>
                                </div>

                                <div className="flex my-1 text-gray-600">
                                    <div>Total Amount: <span className="font-bold">{data.total}</span> </div>
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

                        <div className="bg-gray-800 rounded-3xl px-6 pt-6">
                            <div className="flex text-white text-2xl pb-6 font-bold">
                                <p>Admin Comments</p>
                            </div>
                            <div>
                                <div className="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700">
                                    <div className="pl-4 w-full">
                                        {
                                            comments.length > 0 && comments.map((comment, index) => (
                                                <div key={index} className="flex items-center">
                                                    <p className="my-2 text-sm text-gray-400">
                                                        {comment}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </AdminLayout >
        // <h1>
        //     Life is good
        // </h1>
    );
}

export default TradeId;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    try {
        const token = session?.accessToken;
        const id = context.params.id;
        const req = await Server.get(`/admin/card-transaction/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const card = await Server.get('/card');
        const type = await Server.get('/card/cardtype')
        return {
            props: {
                trade: req.data.message,
                card: card.data.message,
                type: type.data.message
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