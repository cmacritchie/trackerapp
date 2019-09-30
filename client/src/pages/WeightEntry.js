import React, { Fragment, Component } from 'react'
import moment from 'moment'

class SleepEntry extends Component {

    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.submitEntry = this.submitEntry.bind(this)

        this.state = {
            weightEntry: {
                weight: '',
                date:moment().format('YYYY-MM-DD'),
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { weight, _id} = editItem
            const date = new Date(editItem.date)
            this.setState({
                weightEntry: {
                    weight,
                    date,
                    _id
                }
            })
        }
    }

    handleEntryChange = propertyName => event => {
        const { weightEntry } = this.state;
        let updateEntry = {
            ...weightEntry,
            [propertyName]: event.target.value
        };
        this.setState({ weightEntry: updateEntry });
    }

    submitEntry = event => {
        event.preventDefault()
        const { weightEntry } = this.state;
        const { onSubmit } = this.props;
        onSubmit(weightEntry)
    }

    render() {
        return (
            <Fragment>
                <h1>Weight Entry</h1>
                <form className='form' onSubmit={this.submitEntry}>
                    <input
                        type='number'
                        placeholder ='weight (lbs)'
                        step="0.01"
                        name='weight'
                        value = {this.state.weightEntry.weight}
                        onChange = {this.handleEntryChange('weight')}
                        required
                        />  
                    <input
                        type='date'
                        name='date'
                        value = {moment(this.state.weightEntry.date).format('YYYY-MM-DD')}
                        onChange = {this.handleEntryChange('date')}
                        required
                        />  
                    <input type="submit" className='btn btn-primary' value='Submit' />
                </form>
            </Fragment>
        )
    }
}

export default SleepEntry