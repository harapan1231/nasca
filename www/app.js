/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);
module.exports.default = module.exports;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var options_1 = __webpack_require__(3);
var VNodes_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(8);
var mounting_1 = __webpack_require__(9);
var unmounting_1 = __webpack_require__(10);
// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
exports.EMPTY_OBJ = {};
if (process.env.NODE_ENV !== 'production') {
    Object.freeze(exports.EMPTY_OBJ);
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    if (inferno_shared_1.isUndefined(context)) {
        context = exports.EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    vNode.children = instance;
    instance._blockSetState = false;
    instance.context = context;
    if (instance.props === exports.EMPTY_OBJ) {
        instance.props = props;
    }
    // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
    instance._lifecycle = lifecycle;
    instance._unmounted = false;
    instance._pendingSetState = true;
    instance._isSVG = isSVG;
    if (!inferno_shared_1.isUndefined(instance.componentWillMount)) {
        instance._blockRender = true;
        instance.componentWillMount();
        instance._blockRender = false;
    }
    var childContext;
    if (!inferno_shared_1.isUndefined(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (inferno_shared_1.isNullOrUndef(childContext)) {
        instance._childContext = context;
    }
    else {
        instance._childContext = inferno_shared_1.combineFrom(context, childContext);
    }
    if (!inferno_shared_1.isNull(options_1.options.beforeRender)) {
        options_1.options.beforeRender(instance);
    }
    var input = instance.render(props, instance.state, context);
    if (!inferno_shared_1.isNull(options_1.options.afterRender)) {
        options_1.options.afterRender(instance);
    }
    if (inferno_shared_1.isArray(input)) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        inferno_shared_1.throwError();
    }
    else if (inferno_shared_1.isInvalid(input)) {
        input = VNodes_1.createVoidVNode();
    }
    else if (inferno_shared_1.isStringOrNumber(input)) {
        input = VNodes_1.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes_1.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    instance._pendingSetState = false;
    instance._lastInput = input;
    return instance;
}
exports.createClassComponentInstance = createClassComponentInstance;
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mounting_1.mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
exports.replaceLastChildAndUnmount = replaceLastChildAndUnmount;
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmounting_1.unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
exports.replaceVNode = replaceVNode;
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (inferno_shared_1.isArray(input)) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        inferno_shared_1.throwError();
    }
    else if (inferno_shared_1.isInvalid(input)) {
        input = VNodes_1.createVoidVNode();
    }
    else if (inferno_shared_1.isStringOrNumber(input)) {
        input = VNodes_1.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes_1.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    return input;
}
exports.createFunctionalComponentInput = createFunctionalComponentInput;
function setTextContent(dom, text) {
    if (text !== '') {
        dom.textContent = text;
    }
    else {
        dom.appendChild(document.createTextNode(''));
    }
}
exports.setTextContent = setTextContent;
function updateTextContent(dom, text) {
    dom.firstChild.nodeValue = text;
}
exports.updateTextContent = updateTextContent;
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
exports.appendChild = appendChild;
function insertOrAppend(parentDom, newNode, nextNode) {
    if (inferno_shared_1.isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
exports.insertOrAppend = insertOrAppend;
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(constants_1.svgNS, tag);
    }
    else {
        return document.createElement(tag);
    }
}
exports.documentCreateElement = documentCreateElement;
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmounting_1.unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mounting_1.mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
exports.replaceWithNewNode = replaceWithNewNode;
function replaceChild(parentDom, nextDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(nextDom, lastDom);
}
exports.replaceChild = replaceChild;
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
exports.removeChild = removeChild;
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    dom.textContent = '';
    if (!options_1.options.recyclingEnabled || (options_1.options.recyclingEnabled && !isRecycling)) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
}
exports.removeAllChildren = removeAllChildren;
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!inferno_shared_1.isInvalid(child)) {
            unmounting_1.unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
exports.removeChildren = removeChildren;
function isKeyed(lastChildren, nextChildren) {
    return nextChildren.length > 0 && !inferno_shared_1.isNullOrUndef(nextChildren[0]) && !inferno_shared_1.isNullOrUndef(nextChildren[0].key)
        && lastChildren.length > 0 && !inferno_shared_1.isNullOrUndef(lastChildren[0]) && !inferno_shared_1.isNullOrUndef(lastChildren[0].key);
}
exports.isKeyed = isKeyed;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.options = {
    afterMount: null,
    afterRender: null,
    afterUpdate: null,
    beforeRender: null,
    beforeUnmount: null,
    createVNode: null,
    findDOMNodeEnabled: false,
    recyclingEnabled: false,
    roots: []
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(1);
var normalization_1 = __webpack_require__(14);
var options_1 = __webpack_require__(3);
function VNode(children, className, flags, key, props, ref, type) {
    this.children = children;
    this.className = className;
    this.dom = null;
    this.flags = flags;
    this.key = key;
    this.props = props;
    this.ref = ref;
    this.type = type;
}
/**
 * Creates virtual node
 * @param {number} flags
 * @param {string|Function|null} type
 * @param {string|null=} className
 * @param {object=} children
 * @param {object=} props
 * @param {*=} key
 * @param {object|Function=} ref
 * @param {boolean=} noNormalise
 * @returns {VNode} returns new virtual node
 */
function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
        flags = inferno_shared_1.isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
    }
    var vNode = new VNode(children === void 0 ? null : children, className === void 0 ? null : className, flags, key === void 0 ? null : key, props === void 0 ? null : props, ref === void 0 ? null : ref, type);
    if (noNormalise !== true) {
        normalization_1.normalize(vNode);
    }
    if (options_1.options.createVNode !== null) {
        options_1.options.createVNode(vNode);
    }
    return vNode;
}
exports.createVNode = createVNode;
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (inferno_shared_1.isNull(propsToClone)) {
            props = utils_1.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, null, null, props, vNodeToClone.key, vNodeToClone.ref, true);
        var newProps = newVNode.props;
        var newChildren = newProps.children;
        // we need to also clone component children that are in props
        // as the children may also have been hoisted
        if (newChildren) {
            if (inferno_shared_1.isArray(newChildren)) {
                var len = newChildren.length;
                if (len > 0) {
                    var tmpArray = [];
                    for (var i = 0; i < len; i++) {
                        var child = newChildren[i];
                        if (inferno_shared_1.isStringOrNumber(child)) {
                            tmpArray.push(child);
                        }
                        else if (!inferno_shared_1.isInvalid(child) && isVNode(child)) {
                            tmpArray.push(directClone(child));
                        }
                    }
                    newProps.children = tmpArray;
                }
            }
            else if (isVNode(newChildren)) {
                newProps.children = directClone(newChildren);
            }
        }
        newVNode.children = null;
    }
    else if (flags & 3970 /* Element */) {
        var children = vNodeToClone.children;
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (propsToClone === null) {
            props = utils_1.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props, vNodeToClone.key, vNodeToClone.ref, !children);
    }
    else if (flags & 1 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    return newVNode;
}
exports.directClone = directClone;
/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
 */
