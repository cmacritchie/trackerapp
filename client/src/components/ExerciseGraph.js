import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
import randomcolor from 'randomcolor'
import moment from 'moment';

const ExerciseToolTip=({active, payload, label}) => { 
    const renderTypes = (payLoad)=> {
        return payLoad.map(type => {
            return <p key={type.dataKey} style={{color:type.fill}}>{type.dataKey} : {type.value} </p>
        })
    }

    if(active){
        return (
            <div style={{ background:'white', outline: '1px solid black', padding: '0px 5px' }} className="custom-tooltip">
                <p className="desc">{moment(label).format('DD MMM, YYYY')}</p>
                {
                    renderTypes(payload)
                }
            </div>
        )
    }

    return null
}

const ExerciseGraph = ({data}) => {
    
    let uniqueExerciseTypes = [...new Set(data.map(item => item.type))];

    

    const formatData =(dataPoint)=>{
        return {
            date:new Date(dataPoint.date).getTime(),
            [dataPoint.type]: dataPoint.duration
        }
    }

    const formattedData = data.reduce((accumulator, currentValue, currentIndex, array) => {
        if(currentIndex === 0){
            accumulator.push(formatData(currentValue));
        } else {
            if(moment(currentValue.date).isSame(array[currentIndex - 1].date, 'day')) {
                const accumulatorIndex = accumulator.length - 1
                let previousDataPoint = accumulator[accumulatorIndex] 
                if(currentValue.type in previousDataPoint) {
                    previousDataPoint = {
                        ...previousDataPoint,
                        [currentValue.type]:currentValue.duration + previousDataPoint[currentValue.type]
                    }
                
                } else {
                    previousDataPoint = {
                        ...previousDataPoint,
                        [currentValue.type]:currentValue.duration
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
        const randomColorArray = randomcolor({count: uniqueExerciseTypes.length})
        const test = uniqueExerciseTypes.map((type, index) => {
            return(
                <Bar key={type} maxBarSize={20} dataKey={type} stackId="a" fill={randomColorArray[index]} />
            )
        })

        return test;
    }

    debugger;

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
                <Tooltip content={ExerciseToolTip} />
                {
                    renderBars()
                }
                <Legend />
            </BarChart>
      </ResponsiveContainer>
    );
 
}

export default ExerciseGraph;
