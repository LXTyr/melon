/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","react-dom","./Icon","./select/SeparatePopup","./Validity","./InputComponent","./select/OptionGroup","./select/Option","./common/util/cxBuilder","./babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("react-dom"),require("./Icon"),require("./select/SeparatePopup"),require("./Validity"),require("./InputComponent"),require("./select/OptionGroup"),require("./select/Option"),require("./common/util/cxBuilder"),require("./babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.reactDom,e.Icon,e.SeparatePopup,e.Validity,e.InputComponent,e.OptionGroup,e.Option,e.cxBuilder,e.babelHelpers),e.Select=r.exports}}(this,function(exports,e,t,r,i,o,n,a,s,l,p){"use strict";function u(e){return e.map(function(e,t){return d["default"].createElement("option",{key:t,disabled:e.disabled,value:e.value,label:e.name})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createOptions=u;var d=p.interopRequireDefault(e),c=p.interopRequireDefault(t),f=p.interopRequireDefault(r),h=p.interopRequireDefault(i),m=p.interopRequireDefault(o),y=p.interopRequireDefault(n),b=p.interopRequireDefault(a),v=p.interopRequireDefault(s),g=l.create("Select"),x=function(t){function r(e,i){p.classCallCheck(this,r);var o=p.possibleConstructorReturn(this,t.call(this,e,i));return o.state=p["extends"]({},o.state,{open:!1}),o.onClick=o.onClick.bind(o),o.onClickOption=o.onClickOption.bind(o),o.onPopupHide=o.onPopupHide.bind(o),o}return p.inherits(r,t),r.prototype.componentDidMount=function(){t.prototype.componentDidMount.call(this);var r=this.container=document.createElement("div");r.className=g().part("popup").build(),document.body.appendChild(r),this.popup=c["default"].render(d["default"].createElement(h["default"],{target:c["default"].findDOMNode(this),open:!1,onHide:this.onPopupHide},e.Children.map(this.props.children,this.renderItem,this)),r)},r.prototype.componentWillReceiveProps=function(r){var i=r.children;if(i!==this.props.children)this.popup=c["default"].render(d["default"].createElement(h["default"],{target:c["default"].findDOMNode(this),open:this.state.open,onHide:this.onPopupHide},e.Children.map(i,this.renderItem,this)),this.container);t.prototype.componentWillReceiveProps.call(this,r)},r.prototype.componentWillUnmount=function(){var e=this.container;if(e)c["default"].unmountComponentAtNode(e),e.parentElement.removeChild(e),this.container=e=null},r.prototype.showOptions=function(){var t=this;this.setState({open:!0},function(){c["default"].render(d["default"].createElement(h["default"],{target:c["default"].findDOMNode(t),open:!0,onHide:t.onPopupHide},e.Children.map(t.props.children,t.renderItem,t)),t.container)})},r.prototype.hideOptions=function(){var t=this;this.setState({open:!1},function(){c["default"].render(d["default"].createElement(h["default"],{target:c["default"].findDOMNode(t),open:!1,onHide:t.onPopupHide},e.Children.map(t.props.children,t.renderItem,t)),t.container)})},r.prototype.onClick=function(){if(this.isOpen())this.hideOptions();else this.showOptions()},r.prototype.onClickOption=function(e){var r=e.value;this.hideOptions(),t.prototype.onChange.call(this,{type:"change",target:this,value:r})},r.prototype.onPopupHide=function(e){this.hideOptions()},r.prototype.renderItem=function(e,t){if(!e)return null;if("option"===e.type)return d["default"].createElement(v["default"],p["extends"]({},e.props,{onClick:this.onClickOption,key:t}));if("optgroup"===e.type)return d["default"].createElement(b["default"],p["extends"]({},e.props,{onClick:this.onClickOption,key:t}));else return null},r.prototype.renderHiddenInput=function(){var e=this.props,t=e.name,r=e.value;return t?d["default"].createElement("input",{name:t,type:"hidden",value:r}):null},r.prototype.renderLabel=function(){var e=this.state.value,t=this.props,r=t.children,i=t.placeholder,o=this.findOption(e,r),n=o?o.props.label||o.props.children:d["default"].createElement("span",{className:g().part("label-placeholder").build()},i);return d["default"].createElement("label",{className:g().part("label").build()},n)},r.prototype.findOption=function(t,r){if(r=e.Children.toArray(r),!r)return null;for(var i=0,o=r.length;o>i;++i){var n=r[i];if("optgroup"!==n.type){if(n.props.value===t)return n}else{var a=this.findOption(t,n.props.children);if(a)return a}}return null},r.prototype.renderIcon=function(){return d["default"].createElement(f["default"],{icon:"expand-more"})},r.prototype.isOpen=function(){return this.state.open},r.prototype.render=function(){return d["default"].createElement("div",{onClick:this.onClick,className:g(this.props).addStates(this.getStyleStates()).build()},this.renderLabel(),this.renderHiddenInput(),this.renderIcon(),d["default"].createElement(m["default"],{validity:this.state.validity}))},r}(y["default"]);exports["default"]=x,x.displayName="Select",x.defaultProps=p["extends"]({},y["default"].defaultProps,{validateEvents:["change"],placeholder:"请选择",open:!1,defaultValue:""}),x.propTypes=p["extends"]({},y["default"].propTypes,{placeholder:e.PropTypes.string,children:e.PropTypes.node.isRequired}),x.createOptions=u});