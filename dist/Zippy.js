/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","react-motion","./common/util/cxBuilder","./babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("react-motion"),require("./common/util/cxBuilder"),require("./babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.reactMotion,e.cxBuilder,e.babelHelpers),e.Zippy=r.exports}}(this,function(exports,e,t,r,o){"use strict";function i(e,t){var r;return r={},r[e?"overflowX":"overflowY"]="hidden",r[e?"width":"height"]=Math.round(t),r}Object.defineProperty(exports,"__esModule",{value:!0});var n=o.interopRequireDefault(e),a=r.create("Zippy"),s=function(e){function r(){return o.classCallCheck(this,r),o.possibleConstructorReturn(this,e.apply(this,arguments))}return o.inherits(r,e),r.prototype.render=function(){var e=this.props,r=e.expand,s=e.size,l=e.children,u=e.horizontal,p=(e.value,e.style),d=o.objectWithoutProperties(e,["expand","size","children","horizontal","value","style"]),c=a(e).addStates({expand:r}).build();return n["default"].createElement(t.Motion,{style:{value:t.spring(r?s:0,{stiffness:60,damping:15})}},function(e){var t=e.value;return n["default"].createElement("div",o["extends"]({},d,{className:c,style:o["extends"]({},p,i(u,t))}),l)})},r}(n["default"].Component);exports["default"]=s,s.displayName="Zippy",s.propTypes={size:e.PropTypes.number.isRequired,horizontal:e.PropTypes.bool,expand:e.PropTypes.bool},s.defaultProps={horizontal:!1,expand:!1}});