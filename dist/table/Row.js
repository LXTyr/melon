/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","../common/util/cxBuilder","./Cell","../babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("../common/util/cxBuilder"),require("./Cell"),require("../babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.cxBuilder,e.Cell,e.babelHelpers),e.Row=r.exports}}(this,function(exports,e,t,r,i){"use strict";function n(e,t,r){var i=e.part,n=e.data,o=e.height,l=e.rowIndex,u=t.width,p=t.align,c=t.dataKey,d=t.cellRenderer,f="header"===i||"footer"===i?t[i]:n[c];return a["default"].createElement(s["default"],{part:i,height:o,width:u,align:p,key:c||i,rowIndex:l,columnIndex:r,columnData:t,rowData:n,cellKey:c,cellData:f,cellRenderer:d})}function o(e){var t=e.columns,r=e.tableWidth,o=i.objectWithoutProperties(e,["columns","tableWidth"]);return a["default"].createElement("div",i["extends"]({},o,{className:l(e).build(),style:{width:r?r-2:null}}),t.map(function(t,r){return n(e,t.props,r)}))}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=o;var a=i.interopRequireDefault(e),s=i.interopRequireDefault(r),l=t.create("TableRow");o.displayName="TableRow",o.propTypes={index:e.PropTypes.number,part:e.PropTypes.oneOf(["header","footer","body"]).isRequired,data:e.PropTypes.oneOfType([e.PropTypes.object,e.PropTypes.array]),height:e.PropTypes.number.isRequired}});