import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
 
var TasksAPI = require('../api/tasks.js').Tasks;

var Task = React.createClass({

	toggleChecked: function(e){
		console.log("toggleChecked",e);

		// TasksAPI.update(this.props.task._id, {
		// 	$set: {checked: !this.props.task.checked} //toogle value
		// });
		Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
	},

	removeTask: function(e){
		console.log("removeTask",e);
		//TasksAPI.remove(this.props.task._id);
		Meteor.call('tasks.remove', this.props.task._id);
	},

 	render() {
	    return (
	      <li>
	      	<input 
	      		type="checkbox"
	      		readOnly
	      		checked={this.props.task.checked}
	      		onChange={this.toggleChecked} />

	      	{this.props.task.text}

	      	<button onClick={this.removeTask}> 
	      		X 
	      	</button>

	      </li>
	    );
	}
});

// Task component - represents a single todo item
// export default class Task extends Component {
//   render() {
//     return (
//       <li>{this.props.task.text}</li>
//     );
//   }
// }
 
// Task.propTypes = {
//   // This component gets the task to display through a React prop.
//   // We can use propTypes to indicate it is required
//   task: PropTypes.object.isRequired,
// };

module.exports = Task;