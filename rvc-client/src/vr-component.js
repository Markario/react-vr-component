import React from 'react';
import RCTDeviceEventEmitter  from 'RCTDeviceEventEmitter'

export default class VRComponent extends React.Component {
	constructor(props){
    super(props);

    this.handleNewState = this.handleNewState.bind(this);
    this.ReactClient = NativeModules.ReactClient;
    this.ReactClientToken = null;
    this.state = {};
  }

  handleNewState(state){
    console.log("New State in client_vr", state);
    let newState = Object.assign({}, this.state, state);
    this.setState(newState);
  }

  componentDidMount(){
    this.ReactClientToken = RCTDeviceEventEmitter.addListener('state', this.handleNewState);
    this.ReactClient.mounted();
  }

  componentWillUnmount() {
    this.ReactClientToken.remove();
    this.ReactClient.unmounted();
  }
}