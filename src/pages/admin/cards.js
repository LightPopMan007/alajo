// import Content from '../components/content';
import React, { useState, useEffect } from 'react';
import Breadcumb from '../../components/breadcumb';
import ActivityLog from '../../components/activitylog';
import Statistics from '../../components/statistics';
// import AreaChart from '../../components/chart';
import { FiUserPlus, FiDollarSign, FiActivity } from 'react-icons/fi'
import AdminLayout from '../../dashboard/AdminLayout';
import { Helmet } from "react-helmet"
import MaterialTable, { Column } from "@material-table/core";
import { Tab } from '@headlessui/react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FiCamera } from 'react-icons/fi';
import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Server } from '../api/lib/service';
import { getSession } from 'next-auth/react'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Input = styled('input')({
    display: 'none',
});

const Cards = (props) => {
    const lookup = { true: "Available", false: "Unavailable" };

    const [data, setData] = useState([...props.cards]);
    const [cardType, setCardType] = useState([...props.cardType]);
    const [image, setImage] = useState('');

    const uploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);

        console.log(image)
    }


    const cardOptions = {};
    data.map(option => {
        const { id, name } = option;
        cardOptions[id] = name
    })

    const columns = [
        {
            title: 'Card',
            field: 'picture',
            render: rowData => <img src={rowData.picture} style={{ width: 40, borderRadius: '50%' }} />,
            editComponent: props => (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={uploadImage}  />
                        <Button variant="contained" component="span" color="warning">
                            Upload
                            <FiCamera color='gold' size={30} style={{paddingLeft:'10px',}} />
                        </Button>
                    </label>
                    {
                        image &&
                        <img src={image} style={{ width: 40, borderRadius: '50%' }} />
                    }
                    {/* <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <FiCamera color='gold' />
                        </IconButton>
                    </label> */}
                </Stack>
            ),
            headerStyle: {
                // backgroundColor: 'yellow',
                fontWeight: 'bold',
            }
        },
        {
            title: "Card Title", field: "name",
            render: rowData => <p className="px-4 py-3 text-ms font-semibold">{rowData.name}</p>,

        },
        {
            title: "Counts", editable: false,
            render: rowData => <p className="px-4 py-3 text-ms font-semibold">{rowData.cardTypes == undefined ? 0 : rowData.cardTypes.length}</p>,

        },
    ];

    const columnCardType = [
        {
            title: 'Card',
            field: "card.id",
            lookup: cardOptions,
            headerStyle: {
                // backgroundColor: 'yellow',
                fontWeight: 'bold',
            }
        },

        // {
        //     title: 'Type',
        //     field: 'type_id',
        //     headerStyle: {
        //         // backgroundColor: 'yellow',
        //         fontWeight: 'bold',
        //     }
        // },

        {
            title: 'Card Type',
            field: 'type_id',

            lookup: { 1: 'Cash Receipt',  2: 'Credit Receipt', 3: 'Debit Receipt', 4: 'No Receipt' },
            headerStyle: {
                // backgroundColor: 'yellow',
                fontWeight: 'bold',
            }
        },

        {
            title: "Country", field: "name", headerStyle: {
                // backgroundColor: 'yellow',
                fontWeight: 'bold',
            }
        },
        {
            title: "Status", field: "status",
            lookup: { true: "Available", false: "Unavailable" },
            render: rowData => {
                return (
                    <p className="text-xs">
                        {
                            lookup[rowData.status] === 'Available' ?
                                (<span className="font-semibold leading-tight text-green-700 bg-green-100 rounded-sm p-2"> Available </span>) :
                                (<span className="font-semibold leading-tight text-red-700 bg-red-100 rounded-sm p-2"> Not Available </span>)
                        }
                    </p>
                )
            },
            headerStyle: {
                // backgroundColor: 'yellow',
                fontWeight: 'bold',
            }
        },
        {
            title: 'Rate',
            field: 'rate',
            render: rowData => <p className="text-ms font-semibold">#{rowData.rate}</p>,

            headerStyle: {
                // backgroundColor: 'yellow',
                fontWeight: 'bold',
            }
        },
    ];

    const createCard = async (name, image) => {
        const res = await fetch("/api/create-card", {
          body: JSON.stringify({
            image,
            name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
    };

    const updateCard = async (id, name, image) => {
        const res = await fetch("/api/update-card", {
          body: JSON.stringify({
            id,
            name,
            image
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        });
    };

    const createCardType = async (card, name, type_id, rate, status) => {
        console.log(card)
        const res = await fetch("/api/create-card-type", {
          body: JSON.stringify({
            card, name, type_id, rate, status
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
    };

    const updateCardType = async (id, card, name, type_id, rate, status) => {
        const res = await fetch("/api/update-card-type", {
          body: JSON.stringify({
            id, card, name, type_id, rate, status
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        })
    };

    return (
        <AdminLayout>
            <div className="flex flex-wrap">
                <div className="w-full bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                    <Breadcumb title={'Cards and rates'} />
                    <div className="flex flex-row justify-between">
                        <h1>Add and update cards rate</h1>
                    </div>
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
                                    Cards
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
                                    Card Types
                                </Tab>

                                {/* <Tab
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
                                    Rates
                                </Tab> */}
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
                                        title="Cards"
                                        columns={columns}
                                        data={data}
                                        key={data.id}
                                        editable={{
                                            onRowAdd: newData =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        setData([...data, newData]);
                                                        createCard(newData.name, image)
                                                        setImage('')
                                                        resolve();
                                                    }, 1000)
                                                }),
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        const dataUpdate = [...data];
                                                        const target = dataUpdate.find(
                                                            (el) => el.id === oldData.tableData.id
                                                          );
                                                        const index = dataUpdate.indexOf(target);
                                                        dataUpdate[index] = newData;
                                                        const id = newData.id;
                                                        const name = newData.name;
                                                        updateCard(id, name);
                                                        setData([...dataUpdate]);
                                                        resolve();
                                                      }, 1000);
                                                }),
                                        }}
                                        options={{
                                            actionsColumnIndex: -1
                                        }}
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
                                        title="Cards"
                                        columns={columnCardType}
                                        data={cardType}
                                        key={cardType.id}
                                        editable={{
                                            onRowAdd: newData =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        setCardType([...cardType, newData]);
                                                        const { name, type_id, rate, status} = newData
                                                        const card = newData.card.id
                                                        createCardType(card, name, type_id, rate, status)
                                                        resolve();
                                                    }, 1000)
                                                }),
                                            onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        const dataUpdate = [...cardType];
                                                        const target = dataUpdate.find(
                                                            (el) => el.id === oldData.tableData.id
                                                        );
                                                        const index = dataUpdate.indexOf(target);
                                                        dataUpdate[index] = newData;
                                                        const id = newData.id;
                                                        const { name, type_id, rate, status} = newData
                                                        const card = newData.card.id
                                                        setCardType([...dataUpdate]);
                                                        updateCardType(id, card, name, type_id, rate, status)
                                                        resolve();
                                                    }, 1000)
                                                }),
                                        }}
                                        options={{
                                            actionsColumnIndex: -1
                                        }}
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

export default Cards

export async function getServerSideProps(context) {
    const card = await Server.get('/card')
    const cardType = await Server.get('/card/card-type')
    // console.log(cardType.data.message)
    return {
        props: {
            cards: card.data.message,
            cardType: cardType.data.message
        }
    }
}