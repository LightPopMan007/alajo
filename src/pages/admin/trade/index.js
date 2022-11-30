// import Content from '../components/content';
import React, { useState, useEffect } from 'react';
import Breadcumb from '../../../components/breadcumb';
import AdminLayout from '../../../dashboard/AdminLayout';
import MaterialTable, { Column } from "@material-table/core";
import Visibility from '@material-ui/icons/Visibility'
import { Tab } from '@headlessui/react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FiCamera } from 'react-icons/fi';
import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Server } from '../../api/lib/service'
import { getSession } from 'next-auth/react'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Input = styled('input')({
    display: 'none',
});

const Index = (props) => {
    const Router = useRouter()

    const [data, setData] = useState(props.data)
    const [cardType, setCardType] = useState([])
    const [selectedRow, setSelectedRow] = useState(null);
    const sle = (id) => props.cards.filter(card => card.id === id);
    const type =(id) => props.type.filter(e => e.type_id === id)[0].type.name;

    const columns = [
        {
            title: 'Trade ID',
            field: 'id',
            render: rowData => <p className="px-4 py-3 text-ms font-semibold">Trade00{rowData.id}</p>,
            headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            editable: 'never',
        },
        {
            title: "Card Info", field: "name", editable: false, headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            render: (rowData) => {
                return (
                    <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src={`${sle(rowData?.cardType?.card_id)[0]?.picture}`} alt="" />
                        </div>
                        <div>
                            <p className="font-semibold text-black">{rowData?.cardType?.name}</p>
                            <p className="text-xs text-gray-600">{sle(rowData?.cardType?.card_id)[0].name}</p>
                            <p className="text-xs text-gray-600">{type(rowData?.cardType?.type_id)}</p>
                        </div>
                    </div>
                )
            }

        },
        {
            title: "Duration", field: 'created_at', editable: false, headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold'
            },
            render: (rowData) => {
                return (
                    <p className="text-sm font-semibold text-gray-600">{moment(rowData.created_at).fromNow()}</p>
                )

            }
        },
        {
            title: "User", field: "count", editable: false, headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            render: (rowData) => {
                return (
                    <div className="flex text-sm">
                        <div>
                            <p className="font-semibold text-black">Daunt_00{rowData.user?.id}</p>
                        </div>
                    </div>
                )
            }
        },

        {
            title: "Total", field: "total", editable: false, headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            render: (rowData) => {
                return (
                    <div className="flex text-sm">
                        <div>
                            <p className="font-semibold text-black">&#8358; {rowData.total}</p>
                        </div>
                    </div>
                )
            }
        },

        {
            title: "Status", field: "status", headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            lookup: { 1: "Completed", 2: "Pending", 3: "Queried", 4: "Failed" },
            render: rowData => {
                return (
                    <p className="text-xs">
                        {rowData.tradeStatus.id === 1 ?
                            (<span className="font-semibold leading-tight text-white bg-green-500 rounded-sm p-2"> Completed </span>) :
                            rowData.tradeStatus.id === 2 ?
                                (<span className="font-semibold leading-tight text-white bg-gray-700 rounded-sm p-2"> Pending </span>) :
                                rowData.tradeStatus.id === 3 ?
                                    (<span className="font-semibold leading-tight text-white bg-yellow-700 rounded-sm p-2"> Queried </span>) :
                                    (<span className="font-semibold leading-tight text-white bg-red-400 rounded-sm p-2"> Failed </span>)
                        }
                    </p>
                )
            },
            headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            }
        },
        {
            title: "Payment", field: "payment", headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            lookup: { true: "Wallet", false: "Instant" },
            render: rowData => {
                return (
                    <p className="text-xs">
                        {rowData.payment === true ?
                            (<span className="font-semibold leading-tight text-white bg-green-500 rounded-sm p-2"> Wallet </span>) :
                            (<span className="font-semibold leading-tight text-white bg-emerald-500 rounded-sm p-2"> Instant Withdrawal </span>)
                        }
                    </p>
                )
            },
            headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            }
        },
    ];




    let active = [];
    let failed = [];
    let completed = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].tradeStatus.id === 2 || data[i].tradeStatus.id === 3) {
            active.push(data[i]);
        }
        if (data[i].tradeStatus.id === 1) {
            completed.push(data[i]);
        }
        if (data[i].tradeStatus.id === 4) {
            failed.push(data[i]);
        }
    }


    return (
        <AdminLayout>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                    <Breadcumb title={'Trades 📑 '} />
                    <div className="px-2 sm:px-0">
                        <Tab.Group>
                            <Tab.List className="flex p-1 space-x-1 bg-yellow-600 rounded-xl">
                                <Tab
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
                                    Active Trades <span className="text-md text-green-500">({active.length})</span>
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
                                    Completed Trades <span className="text-md text-green-500">({completed.length})</span>

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
                                    Failed Trades <span className="text-md text-red-500">({failed.length})</span>

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
                                    <MaterialTable
                                        title="Active Trades 🔥 "
                                        columns={columns}
                                        data={active}
                                        key={data.id}

                                        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                                        options={{
                                            actionsColumnIndex: -1,
                                            rowStyle: {
                                                backgroundColor: '#fafafa',
                                                color: '#'
                                            },
                                            rowStyle: rowData => ({
                                                backgroundColor: (selectedRow == rowData.tableData.id) ? '#eee' : '#FFF',
                                            }),
                                            grouping: true,
                                        }}
                                        actions={[

                                            rowData => ({
                                                icon: Visibility,
                                                tooltip: 'View Trade',
                                                onClick: (event, rowData) => Router.push(`/admin/trade/${rowData.id}`),
                                            })
                                        ]}

                                    />

                                </Tab.Panel>

                                <Tab.Panel
                                    // key={idx}
                                    className={classNames(
                                        'bg-white dark:bg-gray-700 rounded-xl p-3',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                                    )}
                                >
                                    <MaterialTable
                                        title="Completed Trades"
                                        columns={columns}
                                        data={completed}
                                        key={data.id}

                                        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                                        options={{
                                            actionsColumnIndex: -1,
                                            rowStyle: {
                                                backgroundColor: '#FF0000',
                                                color: '#'
                                            },
                                            rowStyle: rowData => ({
                                                backgroundColor: (selectedRow == rowData.tableData.id) ? '#eee' : '#FFF',
                                            }),
                                            grouping: true,
                                        }}
                                        actions={[
                                            rowData => ({
                                                icon: Visibility,
                                                tooltip: 'View Trade',
                                                onClick: (event, rowData) => Router.push(`/admin/trade/${rowData.id}`),
                                            })
                                        ]}

                                    />
                                </Tab.Panel>
                                <Tab.Panel
                                    // key={idx}
                                    className={classNames(
                                        'bg-white dark:bg-gray-700 rounded-xl p-3',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                                    )}
                                >
                                    <MaterialTable
                                        title="Failed Trades"
                                        columns={columns}
                                        data={failed}
                                        key={data.id}

                                        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                                        options={{
                                            actionsColumnIndex: -1,
                                            rowStyle: {
                                                backgroundColor: '#FF0000',
                                                color: '#'
                                            },
                                            rowStyle: rowData => ({
                                                backgroundColor: (selectedRow == rowData.tableData.id) ? '#eee' : '#FFF',
                                            }),
                                            grouping: true,
                                        }}
                                        actions={[

                                            rowData => ({
                                                icon: Visibility,
                                                tooltip: 'View Trade',
                                                onClick: (event, rowData) => Router.push(`/admin/trade/${rowData.id}`),
                                            })
                                        ]}

                                    />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>

                </div>
            </div>

        </AdminLayout>
    );
}

export default Index;


export async function getServerSideProps(context) {
    const session = await getSession(context);
    try {
        const trades = await Server.get('/admin/card-transactions', {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });
        const card = await Server.get('/card')
        const type = await Server.get('/card/cardtype')
        return {
            props: {
                data: trades.data.message,
                cards: card.data.message,
                type: type.data.message
            },
        }

    } catch (error) {
        return {
            redirect: {
                destination: '/auth/logout'
            }
        };
    }
}
