import React, { Fragment, Component } from 'react'
import { TimePicker, DatePicker } from "react-materialize";
import moment from 'moment'

class SleepEntry extends Component {

    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.submitEntry = this.submitEntry.bind(this)

        this.state = {
            dateTimeError:false,
            sleepEntry: {
                fallAsleepDate: new Date(),
                fallAsleepTime:'',
                wakeUpDate: new Date(),
                wakeUpTime:'',
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { fallAsleepTime, wakeUpTime, _id} = editItem
            const fallAsleepDate = new Date(editItem.fallAsleepDate)
            const wakeUpDate = new Date(editItem.wakeUpDate)
            this.setState({
                dateTimeError:false,
                sleepEntry: {
                    fallAsleepDate,
                    fallAsleepTime,
                    wakeUpDate,
                    wakeUpTime,
                    _id
                }
            })
        }
    }

    handleEntryChange = propertyName => event => {
        const { sleepEntry, dateTimeError } = this.state;
        let updateEntry = {
            ...sleepEntry,
            [propertyName]: event.target.value
        };
        if(dateTimeError){
            const dateTimeCheck = this.checkTime(updateEntry.fallAsleepDate, 
                                                updateEntry.fallAsleepTime,
                                                updateEntry.wakeUpDate,
                                                updateEntry.wakeUpTime)
            this.setState({ dateTimeError:dateTimeCheck, sleepEntry: updateEntry });
        } else {
            this.setState({ sleepEntry: updateEntry });
        }
    }

    setDate = (propertyName) => (date) => {
        const { sleepEntry } = this.state
        let updateEntry = {
            ...sleepEntry,
            [propertyName]:moment(date).format('MMM DD YYYY')
        }
        this.setState({...this.state, sleepEntry:updateEntry})
    }

    checkTime = (fallAsleepDate, fallAsleepTime, wakeUpDate, wakeUpTime) => {
        
        fallAsleepTime = moment(fallAsleepTime, 'h:mm a')
        wakeUpTime = moment(wakeUpTime, 'h:mm a')

       const dateTimeStart = moment(fallAsleepDate).set({
           'hour':fallAsleepTime.get('hour'),
           'minute':fallAsleepTime.get('minute')
       })

       const dateTimeEnd = moment(wakeUpDate).set({
        'hour':wakeUpTime.get('hour'),
        'minute':wakeUpTime.get('minute')
        })

       const timeDifference = dateTimeEnd.diff(dateTimeStart, 'minutes');

       if(timeDifference > 0) {
           return true
       } else {
           return false
       }
    }

    submitEntry = event => {
        event.preventDefault()
        const { onSubmit } = this.props;
        const { sleepEntry } = this.state;
        const { fallAsleepDate, fallAsleepTime, wakeUpDate, wakeUpTime } = sleepEntry;
        
        const timeValidate = this.checkTime(fallAsleepDate, fallAsleepTime, wakeUpDate, wakeUpTime)
       debugger;
        if(timeValidate > 0) {
            onSubmit(sleepEntry)
        } else {
           this.setState({
            dateTimeError:true
           })
       }
    }

    render() {
        return (
            <Fragment>
                <h1>Sleep Entry</h1>
                {this.state.dateTimeError && 
                    <p className="red-text">Can't have negative sleep times! </p>
                    }
                <form className='form' onSubmit={this.submitEntry}>
                    <label>Sleep Start Date</label>
                    <DatePicker
                            placeholder="Going To Sleep Date"
                            required
                            name='fallAsleepDate'
                            value={moment(this.state.sleepEntry.fallAsleepDate).format('MMM DD, YYYY')}
                            onChange={date => this.setDate('fallAsleepDate')(date)}
                            />
                    <label>Sleep Start Time</label>
                    <TimePicker
                            placeholder="Going To Sleep Time "
                            value={this.state.sleepEntry.fallAsleepTime}
                            required
                            onChange={event=>console.log(event)}
                            onSelect ={this.handleEntryChange('fallAsleepTime')}
                            />
                    <label>Wake up Date</label>
                    <DatePicker
                            placeholder="Wake Up Date"
                            required
                            name='date'
                            value={moment(this.state.sleepEntry.wakeUpDate).format('MMM DD, YYYY')}
                            onChange={date => this.setDate('wakeUpDate')(date)}
                            />
                    <label>Wake up Time</label>
                    <TimePicker
                                placeholder="Wake Up Time"
                                value={this.state.sleepEntry.wakeUpTime}
                                required
                                onChange={event=>console.log(event)}
                                onSelect ={this.handleEntryChange('wakeUpTime')}
                                />
                    <input type="submit" className='btn btn-primary' value='Submit' />
                </form>
            </Fragment>
        )
    }
}

export default SleepEntry