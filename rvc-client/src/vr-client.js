import { Module } from 'react-vr-web';
import type { ReactNativeContext } from 'react-vr'

export default class VRClient extends Module {
  constructor() {
    super('VRClient');
    this.emitter = null;
    this.onMount = null;
    this.onUnmount = null;
    this.token = null;
    this.handleEmit = this.handleEmit.bind(this);
  }
  _setContext(rnctx){
    this._rnctx = rnctx;
    console.log("context", this._rnctx);
  }
  init(emitter, onMount, onUnmount) {
    this.emitter = emitter;
    this.onMount = onMount;
    this.onUnmount = onUnmount;
    if(this.emitter)
      this.token = this.emitter.addListener('state', this.handleEmit);
  }
  handleEmit(...args){
    this._rnctx.callFunction("RCTDeviceEventEmitter", "emit", ['state', ...args]);
  }
  mounted(){
    if(this.onMount)
      this.onMount();
  }
  unmounted(){
    if(this.onUnmount)
      this.onUnmount();
  }
  remove(){
    this.token.remove();
  }
}