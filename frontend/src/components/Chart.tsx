import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {ITraining} from "../interfaces/ITraining";
import moment from "moment";

const Chart = (props:{
    data: ITraining[]|undefined,
}) => {

    props.data?.forEach((data, ind) => {
        const a: Date = new Date(data.trainingDate)
        console.log(a)
        data.trainingDate = a;
    })

     const dateFormatter = (date:Date) => {
        return moment(date).format('DD.MM.YY');
    };

    return (
        <div className='chart'>
            <div className='players-text'>
                Trainings info
            </div>
            <LineChart
                width={800}
                height={400}
                data={props.data}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >

                <XAxis dataKey="trainingDate" tickFormatter={dateFormatter}/>

                <YAxis type={"number"} domain={[0,10]}/>
                <Tooltip />
                <Legend/>
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="grade" stroke="#ff7300" />
            </LineChart>
        </div>
    );
};

export default Chart;