import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
import randomcolor from 'randomcolor'
import moment from 'moment';


const BarChartToolTip=({active, payload, label}) => { 
    const renderFrameworks = (payLoad)=> {
        return payLoad.map(framework => {
            return <p key={framework.dataKey} style={{color:framework.fill}}>{framework.dataKey} : {framework.value} </p>
        })
    }

    if(active){
        return (
            <div style={{ background:'white', outline: '1px solid black', padding: '0px 5px' }} className="custom-tooltip">
                <p className="desc">{moment(label).format('DD MMM, YYYY')}</p>
                {
                    renderFrameworks(payload)
                }
            </div>
        )
    }

    return null
}


const ProgrammingGraph = ({data}) => {
    
    let uniqueFrameworks = [...new Set(data.map(item => item.framework))];

    

    const formatData =(dataPoint)=>{
        return {
            date:new Date(dataPoint.date).getTime(),
            [dataPoint.framework]: dataPoint.duration
        }
    }

    const formattedData = data.reduce((accumulator, currentValue, currentIndex, array) => {
        if(currentIndex === 0){
            accumulator.push(formatData(currentValue));
        } else {
            if(moment(currentValue.date).isSame(array[currentIndex - 1].date, 'day')) {
                const accumulatorIndex = accumulator.length - 1
                let previousDataPoint = accumulator[accumulatorIndex] 
                if(currentValue.framework in previousDataPoint) {
                    previousDataPoint = {
                        ...previousDataPoint,
                        [currentValue.framework]:currentValue.duration + previousDataPoint[currentValue.framework]
                    }
                
                } else {
                    previousDataPoint = {
                        ...previousDataPoint,
                        [currentValue.framework]:currentValue.duration
                    }
                } 

            accumulator[accumulatorIndex] = previousDataPoint
            
            } else {
                accumulator.push(formatData(currentValue))
            }
        }
        return accumulator;
    }, []);

    const renderBars = () =>{
        const randomColorArray = randomcolor({count: uniqueFrameworks.length})
        const test = uniqueFrameworks.map((framework, index) => {
            return(
                <Bar key={framework} maxBarSize={20} dataKey={framework} stackId="a" fill={randomColorArray[index]} />
            )
        })

        return test;
    }

    return (
        <ResponsiveContainer width = '95%' height = {500}>
            <BarChart data={formattedData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis
                    dataKey = 'date'
                    domain = {['auto', 'auto']}
                    name='time'
                    tickFormatter = {(unixTime) => moment(unixTime).format('MMM DD, YYYY')}
                    type = 'number'

                    />       
                <YAxis
                     label={{ value: 'time (minutes)', angle: -90, position: 'insideLeft' }}
                    />
                <Tooltip content={<BarChartToolTip />} />
                {
                    renderBars()
                }
                <Legend />
            </BarChart>
      </ResponsiveContainer>
    );
 
}

export default ProgrammingGraph;
