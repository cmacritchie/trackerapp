import React, { Fragment, Component } from 'react'
import moment from 'moment'
import { TimePicker, DatePicker } from "react-materialize";

class ExerciseEntry extends Component {
    
    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.setDate = this.setDate.bind(this)
        this.submitEntry = this.submitEntry.bind(this)
        this.checkTime = this.checkTime.bind(this)

        this.state ={
            exerciseEntry: {
                type: '',
                detail: '',
                startTime: '',
                endTime:'',
                date:new Date(),
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { type, startTime, endTime, detail, _id } = editItem
            const date = new Date(editItem.date)
            this.setState({
                timeConflict:false,
                exerciseEntry: {
                    type,
                    detail,
                    startTime,
                    endTime,
                    date,
                    _id
                }
            })
        }
    }
     
    handleEntryChange = propertyName => event => {
        const { exerciseEntry } = this.state
        let updateEntry = {
            ...exerciseEntry,
            [propertyName]: event.target.value
        }

        const timeConflict = this.checkTime(updateEntry.startTime, updateEntry.endTime)
        this.setState({ timeConflict, exerciseEntry: updateEntry});
    }

    setDate = (date) => {
        const { exerciseEntry } = this.state
        let updateEntry = {
            ...exerciseEntry,
            date
        }
        this.setState({...this.state, exerciseEntry:updateEntry})
    }

    checkTime = (startTime, endTime) => {
        startTime = moment(startTime, 'h:mm a');
        endTime = moment(endTime, 'h:mm a');
        const time = endTime.diff(startTime, 'minutes');
        if(time > 0){
            return false
        } else {
            return true
        }
    }

    submitEntry = event => {
        event.preventDefault()
        const { exerciseEntry } = this.state
        const { onSubmit } = this.props;
        onSubmit(exerciseEntry)
    }

    render() {
        const { previouslySelected } = this.props;
        return (
            <Fragment>
                <h1>Exercise Entry</h1>
                <form className='form' onSubmit={this.submitEntry}>
                    <div className="row">
                    <div className={previouslySelected.length > 0 ? "col s6" : "col s12"}>
                    <input
                                type='text'
                                placeholder ='exercise Type'
                                name='type'
                                value = {this.state.exerciseEntry.type}
                                onChange = {this.handleEntryChange('type')}
                                required
                                />
                    </div>
                    {previouslySelected.length > 0 &&
                            <div className="col s6">
                                <select onChange = {this.handleEntryChange('type')} className="browser-default">
                                <option value="" disabled defaultValue>Select Previous Exercise Types</option>
                                {previouslySelected.map(distinct => {
                                                        return <option key={distinct}>{distinct}</option>
                                                    })}
                                </select>
                            </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <input
                                type='text'
                                placeholder ='exercise detail (optional)'
                                name='detail'
                                value = {this.state.exerciseEntry.detail}
                                onChange = {this.handleEntryChange('detail')}
                                />
                        </div>
                    </div>
                    {this.state.timeConflict && 
                    <p className="red-text">Start Times must occure before end times</p>
                    }
                    <div className="row">
                        <div className="col s4">
                            <TimePicker
                                placeholder="start Time"
                                value={this.state.exerciseEntry.startTime}
                                required
                                onChange={event=>console.log(event)}
                                onSelect ={this.handleEntryChange('startTime')}
                                />
                        </div>
                        <div className="col s4">
                            <TimePicker
                                placeholder="end Time"
                                value={this.state.exerciseEntry.endTime}
                                required
                                onChange={event=>console.log(event)}
                                onSelect ={this.handleEntryChange('endTime')}
                                />
                        </div>
                        <div className="col s4">
                            <DatePicker
                                required
                                name='date'
                                value={moment(this.state.exerciseEntry.date).format('MMM DD, YYYY')}
                                onChange={date => this.setDate(date)}
                                />
                        </div>
                    </div>
                    <div className="row">
                    <div className="col s12"> 
                        <input disabled={this.state.timeConflict} type="submit" className='btn btn-primary' value='Submit' />
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default ExerciseEntry