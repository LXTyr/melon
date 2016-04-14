/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","./Icon","./common/util/cxBuilder","./common/util/array","./babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("./Icon"),require("./common/util/cxBuilder"),require("./common/util/array"),require("./babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.Icon,e.cxBuilder,e.array,e.babelHelpers),e.Pager=r.exports}}(this,function(exports,e,t,r,o,i){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var n=i.interopRequireDefault(e),a=i.interopRequireDefault(t),l=r.create("Pager"),s=function(e){function t(r){i.classCallCheck(this,t);var o=i.possibleConstructorReturn(this,e.call(this,r)),n=r.page,a=void 0===n?0:n;return o.state={page:a},o.onMainClick=o.onMainClick.bind(o),o}return i.inherits(t,e),t.prototype.onMainClick=function(e){var t=this,r=e.currentTarget,o=e.target;if(e.preventDefault(),e.stopPropagation)e.stopPropagation();else e.cancelBubble=!0;for(var i=o.getAttribute("data-role");"pager-item"!==i&&o!==r;)o=o.parentNode,i=o.getAttribute("data-role");if(o!==r){var n=this.props,a=n.first,l=n.onChange,s=+o.getAttribute("data-page")+a;if(o=null,this.state.page!==s)this.setState({page:s},l?function(){return l({target:t,page:s})}:null)}},t.prototype.range=function(e,t,r,i){return t-i>e+r?[].concat(o.range(e,e+r),[-e-r],o.range(t-i,t)):o.range(e,t)},t.prototype.renderItem=function(e){var r=e.page,o=e.part,i=e.states,s=this.props,p=s.lang,u=s.useLang,d=l().part("item").addStates(i).build(),c=void 0;if(!u&&o)c=n["default"].createElement(a["default"],{icon:t.ICONS[o]});else c=p[o]||r+1;return n["default"].createElement("li",{className:d,key:o+r,"data-role":"pager-item","data-page":r},n["default"].createElement("a",{href:"#"},c))},t.prototype.render=function(){var e=this,t=this.props,r=this.state,o=t.total,a=t.first,s=t.padding,p=t.showCount,u=t.useLang,d=(t.lang,t.showAlways,i.objectWithoutProperties(t,["total","first","padding","showCount","useLang","lang","showAlways"])),c=r.page;p=p>o?o:p,c-=a;var f=Math.floor(p/2),y=s,h=s,m=c-f,b=f,v=f;if(0>m)b+=m,v-=m;var g=c+f+1-o;if(g>0)b+=g,v-=g;var x=this.range(0,c,y,b),C=this.range(c+1,o,v,h),P=[{page:Math.max(c-1,0),states:{prev:!0,disabled:0===c},part:"prev"}].concat(x).concat({page:c,states:{current:!0},part:""}).concat(C).concat({page:Math.min(c+1,o-1),states:{next:!0,disabled:c>=o-1},part:"next"}).map(function(t){if("number"==typeof t){var r=t>=0?"":"ellipsis";t={page:Math.abs(t),states:{ellipsis:!!r},part:r}}return e.renderItem(t)});return n["default"].createElement("ul",i["extends"]({},d,{className:l(t).addVariants(u?"lang":null).build(),onClick:this.onMainClick}),P)},t}(e.Component);exports["default"]=s,s.displayName="Pager",s.defaultProps={page:0,first:0,padding:1,showAlways:!1,showCount:5,total:0,disabled:!1,useLang:!1,lang:{prev:"上一页",next:"下一页",ellipsis:"..."}},s.propTypes={disabled:e.PropTypes.bool,type:e.PropTypes.string,page:e.PropTypes.number,first:e.PropTypes.number,padding:e.PropTypes.number,showAlways:e.PropTypes.bool,showCount:e.PropTypes.number,total:e.PropTypes.number,useLang:e.PropTypes.bool,lang:e.PropTypes.shape({prev:e.PropTypes.string,ellipsis:e.PropTypes.string,next:e.PropTypes.string})},s.ICONS={prev:"navigate-before",next:"navigate-next",ellipsis:"keyboard-control"}});