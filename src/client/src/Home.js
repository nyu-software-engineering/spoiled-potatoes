import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Home extends Component {

  componentDidMount(){
      console.log('in component did mount')
      fetch('/home', { credentials : 'same-origin' }).then((res) => {
        console.log(res.text)})
        /*.then((data) => {
          if (data.user) {
            console.log('success, welcome: ', data.user);
          } else {
            console.log('registration failure');
          }
        })
      })
      */
}
    

  render() {
    return (
        <div>
            you have registered/logged in
        </div>    
    );
  }
}

export default Home;
