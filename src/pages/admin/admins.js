// import Content from '../components/content';
import React, { useEffect } from 'react';
import Breadcumb from '../../components/breadcumb';
import Statistics from '../../components/statistics';
import { FiUserPlus, FiDollarSign, FiActivity, FiSave } from 'react-icons/fi'
import AdminLayout from '../../dashboard/AdminLayout';
import MaterialTable, { Column } from "@material-table/core";
import Icon from "@material-ui/core/Icon";
import { forwardRef } from 'react';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Delete from '@material-ui/icons/Delete'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import moment from 'moment';

export default function Admins() {
    const [state, setState] = React.useState({
        admins: [],
    })

    const column = [
        {
            title: "Admin ID", field: "admin_id", editable: false, headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            }, render: (rowData) => <p className="text-ms font-semibold">{rowData.customer_id}</p>
        },
        // { title: "Name", field: "name" },
        {
            title: "Admin", field: "picture",
            headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            render: (rowData) => {
                return (
                    <div className="flex text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src={rowData.picture} alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                            <p className="font-semibold text-black">{rowData.name}</p>
                            {/* <p className="text-xs text-gray-600">Joined {moment(rowData.created_at).fromNow()}</p> */}
                        </div>
                    </div>
                )
            }
        },
        {
            title: "Role", field: "role", headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            }, lookup: { 1: "Admin", 2: "Vendor", 3: "Accountant", 4: "Support" }
        },
        {
            title: "Status", field: "status",
            lookup: { 1: "Active", 2: "Banned" },
            headerStyle: {
                backgroundColor: 'orange',
                fontWeight: 'bold',
            },
            render: rowData => {
                return (
                    <div className="flex items-center">
                        {
                            rowData.status == 1 ? (
                                <div className="font-semibold leading-tight text-green-700 bg-green-100 rounded-sm p-2 gap-2">
                                    Active
                                </div>
                            ) : (
                                    <div className="font-semibold leading-tight text-red-700 bg-red-100 rounded-sm p-2 gap-2">
                                    Banned
                                </div>
                            )
                        }
                    </div>
                )
            },
        },
    ]

    const adminData = [{
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "customer_id": "daunt001",
        "created_at": "2020-01-01",
        "status": 1,
        "role": 1,
        "picture": `https://randomuser.me/api/portraits/thumb/men/1.jpg`
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "customer_id": "daunt002",
        "created_at": "2020-01-02",
        "role": 4,
        "status": 1,
        "picture": `https://randomuser.me/api/portraits/thumb/men/2.jpg`
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "customer_id": "daunt003",
        "created_at": "2020-01-03",
        "role": 2,
        "picture": `https://randomuser.me/api/portraits/thumb/men/3.jpg`,
    },
    {
        "id": 4,
        "name": "Okoro Williams",
        "customer_id": "daunt004",
        "username": "Okorosha",
        "created_at": "2021-01-23",
        "status": 2,
        "role": 1,
        "picture": `https://randomuser.me/api/portraits/thumb/men/4.jpg`

    }
    ]
    // const tableIcons = {
    //     Save: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    // }

    const sdata = [
        { id: 1, imageUrl: "https://media.japan-codes.com/uploads/20150906173700/itunes1500.jpg", name: "Itunes", count: 5, availability: true },
        { id: 2, imageUrl: "https://s.pacn.ws/1500/qb/amazon-gift-card-us-20-473915.2.jpg?o73x4u", name: "Amazon", count: 10, availability: false }
    ];

    const sdataAdminType = [
        { id: 1, card: 1, type: 1, name: "Amazon Canada", status: true, rate: "300" },
        { id: 2, card: 1, type: 2, name: "Amazon India", status: false, rate: "400" },
        { id: 3, card: 1, type: 3, name: "Amazon United Kingdom", status: true, rate: "500" },
        { id: 4, card: 2, type: 1, name: "Itunes Canada", status: true, rate: "300" },
        { id: 5, card: 2, type: 2, name: "Itunes India", status: false, rate: "400" },
    ]

    
    useEffect(() => {
        setState({
            admins: adminData
        })
    }, [])
    return (
        <AdminLayout>

            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 bg-gray-300 dark:bg-gray-800 py-6 px-6 rounded-3xl">
                    <Breadcumb title={'Manage Admins'} />
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-12/12">
                            <div className="p-2">
                                <div
                                    className="p-4 rounded-3xl"
                                >
                                    <div className="shadow-lg rounded-lg overflow-hidden">

                                        <MaterialTable
                                            icons={{
                                                Check: () => <Check />
                                                // DetailPanel: () => <ChevronRight />
                                            }}
                                            title="Manage Admins"
                                            columns={column}
                                            data={state.admins}
                                            actions={[

                                                rowData => ({
                                                    icon: Delete,
                                                    tooltip: 'Delete Admin',
                                                    onClick: (event, rowData) => confirm("You want to delete " + rowData.name),
                                                    disabled: rowData.birthYear < 2000
                                                })

                                            ]}

                                            editable={{
                                                onRowAdd: newData =>
                                                    new Promise((resolve, reject) => {
                                                        setTimeout(() => {
                                                            setData([...data, newData]);

                                                            resolve();
                                                        }, 1000)
                                                    }),
                                                onRowUpdate: (newData, oldData) =>
                                                    new Promise((resolve, reject) => {
                                                        setTimeout(() => {
                                                            const dataUpdate = [...state.admins];
                                                            const index = oldData.tableData.id;
                                                            dataUpdate[index] = newData;
                                                            setState({ admins: [...dataUpdate] });

                                                            resolve();
                                                        }, 1000)
                                                    }),
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
