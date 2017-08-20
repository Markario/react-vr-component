import React, { Component } from 'react';
import { EventEmitter } from 'fbemitter';
import loadScript from 'load-script';

const emitter = new EventEmitter();

class ReactVR extends Component {
	constructor(props){
		super(props);
		this.vrContainer = null;
		this.state = {
      clientBundleLoading: false,
      clientBundleLoaded: false,
      clientBundleLoadingError: null,
      clientBundleSrc: null,
      vrContainerMounted: false,
      reactVRWindowName: props.reactVRWindowName || "ReactVR"
		}
    this.handleMount = this.handleMount.bind(this);
    this.handleUnmount = this.handleUnmount.bind(this);
	}

  handleMount(){
    // react-vr module's component has mounted and we can send messages now
    this.setState({
      vrContainerMounted: true
    });
    emitter.emit('state', this.props);
  }

  handleUnmount(){
    // react-vr module's component has unmounted
  }

  render() {
    if(this.vrContainer && this.state.clientBundleLoaded && !this.state.vrContainerMounted){
      //initialize react-vr module into vrContainer div
      //once the initialization takes places in the react-vr module
      //the react-vr module's component will mount, subsequently this.'handleMount' will be called
      window[this.state.reactVRWindowName].init(this.props.indexBundlePath, this.vrContainer, { 
        assetRoot: this.props.assetRootPath, 
        reactConnector: emitter, 
        state: this.props,
        onMount: this.handleMount,
        onUnmount: this.handleUnmount,
        //TODO in future, can the react-vr module send other messages back?
      });
    }

    return (
      <div className="vr-container" ref={(el) => { this.vrContainer = el }}/>
    );
  }

  componentDidUpdate(prevProps, prevState){
    //send our props to the react-vr module's component
    emitter.emit('state', this.props);
  }

  componentDidMount(){
    let self = this;
    if(!window[this.state.reactVRWindowName] && !this.state.clientBundleLoading){
      loadScript(this.props.clientBundlePath, function (err, script) {
        if (err) {
          self.setState({
            clientBundleLoading: false,
            clientBundleLoaded: false,
            clientBundleLoadingError: err
          });
        } else {
          self.setState({
            clientBundleLoaded: true,
            clientBundleSrc: script.src
          });
        }
      });
      this.setState({clientBundleLoading: true});
    }else if(window[this.state.reactVRWindowName] && !this.state.clientBundleLoaded){
      // console.log("clientBundle already loaded");
      self.setState({
        clientBundleLoaded: true
      });
    }
  }
}

export default ReactVR;