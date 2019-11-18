import React from 'react';

class LogIn extends React.Component {

  state = {
    logIn: false,
    username: "",
    password: "",
    errors: []
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  logInSubmitted = (event) => {
    event.preventDefault()
    // console.log("clicked")
    // make a fetch
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username, 
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      } else {
        this.props.history.push('/')
        console.log(data)
        this.props.gotToken(data.token, data.user_id)
      }
    })
    // when fetch is done...get token
  }

  signupSubmit = (event) => {
    event.preventDefault()
    // console.log("clicked")
    // make a fetch
    fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username, 
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      } else {
        console.log(data)
        this.props.gotToken(data.token, data.user_id)
      }
    })
    // when fetch is done...get token
  }
  
  render(){
    return <>
      <ul>
        {
          this.state.errors.map(error => <li>{ error }</li>)
        }
      </ul>
      {
        this.state.logIn 
        ? 
        <div className="container">
          <h2>Log In</h2>
          <button onClick={ () => this.setState({ logIn: false }) }>I need to register!!!</button>
          <form className="form-signin" onSubmit={ this.logInSubmitted }>
            <label  htmlFor="log_in_username">Username</label>
            <input  id="log_in_username" 
                    type="text" 
                    onChange={ this.handleChange /* for controlled form input status */ } 
                    name="username" 
                    value={ this.state.username /* for controlled form input status */ } />
            <label  htmlFor="log_in_password">Password</label>
            <input  id="log_in_password" 
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    value={ this.state.password } />
            <input type="submit" />
          </form>
        </div>
        :
        <section>
          <h2>Sign up</h2>
          <button onClick={ () => this.setState({ logIn: true }) }>I already signed up!!!</button>
          <form onSubmit ={this.signupSubmit}>
            <label  htmlFor="sign_up_username">Username</label>
            <input  id="sign_up_username" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="username" 
                    value={ this.state.username } />
            <label  htmlFor="sign_up_password">Password</label>
            <input  id="sign_up_password" 
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    value={ this.state.password } />
            <input type="submit" />
          </form>
        </section>
      }
    </>
  }

}

export default LogIn