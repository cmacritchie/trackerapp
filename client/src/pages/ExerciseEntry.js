import React, { Fragment, Component } from 'react'
import moment from 'moment'

class ExerciseEntry extends Component {
    
    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.submitEntry = this.submitEntry.bind(this)

        this.state ={
            exerciseEntry: {
                type: '',
                detail: '',
                startTime: '',
                endTime:'',
                date:moment().format('YYYY-MM-DD'),
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { type, startTime, endTime, detail, _id } = editItem
            const date = new Date(editItem.date)
            this.setState({
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
        this.setState({ exerciseEntry: updateEntry});
    }

    submitEntry = event => {
        event.preventDefault()
        const { exerciseEntry } = this.state
        const { onSubmit } = this.props;
        onSubmit(exerciseEntry)
    }

    render() {
        return (
            <Fragment>
                <h1>Exercise Entry</h1>
                <form className='form' onSubmit={this.submitEntry}>
                    <input
                        type='text'
                        placeholder ='exercise Type'
                        name='type'
                        value = {this.state.exerciseEntry.type}
                        onChange = {this.handleEntryChange('type')}
                        required
                        />
                        <input
                        type='text'
                        placeholder ='exercise detail (optional)'
                        name='detail'
                        value = {this.state.exerciseEntry.detail}
                        onChange = {this.handleEntryChange('detail')}
                        />
                    <input
                        type='number'
                        placeholder ='start time (24 hour input)'
                        name='startTime'
                        value = {this.state.exerciseEntry.startTime}
                        onChange = {this.handleEntryChange('startTime')}
                        required
                        />
                    <input
                        type='number'
                        placeholder ='end time (24 hour input)'
                        name='endTime'
                        value = {this.state.exerciseEntry.endTime}
                        onChange = {this.handleEntryChange('endTime')}
                        required
                        />
                    <input
                        type='date'
                        name='date'
                        value = {moment(this.state.exerciseEntry.date).format('YYYY-MM-DD')}
                        onChange = {this.handleEntryChange('date')}
                        required
                        />
                        <input type="submit" className='btn btn-primary' value='Submit' />
                </form>
            </Fragment>
        )
    }

}

export default ExerciseEntry