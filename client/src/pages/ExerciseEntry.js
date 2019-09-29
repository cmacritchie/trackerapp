import React, { Fragment, Component } from 'react'
import moment from 'moment'

class ExerciseEntry extends Component {
    
    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.submitEntry = this.submitEntry.bind(this)

        this.state ={
            exerciseEntry: {
                description: '',
                duration: '',
                detail: '',
                date:moment().format('YYYY-MM-DD'),
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { description, duration, detail, _id } = editItem
            const date = new Date(editItem.date)
            this.setState({
                exerciseEntry: {
                    description,
                    duration,
                    detail,
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
                        placeholder ='description'
                        name='description'
                        value = {this.state.exerciseEntry.description}
                        onChange = {this.handleEntryChange('description')}
                        required
                        />
                        <input
                        type='text'
                        placeholder ='detail'
                        name='detail'
                        value = {this.state.exerciseEntry.detail}
                        onChange = {this.handleEntryChange('detail')}
                        required
                        />
                    <input
                        type='number'
                        placeholder ='duration in minutes'
                        name='duration'
                        value = {this.state.exerciseEntry.duration}
                        onChange = {this.handleEntryChange('duration')}
                        required
                        />
                    <input
                        type='date'
                        name='date'
                        value = {moment(this.state.exerciseEntry.date).format('YYYY-MM-DD')}
                        onChange = {this.handleEntryChange('date')}
                        required
                        />
                </form>
            </Fragment>
        )
    }

}

export default ExerciseEntry