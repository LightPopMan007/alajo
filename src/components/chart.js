import React from 'react';
import Chart from 'chart.js/auto';
import {Bar} from 'react-chartjs-2';

const AreaChart = (props) => {
    return (
        <div>
            <Bar
                data={props.data}
                width={100}
                height={50}
                options={{
                    maintainAspectRatio: true
                }}
            />
        </div>
    )
}

export default AreaChart;