import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';
import moment from 'moment';

const tickFormatter=(tick)=> {
    const hour = Math.floor(tick / 60)
    let presentHour = hour % 12
    let minute = tick % 60
    const flagAmPm = Math.floor(hour / 12)
    if(minute < 10) {
        minute= '0'+ minute
    }

    if(flagAmPm % 2 == 0 || flagAmPm % 2 == 2){
         
        return (presentHour === 0 ? 12 : presentHour)  + ':' + minute + ' AM'
    } else {
        return presentHour + ':' + minute + ' PM'
    }   
}

const SleepToolTip=({active, payload, label}) => {
    if(active){
        return(
            <div style={{ background:'white', outline: '1px solid black', padding: '0px 5px' }} className="custom-tooltip">
                 <p className="desc">{moment(label).format('DD MMM, YYYY')}</p>
                 <p>Sleep Start: {tickFormatter(payload[0].payload.value[1])}</p>
                 <p>Sleep End: {tickFormatter(payload[0].payload.value[0])}</p>
                 <p>Duration: {payload[0].payload.duration} h</p>
            </div>
        )
    }

    return null
}

const SleepGraph = ({data}) => {

    const formattedData = () => {
        const minPerDay = 1440
        
         return data.map(sleepEntry => {
            const wakeDate = moment(sleepEntry.sleepEnd)
            const mmtMidnight = wakeDate.clone().startOf('day');
            const diffMinutes = wakeDate.diff(mmtMidnight, 'minutes');
            const wakeTimeMinutes = diffMinutes + minPerDay
            const restTimeMinutes = wakeTimeMinutes - sleepEntry.duration
            const totalSleepTimeMinutes = wakeTimeMinutes - restTimeMinutes
            
            return {
                date:new Date(sleepEntry.wakeUpDate).getTime(),
                value: [restTimeMinutes, wakeTimeMinutes],
                duration: (Math.floor(totalSleepTimeMinutes / 60) + ':' + ((totalSleepTimeMinutes % 60 < 10) ? ('0' + totalSleepTimeMinutes % 60) : totalSleepTimeMinutes % 60))
            }
        })   
    }

    return (
        <ResponsiveContainer width = '95%' height = {500}>
            <BarChart data={formattedData()} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis
                    dataKey = 'date'
                    domain = {['auto', 'auto']}
                    name='time'
                    tickFormatter = {(unixTime) => moment(unixTime).format('MMM DD, YYYY')}
                    type = 'number'
                    scale='time'

                    />       
                <YAxis
                    dataKey='value'
                    tickFormatter ={tickFormatter}
                    />
                    <Tooltip content={<SleepToolTip />} />
                
                {
                    formattedData.length < 4 ? 
                    <Bar maxBarSize={25} barSize={22} dataKey="value" fill="#8884d8"> 
                        <LabelList dataKey="duration" />
                    </Bar>
                    :
                    <Bar maxBarSize={25} dataKey="value" fill="#8884d8" >
                        <LabelList dataKey="duration" />
                    </Bar>
                }
                
               
                
    
                      
            </BarChart>
      </ResponsiveContainer>
    );
 
}

export default SleepGraph;
