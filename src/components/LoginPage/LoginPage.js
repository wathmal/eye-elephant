/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */
import React, { PropTypes, Component } from 'react';
import styles from './LoginPage.css';
import withStyles from '../../decorators/withStyles';
import { setUser } from './../../core/CommonUtils';

@withStyles(styles)
class LoginPage extends Component {

  constructor() {
    super();
    this.handleStartButton= this.handleStartButton.bind(this);
  }

  handleStartButton(e) {
    e.preventDefault();

    const username = this.refs.username.value;

    if(username === ''){
      window.alert("Please enter user name.");
    }

    else{
      setUser(username);
      window.location.href = '/elephant';
    }
  }

  render() {
    return (
        <div className="container sign-in">
          <form className="form-signin" role="form" id="admin-signup">
            <div className="logo"></div>
            <h1>Project Dashboard</h1>
            <h2 className="form-signin-heading">Please sign in</h2>
            <input type="text" ref="username" className="form-control" placeholder="User Name" required="" autofocus />

            <button className="btn btn-lg btn-primary btn-block" onClick={this.handleStartButton} >Sign In</button>
          </form>
        </div>
    );
  }

}

export default LoginPage;
