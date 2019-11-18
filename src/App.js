import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Containers/Homepage';
import { Route, Switch, withRouter, NavLink } from 'react-router-dom'
import Answers from './Components/Answers';
import Questions from './Components/Questions'
import Login from './Components/Login'


class App extends React.Component {

  state = {
    loggedInUserId: null,
    token: null
  }

  gotToken = (token, loggedInUserId) => {
    // debugger
    // console.log("logged in", token)
    localStorage.token = token
    localStorage.loggedInUserId = loggedInUserId
    this.setState({
      token,
      loggedInUserId
    })
  }

  logOutClicked = () => {
    localStorage.clear()
    // localStorage.token = null
    // localStorage.loggedInUserId = null
    // debugger
    // this.setState({
    //   token: null,
    //   loggedInUserId: null
    // })
    // console.log(props);
    this.props.history.push('/login')
  }

  componentDidMount(){
    console.log("componentDidMount", localStorage.token);
    if (localStorage.token) {
      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.loggedInUserId
      })
    }
  }

  goBack = () => {
    this.props.history.go(-1)
  }

  render() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
      {/* <NavLink> 
       
        Login
      </NavLink> */}

      {/* {<NavLink
        // render={(routerProps)=> {return <NavLink logOutClicked={this.logOutClicked}{...routerProps}/>}}
        > 
        Sign Out
      </NavLink> */} 
      {/* <NavLink to="/login"> link</NavLink> */}
      {/* <NavBar></NavBar> */}
      <button onClick={this.goBack}>Back</button>
        <button onClick={this.logOutClicked}>Logout</button>
      <Switch>
        <Route path='/login' render={(routerProps) => {return <Login gotToken={this.gotToken} {...routerProps}/>}} />
        <Route path={'/questions'} component={Questions} />
        <Route path={'/answers'} component={Answers} />
        <Route exact path={'/'} component={Homepage} />
      </Switch>
      {/* <Homepage /> */}
    </div>
  )
  }

}
export default withRouter(App);
