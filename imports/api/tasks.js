import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//aka => export const  Tasks = new Mongo...
var Tasks = new Mongo.Collection('tasks');

if(Meteor.isServer){

	//by default, every task operation will have this filter;
	Meteor.publish('tasks', function(){
		return Tasks.find({ ownerId: (this.userId || -1) });
	});

}

//defining public methods;
Meteor.methods({

	'tasks.insert'(text){
		check(text, String);

		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}

		Tasks.insert({
          text,
          createdAt: new Date(), // server current time;
          ownerId: this.userId, //fetch user id;
        });
	},

	'tasks.remove'(taskId){
		
		check(taskId, String);

		//check if task.ownerId == Meteor.userId;
		if(Tasks.findOne(taskId).ownerId !== this.userId){
			throw new Meteor.Error('not-authorized');	
			
		}

		Tasks.remove(taskId);
	},

	'tasks.setChecked'(taskId, checked){
		check(taskId, String);
		check(checked, Boolean);

		Tasks.update(taskId, {
			$set: {checked: checked}
		}); //toogle value)
	},

});


module.exports = {Tasks};