/**
 * Clones given virtual node by creating new instance of it
 * @param {VNode} vNodeToClone virtual node to be cloned
 * @param {Props=} props additional props for new virtual node
 * @param {...*} _children new children for new virtual node
 * @returns {VNode} new virtual node
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !inferno_shared_1.isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!inferno_shared_1.isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (inferno_shared_1.isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    }
    else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className || (props && props.className);
        var key = !inferno_shared_1.isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : (props ? props.key : null);
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
            newVNode = createVNode(flags, vNodeToClone.type, className, null, (!vNodeToClone.props && !props) ? utils_1.EMPTY_OBJ : inferno_shared_1.combineFrom(vNodeToClone.props, props), key, ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (inferno_shared_1.isArray(newChildren)) {
                        var len = newChildren.length;
                        if (len > 0) {
                            var tmpArray = [];
                            for (var i = 0; i < len; i++) {
                                var child = newChildren[i];
                                if (inferno_shared_1.isStringOrNumber(child)) {
                                    tmpArray.push(child);
                                }
                                else if (!inferno_shared_1.isInvalid(child) && isVNode(child)) {
                                    tmpArray.push(directClone(child));
                                }
                            }
                            newProps.children = tmpArray;
                        }
                    }
                    else if (isVNode(newChildren)) {
                        newProps.children = directClone(newChildren);
                    }
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            children = (props && !inferno_shared_1.isUndefined(props.children)) ? props.children : vNodeToClone.children;
            newVNode = createVNode(flags, vNodeToClone.type, className, children, (!vNodeToClone.props && !props) ? utils_1.EMPTY_OBJ : inferno_shared_1.combineFrom(vNodeToClone.props, props), key, ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, key);
        }
    }
    return newVNode;
}
exports.cloneVNode = cloneVNode;
function createVoidVNode() {
    return createVNode(4096 /* Void */, null);
}
exports.createVoidVNode = createVoidVNode;
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
exports.createTextVNode = createTextVNode;
function isVNode(o) {
    return !!o.flags;
}
exports.isVNode = isVNode;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var options_1 = __webpack_require__(3);
var VNodes_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(8);
var delegation_1 = __webpack_require__(21);
var mounting_1 = __webpack_require__(9);
var rendering_1 = __webpack_require__(6);
var unmounting_1 = __webpack_require__(10);
var utils_1 = __webpack_require__(1);
var processElement_1 = __webpack_require__(11);
function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
            if (lastFlags & 28 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountComponent(nextVNode, null, lifecycle, context, isSVG, (nextFlags & 4 /* ComponentClass */) > 0), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 3970 /* Element */) {
            if (lastFlags & 3970 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 1 /* Text */) {
            if (lastFlags & 1 /* Text */) {
                patchText(lastVNode, nextVNode);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 4096 /* Void */) {
            if (lastFlags & 4096 /* Void */) {
                patchVoid(lastVNode, nextVNode);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else {
            // Error case: mount new one replacing old one
            utils_1.replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
exports.patch = patch;
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (VNodes_1.isVNode(children)) {
        unmounting_1.unmount(children, dom, lifecycle, true, isRecycling);
    }
    else if (inferno_shared_1.isArray(children)) {
        utils_1.removeAllChildren(dom, children, lifecycle, isRecycling);
    }
    else {
        dom.textContent = '';
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        utils_1.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
    }
    else {
        var dom = lastVNode.dom;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        nextVNode.dom = dom;
        isSVG = isSVG || (nextFlags & 128 /* SvgElement */) > 0;
        if (lastChildren !== nextChildren) {
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || utils_1.EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || utils_1.EMPTY_OBJ;
            var hasControlledValue = false;
            if (nextPropsOrEmpty !== utils_1.EMPTY_OBJ) {
                var isFormElement = (nextFlags & 3584 /* FormElement */) > 0;
                if (isFormElement) {
                    hasControlledValue = processElement_1.isControlledFormElement(nextPropsOrEmpty);
                }
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
                if (isFormElement) {
                    // When inferno is recycling form element, we need to process it like it would be mounting
                    processElement_1.processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, isRecycling, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== utils_1.EMPTY_OBJ) {
                for (var prop in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (inferno_shared_1.isNullOrUndef(nextPropsOrEmpty[prop])) {
                        removeProp(prop, lastPropsOrEmpty[prop], dom);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (inferno_shared_1.isNullOrUndef(nextClassName)) {
                dom.removeAttribute('class');
            }
            else {
                if (isSVG) {
                    dom.setAttribute('class', nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mounting_1.mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
exports.patchElement = patchElement;
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
        patchArray = true;
    }
    else if ((lastFlags & 32 /* HasKeyedChildren */) > 0 && (nextFlags & 32 /* HasKeyedChildren */) > 0) {
        patchKeyed = true;
        patchArray = true;
    }
    else if (inferno_shared_1.isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    }
    else if (inferno_shared_1.isInvalid(lastChildren)) {
        if (inferno_shared_1.isStringOrNumber(nextChildren)) {
            utils_1.setTextContent(dom, nextChildren);
        }
        else {
            if (inferno_shared_1.isArray(nextChildren)) {
                mounting_1.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    }
    else if (inferno_shared_1.isStringOrNumber(nextChildren)) {
        if (inferno_shared_1.isStringOrNumber(lastChildren)) {
            utils_1.updateTextContent(dom, nextChildren);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            utils_1.setTextContent(dom, nextChildren);
        }
    }
    else if (inferno_shared_1.isArray(nextChildren)) {
        if (inferno_shared_1.isArray(lastChildren)) {
            patchArray = true;
            if (utils_1.isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting_1.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    else if (inferno_shared_1.isArray(lastChildren)) {
        utils_1.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
    }
    else if (VNodes_1.isVNode(nextChildren)) {
        if (VNodes_1.isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    if (patchArray) {
        if (patchKeyed) {
            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
    var lastType = lastVNode.type;
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastType !== nextType || lastKey !== nextKey) {
        utils_1.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    }
    else {
        var nextProps = nextVNode.props || utils_1.EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            instance._updating = true;
            if (instance._unmounted) {
                if (inferno_shared_1.isNull(parentDom)) {
                    return true;
                }
                utils_1.replaceChild(parentDom, mounting_1.mountComponent(nextVNode, null, lifecycle, context, isSVG, (nextVNode.flags & 4 /* ComponentClass */) > 0), lastVNode.dom);
            }
            else {
                var hasComponentDidUpdate = !inferno_shared_1.isUndefined(instance.componentDidUpdate);
                var nextState = instance.state;
                // When component has componentDidUpdate hook, we need to clone lastState or will be modified by reference during update
                var lastState = hasComponentDidUpdate ? inferno_shared_1.combineFrom(nextState, null) : nextState;
                var lastProps = instance.props;
                var childContext = void 0;
                if (!inferno_shared_1.isUndefined(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                if (inferno_shared_1.isNullOrUndef(childContext)) {
                    childContext = context;
                }
                else {
                    childContext = inferno_shared_1.combineFrom(context, childContext);
                }
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                var didUpdate = true;
                instance._childContext = childContext;
                if (inferno_shared_1.isInvalid(nextInput)) {
                    nextInput = VNodes_1.createVoidVNode();
                }
                else if (nextInput === inferno_shared_1.NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                }
                else if (inferno_shared_1.isStringOrNumber(nextInput)) {
                    nextInput = VNodes_1.createTextVNode(nextInput, null);
                }
                else if (inferno_shared_1.isArray(nextInput)) {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    inferno_shared_1.throwError();
                }
                else if (inferno_shared_1.isObject(nextInput)) {
                    if (!inferno_shared_1.isNull(nextInput.dom)) {
                        nextInput = VNodes_1.directClone(nextInput);
                    }
                }
                if (nextInput.flags & 28 /* Component */) {
                    nextInput.parentVNode = nextVNode;
                }
                else if (lastInput.flags & 28 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
                instance._lastInput = nextInput;
                instance._vNode = nextVNode;
                if (didUpdate) {
                    patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                    if (hasComponentDidUpdate) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    if (!inferno_shared_1.isNull(options_1.options.afterUpdate)) {
                        options_1.options.afterUpdate(nextVNode);
                    }
                    if (options_1.options.findDOMNodeEnabled) {
                        rendering_1.componentToDOMNodeMap.set(instance, nextInput.dom);
                    }
                }
                nextVNode.dom = nextInput.dom;
            }
            instance._updating = false;
        }
        else {
            var shouldUpdate = true;
            var lastProps = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !inferno_shared_1.isNullOrUndef(nextHooks);
            var lastInput = lastVNode.children;
            var nextInput = lastInput;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            }
            else {
                if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps, nextProps);
                }
                nextInput = nextType(nextProps, context);
                if (inferno_shared_1.isInvalid(nextInput)) {
                    nextInput = VNodes_1.createVoidVNode();
                }
                else if (inferno_shared_1.isStringOrNumber(nextInput) && nextInput !== inferno_shared_1.NO_OP) {
                    nextInput = VNodes_1.createTextVNode(nextInput, null);
                }
                else if (inferno_shared_1.isArray(nextInput)) {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    inferno_shared_1.throwError();
                }
                else if (inferno_shared_1.isObject(nextInput)) {
                    if (!inferno_shared_1.isNull(nextInput.dom)) {
                        nextInput = VNodes_1.directClone(nextInput);
                    }
                }
                if (nextInput !== inferno_shared_1.NO_OP) {
                    patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput;
                    if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps, nextProps);
                    }
                    nextVNode.dom = nextInput.dom;
                }
            }
            if (nextInput.flags & 28 /* Component */) {
                nextInput.parentVNode = nextVNode;
            }
            else if (lastInput.flags & 28 /* Component */) {
                lastInput.parentVNode = nextVNode;
            }
        }
    }
    return false;
}
exports.patchComponent = patchComponent;
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
exports.patchText = patchText;
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
exports.patchVoid = patchVoid;
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var lastChildrenLength = lastChildren.length;
    var nextChildrenLength = nextChildren.length;
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = VNodes_1.directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = VNodes_1.directClone(nextChild);
            }
            utils_1.appendChild(dom, mounting_1.mount(nextChild, null, lifecycle, context, isSVG));
        }
    }
    else if (nextChildrenLength === 0) {
        utils_1.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmounting_1.unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
exports.patchNonKeyedChildren = patchNonKeyedChildren;
function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
    var aLength = a.length;
    var bLength = b.length;
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    if (aLength === 0) {
        if (bLength > 0) {
            mounting_1.mountArrayChildren(b, dom, lifecycle, context, isSVG);
        }
        return;
    }
    else if (bLength === 0) {
        utils_1.removeAllChildren(dom, a, lifecycle, isRecycling);
        return;
    }
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
    }
    // Step 1
    /* eslint no-constant-condition: 0 */
    outer: while (true) {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
            }
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
            }
        }
        // Move and sync nodes from right to left.
        if (aEndNode.key === bStartNode.key) {
            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            utils_1.insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
            aEnd--;
            bStart++;
            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
            }
            continue;
        }
        // Move and sync nodes from left to right.
        if (aStartNode.key === bEndNode.key) {
            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            utils_1.insertOrAppend(dom, bEndNode.dom, nextNode);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
            }
            continue;
        }
        break;
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes_1.directClone(node);
                }
                bStart++;
                utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmounting_1.unmount(a[aStart++], dom, lifecycle, false, isRecycling);
        }
    }
    else {
        aLength = aEnd - aStart + 1;
        bLength = bEnd - bStart + 1;
        var sources = new Array(bLength);
        // Mark all nodes as inserted.
        for (i = 0; i < bLength; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if ((bLength <= 4) || (aLength * bLength <= 16)) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = VNodes_1.directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var keyIndex = new Map();
            // Map keys by their index in array
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    j = keyIndex.get(aNode.key);
                    if (!inferno_shared_1.isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = VNodes_1.directClone(bNode);
                        }
                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (aLength === a.length && patched === 0) {
            utils_1.removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLength) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes_1.directClone(node);
                }
                bStart++;
                utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), null);
            }
        }
        else {
            i = aLength - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!inferno_shared_1.isNull(aNode)) {
                    unmounting_1.unmount(aNode, dom, lifecycle, true, isRecycling);
                    i--;
                }
            }
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes_1.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils_1.insertOrAppend(dom, mounting_1.mount(node, dom, lifecycle, context, isSVG), nextNode);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            utils_1.insertOrAppend(dom, node.dom, nextNode);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLength) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes_1.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), nextNode);
                    }
                }
            }
        }
    }
}
exports.patchKeyedChildren = patchKeyedChildren;
// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var p = arr.slice(0);
    var result = [0];
    var i;
    var j;
    var u;
    var v;
    var c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        var arrI = arr[i];
        if (arrI === -1) {
            continue;
        }
        j = result[result.length - 1];
        if (arr[j] < arrI) {
            p[i] = j;
            result.push(i);
            continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
            c = ((u + v) / 2) | 0;
            if (arr[result[c]] < arrI) {
                u = c + 1;
            }
            else {
                v = c;
            }
        }
        if (arrI < arr[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
exports.isAttrAnEvent = isAttrAnEvent;
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (lastValue !== nextValue) {
        if (constants_1.skipProps.has(prop) || (hasControlledValue && prop === 'value')) {
            return;
        }
        else if (constants_1.booleanProps.has(prop)) {
            prop = prop === 'autoFocus' ? prop.toLowerCase() : prop;
            dom[prop] = !!nextValue;
        }
        else if (constants_1.strictProps.has(prop)) {
            var value = inferno_shared_1.isNullOrUndef(nextValue) ? '' : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
        }
        else if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        }
        else if (inferno_shared_1.isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        }
        else if (prop === 'style') {
            patchStyle(lastValue, nextValue, dom);
        }
        else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!inferno_shared_1.isNullOrUndef(nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        }
        else {
            // We optimize for NS being boolean. Its 99.9% time false
            if (isSVG && constants_1.namespaces.has(prop)) {
                // If we end up in this path we can read property again
                dom.setAttributeNS(constants_1.namespaces.get(prop), prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
exports.patchProp = patchProp;
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (constants_1.delegatedEvents.has(name)) {
            delegation_1.handleEvent(name, lastValue, nextValue, dom);
        }
        else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!inferno_shared_1.isFunction(nextValue) && !inferno_shared_1.isNullOrUndef(nextValue)) {
                var linkEvent_1 = nextValue.event;
                if (linkEvent_1 && inferno_shared_1.isFunction(linkEvent_1)) {
                    dom[nameLowerCase] = function (e) {
                        linkEvent_1(nextValue.data, e);
                    };
                }
                else {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent.");
                    }
                    inferno_shared_1.throwError();
                }
            }
            else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
exports.patchEvent = patchEvent;
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    if (inferno_shared_1.isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    for (var style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        var value = nextAttrValue[style];
        if (!inferno_shared_1.isNumber(value) || constants_1.isUnitlessNumber.has(style)) {
            domStyle[style] = value;
        }
        else {
            domStyle[style] = value + 'px';
        }
    }
    if (!inferno_shared_1.isNullOrUndef(lastAttrValue)) {
        for (var style in lastAttrValue) {
            if (inferno_shared_1.isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = '';
            }
        }
    }
}
exports.patchStyle = patchStyle;
function removeProp(prop, lastValue, dom) {
    if (prop === 'value') {
        dom.value = '';
    }
    else if (prop === 'style') {
        dom.removeAttribute('style');
    }
    else if (isAttrAnEvent(prop)) {
        delegation_1.handleEvent(prop, lastValue, null, dom);
    }
    else {
        dom.removeAttribute(prop);
    }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var options_1 = __webpack_require__(3);
var VNodes_1 = __webpack_require__(4);
var hydration_1 = __webpack_require__(23);
var mounting_1 = __webpack_require__(9);
var patching_1 = __webpack_require__(5);
var unmounting_1 = __webpack_require__(10);
var utils_1 = __webpack_require__(1);
// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
exports.componentToDOMNodeMap = new Map();
var roots = options_1.options.roots;
/**
 * When inferno.options.findDOMNOdeEnabled is true, this function will return DOM Node by component instance
 * @param ref Component instance
 * @returns {*|null} returns dom node
 */
function findDOMNode(ref) {
    if (!options_1.options.findDOMNodeEnabled) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!');
        }
        inferno_shared_1.throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return exports.componentToDOMNodeMap.get(ref) || dom;
}
exports.findDOMNode = findDOMNode;
function getRoot(dom) {
    for (var i = 0, len = roots.length; i < len; i++) {
        var root = roots[i];
        if (root.dom === dom) {
            return root;
        }
    }
    return null;
}
function setRoot(dom, input, lifecycle) {
    var root = {
        dom: dom,
        input: input,
        lifecycle: lifecycle
    };
    roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = roots.length; i < len; i++) {
        if (roots[i] === root) {
            roots.splice(i, 1);
            return;
        }
    }
}
if (process.env.NODE_ENV !== 'production') {
    if (inferno_shared_1.isBrowser && document.body === null) {
        inferno_shared_1.warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = inferno_shared_1.isBrowser ? document.body : null;
/**
 * Renders virtual node tree into parent node.
 * @param {VNode | null | string | number} input vNode to be rendered
 * @param parentDom DOM node which content will be replaced by virtual node
 * @returns {InfernoChildren} rendered virtual node
 */
function render(input, parentDom) {
    if (documentBody === parentDom) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        inferno_shared_1.throwError();
    }
    if (input === inferno_shared_1.NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (inferno_shared_1.isNull(root)) {
        var lifecycle = new inferno_shared_1.Lifecycle();
        if (!inferno_shared_1.isInvalid(input)) {
            if (input.dom) {
                input = VNodes_1.directClone(input);
            }
            if (!hydration_1.hydrateRoot(input, parentDom, lifecycle)) {
                mounting_1.mount(input, parentDom, lifecycle, utils_1.EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    }
    else {
        var lifecycle = root.lifecycle;
        lifecycle.listeners = [];
        if (inferno_shared_1.isNullOrUndef(input)) {
            unmounting_1.unmount(root.input, parentDom, lifecycle, false, false);
            removeRoot(root);
        }
        else {
            if (input.dom) {
                input = VNodes_1.directClone(input);
            }
            patching_1.patch(root.input, input, parentDom, lifecycle, utils_1.EMPTY_OBJ, false, false);
        }
        root.input = input;
        lifecycle.trigger();
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && (rootInput.flags & 28 /* Component */)) {
            return rootInput.children;
        }
    }
}
exports.render = render;
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}
exports.createRenderer = createRenderer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27).default;
module.exports.default = module.exports;



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.xlinkNS = 'http://www.w3.org/1999/xlink';
exports.xmlNS = 'http://www.w3.org/XML/1998/namespace';
exports.svgNS = 'http://www.w3.org/2000/svg';
exports.strictProps = new Set();
exports.strictProps.add('volume');
exports.strictProps.add('defaultChecked');
exports.booleanProps = new Set();
exports.booleanProps.add('muted');
exports.booleanProps.add('scoped');
exports.booleanProps.add('loop');
exports.booleanProps.add('open');
exports.booleanProps.add('checked');
exports.booleanProps.add('default');
exports.booleanProps.add('capture');
exports.booleanProps.add('disabled');
exports.booleanProps.add('readOnly');
exports.booleanProps.add('required');
exports.booleanProps.add('autoplay');
exports.booleanProps.add('controls');
exports.booleanProps.add('seamless');
exports.booleanProps.add('reversed');
exports.booleanProps.add('allowfullscreen');
exports.booleanProps.add('novalidate');
exports.booleanProps.add('hidden');
exports.booleanProps.add('autoFocus');
exports.booleanProps.add('selected');
exports.namespaces = new Map();
exports.namespaces.set('xlink:href', exports.xlinkNS);
exports.namespaces.set('xlink:arcrole', exports.xlinkNS);
exports.namespaces.set('xlink:actuate', exports.xlinkNS);
exports.namespaces.set('xlink:show', exports.xlinkNS);
exports.namespaces.set('xlink:role', exports.xlinkNS);
exports.namespaces.set('xlink:title', exports.xlinkNS);
exports.namespaces.set('xlink:type', exports.xlinkNS);
exports.namespaces.set('xml:base', exports.xmlNS);
exports.namespaces.set('xml:lang', exports.xmlNS);
exports.namespaces.set('xml:space', exports.xmlNS);
exports.isUnitlessNumber = new Set();
exports.isUnitlessNumber.add('animationIterationCount');
exports.isUnitlessNumber.add('borderImageOutset');
exports.isUnitlessNumber.add('borderImageSlice');
exports.isUnitlessNumber.add('borderImageWidth');
exports.isUnitlessNumber.add('boxFlex');
exports.isUnitlessNumber.add('boxFlexGroup');
exports.isUnitlessNumber.add('boxOrdinalGroup');
exports.isUnitlessNumber.add('columnCount');
exports.isUnitlessNumber.add('flex');
exports.isUnitlessNumber.add('flexGrow');
exports.isUnitlessNumber.add('flexPositive');
exports.isUnitlessNumber.add('flexShrink');
exports.isUnitlessNumber.add('flexNegative');
exports.isUnitlessNumber.add('flexOrder');
exports.isUnitlessNumber.add('gridRow');
exports.isUnitlessNumber.add('gridColumn');
exports.isUnitlessNumber.add('fontWeight');
exports.isUnitlessNumber.add('lineClamp');
exports.isUnitlessNumber.add('lineHeight');
exports.isUnitlessNumber.add('opacity');
exports.isUnitlessNumber.add('order');
exports.isUnitlessNumber.add('orphans');
exports.isUnitlessNumber.add('tabSize');
exports.isUnitlessNumber.add('widows');
exports.isUnitlessNumber.add('zIndex');
exports.isUnitlessNumber.add('zoom');
exports.isUnitlessNumber.add('fillOpacity');
exports.isUnitlessNumber.add('floodOpacity');
exports.isUnitlessNumber.add('stopOpacity');
exports.isUnitlessNumber.add('strokeDasharray');
exports.isUnitlessNumber.add('strokeDashoffset');
exports.isUnitlessNumber.add('strokeMiterlimit');
exports.isUnitlessNumber.add('strokeOpacity');
exports.isUnitlessNumber.add('strokeWidth');
exports.skipProps = new Set();
exports.skipProps.add('children');
exports.skipProps.add('childrenType');
exports.skipProps.add('defaultValue');
exports.skipProps.add('ref');
exports.skipProps.add('key');
exports.skipProps.add('checked');
exports.skipProps.add('multiple');
exports.delegatedEvents = new Set();
exports.delegatedEvents.add('onClick');
exports.delegatedEvents.add('onMouseDown');
exports.delegatedEvents.add('onMouseUp');
exports.delegatedEvents.add('onMouseMove');
exports.delegatedEvents.add('onSubmit');
exports.delegatedEvents.add('onDblClick');
exports.delegatedEvents.add('onKeyDown');
exports.delegatedEvents.add('onKeyUp');
exports.delegatedEvents.add('onKeyPress');


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var options_1 = __webpack_require__(3);
var VNodes_1 = __webpack_require__(4);
var patching_1 = __webpack_require__(5);
var recycling_1 = __webpack_require__(13);
var rendering_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(1);
var processElement_1 = __webpack_require__(11);
function mount(vNode, parentDom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 3970 /* Element */) {
        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
    }
    else if (flags & 28 /* Component */) {
        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    else if (flags & 4096 /* Void */) {
        return mountVoid(vNode, parentDom);
    }
    else if (flags & 1 /* Text */) {
        return mountText(vNode, parentDom);
    }
    else {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof vNode === 'object') {
                inferno_shared_1.throwError("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
            }
            else {
                inferno_shared_1.throwError("mount() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
            }
        }
        inferno_shared_1.throwError();
    }
}
exports.mount = mount;
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (!inferno_shared_1.isNull(parentDom)) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountText = mountText;
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode('');
    vNode.dom = dom;
    if (!inferno_shared_1.isNull(parentDom)) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountVoid = mountVoid;
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    if (options_1.options.recyclingEnabled) {
        var dom_1 = recycling_1.recycleElement(vNode, lifecycle, context, isSVG);
        if (!inferno_shared_1.isNull(dom_1)) {
            if (!inferno_shared_1.isNull(parentDom)) {
                utils_1.appendChild(parentDom, dom_1);
            }
            return dom_1;
        }
    }
    var flags = vNode.flags;
    isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
    var dom = utils_1.documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!inferno_shared_1.isInvalid(children)) {
        if (inferno_shared_1.isStringOrNumber(children)) {
            utils_1.setTextContent(dom, children);
        }
        else if (inferno_shared_1.isArray(children)) {
            mountArrayChildren(children, dom, lifecycle, context, isSVG);
        }
        else if (VNodes_1.isVNode(children)) {
            mount(children, dom, lifecycle, context, isSVG);
        }
    }
    if (!inferno_shared_1.isNull(props)) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = processElement_1.isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching_1.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement_1.processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (className !== null) {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (!inferno_shared_1.isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!inferno_shared_1.isNull(parentDom)) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountElement = mountElement;
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!inferno_shared_1.isInvalid(child)) {
            if (child.dom) {
                children[i] = child = VNodes_1.directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
exports.mountArrayChildren = mountArrayChildren;
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    if (options_1.options.recyclingEnabled) {
        var dom_2 = recycling_1.recycleComponent(vNode, lifecycle, context, isSVG);
        if (!inferno_shared_1.isNull(dom_2)) {
            if (!inferno_shared_1.isNull(parentDom)) {
                utils_1.appendChild(parentDom, dom_2);
            }
            return dom_2;
        }
    }
    var type = vNode.type;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var ref = vNode.ref;
    var dom;
    if (isClass) {
        var instance = utils_1.createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!inferno_shared_1.isNull(parentDom)) {
            utils_1.appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false;
        if (options_1.options.findDOMNodeEnabled) {
            rendering_1.componentToDOMNodeMap.set(instance, dom);
        }
    }
    else {
        var input = utils_1.createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input, null, lifecycle, context, isSVG);
        vNode.children = input;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        if (!inferno_shared_1.isNull(parentDom)) {
            utils_1.appendChild(parentDom, dom);
        }
    }
    return dom;
}
exports.mountComponent = mountComponent;
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (inferno_shared_1.isFunction(ref)) {
            ref(instance);
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                if (inferno_shared_1.isStringOrNumber(ref)) {
                    inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
                else if (inferno_shared_1.isObject(ref) && (vNode.flags & 4 /* ComponentClass */)) {
                    inferno_shared_1.throwError('functional component lifecycle events are not supported on ES2015 class components.');
                }
                else {
                    inferno_shared_1.throwError("a bad value for \"ref\" was used on component: \"" + JSON.stringify(ref) + "\"");
                }
            }
            inferno_shared_1.throwError();
        }
    }
    var hasDidMount = !inferno_shared_1.isUndefined(instance.componentDidMount);
    var afterMount = options_1.options.afterMount;
    if (hasDidMount || !inferno_shared_1.isNull(afterMount)) {
        lifecycle.addListener(function () {
            instance._updating = true;
            if (afterMount) {
                afterMount(vNode);
            }
            if (hasDidMount) {
                instance.componentDidMount();
            }
            instance._updating = false;
        });
    }
}
exports.mountClassComponentCallbacks = mountClassComponentCallbacks;
function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
    if (ref) {
        if (!inferno_shared_1.isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount();
        }
        if (!inferno_shared_1.isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener(function () { return ref.onComponentDidMount(dom); });
        }
    }
}
exports.mountFunctionalComponentCallbacks = mountFunctionalComponentCallbacks;
function mountRef(dom, value, lifecycle) {
    if (inferno_shared_1.isFunction(value)) {
        lifecycle.addListener(function () { return value(dom); });
    }
    else {
        if (inferno_shared_1.isInvalid(value)) {
            return;
        }
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        inferno_shared_1.throwError();
    }
}
exports.mountRef = mountRef;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var options_1 = __webpack_require__(3);
var patching_1 = __webpack_require__(5);
var recycling_1 = __webpack_require__(13);
var rendering_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(1);
function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & 3970 /* Element */) {
        unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
        unmountVoidOrText(vNode, parentDom);
    }
}
exports.unmount = unmount;
function unmountVoidOrText(vNode, parentDom) {
    if (!inferno_shared_1.isNull(parentDom)) {
        utils_1.removeChild(parentDom, vNode.dom);
    }
}
function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var instance = vNode.children;
    var flags = vNode.flags;
    var isStatefulComponent = flags & 4 /* ComponentClass */;
    var ref = vNode.ref;
    var dom = vNode.dom;
    if (!isRecycling) {
        if (isStatefulComponent) {
            if (!instance._unmounted) {
                instance._blockSetState = true;
                if (!inferno_shared_1.isNull(options_1.options.beforeUnmount)) {
                    options_1.options.beforeUnmount(vNode);
                }
                if (!inferno_shared_1.isUndefined(instance.componentWillUnmount)) {
                    instance.componentWillUnmount();
                }
                if (ref && !isRecycling) {
                    ref(null);
                }
                instance._unmounted = true;
                if (options_1.options.findDOMNodeEnabled) {
                    rendering_1.componentToDOMNodeMap.delete(instance);
                }
                unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
            }
        }
        else {
            if (!inferno_shared_1.isNullOrUndef(ref)) {
                if (!inferno_shared_1.isNullOrUndef(ref.onComponentWillUnmount)) {
                    ref.onComponentWillUnmount(dom);
                }
            }
            unmount(instance, null, lifecycle, false, isRecycling);
        }
    }
    if (parentDom) {
        var lastInput = instance._lastInput;
        if (inferno_shared_1.isNullOrUndef(lastInput)) {
            lastInput = instance;
        }
        utils_1.removeChild(parentDom, dom);
    }
    if (options_1.options.recyclingEnabled && !isStatefulComponent && (parentDom || canRecycle)) {
        recycling_1.poolComponent(vNode);
    }
}
exports.unmountComponent = unmountComponent;
function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var dom = vNode.dom;
    var ref = vNode.ref;
    var props = vNode.props;
    if (ref && !isRecycling) {
        unmountRef(ref);
    }
    var children = vNode.children;
    if (!inferno_shared_1.isNullOrUndef(children)) {
        unmountChildren(children, lifecycle, isRecycling);
    }
    if (!inferno_shared_1.isNull(props)) {
        for (var name_1 in props) {
            // do not add a hasOwnProperty check here, it affects performance
            if (props[name_1] !== null && patching_1.isAttrAnEvent(name_1)) {
                patching_1.patchEvent(name_1, props[name_1], null, dom);
                // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                props[name_1] = null;
            }
        }
    }
    if (!inferno_shared_1.isNull(parentDom)) {
        utils_1.removeChild(parentDom, dom);
    }
    if (options_1.options.recyclingEnabled && (parentDom || canRecycle)) {
        recycling_1.poolElement(vNode);
    }
}
exports.unmountElement = unmountElement;
function unmountChildren(children, lifecycle, isRecycling) {
    if (inferno_shared_1.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!inferno_shared_1.isInvalid(child) && inferno_shared_1.isObject(child)) {
                unmount(child, null, lifecycle, false, isRecycling);
            }
        }
    }
    else if (inferno_shared_1.isObject(children)) {
        unmount(children, null, lifecycle, false, isRecycling);
    }
}
function unmountRef(ref) {
    if (inferno_shared_1.isFunction(ref)) {
        ref(null);
    }
    else {
        if (inferno_shared_1.isInvalid(ref)) {
            return;
        }
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        inferno_shared_1.throwError();
    }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var InputWrapper_1 = __webpack_require__(24);
var SelectWrapper_1 = __webpack_require__(25);
var TextareaWrapper_1 = __webpack_require__(26);
/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 512 /* InputElement */) {
        InputWrapper_1.processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 2048 /* SelectElement */) {
        SelectWrapper_1.processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 1024 /* TextareaElement */) {
        TextareaWrapper_1.processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
}
exports.processElement = processElement;
function isControlledFormElement(nextPropsOrEmpty) {
    return (nextPropsOrEmpty.type && InputWrapper_1.isCheckedType(nextPropsOrEmpty.type)) ? !inferno_shared_1.isNullOrUndef(nextPropsOrEmpty.checked) : !inferno_shared_1.isNullOrUndef(nextPropsOrEmpty.value);
}
exports.isControlledFormElement = isControlledFormElement;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18).default;
module.exports.default = module.exports;



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var patching_1 = __webpack_require__(5);
var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!inferno_shared_1.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!inferno_shared_1.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!inferno_shared_1.isUndefined(recycledVNode)) {
                patching_1.patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
exports.recycleElement = recycleElement;
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (inferno_shared_1.isUndefined(pools)) {
        pools = {
            keyed: new Map(),
            nonKeyed: []
        };
        elementPools.set(tag, pools);
    }
    if (inferno_shared_1.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (inferno_shared_1.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolElement = poolElement;
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!inferno_shared_1.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!inferno_shared_1.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!inferno_shared_1.isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patching_1.patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
exports.recycleComponent = recycleComponent;
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks && (hooks.onComponentWillMount ||
        hooks.onComponentWillUnmount ||
        hooks.onComponentDidMount ||
        hooks.onComponentWillUpdate ||
        hooks.onComponentDidUpdate);
    if (nonRecycleHooks) {
        return;
    }
    var type = vNode.type;
    var key = vNode.key;
    var pools = componentPools.get(type);
    if (inferno_shared_1.isUndefined(pools)) {
        pools = {
            keyed: new Map(),
            nonKeyed: []
        };
        componentPools.set(type, pools);
    }
    if (inferno_shared_1.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (inferno_shared_1.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolComponent = poolComponent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var VNodes_1 = __webpack_require__(4);
function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (inferno_shared_1.isNumber(key)) {
        key = "." + key;
    }
    if (inferno_shared_1.isNull(vNode.key) || vNode.key[0] === '.') {
        return applyKey(key, vNode);
    }
    return vNode;
}
function applyKeyPrefix(key, vNode) {
    vNode.key = key + vNode.key;
    return vNode;
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        var key = currentKey + "." + index;
        if (!inferno_shared_1.isInvalid(n)) {
            if (inferno_shared_1.isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            }
            else {
                if (inferno_shared_1.isStringOrNumber(n)) {
                    n = VNodes_1.createTextVNode(n, null);
                }
                else if (VNodes_1.isVNode(n) && n.dom || (n.key && n.key[0] === '.')) {
                    n = VNodes_1.directClone(n);
                }
                if (inferno_shared_1.isNull(n.key) || n.key[0] === '.') {
                    n = applyKey(key, n);
                }
                else {
                    n = applyKeyPrefix(currentKey, n);
                }
                result.push(n);
            }
        }
    }
}
function normalizeVNodes(nodes) {
    var newNodes;
    // we assign $ which basically means we've flagged this array for future note
    // if it comes back again, we need to clone it, as people are using it
    // in an immutable way
    // tslint:disable
    if (nodes['$'] === true) {
        nodes = nodes.slice();
    }
    else {
        nodes['$'] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (inferno_shared_1.isInvalid(n) || inferno_shared_1.isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        }
        else if (inferno_shared_1.isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes_1.createTextVNode(n, null)));
        }
        else if ((VNodes_1.isVNode(n) && n.dom !== null) || (inferno_shared_1.isNull(n.key) && (n.flags & 64 /* HasNonKeyedChildren */) === 0)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes_1.directClone(n)));
        }
        else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, VNodes_1.directClone(n)));
        }
    }
    return newNodes || nodes;
}
exports.normalizeVNodes = normalizeVNodes;
function normalizeChildren(children) {
    if (inferno_shared_1.isArray(children)) {
        return normalizeVNodes(children);
    }
    else if (VNodes_1.isVNode(children) && children.dom !== null) {
        return VNodes_1.directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (vNode.flags & 3970 /* Element */) {
        if (inferno_shared_1.isNullOrUndef(children) && !inferno_shared_1.isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (!inferno_shared_1.isNullOrUndef(props.className)) {
            vNode.className = props.className;
            delete props.className;
        }
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (!inferno_shared_1.isNullOrUndef(props.key)) {
        vNode.key = props.key;
        delete props.key;
    }
}
function getFlagsForElementVnode(type) {
    if (type === 'svg') {
        return 128 /* SvgElement */;
    }
    else if (type === 'input') {
        return 512 /* InputElement */;
    }
    else if (type === 'select') {
        return 2048 /* SelectElement */;
    }
    else if (type === 'textarea') {
        return 1024 /* TextareaElement */;
    }
    else if (type === 'media') {
        return 256 /* MediaElement */;
    }
    return 2 /* HtmlElement */;
}
exports.getFlagsForElementVnode = getFlagsForElementVnode;
function normalize(vNode) {
    var props = vNode.props;
    var children = vNode.children;
    // convert a wrongly created type back to element
    // Primitive node doesn't have defaultProps, only Component
    if (vNode.flags & 28 /* Component */) {
        // set default props
        var type = vNode.type;
        var defaultProps = type.defaultProps;
        if (!inferno_shared_1.isNullOrUndef(defaultProps)) {
            if (!props) {
                props = vNode.props = defaultProps; // Create new object if only defaultProps given
            }
            else {
                for (var prop in defaultProps) {
                    if (inferno_shared_1.isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
        if (inferno_shared_1.isString(type)) {
            vNode.flags = getFlagsForElementVnode(type);
            if (props && props.children) {
                vNode.children = props.children;
                children = props.children;
            }
        }
    }
    if (props) {
        normalizeProps(vNode, props, children);
        if (!inferno_shared_1.isInvalid(props.children)) {
            props.children = normalizeChildren(props.children);
        }
    }
    if (!inferno_shared_1.isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (process.env.NODE_ENV !== 'production') {
        // This code will be stripped out from production CODE
        // It helps users to track errors in their applications.
        var verifyKeys = function (vNodes) {
            var keyValues = vNodes.map(function (vnode) {
                return vnode.key;
            });
            keyValues.some(function (item, idx) {
                var hasDuplicate = keyValues.indexOf(item) !== idx;
                if (hasDuplicate) {
                    inferno_shared_1.warning('Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:' + item);
                }
                return hasDuplicate;
            });
        };
        if (vNode.children && Array.isArray(vNode.children)) {
            verifyKeys(vNode.children);
        }
    }
}
exports.normalize = normalize;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubjectDropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = __webpack_require__(7);

var _inferno2 = _interopRequireDefault(_inferno);

var _infernoComponent = __webpack_require__(12);

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createVNode = _inferno2.default.createVNode;

var SubjectDropdown = exports.SubjectDropdown = function (_Component) {
    _inherits(SubjectDropdown, _Component);

    function SubjectDropdown(props) {
        _classCallCheck(this, SubjectDropdown);

        var _this = _possibleConstructorReturn(this, (SubjectDropdown.__proto__ || Object.getPrototypeOf(SubjectDropdown)).call(this, props));

        _this.subjects = ["k", "l", "m"];
        return _this;
    }

    _createClass(SubjectDropdown, [{
        key: 'render',
        value: function render() {
            return createVNode(2048, 'select', 'column', this.subjects.map(function (subject, i) {
                return createVNode(2, 'option', null, subject);
            }));
        }
    }]);

    return SubjectDropdown;
}(_infernoComponent2.default);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19).default;
module.exports.default = module.exports;



/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = __webpack_require__(7);

var _inferno2 = _interopRequireDefault(_inferno);

var _infernoComponent = __webpack_require__(12);

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

var _infernoCreateElement = __webpack_require__(16);

var _components = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createVNode = _inferno2.default.createVNode;

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      counter: 0,
      inputVal: 0
    };

    _this.rows = [{ name: "sale", subject: "k", io: "i", amount: 10000 }, { name: "food", subject: "l", io: "o", amount: 1000 }, { name: "paper", subject: "m", io: "o", amount: 2000 }, { name: "train", subject: "", io: "o", amount: 1000 }, { name: "hotel", subject: "k", io: "o", amount: 5000 }];
    _this.sum = 0;

    _this.inputOnChange = function (instance, event) {
      instance.setState({
        inputVal: event.target.value
      });
    };
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return createVNode(2, "div", "container", [createVNode(2, "h1", null, "Nasca"), createVNode(2, "div", null, [createVNode(2, "span", null, ["Counter is at: ", this.state.counter]), createVNode(2, "hr"), this.rows.map(function (row, i) {
        return createVNode(2, "div", "row", [createVNode(2, "span", "column", row.name), createVNode(16, _components.SubjectDropdown), createVNode(2, "span", "column", row.io === "i" ? "Income" : "Outcome"), createVNode(512, "input", null, null, {
          "type": "text",
          "onInput": (0, _inferno.linkEvent)(_this2, _this2.inputOnChange),
          "value": _this2.state.inputVal
        })]);
      }), createVNode(2, "div", "row", this.rows.reduce(function (x, y) {
        var z = x;z.amount += y.amount;return z;
      }).amount)])]);
    }
  }]);

  return App;
}(_infernoComponent2.default);

_inferno2.default.render(createVNode(16, App), document.getElementById("app"));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference
var inferno_1 = __webpack_require__(7);
var inferno_shared_1 = __webpack_require__(0);
var noOp = inferno_shared_1.ERROR_MSG;
if (process.env.NODE_ENV !== 'production') {
    noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';
}
var componentCallbackQueue = new Map();
// when a components root VNode is also a component, we can run into issues
// this will recursively look for vNode.parentNode if the VNode is a component
function updateParentComponentVNodes(vNode, dom) {
    if (vNode.flags & 28 /* Component */) {
        var parentVNode = vNode.parentVNode;
        if (parentVNode) {
            parentVNode.dom = dom;
            updateParentComponentVNodes(parentVNode, dom);
        }
    }
}
var resolvedPromise = Promise.resolve();
function addToQueue(component, force, callback) {
    var queue = componentCallbackQueue.get(component);
    if (queue === void 0) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        resolvedPromise.then(function () {
            componentCallbackQueue.delete(component);
            component._updating = true;
            applyState(component, force, function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i].call(component);
                }
            });
            component._updating = false;
        });
    }
    if (!inferno_shared_1.isNullOrUndef(callback)) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback) {
    if (inferno_shared_1.isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    var pending = component._pendingState;
    if (pending === null) {
        component._pendingState = pending = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (inferno_shared_1.isBrowser && !component._pendingSetState && !component._blockRender) {
        if (!component._updating) {
            component._pendingSetState = true;
            component._updating = true;
            applyState(component, false, callback);
            component._updating = false;
        }
        else {
            addToQueue(component, false, callback);
        }
    }
    else {
        var state = component.state;
        if (state === null) {
            component.state = pending;
        }
        else {
            for (var key in pending) {
                state[key] = pending[key];
            }
        }
        component._pendingState = null;
        if (!inferno_shared_1.isNullOrUndef(callback) && component._blockRender) {
            component._lifecycle.addListener(callback.bind(component));
        }
    }
}
function applyState(component, force, callback) {
    if (component._unmounted) {
        return;
    }
    if (force || !component._blockRender) {
        component._pendingSetState = false;
        var pendingState = component._pendingState;
        var prevState = component.state;
        var nextState = inferno_shared_1.combineFrom(prevState, pendingState);
        var props = component.props;
        var context_1 = component.context;
        component._pendingState = null;
        var nextInput = component._updateComponent(prevState, nextState, props, props, context_1, force, true);
        var didUpdate = true;
        if (inferno_shared_1.isInvalid(nextInput)) {
            nextInput = inferno_1.createVNode(4096 /* Void */, null);
        }
        else if (nextInput === inferno_shared_1.NO_OP) {
            nextInput = component._lastInput;
            didUpdate = false;
        }
        else if (inferno_shared_1.isStringOrNumber(nextInput)) {
            nextInput = inferno_1.createVNode(1 /* Text */, null, null, nextInput);
        }
        else if (inferno_shared_1.isArray(nextInput)) {
            if (process.env.NODE_ENV !== 'production') {
                inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
            inferno_shared_1.throwError();
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
        component._lastInput = nextInput;
        if (didUpdate) {
            var childContext = void 0;
            if (!inferno_shared_1.isUndefined(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (inferno_shared_1.isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = inferno_shared_1.combineFrom(context_1, childContext);
            }
            var lifeCycle = component._lifecycle;
            inferno_1.internal_patch(lastInput, nextInput, parentDom, lifeCycle, childContext, component._isSVG, false);
            lifeCycle.trigger();
            if (!inferno_shared_1.isUndefined(component.componentDidUpdate)) {
                component.componentDidUpdate(props, prevState, context_1);
            }
            if (!inferno_shared_1.isNull(inferno_1.options.afterUpdate)) {
                inferno_1.options.afterUpdate(vNode);
            }
        }
        var dom = vNode.dom = nextInput.dom;
        if (inferno_1.options.findDOMNodeEnabled) {
            inferno_1.internal_DOMNodeMap.set(component, nextInput.dom);
        }
        updateParentComponentVNodes(vNode, dom);
    }
    else {
        component.state = component._pendingState;
        component._pendingState = null;
    }
    if (!inferno_shared_1.isNullOrUndef(callback)) {
        callback.call(component);
    }
}
var alreadyWarned = false;
var Component = (function () {
    function Component(props, context) {
        this.state = null;
        this._blockRender = false;
        this._blockSetState = true;
        this._pendingSetState = false;
        this._pendingState = null;
        this._lastInput = null;
        this._vNode = null;
        this._unmounted = false;
        this._lifecycle = null;
        this._childContext = null;
        this._isSVG = false;
        this._updating = true;
        /** @type {object} */
        this.props = props || inferno_1.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || inferno_1.EMPTY_OBJ; // context should not be mutable
    }
    Component.prototype.forceUpdate = function (callback) {
        if (this._unmounted || !inferno_shared_1.isBrowser) {
            return;
        }
        applyState(this, true, callback);
    };
    Component.prototype.setState = function (newState, callback) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            queueStateChanges(this, newState, callback);
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                inferno_shared_1.throwError('cannot update state via setState() in componentWillUpdate() or constructor.');
            }
            inferno_shared_1.throwError();
        }
    };
    Component.prototype.setStateSync = function (newState) {
        if (process.env.NODE_ENV !== 'production') {
            if (!alreadyWarned) {
                alreadyWarned = true;
                // tslint:disable-next-line:no-console
                console.warn('Inferno WARNING: setStateSync has been deprecated and will be removed in next release. Use setState instead.');
            }
        }
        this.setState(newState);
    };
    Component.prototype._updateComponent = function (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (this._unmounted === true) {
            if (process.env.NODE_ENV !== 'production') {
                inferno_shared_1.throwError(noOp);
            }
            inferno_shared_1.throwError();
        }
        if ((prevProps !== nextProps || nextProps === inferno_1.EMPTY_OBJ) || prevState !== nextState || force) {
            if (prevProps !== nextProps || nextProps === inferno_1.EMPTY_OBJ) {
                if (!inferno_shared_1.isUndefined(this.componentWillReceiveProps) && !fromSetState) {
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    this._blockRender = false;
                }
                if (this._pendingSetState) {
                    nextState = inferno_shared_1.combineFrom(nextState, this._pendingState);
                    this._pendingSetState = false;
                    this._pendingState = null;
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            if (inferno_shared_1.isUndefined(this.shouldComponentUpdate) || this.shouldComponentUpdate(nextProps, nextState, context) || force) {
                if (!inferno_shared_1.isUndefined(this.componentWillUpdate)) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                }
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
                if (inferno_1.options.beforeRender) {
                    inferno_1.options.beforeRender(this);
                }
                var render = this.render(nextProps, nextState, context);
                if (inferno_1.options.afterRender) {
                    inferno_1.options.afterRender(this);
                }
                return render;
            }
            else {
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
            }
        }
        return inferno_shared_1.NO_OP;
    };
    // tslint:disable-next-line:no-empty
    Component.prototype.render = function (nextProps, nextState, nextContext) { };
    return Component;
}());
exports.default = Component;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_1 = __webpack_require__(7);
var inferno_shared_1 = __webpack_require__(0);
var componentHooks = new Set();
componentHooks.add('onComponentWillMount');
componentHooks.add('onComponentDidMount');
componentHooks.add('onComponentWillUnmount');
componentHooks.add('onComponentShouldUpdate');
componentHooks.add('onComponentWillUpdate');
componentHooks.add('onComponentDidUpdate');
/**
 * Creates virtual node
 * @param {string|Function|Component<any, any>} type Type of node
 * @param {object=} props Optional props for virtual node
 * @param {...{object}=} _children Optional children for virtual node
 * @returns {VNode} new virtual ndoe
 */
function createElement(type, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    if (inferno_shared_1.isInvalid(type) || inferno_shared_1.isObject(type)) {
        throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.');
    }
    var children = _children;
    var ref = null;
    var key = null;
    var className = null;
    var flags = 0;
    var newProps;
    if (_children) {
        if (_children.length === 1) {
            children = _children[0];
        }
        else if (_children.length === 0) {
            children = void 0;
        }
    }
    if (inferno_shared_1.isString(type)) {
        flags = inferno_1.getFlagsForElementVnode(type);
        if (!inferno_shared_1.isNullOrUndef(props)) {
            newProps = {};
            for (var prop in props) {
                if (prop === 'className' || prop === 'class') {
                    className = props[prop];
                }
                else if (prop === 'key') {
                    key = props.key;
                }
                else if (prop === 'children' && inferno_shared_1.isUndefined(children)) {
                    children = props.children; // always favour children args, default to props
                }
                else if (prop === 'ref') {
                    ref = props.ref;
                }
                else {
                    newProps[prop] = props[prop];
                }
            }
        }
    }
    else {
        flags = 16 /* ComponentUnknown */;
        if (!inferno_shared_1.isUndefined(children)) {
            if (!props) {
                props = {};
            }
            props.children = children;
            children = null;
        }
        if (!inferno_shared_1.isNullOrUndef(props)) {
            newProps = {};
            for (var prop in props) {
                if (componentHooks.has(prop)) {
                    if (!ref) {
                        ref = {};
                    }
                    ref[prop] = props[prop];
                }
                else if (prop === 'key') {
                    key = props.key;
                }
                else {
                    newProps[prop] = props[prop];
                }
            }
        }
    }
    return inferno_1.createVNode(flags, type, className, children, newProps, key, ref);
}
exports.default = createElement;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_OP = '$NO_OP';
exports.ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
exports.isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return exports.isArray(children) ? children : (children ? [children] : children);
}
exports.toArray = toArray;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
exports.isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
exports.isStatefulComponent = isStatefulComponent;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
exports.isStringOrNumber = isStringOrNumber;
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
exports.isNullOrUndef = isNullOrUndef;
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
exports.isInvalid = isInvalid;
function isFunction(o) {
    return typeof o === 'function';
}
exports.isFunction = isFunction;
function isString(o) {
    return typeof o === 'string';
}
exports.isString = isString;
function isNumber(o) {
    return typeof o === 'number';
}
exports.isNumber = isNumber;
function isNull(o) {
    return o === null;
}
exports.isNull = isNull;
function isTrue(o) {
    return o === true;
}
exports.isTrue = isTrue;
function isUndefined(o) {
    return o === void 0;
}
exports.isUndefined = isUndefined;
function isObject(o) {
    return typeof o === 'object';
}
exports.isObject = isObject;
function throwError(message) {
    if (!message) {
        message = exports.ERROR_MSG;
    }
    throw new Error("Inferno Error: " + message);
}
exports.throwError = throwError;
function warning(message) {
    // tslint:disable-next-line:no-console
    console.warn(message);
}
exports.warning = warning;
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key in second) {
            out[key] = second[key];
        }
    }
    return out;
}
exports.combineFrom = combineFrom;
function Lifecycle() {
    this.listeners = [];
}
exports.Lifecycle = Lifecycle;
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    var listener;
    // We need to remove current listener from array when calling it, because more listeners might be added
    while (listener = listeners.shift()) {
        listener();
    }
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var isiOS = inferno_shared_1.isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents = new Map();
function handleEvent(name, lastEvent, nextEvent, dom) {
    var delegatedRoots = delegatedEvents.get(name);
    if (nextEvent) {
        if (!delegatedRoots) {
            delegatedRoots = { items: new Map(), docEvent: null };
            delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
            delegatedEvents.set(name, delegatedRoots);
        }
        if (!lastEvent) {
            if (isiOS && name === 'onClick') {
                trapClickOnNonInteractiveElement(dom);
            }
        }
        delegatedRoots.items.set(dom, nextEvent);
    }
    else if (delegatedRoots) {
        var items = delegatedRoots.items;
        if (items.delete(dom)) {
            // If any items were deleted, check if listener need to be removed
            if (items.size === 0) {
                document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
                delegatedEvents.delete(name);
            }
        }
    }
}
exports.handleEvent = handleEvent;
function dispatchEvent(event, target, items, count, isClick, eventData) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        // linkEvent object
        eventData.dom = target;
        if (eventsToTrigger.event) {
            eventsToTrigger.event(eventsToTrigger.data, event);
        }
        else {
            eventsToTrigger(event);
        }
        if (event.cancelBubble) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = target.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (parentDom === null || (isClick && parentDom.nodeType === 1 && parentDom.disabled)) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, isClick, eventData);
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function attachEventToDocument(name, delegatedRoots) {
    var docEvent = function (event) {
        var count = delegatedRoots.items.size;
        if (count > 0) {
            event.stopPropagation = stopPropagation;
            // Event data needs to be object to save reference to currentTarget getter
            var eventData_1 = {
                dom: document
            };
            try {
                Object.defineProperty(event, 'currentTarget', {
                    configurable: true,
                    get: function get() {
                        return eventData_1.dom;
                    }
                });
            }
            catch (e) { }
            dispatchEvent(event, event.target, delegatedRoots.items, count, event.type === 'click', eventData_1);
        }
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
// tslint:disable-next-line:no-empty
function emptyFn() { }
function trapClickOnNonInteractiveElement(dom) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    dom.onclick = emptyFn;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    return { data: data, event: event };
}
exports.linkEvent = linkEvent;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var options_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(8);
var mounting_1 = __webpack_require__(9);
var patching_1 = __webpack_require__(5);
var rendering_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(1);
var processElement_1 = __webpack_require__(11);
function normalizeChildNodes(parentDom) {
    var dom = parentDom.firstChild;
    while (dom) {
        if (dom.nodeType === 8) {
            if (dom.data === '!') {
                var placeholder = document.createTextNode('');
                parentDom.replaceChild(placeholder, dom);
                dom = dom.nextSibling;
            }
            else {
                var lastDom = dom.previousSibling;
                parentDom.removeChild(dom);
                dom = lastDom || parentDom.firstChild;
            }
        }
        else {
            dom = dom.nextSibling;
        }
    }
}
exports.normalizeChildNodes = normalizeChildNodes;
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    vNode.dom = dom;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === constants_1.svgNS;
        var instance = utils_1.createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        mounting_1.mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false; // Mount finished allow going sync
        if (options_1.options.findDOMNodeEnabled) {
            rendering_1.componentToDOMNodeMap.set(instance, dom);
        }
    }
    else {
        var input = utils_1.createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input, dom, lifecycle, context, isSVG);
        vNode.children = input;
        vNode.dom = input.dom;
        mounting_1.mountFunctionalComponentCallbacks(ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    isSVG = isSVG || (flags & 128 /* SvgElement */) > 0;
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.warning('Inferno hydration: Server-side markup doesn\'t match client-side markup or Initial render target is not empty');
        }
        var newDom = mounting_1.mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        utils_1.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (children) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    if (props) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = processElement_1.isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching_1.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement_1.processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (inferno_shared_1.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (ref) {
        mounting_1.mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (inferno_shared_1.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!inferno_shared_1.isNull(child) && inferno_shared_1.isObject(child)) {
                if (!inferno_shared_1.isNull(dom)) {
                    dom = hydrate(child, dom, lifecycle, context, isSVG).nextSibling;
                }
                else {
                    mounting_1.mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    }
    else if (inferno_shared_1.isStringOrNumber(children)) {
        if (dom && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        }
        else if (children) {
            parentDom.textContent = children;
        }
        dom = dom.nextSibling;
    }
    else if (inferno_shared_1.isObject(children)) {
        hydrate(children, dom, lifecycle, context, isSVG);
        dom = dom.nextSibling;
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom) {
        var nextSibling = dom.nextSibling;
        parentDom.removeChild(dom);
        dom = nextSibling;
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mounting_1.mountText(vNode, null);
        vNode.dom = newDom;
        utils_1.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    var text = vNode.children;
    if (dom.nodeValue !== text) {
        dom.nodeValue = text;
    }
    vNode.dom = dom;
    return dom;
}
function hydrateVoid(vNode, dom) {
    vNode.dom = dom;
    return dom;
}
function hydrate(vNode, dom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        return hydrateComponent(vNode, dom, lifecycle, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    else if (flags & 3970 /* Element */) {
        return hydrateElement(vNode, dom, lifecycle, context, isSVG);
    }
    else if (flags & 1 /* Text */) {
        return hydrateText(vNode, dom);
    }
    else if (flags & 4096 /* Void */) {
        return hydrateVoid(vNode, dom);
    }
    else {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError("hydrate() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
        }
        inferno_shared_1.throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    if (!inferno_shared_1.isNull(parentDom)) {
        var dom = parentDom.firstChild;
        if (!inferno_shared_1.isNull(dom)) {
            hydrate(input, dom, lifecycle, utils_1.EMPTY_OBJ, false);
            dom = parentDom.firstChild;
            // clear any other DOM nodes, there should be only a single entry for the root
            while (dom = dom.nextSibling) {
                parentDom.removeChild(dom);
            }
            return true;
        }
    }
    return false;
}
exports.hydrateRoot = hydrateRoot;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(1);
function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
exports.isCheckedType = isCheckedType;
function onTextInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function wrappedOnChange(e) {
    var props = this.props || utils_1.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onCheckboxChange(e) {
    e.stopPropagation(); // This click should not propagate its for internal use
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onClick) {
        var event_2 = props.onClick;
        if (event_2.event) {
            event_2.event(event_2.data, e);
        }
        else {
            event_2(e);
        }
    }
    else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom);
    if (mounting && isControlled) {
        if (isCheckedType(nextPropsOrEmpty.type)) {
            dom.onclick = onCheckboxChange.bind(vNode);
            dom.onclick.wrapped = true;
        }
        else {
            dom.oninput = onTextInputChange.bind(vNode);
            dom.oninput.wrapped = true;
        }
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
    }
}
exports.processInput = processInput;
function applyValue(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !inferno_shared_1.isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!inferno_shared_1.isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!inferno_shared_1.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.value = value;
        }
        else if (!inferno_shared_1.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var VNodes_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(1);
function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        if (inferno_shared_1.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (VNodes_1.isVNode(children)) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((inferno_shared_1.isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
        dom.selected = true;
    }
    else if (!inferno_shared_1.isNullOrUndef(value) || !inferno_shared_1.isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onChange) {
        var event_1 = props.onChange;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom, newProps, false);
    }
}
function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(vNode, dom, nextPropsOrEmpty, mounting);
    if (mounting && isControlled) {
        dom.onchange = onSelectChange.bind(vNode);
        dom.onchange.wrapped = true;
    }
}
exports.processSelect = processSelect;
function applyValue(vNode, dom, nextPropsOrEmpty, mounting) {
    if (nextPropsOrEmpty.multiple !== dom.multiple) {
        dom.multiple = nextPropsOrEmpty.multiple;
    }
    var children = vNode.children;
    if (!inferno_shared_1.isInvalid(children)) {
        var value = nextPropsOrEmpty.value;
        if (mounting && inferno_shared_1.isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        if (inferno_shared_1.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (VNodes_1.isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(1);
function wrappedOnChange(e) {
    var props = this.props || utils_1.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, vNode.dom, false);
    }
}
function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom, mounting);
    if (mounting && isControlled) {
        dom.oninput = onTextareaInputChange.bind(vNode);
        dom.oninput.wrapped = true;
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
    }
}
exports.processTextarea = processTextarea;
function applyValue(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (inferno_shared_1.isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!inferno_shared_1.isNullOrUndef(defaultValue)) {
                if (defaultValue !== domValue) {
                    dom.value = defaultValue;
                }
            }
            else if (domValue !== '') {
                dom.value = '';
            }
        }
    }
    else {
        /* There is value so keep it controlled */
        if (domValue !== value) {
            dom.value = value;
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(0);
exports.NO_OP = inferno_shared_1.NO_OP;
var normalization_1 = __webpack_require__(14);
exports.getFlagsForElementVnode = normalization_1.getFlagsForElementVnode;
exports.internal_normalize = normalization_1.normalize;
var options_1 = __webpack_require__(3);
exports.options = options_1.options;
var VNodes_1 = __webpack_require__(4);
exports.cloneVNode = VNodes_1.cloneVNode;
exports.createVNode = VNodes_1.createVNode;
var constants_1 = __webpack_require__(8);
exports.internal_isUnitlessNumber = constants_1.isUnitlessNumber;
var linkEvent_1 = __webpack_require__(22);
exports.linkEvent = linkEvent_1.linkEvent;
var patching_1 = __webpack_require__(5);
exports.internal_patch = patching_1.patch;
var rendering_1 = __webpack_require__(6);
exports.internal_DOMNodeMap = rendering_1.componentToDOMNodeMap;
exports.createRenderer = rendering_1.createRenderer;
exports.findDOMNode = rendering_1.findDOMNode;
exports.render = rendering_1.render;
var utils_1 = __webpack_require__(1);
exports.EMPTY_OBJ = utils_1.EMPTY_OBJ;
if (process.env.NODE_ENV !== 'production') {
    /* tslint:disable-next-line:no-empty */
    var testFunc = function testFn() { };
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        inferno_shared_1.warning(('It looks like you\'re using a minified copy of the development build ' +
            'of Inferno. When deploying Inferno apps to production, make sure to use ' +
            'the production build which skips development warnings and is faster. ' +
            'See http://infernojs.org for more details.'));
    }
}
var version = '3.1.2';
exports.version = version;
// we duplicate it so it plays nicely with different module loading systems
exports.default = {
    getFlagsForElementVnode: normalization_1.getFlagsForElementVnode,
    linkEvent: linkEvent_1.linkEvent,
    // core shapes
    createVNode: VNodes_1.createVNode,
    // cloning
    cloneVNode: VNodes_1.cloneVNode,
    // used to shared common items between Inferno libs
    NO_OP: inferno_shared_1.NO_OP,
    EMPTY_OBJ: utils_1.EMPTY_OBJ,
    // DOM
    render: rendering_1.render,
    findDOMNode: rendering_1.findDOMNode,
    createRenderer: rendering_1.createRenderer,
    options: options_1.options,
    version: version,
    internal_patch: patching_1.patch,
    internal_DOMNodeMap: rendering_1.componentToDOMNodeMap,
    internal_isUnitlessNumber: constants_1.isUnitlessNumber,
    internal_normalize: normalization_1.normalize
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTIwYTQ2MmZmYjkxYzIzODE0MDAiLCJ3ZWJwYWNrOi8vLy4vfi9pbmZlcm5vLXNoYXJlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZmVybm8vZGlzdC9ET00vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbmZlcm5vL2Rpc3QvY29yZS9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby9kaXN0L2NvcmUvVk5vZGVzLmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby9kaXN0L0RPTS9wYXRjaGluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZmVybm8vZGlzdC9ET00vcmVuZGVyaW5nLmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZmVybm8vZGlzdC9ET00vY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby9kaXN0L0RPTS9tb3VudGluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZmVybm8vZGlzdC9ET00vdW5tb3VudGluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZmVybm8vZGlzdC9ET00vd3JhcHBlcnMvcHJvY2Vzc0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbmZlcm5vLWNvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZmVybm8vZGlzdC9ET00vcmVjeWNsaW5nLmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby9kaXN0L2NvcmUvbm9ybWFsaXphdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi92ZWhpY2xlL2NvbXBvbmVudHMuanN4Iiwid2VicGFjazovLy8uL34vaW5mZXJuby1jcmVhdGUtZWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi92ZWhpY2xlL2FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vfi9pbmZlcm5vLWNvbXBvbmVudC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby1jcmVhdGUtZWxlbWVudC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby1zaGFyZWQvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZmVybm8vZGlzdC9ET00vZXZlbnRzL2RlbGVnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbmZlcm5vL2Rpc3QvRE9NL2V2ZW50cy9saW5rRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbmZlcm5vL2Rpc3QvRE9NL2h5ZHJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZmVybm8vZGlzdC9ET00vd3JhcHBlcnMvSW5wdXRXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby9kaXN0L0RPTS93cmFwcGVycy9TZWxlY3RXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL34vaW5mZXJuby9kaXN0L0RPTS93cmFwcGVycy9UZXh0YXJlYVdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbmZlcm5vL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOlsiU3ViamVjdERyb3Bkb3duIiwicHJvcHMiLCJzdWJqZWN0cyIsIm1hcCIsInN1YmplY3QiLCJpIiwiQXBwIiwic3RhdGUiLCJjb3VudGVyIiwiaW5wdXRWYWwiLCJyb3dzIiwibmFtZSIsImlvIiwiYW1vdW50Iiwic3VtIiwiaW5wdXRPbkNoYW5nZSIsImluc3RhbmNlIiwiZXZlbnQiLCJzZXRTdGF0ZSIsInRhcmdldCIsInZhbHVlIiwicm93IiwicmVkdWNlIiwieCIsInkiLCJ6IiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7Ozs7Ozs7OzsrQ0NEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsU0FBUztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaE1BO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7O0FDdkx0QztBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDWkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLHFCQUFxQjtBQUNoQyxXQUFXLGFBQWE7QUFDeEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLEdBQUc7QUFDZCxXQUFXLGlCQUFpQjtBQUM1QixXQUFXLFNBQVM7QUFDcEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLEtBQUs7QUFDaEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7K0NDNU1BO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsa0JBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHdCQUF3QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHdCQUF3QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixhQUFhO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFdBQVc7QUFDdkM7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OytDQ3B6QkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdIQUF3SDtBQUN4SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLCtCQUErQjtBQUMxQztBQUNBLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdIQTtBQUNBOzs7Ozs7Ozs7QUNEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7K0NDM0ZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFNBQVM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MscUNBQXFDLEVBQUU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG1CQUFtQixFQUFFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OytDQ3JPQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxTQUFTO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaElBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxQkE7QUFDQTs7Ozs7Ozs7O0FDREE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OzsrQ0NuR0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGFBQWE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvTEE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsZSxXQUFBQSxlOzs7QUFDVCw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHNJQUNUQSxLQURTOztBQUVmLGNBQUtDLFFBQUwsR0FBZ0IsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBaEI7QUFGZTtBQUdsQjs7OztpQ0FDUTtBQUNMLCtDQUNzQixRQUR0QixFQUVRLEtBQUtBLFFBQUwsQ0FBY0MsR0FBZCxDQUFrQixVQUFDQyxPQUFELEVBQVVDLENBQVYsRUFBZ0I7QUFDOUIsc0RBQ2NELE9BRGQ7QUFHSCxhQUpELENBRlI7QUFTSDs7Ozs7Ozs7OztBQ2xCTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTUUsRzs7O0FBQ0osZUFBWUwsS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYQSxLQURXOztBQUVqQixVQUFLTSxLQUFMLEdBQWE7QUFDWEMsZUFBUyxDQURFO0FBRVhDLGdCQUFVO0FBRkMsS0FBYjs7QUFLQSxVQUFLQyxJQUFMLEdBQVksQ0FDVixFQUFDQyxNQUFNLE1BQVAsRUFBZ0JQLFNBQVMsR0FBekIsRUFBOEJRLElBQUksR0FBbEMsRUFBdUNDLFFBQVEsS0FBL0MsRUFEVSxFQUVWLEVBQUNGLE1BQU0sTUFBUCxFQUFnQlAsU0FBUyxHQUF6QixFQUE4QlEsSUFBSSxHQUFsQyxFQUF1Q0MsUUFBUSxJQUEvQyxFQUZVLEVBR1YsRUFBQ0YsTUFBTSxPQUFQLEVBQWdCUCxTQUFTLEdBQXpCLEVBQThCUSxJQUFJLEdBQWxDLEVBQXVDQyxRQUFRLElBQS9DLEVBSFUsRUFJVixFQUFDRixNQUFNLE9BQVAsRUFBZ0JQLFNBQVMsRUFBekIsRUFBOEJRLElBQUksR0FBbEMsRUFBdUNDLFFBQVEsSUFBL0MsRUFKVSxFQUtWLEVBQUNGLE1BQU0sT0FBUCxFQUFnQlAsU0FBUyxHQUF6QixFQUE4QlEsSUFBSSxHQUFsQyxFQUF1Q0MsUUFBUSxJQUEvQyxFQUxVLENBQVo7QUFPQSxVQUFLQyxHQUFMLEdBQVcsQ0FBWDs7QUFFQSxVQUFLQyxhQUFMLEdBQXFCLFVBQVNDLFFBQVQsRUFBbUJDLEtBQW5CLEVBQTBCO0FBQzdDRCxlQUFTRSxRQUFULENBQWtCO0FBQ2hCVCxrQkFBVVEsTUFBTUUsTUFBTixDQUFhQztBQURQLE9BQWxCO0FBR0QsS0FKRDtBQWhCaUI7QUFxQmxCOzs7OzZCQUVRO0FBQUE7O0FBQ1AsbUNBQ2lCLFdBRGpCLHNIQUk2QixLQUFLYixLQUFMLENBQVdDLE9BSnhDLDBCQU9RLEtBQUtFLElBQUwsQ0FBVVAsR0FBVixDQUFjLFVBQUNrQixHQUFELEVBQU1oQixDQUFOLEVBQVk7QUFDeEIscUNBQ2lCLEtBRGpCLDBCQUVvQixRQUZwQixFQUUrQmdCLElBQUlWLElBRm5DLHdFQUlvQixRQUpwQixFQUkrQlUsSUFBSVQsRUFBSixLQUFXLEdBQVgsR0FBaUIsUUFBakIsR0FBNEIsU0FKM0Q7QUFBQSxrQkFLZ0IsTUFMaEI7QUFBQSxxQkFLaUMsZ0NBQWdCLE9BQUtHLGFBQXJCLENBTGpDO0FBQUEsbUJBSytFLE9BQUtSLEtBQUwsQ0FBV0U7QUFMMUY7QUFRRCxPQVRELENBUFIsd0JBa0JxQixLQWxCckIsRUFrQjZCLEtBQUtDLElBQUwsQ0FBVVksTUFBVixDQUFpQixVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUFFLFlBQUlDLElBQUlGLENBQVIsQ0FBV0UsRUFBRVosTUFBRixJQUFZVyxFQUFFWCxNQUFkLENBQXNCLE9BQU9ZLENBQVA7QUFBVSxPQUF4RSxFQUEwRVosTUFsQnZHO0FBc0JEOzs7Ozs7QUFHSCxrQkFBUWEsTUFBUixpQkFDRyxHQURILEdBRUVDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FGRixFOzs7Ozs7OytDQ3hEQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsU0FBUztBQUM1RDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUIsc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFO0FBQy9FO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7QUM1UEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQ0FBb0M7QUFDL0MsV0FBVyxRQUFRO0FBQ25CLFdBQVcsSUFBSSxPQUFPLEVBQUU7QUFDeEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNUZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuR0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2R0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsV0FBVyxTQUFTO0FBQ3BCLGNBQWM7QUFDZDtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7Ozs7Ozs7OytDQ1hBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxTQUFTO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN2TUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM1SEE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pGQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OytDQzNFQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDUyMGE0NjJmZmI5MWMyMzgxNDAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QnKTtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8tc2hhcmVkL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL2NvcmUvb3B0aW9uc1wiKTtcclxudmFyIFZOb2Rlc18xID0gcmVxdWlyZShcIi4uL2NvcmUvVk5vZGVzXCIpO1xyXG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XHJcbnZhciBtb3VudGluZ18xID0gcmVxdWlyZShcIi4vbW91bnRpbmdcIik7XHJcbnZhciB1bm1vdW50aW5nXzEgPSByZXF1aXJlKFwiLi91bm1vdW50aW5nXCIpO1xyXG4vLyBXZSBuZWVkIEVNUFRZX09CSiBkZWZpbmVkIGluIG9uZSBwbGFjZS5cclxuLy8gSXRzIHVzZWQgZm9yIGNvbXBhcmlzb24gc28gd2UgY2FudCBpbmxpbmUgaXQgaW50byBzaGFyZWRcclxuZXhwb3J0cy5FTVBUWV9PQkogPSB7fTtcclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgIE9iamVjdC5mcmVlemUoZXhwb3J0cy5FTVBUWV9PQkopO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZUNsYXNzQ29tcG9uZW50SW5zdGFuY2Uodk5vZGUsIENvbXBvbmVudCwgcHJvcHMsIGNvbnRleHQsIGlzU1ZHLCBsaWZlY3ljbGUpIHtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGNvbnRleHQpKSB7XHJcbiAgICAgICAgY29udGV4dCA9IGV4cG9ydHMuRU1QVFlfT0JKOyAvLyBDb250ZXh0IHNob3VsZCBub3QgYmUgbXV0YWJsZVxyXG4gICAgfVxyXG4gICAgdmFyIGluc3RhbmNlID0gbmV3IENvbXBvbmVudChwcm9wcywgY29udGV4dCk7XHJcbiAgICB2Tm9kZS5jaGlsZHJlbiA9IGluc3RhbmNlO1xyXG4gICAgaW5zdGFuY2UuX2Jsb2NrU2V0U3RhdGUgPSBmYWxzZTtcclxuICAgIGluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgaWYgKGluc3RhbmNlLnByb3BzID09PSBleHBvcnRzLkVNUFRZX09CSikge1xyXG4gICAgICAgIGluc3RhbmNlLnByb3BzID0gcHJvcHM7XHJcbiAgICB9XHJcbiAgICAvLyBzZXRTdGF0ZSBjYWxsYmFja3MgbXVzdCBmaXJlIGFmdGVyIHJlbmRlciBpcyBkb25lIHdoZW4gY2FsbGVkIGZyb20gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyBvciBjb21wb25lbnRXaWxsTW91bnRcclxuICAgIGluc3RhbmNlLl9saWZlY3ljbGUgPSBsaWZlY3ljbGU7XHJcbiAgICBpbnN0YW5jZS5fdW5tb3VudGVkID0gZmFsc2U7XHJcbiAgICBpbnN0YW5jZS5fcGVuZGluZ1NldFN0YXRlID0gdHJ1ZTtcclxuICAgIGluc3RhbmNlLl9pc1NWRyA9IGlzU1ZHO1xyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGluc3RhbmNlLmNvbXBvbmVudFdpbGxNb3VudCkpIHtcclxuICAgICAgICBpbnN0YW5jZS5fYmxvY2tSZW5kZXIgPSB0cnVlO1xyXG4gICAgICAgIGluc3RhbmNlLmNvbXBvbmVudFdpbGxNb3VudCgpO1xyXG4gICAgICAgIGluc3RhbmNlLl9ibG9ja1JlbmRlciA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGNoaWxkQ29udGV4dDtcclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChpbnN0YW5jZS5nZXRDaGlsZENvbnRleHQpKSB7XHJcbiAgICAgICAgY2hpbGRDb250ZXh0ID0gaW5zdGFuY2UuZ2V0Q2hpbGRDb250ZXh0KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNoaWxkQ29udGV4dCkpIHtcclxuICAgICAgICBpbnN0YW5jZS5fY2hpbGRDb250ZXh0ID0gY29udGV4dDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGluc3RhbmNlLl9jaGlsZENvbnRleHQgPSBpbmZlcm5vX3NoYXJlZF8xLmNvbWJpbmVGcm9tKGNvbnRleHQsIGNoaWxkQ29udGV4dCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKG9wdGlvbnNfMS5vcHRpb25zLmJlZm9yZVJlbmRlcikpIHtcclxuICAgICAgICBvcHRpb25zXzEub3B0aW9ucy5iZWZvcmVSZW5kZXIoaW5zdGFuY2UpO1xyXG4gICAgfVxyXG4gICAgdmFyIGlucHV0ID0gaW5zdGFuY2UucmVuZGVyKHByb3BzLCBpbnN0YW5jZS5zdGF0ZSwgY29udGV4dCk7XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKG9wdGlvbnNfMS5vcHRpb25zLmFmdGVyUmVuZGVyKSkge1xyXG4gICAgICAgIG9wdGlvbnNfMS5vcHRpb25zLmFmdGVyUmVuZGVyKGluc3RhbmNlKTtcclxuICAgIH1cclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkoaW5wdXQpKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCdhIHZhbGlkIEluZmVybm8gVk5vZGUgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBhIGNvbXBvbmVudCByZW5kZXIuIFlvdSBtYXkgaGF2ZSByZXR1cm5lZCBhbiBhcnJheSBvciBhbiBpbnZhbGlkIG9iamVjdC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChpbnB1dCkpIHtcclxuICAgICAgICBpbnB1dCA9IFZOb2Rlc18xLmNyZWF0ZVZvaWRWTm9kZSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKGlucHV0KSkge1xyXG4gICAgICAgIGlucHV0ID0gVk5vZGVzXzEuY3JlYXRlVGV4dFZOb2RlKGlucHV0LCBudWxsKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChpbnB1dC5kb20pIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShpbnB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbnB1dC5mbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIGFuIGlucHV0IHRoYXQgaXMgYWxzbyBhIGNvbXBvbmVudCwgd2UgcnVuIGludG8gYSB0cmlja3kgc2l0dWF0aW9uXHJcbiAgICAgICAgICAgIC8vIHdoZXJlIHRoZSByb290IHZOb2RlIG5lZWRzIHRvIGFsd2F5cyBoYXZlIHRoZSBjb3JyZWN0IERPTSBlbnRyeVxyXG4gICAgICAgICAgICAvLyBzbyB3ZSBicmVhayBtb25vbW9ycGhpc20gb24gb3VyIGlucHV0IGFuZCBzdXBwbHkgaXQgb3VyIHZOb2RlIGFzIHBhcmVudFZOb2RlXHJcbiAgICAgICAgICAgIC8vIHdlIGNhbiBvcHRpbWlzZSB0aGlzIGluIHRoZSBmdXR1cmUsIGJ1dCB0aGlzIGdldHMgdXMgb3V0IG9mIGEgbG90IG9mIGlzc3Vlc1xyXG4gICAgICAgICAgICBpbnB1dC5wYXJlbnRWTm9kZSA9IHZOb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluc3RhbmNlLl9wZW5kaW5nU2V0U3RhdGUgPSBmYWxzZTtcclxuICAgIGluc3RhbmNlLl9sYXN0SW5wdXQgPSBpbnB1dDtcclxuICAgIHJldHVybiBpbnN0YW5jZTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZUNsYXNzQ29tcG9uZW50SW5zdGFuY2UgPSBjcmVhdGVDbGFzc0NvbXBvbmVudEluc3RhbmNlO1xyXG5mdW5jdGlvbiByZXBsYWNlTGFzdENoaWxkQW5kVW5tb3VudChsYXN0SW5wdXQsIG5leHRJbnB1dCwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZykge1xyXG4gICAgcmVwbGFjZVZOb2RlKHBhcmVudERvbSwgbW91bnRpbmdfMS5tb3VudChuZXh0SW5wdXQsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpLCBsYXN0SW5wdXQsIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG59XHJcbmV4cG9ydHMucmVwbGFjZUxhc3RDaGlsZEFuZFVubW91bnQgPSByZXBsYWNlTGFzdENoaWxkQW5kVW5tb3VudDtcclxuZnVuY3Rpb24gcmVwbGFjZVZOb2RlKHBhcmVudERvbSwgZG9tLCB2Tm9kZSwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZykge1xyXG4gICAgdW5tb3VudGluZ18xLnVubW91bnQodk5vZGUsIG51bGwsIGxpZmVjeWNsZSwgZmFsc2UsIGlzUmVjeWNsaW5nKTtcclxuICAgIHJlcGxhY2VDaGlsZChwYXJlbnREb20sIGRvbSwgdk5vZGUuZG9tKTtcclxufVxyXG5leHBvcnRzLnJlcGxhY2VWTm9kZSA9IHJlcGxhY2VWTm9kZTtcclxuZnVuY3Rpb24gY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudElucHV0KHZOb2RlLCBjb21wb25lbnQsIHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICB2YXIgaW5wdXQgPSBjb21wb25lbnQocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShpbnB1dCkpIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ2EgdmFsaWQgSW5mZXJubyBWTm9kZSAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZCBmcm9tIGEgY29tcG9uZW50IHJlbmRlci4gWW91IG1heSBoYXZlIHJldHVybmVkIGFuIGFycmF5IG9yIGFuIGludmFsaWQgb2JqZWN0LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGlucHV0KSkge1xyXG4gICAgICAgIGlucHV0ID0gVk5vZGVzXzEuY3JlYXRlVm9pZFZOb2RlKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIoaW5wdXQpKSB7XHJcbiAgICAgICAgaW5wdXQgPSBWTm9kZXNfMS5jcmVhdGVUZXh0Vk5vZGUoaW5wdXQsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGlucHV0LmRvbSkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGlucHV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlucHV0LmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgYW4gaW5wdXQgdGhhdCBpcyBhbHNvIGEgY29tcG9uZW50LCB3ZSBydW4gaW50byBhIHRyaWNreSBzaXR1YXRpb25cclxuICAgICAgICAgICAgLy8gd2hlcmUgdGhlIHJvb3Qgdk5vZGUgbmVlZHMgdG8gYWx3YXlzIGhhdmUgdGhlIGNvcnJlY3QgRE9NIGVudHJ5XHJcbiAgICAgICAgICAgIC8vIHNvIHdlIGJyZWFrIG1vbm9tb3JwaGlzbSBvbiBvdXIgaW5wdXQgYW5kIHN1cHBseSBpdCBvdXIgdk5vZGUgYXMgcGFyZW50Vk5vZGVcclxuICAgICAgICAgICAgLy8gd2UgY2FuIG9wdGltaXNlIHRoaXMgaW4gdGhlIGZ1dHVyZSwgYnV0IHRoaXMgZ2V0cyB1cyBvdXQgb2YgYSBsb3Qgb2YgaXNzdWVzXHJcbiAgICAgICAgICAgIGlucHV0LnBhcmVudFZOb2RlID0gdk5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlucHV0O1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudElucHV0ID0gY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudElucHV0O1xyXG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChkb20sIHRleHQpIHtcclxuICAgIGlmICh0ZXh0ICE9PSAnJykge1xyXG4gICAgICAgIGRvbS50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkb20uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnNldFRleHRDb250ZW50ID0gc2V0VGV4dENvbnRlbnQ7XHJcbmZ1bmN0aW9uIHVwZGF0ZVRleHRDb250ZW50KGRvbSwgdGV4dCkge1xyXG4gICAgZG9tLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gdGV4dDtcclxufVxyXG5leHBvcnRzLnVwZGF0ZVRleHRDb250ZW50ID0gdXBkYXRlVGV4dENvbnRlbnQ7XHJcbmZ1bmN0aW9uIGFwcGVuZENoaWxkKHBhcmVudERvbSwgZG9tKSB7XHJcbiAgICBwYXJlbnREb20uYXBwZW5kQ2hpbGQoZG9tKTtcclxufVxyXG5leHBvcnRzLmFwcGVuZENoaWxkID0gYXBwZW5kQ2hpbGQ7XHJcbmZ1bmN0aW9uIGluc2VydE9yQXBwZW5kKHBhcmVudERvbSwgbmV3Tm9kZSwgbmV4dE5vZGUpIHtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dE5vZGUpKSB7XHJcbiAgICAgICAgYXBwZW5kQ2hpbGQocGFyZW50RG9tLCBuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHBhcmVudERvbS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgbmV4dE5vZGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuaW5zZXJ0T3JBcHBlbmQgPSBpbnNlcnRPckFwcGVuZDtcclxuZnVuY3Rpb24gZG9jdW1lbnRDcmVhdGVFbGVtZW50KHRhZywgaXNTVkcpIHtcclxuICAgIGlmIChpc1NWRyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoY29uc3RhbnRzXzEuc3ZnTlMsIHRhZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50O1xyXG5mdW5jdGlvbiByZXBsYWNlV2l0aE5ld05vZGUobGFzdE5vZGUsIG5leHROb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICB1bm1vdW50aW5nXzEudW5tb3VudChsYXN0Tm9kZSwgbnVsbCwgbGlmZWN5Y2xlLCBmYWxzZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgdmFyIGRvbSA9IG1vdW50aW5nXzEubW91bnQobmV4dE5vZGUsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgbmV4dE5vZGUuZG9tID0gZG9tO1xyXG4gICAgcmVwbGFjZUNoaWxkKHBhcmVudERvbSwgZG9tLCBsYXN0Tm9kZS5kb20pO1xyXG59XHJcbmV4cG9ydHMucmVwbGFjZVdpdGhOZXdOb2RlID0gcmVwbGFjZVdpdGhOZXdOb2RlO1xyXG5mdW5jdGlvbiByZXBsYWNlQ2hpbGQocGFyZW50RG9tLCBuZXh0RG9tLCBsYXN0RG9tKSB7XHJcbiAgICBpZiAoIXBhcmVudERvbSkge1xyXG4gICAgICAgIHBhcmVudERvbSA9IGxhc3REb20ucGFyZW50Tm9kZTtcclxuICAgIH1cclxuICAgIHBhcmVudERvbS5yZXBsYWNlQ2hpbGQobmV4dERvbSwgbGFzdERvbSk7XHJcbn1cclxuZXhwb3J0cy5yZXBsYWNlQ2hpbGQgPSByZXBsYWNlQ2hpbGQ7XHJcbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKHBhcmVudERvbSwgZG9tKSB7XHJcbiAgICBwYXJlbnREb20ucmVtb3ZlQ2hpbGQoZG9tKTtcclxufVxyXG5leHBvcnRzLnJlbW92ZUNoaWxkID0gcmVtb3ZlQ2hpbGQ7XHJcbmZ1bmN0aW9uIHJlbW92ZUFsbENoaWxkcmVuKGRvbSwgY2hpbGRyZW4sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpIHtcclxuICAgIGRvbS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgaWYgKCFvcHRpb25zXzEub3B0aW9ucy5yZWN5Y2xpbmdFbmFibGVkIHx8IChvcHRpb25zXzEub3B0aW9ucy5yZWN5Y2xpbmdFbmFibGVkICYmICFpc1JlY3ljbGluZykpIHtcclxuICAgICAgICByZW1vdmVDaGlsZHJlbihudWxsLCBjaGlsZHJlbiwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVBbGxDaGlsZHJlbiA9IHJlbW92ZUFsbENoaWxkcmVuO1xyXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihkb20sIGNoaWxkcmVuLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICB1bm1vdW50aW5nXzEudW5tb3VudChjaGlsZCwgZG9tLCBsaWZlY3ljbGUsIHRydWUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVDaGlsZHJlbiA9IHJlbW92ZUNoaWxkcmVuO1xyXG5mdW5jdGlvbiBpc0tleWVkKGxhc3RDaGlsZHJlbiwgbmV4dENoaWxkcmVuKSB7XHJcbiAgICByZXR1cm4gbmV4dENoaWxkcmVuLmxlbmd0aCA+IDAgJiYgIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihuZXh0Q2hpbGRyZW5bMF0pICYmICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dENoaWxkcmVuWzBdLmtleSlcclxuICAgICAgICAmJiBsYXN0Q2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGxhc3RDaGlsZHJlblswXSkgJiYgIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihsYXN0Q2hpbGRyZW5bMF0ua2V5KTtcclxufVxyXG5leHBvcnRzLmlzS2V5ZWQgPSBpc0tleWVkO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5mZXJuby9kaXN0L0RPTS91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLm9wdGlvbnMgPSB7XHJcbiAgICBhZnRlck1vdW50OiBudWxsLFxyXG4gICAgYWZ0ZXJSZW5kZXI6IG51bGwsXHJcbiAgICBhZnRlclVwZGF0ZTogbnVsbCxcclxuICAgIGJlZm9yZVJlbmRlcjogbnVsbCxcclxuICAgIGJlZm9yZVVubW91bnQ6IG51bGwsXHJcbiAgICBjcmVhdGVWTm9kZTogbnVsbCxcclxuICAgIGZpbmRET01Ob2RlRW5hYmxlZDogZmFsc2UsXHJcbiAgICByZWN5Y2xpbmdFbmFibGVkOiBmYWxzZSxcclxuICAgIHJvb3RzOiBbXVxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5mZXJuby9kaXN0L2NvcmUvb3B0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vRE9NL3V0aWxzXCIpO1xyXG52YXIgbm9ybWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4vbm9ybWFsaXphdGlvblwiKTtcclxudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuL29wdGlvbnNcIik7XHJcbmZ1bmN0aW9uIFZOb2RlKGNoaWxkcmVuLCBjbGFzc05hbWUsIGZsYWdzLCBrZXksIHByb3BzLCByZWYsIHR5cGUpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuICAgIHRoaXMuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgdGhpcy5kb20gPSBudWxsO1xyXG4gICAgdGhpcy5mbGFncyA9IGZsYWdzO1xyXG4gICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgICB0aGlzLnJlZiA9IHJlZjtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgdmlydHVhbCBub2RlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmbGFnc1xyXG4gKiBAcGFyYW0ge3N0cmluZ3xGdW5jdGlvbnxudWxsfSB0eXBlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bGw9fSBjbGFzc05hbWVcclxuICogQHBhcmFtIHtvYmplY3Q9fSBjaGlsZHJlblxyXG4gKiBAcGFyYW0ge29iamVjdD19IHByb3BzXHJcbiAqIEBwYXJhbSB7Kj19IGtleVxyXG4gKiBAcGFyYW0ge29iamVjdHxGdW5jdGlvbj19IHJlZlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBub05vcm1hbGlzZVxyXG4gKiBAcmV0dXJucyB7Vk5vZGV9IHJldHVybnMgbmV3IHZpcnR1YWwgbm9kZVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlVk5vZGUoZmxhZ3MsIHR5cGUsIGNsYXNzTmFtZSwgY2hpbGRyZW4sIHByb3BzLCBrZXksIHJlZiwgbm9Ob3JtYWxpc2UpIHtcclxuICAgIGlmIChmbGFncyAmIDE2IC8qIENvbXBvbmVudFVua25vd24gKi8pIHtcclxuICAgICAgICBmbGFncyA9IGluZmVybm9fc2hhcmVkXzEuaXNTdGF0ZWZ1bENvbXBvbmVudCh0eXBlKSA/IDQgLyogQ29tcG9uZW50Q2xhc3MgKi8gOiA4IC8qIENvbXBvbmVudEZ1bmN0aW9uICovO1xyXG4gICAgfVxyXG4gICAgdmFyIHZOb2RlID0gbmV3IFZOb2RlKGNoaWxkcmVuID09PSB2b2lkIDAgPyBudWxsIDogY2hpbGRyZW4sIGNsYXNzTmFtZSA9PT0gdm9pZCAwID8gbnVsbCA6IGNsYXNzTmFtZSwgZmxhZ3MsIGtleSA9PT0gdm9pZCAwID8gbnVsbCA6IGtleSwgcHJvcHMgPT09IHZvaWQgMCA/IG51bGwgOiBwcm9wcywgcmVmID09PSB2b2lkIDAgPyBudWxsIDogcmVmLCB0eXBlKTtcclxuICAgIGlmIChub05vcm1hbGlzZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgIG5vcm1hbGl6YXRpb25fMS5ub3JtYWxpemUodk5vZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnNfMS5vcHRpb25zLmNyZWF0ZVZOb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgb3B0aW9uc18xLm9wdGlvbnMuY3JlYXRlVk5vZGUodk5vZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZOb2RlO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlVk5vZGUgPSBjcmVhdGVWTm9kZTtcclxuZnVuY3Rpb24gZGlyZWN0Q2xvbmUodk5vZGVUb0Nsb25lKSB7XHJcbiAgICB2YXIgbmV3Vk5vZGU7XHJcbiAgICB2YXIgZmxhZ3MgPSB2Tm9kZVRvQ2xvbmUuZmxhZ3M7XHJcbiAgICBpZiAoZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSB2b2lkIDA7XHJcbiAgICAgICAgdmFyIHByb3BzVG9DbG9uZSA9IHZOb2RlVG9DbG9uZS5wcm9wcztcclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGwocHJvcHNUb0Nsb25lKSkge1xyXG4gICAgICAgICAgICBwcm9wcyA9IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcHJvcHMgPSB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzVG9DbG9uZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvcHNba2V5XSA9IHByb3BzVG9DbG9uZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld1ZOb2RlID0gY3JlYXRlVk5vZGUoZmxhZ3MsIHZOb2RlVG9DbG9uZS50eXBlLCBudWxsLCBudWxsLCBwcm9wcywgdk5vZGVUb0Nsb25lLmtleSwgdk5vZGVUb0Nsb25lLnJlZiwgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHM7XHJcbiAgICAgICAgdmFyIG5ld0NoaWxkcmVuID0gbmV3UHJvcHMuY2hpbGRyZW47XHJcbiAgICAgICAgLy8gd2UgbmVlZCB0byBhbHNvIGNsb25lIGNvbXBvbmVudCBjaGlsZHJlbiB0aGF0IGFyZSBpbiBwcm9wc1xyXG4gICAgICAgIC8vIGFzIHRoZSBjaGlsZHJlbiBtYXkgYWxzbyBoYXZlIGJlZW4gaG9pc3RlZFxyXG4gICAgICAgIGlmIChuZXdDaGlsZHJlbikge1xyXG4gICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KG5ld0NoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IG5ld0NoaWxkcmVuLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcEFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBuZXdDaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNTdHJpbmdPck51bWJlcihjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChjaGlsZCkgJiYgaXNWTm9kZShjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2goZGlyZWN0Q2xvbmUoY2hpbGQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBuZXdQcm9wcy5jaGlsZHJlbiA9IHRtcEFycmF5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzVk5vZGUobmV3Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdQcm9wcy5jaGlsZHJlbiA9IGRpcmVjdENsb25lKG5ld0NoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWTm9kZS5jaGlsZHJlbiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmbGFncyAmIDM5NzAgLyogRWxlbWVudCAqLykge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHZOb2RlVG9DbG9uZS5jaGlsZHJlbjtcclxuICAgICAgICB2YXIgcHJvcHMgPSB2b2lkIDA7XHJcbiAgICAgICAgdmFyIHByb3BzVG9DbG9uZSA9IHZOb2RlVG9DbG9uZS5wcm9wcztcclxuICAgICAgICBpZiAocHJvcHNUb0Nsb25lID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHByb3BzID0gdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9wcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHNUb0Nsb25lKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wc1trZXldID0gcHJvcHNUb0Nsb25lW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3Vk5vZGUgPSBjcmVhdGVWTm9kZShmbGFncywgdk5vZGVUb0Nsb25lLnR5cGUsIHZOb2RlVG9DbG9uZS5jbGFzc05hbWUsIGNoaWxkcmVuLCBwcm9wcywgdk5vZGVUb0Nsb25lLmtleSwgdk5vZGVUb0Nsb25lLnJlZiwgIWNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZsYWdzICYgMSAvKiBUZXh0ICovKSB7XHJcbiAgICAgICAgbmV3Vk5vZGUgPSBjcmVhdGVUZXh0Vk5vZGUodk5vZGVUb0Nsb25lLmNoaWxkcmVuLCB2Tm9kZVRvQ2xvbmUua2V5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdWTm9kZTtcclxufVxyXG5leHBvcnRzLmRpcmVjdENsb25lID0gZGlyZWN0Q2xvbmU7XHJcbi8qXHJcbiBkaXJlY3RDbG9uZSBpcyBwcmVmZXJyZWQgb3ZlciBjbG9uZVZOb2RlIGFuZCB1c2VkIGludGVybmFsbHkgYWxzby5cclxuIFRoaXMgZnVuY3Rpb24gbWFrZXMgSW5mZXJubyBiYWNrd2FyZHMgY29tcGF0aWJsZS5cclxuIEFuZCBjYW4gYmUgdHJlZS1zaGFrZWQgYnkgbW9kZXJuIGJ1bmRsZXJzXHJcblxyXG4gV291bGQgYmUgbmljZSB0byBjb21iaW5lIHRoaXMgd2l0aCBkaXJlY3RDbG9uZSBidXQgY291bGQgbm90IGRvIGl0IHdpdGhvdXQgYnJlYWtpbmcgY2hhbmdlXHJcbiAqL1xyXG4vKipcclxuICogQ2xvbmVzIGdpdmVuIHZpcnR1YWwgbm9kZSBieSBjcmVhdGluZyBuZXcgaW5zdGFuY2Ugb2YgaXRcclxuICogQHBhcmFtIHtWTm9kZX0gdk5vZGVUb0Nsb25lIHZpcnR1YWwgbm9kZSB0byBiZSBjbG9uZWRcclxuICogQHBhcmFtIHtQcm9wcz19IHByb3BzIGFkZGl0aW9uYWwgcHJvcHMgZm9yIG5ldyB2aXJ0dWFsIG5vZGVcclxuICogQHBhcmFtIHsuLi4qfSBfY2hpbGRyZW4gbmV3IGNoaWxkcmVuIGZvciBuZXcgdmlydHVhbCBub2RlXHJcbiAqIEByZXR1cm5zIHtWTm9kZX0gbmV3IHZpcnR1YWwgbm9kZVxyXG4gKi9cclxuZnVuY3Rpb24gY2xvbmVWTm9kZSh2Tm9kZVRvQ2xvbmUsIHByb3BzKSB7XHJcbiAgICB2YXIgX2NoaWxkcmVuID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIF9jaGlsZHJlbltfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHZhciBjaGlsZHJlbiA9IF9jaGlsZHJlbjtcclxuICAgIHZhciBjaGlsZHJlbkxlbiA9IF9jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICBpZiAoY2hpbGRyZW5MZW4gPiAwICYmICFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKF9jaGlsZHJlblswXSkpIHtcclxuICAgICAgICBpZiAoIXByb3BzKSB7XHJcbiAgICAgICAgICAgIHByb3BzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGlsZHJlbkxlbiA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IF9jaGlsZHJlblswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBuZXdWTm9kZTtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkodk5vZGVUb0Nsb25lKSkge1xyXG4gICAgICAgIHZhciB0bXBBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2Tm9kZVRvQ2xvbmUubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdG1wQXJyYXkucHVzaChkaXJlY3RDbG9uZSh2Tm9kZVRvQ2xvbmVbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3Vk5vZGUgPSB0bXBBcnJheTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBmbGFncyA9IHZOb2RlVG9DbG9uZS5mbGFncztcclxuICAgICAgICB2YXIgY2xhc3NOYW1lID0gdk5vZGVUb0Nsb25lLmNsYXNzTmFtZSB8fCAocHJvcHMgJiYgcHJvcHMuY2xhc3NOYW1lKTtcclxuICAgICAgICB2YXIga2V5ID0gIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZih2Tm9kZVRvQ2xvbmUua2V5KSA/IHZOb2RlVG9DbG9uZS5rZXkgOiAocHJvcHMgPyBwcm9wcy5rZXkgOiBudWxsKTtcclxuICAgICAgICB2YXIgcmVmID0gdk5vZGVUb0Nsb25lLnJlZiB8fCAocHJvcHMgPyBwcm9wcy5yZWYgOiBudWxsKTtcclxuICAgICAgICBpZiAoZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pIHtcclxuICAgICAgICAgICAgbmV3Vk5vZGUgPSBjcmVhdGVWTm9kZShmbGFncywgdk5vZGVUb0Nsb25lLnR5cGUsIGNsYXNzTmFtZSwgbnVsbCwgKCF2Tm9kZVRvQ2xvbmUucHJvcHMgJiYgIXByb3BzKSA/IHV0aWxzXzEuRU1QVFlfT0JKIDogaW5mZXJub19zaGFyZWRfMS5jb21iaW5lRnJvbSh2Tm9kZVRvQ2xvbmUucHJvcHMsIHByb3BzKSwga2V5LCByZWYsIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgbmV3UHJvcHMgPSBuZXdWTm9kZS5wcm9wcztcclxuICAgICAgICAgICAgaWYgKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3Q2hpbGRyZW4gPSBuZXdQcm9wcy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gYWxzbyBjbG9uZSBjb21wb25lbnQgY2hpbGRyZW4gdGhhdCBhcmUgaW4gcHJvcHNcclxuICAgICAgICAgICAgICAgIC8vIGFzIHRoZSBjaGlsZHJlbiBtYXkgYWxzbyBoYXZlIGJlZW4gaG9pc3RlZFxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0NoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShuZXdDaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiA9IG5ld0NoaWxkcmVuLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0bXBBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IG5ld0NoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQoY2hpbGQpICYmIGlzVk5vZGUoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2goZGlyZWN0Q2xvbmUoY2hpbGQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQcm9wcy5jaGlsZHJlbiA9IHRtcEFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzVk5vZGUobmV3Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Byb3BzLmNoaWxkcmVuID0gZGlyZWN0Q2xvbmUobmV3Q2hpbGRyZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdWTm9kZS5jaGlsZHJlbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZsYWdzICYgMzk3MCAvKiBFbGVtZW50ICovKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gKHByb3BzICYmICFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHByb3BzLmNoaWxkcmVuKSkgPyBwcm9wcy5jaGlsZHJlbiA6IHZOb2RlVG9DbG9uZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgbmV3Vk5vZGUgPSBjcmVhdGVWTm9kZShmbGFncywgdk5vZGVUb0Nsb25lLnR5cGUsIGNsYXNzTmFtZSwgY2hpbGRyZW4sICghdk5vZGVUb0Nsb25lLnByb3BzICYmICFwcm9wcykgPyB1dGlsc18xLkVNUFRZX09CSiA6IGluZmVybm9fc2hhcmVkXzEuY29tYmluZUZyb20odk5vZGVUb0Nsb25lLnByb3BzLCBwcm9wcyksIGtleSwgcmVmLCAhY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmbGFncyAmIDEgLyogVGV4dCAqLykge1xyXG4gICAgICAgICAgICBuZXdWTm9kZSA9IGNyZWF0ZVRleHRWTm9kZSh2Tm9kZVRvQ2xvbmUuY2hpbGRyZW4sIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1ZOb2RlO1xyXG59XHJcbmV4cG9ydHMuY2xvbmVWTm9kZSA9IGNsb25lVk5vZGU7XHJcbmZ1bmN0aW9uIGNyZWF0ZVZvaWRWTm9kZSgpIHtcclxuICAgIHJldHVybiBjcmVhdGVWTm9kZSg0MDk2IC8qIFZvaWQgKi8sIG51bGwpO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlVm9pZFZOb2RlID0gY3JlYXRlVm9pZFZOb2RlO1xyXG5mdW5jdGlvbiBjcmVhdGVUZXh0Vk5vZGUodGV4dCwga2V5KSB7XHJcbiAgICByZXR1cm4gY3JlYXRlVk5vZGUoMSAvKiBUZXh0ICovLCBudWxsLCBudWxsLCB0ZXh0LCBudWxsLCBrZXkpO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlVGV4dFZOb2RlID0gY3JlYXRlVGV4dFZOb2RlO1xyXG5mdW5jdGlvbiBpc1ZOb2RlKG8pIHtcclxuICAgIHJldHVybiAhIW8uZmxhZ3M7XHJcbn1cclxuZXhwb3J0cy5pc1ZOb2RlID0gaXNWTm9kZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8vZGlzdC9jb3JlL1ZOb2Rlcy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL29wdGlvbnNcIik7XHJcbnZhciBWTm9kZXNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL1ZOb2Rlc1wiKTtcclxudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xyXG52YXIgZGVsZWdhdGlvbl8xID0gcmVxdWlyZShcIi4vZXZlbnRzL2RlbGVnYXRpb25cIik7XHJcbnZhciBtb3VudGluZ18xID0gcmVxdWlyZShcIi4vbW91bnRpbmdcIik7XHJcbnZhciByZW5kZXJpbmdfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmluZ1wiKTtcclxudmFyIHVubW91bnRpbmdfMSA9IHJlcXVpcmUoXCIuL3VubW91bnRpbmdcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbnZhciBwcm9jZXNzRWxlbWVudF8xID0gcmVxdWlyZShcIi4vd3JhcHBlcnMvcHJvY2Vzc0VsZW1lbnRcIik7XHJcbmZ1bmN0aW9uIHBhdGNoKGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICBpZiAobGFzdFZOb2RlICE9PSBuZXh0Vk5vZGUpIHtcclxuICAgICAgICB2YXIgbGFzdEZsYWdzID0gbGFzdFZOb2RlLmZsYWdzO1xyXG4gICAgICAgIHZhciBuZXh0RmxhZ3MgPSBuZXh0Vk5vZGUuZmxhZ3M7XHJcbiAgICAgICAgaWYgKG5leHRGbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgICAgICBpZiAobGFzdEZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRjaENvbXBvbmVudChsYXN0Vk5vZGUsIG5leHRWTm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBuZXh0RmxhZ3MgJiA0IC8qIENvbXBvbmVudENsYXNzICovLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLnJlcGxhY2VWTm9kZShwYXJlbnREb20sIG1vdW50aW5nXzEubW91bnRDb21wb25lbnQobmV4dFZOb2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCAobmV4dEZsYWdzICYgNCAvKiBDb21wb25lbnRDbGFzcyAqLykgPiAwKSwgbGFzdFZOb2RlLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXh0RmxhZ3MgJiAzOTcwIC8qIEVsZW1lbnQgKi8pIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGbGFncyAmIDM5NzAgLyogRWxlbWVudCAqLykge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hFbGVtZW50KGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEucmVwbGFjZVZOb2RlKHBhcmVudERvbSwgbW91bnRpbmdfMS5tb3VudEVsZW1lbnQobmV4dFZOb2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSwgbGFzdFZOb2RlLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXh0RmxhZ3MgJiAxIC8qIFRleHQgKi8pIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGbGFncyAmIDEgLyogVGV4dCAqLykge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hUZXh0KGxhc3RWTm9kZSwgbmV4dFZOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEucmVwbGFjZVZOb2RlKHBhcmVudERvbSwgbW91bnRpbmdfMS5tb3VudFRleHQobmV4dFZOb2RlLCBudWxsKSwgbGFzdFZOb2RlLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXh0RmxhZ3MgJiA0MDk2IC8qIFZvaWQgKi8pIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGbGFncyAmIDQwOTYgLyogVm9pZCAqLykge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hWb2lkKGxhc3RWTm9kZSwgbmV4dFZOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEucmVwbGFjZVZOb2RlKHBhcmVudERvbSwgbW91bnRpbmdfMS5tb3VudFZvaWQobmV4dFZOb2RlLCBudWxsKSwgbGFzdFZOb2RlLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gRXJyb3IgY2FzZTogbW91bnQgbmV3IG9uZSByZXBsYWNpbmcgb2xkIG9uZVxyXG4gICAgICAgICAgICB1dGlsc18xLnJlcGxhY2VMYXN0Q2hpbGRBbmRVbm1vdW50KGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wYXRjaCA9IHBhdGNoO1xyXG5mdW5jdGlvbiB1bm1vdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZykge1xyXG4gICAgaWYgKFZOb2Rlc18xLmlzVk5vZGUoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdW5tb3VudGluZ18xLnVubW91bnQoY2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCB0cnVlLCBpc1JlY3ljbGluZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdXRpbHNfMS5yZW1vdmVBbGxDaGlsZHJlbihkb20sIGNoaWxkcmVuLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGRvbS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHBhdGNoRWxlbWVudChsYXN0Vk5vZGUsIG5leHRWTm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZykge1xyXG4gICAgdmFyIG5leHRUYWcgPSBuZXh0Vk5vZGUudHlwZTtcclxuICAgIHZhciBsYXN0VGFnID0gbGFzdFZOb2RlLnR5cGU7XHJcbiAgICBpZiAobGFzdFRhZyAhPT0gbmV4dFRhZykge1xyXG4gICAgICAgIHV0aWxzXzEucmVwbGFjZVdpdGhOZXdOb2RlKGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBkb20gPSBsYXN0Vk5vZGUuZG9tO1xyXG4gICAgICAgIHZhciBsYXN0UHJvcHMgPSBsYXN0Vk5vZGUucHJvcHM7XHJcbiAgICAgICAgdmFyIG5leHRQcm9wcyA9IG5leHRWTm9kZS5wcm9wcztcclxuICAgICAgICB2YXIgbGFzdENoaWxkcmVuID0gbGFzdFZOb2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIHZhciBuZXh0Q2hpbGRyZW4gPSBuZXh0Vk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgdmFyIGxhc3RGbGFncyA9IGxhc3RWTm9kZS5mbGFncztcclxuICAgICAgICB2YXIgbmV4dEZsYWdzID0gbmV4dFZOb2RlLmZsYWdzO1xyXG4gICAgICAgIHZhciBuZXh0UmVmID0gbmV4dFZOb2RlLnJlZjtcclxuICAgICAgICB2YXIgbGFzdENsYXNzTmFtZSA9IGxhc3RWTm9kZS5jbGFzc05hbWU7XHJcbiAgICAgICAgdmFyIG5leHRDbGFzc05hbWUgPSBuZXh0Vk5vZGUuY2xhc3NOYW1lO1xyXG4gICAgICAgIG5leHRWTm9kZS5kb20gPSBkb207XHJcbiAgICAgICAgaXNTVkcgPSBpc1NWRyB8fCAobmV4dEZsYWdzICYgMTI4IC8qIFN2Z0VsZW1lbnQgKi8pID4gMDtcclxuICAgICAgICBpZiAobGFzdENoaWxkcmVuICE9PSBuZXh0Q2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgcGF0Y2hDaGlsZHJlbihsYXN0RmxhZ3MsIG5leHRGbGFncywgbGFzdENoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbmxpbmVkIHBhdGNoUHJvcHMgIC0tIHN0YXJ0cyAtLVxyXG4gICAgICAgIGlmIChsYXN0UHJvcHMgIT09IG5leHRQcm9wcykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFByb3BzT3JFbXB0eSA9IGxhc3RQcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgICAgICAgICAgdmFyIG5leHRQcm9wc09yRW1wdHkgPSBuZXh0UHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICAgICAgICAgIHZhciBoYXNDb250cm9sbGVkVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG5leHRQcm9wc09yRW1wdHkgIT09IHV0aWxzXzEuRU1QVFlfT0JKKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNGb3JtRWxlbWVudCA9IChuZXh0RmxhZ3MgJiAzNTg0IC8qIEZvcm1FbGVtZW50ICovKSA+IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGb3JtRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0NvbnRyb2xsZWRWYWx1ZSA9IHByb2Nlc3NFbGVtZW50XzEuaXNDb250cm9sbGVkRm9ybUVsZW1lbnQobmV4dFByb3BzT3JFbXB0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG5leHRQcm9wc09yRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3QgYWRkIGEgaGFzT3duUHJvcGVydHkgY2hlY2sgaGVyZSwgaXQgYWZmZWN0cyBwZXJmb3JtYW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0VmFsdWUgPSBuZXh0UHJvcHNPckVtcHR5W3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VmFsdWUgPSBsYXN0UHJvcHNPckVtcHR5W3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGNoUHJvcChwcm9wLCBsYXN0VmFsdWUsIG5leHRWYWx1ZSwgZG9tLCBpc1NWRywgaGFzQ29udHJvbGxlZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0Zvcm1FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiBpbmZlcm5vIGlzIHJlY3ljbGluZyBmb3JtIGVsZW1lbnQsIHdlIG5lZWQgdG8gcHJvY2VzcyBpdCBsaWtlIGl0IHdvdWxkIGJlIG1vdW50aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0VsZW1lbnRfMS5wcm9jZXNzRWxlbWVudChuZXh0RmxhZ3MsIG5leHRWTm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBpc1JlY3ljbGluZywgaGFzQ29udHJvbGxlZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGFzdFByb3BzT3JFbXB0eSAhPT0gdXRpbHNfMS5FTVBUWV9PQkopIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gbGFzdFByb3BzT3JFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBhZGQgYSBoYXNPd25Qcm9wZXJ0eSBjaGVjayBoZXJlLCBpdCBhZmZlY3RzIHBlcmZvcm1hbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihuZXh0UHJvcHNPckVtcHR5W3Byb3BdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVQcm9wKHByb3AsIGxhc3RQcm9wc09yRW1wdHlbcHJvcF0sIGRvbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlubGluZWQgcGF0Y2hQcm9wcyAgLS0gZW5kcyAtLVxyXG4gICAgICAgIGlmIChsYXN0Q2xhc3NOYW1lICE9PSBuZXh0Q2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dENsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTVkcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKCdjbGFzcycsIG5leHRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmNsYXNzTmFtZSA9IG5leHRDbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5leHRSZWYpIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RWTm9kZS5yZWYgIT09IG5leHRSZWYgfHwgaXNSZWN5Y2xpbmcpIHtcclxuICAgICAgICAgICAgICAgIG1vdW50aW5nXzEubW91bnRSZWYoZG9tLCBuZXh0UmVmLCBsaWZlY3ljbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucGF0Y2hFbGVtZW50ID0gcGF0Y2hFbGVtZW50O1xyXG5mdW5jdGlvbiBwYXRjaENoaWxkcmVuKGxhc3RGbGFncywgbmV4dEZsYWdzLCBsYXN0Q2hpbGRyZW4sIG5leHRDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZykge1xyXG4gICAgdmFyIHBhdGNoQXJyYXkgPSBmYWxzZTtcclxuICAgIHZhciBwYXRjaEtleWVkID0gZmFsc2U7XHJcbiAgICBpZiAobmV4dEZsYWdzICYgNjQgLyogSGFzTm9uS2V5ZWRDaGlsZHJlbiAqLykge1xyXG4gICAgICAgIHBhdGNoQXJyYXkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKGxhc3RGbGFncyAmIDMyIC8qIEhhc0tleWVkQ2hpbGRyZW4gKi8pID4gMCAmJiAobmV4dEZsYWdzICYgMzIgLyogSGFzS2V5ZWRDaGlsZHJlbiAqLykgPiAwKSB7XHJcbiAgICAgICAgcGF0Y2hLZXllZCA9IHRydWU7XHJcbiAgICAgICAgcGF0Y2hBcnJheSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChuZXh0Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdW5tb3VudENoaWxkcmVuKGxhc3RDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGxhc3RDaGlsZHJlbikpIHtcclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKG5leHRDaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgdXRpbHNfMS5zZXRUZXh0Q29udGVudChkb20sIG5leHRDaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KG5leHRDaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgICAgIG1vdW50aW5nXzEubW91bnRBcnJheUNoaWxkcmVuKG5leHRDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vdW50aW5nXzEubW91bnQobmV4dENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKG5leHRDaGlsZHJlbikpIHtcclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKGxhc3RDaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgdXRpbHNfMS51cGRhdGVUZXh0Q29udGVudChkb20sIG5leHRDaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1bm1vdW50Q2hpbGRyZW4obGFzdENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICB1dGlsc18xLnNldFRleHRDb250ZW50KGRvbSwgbmV4dENoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkobmV4dENoaWxkcmVuKSkge1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkobGFzdENoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBwYXRjaEFycmF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHV0aWxzXzEuaXNLZXllZChsYXN0Q2hpbGRyZW4sIG5leHRDaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgICAgIHBhdGNoS2V5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1bm1vdW50Q2hpbGRyZW4obGFzdENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICBtb3VudGluZ18xLm1vdW50QXJyYXlDaGlsZHJlbihuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KGxhc3RDaGlsZHJlbikpIHtcclxuICAgICAgICB1dGlsc18xLnJlbW92ZUFsbENoaWxkcmVuKGRvbSwgbGFzdENoaWxkcmVuLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICBtb3VudGluZ18xLm1vdW50KG5leHRDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFZOb2Rlc18xLmlzVk5vZGUobmV4dENoaWxkcmVuKSkge1xyXG4gICAgICAgIGlmIChWTm9kZXNfMS5pc1ZOb2RlKGxhc3RDaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgcGF0Y2gobGFzdENoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdW5tb3VudENoaWxkcmVuKGxhc3RDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgbW91bnRpbmdfMS5tb3VudChuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhdGNoQXJyYXkpIHtcclxuICAgICAgICBpZiAocGF0Y2hLZXllZCkge1xyXG4gICAgICAgICAgICBwYXRjaEtleWVkQ2hpbGRyZW4obGFzdENoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGF0Y2hOb25LZXllZENoaWxkcmVuKGxhc3RDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcGF0Y2hDb21wb25lbnQobGFzdFZOb2RlLCBuZXh0Vk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNDbGFzcywgaXNSZWN5Y2xpbmcpIHtcclxuICAgIHZhciBsYXN0VHlwZSA9IGxhc3RWTm9kZS50eXBlO1xyXG4gICAgdmFyIG5leHRUeXBlID0gbmV4dFZOb2RlLnR5cGU7XHJcbiAgICB2YXIgbGFzdEtleSA9IGxhc3RWTm9kZS5rZXk7XHJcbiAgICB2YXIgbmV4dEtleSA9IG5leHRWTm9kZS5rZXk7XHJcbiAgICBpZiAobGFzdFR5cGUgIT09IG5leHRUeXBlIHx8IGxhc3RLZXkgIT09IG5leHRLZXkpIHtcclxuICAgICAgICB1dGlsc18xLnJlcGxhY2VXaXRoTmV3Tm9kZShsYXN0Vk5vZGUsIG5leHRWTm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIG5leHRQcm9wcyA9IG5leHRWTm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgICAgICBpZiAoaXNDbGFzcykge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBsYXN0Vk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGluc3RhbmNlLl91cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5fdW5tb3VudGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGwocGFyZW50RG9tKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5yZXBsYWNlQ2hpbGQocGFyZW50RG9tLCBtb3VudGluZ18xLm1vdW50Q29tcG9uZW50KG5leHRWTm9kZSwgbnVsbCwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgKG5leHRWTm9kZS5mbGFncyAmIDQgLyogQ29tcG9uZW50Q2xhc3MgKi8pID4gMCksIGxhc3RWTm9kZS5kb20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc0NvbXBvbmVudERpZFVwZGF0ZSA9ICFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGluc3RhbmNlLmNvbXBvbmVudERpZFVwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gaW5zdGFuY2Uuc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAvLyBXaGVuIGNvbXBvbmVudCBoYXMgY29tcG9uZW50RGlkVXBkYXRlIGhvb2ssIHdlIG5lZWQgdG8gY2xvbmUgbGFzdFN0YXRlIG9yIHdpbGwgYmUgbW9kaWZpZWQgYnkgcmVmZXJlbmNlIGR1cmluZyB1cGRhdGVcclxuICAgICAgICAgICAgICAgIHZhciBsYXN0U3RhdGUgPSBoYXNDb21wb25lbnREaWRVcGRhdGUgPyBpbmZlcm5vX3NoYXJlZF8xLmNvbWJpbmVGcm9tKG5leHRTdGF0ZSwgbnVsbCkgOiBuZXh0U3RhdGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFzdFByb3BzID0gaW5zdGFuY2UucHJvcHM7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRDb250ZXh0ID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGluc3RhbmNlLmdldENoaWxkQ29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRleHQgPSBpbnN0YW5jZS5nZXRDaGlsZENvbnRleHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5leHRWTm9kZS5jaGlsZHJlbiA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuX2lzU1ZHID0gaXNTVkc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNoaWxkQ29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDb250ZXh0ID0gaW5mZXJub19zaGFyZWRfMS5jb21iaW5lRnJvbShjb250ZXh0LCBjaGlsZENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RJbnB1dCA9IGluc3RhbmNlLl9sYXN0SW5wdXQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dElucHV0ID0gaW5zdGFuY2UuX3VwZGF0ZUNvbXBvbmVudChsYXN0U3RhdGUsIG5leHRTdGF0ZSwgbGFzdFByb3BzLCBuZXh0UHJvcHMsIGNvbnRleHQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLl9jaGlsZENvbnRleHQgPSBjaGlsZENvbnRleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQobmV4dElucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJbnB1dCA9IFZOb2Rlc18xLmNyZWF0ZVZvaWRWTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobmV4dElucHV0ID09PSBpbmZlcm5vX3NoYXJlZF8xLk5PX09QKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dElucHV0ID0gbGFzdElucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZFVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0SW5wdXQgPSBWTm9kZXNfMS5jcmVhdGVUZXh0Vk5vZGUobmV4dElucHV0LCBudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShuZXh0SW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCdhIHZhbGlkIEluZmVybm8gVk5vZGUgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBhIGNvbXBvbmVudCByZW5kZXIuIFlvdSBtYXkgaGF2ZSByZXR1cm5lZCBhbiBhcnJheSBvciBhbiBpbnZhbGlkIG9iamVjdC4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzT2JqZWN0KG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKG5leHRJbnB1dC5kb20pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRJbnB1dCA9IFZOb2Rlc18xLmRpcmVjdENsb25lKG5leHRJbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5leHRJbnB1dC5mbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJbnB1dC5wYXJlbnRWTm9kZSA9IG5leHRWTm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxhc3RJbnB1dC5mbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RJbnB1dC5wYXJlbnRWTm9kZSA9IG5leHRWTm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLl9sYXN0SW5wdXQgPSBuZXh0SW5wdXQ7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5fdk5vZGUgPSBuZXh0Vk5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlkVXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2gobGFzdElucHV0LCBuZXh0SW5wdXQsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjaGlsZENvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0NvbXBvbmVudERpZFVwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jb21wb25lbnREaWRVcGRhdGUobGFzdFByb3BzLCBsYXN0U3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKG9wdGlvbnNfMS5vcHRpb25zLmFmdGVyVXBkYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zXzEub3B0aW9ucy5hZnRlclVwZGF0ZShuZXh0Vk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uc18xLm9wdGlvbnMuZmluZERPTU5vZGVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmluZ18xLmNvbXBvbmVudFRvRE9NTm9kZU1hcC5zZXQoaW5zdGFuY2UsIG5leHRJbnB1dC5kb20pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5leHRWTm9kZS5kb20gPSBuZXh0SW5wdXQuZG9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluc3RhbmNlLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBsYXN0UHJvcHMgPSBsYXN0Vk5vZGUucHJvcHM7XHJcbiAgICAgICAgICAgIHZhciBuZXh0SG9va3MgPSBuZXh0Vk5vZGUucmVmO1xyXG4gICAgICAgICAgICB2YXIgbmV4dEhvb2tzRGVmaW5lZCA9ICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dEhvb2tzKTtcclxuICAgICAgICAgICAgdmFyIGxhc3RJbnB1dCA9IGxhc3RWTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgdmFyIG5leHRJbnB1dCA9IGxhc3RJbnB1dDtcclxuICAgICAgICAgICAgbmV4dFZOb2RlLmRvbSA9IGxhc3RWTm9kZS5kb207XHJcbiAgICAgICAgICAgIG5leHRWTm9kZS5jaGlsZHJlbiA9IGxhc3RJbnB1dDtcclxuICAgICAgICAgICAgaWYgKGxhc3RLZXkgIT09IG5leHRLZXkpIHtcclxuICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dEhvb2tzRGVmaW5lZCAmJiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRIb29rcy5vbkNvbXBvbmVudFNob3VsZFVwZGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSBuZXh0SG9va3Mub25Db21wb25lbnRTaG91bGRVcGRhdGUobGFzdFByb3BzLCBuZXh0UHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGUgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dEhvb2tzRGVmaW5lZCAmJiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRIb29rcy5vbkNvbXBvbmVudFdpbGxVcGRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEhvb2tzLm9uQ29tcG9uZW50V2lsbFVwZGF0ZShsYXN0UHJvcHMsIG5leHRQcm9wcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuZXh0SW5wdXQgPSBuZXh0VHlwZShuZXh0UHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0SW5wdXQgPSBWTm9kZXNfMS5jcmVhdGVWb2lkVk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNTdHJpbmdPck51bWJlcihuZXh0SW5wdXQpICYmIG5leHRJbnB1dCAhPT0gaW5mZXJub19zaGFyZWRfMS5OT19PUCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJbnB1dCA9IFZOb2Rlc18xLmNyZWF0ZVRleHRWTm9kZShuZXh0SW5wdXQsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ2EgdmFsaWQgSW5mZXJubyBWTm9kZSAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZCBmcm9tIGEgY29tcG9uZW50IHJlbmRlci4gWW91IG1heSBoYXZlIHJldHVybmVkIGFuIGFycmF5IG9yIGFuIGludmFsaWQgb2JqZWN0LicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNPYmplY3QobmV4dElucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGwobmV4dElucHV0LmRvbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dElucHV0ID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUobmV4dElucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dElucHV0ICE9PSBpbmZlcm5vX3NoYXJlZF8xLk5PX09QKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2gobGFzdElucHV0LCBuZXh0SW5wdXQsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRWTm9kZS5jaGlsZHJlbiA9IG5leHRJbnB1dDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dEhvb2tzRGVmaW5lZCAmJiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRIb29rcy5vbkNvbXBvbmVudERpZFVwZGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEhvb2tzLm9uQ29tcG9uZW50RGlkVXBkYXRlKGxhc3RQcm9wcywgbmV4dFByb3BzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFZOb2RlLmRvbSA9IG5leHRJbnB1dC5kb207XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5leHRJbnB1dC5mbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgICAgICAgICAgbmV4dElucHV0LnBhcmVudFZOb2RlID0gbmV4dFZOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxhc3RJbnB1dC5mbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgICAgICAgICAgbGFzdElucHV0LnBhcmVudFZOb2RlID0gbmV4dFZOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMucGF0Y2hDb21wb25lbnQgPSBwYXRjaENvbXBvbmVudDtcclxuZnVuY3Rpb24gcGF0Y2hUZXh0KGxhc3RWTm9kZSwgbmV4dFZOb2RlKSB7XHJcbiAgICB2YXIgbmV4dFRleHQgPSBuZXh0Vk5vZGUuY2hpbGRyZW47XHJcbiAgICB2YXIgZG9tID0gbGFzdFZOb2RlLmRvbTtcclxuICAgIG5leHRWTm9kZS5kb20gPSBkb207XHJcbiAgICBpZiAobGFzdFZOb2RlLmNoaWxkcmVuICE9PSBuZXh0VGV4dCkge1xyXG4gICAgICAgIGRvbS5ub2RlVmFsdWUgPSBuZXh0VGV4dDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnBhdGNoVGV4dCA9IHBhdGNoVGV4dDtcclxuZnVuY3Rpb24gcGF0Y2hWb2lkKGxhc3RWTm9kZSwgbmV4dFZOb2RlKSB7XHJcbiAgICBuZXh0Vk5vZGUuZG9tID0gbGFzdFZOb2RlLmRvbTtcclxufVxyXG5leHBvcnRzLnBhdGNoVm9pZCA9IHBhdGNoVm9pZDtcclxuZnVuY3Rpb24gcGF0Y2hOb25LZXllZENoaWxkcmVuKGxhc3RDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICB2YXIgbGFzdENoaWxkcmVuTGVuZ3RoID0gbGFzdENoaWxkcmVuLmxlbmd0aDtcclxuICAgIHZhciBuZXh0Q2hpbGRyZW5MZW5ndGggPSBuZXh0Q2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgdmFyIGNvbW1vbkxlbmd0aCA9IGxhc3RDaGlsZHJlbkxlbmd0aCA+IG5leHRDaGlsZHJlbkxlbmd0aCA/IG5leHRDaGlsZHJlbkxlbmd0aCA6IGxhc3RDaGlsZHJlbkxlbmd0aDtcclxuICAgIHZhciBpID0gMDtcclxuICAgIGZvciAoOyBpIDwgY29tbW9uTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbmV4dENoaWxkID0gbmV4dENoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChuZXh0Q2hpbGQuZG9tKSB7XHJcbiAgICAgICAgICAgIG5leHRDaGlsZCA9IG5leHRDaGlsZHJlbltpXSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKG5leHRDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhdGNoKGxhc3RDaGlsZHJlbltpXSwgbmV4dENoaWxkLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgIH1cclxuICAgIGlmIChsYXN0Q2hpbGRyZW5MZW5ndGggPCBuZXh0Q2hpbGRyZW5MZW5ndGgpIHtcclxuICAgICAgICBmb3IgKGkgPSBjb21tb25MZW5ndGg7IGkgPCBuZXh0Q2hpbGRyZW5MZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbmV4dENoaWxkID0gbmV4dENoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAobmV4dENoaWxkLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgbmV4dENoaWxkID0gbmV4dENoaWxkcmVuW2ldID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUobmV4dENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGlsc18xLmFwcGVuZENoaWxkKGRvbSwgbW91bnRpbmdfMS5tb3VudChuZXh0Q2hpbGQsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChuZXh0Q2hpbGRyZW5MZW5ndGggPT09IDApIHtcclxuICAgICAgICB1dGlsc18xLnJlbW92ZUFsbENoaWxkcmVuKGRvbSwgbGFzdENoaWxkcmVuLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGxhc3RDaGlsZHJlbkxlbmd0aCA+IG5leHRDaGlsZHJlbkxlbmd0aCkge1xyXG4gICAgICAgIGZvciAoaSA9IGNvbW1vbkxlbmd0aDsgaSA8IGxhc3RDaGlsZHJlbkxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHVubW91bnRpbmdfMS51bm1vdW50KGxhc3RDaGlsZHJlbltpXSwgZG9tLCBsaWZlY3ljbGUsIGZhbHNlLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucGF0Y2hOb25LZXllZENoaWxkcmVuID0gcGF0Y2hOb25LZXllZENoaWxkcmVuO1xyXG5mdW5jdGlvbiBwYXRjaEtleWVkQ2hpbGRyZW4oYSwgYiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZykge1xyXG4gICAgdmFyIGFMZW5ndGggPSBhLmxlbmd0aDtcclxuICAgIHZhciBiTGVuZ3RoID0gYi5sZW5ndGg7XHJcbiAgICB2YXIgYUVuZCA9IGFMZW5ndGggLSAxO1xyXG4gICAgdmFyIGJFbmQgPSBiTGVuZ3RoIC0gMTtcclxuICAgIHZhciBhU3RhcnQgPSAwO1xyXG4gICAgdmFyIGJTdGFydCA9IDA7XHJcbiAgICB2YXIgaTtcclxuICAgIHZhciBqO1xyXG4gICAgdmFyIGFOb2RlO1xyXG4gICAgdmFyIGJOb2RlO1xyXG4gICAgdmFyIG5leHROb2RlO1xyXG4gICAgdmFyIG5leHRQb3M7XHJcbiAgICB2YXIgbm9kZTtcclxuICAgIGlmIChhTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgaWYgKGJMZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG1vdW50aW5nXzEubW91bnRBcnJheUNoaWxkcmVuKGIsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGJMZW5ndGggPT09IDApIHtcclxuICAgICAgICB1dGlsc18xLnJlbW92ZUFsbENoaWxkcmVuKGRvbSwgYSwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGFTdGFydE5vZGUgPSBhW2FTdGFydF07XHJcbiAgICB2YXIgYlN0YXJ0Tm9kZSA9IGJbYlN0YXJ0XTtcclxuICAgIHZhciBhRW5kTm9kZSA9IGFbYUVuZF07XHJcbiAgICB2YXIgYkVuZE5vZGUgPSBiW2JFbmRdO1xyXG4gICAgaWYgKGJTdGFydE5vZGUuZG9tKSB7XHJcbiAgICAgICAgYltiU3RhcnRdID0gYlN0YXJ0Tm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGJTdGFydE5vZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGJFbmROb2RlLmRvbSkge1xyXG4gICAgICAgIGJbYkVuZF0gPSBiRW5kTm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGJFbmROb2RlKTtcclxuICAgIH1cclxuICAgIC8vIFN0ZXAgMVxyXG4gICAgLyogZXNsaW50IG5vLWNvbnN0YW50LWNvbmRpdGlvbjogMCAqL1xyXG4gICAgb3V0ZXI6IHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgLy8gU3luYyBub2RlcyB3aXRoIHRoZSBzYW1lIGtleSBhdCB0aGUgYmVnaW5uaW5nLlxyXG4gICAgICAgIHdoaWxlIChhU3RhcnROb2RlLmtleSA9PT0gYlN0YXJ0Tm9kZS5rZXkpIHtcclxuICAgICAgICAgICAgcGF0Y2goYVN0YXJ0Tm9kZSwgYlN0YXJ0Tm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgIGFTdGFydCsrO1xyXG4gICAgICAgICAgICBiU3RhcnQrKztcclxuICAgICAgICAgICAgaWYgKGFTdGFydCA+IGFFbmQgfHwgYlN0YXJ0ID4gYkVuZCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWsgb3V0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYVN0YXJ0Tm9kZSA9IGFbYVN0YXJ0XTtcclxuICAgICAgICAgICAgYlN0YXJ0Tm9kZSA9IGJbYlN0YXJ0XTtcclxuICAgICAgICAgICAgaWYgKGJTdGFydE5vZGUuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBiW2JTdGFydF0gPSBiU3RhcnROb2RlID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUoYlN0YXJ0Tm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3luYyBub2RlcyB3aXRoIHRoZSBzYW1lIGtleSBhdCB0aGUgZW5kLlxyXG4gICAgICAgIHdoaWxlIChhRW5kTm9kZS5rZXkgPT09IGJFbmROb2RlLmtleSkge1xyXG4gICAgICAgICAgICBwYXRjaChhRW5kTm9kZSwgYkVuZE5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICBhRW5kLS07XHJcbiAgICAgICAgICAgIGJFbmQtLTtcclxuICAgICAgICAgICAgaWYgKGFTdGFydCA+IGFFbmQgfHwgYlN0YXJ0ID4gYkVuZCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWsgb3V0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYUVuZE5vZGUgPSBhW2FFbmRdO1xyXG4gICAgICAgICAgICBiRW5kTm9kZSA9IGJbYkVuZF07XHJcbiAgICAgICAgICAgIGlmIChiRW5kTm9kZS5kb20pIHtcclxuICAgICAgICAgICAgICAgIGJbYkVuZF0gPSBiRW5kTm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGJFbmROb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBNb3ZlIGFuZCBzeW5jIG5vZGVzIGZyb20gcmlnaHQgdG8gbGVmdC5cclxuICAgICAgICBpZiAoYUVuZE5vZGUua2V5ID09PSBiU3RhcnROb2RlLmtleSkge1xyXG4gICAgICAgICAgICBwYXRjaChhRW5kTm9kZSwgYlN0YXJ0Tm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuaW5zZXJ0T3JBcHBlbmQoZG9tLCBiU3RhcnROb2RlLmRvbSwgYVN0YXJ0Tm9kZS5kb20pO1xyXG4gICAgICAgICAgICBhRW5kLS07XHJcbiAgICAgICAgICAgIGJTdGFydCsrO1xyXG4gICAgICAgICAgICBhRW5kTm9kZSA9IGFbYUVuZF07XHJcbiAgICAgICAgICAgIGJTdGFydE5vZGUgPSBiW2JTdGFydF07XHJcbiAgICAgICAgICAgIGlmIChiU3RhcnROb2RlLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgYltiU3RhcnRdID0gYlN0YXJ0Tm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGJTdGFydE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBNb3ZlIGFuZCBzeW5jIG5vZGVzIGZyb20gbGVmdCB0byByaWdodC5cclxuICAgICAgICBpZiAoYVN0YXJ0Tm9kZS5rZXkgPT09IGJFbmROb2RlLmtleSkge1xyXG4gICAgICAgICAgICBwYXRjaChhU3RhcnROb2RlLCBiRW5kTm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgIG5leHRQb3MgPSBiRW5kICsgMTtcclxuICAgICAgICAgICAgbmV4dE5vZGUgPSBuZXh0UG9zIDwgYi5sZW5ndGggPyBiW25leHRQb3NdLmRvbSA6IG51bGw7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuaW5zZXJ0T3JBcHBlbmQoZG9tLCBiRW5kTm9kZS5kb20sIG5leHROb2RlKTtcclxuICAgICAgICAgICAgYVN0YXJ0Kys7XHJcbiAgICAgICAgICAgIGJFbmQtLTtcclxuICAgICAgICAgICAgYVN0YXJ0Tm9kZSA9IGFbYVN0YXJ0XTtcclxuICAgICAgICAgICAgYkVuZE5vZGUgPSBiW2JFbmRdO1xyXG4gICAgICAgICAgICBpZiAoYkVuZE5vZGUuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBiW2JFbmRdID0gYkVuZE5vZGUgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShiRW5kTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYgKGFTdGFydCA+IGFFbmQpIHtcclxuICAgICAgICBpZiAoYlN0YXJ0IDw9IGJFbmQpIHtcclxuICAgICAgICAgICAgbmV4dFBvcyA9IGJFbmQgKyAxO1xyXG4gICAgICAgICAgICBuZXh0Tm9kZSA9IG5leHRQb3MgPCBiLmxlbmd0aCA/IGJbbmV4dFBvc10uZG9tIDogbnVsbDtcclxuICAgICAgICAgICAgd2hpbGUgKGJTdGFydCA8PSBiRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gYltiU3RhcnRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYltiU3RhcnRdID0gbm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYlN0YXJ0Kys7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLmluc2VydE9yQXBwZW5kKGRvbSwgbW91bnRpbmdfMS5tb3VudChub2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSwgbmV4dE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYlN0YXJ0ID4gYkVuZCkge1xyXG4gICAgICAgIHdoaWxlIChhU3RhcnQgPD0gYUVuZCkge1xyXG4gICAgICAgICAgICB1bm1vdW50aW5nXzEudW5tb3VudChhW2FTdGFydCsrXSwgZG9tLCBsaWZlY3ljbGUsIGZhbHNlLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYUxlbmd0aCA9IGFFbmQgLSBhU3RhcnQgKyAxO1xyXG4gICAgICAgIGJMZW5ndGggPSBiRW5kIC0gYlN0YXJ0ICsgMTtcclxuICAgICAgICB2YXIgc291cmNlcyA9IG5ldyBBcnJheShiTGVuZ3RoKTtcclxuICAgICAgICAvLyBNYXJrIGFsbCBub2RlcyBhcyBpbnNlcnRlZC5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYkxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZXNbaV0gPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHBvcyA9IDA7XHJcbiAgICAgICAgdmFyIHBhdGNoZWQgPSAwO1xyXG4gICAgICAgIC8vIFdoZW4gc2l6ZXMgYXJlIHNtYWxsLCBqdXN0IGxvb3AgdGhlbSB0aHJvdWdoXHJcbiAgICAgICAgaWYgKChiTGVuZ3RoIDw9IDQpIHx8IChhTGVuZ3RoICogYkxlbmd0aCA8PSAxNikpIHtcclxuICAgICAgICAgICAgZm9yIChpID0gYVN0YXJ0OyBpIDw9IGFFbmQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYU5vZGUgPSBhW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGNoZWQgPCBiTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gYlN0YXJ0OyBqIDw9IGJFbmQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiTm9kZSA9IGJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhTm9kZS5rZXkgPT09IGJOb2RlLmtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlc1tqIC0gYlN0YXJ0XSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zID4gaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYk5vZGUuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYltqXSA9IGJOb2RlID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUoYk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2goYU5vZGUsIGJOb2RlLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlJbmRleCA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgLy8gTWFwIGtleXMgYnkgdGhlaXIgaW5kZXggaW4gYXJyYXlcclxuICAgICAgICAgICAgZm9yIChpID0gYlN0YXJ0OyBpIDw9IGJFbmQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAga2V5SW5kZXguc2V0KGJbaV0ua2V5LCBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUcnkgdG8gcGF0Y2ggc2FtZSBrZXlzXHJcbiAgICAgICAgICAgIGZvciAoaSA9IGFTdGFydDsgaSA8PSBhRW5kOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGFOb2RlID0gYVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRjaGVkIDwgYkxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGogPSBrZXlJbmRleC5nZXQoYU5vZGUua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoaikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYk5vZGUgPSBiW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VzW2ogLSBiU3RhcnRdID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA+IGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJOb2RlLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYltqXSA9IGJOb2RlID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUoYk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoKGFOb2RlLCBiTm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYVtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZhc3QtcGF0aDogaWYgbm90aGluZyBwYXRjaGVkIHJlbW92ZSBhbGwgb2xkIGFuZCBhZGQgYWxsIG5ld1xyXG4gICAgICAgIGlmIChhTGVuZ3RoID09PSBhLmxlbmd0aCAmJiBwYXRjaGVkID09PSAwKSB7XHJcbiAgICAgICAgICAgIHV0aWxzXzEucmVtb3ZlQWxsQ2hpbGRyZW4oZG9tLCBhLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgd2hpbGUgKGJTdGFydCA8IGJMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBiW2JTdGFydF07XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5kb20pIHtcclxuICAgICAgICAgICAgICAgICAgICBiW2JTdGFydF0gPSBub2RlID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiU3RhcnQrKztcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEuaW5zZXJ0T3JBcHBlbmQoZG9tLCBtb3VudGluZ18xLm1vdW50KG5vZGUsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaSA9IGFMZW5ndGggLSBwYXRjaGVkO1xyXG4gICAgICAgICAgICB3aGlsZSAoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGFOb2RlID0gYVthU3RhcnQrK107XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKGFOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVubW91bnRpbmdfMS51bm1vdW50KGFOb2RlLCBkb20sIGxpZmVjeWNsZSwgdHJ1ZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZXEgPSBsaXNfYWxnb3JpdGhtKHNvdXJjZXMpO1xyXG4gICAgICAgICAgICAgICAgaiA9IHNlcS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gYkxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0gPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGkgKyBiU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBiW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYltwb3NdID0gbm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQb3MgPSBwb3MgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0Tm9kZSA9IG5leHRQb3MgPCBiLmxlbmd0aCA/IGJbbmV4dFBvc10uZG9tIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMS5pbnNlcnRPckFwcGVuZChkb20sIG1vdW50aW5nXzEubW91bnQobm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSwgbmV4dE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCAwIHx8IGkgIT09IHNlcVtqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gaSArIGJTdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBiW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gcG9zICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHROb2RlID0gbmV4dFBvcyA8IGIubGVuZ3RoID8gYltuZXh0UG9zXS5kb20gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMS5pbnNlcnRPckFwcGVuZChkb20sIG5vZGUuZG9tLCBuZXh0Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocGF0Y2hlZCAhPT0gYkxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiBwYXRjaGVkIGNvdW50IGRvZXNuJ3QgbWF0Y2ggYiBsZW5ndGggd2UgbmVlZCB0byBpbnNlcnQgdGhvc2UgbmV3IG9uZXNcclxuICAgICAgICAgICAgICAgIC8vIGxvb3AgYmFja3dhcmRzIHNvIHdlIGNhbiB1c2UgaW5zZXJ0QmVmb3JlXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBiTGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gaSArIGJTdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGJbcG9zXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiW3Bvc10gPSBub2RlID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IHBvcyArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHROb2RlID0gbmV4dFBvcyA8IGIubGVuZ3RoID8gYltuZXh0UG9zXS5kb20gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsc18xLmluc2VydE9yQXBwZW5kKGRvbSwgbW91bnRpbmdfMS5tb3VudChub2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSwgbmV4dE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnBhdGNoS2V5ZWRDaGlsZHJlbiA9IHBhdGNoS2V5ZWRDaGlsZHJlbjtcclxuLy8gLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTG9uZ2VzdF9pbmNyZWFzaW5nX3N1YnNlcXVlbmNlXHJcbmZ1bmN0aW9uIGxpc19hbGdvcml0aG0oYXJyKSB7XHJcbiAgICB2YXIgcCA9IGFyci5zbGljZSgwKTtcclxuICAgIHZhciByZXN1bHQgPSBbMF07XHJcbiAgICB2YXIgaTtcclxuICAgIHZhciBqO1xyXG4gICAgdmFyIHU7XHJcbiAgICB2YXIgdjtcclxuICAgIHZhciBjO1xyXG4gICAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgYXJySSA9IGFycltpXTtcclxuICAgICAgICBpZiAoYXJySSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGogPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmIChhcnJbal0gPCBhcnJJKSB7XHJcbiAgICAgICAgICAgIHBbaV0gPSBqO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChpKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHUgPSAwO1xyXG4gICAgICAgIHYgPSByZXN1bHQubGVuZ3RoIC0gMTtcclxuICAgICAgICB3aGlsZSAodSA8IHYpIHtcclxuICAgICAgICAgICAgYyA9ICgodSArIHYpIC8gMikgfCAwO1xyXG4gICAgICAgICAgICBpZiAoYXJyW3Jlc3VsdFtjXV0gPCBhcnJJKSB7XHJcbiAgICAgICAgICAgICAgICB1ID0gYyArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2ID0gYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXJySSA8IGFycltyZXN1bHRbdV1dKSB7XHJcbiAgICAgICAgICAgIGlmICh1ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcFtpXSA9IHJlc3VsdFt1IC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0W3VdID0gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1ID0gcmVzdWx0Lmxlbmd0aDtcclxuICAgIHYgPSByZXN1bHRbdSAtIDFdO1xyXG4gICAgd2hpbGUgKHUtLSA+IDApIHtcclxuICAgICAgICByZXN1bHRbdV0gPSB2O1xyXG4gICAgICAgIHYgPSBwW3ZdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBpc0F0dHJBbkV2ZW50KGF0dHIpIHtcclxuICAgIHJldHVybiBhdHRyWzBdID09PSAnbycgJiYgYXR0clsxXSA9PT0gJ24nO1xyXG59XHJcbmV4cG9ydHMuaXNBdHRyQW5FdmVudCA9IGlzQXR0ckFuRXZlbnQ7XHJcbmZ1bmN0aW9uIHBhdGNoUHJvcChwcm9wLCBsYXN0VmFsdWUsIG5leHRWYWx1ZSwgZG9tLCBpc1NWRywgaGFzQ29udHJvbGxlZFZhbHVlKSB7XHJcbiAgICBpZiAobGFzdFZhbHVlICE9PSBuZXh0VmFsdWUpIHtcclxuICAgICAgICBpZiAoY29uc3RhbnRzXzEuc2tpcFByb3BzLmhhcyhwcm9wKSB8fCAoaGFzQ29udHJvbGxlZFZhbHVlICYmIHByb3AgPT09ICd2YWx1ZScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29uc3RhbnRzXzEuYm9vbGVhblByb3BzLmhhcyhwcm9wKSkge1xyXG4gICAgICAgICAgICBwcm9wID0gcHJvcCA9PT0gJ2F1dG9Gb2N1cycgPyBwcm9wLnRvTG93ZXJDYXNlKCkgOiBwcm9wO1xyXG4gICAgICAgICAgICBkb21bcHJvcF0gPSAhIW5leHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29uc3RhbnRzXzEuc3RyaWN0UHJvcHMuaGFzKHByb3ApKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihuZXh0VmFsdWUpID8gJycgOiBuZXh0VmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChkb21bcHJvcF0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBkb21bcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpc0F0dHJBbkV2ZW50KHByb3ApKSB7XHJcbiAgICAgICAgICAgIHBhdGNoRXZlbnQocHJvcCwgbGFzdFZhbHVlLCBuZXh0VmFsdWUsIGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihuZXh0VmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHByb3AgPT09ICdzdHlsZScpIHtcclxuICAgICAgICAgICAgcGF0Y2hTdHlsZShsYXN0VmFsdWUsIG5leHRWYWx1ZSwgZG9tKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocHJvcCA9PT0gJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJykge1xyXG4gICAgICAgICAgICB2YXIgbGFzdEh0bWwgPSBsYXN0VmFsdWUgJiYgbGFzdFZhbHVlLl9faHRtbDtcclxuICAgICAgICAgICAgdmFyIG5leHRIdG1sID0gbmV4dFZhbHVlICYmIG5leHRWYWx1ZS5fX2h0bWw7XHJcbiAgICAgICAgICAgIGlmIChsYXN0SHRtbCAhPT0gbmV4dEh0bWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRIdG1sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5pbm5lckhUTUwgPSBuZXh0SHRtbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gV2Ugb3B0aW1pemUgZm9yIE5TIGJlaW5nIGJvb2xlYW4uIEl0cyA5OS45JSB0aW1lIGZhbHNlXHJcbiAgICAgICAgICAgIGlmIChpc1NWRyAmJiBjb25zdGFudHNfMS5uYW1lc3BhY2VzLmhhcyhwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZW5kIHVwIGluIHRoaXMgcGF0aCB3ZSBjYW4gcmVhZCBwcm9wZXJ0eSBhZ2FpblxyXG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZU5TKGNvbnN0YW50c18xLm5hbWVzcGFjZXMuZ2V0KHByb3ApLCBwcm9wLCBuZXh0VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShwcm9wLCBuZXh0VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucGF0Y2hQcm9wID0gcGF0Y2hQcm9wO1xyXG5mdW5jdGlvbiBwYXRjaEV2ZW50KG5hbWUsIGxhc3RWYWx1ZSwgbmV4dFZhbHVlLCBkb20pIHtcclxuICAgIGlmIChsYXN0VmFsdWUgIT09IG5leHRWYWx1ZSkge1xyXG4gICAgICAgIGlmIChjb25zdGFudHNfMS5kZWxlZ2F0ZWRFdmVudHMuaGFzKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGRlbGVnYXRpb25fMS5oYW5kbGVFdmVudChuYW1lLCBsYXN0VmFsdWUsIG5leHRWYWx1ZSwgZG9tKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lTG93ZXJDYXNlID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB2YXIgZG9tRXZlbnQgPSBkb21bbmFtZUxvd2VyQ2FzZV07XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBmdW5jdGlvbiBpcyB3cmFwcGVkLCB0aGF0IG1lYW5zIGl0J3MgYmVlbiBjb250cm9sbGVkIGJ5IGEgd3JhcHBlclxyXG4gICAgICAgICAgICBpZiAoZG9tRXZlbnQgJiYgZG9tRXZlbnQud3JhcHBlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc0Z1bmN0aW9uKG5leHRWYWx1ZSkgJiYgIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihuZXh0VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlua0V2ZW50XzEgPSBuZXh0VmFsdWUuZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlua0V2ZW50XzEgJiYgaW5mZXJub19zaGFyZWRfMS5pc0Z1bmN0aW9uKGxpbmtFdmVudF8xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbVtuYW1lTG93ZXJDYXNlXSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtFdmVudF8xKG5leHRWYWx1ZS5kYXRhLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKFwiYW4gZXZlbnQgb24gYSBWTm9kZSBcXFwiXCIgKyBuYW1lICsgXCJcXFwiLiB3YXMgbm90IGEgZnVuY3Rpb24gb3IgYSB2YWxpZCBsaW5rRXZlbnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbVtuYW1lTG93ZXJDYXNlXSA9IG5leHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnBhdGNoRXZlbnQgPSBwYXRjaEV2ZW50O1xyXG4vLyBXZSBhcmUgYXNzdW1pbmcgaGVyZSB0aGF0IHdlIGNvbWUgZnJvbSBwYXRjaFByb3Agcm91dGluZVxyXG4vLyAtbmV4dEF0dHJWYWx1ZSBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWRcclxuZnVuY3Rpb24gcGF0Y2hTdHlsZShsYXN0QXR0clZhbHVlLCBuZXh0QXR0clZhbHVlLCBkb20pIHtcclxuICAgIHZhciBkb21TdHlsZSA9IGRvbS5zdHlsZTtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nKG5leHRBdHRyVmFsdWUpKSB7XHJcbiAgICAgICAgZG9tU3R5bGUuY3NzVGV4dCA9IG5leHRBdHRyVmFsdWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgc3R5bGUgaW4gbmV4dEF0dHJWYWx1ZSkge1xyXG4gICAgICAgIC8vIGRvIG5vdCBhZGQgYSBoYXNPd25Qcm9wZXJ0eSBjaGVjayBoZXJlLCBpdCBhZmZlY3RzIHBlcmZvcm1hbmNlXHJcbiAgICAgICAgdmFyIHZhbHVlID0gbmV4dEF0dHJWYWx1ZVtzdHlsZV07XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVtYmVyKHZhbHVlKSB8fCBjb25zdGFudHNfMS5pc1VuaXRsZXNzTnVtYmVyLmhhcyhzdHlsZSkpIHtcclxuICAgICAgICAgICAgZG9tU3R5bGVbc3R5bGVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb21TdHlsZVtzdHlsZV0gPSB2YWx1ZSArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobGFzdEF0dHJWYWx1ZSkpIHtcclxuICAgICAgICBmb3IgKHZhciBzdHlsZSBpbiBsYXN0QXR0clZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dEF0dHJWYWx1ZVtzdHlsZV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkb21TdHlsZVtzdHlsZV0gPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnBhdGNoU3R5bGUgPSBwYXRjaFN0eWxlO1xyXG5mdW5jdGlvbiByZW1vdmVQcm9wKHByb3AsIGxhc3RWYWx1ZSwgZG9tKSB7XHJcbiAgICBpZiAocHJvcCA9PT0gJ3ZhbHVlJykge1xyXG4gICAgICAgIGRvbS52YWx1ZSA9ICcnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocHJvcCA9PT0gJ3N0eWxlJykge1xyXG4gICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc0F0dHJBbkV2ZW50KHByb3ApKSB7XHJcbiAgICAgICAgZGVsZWdhdGlvbl8xLmhhbmRsZUV2ZW50KHByb3AsIGxhc3RWYWx1ZSwgbnVsbCwgZG9tKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUocHJvcCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8vZGlzdC9ET00vcGF0Y2hpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vY29yZS9vcHRpb25zXCIpO1xyXG52YXIgVk5vZGVzXzEgPSByZXF1aXJlKFwiLi4vY29yZS9WTm9kZXNcIik7XHJcbnZhciBoeWRyYXRpb25fMSA9IHJlcXVpcmUoXCIuL2h5ZHJhdGlvblwiKTtcclxudmFyIG1vdW50aW5nXzEgPSByZXF1aXJlKFwiLi9tb3VudGluZ1wiKTtcclxudmFyIHBhdGNoaW5nXzEgPSByZXF1aXJlKFwiLi9wYXRjaGluZ1wiKTtcclxudmFyIHVubW91bnRpbmdfMSA9IHJlcXVpcmUoXCIuL3VubW91bnRpbmdcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbi8vIHJhdGhlciB0aGFuIHVzZSBhIE1hcCwgbGlrZSB3ZSBkaWQgYmVmb3JlLCB3ZSBjYW4gdXNlIGFuIGFycmF5IGhlcmVcclxuLy8gZ2l2ZW4gdGhlcmUgc2hvdWxkbid0IGJlIFRIQVQgbWFueSByb290cyBvbiB0aGUgcGFnZSwgdGhlIGRpZmZlcmVuY2VcclxuLy8gaW4gcGVyZm9ybWFuY2UgaXMgaHVnZTogaHR0cHM6Ly9lc2JlbmNoLmNvbS9iZW5jaC81ODAyYTY5MTMzMGFiMDk5MDBhMWEyZGFcclxuZXhwb3J0cy5jb21wb25lbnRUb0RPTU5vZGVNYXAgPSBuZXcgTWFwKCk7XHJcbnZhciByb290cyA9IG9wdGlvbnNfMS5vcHRpb25zLnJvb3RzO1xyXG4vKipcclxuICogV2hlbiBpbmZlcm5vLm9wdGlvbnMuZmluZERPTU5PZGVFbmFibGVkIGlzIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gRE9NIE5vZGUgYnkgY29tcG9uZW50IGluc3RhbmNlXHJcbiAqIEBwYXJhbSByZWYgQ29tcG9uZW50IGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHsqfG51bGx9IHJldHVybnMgZG9tIG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRET01Ob2RlKHJlZikge1xyXG4gICAgaWYgKCFvcHRpb25zXzEub3B0aW9ucy5maW5kRE9NTm9kZUVuYWJsZWQpIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ2ZpbmRET01Ob2RlKCkgaGFzIGJlZW4gZGlzYWJsZWQsIHVzZSBJbmZlcm5vLm9wdGlvbnMuZmluZERPTU5vZGVFbmFibGVkID0gdHJ1ZTsgZW5hYmxlZCBmaW5kRE9NTm9kZSgpLiBXYXJuaW5nIHRoaXMgY2FuIHNpZ25pZmljYW50bHkgaW1wYWN0IHBlcmZvcm1hbmNlIScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgIH1cclxuICAgIHZhciBkb20gPSByZWYgJiYgcmVmLm5vZGVUeXBlID8gcmVmIDogbnVsbDtcclxuICAgIHJldHVybiBleHBvcnRzLmNvbXBvbmVudFRvRE9NTm9kZU1hcC5nZXQocmVmKSB8fCBkb207XHJcbn1cclxuZXhwb3J0cy5maW5kRE9NTm9kZSA9IGZpbmRET01Ob2RlO1xyXG5mdW5jdGlvbiBnZXRSb290KGRvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJvb3RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHJvb3QgPSByb290c1tpXTtcclxuICAgICAgICBpZiAocm9vdC5kb20gPT09IGRvbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5mdW5jdGlvbiBzZXRSb290KGRvbSwgaW5wdXQsIGxpZmVjeWNsZSkge1xyXG4gICAgdmFyIHJvb3QgPSB7XHJcbiAgICAgICAgZG9tOiBkb20sXHJcbiAgICAgICAgaW5wdXQ6IGlucHV0LFxyXG4gICAgICAgIGxpZmVjeWNsZTogbGlmZWN5Y2xlXHJcbiAgICB9O1xyXG4gICAgcm9vdHMucHVzaChyb290KTtcclxuICAgIHJldHVybiByb290O1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZVJvb3Qocm9vdCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJvb3RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHJvb3RzW2ldID09PSByb290KSB7XHJcbiAgICAgICAgICAgIHJvb3RzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNCcm93c2VyICYmIGRvY3VtZW50LmJvZHkgPT09IG51bGwpIHtcclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLndhcm5pbmcoJ0luZmVybm8gd2FybmluZzogeW91IGNhbm5vdCBpbml0aWFsaXplIGluZmVybm8gd2l0aG91dCBcImRvY3VtZW50LmJvZHlcIi4gV2FpdCBvbiBcIkRPTUNvbnRlbnRMb2FkZWRcIiBldmVudCwgYWRkIHNjcmlwdCB0byBib3R0b20gb2YgYm9keSwgb3IgdXNlIGFzeW5jL2RlZmVyIGF0dHJpYnV0ZXMgb24gc2NyaXB0IHRhZy4nKTtcclxuICAgIH1cclxufVxyXG52YXIgZG9jdW1lbnRCb2R5ID0gaW5mZXJub19zaGFyZWRfMS5pc0Jyb3dzZXIgPyBkb2N1bWVudC5ib2R5IDogbnVsbDtcclxuLyoqXHJcbiAqIFJlbmRlcnMgdmlydHVhbCBub2RlIHRyZWUgaW50byBwYXJlbnQgbm9kZS5cclxuICogQHBhcmFtIHtWTm9kZSB8IG51bGwgfCBzdHJpbmcgfCBudW1iZXJ9IGlucHV0IHZOb2RlIHRvIGJlIHJlbmRlcmVkXHJcbiAqIEBwYXJhbSBwYXJlbnREb20gRE9NIG5vZGUgd2hpY2ggY29udGVudCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHZpcnR1YWwgbm9kZVxyXG4gKiBAcmV0dXJucyB7SW5mZXJub0NoaWxkcmVufSByZW5kZXJlZCB2aXJ0dWFsIG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIHJlbmRlcihpbnB1dCwgcGFyZW50RG9tKSB7XHJcbiAgICBpZiAoZG9jdW1lbnRCb2R5ID09PSBwYXJlbnREb20pIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ3lvdSBjYW5ub3QgcmVuZGVyKCkgdG8gdGhlIFwiZG9jdW1lbnQuYm9keVwiLiBVc2UgYW4gZW1wdHkgZWxlbWVudCBhcyBhIGNvbnRhaW5lciBpbnN0ZWFkLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgIH1cclxuICAgIGlmIChpbnB1dCA9PT0gaW5mZXJub19zaGFyZWRfMS5OT19PUCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciByb290ID0gZ2V0Um9vdChwYXJlbnREb20pO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHJvb3QpKSB7XHJcbiAgICAgICAgdmFyIGxpZmVjeWNsZSA9IG5ldyBpbmZlcm5vX3NoYXJlZF8xLkxpZmVjeWNsZSgpO1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC5kb20pIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUoaW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaHlkcmF0aW9uXzEuaHlkcmF0ZVJvb3QoaW5wdXQsIHBhcmVudERvbSwgbGlmZWN5Y2xlKSkge1xyXG4gICAgICAgICAgICAgICAgbW91bnRpbmdfMS5tb3VudChpbnB1dCwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIHV0aWxzXzEuRU1QVFlfT0JKLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm9vdCA9IHNldFJvb3QocGFyZW50RG9tLCBpbnB1dCwgbGlmZWN5Y2xlKTtcclxuICAgICAgICAgICAgbGlmZWN5Y2xlLnRyaWdnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgbGlmZWN5Y2xlID0gcm9vdC5saWZlY3ljbGU7XHJcbiAgICAgICAgbGlmZWN5Y2xlLmxpc3RlbmVycyA9IFtdO1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHVubW91bnRpbmdfMS51bm1vdW50KHJvb3QuaW5wdXQsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZW1vdmVSb290KHJvb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0LmRvbSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShpbnB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0Y2hpbmdfMS5wYXRjaChyb290LmlucHV0LCBpbnB1dCwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIHV0aWxzXzEuRU1QVFlfT0JKLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb290LmlucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgbGlmZWN5Y2xlLnRyaWdnZXIoKTtcclxuICAgIH1cclxuICAgIGlmIChyb290KSB7XHJcbiAgICAgICAgdmFyIHJvb3RJbnB1dCA9IHJvb3QuaW5wdXQ7XHJcbiAgICAgICAgaWYgKHJvb3RJbnB1dCAmJiAocm9vdElucHV0LmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcm9vdElucHV0LmNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJlbmRlciA9IHJlbmRlcjtcclxuZnVuY3Rpb24gY3JlYXRlUmVuZGVyZXIocGFyZW50RG9tKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVuZGVyZXIobGFzdElucHV0LCBuZXh0SW5wdXQpIHtcclxuICAgICAgICBpZiAoIXBhcmVudERvbSkge1xyXG4gICAgICAgICAgICBwYXJlbnREb20gPSBsYXN0SW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlbmRlcihuZXh0SW5wdXQsIHBhcmVudERvbSk7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlUmVuZGVyZXIgPSBjcmVhdGVSZW5kZXJlcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8vZGlzdC9ET00vcmVuZGVyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0JykuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy54bGlua05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xyXG5leHBvcnRzLnhtbE5TID0gJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSc7XHJcbmV4cG9ydHMuc3ZnTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xyXG5leHBvcnRzLnN0cmljdFByb3BzID0gbmV3IFNldCgpO1xyXG5leHBvcnRzLnN0cmljdFByb3BzLmFkZCgndm9sdW1lJyk7XHJcbmV4cG9ydHMuc3RyaWN0UHJvcHMuYWRkKCdkZWZhdWx0Q2hlY2tlZCcpO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcyA9IG5ldyBTZXQoKTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuYWRkKCdtdXRlZCcpO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5hZGQoJ3Njb3BlZCcpO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5hZGQoJ2xvb3AnKTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuYWRkKCdvcGVuJyk7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmFkZCgnY2hlY2tlZCcpO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5hZGQoJ2RlZmF1bHQnKTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuYWRkKCdjYXB0dXJlJyk7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmFkZCgnZGlzYWJsZWQnKTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuYWRkKCdyZWFkT25seScpO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5hZGQoJ3JlcXVpcmVkJyk7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmFkZCgnYXV0b3BsYXknKTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuYWRkKCdjb250cm9scycpO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5hZGQoJ3NlYW1sZXNzJyk7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmFkZCgncmV2ZXJzZWQnKTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuYWRkKCdhbGxvd2Z1bGxzY3JlZW4nKTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuYWRkKCdub3ZhbGlkYXRlJyk7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmFkZCgnaGlkZGVuJyk7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmFkZCgnYXV0b0ZvY3VzJyk7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmFkZCgnc2VsZWN0ZWQnKTtcclxuZXhwb3J0cy5uYW1lc3BhY2VzID0gbmV3IE1hcCgpO1xyXG5leHBvcnRzLm5hbWVzcGFjZXMuc2V0KCd4bGluazpocmVmJywgZXhwb3J0cy54bGlua05TKTtcclxuZXhwb3J0cy5uYW1lc3BhY2VzLnNldCgneGxpbms6YXJjcm9sZScsIGV4cG9ydHMueGxpbmtOUyk7XHJcbmV4cG9ydHMubmFtZXNwYWNlcy5zZXQoJ3hsaW5rOmFjdHVhdGUnLCBleHBvcnRzLnhsaW5rTlMpO1xyXG5leHBvcnRzLm5hbWVzcGFjZXMuc2V0KCd4bGluazpzaG93JywgZXhwb3J0cy54bGlua05TKTtcclxuZXhwb3J0cy5uYW1lc3BhY2VzLnNldCgneGxpbms6cm9sZScsIGV4cG9ydHMueGxpbmtOUyk7XHJcbmV4cG9ydHMubmFtZXNwYWNlcy5zZXQoJ3hsaW5rOnRpdGxlJywgZXhwb3J0cy54bGlua05TKTtcclxuZXhwb3J0cy5uYW1lc3BhY2VzLnNldCgneGxpbms6dHlwZScsIGV4cG9ydHMueGxpbmtOUyk7XHJcbmV4cG9ydHMubmFtZXNwYWNlcy5zZXQoJ3htbDpiYXNlJywgZXhwb3J0cy54bWxOUyk7XHJcbmV4cG9ydHMubmFtZXNwYWNlcy5zZXQoJ3htbDpsYW5nJywgZXhwb3J0cy54bWxOUyk7XHJcbmV4cG9ydHMubmFtZXNwYWNlcy5zZXQoJ3htbDpzcGFjZScsIGV4cG9ydHMueG1sTlMpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIgPSBuZXcgU2V0KCk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ2FuaW1hdGlvbkl0ZXJhdGlvbkNvdW50Jyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ2JvcmRlckltYWdlT3V0c2V0Jyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ2JvcmRlckltYWdlU2xpY2UnKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnYm9yZGVySW1hZ2VXaWR0aCcpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdib3hGbGV4Jyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ2JveEZsZXhHcm91cCcpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdib3hPcmRpbmFsR3JvdXAnKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnY29sdW1uQ291bnQnKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnZmxleCcpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdmbGV4R3JvdycpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdmbGV4UG9zaXRpdmUnKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnZmxleFNocmluaycpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdmbGV4TmVnYXRpdmUnKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnZmxleE9yZGVyJyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ2dyaWRSb3cnKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnZ3JpZENvbHVtbicpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdmb250V2VpZ2h0Jyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ2xpbmVDbGFtcCcpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdsaW5lSGVpZ2h0Jyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ29wYWNpdHknKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnb3JkZXInKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnb3JwaGFucycpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCd0YWJTaXplJyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ3dpZG93cycpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCd6SW5kZXgnKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnem9vbScpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdmaWxsT3BhY2l0eScpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdmbG9vZE9wYWNpdHknKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnc3RvcE9wYWNpdHknKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnc3Ryb2tlRGFzaGFycmF5Jyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ3N0cm9rZURhc2hvZmZzZXQnKTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmFkZCgnc3Ryb2tlTWl0ZXJsaW1pdCcpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYWRkKCdzdHJva2VPcGFjaXR5Jyk7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5hZGQoJ3N0cm9rZVdpZHRoJyk7XHJcbmV4cG9ydHMuc2tpcFByb3BzID0gbmV3IFNldCgpO1xyXG5leHBvcnRzLnNraXBQcm9wcy5hZGQoJ2NoaWxkcmVuJyk7XHJcbmV4cG9ydHMuc2tpcFByb3BzLmFkZCgnY2hpbGRyZW5UeXBlJyk7XHJcbmV4cG9ydHMuc2tpcFByb3BzLmFkZCgnZGVmYXVsdFZhbHVlJyk7XHJcbmV4cG9ydHMuc2tpcFByb3BzLmFkZCgncmVmJyk7XHJcbmV4cG9ydHMuc2tpcFByb3BzLmFkZCgna2V5Jyk7XHJcbmV4cG9ydHMuc2tpcFByb3BzLmFkZCgnY2hlY2tlZCcpO1xyXG5leHBvcnRzLnNraXBQcm9wcy5hZGQoJ211bHRpcGxlJyk7XHJcbmV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzID0gbmV3IFNldCgpO1xyXG5leHBvcnRzLmRlbGVnYXRlZEV2ZW50cy5hZGQoJ29uQ2xpY2snKTtcclxuZXhwb3J0cy5kZWxlZ2F0ZWRFdmVudHMuYWRkKCdvbk1vdXNlRG93bicpO1xyXG5leHBvcnRzLmRlbGVnYXRlZEV2ZW50cy5hZGQoJ29uTW91c2VVcCcpO1xyXG5leHBvcnRzLmRlbGVnYXRlZEV2ZW50cy5hZGQoJ29uTW91c2VNb3ZlJyk7XHJcbmV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzLmFkZCgnb25TdWJtaXQnKTtcclxuZXhwb3J0cy5kZWxlZ2F0ZWRFdmVudHMuYWRkKCdvbkRibENsaWNrJyk7XHJcbmV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzLmFkZCgnb25LZXlEb3duJyk7XHJcbmV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzLmFkZCgnb25LZXlVcCcpO1xyXG5leHBvcnRzLmRlbGVnYXRlZEV2ZW50cy5hZGQoJ29uS2V5UHJlc3MnKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8vZGlzdC9ET00vY29uc3RhbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL2NvcmUvb3B0aW9uc1wiKTtcclxudmFyIFZOb2Rlc18xID0gcmVxdWlyZShcIi4uL2NvcmUvVk5vZGVzXCIpO1xyXG52YXIgcGF0Y2hpbmdfMSA9IHJlcXVpcmUoXCIuL3BhdGNoaW5nXCIpO1xyXG52YXIgcmVjeWNsaW5nXzEgPSByZXF1aXJlKFwiLi9yZWN5Y2xpbmdcIik7XHJcbnZhciByZW5kZXJpbmdfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmluZ1wiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcclxudmFyIHByb2Nlc3NFbGVtZW50XzEgPSByZXF1aXJlKFwiLi93cmFwcGVycy9wcm9jZXNzRWxlbWVudFwiKTtcclxuZnVuY3Rpb24gbW91bnQodk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykge1xyXG4gICAgdmFyIGZsYWdzID0gdk5vZGUuZmxhZ3M7XHJcbiAgICBpZiAoZmxhZ3MgJiAzOTcwIC8qIEVsZW1lbnQgKi8pIHtcclxuICAgICAgICByZXR1cm4gbW91bnRFbGVtZW50KHZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pIHtcclxuICAgICAgICByZXR1cm4gbW91bnRDb21wb25lbnQodk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgKGZsYWdzICYgNCAvKiBDb21wb25lbnRDbGFzcyAqLykgPiAwKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZsYWdzICYgNDA5NiAvKiBWb2lkICovKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vdW50Vm9pZCh2Tm9kZSwgcGFyZW50RG9tKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZsYWdzICYgMSAvKiBUZXh0ICovKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vdW50VGV4dCh2Tm9kZSwgcGFyZW50RG9tKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygdk5vZGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoXCJtb3VudCgpIHJlY2VpdmVkIGFuIG9iamVjdCB0aGF0J3Mgbm90IGEgdmFsaWQgVk5vZGUsIHlvdSBzaG91bGQgc3RyaW5naWZ5IGl0IGZpcnN0LiBPYmplY3Q6IFxcXCJcIiArIEpTT04uc3RyaW5naWZ5KHZOb2RlKSArIFwiXFxcIi5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoXCJtb3VudCgpIGV4cGVjdHMgYSB2YWxpZCBWTm9kZSwgaW5zdGVhZCBpdCByZWNlaXZlZCBhbiBvYmplY3Qgd2l0aCB0aGUgdHlwZSBcXFwiXCIgKyB0eXBlb2Ygdk5vZGUgKyBcIlxcXCIuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubW91bnQgPSBtb3VudDtcclxuZnVuY3Rpb24gbW91bnRUZXh0KHZOb2RlLCBwYXJlbnREb20pIHtcclxuICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2Tm9kZS5jaGlsZHJlbik7XHJcbiAgICB2Tm9kZS5kb20gPSBkb207XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHBhcmVudERvbSkpIHtcclxuICAgICAgICB1dGlsc18xLmFwcGVuZENoaWxkKHBhcmVudERvbSwgZG9tKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkb207XHJcbn1cclxuZXhwb3J0cy5tb3VudFRleHQgPSBtb3VudFRleHQ7XHJcbmZ1bmN0aW9uIG1vdW50Vm9pZCh2Tm9kZSwgcGFyZW50RG9tKSB7XHJcbiAgICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xyXG4gICAgdk5vZGUuZG9tID0gZG9tO1xyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgdXRpbHNfMS5hcHBlbmRDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9tO1xyXG59XHJcbmV4cG9ydHMubW91bnRWb2lkID0gbW91bnRWb2lkO1xyXG5mdW5jdGlvbiBtb3VudEVsZW1lbnQodk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykge1xyXG4gICAgaWYgKG9wdGlvbnNfMS5vcHRpb25zLnJlY3ljbGluZ0VuYWJsZWQpIHtcclxuICAgICAgICB2YXIgZG9tXzEgPSByZWN5Y2xpbmdfMS5yZWN5Y2xlRWxlbWVudCh2Tm9kZSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChkb21fMSkpIHtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLmFwcGVuZENoaWxkKHBhcmVudERvbSwgZG9tXzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkb21fMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgZmxhZ3MgPSB2Tm9kZS5mbGFncztcclxuICAgIGlzU1ZHID0gaXNTVkcgfHwgKGZsYWdzICYgMTI4IC8qIFN2Z0VsZW1lbnQgKi8pID4gMDtcclxuICAgIHZhciBkb20gPSB1dGlsc18xLmRvY3VtZW50Q3JlYXRlRWxlbWVudCh2Tm9kZS50eXBlLCBpc1NWRyk7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzO1xyXG4gICAgdmFyIGNsYXNzTmFtZSA9IHZOb2RlLmNsYXNzTmFtZTtcclxuICAgIHZhciByZWYgPSB2Tm9kZS5yZWY7XHJcbiAgICB2Tm9kZS5kb20gPSBkb207XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGNoaWxkcmVuKSkge1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuc2V0VGV4dENvbnRlbnQoZG9tLCBjaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShjaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgbW91bnRBcnJheUNoaWxkcmVuKGNoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChWTm9kZXNfMS5pc1ZOb2RlKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBtb3VudChjaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHByb3BzKSkge1xyXG4gICAgICAgIHZhciBoYXNDb250cm9sbGVkVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgaXNGb3JtRWxlbWVudCA9IChmbGFncyAmIDM1ODQgLyogRm9ybUVsZW1lbnQgKi8pID4gMDtcclxuICAgICAgICBpZiAoaXNGb3JtRWxlbWVudCkge1xyXG4gICAgICAgICAgICBoYXNDb250cm9sbGVkVmFsdWUgPSBwcm9jZXNzRWxlbWVudF8xLmlzQ29udHJvbGxlZEZvcm1FbGVtZW50KHByb3BzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICAvLyBkbyBub3QgYWRkIGEgaGFzT3duUHJvcGVydHkgY2hlY2sgaGVyZSwgaXQgYWZmZWN0cyBwZXJmb3JtYW5jZVxyXG4gICAgICAgICAgICBwYXRjaGluZ18xLnBhdGNoUHJvcChwcm9wLCBudWxsLCBwcm9wc1twcm9wXSwgZG9tLCBpc1NWRywgaGFzQ29udHJvbGxlZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRm9ybUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcHJvY2Vzc0VsZW1lbnRfMS5wcm9jZXNzRWxlbWVudChmbGFncywgdk5vZGUsIGRvbSwgcHJvcHMsIHRydWUsIGhhc0NvbnRyb2xsZWRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChpc1NWRykge1xyXG4gICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb20uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGwocmVmKSkge1xyXG4gICAgICAgIG1vdW50UmVmKGRvbSwgcmVmLCBsaWZlY3ljbGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgdXRpbHNfMS5hcHBlbmRDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9tO1xyXG59XHJcbmV4cG9ydHMubW91bnRFbGVtZW50ID0gbW91bnRFbGVtZW50O1xyXG5mdW5jdGlvbiBtb3VudEFycmF5Q2hpbGRyZW4oY2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgLy8gVmVyaWZ5IGNhbiBzdHJpbmcvbnVtYmVyIGJlIGhlcmUuIG1pZ2h0IGNhdXNlIGRlLW9wdC4gLSBOb3JtYWxpemF0aW9uIHRha2VzIGNhcmUgb2YgaXQuXHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSBjaGlsZCA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGNoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb3VudChjaGlsZHJlbltpXSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5tb3VudEFycmF5Q2hpbGRyZW4gPSBtb3VudEFycmF5Q2hpbGRyZW47XHJcbmZ1bmN0aW9uIG1vdW50Q29tcG9uZW50KHZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzQ2xhc3MpIHtcclxuICAgIGlmIChvcHRpb25zXzEub3B0aW9ucy5yZWN5Y2xpbmdFbmFibGVkKSB7XHJcbiAgICAgICAgdmFyIGRvbV8yID0gcmVjeWNsaW5nXzEucmVjeWNsZUNvbXBvbmVudCh2Tm9kZSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChkb21fMikpIHtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLmFwcGVuZENoaWxkKHBhcmVudERvbSwgZG9tXzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkb21fMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgdHlwZSA9IHZOb2RlLnR5cGU7XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIHZhciByZWYgPSB2Tm9kZS5yZWY7XHJcbiAgICB2YXIgZG9tO1xyXG4gICAgaWYgKGlzQ2xhc3MpIHtcclxuICAgICAgICB2YXIgaW5zdGFuY2UgPSB1dGlsc18xLmNyZWF0ZUNsYXNzQ29tcG9uZW50SW5zdGFuY2Uodk5vZGUsIHR5cGUsIHByb3BzLCBjb250ZXh0LCBpc1NWRywgbGlmZWN5Y2xlKTtcclxuICAgICAgICB2YXIgaW5wdXQgPSBpbnN0YW5jZS5fbGFzdElucHV0O1xyXG4gICAgICAgIGluc3RhbmNlLl92Tm9kZSA9IHZOb2RlO1xyXG4gICAgICAgIHZOb2RlLmRvbSA9IGRvbSA9IG1vdW50KGlucHV0LCBudWxsLCBsaWZlY3ljbGUsIGluc3RhbmNlLl9jaGlsZENvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHBhcmVudERvbSkpIHtcclxuICAgICAgICAgICAgdXRpbHNfMS5hcHBlbmRDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vdW50Q2xhc3NDb21wb25lbnRDYWxsYmFja3Modk5vZGUsIHJlZiwgaW5zdGFuY2UsIGxpZmVjeWNsZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9wdGlvbnNfMS5vcHRpb25zLmZpbmRET01Ob2RlRW5hYmxlZCkge1xyXG4gICAgICAgICAgICByZW5kZXJpbmdfMS5jb21wb25lbnRUb0RPTU5vZGVNYXAuc2V0KGluc3RhbmNlLCBkb20pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IHV0aWxzXzEuY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudElucHV0KHZOb2RlLCB0eXBlLCBwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdk5vZGUuZG9tID0gZG9tID0gbW91bnQoaW5wdXQsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgIHZOb2RlLmNoaWxkcmVuID0gaW5wdXQ7XHJcbiAgICAgICAgbW91bnRGdW5jdGlvbmFsQ29tcG9uZW50Q2FsbGJhY2tzKHJlZiwgZG9tLCBsaWZlY3ljbGUpO1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGwocGFyZW50RG9tKSkge1xyXG4gICAgICAgICAgICB1dGlsc18xLmFwcGVuZENoaWxkKHBhcmVudERvbSwgZG9tKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9tO1xyXG59XHJcbmV4cG9ydHMubW91bnRDb21wb25lbnQgPSBtb3VudENvbXBvbmVudDtcclxuZnVuY3Rpb24gbW91bnRDbGFzc0NvbXBvbmVudENhbGxiYWNrcyh2Tm9kZSwgcmVmLCBpbnN0YW5jZSwgbGlmZWN5Y2xlKSB7XHJcbiAgICBpZiAocmVmKSB7XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNGdW5jdGlvbihyZWYpKSB7XHJcbiAgICAgICAgICAgIHJlZihpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNTdHJpbmdPck51bWJlcihyZWYpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCdzdHJpbmcgXCJyZWZzXCIgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gSW5mZXJubyAxLjAuIFVzZSBjYWxsYmFjayBcInJlZnNcIiBpbnN0ZWFkLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc09iamVjdChyZWYpICYmICh2Tm9kZS5mbGFncyAmIDQgLyogQ29tcG9uZW50Q2xhc3MgKi8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCdmdW5jdGlvbmFsIGNvbXBvbmVudCBsaWZlY3ljbGUgZXZlbnRzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIEVTMjAxNSBjbGFzcyBjb21wb25lbnRzLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKFwiYSBiYWQgdmFsdWUgZm9yIFxcXCJyZWZcXFwiIHdhcyB1c2VkIG9uIGNvbXBvbmVudDogXFxcIlwiICsgSlNPTi5zdHJpbmdpZnkocmVmKSArIFwiXFxcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgaGFzRGlkTW91bnQgPSAhaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChpbnN0YW5jZS5jb21wb25lbnREaWRNb3VudCk7XHJcbiAgICB2YXIgYWZ0ZXJNb3VudCA9IG9wdGlvbnNfMS5vcHRpb25zLmFmdGVyTW91bnQ7XHJcbiAgICBpZiAoaGFzRGlkTW91bnQgfHwgIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKGFmdGVyTW91bnQpKSB7XHJcbiAgICAgICAgbGlmZWN5Y2xlLmFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2UuX3VwZGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGFmdGVyTW91bnQpIHtcclxuICAgICAgICAgICAgICAgIGFmdGVyTW91bnQodk5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoYXNEaWRNb3VudCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY29tcG9uZW50RGlkTW91bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnN0YW5jZS5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLm1vdW50Q2xhc3NDb21wb25lbnRDYWxsYmFja3MgPSBtb3VudENsYXNzQ29tcG9uZW50Q2FsbGJhY2tzO1xyXG5mdW5jdGlvbiBtb3VudEZ1bmN0aW9uYWxDb21wb25lbnRDYWxsYmFja3MocmVmLCBkb20sIGxpZmVjeWNsZSkge1xyXG4gICAgaWYgKHJlZikge1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKHJlZi5vbkNvbXBvbmVudFdpbGxNb3VudCkpIHtcclxuICAgICAgICAgICAgcmVmLm9uQ29tcG9uZW50V2lsbE1vdW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKHJlZi5vbkNvbXBvbmVudERpZE1vdW50KSkge1xyXG4gICAgICAgICAgICBsaWZlY3ljbGUuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVmLm9uQ29tcG9uZW50RGlkTW91bnQoZG9tKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubW91bnRGdW5jdGlvbmFsQ29tcG9uZW50Q2FsbGJhY2tzID0gbW91bnRGdW5jdGlvbmFsQ29tcG9uZW50Q2FsbGJhY2tzO1xyXG5mdW5jdGlvbiBtb3VudFJlZihkb20sIHZhbHVlLCBsaWZlY3ljbGUpIHtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzRnVuY3Rpb24odmFsdWUpKSB7XHJcbiAgICAgICAgbGlmZWN5Y2xlLmFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbHVlKGRvbSk7IH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcignc3RyaW5nIFwicmVmc1wiIGFyZSBub3Qgc3VwcG9ydGVkIGluIEluZmVybm8gMS4wLiBVc2UgY2FsbGJhY2sgXCJyZWZzXCIgaW5zdGVhZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5tb3VudFJlZiA9IG1vdW50UmVmO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5mZXJuby9kaXN0L0RPTS9tb3VudGluZy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL29wdGlvbnNcIik7XHJcbnZhciBwYXRjaGluZ18xID0gcmVxdWlyZShcIi4vcGF0Y2hpbmdcIik7XHJcbnZhciByZWN5Y2xpbmdfMSA9IHJlcXVpcmUoXCIuL3JlY3ljbGluZ1wiKTtcclxudmFyIHJlbmRlcmluZ18xID0gcmVxdWlyZShcIi4vcmVuZGVyaW5nXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG5mdW5jdGlvbiB1bm1vdW50KHZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY2FuUmVjeWNsZSwgaXNSZWN5Y2xpbmcpIHtcclxuICAgIHZhciBmbGFncyA9IHZOb2RlLmZsYWdzO1xyXG4gICAgaWYgKGZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgdW5tb3VudENvbXBvbmVudCh2Tm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNhblJlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZsYWdzICYgMzk3MCAvKiBFbGVtZW50ICovKSB7XHJcbiAgICAgICAgdW5tb3VudEVsZW1lbnQodk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjYW5SZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmbGFncyAmICgxIC8qIFRleHQgKi8gfCA0MDk2IC8qIFZvaWQgKi8pKSB7XHJcbiAgICAgICAgdW5tb3VudFZvaWRPclRleHQodk5vZGUsIHBhcmVudERvbSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy51bm1vdW50ID0gdW5tb3VudDtcclxuZnVuY3Rpb24gdW5tb3VudFZvaWRPclRleHQodk5vZGUsIHBhcmVudERvbSkge1xyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgdXRpbHNfMS5yZW1vdmVDaGlsZChwYXJlbnREb20sIHZOb2RlLmRvbSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdW5tb3VudENvbXBvbmVudCh2Tm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNhblJlY3ljbGUsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICB2YXIgaW5zdGFuY2UgPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIHZhciBmbGFncyA9IHZOb2RlLmZsYWdzO1xyXG4gICAgdmFyIGlzU3RhdGVmdWxDb21wb25lbnQgPSBmbGFncyAmIDQgLyogQ29tcG9uZW50Q2xhc3MgKi87XHJcbiAgICB2YXIgcmVmID0gdk5vZGUucmVmO1xyXG4gICAgdmFyIGRvbSA9IHZOb2RlLmRvbTtcclxuICAgIGlmICghaXNSZWN5Y2xpbmcpIHtcclxuICAgICAgICBpZiAoaXNTdGF0ZWZ1bENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlLl91bm1vdW50ZWQpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLl9ibG9ja1NldFN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGwob3B0aW9uc18xLm9wdGlvbnMuYmVmb3JlVW5tb3VudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXzEub3B0aW9ucy5iZWZvcmVVbm1vdW50KHZOb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChpbnN0YW5jZS5jb21wb25lbnRXaWxsVW5tb3VudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlZiAmJiAhaXNSZWN5Y2xpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWYobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5fdW5tb3VudGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zXzEub3B0aW9ucy5maW5kRE9NTm9kZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJpbmdfMS5jb21wb25lbnRUb0RPTU5vZGVNYXAuZGVsZXRlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVubW91bnQoaW5zdGFuY2UuX2xhc3RJbnB1dCwgbnVsbCwgaW5zdGFuY2UuX2xpZmVjeWNsZSwgZmFsc2UsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYocmVmKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYocmVmLm9uQ29tcG9uZW50V2lsbFVubW91bnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmLm9uQ29tcG9uZW50V2lsbFVubW91bnQoZG9tKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1bm1vdW50KGluc3RhbmNlLCBudWxsLCBsaWZlY3ljbGUsIGZhbHNlLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhcmVudERvbSkge1xyXG4gICAgICAgIHZhciBsYXN0SW5wdXQgPSBpbnN0YW5jZS5fbGFzdElucHV0O1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobGFzdElucHV0KSkge1xyXG4gICAgICAgICAgICBsYXN0SW5wdXQgPSBpbnN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXRpbHNfMS5yZW1vdmVDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9uc18xLm9wdGlvbnMucmVjeWNsaW5nRW5hYmxlZCAmJiAhaXNTdGF0ZWZ1bENvbXBvbmVudCAmJiAocGFyZW50RG9tIHx8IGNhblJlY3ljbGUpKSB7XHJcbiAgICAgICAgcmVjeWNsaW5nXzEucG9vbENvbXBvbmVudCh2Tm9kZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy51bm1vdW50Q29tcG9uZW50ID0gdW5tb3VudENvbXBvbmVudDtcclxuZnVuY3Rpb24gdW5tb3VudEVsZW1lbnQodk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjYW5SZWN5Y2xlLCBpc1JlY3ljbGluZykge1xyXG4gICAgdmFyIGRvbSA9IHZOb2RlLmRvbTtcclxuICAgIHZhciByZWYgPSB2Tm9kZS5yZWY7XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcztcclxuICAgIGlmIChyZWYgJiYgIWlzUmVjeWNsaW5nKSB7XHJcbiAgICAgICAgdW5tb3VudFJlZihyZWYpO1xyXG4gICAgfVxyXG4gICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW47XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihjaGlsZHJlbikpIHtcclxuICAgICAgICB1bm1vdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwcm9wcykpIHtcclxuICAgICAgICBmb3IgKHZhciBuYW1lXzEgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90IGFkZCBhIGhhc093blByb3BlcnR5IGNoZWNrIGhlcmUsIGl0IGFmZmVjdHMgcGVyZm9ybWFuY2VcclxuICAgICAgICAgICAgaWYgKHByb3BzW25hbWVfMV0gIT09IG51bGwgJiYgcGF0Y2hpbmdfMS5pc0F0dHJBbkV2ZW50KG5hbWVfMSkpIHtcclxuICAgICAgICAgICAgICAgIHBhdGNoaW5nXzEucGF0Y2hFdmVudChuYW1lXzEsIHByb3BzW25hbWVfMV0sIG51bGwsIGRvbSk7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHNldCB0aGlzIG51bGwsIGJlY2F1c2Ugc2FtZSBwcm9wcyBvdGhlcndpc2UgY29tZSBiYWNrIGlmIFNDVSByZXR1cm5zIGZhbHNlIGFuZCB3ZSBhcmUgcmVjeWxpbmdcclxuICAgICAgICAgICAgICAgIHByb3BzW25hbWVfMV0gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgdXRpbHNfMS5yZW1vdmVDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9uc18xLm9wdGlvbnMucmVjeWNsaW5nRW5hYmxlZCAmJiAocGFyZW50RG9tIHx8IGNhblJlY3ljbGUpKSB7XHJcbiAgICAgICAgcmVjeWNsaW5nXzEucG9vbEVsZW1lbnQodk5vZGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMudW5tb3VudEVsZW1lbnQgPSB1bm1vdW50RWxlbWVudDtcclxuZnVuY3Rpb24gdW5tb3VudENoaWxkcmVuKGNoaWxkcmVuLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChjaGlsZCkgJiYgaW5mZXJub19zaGFyZWRfMS5pc09iamVjdChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIHVubW91bnQoY2hpbGQsIG51bGwsIGxpZmVjeWNsZSwgZmFsc2UsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNPYmplY3QoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdW5tb3VudChjaGlsZHJlbiwgbnVsbCwgbGlmZWN5Y2xlLCBmYWxzZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHVubW91bnRSZWYocmVmKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0Z1bmN0aW9uKHJlZikpIHtcclxuICAgICAgICByZWYobnVsbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQocmVmKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcignc3RyaW5nIFwicmVmc1wiIGFyZSBub3Qgc3VwcG9ydGVkIGluIEluZmVybm8gMS4wLiBVc2UgY2FsbGJhY2sgXCJyZWZzXCIgaW5zdGVhZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8vZGlzdC9ET00vdW5tb3VudGluZy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBJbnB1dFdyYXBwZXJfMSA9IHJlcXVpcmUoXCIuL0lucHV0V3JhcHBlclwiKTtcclxudmFyIFNlbGVjdFdyYXBwZXJfMSA9IHJlcXVpcmUoXCIuL1NlbGVjdFdyYXBwZXJcIik7XHJcbnZhciBUZXh0YXJlYVdyYXBwZXJfMSA9IHJlcXVpcmUoXCIuL1RleHRhcmVhV3JhcHBlclwiKTtcclxuLyoqXHJcbiAqIFRoZXJlIGlzIGN1cnJlbnRseSBubyBzdXBwb3J0IGZvciBzd2l0Y2hpbmcgc2FtZSBpbnB1dCBiZXR3ZWVuIGNvbnRyb2xsZWQgYW5kIG5vbkNvbnRyb2xsZWRcclxuICogSWYgdGhhdCBldmVyIGJlY29tZXMgYSByZWFsIGlzc3VlLCB0aGVuIHJlIGRlc2lnbiBjb250cm9sbGVkIGVsZW1lbnRzXHJcbiAqIEN1cnJlbnRseSB1c2VyIG11c3QgY2hvb3NlIGVpdGhlciBjb250cm9sbGVkIG9yIG5vbi1jb250cm9sbGVkIGFuZCBzdGljayB3aXRoIHRoYXRcclxuICovXHJcbmZ1bmN0aW9uIHByb2Nlc3NFbGVtZW50KGZsYWdzLCB2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKSB7XHJcbiAgICBpZiAoZmxhZ3MgJiA1MTIgLyogSW5wdXRFbGVtZW50ICovKSB7XHJcbiAgICAgICAgSW5wdXRXcmFwcGVyXzEucHJvY2Vzc0lucHV0KHZOb2RlLCBkb20sIG5leHRQcm9wc09yRW1wdHksIG1vdW50aW5nLCBpc0NvbnRyb2xsZWQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZsYWdzICYgMjA0OCAvKiBTZWxlY3RFbGVtZW50ICovKSB7XHJcbiAgICAgICAgU2VsZWN0V3JhcHBlcl8xLnByb2Nlc3NTZWxlY3Qodk5vZGUsIGRvbSwgbmV4dFByb3BzT3JFbXB0eSwgbW91bnRpbmcsIGlzQ29udHJvbGxlZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZmxhZ3MgJiAxMDI0IC8qIFRleHRhcmVhRWxlbWVudCAqLykge1xyXG4gICAgICAgIFRleHRhcmVhV3JhcHBlcl8xLnByb2Nlc3NUZXh0YXJlYSh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnByb2Nlc3NFbGVtZW50ID0gcHJvY2Vzc0VsZW1lbnQ7XHJcbmZ1bmN0aW9uIGlzQ29udHJvbGxlZEZvcm1FbGVtZW50KG5leHRQcm9wc09yRW1wdHkpIHtcclxuICAgIHJldHVybiAobmV4dFByb3BzT3JFbXB0eS50eXBlICYmIElucHV0V3JhcHBlcl8xLmlzQ2hlY2tlZFR5cGUobmV4dFByb3BzT3JFbXB0eS50eXBlKSkgPyAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRQcm9wc09yRW1wdHkuY2hlY2tlZCkgOiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRQcm9wc09yRW1wdHkudmFsdWUpO1xyXG59XHJcbmV4cG9ydHMuaXNDb250cm9sbGVkRm9ybUVsZW1lbnQgPSBpc0NvbnRyb2xsZWRGb3JtRWxlbWVudDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8vZGlzdC9ET00vd3JhcHBlcnMvcHJvY2Vzc0VsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0JykuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8tY29tcG9uZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIHBhdGNoaW5nXzEgPSByZXF1aXJlKFwiLi9wYXRjaGluZ1wiKTtcclxudmFyIGNvbXBvbmVudFBvb2xzID0gbmV3IE1hcCgpO1xyXG52YXIgZWxlbWVudFBvb2xzID0gbmV3IE1hcCgpO1xyXG5mdW5jdGlvbiByZWN5Y2xlRWxlbWVudCh2Tm9kZSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykge1xyXG4gICAgdmFyIHRhZyA9IHZOb2RlLnR5cGU7XHJcbiAgICB2YXIgcG9vbHMgPSBlbGVtZW50UG9vbHMuZ2V0KHRhZyk7XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQocG9vbHMpKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHZOb2RlLmtleTtcclxuICAgICAgICB2YXIgcG9vbCA9IGtleSA9PT0gbnVsbCA/IHBvb2xzLm5vbktleWVkIDogcG9vbHMua2V5ZWQuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHBvb2wpKSB7XHJcbiAgICAgICAgICAgIHZhciByZWN5Y2xlZFZOb2RlID0gcG9vbC5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHJlY3ljbGVkVk5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRjaGluZ18xLnBhdGNoRWxlbWVudChyZWN5Y2xlZFZOb2RlLCB2Tm9kZSwgbnVsbCwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdk5vZGUuZG9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuZXhwb3J0cy5yZWN5Y2xlRWxlbWVudCA9IHJlY3ljbGVFbGVtZW50O1xyXG5mdW5jdGlvbiBwb29sRWxlbWVudCh2Tm9kZSkge1xyXG4gICAgdmFyIHRhZyA9IHZOb2RlLnR5cGU7XHJcbiAgICB2YXIga2V5ID0gdk5vZGUua2V5O1xyXG4gICAgdmFyIHBvb2xzID0gZWxlbWVudFBvb2xzLmdldCh0YWcpO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQocG9vbHMpKSB7XHJcbiAgICAgICAgcG9vbHMgPSB7XHJcbiAgICAgICAgICAgIGtleWVkOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgIG5vbktleWVkOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZWxlbWVudFBvb2xzLnNldCh0YWcsIHBvb2xzKTtcclxuICAgIH1cclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChrZXkpKSB7XHJcbiAgICAgICAgcG9vbHMubm9uS2V5ZWQucHVzaCh2Tm9kZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgcG9vbCA9IHBvb2xzLmtleWVkLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHBvb2wpKSB7XHJcbiAgICAgICAgICAgIHBvb2wgPSBbXTtcclxuICAgICAgICAgICAgcG9vbHMua2V5ZWQuc2V0KGtleSwgcG9vbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvb2wucHVzaCh2Tm9kZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wb29sRWxlbWVudCA9IHBvb2xFbGVtZW50O1xyXG5mdW5jdGlvbiByZWN5Y2xlQ29tcG9uZW50KHZOb2RlLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSB7XHJcbiAgICB2YXIgdHlwZSA9IHZOb2RlLnR5cGU7XHJcbiAgICB2YXIgcG9vbHMgPSBjb21wb25lbnRQb29scy5nZXQodHlwZSk7XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQocG9vbHMpKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHZOb2RlLmtleTtcclxuICAgICAgICB2YXIgcG9vbCA9IGtleSA9PT0gbnVsbCA/IHBvb2xzLm5vbktleWVkIDogcG9vbHMua2V5ZWQuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHBvb2wpKSB7XHJcbiAgICAgICAgICAgIHZhciByZWN5Y2xlZFZOb2RlID0gcG9vbC5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHJlY3ljbGVkVk5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmxhZ3MgPSB2Tm9kZS5mbGFncztcclxuICAgICAgICAgICAgICAgIHZhciBmYWlsZWQgPSBwYXRjaGluZ18xLnBhdGNoQ29tcG9uZW50KHJlY3ljbGVkVk5vZGUsIHZOb2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBmbGFncyAmIDQgLyogQ29tcG9uZW50Q2xhc3MgKi8sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdk5vZGUuZG9tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuZXhwb3J0cy5yZWN5Y2xlQ29tcG9uZW50ID0gcmVjeWNsZUNvbXBvbmVudDtcclxuZnVuY3Rpb24gcG9vbENvbXBvbmVudCh2Tm9kZSkge1xyXG4gICAgdmFyIGhvb2tzID0gdk5vZGUucmVmO1xyXG4gICAgdmFyIG5vblJlY3ljbGVIb29rcyA9IGhvb2tzICYmIChob29rcy5vbkNvbXBvbmVudFdpbGxNb3VudCB8fFxyXG4gICAgICAgIGhvb2tzLm9uQ29tcG9uZW50V2lsbFVubW91bnQgfHxcclxuICAgICAgICBob29rcy5vbkNvbXBvbmVudERpZE1vdW50IHx8XHJcbiAgICAgICAgaG9va3Mub25Db21wb25lbnRXaWxsVXBkYXRlIHx8XHJcbiAgICAgICAgaG9va3Mub25Db21wb25lbnREaWRVcGRhdGUpO1xyXG4gICAgaWYgKG5vblJlY3ljbGVIb29rcykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB0eXBlID0gdk5vZGUudHlwZTtcclxuICAgIHZhciBrZXkgPSB2Tm9kZS5rZXk7XHJcbiAgICB2YXIgcG9vbHMgPSBjb21wb25lbnRQb29scy5nZXQodHlwZSk7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChwb29scykpIHtcclxuICAgICAgICBwb29scyA9IHtcclxuICAgICAgICAgICAga2V5ZWQ6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgbm9uS2V5ZWQ6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb21wb25lbnRQb29scy5zZXQodHlwZSwgcG9vbHMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsKGtleSkpIHtcclxuICAgICAgICBwb29scy5ub25LZXllZC5wdXNoKHZOb2RlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBwb29sID0gcG9vbHMua2V5ZWQuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQocG9vbCkpIHtcclxuICAgICAgICAgICAgcG9vbCA9IFtdO1xyXG4gICAgICAgICAgICBwb29scy5rZXllZC5zZXQoa2V5LCBwb29sKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9vbC5wdXNoKHZOb2RlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnBvb2xDb21wb25lbnQgPSBwb29sQ29tcG9uZW50O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5mZXJuby9kaXN0L0RPTS9yZWN5Y2xpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG52YXIgVk5vZGVzXzEgPSByZXF1aXJlKFwiLi9WTm9kZXNcIik7XHJcbmZ1bmN0aW9uIGFwcGx5S2V5KGtleSwgdk5vZGUpIHtcclxuICAgIHZOb2RlLmtleSA9IGtleTtcclxuICAgIHJldHVybiB2Tm9kZTtcclxufVxyXG5mdW5jdGlvbiBhcHBseUtleUlmTWlzc2luZyhrZXksIHZOb2RlKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bWJlcihrZXkpKSB7XHJcbiAgICAgICAga2V5ID0gXCIuXCIgKyBrZXk7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGwodk5vZGUua2V5KSB8fCB2Tm9kZS5rZXlbMF0gPT09ICcuJykge1xyXG4gICAgICAgIHJldHVybiBhcHBseUtleShrZXksIHZOb2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2Tm9kZTtcclxufVxyXG5mdW5jdGlvbiBhcHBseUtleVByZWZpeChrZXksIHZOb2RlKSB7XHJcbiAgICB2Tm9kZS5rZXkgPSBrZXkgKyB2Tm9kZS5rZXk7XHJcbiAgICByZXR1cm4gdk5vZGU7XHJcbn1cclxuZnVuY3Rpb24gX25vcm1hbGl6ZVZOb2Rlcyhub2RlcywgcmVzdWx0LCBpbmRleCwgY3VycmVudEtleSkge1xyXG4gICAgZm9yICh2YXIgbGVuID0gbm9kZXMubGVuZ3RoOyBpbmRleCA8IGxlbjsgaW5kZXgrKykge1xyXG4gICAgICAgIHZhciBuID0gbm9kZXNbaW5kZXhdO1xyXG4gICAgICAgIHZhciBrZXkgPSBjdXJyZW50S2V5ICsgXCIuXCIgKyBpbmRleDtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKG4pKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkobikpIHtcclxuICAgICAgICAgICAgICAgIF9ub3JtYWxpemVWTm9kZXMobiwgcmVzdWx0LCAwLCBrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNTdHJpbmdPck51bWJlcihuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBWTm9kZXNfMS5jcmVhdGVUZXh0Vk5vZGUobiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChWTm9kZXNfMS5pc1ZOb2RlKG4pICYmIG4uZG9tIHx8IChuLmtleSAmJiBuLmtleVswXSA9PT0gJy4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChuLmtleSkgfHwgbi5rZXlbMF0gPT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG4gPSBhcHBseUtleShrZXksIG4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IGFwcGx5S2V5UHJlZml4KGN1cnJlbnRLZXksIG4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbm9ybWFsaXplVk5vZGVzKG5vZGVzKSB7XHJcbiAgICB2YXIgbmV3Tm9kZXM7XHJcbiAgICAvLyB3ZSBhc3NpZ24gJCB3aGljaCBiYXNpY2FsbHkgbWVhbnMgd2UndmUgZmxhZ2dlZCB0aGlzIGFycmF5IGZvciBmdXR1cmUgbm90ZVxyXG4gICAgLy8gaWYgaXQgY29tZXMgYmFjayBhZ2Fpbiwgd2UgbmVlZCB0byBjbG9uZSBpdCwgYXMgcGVvcGxlIGFyZSB1c2luZyBpdFxyXG4gICAgLy8gaW4gYW4gaW1tdXRhYmxlIHdheVxyXG4gICAgLy8gdHNsaW50OmRpc2FibGVcclxuICAgIGlmIChub2Rlc1snJCddID09PSB0cnVlKSB7XHJcbiAgICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbm9kZXNbJyQnXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyB0c2xpbnQ6ZW5hYmxlXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbm9kZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgbiA9IG5vZGVzW2ldO1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChuKSB8fCBpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkobikpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IChuZXdOb2RlcyB8fCBub2Rlcykuc2xpY2UoMCwgaSk7XHJcbiAgICAgICAgICAgIF9ub3JtYWxpemVWTm9kZXMobm9kZXMsIHJlc3VsdCwgaSwgXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNTdHJpbmdPck51bWJlcihuKSkge1xyXG4gICAgICAgICAgICBpZiAoIW5ld05vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5vZGVzLnNsaWNlKDAsIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld05vZGVzLnB1c2goYXBwbHlLZXlJZk1pc3NpbmcoaSwgVk5vZGVzXzEuY3JlYXRlVGV4dFZOb2RlKG4sIG51bGwpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChWTm9kZXNfMS5pc1ZOb2RlKG4pICYmIG4uZG9tICE9PSBudWxsKSB8fCAoaW5mZXJub19zaGFyZWRfMS5pc051bGwobi5rZXkpICYmIChuLmZsYWdzICYgNjQgLyogSGFzTm9uS2V5ZWRDaGlsZHJlbiAqLykgPT09IDApKSB7XHJcbiAgICAgICAgICAgIGlmICghbmV3Tm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbm9kZXMuc2xpY2UoMCwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChhcHBseUtleUlmTWlzc2luZyhpLCBWTm9kZXNfMS5kaXJlY3RDbG9uZShuKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXdOb2Rlcykge1xyXG4gICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKGFwcGx5S2V5SWZNaXNzaW5nKGksIFZOb2Rlc18xLmRpcmVjdENsb25lKG4pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld05vZGVzIHx8IG5vZGVzO1xyXG59XHJcbmV4cG9ydHMubm9ybWFsaXplVk5vZGVzID0gbm9ybWFsaXplVk5vZGVzO1xyXG5mdW5jdGlvbiBub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShjaGlsZHJlbikpIHtcclxuICAgICAgICByZXR1cm4gbm9ybWFsaXplVk5vZGVzKGNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFZOb2Rlc18xLmlzVk5vZGUoY2hpbGRyZW4pICYmIGNoaWxkcmVuLmRvbSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBWTm9kZXNfMS5kaXJlY3RDbG9uZShjaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hpbGRyZW47XHJcbn1cclxuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHModk5vZGUsIHByb3BzLCBjaGlsZHJlbikge1xyXG4gICAgaWYgKHZOb2RlLmZsYWdzICYgMzk3MCAvKiBFbGVtZW50ICovKSB7XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihjaGlsZHJlbikgJiYgIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihwcm9wcy5jaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgdk5vZGUuY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYocHJvcHMuY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICB2Tm9kZS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBwcm9wcy5jbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHByb3BzLnJlZikge1xyXG4gICAgICAgIHZOb2RlLnJlZiA9IHByb3BzLnJlZjtcclxuICAgICAgICBkZWxldGUgcHJvcHMucmVmO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYocHJvcHMua2V5KSkge1xyXG4gICAgICAgIHZOb2RlLmtleSA9IHByb3BzLmtleTtcclxuICAgICAgICBkZWxldGUgcHJvcHMua2V5O1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEZsYWdzRm9yRWxlbWVudFZub2RlKHR5cGUpIHtcclxuICAgIGlmICh0eXBlID09PSAnc3ZnJykge1xyXG4gICAgICAgIHJldHVybiAxMjggLyogU3ZnRWxlbWVudCAqLztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdpbnB1dCcpIHtcclxuICAgICAgICByZXR1cm4gNTEyIC8qIElucHV0RWxlbWVudCAqLztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdzZWxlY3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIDIwNDggLyogU2VsZWN0RWxlbWVudCAqLztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICByZXR1cm4gMTAyNCAvKiBUZXh0YXJlYUVsZW1lbnQgKi87XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlID09PSAnbWVkaWEnKSB7XHJcbiAgICAgICAgcmV0dXJuIDI1NiAvKiBNZWRpYUVsZW1lbnQgKi87XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMiAvKiBIdG1sRWxlbWVudCAqLztcclxufVxyXG5leHBvcnRzLmdldEZsYWdzRm9yRWxlbWVudFZub2RlID0gZ2V0RmxhZ3NGb3JFbGVtZW50Vm5vZGU7XHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZSh2Tm9kZSkge1xyXG4gICAgdmFyIHByb3BzID0gdk5vZGUucHJvcHM7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIC8vIGNvbnZlcnQgYSB3cm9uZ2x5IGNyZWF0ZWQgdHlwZSBiYWNrIHRvIGVsZW1lbnRcclxuICAgIC8vIFByaW1pdGl2ZSBub2RlIGRvZXNuJ3QgaGF2ZSBkZWZhdWx0UHJvcHMsIG9ubHkgQ29tcG9uZW50XHJcbiAgICBpZiAodk5vZGUuZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pIHtcclxuICAgICAgICAvLyBzZXQgZGVmYXVsdCBwcm9wc1xyXG4gICAgICAgIHZhciB0eXBlID0gdk5vZGUudHlwZTtcclxuICAgICAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYoZGVmYXVsdFByb3BzKSkge1xyXG4gICAgICAgICAgICBpZiAoIXByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wcyA9IHZOb2RlLnByb3BzID0gZGVmYXVsdFByb3BzOyAvLyBDcmVhdGUgbmV3IG9iamVjdCBpZiBvbmx5IGRlZmF1bHRQcm9wcyBnaXZlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBkZWZhdWx0UHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChwcm9wc1twcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSBkZWZhdWx0UHJvcHNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nKHR5cGUpKSB7XHJcbiAgICAgICAgICAgIHZOb2RlLmZsYWdzID0gZ2V0RmxhZ3NGb3JFbGVtZW50Vm5vZGUodHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChwcm9wcyAmJiBwcm9wcy5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgdk5vZGUuY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocHJvcHMpIHtcclxuICAgICAgICBub3JtYWxpemVQcm9wcyh2Tm9kZSwgcHJvcHMsIGNoaWxkcmVuKTtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKHByb3BzLmNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IG5vcm1hbGl6ZUNoaWxkcmVuKHByb3BzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGNoaWxkcmVuKSkge1xyXG4gICAgICAgIHZOb2RlLmNoaWxkcmVuID0gbm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBzdHJpcHBlZCBvdXQgZnJvbSBwcm9kdWN0aW9uIENPREVcclxuICAgICAgICAvLyBJdCBoZWxwcyB1c2VycyB0byB0cmFjayBlcnJvcnMgaW4gdGhlaXIgYXBwbGljYXRpb25zLlxyXG4gICAgICAgIHZhciB2ZXJpZnlLZXlzID0gZnVuY3Rpb24gKHZOb2Rlcykge1xyXG4gICAgICAgICAgICB2YXIga2V5VmFsdWVzID0gdk5vZGVzLm1hcChmdW5jdGlvbiAodm5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2bm9kZS5rZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBrZXlWYWx1ZXMuc29tZShmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzRHVwbGljYXRlID0ga2V5VmFsdWVzLmluZGV4T2YoaXRlbSkgIT09IGlkeDtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNEdXBsaWNhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLndhcm5pbmcoJ0luZmVybm8gbm9ybWFsaXNhdGlvbiguLi4pOiBFbmNvdW50ZXJlZCB0d28gY2hpbGRyZW4gd2l0aCBzYW1lIGtleSwgYWxsIGtleXMgbXVzdCBiZSB1bmlxdWUgd2l0aGluIGl0cyBzaWJsaW5ncy4gRHVwbGljYXRlZCBrZXkgaXM6JyArIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhc0R1cGxpY2F0ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodk5vZGUuY2hpbGRyZW4gJiYgQXJyYXkuaXNBcnJheSh2Tm9kZS5jaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgdmVyaWZ5S2V5cyh2Tm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5mZXJuby9kaXN0L2NvcmUvbm9ybWFsaXphdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEluZmVybm8gZnJvbSAnaW5mZXJubyc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ2luZmVybm8tY29tcG9uZW50JztcblxuZXhwb3J0IGNsYXNzIFN1YmplY3REcm9wZG93biBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN1YmplY3RzID0gW1wia1wiLCBcImxcIiwgXCJtXCJdO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImNvbHVtblwiPntcbiAgICAgICAgICAgICAgICB0aGlzLnN1YmplY3RzLm1hcCgoc3ViamVjdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj57IHN1YmplY3QgfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH08L3NlbGVjdD5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmVoaWNsZS9jb21wb25lbnRzLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0JykuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8tY3JlYXRlLWVsZW1lbnQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBJbmZlcm5vLCB7IGxpbmtFdmVudCB9IGZyb20gXCJpbmZlcm5vXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJpbmZlcm5vLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJpbmZlcm5vLWNyZWF0ZS1lbGVtZW50XCI7XG5cbmltcG9ydCB7IFN1YmplY3REcm9wZG93biB9IGZyb20gJy4vY29tcG9uZW50cy5qc3gnXG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb3VudGVyOiAwLFxuICAgICAgaW5wdXRWYWw6IDAsIFxuICAgIH07XG5cbiAgICB0aGlzLnJvd3MgPSBbXG4gICAgICB7bmFtZTogXCJzYWxlXCIsICBzdWJqZWN0OiBcImtcIiwgaW86IFwiaVwiLCBhbW91bnQ6IDEwMDAwfSxcbiAgICAgIHtuYW1lOiBcImZvb2RcIiwgIHN1YmplY3Q6IFwibFwiLCBpbzogXCJvXCIsIGFtb3VudDogMTAwMH0sXG4gICAgICB7bmFtZTogXCJwYXBlclwiLCBzdWJqZWN0OiBcIm1cIiwgaW86IFwib1wiLCBhbW91bnQ6IDIwMDB9LFxuICAgICAge25hbWU6IFwidHJhaW5cIiwgc3ViamVjdDogXCJcIiwgIGlvOiBcIm9cIiwgYW1vdW50OiAxMDAwfSxcbiAgICAgIHtuYW1lOiBcImhvdGVsXCIsIHN1YmplY3Q6IFwia1wiLCBpbzogXCJvXCIsIGFtb3VudDogNTAwMH0sXG4gICAgXTtcbiAgICB0aGlzLnN1bSA9IDA7XG5cbiAgICB0aGlzLmlucHV0T25DaGFuZ2UgPSBmdW5jdGlvbihpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgIGluc3RhbmNlLnNldFN0YXRlKHtcbiAgICAgICAgaW5wdXRWYWw6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgxPk5hc2NhPC9oMT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3Bhbj5Db3VudGVyIGlzIGF0OiB7IHRoaXMuc3RhdGUuY291bnRlciB9PC9zcGFuPlxuICAgICAgICAgIDxociAvPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucm93cy5tYXAoKHJvdywgaSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb2x1bW5cIj57IHJvdy5uYW1lIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8U3ViamVjdERyb3Bkb3duIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb2x1bW5cIj57IHJvdy5pbyA9PT0gXCJpXCIgPyBcIkluY29tZVwiIDogXCJPdXRjb21lXCIgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG9uSW5wdXQ9eyBsaW5rRXZlbnQodGhpcywgdGhpcy5pbnB1dE9uQ2hhbmdlKSB9IHZhbHVlPXsgdGhpcy5zdGF0ZS5pbnB1dFZhbCB9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+eyB0aGlzLnJvd3MucmVkdWNlKCh4LCB5KSA9PiB7IGxldCB6ID0geDsgei5hbW91bnQgKz0geS5hbW91bnQ7IHJldHVybiB6IH0pLmFtb3VudCB9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbkluZmVybm8ucmVuZGVyKFxuICA8QXBwIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKVxuKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmVoaWNsZS9hcHAuanN4IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLy8gTWFrZSBzdXJlIHUgdXNlIEVNUFRZX09CSiBmcm9tICdpbmZlcm5vJywgb3RoZXJ3aXNlIGl0J2xsIGJlIGEgZGlmZmVyZW50IHJlZmVyZW5jZVxyXG52YXIgaW5mZXJub18xID0gcmVxdWlyZShcImluZmVybm9cIik7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG52YXIgbm9PcCA9IGluZmVybm9fc2hhcmVkXzEuRVJST1JfTVNHO1xyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgbm9PcCA9ICdJbmZlcm5vIEVycm9yOiBDYW4gb25seSB1cGRhdGUgYSBtb3VudGVkIG9yIG1vdW50aW5nIGNvbXBvbmVudC4gVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgc2V0U3RhdGUoKSBvciBmb3JjZVVwZGF0ZSgpIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuIFRoaXMgaXMgYSBuby1vcC4nO1xyXG59XHJcbnZhciBjb21wb25lbnRDYWxsYmFja1F1ZXVlID0gbmV3IE1hcCgpO1xyXG4vLyB3aGVuIGEgY29tcG9uZW50cyByb290IFZOb2RlIGlzIGFsc28gYSBjb21wb25lbnQsIHdlIGNhbiBydW4gaW50byBpc3N1ZXNcclxuLy8gdGhpcyB3aWxsIHJlY3Vyc2l2ZWx5IGxvb2sgZm9yIHZOb2RlLnBhcmVudE5vZGUgaWYgdGhlIFZOb2RlIGlzIGEgY29tcG9uZW50XHJcbmZ1bmN0aW9uIHVwZGF0ZVBhcmVudENvbXBvbmVudFZOb2Rlcyh2Tm9kZSwgZG9tKSB7XHJcbiAgICBpZiAodk5vZGUuZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pIHtcclxuICAgICAgICB2YXIgcGFyZW50Vk5vZGUgPSB2Tm9kZS5wYXJlbnRWTm9kZTtcclxuICAgICAgICBpZiAocGFyZW50Vk5vZGUpIHtcclxuICAgICAgICAgICAgcGFyZW50Vk5vZGUuZG9tID0gZG9tO1xyXG4gICAgICAgICAgICB1cGRhdGVQYXJlbnRDb21wb25lbnRWTm9kZXMocGFyZW50Vk5vZGUsIGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbnZhciByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuZnVuY3Rpb24gYWRkVG9RdWV1ZShjb21wb25lbnQsIGZvcmNlLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIHF1ZXVlID0gY29tcG9uZW50Q2FsbGJhY2tRdWV1ZS5nZXQoY29tcG9uZW50KTtcclxuICAgIGlmIChxdWV1ZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgcXVldWUgPSBbXTtcclxuICAgICAgICBjb21wb25lbnRDYWxsYmFja1F1ZXVlLnNldChjb21wb25lbnQsIHF1ZXVlKTtcclxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudENhbGxiYWNrUXVldWUuZGVsZXRlKGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBhcHBseVN0YXRlKGNvbXBvbmVudCwgZm9yY2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBxdWV1ZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlW2ldLmNhbGwoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNhbGxiYWNrKSkge1xyXG4gICAgICAgIHF1ZXVlLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHF1ZXVlU3RhdGVDaGFuZ2VzKGNvbXBvbmVudCwgbmV3U3RhdGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0Z1bmN0aW9uKG5ld1N0YXRlKSkge1xyXG4gICAgICAgIG5ld1N0YXRlID0gbmV3U3RhdGUoY29tcG9uZW50LnN0YXRlLCBjb21wb25lbnQucHJvcHMsIGNvbXBvbmVudC5jb250ZXh0KTtcclxuICAgIH1cclxuICAgIHZhciBwZW5kaW5nID0gY29tcG9uZW50Ll9wZW5kaW5nU3RhdGU7XHJcbiAgICBpZiAocGVuZGluZyA9PT0gbnVsbCkge1xyXG4gICAgICAgIGNvbXBvbmVudC5fcGVuZGluZ1N0YXRlID0gcGVuZGluZyA9IG5ld1N0YXRlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZm9yICh2YXIgc3RhdGVLZXkgaW4gbmV3U3RhdGUpIHtcclxuICAgICAgICAgICAgcGVuZGluZ1tzdGF0ZUtleV0gPSBuZXdTdGF0ZVtzdGF0ZUtleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNCcm93c2VyICYmICFjb21wb25lbnQuX3BlbmRpbmdTZXRTdGF0ZSAmJiAhY29tcG9uZW50Ll9ibG9ja1JlbmRlcikge1xyXG4gICAgICAgIGlmICghY29tcG9uZW50Ll91cGRhdGluZykge1xyXG4gICAgICAgICAgICBjb21wb25lbnQuX3BlbmRpbmdTZXRTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBhcHBseVN0YXRlKGNvbXBvbmVudCwgZmFsc2UsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgY29tcG9uZW50Ll91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWRkVG9RdWV1ZShjb21wb25lbnQsIGZhbHNlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHN0YXRlID0gY29tcG9uZW50LnN0YXRlO1xyXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb21wb25lbnQuc3RhdGUgPSBwZW5kaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlW2tleV0gPSBwZW5kaW5nW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29tcG9uZW50Ll9wZW5kaW5nU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNhbGxiYWNrKSAmJiBjb21wb25lbnQuX2Jsb2NrUmVuZGVyKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5fbGlmZWN5Y2xlLmFkZExpc3RlbmVyKGNhbGxiYWNrLmJpbmQoY29tcG9uZW50KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGFwcGx5U3RhdGUoY29tcG9uZW50LCBmb3JjZSwgY2FsbGJhY2spIHtcclxuICAgIGlmIChjb21wb25lbnQuX3VubW91bnRlZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmb3JjZSB8fCAhY29tcG9uZW50Ll9ibG9ja1JlbmRlcikge1xyXG4gICAgICAgIGNvbXBvbmVudC5fcGVuZGluZ1NldFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHBlbmRpbmdTdGF0ZSA9IGNvbXBvbmVudC5fcGVuZGluZ1N0YXRlO1xyXG4gICAgICAgIHZhciBwcmV2U3RhdGUgPSBjb21wb25lbnQuc3RhdGU7XHJcbiAgICAgICAgdmFyIG5leHRTdGF0ZSA9IGluZmVybm9fc2hhcmVkXzEuY29tYmluZUZyb20ocHJldlN0YXRlLCBwZW5kaW5nU3RhdGUpO1xyXG4gICAgICAgIHZhciBwcm9wcyA9IGNvbXBvbmVudC5wcm9wcztcclxuICAgICAgICB2YXIgY29udGV4dF8xID0gY29tcG9uZW50LmNvbnRleHQ7XHJcbiAgICAgICAgY29tcG9uZW50Ll9wZW5kaW5nU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHZhciBuZXh0SW5wdXQgPSBjb21wb25lbnQuX3VwZGF0ZUNvbXBvbmVudChwcmV2U3RhdGUsIG5leHRTdGF0ZSwgcHJvcHMsIHByb3BzLCBjb250ZXh0XzEsIGZvcmNlLCB0cnVlKTtcclxuICAgICAgICB2YXIgZGlkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQobmV4dElucHV0KSkge1xyXG4gICAgICAgICAgICBuZXh0SW5wdXQgPSBpbmZlcm5vXzEuY3JlYXRlVk5vZGUoNDA5NiAvKiBWb2lkICovLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobmV4dElucHV0ID09PSBpbmZlcm5vX3NoYXJlZF8xLk5PX09QKSB7XHJcbiAgICAgICAgICAgIG5leHRJbnB1dCA9IGNvbXBvbmVudC5fbGFzdElucHV0O1xyXG4gICAgICAgICAgICBkaWRVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgbmV4dElucHV0ID0gaW5mZXJub18xLmNyZWF0ZVZOb2RlKDEgLyogVGV4dCAqLywgbnVsbCwgbnVsbCwgbmV4dElucHV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcignYSB2YWxpZCBJbmZlcm5vIFZOb2RlIChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkIGZyb20gYSBjb21wb25lbnQgcmVuZGVyLiBZb3UgbWF5IGhhdmUgcmV0dXJuZWQgYW4gYXJyYXkgb3IgYW4gaW52YWxpZCBvYmplY3QuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsYXN0SW5wdXQgPSBjb21wb25lbnQuX2xhc3RJbnB1dDtcclxuICAgICAgICB2YXIgdk5vZGUgPSBjb21wb25lbnQuX3ZOb2RlO1xyXG4gICAgICAgIHZhciBwYXJlbnREb20gPSAobGFzdElucHV0LmRvbSAmJiBsYXN0SW5wdXQuZG9tLnBhcmVudE5vZGUpIHx8IChsYXN0SW5wdXQuZG9tID0gdk5vZGUuZG9tKTtcclxuICAgICAgICBjb21wb25lbnQuX2xhc3RJbnB1dCA9IG5leHRJbnB1dDtcclxuICAgICAgICBpZiAoZGlkVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZENvbnRleHQgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChjb21wb25lbnQuZ2V0Q2hpbGRDb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRDb250ZXh0ID0gY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYoY2hpbGRDb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRDb250ZXh0ID0gY29tcG9uZW50Ll9jaGlsZENvbnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZENvbnRleHQgPSBpbmZlcm5vX3NoYXJlZF8xLmNvbWJpbmVGcm9tKGNvbnRleHRfMSwgY2hpbGRDb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbGlmZUN5Y2xlID0gY29tcG9uZW50Ll9saWZlY3ljbGU7XHJcbiAgICAgICAgICAgIGluZmVybm9fMS5pbnRlcm5hbF9wYXRjaChsYXN0SW5wdXQsIG5leHRJbnB1dCwgcGFyZW50RG9tLCBsaWZlQ3ljbGUsIGNoaWxkQ29udGV4dCwgY29tcG9uZW50Ll9pc1NWRywgZmFsc2UpO1xyXG4gICAgICAgICAgICBsaWZlQ3ljbGUudHJpZ2dlcigpO1xyXG4gICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoY29tcG9uZW50LmNvbXBvbmVudERpZFVwZGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUocHJvcHMsIHByZXZTdGF0ZSwgY29udGV4dF8xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKGluZmVybm9fMS5vcHRpb25zLmFmdGVyVXBkYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgaW5mZXJub18xLm9wdGlvbnMuYWZ0ZXJVcGRhdGUodk5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkb20gPSB2Tm9kZS5kb20gPSBuZXh0SW5wdXQuZG9tO1xyXG4gICAgICAgIGlmIChpbmZlcm5vXzEub3B0aW9ucy5maW5kRE9NTm9kZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgaW5mZXJub18xLmludGVybmFsX0RPTU5vZGVNYXAuc2V0KGNvbXBvbmVudCwgbmV4dElucHV0LmRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVwZGF0ZVBhcmVudENvbXBvbmVudFZOb2Rlcyh2Tm9kZSwgZG9tKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbXBvbmVudC5zdGF0ZSA9IGNvbXBvbmVudC5fcGVuZGluZ1N0YXRlO1xyXG4gICAgICAgIGNvbXBvbmVudC5fcGVuZGluZ1N0YXRlID0gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNhbGxiYWNrKSkge1xyXG4gICAgICAgIGNhbGxiYWNrLmNhbGwoY29tcG9uZW50KTtcclxuICAgIH1cclxufVxyXG52YXIgYWxyZWFkeVdhcm5lZCA9IGZhbHNlO1xyXG52YXIgQ29tcG9uZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2Jsb2NrUmVuZGVyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYmxvY2tTZXRTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcGVuZGluZ1NldFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGVuZGluZ1N0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sYXN0SW5wdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3ZOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl91bm1vdW50ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9saWZlY3ljbGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkQ29udGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faXNTVkcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IGluZmVybm9fMS5FTVBUWV9PQko7XHJcbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCBpbmZlcm5vXzEuRU1QVFlfT0JKOyAvLyBjb250ZXh0IHNob3VsZCBub3QgYmUgbXV0YWJsZVxyXG4gICAgfVxyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICh0aGlzLl91bm1vdW50ZWQgfHwgIWluZmVybm9fc2hhcmVkXzEuaXNCcm93c2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwbHlTdGF0ZSh0aGlzLCB0cnVlLCBjYWxsYmFjayk7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5fdW5tb3VudGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9ibG9ja1NldFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHF1ZXVlU3RhdGVDaGFuZ2VzKHRoaXMsIG5ld1N0YXRlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCdjYW5ub3QgdXBkYXRlIHN0YXRlIHZpYSBzZXRTdGF0ZSgpIGluIGNvbXBvbmVudFdpbGxVcGRhdGUoKSBvciBjb25zdHJ1Y3Rvci4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZVN5bmMgPSBmdW5jdGlvbiAobmV3U3RhdGUpIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpZiAoIWFscmVhZHlXYXJuZWQpIHtcclxuICAgICAgICAgICAgICAgIGFscmVhZHlXYXJuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSW5mZXJubyBXQVJOSU5HOiBzZXRTdGF0ZVN5bmMgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIG5leHQgcmVsZWFzZS4gVXNlIHNldFN0YXRlIGluc3RlYWQuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5fdXBkYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKHByZXZTdGF0ZSwgbmV4dFN0YXRlLCBwcmV2UHJvcHMsIG5leHRQcm9wcywgY29udGV4dCwgZm9yY2UsIGZyb21TZXRTdGF0ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl91bm1vdW50ZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcihub09wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChwcmV2UHJvcHMgIT09IG5leHRQcm9wcyB8fCBuZXh0UHJvcHMgPT09IGluZmVybm9fMS5FTVBUWV9PQkopIHx8IHByZXZTdGF0ZSAhPT0gbmV4dFN0YXRlIHx8IGZvcmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChwcmV2UHJvcHMgIT09IG5leHRQcm9wcyB8fCBuZXh0UHJvcHMgPT09IGluZmVybm9fMS5FTVBUWV9PQkopIHtcclxuICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZCh0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpICYmICFmcm9tU2V0U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja1JlbmRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tSZW5kZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wZW5kaW5nU2V0U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0U3RhdGUgPSBpbmZlcm5vX3NoYXJlZF8xLmNvbWJpbmVGcm9tKG5leHRTdGF0ZSwgdGhpcy5fcGVuZGluZ1N0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nU2V0U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nU3RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIFVwZGF0ZSBpZiBzY3UgaXMgbm90IGRlZmluZWQsIG9yIGl0IHJldHVybnMgdHJ1dGh5IHZhbHVlIG9yIGZvcmNlICovXHJcbiAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB8fCB0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgY29udGV4dCkgfHwgZm9yY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZCh0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tTZXRTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja1NldFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0gbmV4dFByb3BzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5leHRTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mZXJub18xLm9wdGlvbnMuYmVmb3JlUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mZXJub18xLm9wdGlvbnMuYmVmb3JlUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHJlbmRlciA9IHRoaXMucmVuZGVyKG5leHRQcm9wcywgbmV4dFN0YXRlLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vXzEub3B0aW9ucy5hZnRlclJlbmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZmVybm9fMS5vcHRpb25zLmFmdGVyUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSBuZXh0UHJvcHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV4dFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5mZXJub19zaGFyZWRfMS5OT19PUDtcclxuICAgIH07XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkgeyB9O1xyXG4gICAgcmV0dXJuIENvbXBvbmVudDtcclxufSgpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQ29tcG9uZW50O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5mZXJuby1jb21wb25lbnQvZGlzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fMSA9IHJlcXVpcmUoXCJpbmZlcm5vXCIpO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIGNvbXBvbmVudEhvb2tzID0gbmV3IFNldCgpO1xyXG5jb21wb25lbnRIb29rcy5hZGQoJ29uQ29tcG9uZW50V2lsbE1vdW50Jyk7XHJcbmNvbXBvbmVudEhvb2tzLmFkZCgnb25Db21wb25lbnREaWRNb3VudCcpO1xyXG5jb21wb25lbnRIb29rcy5hZGQoJ29uQ29tcG9uZW50V2lsbFVubW91bnQnKTtcclxuY29tcG9uZW50SG9va3MuYWRkKCdvbkNvbXBvbmVudFNob3VsZFVwZGF0ZScpO1xyXG5jb21wb25lbnRIb29rcy5hZGQoJ29uQ29tcG9uZW50V2lsbFVwZGF0ZScpO1xyXG5jb21wb25lbnRIb29rcy5hZGQoJ29uQ29tcG9uZW50RGlkVXBkYXRlJyk7XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHZpcnR1YWwgbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xGdW5jdGlvbnxDb21wb25lbnQ8YW55LCBhbnk+fSB0eXBlIFR5cGUgb2Ygbm9kZVxyXG4gKiBAcGFyYW0ge29iamVjdD19IHByb3BzIE9wdGlvbmFsIHByb3BzIGZvciB2aXJ0dWFsIG5vZGVcclxuICogQHBhcmFtIHsuLi57b2JqZWN0fT19IF9jaGlsZHJlbiBPcHRpb25hbCBjaGlsZHJlbiBmb3IgdmlydHVhbCBub2RlXHJcbiAqIEByZXR1cm5zIHtWTm9kZX0gbmV3IHZpcnR1YWwgbmRvZVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcykge1xyXG4gICAgdmFyIF9jaGlsZHJlbiA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBfY2hpbGRyZW5bX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQodHlwZSkgfHwgaW5mZXJub19zaGFyZWRfMS5pc09iamVjdCh0eXBlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW5mZXJubyBFcnJvcjogY3JlYXRlRWxlbWVudCgpIG5hbWUgcGFyYW1ldGVyIGNhbm5vdCBiZSB1bmRlZmluZWQsIG51bGwsIGZhbHNlIG9yIHRydWUsIEl0IG11c3QgYmUgYSBzdHJpbmcsIGNsYXNzIG9yIGZ1bmN0aW9uLicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGNoaWxkcmVuID0gX2NoaWxkcmVuO1xyXG4gICAgdmFyIHJlZiA9IG51bGw7XHJcbiAgICB2YXIga2V5ID0gbnVsbDtcclxuICAgIHZhciBjbGFzc05hbWUgPSBudWxsO1xyXG4gICAgdmFyIGZsYWdzID0gMDtcclxuICAgIHZhciBuZXdQcm9wcztcclxuICAgIGlmIChfY2hpbGRyZW4pIHtcclxuICAgICAgICBpZiAoX2NoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IF9jaGlsZHJlblswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoX2NoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IHZvaWQgMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZyh0eXBlKSkge1xyXG4gICAgICAgIGZsYWdzID0gaW5mZXJub18xLmdldEZsYWdzRm9yRWxlbWVudFZub2RlKHR5cGUpO1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKHByb3BzKSkge1xyXG4gICAgICAgICAgICBuZXdQcm9wcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2NsYXNzTmFtZScgfHwgcHJvcCA9PT0gJ2NsYXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHByb3BzW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvcCA9PT0gJ2tleScpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBwcm9wcy5rZXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9wID09PSAnY2hpbGRyZW4nICYmIGluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjsgLy8gYWx3YXlzIGZhdm91ciBjaGlsZHJlbiBhcmdzLCBkZWZhdWx0IHRvIHByb3BzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9wID09PSAncmVmJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZiA9IHByb3BzLnJlZjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Byb3BzW3Byb3BdID0gcHJvcHNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBmbGFncyA9IDE2IC8qIENvbXBvbmVudFVua25vd24gKi87XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBpZiAoIXByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wcyA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYocHJvcHMpKSB7XHJcbiAgICAgICAgICAgIG5ld1Byb3BzID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnRIb29rcy5oYXMocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWYgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmW3Byb3BdID0gcHJvcHNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9wID09PSAna2V5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IHByb3BzLmtleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Byb3BzW3Byb3BdID0gcHJvcHNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5mZXJub18xLmNyZWF0ZVZOb2RlKGZsYWdzLCB0eXBlLCBjbGFzc05hbWUsIGNoaWxkcmVuLCBuZXdQcm9wcywga2V5LCByZWYpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUVsZW1lbnQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pbmZlcm5vLWNyZWF0ZS1lbGVtZW50L2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTk9fT1AgPSAnJE5PX09QJztcclxuZXhwb3J0cy5FUlJPUl9NU0cgPSAnYSBydW50aW1lIGVycm9yIG9jY3VyZWQhIFVzZSBJbmZlcm5vIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50IHRvIGZpbmQgdGhlIGVycm9yLic7XHJcbi8vIFRoaXMgc2hvdWxkIGJlIGJvb2xlYW4gYW5kIG5vdCByZWZlcmVuY2UgdG8gd2luZG93LmRvY3VtZW50XHJcbmV4cG9ydHMuaXNCcm93c2VyID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KTtcclxuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xyXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbiA6IChjaGlsZHJlbiA/IFtjaGlsZHJlbl0gOiBjaGlsZHJlbik7XHJcbn1cclxuZXhwb3J0cy50b0FycmF5ID0gdG9BcnJheTtcclxuLy8gdGhpcyBpcyBNVUNIIGZhc3RlciB0aGFuIC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkgYW5kIGluc3RhbmNlb2YgQXJyYXlcclxuLy8gaW4gTm9kZSA3IGFuZCB0aGUgbGF0ZXIgdmVyc2lvbnMgb2YgVjgsIHNsb3dlciBpbiBvbGRlciB2ZXJzaW9ucyB0aG91Z2hcclxuZXhwb3J0cy5pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcclxuZnVuY3Rpb24gaXNTdGF0ZWZ1bENvbXBvbmVudChvKSB7XHJcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKG8ucHJvdG90eXBlKSAmJiAhaXNVbmRlZmluZWQoby5wcm90b3R5cGUucmVuZGVyKTtcclxufVxyXG5leHBvcnRzLmlzU3RhdGVmdWxDb21wb25lbnQgPSBpc1N0YXRlZnVsQ29tcG9uZW50O1xyXG5mdW5jdGlvbiBpc1N0cmluZ09yTnVtYmVyKG8pIHtcclxuICAgIHZhciB0eXBlID0gdHlwZW9mIG87XHJcbiAgICByZXR1cm4gdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcic7XHJcbn1cclxuZXhwb3J0cy5pc1N0cmluZ09yTnVtYmVyID0gaXNTdHJpbmdPck51bWJlcjtcclxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZihvKSB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQobykgfHwgaXNOdWxsKG8pO1xyXG59XHJcbmV4cG9ydHMuaXNOdWxsT3JVbmRlZiA9IGlzTnVsbE9yVW5kZWY7XHJcbmZ1bmN0aW9uIGlzSW52YWxpZChvKSB7XHJcbiAgICByZXR1cm4gaXNOdWxsKG8pIHx8IG8gPT09IGZhbHNlIHx8IGlzVHJ1ZShvKSB8fCBpc1VuZGVmaW5lZChvKTtcclxufVxyXG5leHBvcnRzLmlzSW52YWxpZCA9IGlzSW52YWxpZDtcclxuZnVuY3Rpb24gaXNGdW5jdGlvbihvKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIG8gPT09ICdmdW5jdGlvbic7XHJcbn1cclxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcclxuZnVuY3Rpb24gaXNTdHJpbmcobykge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBvID09PSAnc3RyaW5nJztcclxufVxyXG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XHJcbmZ1bmN0aW9uIGlzTnVtYmVyKG8pIHtcclxuICAgIHJldHVybiB0eXBlb2YgbyA9PT0gJ251bWJlcic7XHJcbn1cclxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xyXG5mdW5jdGlvbiBpc051bGwobykge1xyXG4gICAgcmV0dXJuIG8gPT09IG51bGw7XHJcbn1cclxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XHJcbmZ1bmN0aW9uIGlzVHJ1ZShvKSB7XHJcbiAgICByZXR1cm4gbyA9PT0gdHJ1ZTtcclxufVxyXG5leHBvcnRzLmlzVHJ1ZSA9IGlzVHJ1ZTtcclxuZnVuY3Rpb24gaXNVbmRlZmluZWQobykge1xyXG4gICAgcmV0dXJuIG8gPT09IHZvaWQgMDtcclxufVxyXG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XHJcbmZ1bmN0aW9uIGlzT2JqZWN0KG8pIHtcclxuICAgIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCc7XHJcbn1cclxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xyXG5mdW5jdGlvbiB0aHJvd0Vycm9yKG1lc3NhZ2UpIHtcclxuICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBleHBvcnRzLkVSUk9SX01TRztcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcihcIkluZmVybm8gRXJyb3I6IFwiICsgbWVzc2FnZSk7XHJcbn1cclxuZXhwb3J0cy50aHJvd0Vycm9yID0gdGhyb3dFcnJvcjtcclxuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxyXG4gICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xyXG59XHJcbmV4cG9ydHMud2FybmluZyA9IHdhcm5pbmc7XHJcbmZ1bmN0aW9uIGNvbWJpbmVGcm9tKGZpcnN0LCBzZWNvbmQpIHtcclxuICAgIHZhciBvdXQgPSB7fTtcclxuICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBmaXJzdCkge1xyXG4gICAgICAgICAgICBvdXRba2V5XSA9IGZpcnN0W2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHNlY29uZCkge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzZWNvbmQpIHtcclxuICAgICAgICAgICAgb3V0W2tleV0gPSBzZWNvbmRba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59XHJcbmV4cG9ydHMuY29tYmluZUZyb20gPSBjb21iaW5lRnJvbTtcclxuZnVuY3Rpb24gTGlmZWN5Y2xlKCkge1xyXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcclxufVxyXG5leHBvcnRzLkxpZmVjeWNsZSA9IExpZmVjeWNsZTtcclxuTGlmZWN5Y2xlLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGNhbGxiYWNrKTtcclxufTtcclxuTGlmZWN5Y2xlLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gdHJpZ2dlcigpIHtcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycztcclxuICAgIHZhciBsaXN0ZW5lcjtcclxuICAgIC8vIFdlIG5lZWQgdG8gcmVtb3ZlIGN1cnJlbnQgbGlzdGVuZXIgZnJvbSBhcnJheSB3aGVuIGNhbGxpbmcgaXQsIGJlY2F1c2UgbW9yZSBsaXN0ZW5lcnMgbWlnaHQgYmUgYWRkZWRcclxuICAgIHdoaWxlIChsaXN0ZW5lciA9IGxpc3RlbmVycy5zaGlmdCgpKSB7XHJcbiAgICAgICAgbGlzdGVuZXIoKTtcclxuICAgIH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8tc2hhcmVkL2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG52YXIgaXNpT1MgPSBpbmZlcm5vX3NoYXJlZF8xLmlzQnJvd3NlciAmJiAhIW5hdmlnYXRvci5wbGF0Zm9ybSAmJiAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pO1xyXG52YXIgZGVsZWdhdGVkRXZlbnRzID0gbmV3IE1hcCgpO1xyXG5mdW5jdGlvbiBoYW5kbGVFdmVudChuYW1lLCBsYXN0RXZlbnQsIG5leHRFdmVudCwgZG9tKSB7XHJcbiAgICB2YXIgZGVsZWdhdGVkUm9vdHMgPSBkZWxlZ2F0ZWRFdmVudHMuZ2V0KG5hbWUpO1xyXG4gICAgaWYgKG5leHRFdmVudCkge1xyXG4gICAgICAgIGlmICghZGVsZWdhdGVkUm9vdHMpIHtcclxuICAgICAgICAgICAgZGVsZWdhdGVkUm9vdHMgPSB7IGl0ZW1zOiBuZXcgTWFwKCksIGRvY0V2ZW50OiBudWxsIH07XHJcbiAgICAgICAgICAgIGRlbGVnYXRlZFJvb3RzLmRvY0V2ZW50ID0gYXR0YWNoRXZlbnRUb0RvY3VtZW50KG5hbWUsIGRlbGVnYXRlZFJvb3RzKTtcclxuICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzLnNldChuYW1lLCBkZWxlZ2F0ZWRSb290cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbGFzdEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChpc2lPUyAmJiBuYW1lID09PSAnb25DbGljaycpIHtcclxuICAgICAgICAgICAgICAgIHRyYXBDbGlja09uTm9uSW50ZXJhY3RpdmVFbGVtZW50KGRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZWdhdGVkUm9vdHMuaXRlbXMuc2V0KGRvbSwgbmV4dEV2ZW50KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGRlbGVnYXRlZFJvb3RzKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gZGVsZWdhdGVkUm9vdHMuaXRlbXM7XHJcbiAgICAgICAgaWYgKGl0ZW1zLmRlbGV0ZShkb20pKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGFueSBpdGVtcyB3ZXJlIGRlbGV0ZWQsIGNoZWNrIGlmIGxpc3RlbmVyIG5lZWQgdG8gYmUgcmVtb3ZlZFxyXG4gICAgICAgICAgICBpZiAoaXRlbXMuc2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihub3JtYWxpemVFdmVudE5hbWUobmFtZSksIGRlbGVnYXRlZFJvb3RzLmRvY0V2ZW50KTtcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlZEV2ZW50cy5kZWxldGUobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5oYW5kbGVFdmVudCA9IGhhbmRsZUV2ZW50O1xyXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQsIGl0ZW1zLCBjb3VudCwgaXNDbGljaywgZXZlbnREYXRhKSB7XHJcbiAgICB2YXIgZXZlbnRzVG9UcmlnZ2VyID0gaXRlbXMuZ2V0KHRhcmdldCk7XHJcbiAgICBpZiAoZXZlbnRzVG9UcmlnZ2VyKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICAvLyBsaW5rRXZlbnQgb2JqZWN0XHJcbiAgICAgICAgZXZlbnREYXRhLmRvbSA9IHRhcmdldDtcclxuICAgICAgICBpZiAoZXZlbnRzVG9UcmlnZ2VyLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50c1RvVHJpZ2dlci5ldmVudChldmVudHNUb1RyaWdnZXIuZGF0YSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnRzVG9UcmlnZ2VyKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LmNhbmNlbEJ1YmJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvdW50ID4gMCkge1xyXG4gICAgICAgIHZhciBwYXJlbnREb20gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICAvLyBIdG1sIE5vZGVzIGNhbiBiZSBuZXN0ZWQgZmU6IHNwYW4gaW5zaWRlIGJ1dHRvbiBpbiB0aGF0IHNjZW5hcmlvIGJyb3dzZXIgZG9lcyBub3QgaGFuZGxlIGRpc2FibGVkIGF0dHJpYnV0ZSBvbiBwYXJlbnQsXHJcbiAgICAgICAgLy8gYmVjYXVzZSB0aGUgZXZlbnQgbGlzdGVuZXIgaXMgb24gZG9jdW1lbnQuYm9keVxyXG4gICAgICAgIC8vIERvbid0IHByb2Nlc3MgY2xpY2tzIG9uIGRpc2FibGVkIGVsZW1lbnRzXHJcbiAgICAgICAgaWYgKHBhcmVudERvbSA9PT0gbnVsbCB8fCAoaXNDbGljayAmJiBwYXJlbnREb20ubm9kZVR5cGUgPT09IDEgJiYgcGFyZW50RG9tLmRpc2FibGVkKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQsIHBhcmVudERvbSwgaXRlbXMsIGNvdW50LCBpc0NsaWNrLCBldmVudERhdGEpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUV2ZW50TmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKTtcclxufVxyXG5mdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24oKSB7XHJcbiAgICB0aGlzLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG59XHJcbmZ1bmN0aW9uIGF0dGFjaEV2ZW50VG9Eb2N1bWVudChuYW1lLCBkZWxlZ2F0ZWRSb290cykge1xyXG4gICAgdmFyIGRvY0V2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gZGVsZWdhdGVkUm9vdHMuaXRlbXMuc2l6ZTtcclxuICAgICAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiA9IHN0b3BQcm9wYWdhdGlvbjtcclxuICAgICAgICAgICAgLy8gRXZlbnQgZGF0YSBuZWVkcyB0byBiZSBvYmplY3QgdG8gc2F2ZSByZWZlcmVuY2UgdG8gY3VycmVudFRhcmdldCBnZXR0ZXJcclxuICAgICAgICAgICAgdmFyIGV2ZW50RGF0YV8xID0ge1xyXG4gICAgICAgICAgICAgICAgZG9tOiBkb2N1bWVudFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnY3VycmVudFRhcmdldCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudERhdGFfMS5kb207XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxyXG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KGV2ZW50LCBldmVudC50YXJnZXQsIGRlbGVnYXRlZFJvb3RzLml0ZW1zLCBjb3VudCwgZXZlbnQudHlwZSA9PT0gJ2NsaWNrJywgZXZlbnREYXRhXzEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG5vcm1hbGl6ZUV2ZW50TmFtZShuYW1lKSwgZG9jRXZlbnQpO1xyXG4gICAgcmV0dXJuIGRvY0V2ZW50O1xyXG59XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxyXG5mdW5jdGlvbiBlbXB0eUZuKCkgeyB9XHJcbmZ1bmN0aW9uIHRyYXBDbGlja09uTm9uSW50ZXJhY3RpdmVFbGVtZW50KGRvbSkge1xyXG4gICAgLy8gTW9iaWxlIFNhZmFyaSBkb2VzIG5vdCBmaXJlIHByb3Blcmx5IGJ1YmJsZSBjbGljayBldmVudHMgb25cclxuICAgIC8vIG5vbi1pbnRlcmFjdGl2ZSBlbGVtZW50cywgd2hpY2ggbWVhbnMgZGVsZWdhdGVkIGNsaWNrIGxpc3RlbmVycyBkbyBub3RcclxuICAgIC8vIGZpcmUuIFRoZSB3b3JrYXJvdW5kIGZvciB0aGlzIGJ1ZyBpbnZvbHZlcyBhdHRhY2hpbmcgYW4gZW1wdHkgY2xpY2tcclxuICAgIC8vIGxpc3RlbmVyIG9uIHRoZSB0YXJnZXQgbm9kZS5cclxuICAgIC8vIGh0dHA6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDEwLzA5L2NsaWNrX2V2ZW50X2RlbC5odG1sXHJcbiAgICAvLyBKdXN0IHNldCBpdCB1c2luZyB0aGUgb25jbGljayBwcm9wZXJ0eSBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gbWFuYWdlIGFueVxyXG4gICAgLy8gYm9va2tlZXBpbmcgZm9yIGl0LiBOb3Qgc3VyZSBpZiB3ZSBuZWVkIHRvIGNsZWFyIGl0IHdoZW4gdGhlIGxpc3RlbmVyIGlzXHJcbiAgICAvLyByZW1vdmVkLlxyXG4gICAgLy8gVE9ETzogT25seSBkbyB0aGlzIGZvciB0aGUgcmVsZXZhbnQgU2FmYXJpcyBtYXliZT9cclxuICAgIGRvbS5vbmNsaWNrID0gZW1wdHlGbjtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5mZXJuby9kaXN0L0RPTS9ldmVudHMvZGVsZWdhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLyoqXHJcbiAqIExpbmtzIGdpdmVuIGRhdGEgdG8gZXZlbnQgYXMgZmlyc3QgcGFyYW1ldGVyXHJcbiAqIEBwYXJhbSB7Kn0gZGF0YSBkYXRhIHRvIGJlIGxpbmtlZCwgaXQgd2lsbCBiZSBhdmFpbGFibGUgaW4gZnVuY3Rpb24gYXMgZmlyc3QgcGFyYW1ldGVyXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV2ZW50IEZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIGV2ZW50IG9jY3Vyc1xyXG4gKiBAcmV0dXJucyB7e2RhdGE6ICosIGV2ZW50OiBGdW5jdGlvbn19XHJcbiAqL1xyXG5mdW5jdGlvbiBsaW5rRXZlbnQoZGF0YSwgZXZlbnQpIHtcclxuICAgIHJldHVybiB7IGRhdGE6IGRhdGEsIGV2ZW50OiBldmVudCB9O1xyXG59XHJcbmV4cG9ydHMubGlua0V2ZW50ID0gbGlua0V2ZW50O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaW5mZXJuby9kaXN0L0RPTS9ldmVudHMvbGlua0V2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL29wdGlvbnNcIik7XHJcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcclxudmFyIG1vdW50aW5nXzEgPSByZXF1aXJlKFwiLi9tb3VudGluZ1wiKTtcclxudmFyIHBhdGNoaW5nXzEgPSByZXF1aXJlKFwiLi9wYXRjaGluZ1wiKTtcclxudmFyIHJlbmRlcmluZ18xID0gcmVxdWlyZShcIi4vcmVuZGVyaW5nXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG52YXIgcHJvY2Vzc0VsZW1lbnRfMSA9IHJlcXVpcmUoXCIuL3dyYXBwZXJzL3Byb2Nlc3NFbGVtZW50XCIpO1xyXG5mdW5jdGlvbiBub3JtYWxpemVDaGlsZE5vZGVzKHBhcmVudERvbSkge1xyXG4gICAgdmFyIGRvbSA9IHBhcmVudERvbS5maXJzdENoaWxkO1xyXG4gICAgd2hpbGUgKGRvbSkge1xyXG4gICAgICAgIGlmIChkb20ubm9kZVR5cGUgPT09IDgpIHtcclxuICAgICAgICAgICAgaWYgKGRvbS5kYXRhID09PSAnIScpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudERvbS5yZXBsYWNlQ2hpbGQocGxhY2Vob2xkZXIsIGRvbSk7XHJcbiAgICAgICAgICAgICAgICBkb20gPSBkb20ubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFzdERvbSA9IGRvbS5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnREb20ucmVtb3ZlQ2hpbGQoZG9tKTtcclxuICAgICAgICAgICAgICAgIGRvbSA9IGxhc3REb20gfHwgcGFyZW50RG9tLmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvbSA9IGRvbS5uZXh0U2libGluZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5ub3JtYWxpemVDaGlsZE5vZGVzID0gbm9ybWFsaXplQ2hpbGROb2RlcztcclxuZnVuY3Rpb24gaHlkcmF0ZUNvbXBvbmVudCh2Tm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc0NsYXNzKSB7XHJcbiAgICB2YXIgdHlwZSA9IHZOb2RlLnR5cGU7XHJcbiAgICB2YXIgcmVmID0gdk5vZGUucmVmO1xyXG4gICAgdk5vZGUuZG9tID0gZG9tO1xyXG4gICAgdmFyIHByb3BzID0gdk5vZGUucHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICBpZiAoaXNDbGFzcykge1xyXG4gICAgICAgIHZhciBfaXNTVkcgPSBkb20ubmFtZXNwYWNlVVJJID09PSBjb25zdGFudHNfMS5zdmdOUztcclxuICAgICAgICB2YXIgaW5zdGFuY2UgPSB1dGlsc18xLmNyZWF0ZUNsYXNzQ29tcG9uZW50SW5zdGFuY2Uodk5vZGUsIHR5cGUsIHByb3BzLCBjb250ZXh0LCBfaXNTVkcsIGxpZmVjeWNsZSk7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gaW5zdGFuY2UuX2xhc3RJbnB1dDtcclxuICAgICAgICBpbnN0YW5jZS5fdk5vZGUgPSB2Tm9kZTtcclxuICAgICAgICBoeWRyYXRlKGlucHV0LCBkb20sIGxpZmVjeWNsZSwgaW5zdGFuY2UuX2NoaWxkQ29udGV4dCwgX2lzU1ZHKTtcclxuICAgICAgICBtb3VudGluZ18xLm1vdW50Q2xhc3NDb21wb25lbnRDYWxsYmFja3Modk5vZGUsIHJlZiwgaW5zdGFuY2UsIGxpZmVjeWNsZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuX3VwZGF0aW5nID0gZmFsc2U7IC8vIE1vdW50IGZpbmlzaGVkIGFsbG93IGdvaW5nIHN5bmNcclxuICAgICAgICBpZiAob3B0aW9uc18xLm9wdGlvbnMuZmluZERPTU5vZGVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHJlbmRlcmluZ18xLmNvbXBvbmVudFRvRE9NTm9kZU1hcC5zZXQoaW5zdGFuY2UsIGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gdXRpbHNfMS5jcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50SW5wdXQodk5vZGUsIHR5cGUsIHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICBoeWRyYXRlKGlucHV0LCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgIHZOb2RlLmNoaWxkcmVuID0gaW5wdXQ7XHJcbiAgICAgICAgdk5vZGUuZG9tID0gaW5wdXQuZG9tO1xyXG4gICAgICAgIG1vdW50aW5nXzEubW91bnRGdW5jdGlvbmFsQ29tcG9uZW50Q2FsbGJhY2tzKHJlZiwgZG9tLCBsaWZlY3ljbGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRvbTtcclxufVxyXG5mdW5jdGlvbiBoeWRyYXRlRWxlbWVudCh2Tm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSB7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzO1xyXG4gICAgdmFyIGNsYXNzTmFtZSA9IHZOb2RlLmNsYXNzTmFtZTtcclxuICAgIHZhciBmbGFncyA9IHZOb2RlLmZsYWdzO1xyXG4gICAgdmFyIHJlZiA9IHZOb2RlLnJlZjtcclxuICAgIGlzU1ZHID0gaXNTVkcgfHwgKGZsYWdzICYgMTI4IC8qIFN2Z0VsZW1lbnQgKi8pID4gMDtcclxuICAgIGlmIChkb20ubm9kZVR5cGUgIT09IDEgfHwgZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gdk5vZGUudHlwZSkge1xyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEud2FybmluZygnSW5mZXJubyBoeWRyYXRpb246IFNlcnZlci1zaWRlIG1hcmt1cCBkb2VzblxcJ3QgbWF0Y2ggY2xpZW50LXNpZGUgbWFya3VwIG9yIEluaXRpYWwgcmVuZGVyIHRhcmdldCBpcyBub3QgZW1wdHknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld0RvbSA9IG1vdW50aW5nXzEubW91bnRFbGVtZW50KHZOb2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB2Tm9kZS5kb20gPSBuZXdEb207XHJcbiAgICAgICAgdXRpbHNfMS5yZXBsYWNlQ2hpbGQoZG9tLnBhcmVudE5vZGUsIG5ld0RvbSwgZG9tKTtcclxuICAgICAgICByZXR1cm4gbmV3RG9tO1xyXG4gICAgfVxyXG4gICAgdk5vZGUuZG9tID0gZG9tO1xyXG4gICAgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgaHlkcmF0ZUNoaWxkcmVuKGNoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb3BzKSB7XHJcbiAgICAgICAgdmFyIGhhc0NvbnRyb2xsZWRWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBpc0Zvcm1FbGVtZW50ID0gKGZsYWdzICYgMzU4NCAvKiBGb3JtRWxlbWVudCAqLykgPiAwO1xyXG4gICAgICAgIGlmIChpc0Zvcm1FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGhhc0NvbnRyb2xsZWRWYWx1ZSA9IHByb2Nlc3NFbGVtZW50XzEuaXNDb250cm9sbGVkRm9ybUVsZW1lbnQocHJvcHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCBhZGQgYSBoYXNPd25Qcm9wZXJ0eSBjaGVjayBoZXJlLCBpdCBhZmZlY3RzIHBlcmZvcm1hbmNlXHJcbiAgICAgICAgICAgIHBhdGNoaW5nXzEucGF0Y2hQcm9wKHByb3AsIG51bGwsIHByb3BzW3Byb3BdLCBkb20sIGlzU1ZHLCBoYXNDb250cm9sbGVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNGb3JtRWxlbWVudCkge1xyXG4gICAgICAgICAgICBwcm9jZXNzRWxlbWVudF8xLnByb2Nlc3NFbGVtZW50KGZsYWdzLCB2Tm9kZSwgZG9tLCBwcm9wcywgdHJ1ZSwgaGFzQ29udHJvbGxlZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGlzU1ZHKSB7XHJcbiAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvbS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHJlZikge1xyXG4gICAgICAgIG1vdW50aW5nXzEubW91bnRSZWYoZG9tLCByZWYsIGxpZmVjeWNsZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9tO1xyXG59XHJcbmZ1bmN0aW9uIGh5ZHJhdGVDaGlsZHJlbihjaGlsZHJlbiwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSB7XHJcbiAgICBub3JtYWxpemVDaGlsZE5vZGVzKHBhcmVudERvbSk7XHJcbiAgICB2YXIgZG9tID0gcGFyZW50RG9tLmZpcnN0Q2hpbGQ7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChjaGlsZCkgJiYgaW5mZXJub19zaGFyZWRfMS5pc09iamVjdChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGwoZG9tKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbSA9IGh5ZHJhdGUoY2hpbGQsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VudGluZ18xLm1vdW50KGNoaWxkLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKGNoaWxkcmVuKSkge1xyXG4gICAgICAgIGlmIChkb20gJiYgZG9tLm5vZGVUeXBlID09PSAzKSB7XHJcbiAgICAgICAgICAgIGlmIChkb20ubm9kZVZhbHVlICE9PSBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgZG9tLm5vZGVWYWx1ZSA9IGNoaWxkcmVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHBhcmVudERvbS50ZXh0Q29udGVudCA9IGNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb20gPSBkb20ubmV4dFNpYmxpbmc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzT2JqZWN0KGNoaWxkcmVuKSkge1xyXG4gICAgICAgIGh5ZHJhdGUoY2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgZG9tID0gZG9tLm5leHRTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgLy8gY2xlYXIgYW55IG90aGVyIERPTSBub2RlcywgdGhlcmUgc2hvdWxkIGJlIG9ubHkgYSBzaW5nbGUgZW50cnkgZm9yIHRoZSByb290XHJcbiAgICB3aGlsZSAoZG9tKSB7XHJcbiAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gZG9tLm5leHRTaWJsaW5nO1xyXG4gICAgICAgIHBhcmVudERvbS5yZW1vdmVDaGlsZChkb20pO1xyXG4gICAgICAgIGRvbSA9IG5leHRTaWJsaW5nO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGh5ZHJhdGVUZXh0KHZOb2RlLCBkb20pIHtcclxuICAgIGlmIChkb20ubm9kZVR5cGUgIT09IDMpIHtcclxuICAgICAgICB2YXIgbmV3RG9tID0gbW91bnRpbmdfMS5tb3VudFRleHQodk5vZGUsIG51bGwpO1xyXG4gICAgICAgIHZOb2RlLmRvbSA9IG5ld0RvbTtcclxuICAgICAgICB1dGlsc18xLnJlcGxhY2VDaGlsZChkb20ucGFyZW50Tm9kZSwgbmV3RG9tLCBkb20pO1xyXG4gICAgICAgIHJldHVybiBuZXdEb207XHJcbiAgICB9XHJcbiAgICB2YXIgdGV4dCA9IHZOb2RlLmNoaWxkcmVuO1xyXG4gICAgaWYgKGRvbS5ub2RlVmFsdWUgIT09IHRleHQpIHtcclxuICAgICAgICBkb20ubm9kZVZhbHVlID0gdGV4dDtcclxuICAgIH1cclxuICAgIHZOb2RlLmRvbSA9IGRvbTtcclxuICAgIHJldHVybiBkb207XHJcbn1cclxuZnVuY3Rpb24gaHlkcmF0ZVZvaWQodk5vZGUsIGRvbSkge1xyXG4gICAgdk5vZGUuZG9tID0gZG9tO1xyXG4gICAgcmV0dXJuIGRvbTtcclxufVxyXG5mdW5jdGlvbiBoeWRyYXRlKHZOb2RlLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpIHtcclxuICAgIHZhciBmbGFncyA9IHZOb2RlLmZsYWdzO1xyXG4gICAgaWYgKGZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgcmV0dXJuIGh5ZHJhdGVDb21wb25lbnQodk5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgKGZsYWdzICYgNCAvKiBDb21wb25lbnRDbGFzcyAqLykgPiAwKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZsYWdzICYgMzk3MCAvKiBFbGVtZW50ICovKSB7XHJcbiAgICAgICAgcmV0dXJuIGh5ZHJhdGVFbGVtZW50KHZOb2RlLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmxhZ3MgJiAxIC8qIFRleHQgKi8pIHtcclxuICAgICAgICByZXR1cm4gaHlkcmF0ZVRleHQodk5vZGUsIGRvbSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmbGFncyAmIDQwOTYgLyogVm9pZCAqLykge1xyXG4gICAgICAgIHJldHVybiBoeWRyYXRlVm9pZCh2Tm9kZSwgZG9tKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcihcImh5ZHJhdGUoKSBleHBlY3RzIGEgdmFsaWQgVk5vZGUsIGluc3RlYWQgaXQgcmVjZWl2ZWQgYW4gb2JqZWN0IHdpdGggdGhlIHR5cGUgXFxcIlwiICsgdHlwZW9mIHZOb2RlICsgXCJcXFwiLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaHlkcmF0ZVJvb3QoaW5wdXQsIHBhcmVudERvbSwgbGlmZWN5Y2xlKSB7XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHBhcmVudERvbSkpIHtcclxuICAgICAgICB2YXIgZG9tID0gcGFyZW50RG9tLmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChkb20pKSB7XHJcbiAgICAgICAgICAgIGh5ZHJhdGUoaW5wdXQsIGRvbSwgbGlmZWN5Y2xlLCB1dGlsc18xLkVNUFRZX09CSiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBkb20gPSBwYXJlbnREb20uZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgLy8gY2xlYXIgYW55IG90aGVyIERPTSBub2RlcywgdGhlcmUgc2hvdWxkIGJlIG9ubHkgYSBzaW5nbGUgZW50cnkgZm9yIHRoZSByb290XHJcbiAgICAgICAgICAgIHdoaWxlIChkb20gPSBkb20ubmV4dFNpYmxpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudERvbS5yZW1vdmVDaGlsZChkb20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnRzLmh5ZHJhdGVSb290ID0gaHlkcmF0ZVJvb3Q7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pbmZlcm5vL2Rpc3QvRE9NL2h5ZHJhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xyXG5mdW5jdGlvbiBpc0NoZWNrZWRUeXBlKHR5cGUpIHtcclxuICAgIHJldHVybiB0eXBlID09PSAnY2hlY2tib3gnIHx8IHR5cGUgPT09ICdyYWRpbyc7XHJcbn1cclxuZXhwb3J0cy5pc0NoZWNrZWRUeXBlID0gaXNDaGVja2VkVHlwZTtcclxuZnVuY3Rpb24gb25UZXh0SW5wdXRDaGFuZ2UoZSkge1xyXG4gICAgdmFyIHZOb2RlID0gdGhpcztcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgdmFyIGRvbSA9IHZOb2RlLmRvbTtcclxuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJvcHMudmFsdWU7XHJcbiAgICBpZiAocHJvcHMub25JbnB1dCkge1xyXG4gICAgICAgIHZhciBldmVudF8xID0gcHJvcHMub25JbnB1dDtcclxuICAgICAgICBpZiAoZXZlbnRfMS5ldmVudCkge1xyXG4gICAgICAgICAgICBldmVudF8xLmV2ZW50KGV2ZW50XzEuZGF0YSwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudF8xKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByb3BzLm9uaW5wdXQpIHtcclxuICAgICAgICBwcm9wcy5vbmlucHV0KGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGhlIHVzZXIgbWF5IGhhdmUgdXBkYXRlZCB0aGUgdk5vZGUgZnJvbSB0aGUgYWJvdmUgb25JbnB1dCBldmVudHMgc3luY3Jvbm91c2x5XHJcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIGdldCBpdCBmcm9tIHRoZSBjb250ZXh0IG9mIGB0aGlzYCBhZ2FpblxyXG4gICAgdmFyIG5ld1ZOb2RlID0gdGhpcztcclxuICAgIHZhciBuZXdQcm9wcyA9IG5ld1ZOb2RlLnByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgLy8gSWYgcmVuZGVyIGlzIGdvaW5nIGFzeW5jIHRoZXJlIGlzIG5vIHZhbHVlIGNoYW5nZSB5ZXQsIGl0IHdpbGwgY29tZSBiYWNrIHRvIHByb2Nlc3MgaW5wdXQgc29vblxyXG4gICAgaWYgKHByZXZpb3VzVmFsdWUgIT09IG5ld1Byb3BzLnZhbHVlKSB7XHJcbiAgICAgICAgLy8gV2hlbiB0aGlzIGhhcHBlbnMgd2UgbmVlZCB0byBzdG9yZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiBhbmQgcmVzdG9yZSBpdCwgdG8gYXZvaWQganVtcGluZ1xyXG4gICAgICAgIGFwcGx5VmFsdWUobmV3UHJvcHMsIGRvbSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gd3JhcHBlZE9uQ2hhbmdlKGUpIHtcclxuICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICB2YXIgZXZlbnQgPSBwcm9wcy5vbkNoYW5nZTtcclxuICAgIGlmIChldmVudC5ldmVudCkge1xyXG4gICAgICAgIGV2ZW50LmV2ZW50KGV2ZW50LmRhdGEsIGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZXZlbnQoZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gb25DaGVja2JveENoYW5nZShlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBUaGlzIGNsaWNrIHNob3VsZCBub3QgcHJvcGFnYXRlIGl0cyBmb3IgaW50ZXJuYWwgdXNlXHJcbiAgICB2YXIgdk5vZGUgPSB0aGlzO1xyXG4gICAgdmFyIHByb3BzID0gdk5vZGUucHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICB2YXIgZG9tID0gdk5vZGUuZG9tO1xyXG4gICAgdmFyIHByZXZpb3VzVmFsdWUgPSBwcm9wcy52YWx1ZTtcclxuICAgIGlmIChwcm9wcy5vbkNsaWNrKSB7XHJcbiAgICAgICAgdmFyIGV2ZW50XzIgPSBwcm9wcy5vbkNsaWNrO1xyXG4gICAgICAgIGlmIChldmVudF8yLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50XzIuZXZlbnQoZXZlbnRfMi5kYXRhLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50XzIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocHJvcHMub25jbGljaykge1xyXG4gICAgICAgIHByb3BzLm9uY2xpY2soZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0aGUgdXNlciBtYXkgaGF2ZSB1cGRhdGVkIHRoZSB2Tm9kZSBmcm9tIHRoZSBhYm92ZSBvbklucHV0IGV2ZW50cyBzeW5jcm9ub3VzbHlcclxuICAgIC8vIHNvIHdlIG5lZWQgdG8gZ2V0IGl0IGZyb20gdGhlIGNvbnRleHQgb2YgYHRoaXNgIGFnYWluXHJcbiAgICB2YXIgbmV3Vk5vZGUgPSB0aGlzO1xyXG4gICAgdmFyIG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICAvLyBJZiByZW5kZXIgaXMgZ29pbmcgYXN5bmMgdGhlcmUgaXMgbm8gdmFsdWUgY2hhbmdlIHlldCwgaXQgd2lsbCBjb21lIGJhY2sgdG8gcHJvY2VzcyBpbnB1dCBzb29uXHJcbiAgICBpZiAocHJldmlvdXNWYWx1ZSAhPT0gbmV3UHJvcHMudmFsdWUpIHtcclxuICAgICAgICAvLyBXaGVuIHRoaXMgaGFwcGVucyB3ZSBuZWVkIHRvIHN0b3JlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIGFuZCByZXN0b3JlIGl0LCB0byBhdm9pZCBqdW1waW5nXHJcbiAgICAgICAgYXBwbHlWYWx1ZShuZXdQcm9wcywgZG9tKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBwcm9jZXNzSW5wdXQodk5vZGUsIGRvbSwgbmV4dFByb3BzT3JFbXB0eSwgbW91bnRpbmcsIGlzQ29udHJvbGxlZCkge1xyXG4gICAgYXBwbHlWYWx1ZShuZXh0UHJvcHNPckVtcHR5LCBkb20pO1xyXG4gICAgaWYgKG1vdW50aW5nICYmIGlzQ29udHJvbGxlZCkge1xyXG4gICAgICAgIGlmIChpc0NoZWNrZWRUeXBlKG5leHRQcm9wc09yRW1wdHkudHlwZSkpIHtcclxuICAgICAgICAgICAgZG9tLm9uY2xpY2sgPSBvbkNoZWNrYm94Q2hhbmdlLmJpbmQodk5vZGUpO1xyXG4gICAgICAgICAgICBkb20ub25jbGljay53cmFwcGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvbS5vbmlucHV0ID0gb25UZXh0SW5wdXRDaGFuZ2UuYmluZCh2Tm9kZSk7XHJcbiAgICAgICAgICAgIGRvbS5vbmlucHV0LndyYXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dFByb3BzT3JFbXB0eS5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICBkb20ub25jaGFuZ2UgPSB3cmFwcGVkT25DaGFuZ2UuYmluZCh2Tm9kZSk7XHJcbiAgICAgICAgICAgIGRvbS5vbmNoYW5nZS53cmFwcGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wcm9jZXNzSW5wdXQgPSBwcm9jZXNzSW5wdXQ7XHJcbmZ1bmN0aW9uIGFwcGx5VmFsdWUobmV4dFByb3BzT3JFbXB0eSwgZG9tKSB7XHJcbiAgICB2YXIgdHlwZSA9IG5leHRQcm9wc09yRW1wdHkudHlwZTtcclxuICAgIHZhciB2YWx1ZSA9IG5leHRQcm9wc09yRW1wdHkudmFsdWU7XHJcbiAgICB2YXIgY2hlY2tlZCA9IG5leHRQcm9wc09yRW1wdHkuY2hlY2tlZDtcclxuICAgIHZhciBtdWx0aXBsZSA9IG5leHRQcm9wc09yRW1wdHkubXVsdGlwbGU7XHJcbiAgICB2YXIgZGVmYXVsdFZhbHVlID0gbmV4dFByb3BzT3JFbXB0eS5kZWZhdWx0VmFsdWU7XHJcbiAgICB2YXIgaGFzVmFsdWUgPSAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKHZhbHVlKTtcclxuICAgIGlmICh0eXBlICYmIHR5cGUgIT09IGRvbS50eXBlKSB7XHJcbiAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKG11bHRpcGxlICYmIG11bHRpcGxlICE9PSBkb20ubXVsdGlwbGUpIHtcclxuICAgICAgICBkb20ubXVsdGlwbGUgPSBtdWx0aXBsZTtcclxuICAgIH1cclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGRlZmF1bHRWYWx1ZSkgJiYgIWhhc1ZhbHVlKSB7XHJcbiAgICAgICAgZG9tLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZSArICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzQ2hlY2tlZFR5cGUodHlwZSkpIHtcclxuICAgICAgICBpZiAoaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgZG9tLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNoZWNrZWQpKSB7XHJcbiAgICAgICAgICAgIGRvbS5jaGVja2VkID0gY2hlY2tlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoaGFzVmFsdWUgJiYgZG9tLnZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICBkb20udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihjaGVja2VkKSkge1xyXG4gICAgICAgICAgICBkb20uY2hlY2tlZCA9IGNoZWNrZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYXBwbHlWYWx1ZSA9IGFwcGx5VmFsdWU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pbmZlcm5vL2Rpc3QvRE9NL3dyYXBwZXJzL0lucHV0V3JhcHBlci5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBWTm9kZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb3JlL1ZOb2Rlc1wiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbmZ1bmN0aW9uIHVwZGF0ZUNoaWxkT3B0aW9uR3JvdXAodk5vZGUsIHZhbHVlKSB7XHJcbiAgICB2YXIgdHlwZSA9IHZOb2RlLnR5cGU7XHJcbiAgICBpZiAodHlwZSA9PT0gJ29wdGdyb3VwJykge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHZOb2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRPcHRpb24oY2hpbGRyZW5baV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChWTm9kZXNfMS5pc1ZOb2RlKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICB1cGRhdGVDaGlsZE9wdGlvbihjaGlsZHJlbiwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVwZGF0ZUNoaWxkT3B0aW9uKHZOb2RlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQ2hpbGRPcHRpb24odk5vZGUsIHZhbHVlKSB7XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIHZhciBkb20gPSB2Tm9kZS5kb207XHJcbiAgICAvLyB3ZSBkbyB0aGlzIGFzIG11bHRpcGxlIG1heSBoYXZlIGNoYW5nZWRcclxuICAgIGRvbS52YWx1ZSA9IHByb3BzLnZhbHVlO1xyXG4gICAgaWYgKChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmluZGV4T2YocHJvcHMudmFsdWUpICE9PSAtMSkgfHwgcHJvcHMudmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgZG9tLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYodmFsdWUpIHx8ICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYocHJvcHMuc2VsZWN0ZWQpKSB7XHJcbiAgICAgICAgZG9tLnNlbGVjdGVkID0gcHJvcHMuc2VsZWN0ZWQgfHwgZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gb25TZWxlY3RDaGFuZ2UoZSkge1xyXG4gICAgdmFyIHZOb2RlID0gdGhpcztcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgdmFyIGRvbSA9IHZOb2RlLmRvbTtcclxuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJvcHMudmFsdWU7XHJcbiAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICB2YXIgZXZlbnRfMSA9IHByb3BzLm9uQ2hhbmdlO1xyXG4gICAgICAgIGlmIChldmVudF8xLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50XzEuZXZlbnQoZXZlbnRfMS5kYXRhLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50XzEoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocHJvcHMub25jaGFuZ2UpIHtcclxuICAgICAgICBwcm9wcy5vbmNoYW5nZShlKTtcclxuICAgIH1cclxuICAgIC8vIHRoZSB1c2VyIG1heSBoYXZlIHVwZGF0ZWQgdGhlIHZOb2RlIGZyb20gdGhlIGFib3ZlIG9uSW5wdXQgZXZlbnRzIHN5bmNyb25vdXNseVxyXG4gICAgLy8gc28gd2UgbmVlZCB0byBnZXQgaXQgZnJvbSB0aGUgY29udGV4dCBvZiBgdGhpc2AgYWdhaW5cclxuICAgIHZhciBuZXdWTm9kZSA9IHRoaXM7XHJcbiAgICB2YXIgbmV3UHJvcHMgPSBuZXdWTm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIC8vIElmIHJlbmRlciBpcyBnb2luZyBhc3luYyB0aGVyZSBpcyBubyB2YWx1ZSBjaGFuZ2UgeWV0LCBpdCB3aWxsIGNvbWUgYmFjayB0byBwcm9jZXNzIGlucHV0IHNvb25cclxuICAgIGlmIChwcmV2aW91c1ZhbHVlICE9PSBuZXdQcm9wcy52YWx1ZSkge1xyXG4gICAgICAgIC8vIFdoZW4gdGhpcyBoYXBwZW5zIHdlIG5lZWQgdG8gc3RvcmUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24gYW5kIHJlc3RvcmUgaXQsIHRvIGF2b2lkIGp1bXBpbmdcclxuICAgICAgICBhcHBseVZhbHVlKG5ld1ZOb2RlLCBkb20sIG5ld1Byb3BzLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcHJvY2Vzc1NlbGVjdCh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKSB7XHJcbiAgICBhcHBseVZhbHVlKHZOb2RlLCBkb20sIG5leHRQcm9wc09yRW1wdHksIG1vdW50aW5nKTtcclxuICAgIGlmIChtb3VudGluZyAmJiBpc0NvbnRyb2xsZWQpIHtcclxuICAgICAgICBkb20ub25jaGFuZ2UgPSBvblNlbGVjdENoYW5nZS5iaW5kKHZOb2RlKTtcclxuICAgICAgICBkb20ub25jaGFuZ2Uud3JhcHBlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wcm9jZXNzU2VsZWN0ID0gcHJvY2Vzc1NlbGVjdDtcclxuZnVuY3Rpb24gYXBwbHlWYWx1ZSh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZykge1xyXG4gICAgaWYgKG5leHRQcm9wc09yRW1wdHkubXVsdGlwbGUgIT09IGRvbS5tdWx0aXBsZSkge1xyXG4gICAgICAgIGRvbS5tdWx0aXBsZSA9IG5leHRQcm9wc09yRW1wdHkubXVsdGlwbGU7XHJcbiAgICB9XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gbmV4dFByb3BzT3JFbXB0eS52YWx1ZTtcclxuICAgICAgICBpZiAobW91bnRpbmcgJiYgaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKHZhbHVlKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5leHRQcm9wc09yRW1wdHkuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkT3B0aW9uR3JvdXAoY2hpbGRyZW5baV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChWTm9kZXNfMS5pc1ZOb2RlKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICB1cGRhdGVDaGlsZE9wdGlvbkdyb3VwKGNoaWxkcmVuLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYXBwbHlWYWx1ZSA9IGFwcGx5VmFsdWU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pbmZlcm5vL2Rpc3QvRE9NL3dyYXBwZXJzL1NlbGVjdFdyYXBwZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcclxuZnVuY3Rpb24gd3JhcHBlZE9uQ2hhbmdlKGUpIHtcclxuICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICB2YXIgZXZlbnQgPSBwcm9wcy5vbkNoYW5nZTtcclxuICAgIGlmIChldmVudC5ldmVudCkge1xyXG4gICAgICAgIGV2ZW50LmV2ZW50KGV2ZW50LmRhdGEsIGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZXZlbnQoZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gb25UZXh0YXJlYUlucHV0Q2hhbmdlKGUpIHtcclxuICAgIHZhciB2Tm9kZSA9IHRoaXM7XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJvcHMudmFsdWU7XHJcbiAgICBpZiAocHJvcHMub25JbnB1dCkge1xyXG4gICAgICAgIHZhciBldmVudF8xID0gcHJvcHMub25JbnB1dDtcclxuICAgICAgICBpZiAoZXZlbnRfMS5ldmVudCkge1xyXG4gICAgICAgICAgICBldmVudF8xLmV2ZW50KGV2ZW50XzEuZGF0YSwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudF8xKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByb3BzLm9uaW5wdXQpIHtcclxuICAgICAgICBwcm9wcy5vbmlucHV0KGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGhlIHVzZXIgbWF5IGhhdmUgdXBkYXRlZCB0aGUgdk5vZGUgZnJvbSB0aGUgYWJvdmUgb25JbnB1dCBldmVudHMgc3luY3Jvbm91c2x5XHJcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIGdldCBpdCBmcm9tIHRoZSBjb250ZXh0IG9mIGB0aGlzYCBhZ2FpblxyXG4gICAgdmFyIG5ld1ZOb2RlID0gdGhpcztcclxuICAgIHZhciBuZXdQcm9wcyA9IG5ld1ZOb2RlLnByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgLy8gSWYgcmVuZGVyIGlzIGdvaW5nIGFzeW5jIHRoZXJlIGlzIG5vIHZhbHVlIGNoYW5nZSB5ZXQsIGl0IHdpbGwgY29tZSBiYWNrIHRvIHByb2Nlc3MgaW5wdXQgc29vblxyXG4gICAgaWYgKHByZXZpb3VzVmFsdWUgIT09IG5ld1Byb3BzLnZhbHVlKSB7XHJcbiAgICAgICAgLy8gV2hlbiB0aGlzIGhhcHBlbnMgd2UgbmVlZCB0byBzdG9yZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiBhbmQgcmVzdG9yZSBpdCwgdG8gYXZvaWQganVtcGluZ1xyXG4gICAgICAgIGFwcGx5VmFsdWUobmV3Vk5vZGUsIHZOb2RlLmRvbSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHByb2Nlc3NUZXh0YXJlYSh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKSB7XHJcbiAgICBhcHBseVZhbHVlKG5leHRQcm9wc09yRW1wdHksIGRvbSwgbW91bnRpbmcpO1xyXG4gICAgaWYgKG1vdW50aW5nICYmIGlzQ29udHJvbGxlZCkge1xyXG4gICAgICAgIGRvbS5vbmlucHV0ID0gb25UZXh0YXJlYUlucHV0Q2hhbmdlLmJpbmQodk5vZGUpO1xyXG4gICAgICAgIGRvbS5vbmlucHV0LndyYXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChuZXh0UHJvcHNPckVtcHR5Lm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIGRvbS5vbmNoYW5nZSA9IHdyYXBwZWRPbkNoYW5nZS5iaW5kKHZOb2RlKTtcclxuICAgICAgICAgICAgZG9tLm9uY2hhbmdlLndyYXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnByb2Nlc3NUZXh0YXJlYSA9IHByb2Nlc3NUZXh0YXJlYTtcclxuZnVuY3Rpb24gYXBwbHlWYWx1ZShuZXh0UHJvcHNPckVtcHR5LCBkb20sIG1vdW50aW5nKSB7XHJcbiAgICB2YXIgdmFsdWUgPSBuZXh0UHJvcHNPckVtcHR5LnZhbHVlO1xyXG4gICAgdmFyIGRvbVZhbHVlID0gZG9tLnZhbHVlO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZih2YWx1ZSkpIHtcclxuICAgICAgICBpZiAobW91bnRpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IG5leHRQcm9wc09yRW1wdHkuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihkZWZhdWx0VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlICE9PSBkb21WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS52YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkb21WYWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRvbS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLyogVGhlcmUgaXMgdmFsdWUgc28ga2VlcCBpdCBjb250cm9sbGVkICovXHJcbiAgICAgICAgaWYgKGRvbVZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICBkb20udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5hcHBseVZhbHVlID0gYXBwbHlWYWx1ZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmVybm8vZGlzdC9ET00vd3JhcHBlcnMvVGV4dGFyZWFXcmFwcGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxuZXhwb3J0cy5OT19PUCA9IGluZmVybm9fc2hhcmVkXzEuTk9fT1A7XHJcbnZhciBub3JtYWxpemF0aW9uXzEgPSByZXF1aXJlKFwiLi9jb3JlL25vcm1hbGl6YXRpb25cIik7XHJcbmV4cG9ydHMuZ2V0RmxhZ3NGb3JFbGVtZW50Vm5vZGUgPSBub3JtYWxpemF0aW9uXzEuZ2V0RmxhZ3NGb3JFbGVtZW50Vm5vZGU7XHJcbmV4cG9ydHMuaW50ZXJuYWxfbm9ybWFsaXplID0gbm9ybWFsaXphdGlvbl8xLm5vcm1hbGl6ZTtcclxudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2NvcmUvb3B0aW9uc1wiKTtcclxuZXhwb3J0cy5vcHRpb25zID0gb3B0aW9uc18xLm9wdGlvbnM7XHJcbnZhciBWTm9kZXNfMSA9IHJlcXVpcmUoXCIuL2NvcmUvVk5vZGVzXCIpO1xyXG5leHBvcnRzLmNsb25lVk5vZGUgPSBWTm9kZXNfMS5jbG9uZVZOb2RlO1xyXG5leHBvcnRzLmNyZWF0ZVZOb2RlID0gVk5vZGVzXzEuY3JlYXRlVk5vZGU7XHJcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL0RPTS9jb25zdGFudHNcIik7XHJcbmV4cG9ydHMuaW50ZXJuYWxfaXNVbml0bGVzc051bWJlciA9IGNvbnN0YW50c18xLmlzVW5pdGxlc3NOdW1iZXI7XHJcbnZhciBsaW5rRXZlbnRfMSA9IHJlcXVpcmUoXCIuL0RPTS9ldmVudHMvbGlua0V2ZW50XCIpO1xyXG5leHBvcnRzLmxpbmtFdmVudCA9IGxpbmtFdmVudF8xLmxpbmtFdmVudDtcclxudmFyIHBhdGNoaW5nXzEgPSByZXF1aXJlKFwiLi9ET00vcGF0Y2hpbmdcIik7XHJcbmV4cG9ydHMuaW50ZXJuYWxfcGF0Y2ggPSBwYXRjaGluZ18xLnBhdGNoO1xyXG52YXIgcmVuZGVyaW5nXzEgPSByZXF1aXJlKFwiLi9ET00vcmVuZGVyaW5nXCIpO1xyXG5leHBvcnRzLmludGVybmFsX0RPTU5vZGVNYXAgPSByZW5kZXJpbmdfMS5jb21wb25lbnRUb0RPTU5vZGVNYXA7XHJcbmV4cG9ydHMuY3JlYXRlUmVuZGVyZXIgPSByZW5kZXJpbmdfMS5jcmVhdGVSZW5kZXJlcjtcclxuZXhwb3J0cy5maW5kRE9NTm9kZSA9IHJlbmRlcmluZ18xLmZpbmRET01Ob2RlO1xyXG5leHBvcnRzLnJlbmRlciA9IHJlbmRlcmluZ18xLnJlbmRlcjtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi9ET00vdXRpbHNcIik7XHJcbmV4cG9ydHMuRU1QVFlfT0JKID0gdXRpbHNfMS5FTVBUWV9PQko7XHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgKi9cclxuICAgIHZhciB0ZXN0RnVuYyA9IGZ1bmN0aW9uIHRlc3RGbigpIHsgfTtcclxuICAgIGlmICgodGVzdEZ1bmMubmFtZSB8fCB0ZXN0RnVuYy50b1N0cmluZygpKS5pbmRleE9mKCd0ZXN0Rm4nKSA9PT0gLTEpIHtcclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLndhcm5pbmcoKCdJdCBsb29rcyBsaWtlIHlvdVxcJ3JlIHVzaW5nIGEgbWluaWZpZWQgY29weSBvZiB0aGUgZGV2ZWxvcG1lbnQgYnVpbGQgJyArXHJcbiAgICAgICAgICAgICdvZiBJbmZlcm5vLiBXaGVuIGRlcGxveWluZyBJbmZlcm5vIGFwcHMgdG8gcHJvZHVjdGlvbiwgbWFrZSBzdXJlIHRvIHVzZSAnICtcclxuICAgICAgICAgICAgJ3RoZSBwcm9kdWN0aW9uIGJ1aWxkIHdoaWNoIHNraXBzIGRldmVsb3BtZW50IHdhcm5pbmdzIGFuZCBpcyBmYXN0ZXIuICcgK1xyXG4gICAgICAgICAgICAnU2VlIGh0dHA6Ly9pbmZlcm5vanMub3JnIGZvciBtb3JlIGRldGFpbHMuJykpO1xyXG4gICAgfVxyXG59XHJcbnZhciB2ZXJzaW9uID0gJzMuMS4yJztcclxuZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbjtcclxuLy8gd2UgZHVwbGljYXRlIGl0IHNvIGl0IHBsYXlzIG5pY2VseSB3aXRoIGRpZmZlcmVudCBtb2R1bGUgbG9hZGluZyBzeXN0ZW1zXHJcbmV4cG9ydHMuZGVmYXVsdCA9IHtcclxuICAgIGdldEZsYWdzRm9yRWxlbWVudFZub2RlOiBub3JtYWxpemF0aW9uXzEuZ2V0RmxhZ3NGb3JFbGVtZW50Vm5vZGUsXHJcbiAgICBsaW5rRXZlbnQ6IGxpbmtFdmVudF8xLmxpbmtFdmVudCxcclxuICAgIC8vIGNvcmUgc2hhcGVzXHJcbiAgICBjcmVhdGVWTm9kZTogVk5vZGVzXzEuY3JlYXRlVk5vZGUsXHJcbiAgICAvLyBjbG9uaW5nXHJcbiAgICBjbG9uZVZOb2RlOiBWTm9kZXNfMS5jbG9uZVZOb2RlLFxyXG4gICAgLy8gdXNlZCB0byBzaGFyZWQgY29tbW9uIGl0ZW1zIGJldHdlZW4gSW5mZXJubyBsaWJzXHJcbiAgICBOT19PUDogaW5mZXJub19zaGFyZWRfMS5OT19PUCxcclxuICAgIEVNUFRZX09CSjogdXRpbHNfMS5FTVBUWV9PQkosXHJcbiAgICAvLyBET01cclxuICAgIHJlbmRlcjogcmVuZGVyaW5nXzEucmVuZGVyLFxyXG4gICAgZmluZERPTU5vZGU6IHJlbmRlcmluZ18xLmZpbmRET01Ob2RlLFxyXG4gICAgY3JlYXRlUmVuZGVyZXI6IHJlbmRlcmluZ18xLmNyZWF0ZVJlbmRlcmVyLFxyXG4gICAgb3B0aW9uczogb3B0aW9uc18xLm9wdGlvbnMsXHJcbiAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxyXG4gICAgaW50ZXJuYWxfcGF0Y2g6IHBhdGNoaW5nXzEucGF0Y2gsXHJcbiAgICBpbnRlcm5hbF9ET01Ob2RlTWFwOiByZW5kZXJpbmdfMS5jb21wb25lbnRUb0RPTU5vZGVNYXAsXHJcbiAgICBpbnRlcm5hbF9pc1VuaXRsZXNzTnVtYmVyOiBjb25zdGFudHNfMS5pc1VuaXRsZXNzTnVtYmVyLFxyXG4gICAgaW50ZXJuYWxfbm9ybWFsaXplOiBub3JtYWxpemF0aW9uXzEubm9ybWFsaXplXHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pbmZlcm5vL2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=