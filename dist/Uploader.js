/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","./Button","./Icon","./Progress","./Link","./Validity","./InputComponent","./common/util/cxBuilder","./babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("./Button"),require("./Icon"),require("./Progress"),require("./Link"),require("./Validity"),require("./InputComponent"),require("./common/util/cxBuilder"),require("./babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.Button,e.Icon,e.Progress,e.Link,e.Validity,e.InputComponent,e.cxBuilder,e.babelHelpers),e.Uploader=r.exports}}(this,function(exports,e,t,r,o,i,n,a,s,l){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var u=l.interopRequireDefault(e),p=l.interopRequireDefault(t),d=l.interopRequireDefault(r),c=l.interopRequireDefault(o),f=l.interopRequireDefault(i),h=l.interopRequireDefault(n),m=l.interopRequireDefault(a),y=s.create("Uploader"),b=function(e){function t(r,o){l.classCallCheck(this,t);var i=l.possibleConstructorReturn(this,e.call(this,r,o));return i.state=l["extends"]({},i.state,{isUploading:!1,isUploaded:!!i.props.value}),i}return l.inherits(t,e),t.prototype.onFileChange=function(e){var t=this;this.setUploading(),this.props.upload({target:this,files:e.target.files}).then(function(e){return t.setFile(e)},function(e){return t.clearFile()})},t.prototype.setUploading=function(){this.setState({isUploading:!0})},t.prototype.setFile=function(t){var r=this;this.setState({value:t,isUploaded:!0,isUploading:!1},function(){e.prototype.onChange.call(r,{type:"change",target:r,value:t})})},t.prototype.clearFile=function(){var t=this;this.setState({rawValue:"",isUploaded:!1,isUploading:!1},function(){e.prototype.onChange.call(t,{type:"change",target:t,value:""})})},t.prototype.renderUploadFile=function(){var e=this,t=this.state,r=t.isUploading,o=t.isUploaded;return r||o?null:u["default"].createElement("input",{ref:"file",type:"file",className:y().part("file").build(),onChange:function(t){e.onFileChange(t)},accept:this.props.accept})},t.prototype.renderUploadButton=function(){var e=this,t=this.state,r=t.isUploading,o=t.isUploaded,i=t.value,n=this.props.size;if(r)return u["default"].createElement(c["default"],{size:n,mode:"indeterminate",shape:"circle"});if(o)return u["default"].createElement("div",{className:y().part("uploaded").build()},u["default"].createElement(d["default"],{icon:"done",size:n})," 已上传",u["default"].createElement(f["default"],{size:n,href:i,variants:["button"],target:"_blank"},"查看"),u["default"].createElement(p["default"],{size:n,type:"button",onClick:function(){e.clearFile()}},"重选"));else return u["default"].createElement(p["default"],{type:"button",variants:["raised"],onClick:function(){e.refs.file.click()}},u["default"].createElement(d["default"],{icon:"file-upload"}),"点击上传")},t.prototype.render=function(){var e=this.props,t=e.value,r=e.name;return u["default"].createElement("div",{className:y(e).addStates(this.getStyleStates()).build()},u["default"].createElement("input",{name:r,type:"hidden",value:t}),this.renderUploadFile(),this.renderUploadButton(),u["default"].createElement(h["default"],{validity:this.state.validity}))},t}(m["default"]);exports["default"]=b,b.displayName="Uploader",b.propTypes={multiple:e.PropTypes.bool,accept:e.PropTypes.string,files:e.PropTypes.array,upload:e.PropTypes.func.isRequired},b.defaultProps=l["extends"]({},m["default"].defaultProps,{validateEvents:["change"]})});