import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
 
var AccountsUIWrapper = React.createClass({

	componentDidMount() {
	  // Use Meteor Blaze to render login buttons
	  this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
	},

	componentWillUnmount() {
	  // Clean up Blaze view
	  Blaze.remove(this.view);
	},

	render() {
	  // Just render a placeholder container that will be filled in
	  //style={{position: "fixed", right: "10px", top: "10px"}}
	  return <span ref="container"  />;
	}
});

module.exports = AccountsUIWrapper;