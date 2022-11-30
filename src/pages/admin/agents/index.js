// import Content from '../components/content';
import React, { useEffect } from 'react';
import Breadcumb from '../../../components/breadcumb';
import Statistics from '../../../components/statistics';
import { getSession } from 'next-auth/react';
import { FiUserPlus, FiDollarSign, FiActivity, FiSave } from 'react-icons/fi'
import AdminLayout from '../../../dashboard/AdminLayout';
import MaterialTable, { Column } from "@material-table/core";
import Icon from "@material-ui/core/Icon";
import { forwardRef } from 'react';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Visibility from '@material-ui/icons/Visibility'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import moment from 'moment';
import { useRouter } from 'next/router';
import { Server, imageLoader } from '../../api/lib/service';
const user = require('../../../images/user.png');

export default function Users(props) {
    const [users, setUsers] = React.useState([]);
    const Router = useRouter();

    const column = [
        {
            title: "Customer ID", field: "customer_id", editable: false, headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            }, render: (rowData) => <p className="text-ms font-semibold">{rowData.customer_id}</p>
        },

        {
            title: "User", editable: false,
            headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            render: (rowData) => {
                return (
                    <div className="flex text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src={rowData.picture !== null ? (imageLoader({ src: rowData.picture, height: 299, quality: 1 })) : user.default.src} alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                            <p className="font-semibold text-black">{rowData.full_name}</p>
                            <p className="text-xs text-gray-600">Joined {moment(rowData.created_at).fromNow()}</p>
                        </div>
                    </div>
                )
            }
        },
        {
            title: "Rating", field: "trade_count", editable: false,
            headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            render: rowData => (
                <div className="flex items-center">

                    {
                        rowData.cardTransactions.length <= 10 && rowData.cardTransactions.length != 0 ? (
                            <div className="rating">
                                <input type="radio" name="rating-1" className="mask mask-star-2 bg-gray-400" disabled />
                            </div>
                        ) : rowData.cardTransactions.length <= 20 && rowData.cardTransactions.length > 10 ? (
                            <div className="rating rating-half">
                                <input type="radio" name="rating-1" className="mask mask-star-2 mask-half-1  bg-orange-400" disabled />
                            </div>
                        ) : rowData.cardTransactions.length <= 25 && rowData.cardTransactions.length > 20 ? (
                            <div className="rating">
                                <input type="radio" name="rating-1" className="mask mask-star-2  bg-orange-400" disabled />
                            </div>
                        ) : rowData.cardTransactions.length <= 30 && rowData.cardTransactions.length > 25 ? (
                            <div className="rating rating-half">
                                <input type="radio" name="rating-1" className="rating-hidden" />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-1" disabled />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-2" disabled />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-1" disabled />
                            </div>
                        ) : rowData.cardTransactions.length <= 40 && rowData.cardTransactions.length > 30 ? (
                            <div className="rating rating-half">
                                <input type="radio" name="rating-1" className="rating-hidden" />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-1" disabled />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-2" disabled />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-1" disabled />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-2" disabled />
                            </div>
                        ) : rowData.cardTransactions.length <= 50 && rowData.cardTransactions.length > 40 ? (
                            <div className="rating rating-half">
                                <input type="radio" name="rating-1" className="rating-hidden" />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-1" disabled />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-2" disabled />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-1" disabled />
                                <input type="radio" name="rating-1" className="bg-orange-500 mask mask-star-2 mask-half-2" disabled />
                            </div>
                        ) : "NO RATING YET"


                    }
                </div>
            )
        },
        {
            title: "Verified", field: "is_verified", editable: false, headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            }, lookup: { true: "Yes", false: "No" },
            render: rowData => {
                return (
                    <div className="flex items-center">
                        {
                            rowData.is_verified == true ? (
                                <div className="badge badge-success gap-2">
                                    Yes
                                </div>
                            ) : (
                                <div className="badge badge-error gap-2">
                                    Not Verified
                                </div>
                            )
                        }
                    </div>
                )
            },
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
                            rowData.userWallet !== undefined || rowData.userWallet.amount != '0' ? (
                                <p className="text-ms font-semibold">{rowData.userWallet?.amount}</p>) : (
                                <p className="text-ms font-semibold">0</p>
                            )
                        }
                    </div>
                )
            }
        }
    ]

    const updateStatus = React.useCallback(async (id, status) => {
        const res = await fetch("/api/update-user", {
            body: JSON.stringify({
                id,
                status,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
    });


    useEffect(() => {
        setUsers([...props.userData])
    }, [])
    return (
        <AdminLayout>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                    <Breadcumb title={'Manage Agents'} />
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-12/12">
                            <div className="p-2">
                                <div
                                    className="p-4 rounded-3xl"
                                >
                                    <div className="shadow-lg rounded-lg overflow-hidden">

                                        <MaterialTable
                                            title="Manage Agents"
                                            columns={column}
                                            data={users}
                                            actions={[
                                                {
                                                    icon: Visibility,
                                                    tooltip: "View User",
                                                    onClick: (event, rowData) => {
                                                        if (rowData.is_verified == true) {
                                                            Router.push(`/admin/users/${rowData.id}`);
                                                        } else {
                                                            alert("User is not verified")
                                                        }
                                                    },
                                                },
                                            ]}

                                            editable={{
                                                onRowUpdate: (newData, oldData) =>
                                                    new Promise((resolve, reject) => {
                                                        setTimeout(async () => {
                                                            const dataUpdate = [...users];
                                                            const target = dataUpdate.find(
                                                                (el) => el.id === oldData.tableData.id
                                                            );
                                                            const index = dataUpdate.indexOf(target);
                                                            dataUpdate[index] = newData;
                                                            const id = newData.id;
                                                            const status = newData.status;
                                                            console.log(newData)
                                                            setUsers([...dataUpdate,]);
                                                            updateStatus(id, status);
                                                            resolve();
                                                        }, 1000);
                                                    })
                                            }}
                                            options={{
                                                actionsColumnIndex: -1,
                                                grouping: true
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </AdminLayout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    try {
        const user = await Server.get('/admin/users', {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });
        // console.log(user);
        return {
            props: {
                userData: user.data.message,
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