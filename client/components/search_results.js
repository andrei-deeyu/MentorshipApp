import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import { Meteor }           from 'meteor/meteor'
import { createContainer }  from 'meteor/react-meteor-data';
import MentorDetail         from './mentor_detail';
import MenteeDetail         from './mentee_detail';
import { Accounts }         from 'meteor/accounts-base';


class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {user:[]}

    }

    handleSubmit(event) {
      event.preventDefault();
      const search = this.refs.searchBox.value;
      var element;
      Meteor.call('searchUsers', search, function searchUsers_callback(error, user) {
        if(user) {
          element = <p>First Name: {user.profile.firstName} <br/> Email: {user.emails[0].address} <br/> Role: {user.profile.tags} </p>;
        }
        else {
          element = <p>No user found</p>
        }
        ReactDOM.render(element, document.getElementById('root'));
      });
    }

    render() {
        return (
            <div id="searchBox-dashboard">
                <input type="text" ref="searchBox" className="form-control" onKeyUp={this.handleSubmit.bind(this)} placeholder="Search..."/>
            </div>
        ); //end return()
    } //end render()
}

export default createContainer(() =>{
    /* user email, username, and profile are published by default, we don't have to set
     up subscription. */

Meteor.subscribe('user');

    //return an object, Whatever we return will be send to userList as props
    return { user: Meteor.user()};

}, SearchResults);
