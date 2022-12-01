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
                                                        if (rowData.isVerified == true) {
                                                            Router.push(`/admin/agents/2`);
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
        const user = [
            {
              agentId: '001',
              firstName: 'John',
              lastName: 'Smith',
              address: 'Raven Avenue, P.O Box 350',
              phone: '555 5555 555',
              status: 'true',
              email: 'johnfsmith@gmail.com',
              createdAt: 'May 16, 2016',
              updatedAt: 'May 14, 2022',
              amount: '3,500',
              isVerified: 1
            },
            {
              agentId: '002',
              firstName: 'Peter',
              lastName: 'Alfie',
              address: 'Raven Avenue, P.O Box 350',
              phone: '554 5345 555',
              status: 'true',
              email: 'peteralfie@gmail.com',
              createdAt: 'May 16, 2016',
              updatedAt: 'May 14, 2022',
              amount: '2,000',
              isVerified: 0
            }
          ]
        // const user = await Server.get('/admin/users', {
        //     headers: {
        //         Authorization: `Bearer ${session?.accessToken}`,
        //     },
        // });
        // console.log(user);
        return {
            props: {
                userData: user,
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