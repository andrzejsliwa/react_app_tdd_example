import React from 'react';
import App, {Topics, runRefresh} from './App';
import {mountWithState} from '../test/helpers'
import {push} from 'connected-react-router'
import axios from 'axios'

describe('App', () => {

  it('calls refresh on component mount', () => {
    const runRefresh = sinon
      .stub()
      .resolves({data: "message"})
    const {wrapper, store} = mountWithState(
      <App runRefresh={runRefresh}/>, {})
    expect(runRefresh.callCount)
      .to
      .equal(1);
  })

  it('renders message', async() => {
    const runRefresh = sinon
      .stub()
      .resolves({data: 'message'})
    const {wrapper, store} = await mountWithState(
      <App runRefresh={runRefresh}/>, {})
    await wrapper.update()
    expect(wrapper.html())
      .to
      .contain('message')
  })

  it('renders topics for /topics routing', () => {
    const runRefresh = sinon
      .stub()
      .resolves({data: "message"})
    const {wrapper, store} = mountWithState(
      <App runRefresh={runRefresh}/>, {})
    store.dispatch(push('/topics'))
    expect(wrapper.html())
      .to
      .contain('<h2>Topics</h2>')
  })

  it('calls axios and dispatch action', async() => {
    sinon
      .stub(axios, 'get')
      .resolves()
    var dispatch = sinon.spy()
    // debug.log(dispatch) example of debugging
    await runRefresh()(dispatch)

    expect(dispatch.getCall(0).args[0])
      .to
      .deep
      .equal({type: 'RESET'})
    expect(axios.get.calledWith('/api/auth/refresh')).to.be.true
    expect(axios.get.callCount)
      .to
      .equal(1);
    axios
      .get
      .restore()
  })
})
