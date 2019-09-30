import React, { Fragment, Component } from 'react'
import moment from 'moment'

class ProgrammingEntry extends Component {

    constructor(props) {
        super(props)
        this.handleEntryChange = this.handleEntryChange.bind(this)
        this.submitEntry = this.submitEntry.bind(this)

        this.state = {
            programmingEntry: {
                framework: '',
                duration:'',
                date:moment().format('YYYY-MM-DD'),
                description:''
            }
        }
    }

    componentDidMount() {
        const { editItem } = this.props
        if(editItem){
            const { framework, duration,  description, _id} = editItem
            const date = new Date(editItem.date)
            this.setState({
                programmingEntry: {
                    framework,
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
        let updateEntry = {
            ...programmingEntry,
            [propertyName]: event.target.value
        };
        this.setState({ programmingEntry: updateEntry });
    }

    submitEntry = event => {
        event.preventDefault()
        const { programmingEntry } = this.state;
        const { onsubmit } = this.props;
        onsubmit(programmingEntry)
    }

    render() {
        const { previouslySelected } = this.props;
        console.log(previouslySelected, previouslySelected.length)
        return (
            <Fragment>
                <h1>Programming Entry</h1>
                <form className='form' onSubmit={this.submitEntry}>
                    <div className="row">
                        <div className={previouslySelected.length > 0 ? "col s6" : "col s12"}>
                            <input
                                type='text'
                                placeholder ='language / framework'
                                name='language'
                                value = {this.state.programmingEntry.framework}
                                onChange = {this.handleEntryChange('framework')}
                                required 
                                />
                        </div>
                        {previouslySelected.length > 0 &&
                            <div className="col s6">
                                <select onChange = {this.handleEntryChange('framework')} className="browser-default">
                                <option value="" disabled selected>Select Previous Entry Frameworks</option>
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
                                type='number'
                                placeholder ='duration in minutes'
                                name='duration'
                                value = {this.state.programmingEntry.duration}
                                onChange = {this.handleEntryChange('duration')}
                                required
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <input
                                type='date'
                                name='date'
                                value = {moment(this.state.programmingEntry.date).format('YYYY-MM-DD')}
                                onChange = {this.handleEntryChange('date')}
                                required
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <input
                                type='text'
                                placeholder ='description (optional)'
                                name='description'
                                value = {this.state.programmingEntry.description}
                                onChange = {this.handleEntryChange('description')}
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <input type="submit" className='btn btn-primary' value='Submit' />
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default ProgrammingEntry