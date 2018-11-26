!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var a in n)("object"==typeof exports?exports:e)[a]=n[a]}}(window,function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
function(e,t,n){"use strict";var a=n(/*! @babel/runtime/helpers/interopRequireDefault */1);Object.defineProperty(t,"__esModule",{value:!0}),t.setSpace=function(e){d=e},t.setHash=function(e){h=e},t.Routers=function(e){var t=l.default.useReducer(m,{state:y.state,stateMap:y.stateMap}),n=(0,u.default)(t,2),a=n[0],r=n[1];b||(b=!0,y.push=r);return l.default.useCallback(l.default.createElement(f.Provider,(0,o.default)({},e,{value:a})),[a])},t.Route=function(e){var t=e.style,n=(0,r.default)(e,["style"]),a=l.default.useState(0),i=(0,u.default)(a,2),s=i[0],p=i[1],c=(l.default.useContext(f),y.isPathAtTop(e.path));return l.default.useEffect(function(){c&&!s?p(s+1):y.isPathInStateMap(e.path)||(e.delayRemove?setTimeout(function(){p(0)},e.delayRemove):p(0))},[c]),l.default.useMemo(function(){return s?l.default.createElement(v,(0,o.default)({isDisplay:c,style:t},n)):null},[s,c])},t.setContainer=function(e){v=e},t.history=void 0;var r=a(n(/*! @babel/runtime/helpers/objectWithoutProperties */2)),o=a(n(/*! @babel/runtime/helpers/extends */3)),u=a(n(/*! @babel/runtime/helpers/slicedToArray */4)),i=a(n(/*! @babel/runtime/helpers/defineProperty */5)),s=a(n(/*! @babel/runtime/helpers/objectSpread */6)),l=a(n(/*! react */7)),f=l.default.createContext(),p="undefined"!=typeof window,c={path:void 0,lastPath:void 0,params:{},needRemvoe:!1,animate:!0,isDoingGoback:!1},d="&&";var h="";var v,b=!1,y={useContext:function(){return l.default.useContext(f)},push:function(e){m(y,e)},setDefaultPath:function(e,t){p&&(t||"/"===window.location.pathname)&&y.push(e)},canGoback:function(e){return!!(e=e||y.state.lastPath)&&y.stateMap[e]},isPathAtTop:function(e,t){var n=t||y.state.path;if(!n)return!1;if(n.indexOf(d)>-1){for(var a=n.split(d),r=0;r<a.length;r++)if(e===a[r])return!0;return!1}return n===e},isPathInStateMap:function(e){for(var t in y.stateMap)for(var n=t.split(d),a=0;a<n.length;a++)if(e===n[a])return!0;return!1},goback:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=e||y.state.lastPath;if(y.canGoback(n)){y.state.needRemvoe=t;var a=(0,s.default)({},y.state);!function e(t,r){if(t.needRemvoe&&r[t.path]&&delete r[t.path],t.lastPath){var o=r[t.lastPath];o&&o.path!==n&&e(o,r),a=o}else a=t}(a,y.stateMap),a.isDoingGoback=!0,y.push(a)}else console.error("[Error-Route] is can't goback")},state:(0,s.default)({},c,{path:"/"}),stateMap:{"/":(0,s.default)({},c,{path:"/"})}};function m(e,t){if((t="string"==typeof t?(0,s.default)({},c,{path:t}):(0,s.default)({},c,t)).path){t.isDoingGoback||(t.lastPath=y.state.path);var n=(0,s.default)({},t);e={stateMap:(0,s.default)({},y.stateMap,(0,i.default)({},t.path,n)),state:n}}return y.state=(0,s.default)({},e.state),y.stateMap=(0,s.default)({},e.stateMap),p&&window.history.pushState({},document.title,h+e.state.path),console.log(e),e}if(t.history=y,v=p?function(e){e.path;var t=e.isDisplay,n=e.style,a=(0,r.default)(e,["path","isDisplay","style"]);return l.default.createElement("div",(0,o.default)({style:(0,s.default)({display:t?"inline":"none",pointEvents:t?"auto":"none"},n)},a))}:function(){throw new Error("\n      [".concat("memo-router","] If not in Browser, You need set default containner:\n      setContainner(({isDisplay, ...rest})=>{\n        return <YourComponent isShowComponent={isDisplay} {...rest} ...\n      })\n    "))},p&&"/"!==window.location.pathname){var x=window.location.search,P=window.location.pathname,w={};if(0===x.indexOf("?"))for(var M=x.split("?")[1].split("&"),g=0;g<M.length;g++){var j=M[g].split("="),S=(0,u.default)(j,2),D=S[0],O=S[1];w[D]=O}y.push({path:P,params:w})}},
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/interopRequireDefault" ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
function(e,t){e.exports=require("@babel/runtime/helpers/interopRequireDefault")},
/*!*****************************************************************!*\
  !*** external "@babel/runtime/helpers/objectWithoutProperties" ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
function(e,t){e.exports=require("@babel/runtime/helpers/objectWithoutProperties")},
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
function(e,t){e.exports=require("@babel/runtime/helpers/extends")},
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
function(e,t){e.exports=require("@babel/runtime/helpers/slicedToArray")},
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
function(e,t){e.exports=require("@babel/runtime/helpers/defineProperty")},
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/objectSpread" ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
function(e,t){e.exports=require("@babel/runtime/helpers/objectSpread")},
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
function(e,t){e.exports=require("react")}])});
//# sourceMappingURL=index.js.map