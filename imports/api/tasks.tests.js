/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
 
import { Tasks } from './tasks.js';
 
if (Meteor.isServer) {

 	describe('Tasks', () => {
    	describe('methods', () => {

    		const userId = Random.id();
    		let taskId;
    		 
		    beforeEach(() => {
		        
		        Tasks.remove({}); //clean task list;
		        
		        taskId = Tasks.insert({
		          text: 'test task',
		          createdAt: new Date(),
		          ownerId: userId,
		        });
		    });


			it('can delete owned task', () => {

				// Find the internal implementation of the task method so we can
		        // test it in isolation
		        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
		 
		        // Set up a fake method invocation that looks like what the method expects
		        const thisContext = { userId };
		 
		        // Run the method with `this` set to the fake invocation and pars;
		        deleteTask.apply(thisContext, [taskId]);
		 
		        // Verify that the method does what we expected
		        assert.equal(Tasks.find().count(), 0);
		        assert.equal(Tasks.findOne(taskId), null);

			});

			it('cannot delete not owned task', () => {

				// Find the internal implementation of the task method so we can
		        // test it in isolation
		        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
		 
		        // Set up a fake method invocation that looks like what the method expects
		        const thisContext = { userId: Random.id() };
		 
		        // Run the method with `this` set to the fake invocation and pars;
		        deleteTask.apply(thisContext, [taskId]);
		 
		        // Verify that the method does what we expected
		        assert.equal(Tasks.find().count(), 1);
		        //assert.equal(Tasks.findOne(taskId), {});

			});

	    });
  	});
}