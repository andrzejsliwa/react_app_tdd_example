import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';
import {
  Route,
  Link
} from 'react-router-dom'

import './App.css';

export const runRefresh = () => {
  return (dispatch) => {
    axios.get('/api/auth/refresh')
      .then(() => {
        //debug.log(dispatch)
        dispatch({type: 'RESET'})
      })
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

export const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
      <li><Link to={`${match.url}/components`}>Components</Link></li>
      <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: "empty" }
  }

  componentWillMount() {
    this.props.runRefresh().then((resp) => {
      //debug.log("resp", resp)
      this.setState({message: resp.data})
    })
  }

  render() {
    return (
      <div>
        <div id="some">{this.state.message}</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(runRefresh, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(App);
