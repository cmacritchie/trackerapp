import React, { Fragment, Component } from 'react'
import moment from 'moment'

class Programming extends Component {

    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.submitEntry = this.submitEntry.bind(this)

        this.state = {
            programmingEntry: {
                language: '',
                duration:'',
                date:moment().format('YYYY-MM-DD'),
                description:''
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { language, duration,  description, _id} = editItem
            const date = new Date(editItem.date)
            this.setState({
                programmingEntry: {
                    language,
                    duration,
                    date,
                    description,
                    _id
                }
            })
        }
    }

    handleEntryChange = propertyName => event => {
        const { programmingEntry } = this.state;
        console.log(this.state)
        let updateEntry = {
            ...programmingEntry,
            [propertyName]: event.target.value
        };
        this.setState({ programmingEntry: updateEntry });
    }

    submitEntry = e => {
        e.preventDefault()
        const { programmingEntry } = this.state;
        const { onsubmit } = this.props;
        onsubmit(programmingEntry)
    }

    render() {
        return (
            <Fragment>
                <h1>Programming Entry</h1>
                <form className='form' onSubmit={this.submitEntry}>
                    <input
                        type='text'
                        placeholder ='language / framework'
                        name='language'
                        value = {this.state.programmingEntry.language}
                        onChange = {this.handleEntryChange('language')}
                        required
                        />
                    <input
                        type='number'
                        placeholder ='duration in minutes'
                        name='duration'
                        value = {this.state.programmingEntry.duration}
                        onChange = {this.handleEntryChange('duration')}
                        required
                        />
                    <input
                        type='date'
                        name='date'
                        value = {moment(this.state.programmingEntry.date).format('YYYY-MM-DD')}
                        onChange = {this.handleEntryChange('date')}
                        required
                        />
                    <input
                        type='text'
                        placeholder ='description'
                        name='description'
                        value = {this.state.programmingEntry.description}
                        onChange = {this.handleEntryChange('description')}
                        required
                        />
                    <input type="submit" className='btn btn-primary' value='Submit' />
                </form>
            </Fragment>
        )
    }
}

export default Programming