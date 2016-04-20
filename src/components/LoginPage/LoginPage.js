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
            <input type="text" ref="username" className="form-control signin-input-name" placeholder="User Name" required="" autofocus />

            <button className="btn btn-lg btn-primary btn-block signin-button" onClick={this.handleStartButton} >wdrïNh</button>
          </form>
        </div>
    );
  }

}

export default LoginPage;
