import React, { Fragment, Component } from 'react'
import moment from 'moment'

class SleepEntry extends Component {

    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.submitEntry = this.submitEntry.bind(this)

        this.state = {
            sleepEntry: {
                down: '',
                up:'',
                date:moment().format('YYYY-MM-DD'),
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { down, up, _id} = editItem
            const date = new Date(editItem.date)
            this.setState({
                sleepEntry: {
                    down,
                    up,
                    date,
                    _id
                }
            })
        }
    }

    handleEntryChange = propertyName => event => {
        const { sleepEntry } = this.state;
        let updateEntry = {
            ...sleepEntry,
            [propertyName]: event.target.value
        };
        this.setState({ sleepEntry: updateEntry });
    }

    submitEntry = event => {
        event.preventDefault()
        const { sleepEntry } = this.state;
        const { onSubmit } = this.props;
        onSubmit(sleepEntry)
    }

    render() {
        return (
            <Fragment>
                <h1>Sleep Entry</h1>
                <form className='form' onSubmit={this.submitEntry}>
                <input
                        type='date'
                        name='date'
                        value = {moment(this.state.sleepEntry.date).format('YYYY-MM-DD')}
                        onChange = {this.handleEntryChange('date')}
                        required
                        />
                    <input
                        type='number'
                        placeholder ='go to bed time (24 hour {put 26 if 2am next day})'
                        name='down'
                        value = {this.state.sleepEntry.down}
                        onChange = {this.handleEntryChange('down')}
                        required
                        />
                    <input
                        type='number'
                        placeholder ='wake up time (24 hour)'
                        name='up'
                        value = {this.state.sleepEntry.up}
                        onChange = {this.handleEntryChange('up')}
                        required
                        />
    
                    <input type="submit" className='btn btn-primary' value='Submit' />
                </form>
            </Fragment>
        )
    }
}

export default SleepEntry