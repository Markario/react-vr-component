# react-vr-component

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.com/package/react-vr-component

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo


## Usage

Must be used in conjunction with: TODO add other repo link here

### Props

* reactVRWindowName: e.g. window.ReactVR. defaults to "ReactVR"
* clientBundlePath: path to load client.bundle.js; loaded asynchronously and added as script.
* indexBundlePath: path to load index.bundle.js; passed to ReactVR.init.
* assetRootPath: root path for assets to load; passed to ReactVR.init.
* any other props will be passed down to the react-vr component loaded

### Example 

```
<ReactVR 
  reactVRWindowName={'ReactVR'}
  clientBundlePath={'/vr/client.bundle.js?platform=vr'}
  indexBundlePath={'vr/index.bundle.js?platform=vr&devtools'}
  assetRootPath={'/vr/static_assets/'}
  somePropName={this.state.something} 
  user={this.props.user} 
  camera={this.state.camera}
/>
```
