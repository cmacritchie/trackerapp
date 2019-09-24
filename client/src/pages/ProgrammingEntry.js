import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { createProgrammingEntry } from '../actions/programmingActions'
import { runInThisContext } from 'vm';

class Programming extends Component {

    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.submitEntry = this.submitEntry.bind(this)

        this.state = {
            programmingEntry: {
                language: '',
                duration:'',
                date:'',
                description:''
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { language, duration, date, description} = editItem
            this.setState({
                programmingEntry: {
                    language,
                    duration,
                    date,
                    description
                }
            })
        }
    }

    handleEntryChange = propertyName => event => {
        const { programmingEntry } = this.state;
        let updateEntry = {
            ...programmingEntry,
            [propertyName]: event.target.value
        };
        this.setState({ programmingEntry: updateEntry });
    }

    submitEntry = e => {
        debugger;
        e.preventDefault()
        const { programmingEntry } = this.state;
        // this.props.createProgrammingEntry(programmingEntry)
        this.props.submitEntry(programmingEntry)
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
                        placeholder ='date'
                        name='date'
                        value = {this.state.programmingEntry.date}
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

Programming.propTypes = {
    createProgrammingEntry: PropTypes.func.isRequired,
  };

export default connect(null, { createProgrammingEntry })(Programming)