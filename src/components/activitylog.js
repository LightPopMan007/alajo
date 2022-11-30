import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';

export default function ActivityLog() {
    return (
        <div className="flex justify-between bg-amber-100 test p-4 rounded">
            <div className='flex'>
                <div className='bg-green-500 p-4 rounded'>
                    <BsArrowUpRight className='text-white' />
                </div>

                <div className="flex-col ml-4">
                    <h3 className='text-black'>Trade 001</h3>
                    <p className='text-gray-600 text-sm'>Income</p>
                </div>
            </div>
            
            <div className="flex-col">
                <h3 className='font-bold text-green-500'>$5,000</h3>
                <p className='text-gray-600 text-sm'>Activity Log</p>
            </div>
        </div>
    )
}