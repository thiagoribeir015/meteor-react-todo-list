import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
 
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

var TasksAPI = require('../api/tasks.js').Tasks;

var App = React.createClass({

    getInitialState: function(){
        return {
            showCompletedTasks: true
        }
    },

    newTask(event) {
        event.preventDefault();
     
        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
     
        // TasksAPI.insert({
        //   text,
        //   createdAt: new Date(), // current time;
        //   ownerId: Meteor.userId(), //fetch user id;
        // });
        Meteor.call('tasks.insert', text);
     
        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    },

    toggleCompletedTasks: function(){

        this.setState({
            showCompletedTasks: !this.state.showCompletedTasks
        });
    },

    render(){

        let filteredTasks = this.props.tasks;
        if(!this.state.showCompletedTasks){
            filteredTasks = filteredTasks.filter((task) => !task.checked); //return tasks.checked = false;
        }

        return(
            <div className="container">
                <AccountsUIWrapper />

                <h1>Todo List ({this.props.incompleteCount || ''})</h1>
                {this.props.currentUser ? 
                    <header>
                        <form className="new-task" onSubmit={this.newTask} >
                          <input type="text" ref="textInput" placeholder="Type to add new tasks"/>
                        </form> 

                        <label>
                            <input 
                                type='checkbox' 
                                checked={this.state.showCompletedTasks} 
                                onChange={this.toggleCompletedTasks}/>
                            Show Completed Tasks
                        </label>
                    </header>
                : null}
                
                <ul>
                    {filteredTasks.map((task) => (
                        <Task key={task._id} task={task} />
                    ))}
                </ul>
            </div>
        );
    }
});

//add info on component props;
App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};
 
//fetches tasks from Tasks collection and provide it to App through props.tasks
//contents of the database change, the App re-renders
export default createContainer(() => {

    Meteor.subscribe('tasks'); //tasks.js published this publication;

    return {
        tasks: TasksAPI.find({}, { sort: { createdAt: -1 } }).fetch(),

        incompleteCount: TasksAPI.find({ checked:{$ne: true} }).count(),//, ownerId: (Meteor.userId() || -1) }

        currentUser: Meteor.user(),
    };
}, App);

//module.exports = App;