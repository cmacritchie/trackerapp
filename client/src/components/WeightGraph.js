import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend,
  } from 'recharts';
  
import moment from 'moment';



const WeightGraph = ({data}) => {
    console.log(data);
    
    const weightData = data.map(item => {
        return {
            time: new Date(item.date).getTime(),           //moment(item.date).unix(),
            weight:item.weight
        }
    })

    const toolTipFormatter = function(value, name, props) {
        if(name === 'time'){
            return `${moment(value).format('DD MMM, YYYY')}`;
        }
        return value;
    }


    return (
        <ResponsiveContainer width = '95%' height = {500}>
            <ScatterChart >
                <XAxis
                    dataKey = 'time'
                    label = 'Date'
                    domain = {['auto', 'auto']}
                    name='time'
                    tickFormatter = {(unixTime) => moment(unixTime).format('MMM, YYYY')}
                    type = 'number'
                    scale='time'
                    />       
                <YAxis 
                    label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }}
                    type="number" 
                    dataKey="weight" 
                    name="weight" 
                     />
                <Tooltip formatter={toolTipFormatter} />
                
                <Scatter name="weight" data={weightData} fill="#8884d8" line shape="circle" />
            </ScatterChart>
      </ResponsiveContainer>
    );
 
}

export default WeightGraph;
