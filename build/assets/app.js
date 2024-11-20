(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const $bodyTag = document.getElementsByTagName("body")[0];
document.getElementsByTagName("body,html")[0];
const className = {
  Hover: "hover",
  Active: "active",
  Open: "open",
  IsTouch: "is-touch",
  IsIos: "is-ios",
  IsIE: "is-ie",
  IsEdge: "is-edge",
  IsScrollTop: "is-scroll-top",
  IsAnimate: "is-animate",
  HasStickyBar: "has-sticky-bar",
  ShowFixedHeader: "show-fixed-header",
  ShowHeaderSearch: "show-header-search",
  ShowNavMain: "show-nav-main",
  PageLoaded: "page-loaded"
};
$bodyTag.classList.toggle(className.IsTouch, "ontouchstart" in window);
window.onload = () => $bodyTag.classList.add(className.PageLoaded);
const scrollToElement = ($element2 = "") => {
  if (typeof $element2 == "undefined" && $element2 == null) {
    return false;
  }
  const $wpAdmin = document.getElementById("wpadminbar");
  const _offset = parseInt($element2.getBoundingClientRect().top, 10) + window.scrollY;
  const _wpAdmin = typeof $wpAdmin != "undefined" && $wpAdmin != null ? parseInt($wpAdmin.offsetHeight, 10) : 0;
  const _marginTop = parseInt($element2.style.marginTop, 10);
  const _paddingTop = parseInt($element2.style.paddingTop, 10);
  const _moreOffset = _marginTop > 0 && _paddingTop == 0 ? _marginTop : 0;
  window.scrollTo({
    top: _offset - _wpAdmin - _moreOffset,
    left: 0,
    behavior: "smooth"
  });
};
let timer = null;
let events$1 = ["load", "hashchange"];
for (let i = 0; i < events$1.length; i++) {
  window.addEventListener(events$1[i], function() {
    clearTimeout(timer);
    setАnchorLisener(document.getElementsByTagName("a"));
    setАnchorLisener(document.getElementsByTagName("button"));
    timer = setTimeout(function() {
      getValueToScroll(window.location.hash);
    }, 600);
  });
}
function setАnchorLisener($allLinks) {
  for (let i = 0; i < $allLinks.length; i++) {
    $allLinks[i].addEventListener("click", function(event) {
      if (this.dataset.scrollTo != void 0 || this.href != void 0) {
        const value = this.href == void 0 ? "#" + this.dataset.scrollTo : this.href;
        const result = getValueToScroll(value);
        if (result) {
          event.preventDefault();
        }
      }
    });
  }
}
function getValueToScroll(href) {
  if (href.indexOf("#") === -1) {
    return false;
  }
  const hash = href.split("#");
  const $id = document.querySelector('[data-id="' + hash[1] + '"]');
  if (!$id) {
    return false;
  }
  scrollToElement($id);
  history.replaceState(void 0, void 0, "#" + hash[1]);
  return true;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var isotope = { exports: {} };
var outlayer = { exports: {} };
var evEmitter = { exports: {} };
var hasRequiredEvEmitter;
function requireEvEmitter() {
  if (hasRequiredEvEmitter)
    return evEmitter.exports;
  hasRequiredEvEmitter = 1;
  (function(module) {
    (function(global2, factory) {
      if (module.exports) {
        module.exports = factory();
      } else {
        global2.EvEmitter = factory();
      }
    })(typeof window != "undefined" ? window : commonjsGlobal, function() {
      function EvEmitter() {
      }
      var proto = EvEmitter.prototype;
      proto.on = function(eventName, listener) {
        if (!eventName || !listener) {
          return;
        }
        var events2 = this._events = this._events || {};
        var listeners = events2[eventName] = events2[eventName] || [];
        if (listeners.indexOf(listener) == -1) {
          listeners.push(listener);
        }
        return this;
      };
      proto.once = function(eventName, listener) {
        if (!eventName || !listener) {
          return;
        }
        this.on(eventName, listener);
        var onceEvents = this._onceEvents = this._onceEvents || {};
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        onceListeners[listener] = true;
        return this;
      };
      proto.off = function(eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
          return;
        }
        var index = listeners.indexOf(listener);
        if (index != -1) {
          listeners.splice(index, 1);
        }
        return this;
      };
      proto.emitEvent = function(eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) {
          return;
        }
        listeners = listeners.slice(0);
        args = args || [];
        var onceListeners = this._onceEvents && this._onceEvents[eventName];
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          var isOnce = onceListeners && onceListeners[listener];
          if (isOnce) {
            this.off(eventName, listener);
            delete onceListeners[listener];
          }
          listener.apply(this, args);
        }
        return this;
      };
      proto.allOff = function() {
        delete this._events;
        delete this._onceEvents;
      };
      return EvEmitter;
    });
  })(evEmitter);
  return evEmitter.exports;
}
var getSize = { exports: {} };
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */
var hasRequiredGetSize;
function requireGetSize() {
  if (hasRequiredGetSize)
    return getSize.exports;
  hasRequiredGetSize = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory();
      } else {
        window2.getSize = factory();
      }
    })(window, function factory() {
      function getStyleSize(value) {
        var num = parseFloat(value);
        var isValid = value.indexOf("%") == -1 && !isNaN(num);
        return isValid && num;
      }
      function noop() {
      }
      var logError = typeof console == "undefined" ? noop : function(message) {
        console.error(message);
      };
      var measurements = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth"
      ];
      var measurementsLength = measurements.length;
      function getZeroSize() {
        var size = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        };
        for (var i = 0; i < measurementsLength; i++) {
          var measurement = measurements[i];
          size[measurement] = 0;
        }
        return size;
      }
      function getStyle(elem) {
        var style2 = getComputedStyle(elem);
        if (!style2) {
          logError("Style returned " + style2 + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1");
        }
        return style2;
      }
      var isSetup = false;
      var isBoxSizeOuter;
      function setup() {
        if (isSetup) {
          return;
        }
        isSetup = true;
        var div = document.createElement("div");
        div.style.width = "200px";
        div.style.padding = "1px 2px 3px 4px";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1px 2px 3px 4px";
        div.style.boxSizing = "border-box";
        var body = document.body || document.documentElement;
        body.appendChild(div);
        var style2 = getStyle(div);
        isBoxSizeOuter = Math.round(getStyleSize(style2.width)) == 200;
        getSize2.isBoxSizeOuter = isBoxSizeOuter;
        body.removeChild(div);
      }
      function getSize2(elem) {
        setup();
        if (typeof elem == "string") {
          elem = document.querySelector(elem);
        }
        if (!elem || typeof elem != "object" || !elem.nodeType) {
          return;
        }
        var style2 = getStyle(elem);
        if (style2.display == "none") {
          return getZeroSize();
        }
        var size = {};
        size.width = elem.offsetWidth;
        size.height = elem.offsetHeight;
        var isBorderBox = size.isBorderBox = style2.boxSizing == "border-box";
        for (var i = 0; i < measurementsLength; i++) {
          var measurement = measurements[i];
          var value = style2[measurement];
          var num = parseFloat(value);
          size[measurement] = !isNaN(num) ? num : 0;
        }
        var paddingWidth = size.paddingLeft + size.paddingRight;
        var paddingHeight = size.paddingTop + size.paddingBottom;
        var marginWidth = size.marginLeft + size.marginRight;
        var marginHeight = size.marginTop + size.marginBottom;
        var borderWidth = size.borderLeftWidth + size.borderRightWidth;
        var borderHeight = size.borderTopWidth + size.borderBottomWidth;
        var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
        var styleWidth = getStyleSize(style2.width);
        if (styleWidth !== false) {
          size.width = styleWidth + // add padding and border unless it's already including it
          (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
        }
        var styleHeight = getStyleSize(style2.height);
        if (styleHeight !== false) {
          size.height = styleHeight + // add padding and border unless it's already including it
          (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
        }
        size.innerWidth = size.width - (paddingWidth + borderWidth);
        size.innerHeight = size.height - (paddingHeight + borderHeight);
        size.outerWidth = size.width + marginWidth;
        size.outerHeight = size.height + marginHeight;
        return size;
      }
      return getSize2;
    });
  })(getSize);
  return getSize.exports;
}
var utils = { exports: {} };
var matchesSelector = { exports: {} };
var hasRequiredMatchesSelector;
function requireMatchesSelector() {
  if (hasRequiredMatchesSelector)
    return matchesSelector.exports;
  hasRequiredMatchesSelector = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory();
      } else {
        window2.matchesSelector = factory();
      }
    })(window, function factory() {
      var matchesMethod = function() {
        var ElemProto = window.Element.prototype;
        if (ElemProto.matches) {
          return "matches";
        }
        if (ElemProto.matchesSelector) {
          return "matchesSelector";
        }
        var prefixes = ["webkit", "moz", "ms", "o"];
        for (var i = 0; i < prefixes.length; i++) {
          var prefix = prefixes[i];
          var method = prefix + "MatchesSelector";
          if (ElemProto[method]) {
            return method;
          }
        }
      }();
      return function matchesSelector2(elem, selector) {
        return elem[matchesMethod](selector);
      };
    });
  })(matchesSelector);
  return matchesSelector.exports;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils)
    return utils.exports;
  hasRequiredUtils = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory(
          window2,
          requireMatchesSelector()
        );
      } else {
        window2.fizzyUIUtils = factory(
          window2,
          window2.matchesSelector
        );
      }
    })(window, function factory(window2, matchesSelector2) {
      var utils2 = {};
      utils2.extend = function(a, b) {
        for (var prop in b) {
          a[prop] = b[prop];
        }
        return a;
      };
      utils2.modulo = function(num, div) {
        return (num % div + div) % div;
      };
      var arraySlice = Array.prototype.slice;
      utils2.makeArray = function(obj) {
        if (Array.isArray(obj)) {
          return obj;
        }
        if (obj === null || obj === void 0) {
          return [];
        }
        var isArrayLike = typeof obj == "object" && typeof obj.length == "number";
        if (isArrayLike) {
          return arraySlice.call(obj);
        }
        return [obj];
      };
      utils2.removeFrom = function(ary, obj) {
        var index = ary.indexOf(obj);
        if (index != -1) {
          ary.splice(index, 1);
        }
      };
      utils2.getParent = function(elem, selector) {
        while (elem.parentNode && elem != document.body) {
          elem = elem.parentNode;
          if (matchesSelector2(elem, selector)) {
            return elem;
          }
        }
      };
      utils2.getQueryElement = function(elem) {
        if (typeof elem == "string") {
          return document.querySelector(elem);
        }
        return elem;
      };
      utils2.handleEvent = function(event) {
        var method = "on" + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      utils2.filterFindElements = function(elems, selector) {
        elems = utils2.makeArray(elems);
        var ffElems = [];
        elems.forEach(function(elem) {
          if (!(elem instanceof HTMLElement)) {
            return;
          }
          if (!selector) {
            ffElems.push(elem);
            return;
          }
          if (matchesSelector2(elem, selector)) {
            ffElems.push(elem);
          }
          var childElems = elem.querySelectorAll(selector);
          for (var i = 0; i < childElems.length; i++) {
            ffElems.push(childElems[i]);
          }
        });
        return ffElems;
      };
      utils2.debounceMethod = function(_class, methodName, threshold) {
        threshold = threshold || 100;
        var method = _class.prototype[methodName];
        var timeoutName = methodName + "Timeout";
        _class.prototype[methodName] = function() {
          var timeout = this[timeoutName];
          clearTimeout(timeout);
          var args = arguments;
          var _this = this;
          this[timeoutName] = setTimeout(function() {
            method.apply(_this, args);
            delete _this[timeoutName];
          }, threshold);
        };
      };
      utils2.docReady = function(callback) {
        var readyState = document.readyState;
        if (readyState == "complete" || readyState == "interactive") {
          setTimeout(callback);
        } else {
          document.addEventListener("DOMContentLoaded", callback);
        }
      };
      utils2.toDashed = function(str) {
        return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
          return $1 + "-" + $2;
        }).toLowerCase();
      };
      var console2 = window2.console;
      utils2.htmlInit = function(WidgetClass, namespace) {
        utils2.docReady(function() {
          var dashedNamespace = utils2.toDashed(namespace);
          var dataAttr = "data-" + dashedNamespace;
          var dataAttrElems = document.querySelectorAll("[" + dataAttr + "]");
          var jsDashElems = document.querySelectorAll(".js-" + dashedNamespace);
          var elems = utils2.makeArray(dataAttrElems).concat(utils2.makeArray(jsDashElems));
          var dataOptionsAttr = dataAttr + "-options";
          var jQuery = window2.jQuery;
          elems.forEach(function(elem) {
            var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
            var options;
            try {
              options = attr && JSON.parse(attr);
            } catch (error) {
              if (console2) {
                console2.error("Error parsing " + dataAttr + " on " + elem.className + ": " + error);
              }
              return;
            }
            var instance = new WidgetClass(elem, options);
            if (jQuery) {
              jQuery.data(elem, namespace, instance);
            }
          });
        });
      };
      return utils2;
    });
  })(utils);
  return utils.exports;
}
var item$1 = { exports: {} };
var hasRequiredItem$1;
function requireItem$1() {
  if (hasRequiredItem$1)
    return item$1.exports;
  hasRequiredItem$1 = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory(
          requireEvEmitter(),
          requireGetSize()
        );
      } else {
        window2.Outlayer = {};
        window2.Outlayer.Item = factory(
          window2.EvEmitter,
          window2.getSize
        );
      }
    })(window, function factory(EvEmitter, getSize2) {
      function isEmptyObj(obj) {
        for (var prop in obj) {
          return false;
        }
        prop = null;
        return true;
      }
      var docElemStyle = document.documentElement.style;
      var transitionProperty = typeof docElemStyle.transition == "string" ? "transition" : "WebkitTransition";
      var transformProperty = typeof docElemStyle.transform == "string" ? "transform" : "WebkitTransform";
      var transitionEndEvent = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
      }[transitionProperty];
      var vendorProperties = {
        transform: transformProperty,
        transition: transitionProperty,
        transitionDuration: transitionProperty + "Duration",
        transitionProperty: transitionProperty + "Property",
        transitionDelay: transitionProperty + "Delay"
      };
      function Item(element2, layout) {
        if (!element2) {
          return;
        }
        this.element = element2;
        this.layout = layout;
        this.position = {
          x: 0,
          y: 0
        };
        this._create();
      }
      var proto = Item.prototype = Object.create(EvEmitter.prototype);
      proto.constructor = Item;
      proto._create = function() {
        this._transn = {
          ingProperties: {},
          clean: {},
          onEnd: {}
        };
        this.css({
          position: "absolute"
        });
      };
      proto.handleEvent = function(event) {
        var method = "on" + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      proto.getSize = function() {
        this.size = getSize2(this.element);
      };
      proto.css = function(style2) {
        var elemStyle = this.element.style;
        for (var prop in style2) {
          var supportedProp = vendorProperties[prop] || prop;
          elemStyle[supportedProp] = style2[prop];
        }
      };
      proto.getPosition = function() {
        var style2 = getComputedStyle(this.element);
        var isOriginLeft = this.layout._getOption("originLeft");
        var isOriginTop = this.layout._getOption("originTop");
        var xValue = style2[isOriginLeft ? "left" : "right"];
        var yValue = style2[isOriginTop ? "top" : "bottom"];
        var x = parseFloat(xValue);
        var y = parseFloat(yValue);
        var layoutSize = this.layout.size;
        if (xValue.indexOf("%") != -1) {
          x = x / 100 * layoutSize.width;
        }
        if (yValue.indexOf("%") != -1) {
          y = y / 100 * layoutSize.height;
        }
        x = isNaN(x) ? 0 : x;
        y = isNaN(y) ? 0 : y;
        x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
        y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
        this.position.x = x;
        this.position.y = y;
      };
      proto.layoutPosition = function() {
        var layoutSize = this.layout.size;
        var style2 = {};
        var isOriginLeft = this.layout._getOption("originLeft");
        var isOriginTop = this.layout._getOption("originTop");
        var xPadding = isOriginLeft ? "paddingLeft" : "paddingRight";
        var xProperty = isOriginLeft ? "left" : "right";
        var xResetProperty = isOriginLeft ? "right" : "left";
        var x = this.position.x + layoutSize[xPadding];
        style2[xProperty] = this.getXValue(x);
        style2[xResetProperty] = "";
        var yPadding = isOriginTop ? "paddingTop" : "paddingBottom";
        var yProperty = isOriginTop ? "top" : "bottom";
        var yResetProperty = isOriginTop ? "bottom" : "top";
        var y = this.position.y + layoutSize[yPadding];
        style2[yProperty] = this.getYValue(y);
        style2[yResetProperty] = "";
        this.css(style2);
        this.emitEvent("layout", [this]);
      };
      proto.getXValue = function(x) {
        var isHorizontal = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + "%" : x + "px";
      };
      proto.getYValue = function(y) {
        var isHorizontal = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + "%" : y + "px";
      };
      proto._transitionTo = function(x, y) {
        this.getPosition();
        var curX = this.position.x;
        var curY = this.position.y;
        var didNotMove = x == this.position.x && y == this.position.y;
        this.setPosition(x, y);
        if (didNotMove && !this.isTransitioning) {
          this.layoutPosition();
          return;
        }
        var transX = x - curX;
        var transY = y - curY;
        var transitionStyle = {};
        transitionStyle.transform = this.getTranslate(transX, transY);
        this.transition({
          to: transitionStyle,
          onTransitionEnd: {
            transform: this.layoutPosition
          },
          isCleaning: true
        });
      };
      proto.getTranslate = function(x, y) {
        var isOriginLeft = this.layout._getOption("originLeft");
        var isOriginTop = this.layout._getOption("originTop");
        x = isOriginLeft ? x : -x;
        y = isOriginTop ? y : -y;
        return "translate3d(" + x + "px, " + y + "px, 0)";
      };
      proto.goTo = function(x, y) {
        this.setPosition(x, y);
        this.layoutPosition();
      };
      proto.moveTo = proto._transitionTo;
      proto.setPosition = function(x, y) {
        this.position.x = parseFloat(x);
        this.position.y = parseFloat(y);
      };
      proto._nonTransition = function(args) {
        this.css(args.to);
        if (args.isCleaning) {
          this._removeStyles(args.to);
        }
        for (var prop in args.onTransitionEnd) {
          args.onTransitionEnd[prop].call(this);
        }
      };
      proto.transition = function(args) {
        if (!parseFloat(this.layout.options.transitionDuration)) {
          this._nonTransition(args);
          return;
        }
        var _transition = this._transn;
        for (var prop in args.onTransitionEnd) {
          _transition.onEnd[prop] = args.onTransitionEnd[prop];
        }
        for (prop in args.to) {
          _transition.ingProperties[prop] = true;
          if (args.isCleaning) {
            _transition.clean[prop] = true;
          }
        }
        if (args.from) {
          this.css(args.from);
          this.element.offsetHeight;
        }
        this.enableTransition(args.to);
        this.css(args.to);
        this.isTransitioning = true;
      };
      function toDashedAll(str) {
        return str.replace(/([A-Z])/g, function($1) {
          return "-" + $1.toLowerCase();
        });
      }
      var transitionProps = "opacity," + toDashedAll(transformProperty);
      proto.enableTransition = function() {
        if (this.isTransitioning) {
          return;
        }
        var duration = this.layout.options.transitionDuration;
        duration = typeof duration == "number" ? duration + "ms" : duration;
        this.css({
          transitionProperty: transitionProps,
          transitionDuration: duration,
          transitionDelay: this.staggerDelay || 0
        });
        this.element.addEventListener(transitionEndEvent, this, false);
      };
      proto.onwebkitTransitionEnd = function(event) {
        this.ontransitionend(event);
      };
      proto.onotransitionend = function(event) {
        this.ontransitionend(event);
      };
      var dashedVendorProperties = {
        "-webkit-transform": "transform"
      };
      proto.ontransitionend = function(event) {
        if (event.target !== this.element) {
          return;
        }
        var _transition = this._transn;
        var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
        delete _transition.ingProperties[propertyName];
        if (isEmptyObj(_transition.ingProperties)) {
          this.disableTransition();
        }
        if (propertyName in _transition.clean) {
          this.element.style[event.propertyName] = "";
          delete _transition.clean[propertyName];
        }
        if (propertyName in _transition.onEnd) {
          var onTransitionEnd = _transition.onEnd[propertyName];
          onTransitionEnd.call(this);
          delete _transition.onEnd[propertyName];
        }
        this.emitEvent("transitionEnd", [this]);
      };
      proto.disableTransition = function() {
        this.removeTransitionStyles();
        this.element.removeEventListener(transitionEndEvent, this, false);
        this.isTransitioning = false;
      };
      proto._removeStyles = function(style2) {
        var cleanStyle = {};
        for (var prop in style2) {
          cleanStyle[prop] = "";
        }
        this.css(cleanStyle);
      };
      var cleanTransitionStyle = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
      };
      proto.removeTransitionStyles = function() {
        this.css(cleanTransitionStyle);
      };
      proto.stagger = function(delay) {
        delay = isNaN(delay) ? 0 : delay;
        this.staggerDelay = delay + "ms";
      };
      proto.removeElem = function() {
        this.element.parentNode.removeChild(this.element);
        this.css({ display: "" });
        this.emitEvent("remove", [this]);
      };
      proto.remove = function() {
        if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
          this.removeElem();
          return;
        }
        this.once("transitionEnd", function() {
          this.removeElem();
        });
        this.hide();
      };
      proto.reveal = function() {
        delete this.isHidden;
        this.css({ display: "" });
        var options = this.layout.options;
        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty("visibleStyle");
        onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
        this.transition({
          from: options.hiddenStyle,
          to: options.visibleStyle,
          isCleaning: true,
          onTransitionEnd
        });
      };
      proto.onRevealTransitionEnd = function() {
        if (!this.isHidden) {
          this.emitEvent("reveal");
        }
      };
      proto.getHideRevealTransitionEndProperty = function(styleProperty) {
        var optionStyle = this.layout.options[styleProperty];
        if (optionStyle.opacity) {
          return "opacity";
        }
        for (var prop in optionStyle) {
          return prop;
        }
      };
      proto.hide = function() {
        this.isHidden = true;
        this.css({ display: "" });
        var options = this.layout.options;
        var onTransitionEnd = {};
        var transitionEndProperty = this.getHideRevealTransitionEndProperty("hiddenStyle");
        onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
        this.transition({
          from: options.visibleStyle,
          to: options.hiddenStyle,
          // keep hidden stuff hidden
          isCleaning: true,
          onTransitionEnd
        });
      };
      proto.onHideTransitionEnd = function() {
        if (this.isHidden) {
          this.css({ display: "none" });
          this.emitEvent("hide");
        }
      };
      proto.destroy = function() {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: ""
        });
      };
      return Item;
    });
  })(item$1);
  return item$1.exports;
}
/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */
var hasRequiredOutlayer;
function requireOutlayer() {
  if (hasRequiredOutlayer)
    return outlayer.exports;
  hasRequiredOutlayer = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory(
          window2,
          requireEvEmitter(),
          requireGetSize(),
          requireUtils(),
          requireItem$1()
        );
      } else {
        window2.Outlayer = factory(
          window2,
          window2.EvEmitter,
          window2.getSize,
          window2.fizzyUIUtils,
          window2.Outlayer.Item
        );
      }
    })(window, function factory(window2, EvEmitter, getSize2, utils2, Item) {
      var console2 = window2.console;
      var jQuery = window2.jQuery;
      var noop = function() {
      };
      var GUID = 0;
      var instances = {};
      function Outlayer(element2, options) {
        var queryElement = utils2.getQueryElement(element2);
        if (!queryElement) {
          if (console2) {
            console2.error("Bad element for " + this.constructor.namespace + ": " + (queryElement || element2));
          }
          return;
        }
        this.element = queryElement;
        if (jQuery) {
          this.$element = jQuery(this.element);
        }
        this.options = utils2.extend({}, this.constructor.defaults);
        this.option(options);
        var id = ++GUID;
        this.element.outlayerGUID = id;
        instances[id] = this;
        this._create();
        var isInitLayout = this._getOption("initLayout");
        if (isInitLayout) {
          this.layout();
        }
      }
      Outlayer.namespace = "outlayer";
      Outlayer.Item = Item;
      Outlayer.defaults = {
        containerStyle: {
          position: "relative"
        },
        initLayout: true,
        originLeft: true,
        originTop: true,
        resize: true,
        resizeContainer: true,
        // item options
        transitionDuration: "0.4s",
        hiddenStyle: {
          opacity: 0,
          transform: "scale(0.001)"
        },
        visibleStyle: {
          opacity: 1,
          transform: "scale(1)"
        }
      };
      var proto = Outlayer.prototype;
      utils2.extend(proto, EvEmitter.prototype);
      proto.option = function(opts) {
        utils2.extend(this.options, opts);
      };
      proto._getOption = function(option) {
        var oldOption = this.constructor.compatOptions[option];
        return oldOption && this.options[oldOption] !== void 0 ? this.options[oldOption] : this.options[option];
      };
      Outlayer.compatOptions = {
        // currentName: oldName
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
      };
      proto._create = function() {
        this.reloadItems();
        this.stamps = [];
        this.stamp(this.options.stamp);
        utils2.extend(this.element.style, this.options.containerStyle);
        var canBindResize = this._getOption("resize");
        if (canBindResize) {
          this.bindResize();
        }
      };
      proto.reloadItems = function() {
        this.items = this._itemize(this.element.children);
      };
      proto._itemize = function(elems) {
        var itemElems = this._filterFindItemElements(elems);
        var Item2 = this.constructor.Item;
        var items = [];
        for (var i = 0; i < itemElems.length; i++) {
          var elem = itemElems[i];
          var item2 = new Item2(elem, this);
          items.push(item2);
        }
        return items;
      };
      proto._filterFindItemElements = function(elems) {
        return utils2.filterFindElements(elems, this.options.itemSelector);
      };
      proto.getItemElements = function() {
        return this.items.map(function(item2) {
          return item2.element;
        });
      };
      proto.layout = function() {
        this._resetLayout();
        this._manageStamps();
        var layoutInstant = this._getOption("layoutInstant");
        var isInstant = layoutInstant !== void 0 ? layoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, isInstant);
        this._isLayoutInited = true;
      };
      proto._init = proto.layout;
      proto._resetLayout = function() {
        this.getSize();
      };
      proto.getSize = function() {
        this.size = getSize2(this.element);
      };
      proto._getMeasurement = function(measurement, size) {
        var option = this.options[measurement];
        var elem;
        if (!option) {
          this[measurement] = 0;
        } else {
          if (typeof option == "string") {
            elem = this.element.querySelector(option);
          } else if (option instanceof HTMLElement) {
            elem = option;
          }
          this[measurement] = elem ? getSize2(elem)[size] : option;
        }
      };
      proto.layoutItems = function(items, isInstant) {
        items = this._getItemsForLayout(items);
        this._layoutItems(items, isInstant);
        this._postLayout();
      };
      proto._getItemsForLayout = function(items) {
        return items.filter(function(item2) {
          return !item2.isIgnored;
        });
      };
      proto._layoutItems = function(items, isInstant) {
        this._emitCompleteOnItems("layout", items);
        if (!items || !items.length) {
          return;
        }
        var queue = [];
        items.forEach(function(item2) {
          var position = this._getItemLayoutPosition(item2);
          position.item = item2;
          position.isInstant = isInstant || item2.isLayoutInstant;
          queue.push(position);
        }, this);
        this._processLayoutQueue(queue);
      };
      proto._getItemLayoutPosition = function() {
        return {
          x: 0,
          y: 0
        };
      };
      proto._processLayoutQueue = function(queue) {
        this.updateStagger();
        queue.forEach(function(obj, i) {
          this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
        }, this);
      };
      proto.updateStagger = function() {
        var stagger = this.options.stagger;
        if (stagger === null || stagger === void 0) {
          this.stagger = 0;
          return;
        }
        this.stagger = getMilliseconds(stagger);
        return this.stagger;
      };
      proto._positionItem = function(item2, x, y, isInstant, i) {
        if (isInstant) {
          item2.goTo(x, y);
        } else {
          item2.stagger(i * this.stagger);
          item2.moveTo(x, y);
        }
      };
      proto._postLayout = function() {
        this.resizeContainer();
      };
      proto.resizeContainer = function() {
        var isResizingContainer = this._getOption("resizeContainer");
        if (!isResizingContainer) {
          return;
        }
        var size = this._getContainerSize();
        if (size) {
          this._setContainerMeasure(size.width, true);
          this._setContainerMeasure(size.height, false);
        }
      };
      proto._getContainerSize = noop;
      proto._setContainerMeasure = function(measure, isWidth) {
        if (measure === void 0) {
          return;
        }
        var elemSize = this.size;
        if (elemSize.isBorderBox) {
          measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
        }
        measure = Math.max(measure, 0);
        this.element.style[isWidth ? "width" : "height"] = measure + "px";
      };
      proto._emitCompleteOnItems = function(eventName, items) {
        var _this = this;
        function onComplete() {
          _this.dispatchEvent(eventName + "Complete", null, [items]);
        }
        var count = items.length;
        if (!items || !count) {
          onComplete();
          return;
        }
        var doneCount = 0;
        function tick() {
          doneCount++;
          if (doneCount == count) {
            onComplete();
          }
        }
        items.forEach(function(item2) {
          item2.once(eventName, tick);
        });
      };
      proto.dispatchEvent = function(type, event, args) {
        var emitArgs = event ? [event].concat(args) : args;
        this.emitEvent(type, emitArgs);
        if (jQuery) {
          this.$element = this.$element || jQuery(this.element);
          if (event) {
            var $event = jQuery.Event(event);
            $event.type = type;
            this.$element.trigger($event, args);
          } else {
            this.$element.trigger(type, args);
          }
        }
      };
      proto.ignore = function(elem) {
        var item2 = this.getItem(elem);
        if (item2) {
          item2.isIgnored = true;
        }
      };
      proto.unignore = function(elem) {
        var item2 = this.getItem(elem);
        if (item2) {
          delete item2.isIgnored;
        }
      };
      proto.stamp = function(elems) {
        elems = this._find(elems);
        if (!elems) {
          return;
        }
        this.stamps = this.stamps.concat(elems);
        elems.forEach(this.ignore, this);
      };
      proto.unstamp = function(elems) {
        elems = this._find(elems);
        if (!elems) {
          return;
        }
        elems.forEach(function(elem) {
          utils2.removeFrom(this.stamps, elem);
          this.unignore(elem);
        }, this);
      };
      proto._find = function(elems) {
        if (!elems) {
          return;
        }
        if (typeof elems == "string") {
          elems = this.element.querySelectorAll(elems);
        }
        elems = utils2.makeArray(elems);
        return elems;
      };
      proto._manageStamps = function() {
        if (!this.stamps || !this.stamps.length) {
          return;
        }
        this._getBoundingRect();
        this.stamps.forEach(this._manageStamp, this);
      };
      proto._getBoundingRect = function() {
        var boundingRect = this.element.getBoundingClientRect();
        var size = this.size;
        this._boundingRect = {
          left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
          top: boundingRect.top + size.paddingTop + size.borderTopWidth,
          right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
          bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
        };
      };
      proto._manageStamp = noop;
      proto._getElementOffset = function(elem) {
        var boundingRect = elem.getBoundingClientRect();
        var thisRect = this._boundingRect;
        var size = getSize2(elem);
        var offset = {
          left: boundingRect.left - thisRect.left - size.marginLeft,
          top: boundingRect.top - thisRect.top - size.marginTop,
          right: thisRect.right - boundingRect.right - size.marginRight,
          bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
        };
        return offset;
      };
      proto.handleEvent = utils2.handleEvent;
      proto.bindResize = function() {
        window2.addEventListener("resize", this);
        this.isResizeBound = true;
      };
      proto.unbindResize = function() {
        window2.removeEventListener("resize", this);
        this.isResizeBound = false;
      };
      proto.onresize = function() {
        this.resize();
      };
      utils2.debounceMethod(Outlayer, "onresize", 100);
      proto.resize = function() {
        if (!this.isResizeBound || !this.needsResizeLayout()) {
          return;
        }
        this.layout();
      };
      proto.needsResizeLayout = function() {
        var size = getSize2(this.element);
        var hasSizes = this.size && size;
        return hasSizes && size.innerWidth !== this.size.innerWidth;
      };
      proto.addItems = function(elems) {
        var items = this._itemize(elems);
        if (items.length) {
          this.items = this.items.concat(items);
        }
        return items;
      };
      proto.appended = function(elems) {
        var items = this.addItems(elems);
        if (!items.length) {
          return;
        }
        this.layoutItems(items, true);
        this.reveal(items);
      };
      proto.prepended = function(elems) {
        var items = this._itemize(elems);
        if (!items.length) {
          return;
        }
        var previousItems = this.items.slice(0);
        this.items = items.concat(previousItems);
        this._resetLayout();
        this._manageStamps();
        this.layoutItems(items, true);
        this.reveal(items);
        this.layoutItems(previousItems);
      };
      proto.reveal = function(items) {
        this._emitCompleteOnItems("reveal", items);
        if (!items || !items.length) {
          return;
        }
        var stagger = this.updateStagger();
        items.forEach(function(item2, i) {
          item2.stagger(i * stagger);
          item2.reveal();
        });
      };
      proto.hide = function(items) {
        this._emitCompleteOnItems("hide", items);
        if (!items || !items.length) {
          return;
        }
        var stagger = this.updateStagger();
        items.forEach(function(item2, i) {
          item2.stagger(i * stagger);
          item2.hide();
        });
      };
      proto.revealItemElements = function(elems) {
        var items = this.getItems(elems);
        this.reveal(items);
      };
      proto.hideItemElements = function(elems) {
        var items = this.getItems(elems);
        this.hide(items);
      };
      proto.getItem = function(elem) {
        for (var i = 0; i < this.items.length; i++) {
          var item2 = this.items[i];
          if (item2.element == elem) {
            return item2;
          }
        }
      };
      proto.getItems = function(elems) {
        elems = utils2.makeArray(elems);
        var items = [];
        elems.forEach(function(elem) {
          var item2 = this.getItem(elem);
          if (item2) {
            items.push(item2);
          }
        }, this);
        return items;
      };
      proto.remove = function(elems) {
        var removeItems = this.getItems(elems);
        this._emitCompleteOnItems("remove", removeItems);
        if (!removeItems || !removeItems.length) {
          return;
        }
        removeItems.forEach(function(item2) {
          item2.remove();
          utils2.removeFrom(this.items, item2);
        }, this);
      };
      proto.destroy = function() {
        var style2 = this.element.style;
        style2.height = "";
        style2.position = "";
        style2.width = "";
        this.items.forEach(function(item2) {
          item2.destroy();
        });
        this.unbindResize();
        var id = this.element.outlayerGUID;
        delete instances[id];
        delete this.element.outlayerGUID;
        if (jQuery) {
          jQuery.removeData(this.element, this.constructor.namespace);
        }
      };
      Outlayer.data = function(elem) {
        elem = utils2.getQueryElement(elem);
        var id = elem && elem.outlayerGUID;
        return id && instances[id];
      };
      Outlayer.create = function(namespace, options) {
        var Layout = subclass(Outlayer);
        Layout.defaults = utils2.extend({}, Outlayer.defaults);
        utils2.extend(Layout.defaults, options);
        Layout.compatOptions = utils2.extend({}, Outlayer.compatOptions);
        Layout.namespace = namespace;
        Layout.data = Outlayer.data;
        Layout.Item = subclass(Item);
        utils2.htmlInit(Layout, namespace);
        if (jQuery && jQuery.bridget) {
          jQuery.bridget(namespace, Layout);
        }
        return Layout;
      };
      function subclass(Parent) {
        function SubClass() {
          Parent.apply(this, arguments);
        }
        SubClass.prototype = Object.create(Parent.prototype);
        SubClass.prototype.constructor = SubClass;
        return SubClass;
      }
      var msUnits = {
        ms: 1,
        s: 1e3
      };
      function getMilliseconds(time) {
        if (typeof time == "number") {
          return time;
        }
        var matches = time.match(/(^\d*\.?\d*)(\w*)/);
        var num = matches && matches[1];
        var unit = matches && matches[2];
        if (!num.length) {
          return 0;
        }
        num = parseFloat(num);
        var mult = msUnits[unit] || 1;
        return num * mult;
      }
      Outlayer.Item = Item;
      return Outlayer;
    });
  })(outlayer);
  return outlayer.exports;
}
var item = { exports: {} };
var hasRequiredItem;
function requireItem() {
  if (hasRequiredItem)
    return item.exports;
  hasRequiredItem = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory(
          requireOutlayer()
        );
      } else {
        window2.Isotope = window2.Isotope || {};
        window2.Isotope.Item = factory(
          window2.Outlayer
        );
      }
    })(window, function factory(Outlayer) {
      function Item() {
        Outlayer.Item.apply(this, arguments);
      }
      var proto = Item.prototype = Object.create(Outlayer.Item.prototype);
      var _create = proto._create;
      proto._create = function() {
        this.id = this.layout.itemGUID++;
        _create.call(this);
        this.sortData = {};
      };
      proto.updateSortData = function() {
        if (this.isIgnored) {
          return;
        }
        this.sortData.id = this.id;
        this.sortData["original-order"] = this.id;
        this.sortData.random = Math.random();
        var getSortData = this.layout.options.getSortData;
        var sorters = this.layout._sorters;
        for (var key in getSortData) {
          var sorter = sorters[key];
          this.sortData[key] = sorter(this.element, this);
        }
      };
      var _destroy = proto.destroy;
      proto.destroy = function() {
        _destroy.apply(this, arguments);
        this.css({
          display: ""
        });
      };
      return Item;
    });
  })(item);
  return item.exports;
}
var layoutMode = { exports: {} };
var hasRequiredLayoutMode;
function requireLayoutMode() {
  if (hasRequiredLayoutMode)
    return layoutMode.exports;
  hasRequiredLayoutMode = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory(
          requireGetSize(),
          requireOutlayer()
        );
      } else {
        window2.Isotope = window2.Isotope || {};
        window2.Isotope.LayoutMode = factory(
          window2.getSize,
          window2.Outlayer
        );
      }
    })(window, function factory(getSize2, Outlayer) {
      function LayoutMode(isotope2) {
        this.isotope = isotope2;
        if (isotope2) {
          this.options = isotope2.options[this.namespace];
          this.element = isotope2.element;
          this.items = isotope2.filteredItems;
          this.size = isotope2.size;
        }
      }
      var proto = LayoutMode.prototype;
      var facadeMethods = [
        "_resetLayout",
        "_getItemLayoutPosition",
        "_manageStamp",
        "_getContainerSize",
        "_getElementOffset",
        "needsResizeLayout",
        "_getOption"
      ];
      facadeMethods.forEach(function(methodName) {
        proto[methodName] = function() {
          return Outlayer.prototype[methodName].apply(this.isotope, arguments);
        };
      });
      proto.needsVerticalResizeLayout = function() {
        var size = getSize2(this.isotope.element);
        var hasSizes = this.isotope.size && size;
        return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
      };
      proto._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments);
      };
      proto.getColumnWidth = function() {
        this.getSegmentSize("column", "Width");
      };
      proto.getRowHeight = function() {
        this.getSegmentSize("row", "Height");
      };
      proto.getSegmentSize = function(segment, size) {
        var segmentName = segment + size;
        var outerSize = "outer" + size;
        this._getMeasurement(segmentName, outerSize);
        if (this[segmentName]) {
          return;
        }
        var firstItemSize = this.getFirstItemSize();
        this[segmentName] = firstItemSize && firstItemSize[outerSize] || // or size of container
        this.isotope.size["inner" + size];
      };
      proto.getFirstItemSize = function() {
        var firstItem = this.isotope.filteredItems[0];
        return firstItem && firstItem.element && getSize2(firstItem.element);
      };
      proto.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments);
      };
      proto.getSize = function() {
        this.isotope.getSize();
        this.size = this.isotope.size;
      };
      LayoutMode.modes = {};
      LayoutMode.create = function(namespace, options) {
        function Mode() {
          LayoutMode.apply(this, arguments);
        }
        Mode.prototype = Object.create(proto);
        Mode.prototype.constructor = Mode;
        if (options) {
          Mode.options = options;
        }
        Mode.prototype.namespace = namespace;
        LayoutMode.modes[namespace] = Mode;
        return Mode;
      };
      return LayoutMode;
    });
  })(layoutMode);
  return layoutMode.exports;
}
var masonry$1 = { exports: {} };
var masonry = { exports: {} };
/*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
var hasRequiredMasonry$1;
function requireMasonry$1() {
  if (hasRequiredMasonry$1)
    return masonry.exports;
  hasRequiredMasonry$1 = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory(
          requireOutlayer(),
          requireGetSize()
        );
      } else {
        window2.Masonry = factory(
          window2.Outlayer,
          window2.getSize
        );
      }
    })(window, function factory(Outlayer, getSize2) {
      var Masonry = Outlayer.create("masonry");
      Masonry.compatOptions.fitWidth = "isFitWidth";
      var proto = Masonry.prototype;
      proto._resetLayout = function() {
        this.getSize();
        this._getMeasurement("columnWidth", "outerWidth");
        this._getMeasurement("gutter", "outerWidth");
        this.measureColumns();
        this.colYs = [];
        for (var i = 0; i < this.cols; i++) {
          this.colYs.push(0);
        }
        this.maxY = 0;
        this.horizontalColIndex = 0;
      };
      proto.measureColumns = function() {
        this.getContainerWidth();
        if (!this.columnWidth) {
          var firstItem = this.items[0];
          var firstItemElem = firstItem && firstItem.element;
          this.columnWidth = firstItemElem && getSize2(firstItemElem).outerWidth || // if first elem has no width, default to size of container
          this.containerWidth;
        }
        var columnWidth = this.columnWidth += this.gutter;
        var containerWidth = this.containerWidth + this.gutter;
        var cols = containerWidth / columnWidth;
        var excess = columnWidth - containerWidth % columnWidth;
        var mathMethod = excess && excess < 1 ? "round" : "floor";
        cols = Math[mathMethod](cols);
        this.cols = Math.max(cols, 1);
      };
      proto.getContainerWidth = function() {
        var isFitWidth = this._getOption("fitWidth");
        var container = isFitWidth ? this.element.parentNode : this.element;
        var size = getSize2(container);
        this.containerWidth = size && size.innerWidth;
      };
      proto._getItemLayoutPosition = function(item2) {
        item2.getSize();
        var remainder = item2.size.outerWidth % this.columnWidth;
        var mathMethod = remainder && remainder < 1 ? "round" : "ceil";
        var colSpan = Math[mathMethod](item2.size.outerWidth / this.columnWidth);
        colSpan = Math.min(colSpan, this.cols);
        var colPosMethod = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition";
        var colPosition = this[colPosMethod](colSpan, item2);
        var position = {
          x: this.columnWidth * colPosition.col,
          y: colPosition.y
        };
        var setHeight = colPosition.y + item2.size.outerHeight;
        var setMax = colSpan + colPosition.col;
        for (var i = colPosition.col; i < setMax; i++) {
          this.colYs[i] = setHeight;
        }
        return position;
      };
      proto._getTopColPosition = function(colSpan) {
        var colGroup = this._getTopColGroup(colSpan);
        var minimumY = Math.min.apply(Math, colGroup);
        return {
          col: colGroup.indexOf(minimumY),
          y: minimumY
        };
      };
      proto._getTopColGroup = function(colSpan) {
        if (colSpan < 2) {
          return this.colYs;
        }
        var colGroup = [];
        var groupCount = this.cols + 1 - colSpan;
        for (var i = 0; i < groupCount; i++) {
          colGroup[i] = this._getColGroupY(i, colSpan);
        }
        return colGroup;
      };
      proto._getColGroupY = function(col, colSpan) {
        if (colSpan < 2) {
          return this.colYs[col];
        }
        var groupColYs = this.colYs.slice(col, col + colSpan);
        return Math.max.apply(Math, groupColYs);
      };
      proto._getHorizontalColPosition = function(colSpan, item2) {
        var col = this.horizontalColIndex % this.cols;
        var isOver = colSpan > 1 && col + colSpan > this.cols;
        col = isOver ? 0 : col;
        var hasSize = item2.size.outerWidth && item2.size.outerHeight;
        this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
        return {
          col,
          y: this._getColGroupY(col, colSpan)
        };
      };
      proto._manageStamp = function(stamp) {
        var stampSize = getSize2(stamp);
        var offset = this._getElementOffset(stamp);
        var isOriginLeft = this._getOption("originLeft");
        var firstX = isOriginLeft ? offset.left : offset.right;
        var lastX = firstX + stampSize.outerWidth;
        var firstCol = Math.floor(firstX / this.columnWidth);
        firstCol = Math.max(0, firstCol);
        var lastCol = Math.floor(lastX / this.columnWidth);
        lastCol -= lastX % this.columnWidth ? 0 : 1;
        lastCol = Math.min(this.cols - 1, lastCol);
        var isOriginTop = this._getOption("originTop");
        var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
        for (var i = firstCol; i <= lastCol; i++) {
          this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
        }
      };
      proto._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var size = {
          height: this.maxY
        };
        if (this._getOption("fitWidth")) {
          size.width = this._getContainerFitWidth();
        }
        return size;
      };
      proto._getContainerFitWidth = function() {
        var unusedCols = 0;
        var i = this.cols;
        while (--i) {
          if (this.colYs[i] !== 0) {
            break;
          }
          unusedCols++;
        }
        return (this.cols - unusedCols) * this.columnWidth - this.gutter;
      };
      proto.needsResizeLayout = function() {
        var previousWidth = this.containerWidth;
        this.getContainerWidth();
        return previousWidth != this.containerWidth;
      };
      return Masonry;
    });
  })(masonry);
  return masonry.exports;
}
/*!
 * Masonry layout mode
 * sub-classes Masonry
 * https://masonry.desandro.com
 */
var hasRequiredMasonry;
function requireMasonry() {
  if (hasRequiredMasonry)
    return masonry$1.exports;
  hasRequiredMasonry = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory(
          requireLayoutMode(),
          requireMasonry$1()
        );
      } else {
        factory(
          window2.Isotope.LayoutMode,
          window2.Masonry
        );
      }
    })(window, function factory(LayoutMode, Masonry) {
      var MasonryMode = LayoutMode.create("masonry");
      var proto = MasonryMode.prototype;
      var keepModeMethods = {
        _getElementOffset: true,
        layout: true,
        _getMeasurement: true
      };
      for (var method in Masonry.prototype) {
        if (!keepModeMethods[method]) {
          proto[method] = Masonry.prototype[method];
        }
      }
      var measureColumns = proto.measureColumns;
      proto.measureColumns = function() {
        this.items = this.isotope.filteredItems;
        measureColumns.call(this);
      };
      var _getOption = proto._getOption;
      proto._getOption = function(option) {
        if (option == "fitWidth") {
          return this.options.isFitWidth !== void 0 ? this.options.isFitWidth : this.options.fitWidth;
        }
        return _getOption.apply(this.isotope, arguments);
      };
      return MasonryMode;
    });
  })(masonry$1);
  return masonry$1.exports;
}
var fitRows = { exports: {} };
var hasRequiredFitRows;
function requireFitRows() {
  if (hasRequiredFitRows)
    return fitRows.exports;
  hasRequiredFitRows = 1;
  (function(module, exports) {
    (function(window2, factory) {
      {
        module.exports = factory(
          requireLayoutMode()
        );
      }
    })(window, function factory(LayoutMode) {
      var FitRows = LayoutMode.create("fitRows");
      var proto = FitRows.prototype;
      proto._resetLayout = function() {
        this.x = 0;
        this.y = 0;
        this.maxY = 0;
        this._getMeasurement("gutter", "outerWidth");
      };
      proto._getItemLayoutPosition = function(item2) {
        item2.getSize();
        var itemWidth = item2.size.outerWidth + this.gutter;
        var containerWidth = this.isotope.size.innerWidth + this.gutter;
        if (this.x !== 0 && itemWidth + this.x > containerWidth) {
          this.x = 0;
          this.y = this.maxY;
        }
        var position = {
          x: this.x,
          y: this.y
        };
        this.maxY = Math.max(this.maxY, this.y + item2.size.outerHeight);
        this.x += itemWidth;
        return position;
      };
      proto._getContainerSize = function() {
        return { height: this.maxY };
      };
      return FitRows;
    });
  })(fitRows);
  return fitRows.exports;
}
var vertical = { exports: {} };
var hasRequiredVertical;
function requireVertical() {
  if (hasRequiredVertical)
    return vertical.exports;
  hasRequiredVertical = 1;
  (function(module) {
    (function(window2, factory) {
      if (module.exports) {
        module.exports = factory(
          requireLayoutMode()
        );
      } else {
        factory(
          window2.Isotope.LayoutMode
        );
      }
    })(window, function factory(LayoutMode) {
      var Vertical = LayoutMode.create("vertical", {
        horizontalAlignment: 0
      });
      var proto = Vertical.prototype;
      proto._resetLayout = function() {
        this.y = 0;
      };
      proto._getItemLayoutPosition = function(item2) {
        item2.getSize();
        var x = (this.isotope.size.innerWidth - item2.size.outerWidth) * this.options.horizontalAlignment;
        var y = this.y;
        this.y += item2.size.outerHeight;
        return { x, y };
      };
      proto._getContainerSize = function() {
        return { height: this.y };
      };
      return Vertical;
    });
  })(vertical);
  return vertical.exports;
}
/*!
 * Isotope v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */
(function(module) {
  (function(window2, factory) {
    if (module.exports) {
      module.exports = factory(
        window2,
        requireOutlayer(),
        requireGetSize(),
        requireMatchesSelector(),
        requireUtils(),
        requireItem(),
        requireLayoutMode(),
        // include default layout modes
        requireMasonry(),
        requireFitRows(),
        requireVertical()
      );
    } else {
      window2.Isotope = factory(
        window2,
        window2.Outlayer,
        window2.getSize,
        window2.matchesSelector,
        window2.fizzyUIUtils,
        window2.Isotope.Item,
        window2.Isotope.LayoutMode
      );
    }
  })(window, function factory(window2, Outlayer, getSize2, matchesSelector2, utils2, Item, LayoutMode) {
    var jQuery = window2.jQuery;
    var trim = String.prototype.trim ? function(str) {
      return str.trim();
    } : function(str) {
      return str.replace(/^\s+|\s+$/g, "");
    };
    var Isotope2 = Outlayer.create("isotope", {
      layoutMode: "masonry",
      isJQueryFiltering: true,
      sortAscending: true
    });
    Isotope2.Item = Item;
    Isotope2.LayoutMode = LayoutMode;
    var proto = Isotope2.prototype;
    proto._create = function() {
      this.itemGUID = 0;
      this._sorters = {};
      this._getSorters();
      Outlayer.prototype._create.call(this);
      this.modes = {};
      this.filteredItems = this.items;
      this.sortHistory = ["original-order"];
      for (var name in LayoutMode.modes) {
        this._initLayoutMode(name);
      }
    };
    proto.reloadItems = function() {
      this.itemGUID = 0;
      Outlayer.prototype.reloadItems.call(this);
    };
    proto._itemize = function() {
      var items = Outlayer.prototype._itemize.apply(this, arguments);
      for (var i = 0; i < items.length; i++) {
        var item2 = items[i];
        item2.id = this.itemGUID++;
      }
      this._updateItemsSortData(items);
      return items;
    };
    proto._initLayoutMode = function(name) {
      var Mode = LayoutMode.modes[name];
      var initialOpts = this.options[name] || {};
      this.options[name] = Mode.options ? utils2.extend(Mode.options, initialOpts) : initialOpts;
      this.modes[name] = new Mode(this);
    };
    proto.layout = function() {
      if (!this._isLayoutInited && this._getOption("initLayout")) {
        this.arrange();
        return;
      }
      this._layout();
    };
    proto._layout = function() {
      var isInstant = this._getIsInstant();
      this._resetLayout();
      this._manageStamps();
      this.layoutItems(this.filteredItems, isInstant);
      this._isLayoutInited = true;
    };
    proto.arrange = function(opts) {
      this.option(opts);
      this._getIsInstant();
      var filtered = this._filter(this.items);
      this.filteredItems = filtered.matches;
      this._bindArrangeComplete();
      if (this._isInstant) {
        this._noTransition(this._hideReveal, [filtered]);
      } else {
        this._hideReveal(filtered);
      }
      this._sort();
      this._layout();
    };
    proto._init = proto.arrange;
    proto._hideReveal = function(filtered) {
      this.reveal(filtered.needReveal);
      this.hide(filtered.needHide);
    };
    proto._getIsInstant = function() {
      var isLayoutInstant = this._getOption("layoutInstant");
      var isInstant = isLayoutInstant !== void 0 ? isLayoutInstant : !this._isLayoutInited;
      this._isInstant = isInstant;
      return isInstant;
    };
    proto._bindArrangeComplete = function() {
      var isLayoutComplete, isHideComplete, isRevealComplete;
      var _this = this;
      function arrangeParallelCallback() {
        if (isLayoutComplete && isHideComplete && isRevealComplete) {
          _this.dispatchEvent("arrangeComplete", null, [_this.filteredItems]);
        }
      }
      this.once("layoutComplete", function() {
        isLayoutComplete = true;
        arrangeParallelCallback();
      });
      this.once("hideComplete", function() {
        isHideComplete = true;
        arrangeParallelCallback();
      });
      this.once("revealComplete", function() {
        isRevealComplete = true;
        arrangeParallelCallback();
      });
    };
    proto._filter = function(items) {
      var filter = this.options.filter;
      filter = filter || "*";
      var matches = [];
      var hiddenMatched = [];
      var visibleUnmatched = [];
      var test = this._getFilterTest(filter);
      for (var i = 0; i < items.length; i++) {
        var item2 = items[i];
        if (item2.isIgnored) {
          continue;
        }
        var isMatched = test(item2);
        if (isMatched) {
          matches.push(item2);
        }
        if (isMatched && item2.isHidden) {
          hiddenMatched.push(item2);
        } else if (!isMatched && !item2.isHidden) {
          visibleUnmatched.push(item2);
        }
      }
      return {
        matches,
        needReveal: hiddenMatched,
        needHide: visibleUnmatched
      };
    };
    proto._getFilterTest = function(filter) {
      if (jQuery && this.options.isJQueryFiltering) {
        return function(item2) {
          return jQuery(item2.element).is(filter);
        };
      }
      if (typeof filter == "function") {
        return function(item2) {
          return filter(item2.element);
        };
      }
      return function(item2) {
        return matchesSelector2(item2.element, filter);
      };
    };
    proto.updateSortData = function(elems) {
      var items;
      if (elems) {
        elems = utils2.makeArray(elems);
        items = this.getItems(elems);
      } else {
        items = this.items;
      }
      this._getSorters();
      this._updateItemsSortData(items);
    };
    proto._getSorters = function() {
      var getSortData = this.options.getSortData;
      for (var key in getSortData) {
        var sorter = getSortData[key];
        this._sorters[key] = mungeSorter(sorter);
      }
    };
    proto._updateItemsSortData = function(items) {
      var len = items && items.length;
      for (var i = 0; len && i < len; i++) {
        var item2 = items[i];
        item2.updateSortData();
      }
    };
    var mungeSorter = function() {
      function mungeSorter2(sorter) {
        if (typeof sorter != "string") {
          return sorter;
        }
        var args = trim(sorter).split(" ");
        var query = args[0];
        var attrMatch = query.match(/^\[(.+)\]$/);
        var attr = attrMatch && attrMatch[1];
        var getValue = getValueGetter(attr, query);
        var parser = Isotope2.sortDataParsers[args[1]];
        sorter = parser ? function(elem) {
          return elem && parser(getValue(elem));
        } : (
          // otherwise just return value
          function(elem) {
            return elem && getValue(elem);
          }
        );
        return sorter;
      }
      function getValueGetter(attr, query) {
        if (attr) {
          return function getAttribute(elem) {
            return elem.getAttribute(attr);
          };
        }
        return function getChildText(elem) {
          var child = elem.querySelector(query);
          return child && child.textContent;
        };
      }
      return mungeSorter2;
    }();
    Isotope2.sortDataParsers = {
      "parseInt": function(val) {
        return parseInt(val, 10);
      },
      "parseFloat": function(val) {
        return parseFloat(val);
      }
    };
    proto._sort = function() {
      if (!this.options.sortBy) {
        return;
      }
      var sortBys = utils2.makeArray(this.options.sortBy);
      if (!this._getIsSameSortBy(sortBys)) {
        this.sortHistory = sortBys.concat(this.sortHistory);
      }
      var itemSorter = getItemSorter(this.sortHistory, this.options.sortAscending);
      this.filteredItems.sort(itemSorter);
    };
    proto._getIsSameSortBy = function(sortBys) {
      for (var i = 0; i < sortBys.length; i++) {
        if (sortBys[i] != this.sortHistory[i]) {
          return false;
        }
      }
      return true;
    };
    function getItemSorter(sortBys, sortAsc) {
      return function sorter(itemA, itemB) {
        for (var i = 0; i < sortBys.length; i++) {
          var sortBy = sortBys[i];
          var a = itemA.sortData[sortBy];
          var b = itemB.sortData[sortBy];
          if (a > b || a < b) {
            var isAscending = sortAsc[sortBy] !== void 0 ? sortAsc[sortBy] : sortAsc;
            var direction = isAscending ? 1 : -1;
            return (a > b ? 1 : -1) * direction;
          }
        }
        return 0;
      };
    }
    proto._mode = function() {
      var layoutMode2 = this.options.layoutMode;
      var mode = this.modes[layoutMode2];
      if (!mode) {
        throw new Error("No layout mode: " + layoutMode2);
      }
      mode.options = this.options[layoutMode2];
      return mode;
    };
    proto._resetLayout = function() {
      Outlayer.prototype._resetLayout.call(this);
      this._mode()._resetLayout();
    };
    proto._getItemLayoutPosition = function(item2) {
      return this._mode()._getItemLayoutPosition(item2);
    };
    proto._manageStamp = function(stamp) {
      this._mode()._manageStamp(stamp);
    };
    proto._getContainerSize = function() {
      return this._mode()._getContainerSize();
    };
    proto.needsResizeLayout = function() {
      return this._mode().needsResizeLayout();
    };
    proto.appended = function(elems) {
      var items = this.addItems(elems);
      if (!items.length) {
        return;
      }
      var filteredItems = this._filterRevealAdded(items);
      this.filteredItems = this.filteredItems.concat(filteredItems);
    };
    proto.prepended = function(elems) {
      var items = this._itemize(elems);
      if (!items.length) {
        return;
      }
      this._resetLayout();
      this._manageStamps();
      var filteredItems = this._filterRevealAdded(items);
      this.layoutItems(this.filteredItems);
      this.filteredItems = filteredItems.concat(this.filteredItems);
      this.items = items.concat(this.items);
    };
    proto._filterRevealAdded = function(items) {
      var filtered = this._filter(items);
      this.hide(filtered.needHide);
      this.reveal(filtered.matches);
      this.layoutItems(filtered.matches, true);
      return filtered.matches;
    };
    proto.insert = function(elems) {
      var items = this.addItems(elems);
      if (!items.length) {
        return;
      }
      var i, item2;
      var len = items.length;
      for (i = 0; i < len; i++) {
        item2 = items[i];
        this.element.appendChild(item2.element);
      }
      var filteredInsertItems = this._filter(items).matches;
      for (i = 0; i < len; i++) {
        items[i].isLayoutInstant = true;
      }
      this.arrange();
      for (i = 0; i < len; i++) {
        delete items[i].isLayoutInstant;
      }
      this.reveal(filteredInsertItems);
    };
    var _remove = proto.remove;
    proto.remove = function(elems) {
      elems = utils2.makeArray(elems);
      var removeItems = this.getItems(elems);
      _remove.call(this, elems);
      var len = removeItems && removeItems.length;
      for (var i = 0; len && i < len; i++) {
        var item2 = removeItems[i];
        utils2.removeFrom(this.filteredItems, item2);
      }
    };
    proto.shuffle = function() {
      for (var i = 0; i < this.items.length; i++) {
        var item2 = this.items[i];
        item2.sortData.random = Math.random();
      }
      this.options.sortBy = "random";
      this._sort();
      this._layout();
    };
    proto._noTransition = function(fn, args) {
      var transitionDuration = this.options.transitionDuration;
      this.options.transitionDuration = 0;
      var returnValue = fn.apply(this, args);
      this.options.transitionDuration = transitionDuration;
      return returnValue;
    };
    proto.getFilteredItemElements = function() {
      return this.filteredItems.map(function(item2) {
        return item2.element;
      });
    };
    return Isotope2;
  });
})(isotope);
var isotopeExports = isotope.exports;
const Isotope = /* @__PURE__ */ getDefaultExportFromCjs(isotopeExports);
const element$2 = "js-grid-isotope";
const $element$2 = document.getElementsByClassName(element$2);
const length$2 = $element$2.length;
const iso = [];
const triggerEventName = "ajax-products-loaded";
const events = ["load", triggerEventName];
const classNameContents = ".js__items";
const classNameContent = ".js__item";
const classNameActions = ".js__actions";
const classNameAction = ".js__action";
const classNameSliders = ".js__slider";
const classNameSlider = ".js-slider-brands";
const classNameCategory = ".js__categories";
if (length$2) {
  $("body").on("click", classNameCategory + " a", function(event) {
    event.preventDefault();
    const $this = $(this);
    const $parent = $this.parent();
    $parent.addClass("current").siblings().removeClass("current");
    setAjax(this, "category");
  });
  $("body").on("click", "." + element$2 + " " + classNameAction, function(event) {
    event.preventDefault();
    setAjax(this, "more");
  });
  for (let i = 0; i < length$2; i++) {
    const $isotope = $element$2[i].getElementsByClassName("js__items")[0];
    $element$2[i].dataset.index = i;
    iso[i] = new Isotope($isotope, {
      itemSelector: ".grid-flex__col",
      percentPosition: true,
      masonry: {
        columnWidth: ".grid-flex__col-sizer"
      }
    });
  }
  for (let i = 0; i < events.length; i++) {
    window.addEventListener(events[i], function() {
      for (let j = 0; j < length$2; j++) {
        iso[j].layout();
      }
    });
  }
}
function setAjax(theElement, theType) {
  const $this = $(theElement);
  const $parent = $this.parents("." + element$2);
  const parentId = "#" + $parent.attr("id");
  const index = parseInt($parent.data("index"), 10);
  const $id = $(parentId);
  const $parents = $id.parents("section");
  const href = $this.attr("href");
  const settings = {
    url: href
  };
  if (!$id.length) {
    return false;
  }
  if (theType == "category") {
    const settingsSlider = {
      url: href.replace("-01.html", "-slider.html")
    };
    iso[index].remove($id.find(classNameContent));
    $parents.find(classNameSlider).remove();
    $parents.attr("data-loading", true);
    $.ajax(settingsSlider).done(function(response) {
      const $response = $(response);
      const $slider = $response.find(classNameSlider);
      if ($slider.length) {
        $parents.find(classNameSliders).html($slider);
        $(window).trigger("ajax-loaded");
      }
      setTimeout(function() {
        $parents.attr("data-loading", false);
      }, 400);
    });
  }
  $id.find(classNameAction).remove();
  $id.attr("data-loading", true);
  $.ajax(settings).done(function(response) {
    const $response = $(response);
    const $content = $response.find(classNameContents);
    const $theBtnMore = $response.find(classNameAction);
    iso[index].insert($content);
    if ($theBtnMore.length) {
      $parent.find(classNameActions).html($theBtnMore);
    }
    setTimeout(function() {
      $id.attr("data-loading", false);
    }, 400);
  });
}
var win$1 = window;
var raf = win$1.requestAnimationFrame || win$1.webkitRequestAnimationFrame || win$1.mozRequestAnimationFrame || win$1.msRequestAnimationFrame || function(cb) {
  return setTimeout(cb, 16);
};
var win = window;
var caf = win.cancelAnimationFrame || win.mozCancelAnimationFrame || function(id) {
  clearTimeout(id);
};
function extend() {
  var obj, name, copy, target = arguments[0] || {}, i = 1, length2 = arguments.length;
  for (; i < length2; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];
        if (target === copy) {
          continue;
        } else if (copy !== void 0) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}
function checkStorageValue(value) {
  return ["true", "false"].indexOf(value) >= 0 ? JSON.parse(value) : value;
}
function setLocalStorage(storage, key, value, access) {
  if (access) {
    try {
      storage.setItem(key, value);
    } catch (e) {
    }
  }
  return value;
}
function getSlideId() {
  var id = window.tnsId;
  window.tnsId = !id ? 1 : id + 1;
  return "tns" + window.tnsId;
}
function getBody() {
  var doc = document, body = doc.body;
  if (!body) {
    body = doc.createElement("body");
    body.fake = true;
  }
  return body;
}
var docElement = document.documentElement;
function setFakeBody(body) {
  var docOverflow = "";
  if (body.fake) {
    docOverflow = docElement.style.overflow;
    body.style.background = "";
    body.style.overflow = docElement.style.overflow = "hidden";
    docElement.appendChild(body);
  }
  return docOverflow;
}
function resetFakeBody(body, docOverflow) {
  if (body.fake) {
    body.remove();
    docElement.style.overflow = docOverflow;
    docElement.offsetHeight;
  }
}
function calc() {
  var doc = document, body = getBody(), docOverflow = setFakeBody(body), div = doc.createElement("div"), result = false;
  body.appendChild(div);
  try {
    var str = "(10px * 10)", vals = ["calc" + str, "-moz-calc" + str, "-webkit-calc" + str], val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;
      if (div.offsetWidth === 100) {
        result = val.replace(str, "");
        break;
      }
    }
  } catch (e) {
  }
  body.fake ? resetFakeBody(body, docOverflow) : div.remove();
  return result;
}
function percentageLayout() {
  var doc = document, body = getBody(), docOverflow = setFakeBody(body), wrapper = doc.createElement("div"), outer = doc.createElement("div"), str = "", count = 70, perPage = 3, supported = false;
  wrapper.className = "tns-t-subp2";
  outer.className = "tns-t-ct";
  for (var i = 0; i < count; i++) {
    str += "<div></div>";
  }
  outer.innerHTML = str;
  wrapper.appendChild(outer);
  body.appendChild(wrapper);
  supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;
  body.fake ? resetFakeBody(body, docOverflow) : wrapper.remove();
  return supported;
}
function mediaquerySupport() {
  if (window.matchMedia || window.msMatchMedia) {
    return true;
  }
  var doc = document, body = getBody(), docOverflow = setFakeBody(body), div = doc.createElement("div"), style2 = doc.createElement("style"), rule = "@media all and (min-width:1px){.tns-mq-test{position:absolute}}", position;
  style2.type = "text/css";
  div.className = "tns-mq-test";
  body.appendChild(style2);
  body.appendChild(div);
  if (style2.styleSheet) {
    style2.styleSheet.cssText = rule;
  } else {
    style2.appendChild(doc.createTextNode(rule));
  }
  position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle["position"];
  body.fake ? resetFakeBody(body, docOverflow) : div.remove();
  return position === "absolute";
}
function createStyleSheet(media, nonce) {
  var style2 = document.createElement("style");
  if (media) {
    style2.setAttribute("media", media);
  }
  if (nonce) {
    style2.setAttribute("nonce", nonce);
  }
  document.querySelector("head").appendChild(style2);
  return style2.sheet ? style2.sheet : style2.styleSheet;
}
function addCSSRule(sheet, selector, rules, index) {
  "insertRule" in sheet ? sheet.insertRule(selector + "{" + rules + "}", index) : sheet.addRule(selector, rules, index);
}
function removeCSSRule(sheet, index) {
  "deleteRule" in sheet ? sheet.deleteRule(index) : sheet.removeRule(index);
}
function getCssRulesLength(sheet) {
  var rule = "insertRule" in sheet ? sheet.cssRules : sheet.rules;
  return rule.length;
}
function toDegree(y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}
function getTouchDirection(angle, range) {
  var direction = false, gap = Math.abs(90 - Math.abs(angle));
  if (gap >= 90 - range) {
    direction = "horizontal";
  } else if (gap <= range) {
    direction = "vertical";
  }
  return direction;
}
function forEach(arr, callback, scope) {
  for (var i = 0, l = arr.length; i < l; i++) {
    callback.call(scope, arr[i], i);
  }
}
var classListSupport = "classList" in document.createElement("_");
var hasClass = classListSupport ? function(el, str) {
  return el.classList.contains(str);
} : function(el, str) {
  return el.className.indexOf(str) >= 0;
};
var addClass = classListSupport ? function(el, str) {
  if (!hasClass(el, str)) {
    el.classList.add(str);
  }
} : function(el, str) {
  if (!hasClass(el, str)) {
    el.className += " " + str;
  }
};
var removeClass = classListSupport ? function(el, str) {
  if (hasClass(el, str)) {
    el.classList.remove(str);
  }
} : function(el, str) {
  if (hasClass(el, str)) {
    el.className = el.className.replace(str, "");
  }
};
function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}
function getAttr(el, attr) {
  return el.getAttribute(attr);
}
function isNodeList(el) {
  return typeof el.item !== "undefined";
}
function setAttrs(els, attrs) {
  els = isNodeList(els) || els instanceof Array ? els : [els];
  if (Object.prototype.toString.call(attrs) !== "[object Object]") {
    return;
  }
  for (var i = els.length; i--; ) {
    for (var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}
function removeAttrs(els, attrs) {
  els = isNodeList(els) || els instanceof Array ? els : [els];
  attrs = attrs instanceof Array ? attrs : [attrs];
  var attrLength = attrs.length;
  for (var i = els.length; i--; ) {
    for (var j = attrLength; j--; ) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}
function arrayFromNodeList(nl) {
  var arr = [];
  for (var i = 0, l = nl.length; i < l; i++) {
    arr.push(nl[i]);
  }
  return arr;
}
function hideElement(el, forceHide) {
  if (el.style.display !== "none") {
    el.style.display = "none";
  }
}
function showElement(el, forceHide) {
  if (el.style.display === "none") {
    el.style.display = "";
  }
}
function isVisible(el) {
  return window.getComputedStyle(el).display !== "none";
}
function whichProperty(props) {
  if (typeof props === "string") {
    var arr = [props], Props = props.charAt(0).toUpperCase() + props.substr(1), prefixes = ["Webkit", "Moz", "ms", "O"];
    prefixes.forEach(function(prefix) {
      if (prefix !== "ms" || props === "transform") {
        arr.push(prefix + Props);
      }
    });
    props = arr;
  }
  var el = document.createElement("fakeelement");
  props.length;
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (el.style[prop] !== void 0) {
      return prop;
    }
  }
  return false;
}
function has3DTransforms(tf) {
  if (!tf) {
    return false;
  }
  if (!window.getComputedStyle) {
    return false;
  }
  var doc = document, body = getBody(), docOverflow = setFakeBody(body), el = doc.createElement("p"), has3d, cssTF = tf.length > 9 ? "-" + tf.slice(0, -9).toLowerCase() + "-" : "";
  cssTF += "transform";
  body.insertBefore(el, null);
  el.style[tf] = "translate3d(1px,1px,1px)";
  has3d = window.getComputedStyle(el).getPropertyValue(cssTF);
  body.fake ? resetFakeBody(body, docOverflow) : el.remove();
  return has3d !== void 0 && has3d.length > 0 && has3d !== "none";
}
function getEndProperty(propIn, propOut) {
  var endProp = false;
  if (/^Webkit/.test(propIn)) {
    endProp = "webkit" + propOut + "End";
  } else if (/^O/.test(propIn)) {
    endProp = "o" + propOut + "End";
  } else if (propIn) {
    endProp = propOut.toLowerCase() + "end";
  }
  return endProp;
}
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {
}
var passiveOption = supportsPassive ? { passive: true } : false;
function addEvents(el, obj, preventScrolling) {
  for (var prop in obj) {
    var option = ["touchstart", "touchmove"].indexOf(prop) >= 0 && !preventScrolling ? passiveOption : false;
    el.addEventListener(prop, obj[prop], option);
  }
}
function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = ["touchstart", "touchmove"].indexOf(prop) >= 0 ? passiveOption : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}
function Events() {
  return {
    topics: {},
    on: function(eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function(eventName, data) {
      data.type = eventName;
      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function(fn) {
          fn(data, eventName);
        });
      }
    }
  };
}
function jsTransform(element2, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10), unit = to.indexOf("%") >= 0 ? "%" : "px", to = to.replace(unit, ""), from = Number(element2.style[attr].replace(prefix, "").replace(postfix, "").replace(unit, "")), positionTick = (to - from) / duration * tick;
  setTimeout(moveElement, tick);
  function moveElement() {
    duration -= tick;
    from += positionTick;
    element2.style[attr] = prefix + from + unit + postfix;
    if (duration > 0) {
      setTimeout(moveElement, tick);
    } else {
      callback();
    }
  }
}
if (!Object.keys) {
  Object.keys = function(object) {
    var keys = [];
    for (var name in object) {
      if (Object.prototype.hasOwnProperty.call(object, name)) {
        keys.push(name);
      }
    }
    return keys;
  };
}
if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}
var tns = function(options) {
  options = extend({
    container: ".slider",
    mode: "carousel",
    axis: "horizontal",
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    autoWidth: false,
    viewportMax: false,
    slideBy: 1,
    center: false,
    controls: true,
    controlsPosition: "top",
    controlsText: ["prev", "next"],
    controlsContainer: false,
    prevButton: false,
    nextButton: false,
    nav: true,
    navPosition: "top",
    navContainer: false,
    navAsThumbnails: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayPosition: "top",
    autoplayTimeout: 5e3,
    autoplayDirection: "forward",
    autoplayText: ["start", "stop"],
    autoplayHoverPause: false,
    autoplayButton: false,
    autoplayButtonOutput: true,
    autoplayResetOnVisibility: true,
    animateIn: "tns-fadeIn",
    animateOut: "tns-fadeOut",
    animateNormal: "tns-normal",
    animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    lazyloadSelector: ".tns-lazy-img",
    touch: true,
    mouseDrag: false,
    swipeAngle: 15,
    nested: false,
    preventActionWhenRunning: false,
    preventScrollOnTouch: false,
    freezable: true,
    onInit: false,
    useLocalStorage: true,
    nonce: false
  }, options || {});
  var doc = document, win2 = window, KEYS = {
    ENTER: 13,
    SPACE: 32,
    LEFT: 37,
    RIGHT: 39
  }, tnsStorage = {}, localStorageAccess = options.useLocalStorage;
  if (localStorageAccess) {
    var browserInfo = navigator.userAgent;
    var uid = /* @__PURE__ */ new Date();
    try {
      tnsStorage = win2.localStorage;
      if (tnsStorage) {
        tnsStorage.setItem(uid, uid);
        localStorageAccess = tnsStorage.getItem(uid) == uid;
        tnsStorage.removeItem(uid);
      } else {
        localStorageAccess = false;
      }
      if (!localStorageAccess) {
        tnsStorage = {};
      }
    } catch (e) {
      localStorageAccess = false;
    }
    if (localStorageAccess) {
      if (tnsStorage["tnsApp"] && tnsStorage["tnsApp"] !== browserInfo) {
        ["tC", "tPL", "tMQ", "tTf", "t3D", "tTDu", "tTDe", "tADu", "tADe", "tTE", "tAE"].forEach(function(item2) {
          tnsStorage.removeItem(item2);
        });
      }
      localStorage["tnsApp"] = browserInfo;
    }
  }
  var CALC = tnsStorage["tC"] ? checkStorageValue(tnsStorage["tC"]) : setLocalStorage(tnsStorage, "tC", calc(), localStorageAccess), PERCENTAGELAYOUT = tnsStorage["tPL"] ? checkStorageValue(tnsStorage["tPL"]) : setLocalStorage(tnsStorage, "tPL", percentageLayout(), localStorageAccess), CSSMQ = tnsStorage["tMQ"] ? checkStorageValue(tnsStorage["tMQ"]) : setLocalStorage(tnsStorage, "tMQ", mediaquerySupport(), localStorageAccess), TRANSFORM = tnsStorage["tTf"] ? checkStorageValue(tnsStorage["tTf"]) : setLocalStorage(tnsStorage, "tTf", whichProperty("transform"), localStorageAccess), HAS3DTRANSFORMS = tnsStorage["t3D"] ? checkStorageValue(tnsStorage["t3D"]) : setLocalStorage(tnsStorage, "t3D", has3DTransforms(TRANSFORM), localStorageAccess), TRANSITIONDURATION = tnsStorage["tTDu"] ? checkStorageValue(tnsStorage["tTDu"]) : setLocalStorage(tnsStorage, "tTDu", whichProperty("transitionDuration"), localStorageAccess), TRANSITIONDELAY = tnsStorage["tTDe"] ? checkStorageValue(tnsStorage["tTDe"]) : setLocalStorage(tnsStorage, "tTDe", whichProperty("transitionDelay"), localStorageAccess), ANIMATIONDURATION = tnsStorage["tADu"] ? checkStorageValue(tnsStorage["tADu"]) : setLocalStorage(tnsStorage, "tADu", whichProperty("animationDuration"), localStorageAccess), ANIMATIONDELAY = tnsStorage["tADe"] ? checkStorageValue(tnsStorage["tADe"]) : setLocalStorage(tnsStorage, "tADe", whichProperty("animationDelay"), localStorageAccess), TRANSITIONEND = tnsStorage["tTE"] ? checkStorageValue(tnsStorage["tTE"]) : setLocalStorage(tnsStorage, "tTE", getEndProperty(TRANSITIONDURATION, "Transition"), localStorageAccess), ANIMATIONEND = tnsStorage["tAE"] ? checkStorageValue(tnsStorage["tAE"]) : setLocalStorage(tnsStorage, "tAE", getEndProperty(ANIMATIONDURATION, "Animation"), localStorageAccess);
  var supportConsoleWarn = win2.console && typeof win2.console.warn === "function", tnsList = ["container", "controlsContainer", "prevButton", "nextButton", "navContainer", "autoplayButton"], optionsElements = {};
  tnsList.forEach(function(item2) {
    if (typeof options[item2] === "string") {
      var str = options[item2], el = doc.querySelector(str);
      optionsElements[item2] = str;
      if (el && el.nodeName) {
        options[item2] = el;
      } else {
        if (supportConsoleWarn) {
          console.warn("Can't find", options[item2]);
        }
        return;
      }
    }
  });
  if (options.container.children.length < 1) {
    if (supportConsoleWarn) {
      console.warn("No slides found in", options.container);
    }
    return;
  }
  var responsive = options.responsive, nested = options.nested, carousel = options.mode === "carousel" ? true : false;
  if (responsive) {
    if (0 in responsive) {
      options = extend(options, responsive[0]);
      delete responsive[0];
    }
    var responsiveTem = {};
    for (var key in responsive) {
      var val = responsive[key];
      val = typeof val === "number" ? { items: val } : val;
      responsiveTem[key] = val;
    }
    responsive = responsiveTem;
    responsiveTem = null;
  }
  function updateOptions(obj) {
    for (var key2 in obj) {
      if (!carousel) {
        if (key2 === "slideBy") {
          obj[key2] = "page";
        }
        if (key2 === "edgePadding") {
          obj[key2] = false;
        }
        if (key2 === "autoHeight") {
          obj[key2] = false;
        }
      }
      if (key2 === "responsive") {
        updateOptions(obj[key2]);
      }
    }
  }
  if (!carousel) {
    updateOptions(options);
  }
  if (!carousel) {
    options.axis = "horizontal";
    options.slideBy = "page";
    options.edgePadding = false;
    var animateIn = options.animateIn, animateOut = options.animateOut, animateDelay = options.animateDelay, animateNormal = options.animateNormal;
  }
  var horizontal = options.axis === "horizontal" ? true : false, outerWrapper = doc.createElement("div"), innerWrapper = doc.createElement("div"), middleWrapper, container = options.container, containerParent = container.parentNode, containerHTML = container.outerHTML, slideItems = container.children, slideCount = slideItems.length, breakpointZone, windowWidth = getWindowWidth(), isOn = false;
  if (responsive) {
    setBreakpointZone();
  }
  if (carousel) {
    container.className += " tns-vpfix";
  }
  var autoWidth = options.autoWidth, fixedWidth = getOption("fixedWidth"), edgePadding = getOption("edgePadding"), gutter = getOption("gutter"), viewport = getViewportWidth(), center = getOption("center"), items = !autoWidth ? Math.floor(getOption("items")) : 1, slideBy = getOption("slideBy"), viewportMax = options.viewportMax || options.fixedWidthViewportWidth, arrowKeys = getOption("arrowKeys"), speed = getOption("speed"), rewind = options.rewind, loop = rewind ? false : options.loop, autoHeight = getOption("autoHeight"), controls = getOption("controls"), controlsText = getOption("controlsText"), nav = getOption("nav"), touch = getOption("touch"), mouseDrag = getOption("mouseDrag"), autoplay = getOption("autoplay"), autoplayTimeout = getOption("autoplayTimeout"), autoplayText = getOption("autoplayText"), autoplayHoverPause = getOption("autoplayHoverPause"), autoplayResetOnVisibility = getOption("autoplayResetOnVisibility"), sheet = createStyleSheet(null, getOption("nonce")), lazyload = options.lazyload, lazyloadSelector = options.lazyloadSelector, slidePositions, slideItemsOut = [], cloneCount = loop ? getCloneCountForLoop() : 0, slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2, hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false, rightBoundary = fixedWidth ? getRightBoundary() : null, updateIndexBeforeTransform = !carousel || !loop ? true : false, transformAttr = horizontal ? "left" : "top", transformPrefix = "", transformPostfix = "", getIndexMax = function() {
    if (fixedWidth) {
      return function() {
        return center && !loop ? slideCount - 1 : Math.ceil(-rightBoundary / (fixedWidth + gutter));
      };
    } else if (autoWidth) {
      return function() {
        for (var i = 0; i < slideCountNew; i++) {
          if (slidePositions[i] >= -rightBoundary) {
            return i;
          }
        }
      };
    } else {
      return function() {
        if (center && carousel && !loop) {
          return slideCount - 1;
        } else {
          return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
        }
      };
    }
  }(), index = getStartIndex(getOption("startIndex")), indexCached = index;
  getCurrentSlide();
  var indexMin = 0, indexMax = !autoWidth ? getIndexMax() : null, preventActionWhenRunning = options.preventActionWhenRunning, swipeAngle = options.swipeAngle, moveDirectionExpected = swipeAngle ? "?" : true, running = false, onInit = options.onInit, events2 = new Events(), newContainerClasses = " tns-slider tns-" + options.mode, slideId = container.id || getSlideId(), disable = getOption("disable"), disabled = false, freezable = options.freezable, freeze = freezable && !autoWidth ? getFreeze() : false, frozen = false, controlsEvents = {
    "click": onControlsClick,
    "keydown": onControlsKeydown
  }, navEvents = {
    "click": onNavClick,
    "keydown": onNavKeydown
  }, hoverEvents = {
    "mouseover": mouseoverPause,
    "mouseout": mouseoutRestart
  }, visibilityEvent = { "visibilitychange": onVisibilityChange }, docmentKeydownEvent = { "keydown": onDocumentKeydown }, touchEvents = {
    "touchstart": onPanStart,
    "touchmove": onPanMove,
    "touchend": onPanEnd,
    "touchcancel": onPanEnd
  }, dragEvents = {
    "mousedown": onPanStart,
    "mousemove": onPanMove,
    "mouseup": onPanEnd,
    "mouseleave": onPanEnd
  }, hasControls = hasOption("controls"), hasNav = hasOption("nav"), navAsThumbnails = autoWidth ? true : options.navAsThumbnails, hasAutoplay = hasOption("autoplay"), hasTouch = hasOption("touch"), hasMouseDrag = hasOption("mouseDrag"), slideActiveClass = "tns-slide-active", slideClonedClass = "tns-slide-cloned", imgCompleteClass = "tns-complete", imgEvents = {
    "load": onImgLoaded,
    "error": onImgFailed
  }, imgsComplete, liveregionCurrent, preventScroll = options.preventScrollOnTouch === "force" ? true : false;
  if (hasControls) {
    var controlsContainer = options.controlsContainer, controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : "", prevButton = options.prevButton, nextButton = options.nextButton, prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : "", nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : "", prevIsButton, nextIsButton;
  }
  if (hasNav) {
    var navContainer = options.navContainer, navContainerHTML = options.navContainer ? options.navContainer.outerHTML : "", navItems, pages = autoWidth ? slideCount : getPages(), pagesCached = 0, navClicked = -1, navCurrentIndex = getCurrentNavIndex(), navCurrentIndexCached = navCurrentIndex, navActiveClass = "tns-nav-active", navStr = "Carousel Page ", navStrCurrent = " (Current Slide)";
  }
  if (hasAutoplay) {
    var autoplayDirection = options.autoplayDirection === "forward" ? 1 : -1, autoplayButton = options.autoplayButton, autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : "", autoplayHtmlStrings = ["<span class='tns-visually-hidden'>", " animation</span>"], autoplayTimer, animating, autoplayHoverPaused, autoplayUserPaused, autoplayVisibilityPaused;
  }
  if (hasTouch || hasMouseDrag) {
    var initPosition = {}, lastPosition = {}, translateInit, panStart = false, rafIndex, getDist = horizontal ? function(a, b) {
      return a.x - b.x;
    } : function(a, b) {
      return a.y - b.y;
    };
  }
  if (!autoWidth) {
    resetVariblesWhenDisable(disable || freeze);
  }
  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = "translate";
    if (HAS3DTRANSFORMS) {
      transformPrefix += horizontal ? "3d(" : "3d(0px, ";
      transformPostfix = horizontal ? ", 0px, 0px)" : ", 0px)";
    } else {
      transformPrefix += horizontal ? "X(" : "Y(";
      transformPostfix = ")";
    }
  }
  if (carousel) {
    container.className = container.className.replace("tns-vpfix", "");
  }
  initStructure();
  initSheet();
  initSliderTransform();
  function resetVariblesWhenDisable(condition) {
    if (condition) {
      controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
    }
  }
  function getCurrentSlide() {
    var tem = carousel ? index - cloneCount : index;
    while (tem < 0) {
      tem += slideCount;
    }
    return tem % slideCount + 1;
  }
  function getStartIndex(ind) {
    ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
    return carousel ? ind + cloneCount : ind;
  }
  function getAbsIndex(i) {
    if (i == null) {
      i = index;
    }
    if (carousel) {
      i -= cloneCount;
    }
    while (i < 0) {
      i += slideCount;
    }
    return Math.floor(i % slideCount);
  }
  function getCurrentNavIndex() {
    var absIndex = getAbsIndex(), result;
    result = navAsThumbnails ? absIndex : fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) : Math.floor(absIndex / items);
    if (!loop && carousel && index === indexMax) {
      result = pages - 1;
    }
    return result;
  }
  function getItemsMax() {
    if (autoWidth || fixedWidth && !viewportMax) {
      return slideCount - 1;
    } else {
      var str = fixedWidth ? "fixedWidth" : "items", arr = [];
      if (fixedWidth || options[str] < slideCount) {
        arr.push(options[str]);
      }
      if (responsive) {
        for (var bp in responsive) {
          var tem = responsive[bp][str];
          if (tem && (fixedWidth || tem < slideCount)) {
            arr.push(tem);
          }
        }
      }
      if (!arr.length) {
        arr.push(0);
      }
      return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
    }
  }
  function getCloneCountForLoop() {
    var itemsMax = getItemsMax(), result = carousel ? Math.ceil((itemsMax * 5 - slideCount) / 2) : itemsMax * 4 - slideCount;
    result = Math.max(itemsMax, result);
    return hasOption("edgePadding") ? result + 1 : result;
  }
  function getWindowWidth() {
    return win2.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }
  function getInsertPosition(pos) {
    return pos === "top" ? "afterbegin" : "beforeend";
  }
  function getClientWidth(el) {
    if (el == null) {
      return;
    }
    var div = doc.createElement("div"), rect, width;
    el.appendChild(div);
    rect = div.getBoundingClientRect();
    width = rect.right - rect.left;
    div.remove();
    return width || getClientWidth(el.parentNode);
  }
  function getViewportWidth() {
    var gap = edgePadding ? edgePadding * 2 - gutter : 0;
    return getClientWidth(containerParent) - gap;
  }
  function hasOption(item2) {
    if (options[item2]) {
      return true;
    } else {
      if (responsive) {
        for (var bp in responsive) {
          if (responsive[bp][item2]) {
            return true;
          }
        }
      }
      return false;
    }
  }
  function getOption(item2, ww) {
    if (ww == null) {
      ww = windowWidth;
    }
    if (item2 === "items" && fixedWidth) {
      return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;
    } else {
      var result = options[item2];
      if (responsive) {
        for (var bp in responsive) {
          if (ww >= parseInt(bp)) {
            if (item2 in responsive[bp]) {
              result = responsive[bp][item2];
            }
          }
        }
      }
      if (item2 === "slideBy" && result === "page") {
        result = getOption("items");
      }
      if (!carousel && (item2 === "slideBy" || item2 === "items")) {
        result = Math.floor(result);
      }
      return result;
    }
  }
  function getSlideMarginLeft(i) {
    return CALC ? CALC + "(" + i * 100 + "% / " + slideCountNew + ")" : i * 100 / slideCountNew + "%";
  }
  function getInnerWrapperStyles(edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
    var str = "";
    if (edgePaddingTem !== void 0) {
      var gap = edgePaddingTem;
      if (gutterTem) {
        gap -= gutterTem;
      }
      str = horizontal ? "margin: 0 " + gap + "px 0 " + edgePaddingTem + "px;" : "margin: " + edgePaddingTem + "px 0 " + gap + "px 0;";
    } else if (gutterTem && !fixedWidthTem) {
      var gutterTemUnit = "-" + gutterTem + "px", dir = horizontal ? gutterTemUnit + " 0 0" : "0 " + gutterTemUnit + " 0";
      str = "margin: 0 " + dir + ";";
    }
    if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) {
      str += getTransitionDurationStyle(speedTem);
    }
    return str;
  }
  function getContainerWidth(fixedWidthTem, gutterTem, itemsTem) {
    if (fixedWidthTem) {
      return (fixedWidthTem + gutterTem) * slideCountNew + "px";
    } else {
      return CALC ? CALC + "(" + slideCountNew * 100 + "% / " + itemsTem + ")" : slideCountNew * 100 / itemsTem + "%";
    }
  }
  function getSlideWidthStyle(fixedWidthTem, gutterTem, itemsTem) {
    var width;
    if (fixedWidthTem) {
      width = fixedWidthTem + gutterTem + "px";
    } else {
      if (!carousel) {
        itemsTem = Math.floor(itemsTem);
      }
      var dividend = carousel ? slideCountNew : itemsTem;
      width = CALC ? CALC + "(100% / " + dividend + ")" : 100 / dividend + "%";
    }
    width = "width:" + width;
    return nested !== "inner" ? width + ";" : width + " !important;";
  }
  function getSlideGutterStyle(gutterTem) {
    var str = "";
    if (gutterTem !== false) {
      var prop = horizontal ? "padding-" : "margin-", dir = horizontal ? "right" : "bottom";
      str = prop + dir + ": " + gutterTem + "px;";
    }
    return str;
  }
  function getCSSPrefix(name, num) {
    var prefix = name.substring(0, name.length - num).toLowerCase();
    if (prefix) {
      prefix = "-" + prefix + "-";
    }
    return prefix;
  }
  function getTransitionDurationStyle(speed2) {
    return getCSSPrefix(TRANSITIONDURATION, 18) + "transition-duration:" + speed2 / 1e3 + "s;";
  }
  function getAnimationDurationStyle(speed2) {
    return getCSSPrefix(ANIMATIONDURATION, 17) + "animation-duration:" + speed2 / 1e3 + "s;";
  }
  function initStructure() {
    var classOuter = "tns-outer", classInner = "tns-inner";
    hasOption("gutter");
    outerWrapper.className = classOuter;
    innerWrapper.className = classInner;
    outerWrapper.id = slideId + "-ow";
    innerWrapper.id = slideId + "-iw";
    if (container.id === "") {
      container.id = slideId;
    }
    newContainerClasses += PERCENTAGELAYOUT || autoWidth ? " tns-subpixel" : " tns-no-subpixel";
    newContainerClasses += CALC ? " tns-calc" : " tns-no-calc";
    if (autoWidth) {
      newContainerClasses += " tns-autowidth";
    }
    newContainerClasses += " tns-" + options.axis;
    container.className += newContainerClasses;
    if (carousel) {
      middleWrapper = doc.createElement("div");
      middleWrapper.id = slideId + "-mw";
      middleWrapper.className = "tns-ovh";
      outerWrapper.appendChild(middleWrapper);
      middleWrapper.appendChild(innerWrapper);
    } else {
      outerWrapper.appendChild(innerWrapper);
    }
    if (autoHeight) {
      var wp = middleWrapper ? middleWrapper : innerWrapper;
      wp.className += " tns-ah";
    }
    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container);
    forEach(slideItems, function(item2, i) {
      addClass(item2, "tns-item");
      if (!item2.id) {
        item2.id = slideId + "-item" + i;
      }
      if (!carousel && animateNormal) {
        addClass(item2, animateNormal);
      }
      setAttrs(item2, {
        "aria-hidden": "true",
        "tabindex": "-1"
      });
    });
    if (cloneCount) {
      var fragmentBefore = doc.createDocumentFragment(), fragmentAfter = doc.createDocumentFragment();
      for (var j = cloneCount; j--; ) {
        var num = j % slideCount, cloneFirst = slideItems[num].cloneNode(true);
        addClass(cloneFirst, slideClonedClass);
        removeAttrs(cloneFirst, "id");
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);
        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          addClass(cloneLast, slideClonedClass);
          removeAttrs(cloneLast, "id");
          fragmentBefore.appendChild(cloneLast);
        }
      }
      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }
  }
  function initSliderTransform() {
    if (hasOption("autoHeight") || autoWidth || !horizontal) {
      var imgs = container.querySelectorAll("img");
      forEach(imgs, function(img) {
        var src = img.src;
        if (!lazyload) {
          if (src && src.indexOf("data:image") < 0) {
            img.src = "";
            addEvents(img, imgEvents);
            addClass(img, "loading");
            img.src = src;
          } else {
            imgLoaded(img);
          }
        }
      });
      raf(function() {
        imgsLoadedCheck(arrayFromNodeList(imgs), function() {
          imgsComplete = true;
        });
      });
      if (hasOption("autoHeight")) {
        imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1));
      }
      lazyload ? initSliderTransformStyleCheck() : raf(function() {
        imgsLoadedCheck(arrayFromNodeList(imgs), initSliderTransformStyleCheck);
      });
    } else {
      if (carousel) {
        doContainerTransformSilent();
      }
      initTools();
      initEvents();
    }
  }
  function initSliderTransformStyleCheck() {
    if (autoWidth && slideCount > 1) {
      var num = loop ? index : slideCount - 1;
      (function stylesApplicationCheck() {
        var left = slideItems[num].getBoundingClientRect().left;
        var right = slideItems[num - 1].getBoundingClientRect().right;
        Math.abs(left - right) <= 1 ? initSliderTransformCore() : setTimeout(function() {
          stylesApplicationCheck();
        }, 16);
      })();
    } else {
      initSliderTransformCore();
    }
  }
  function initSliderTransformCore() {
    if (!horizontal || autoWidth) {
      setSlidePositions();
      if (autoWidth) {
        rightBoundary = getRightBoundary();
        if (freezable) {
          freeze = getFreeze();
        }
        indexMax = getIndexMax();
        resetVariblesWhenDisable(disable || freeze);
      } else {
        updateContentWrapperHeight();
      }
    }
    if (carousel) {
      doContainerTransformSilent();
    }
    initTools();
    initEvents();
  }
  function initSheet() {
    if (!carousel) {
      for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
        var item2 = slideItems[i];
        item2.style.left = (i - index) * 100 / items + "%";
        addClass(item2, animateIn);
        removeClass(item2, animateNormal);
      }
    }
    if (horizontal) {
      if (PERCENTAGELAYOUT || autoWidth) {
        addCSSRule(sheet, "#" + slideId + " > .tns-item", "font-size:" + win2.getComputedStyle(slideItems[0]).fontSize + ";", getCssRulesLength(sheet));
        addCSSRule(sheet, "#" + slideId, "font-size:0;", getCssRulesLength(sheet));
      } else if (carousel) {
        forEach(slideItems, function(slide, i2) {
          slide.style.marginLeft = getSlideMarginLeft(i2);
        });
      }
    }
    if (CSSMQ) {
      if (TRANSITIONDURATION) {
        var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : "";
        addCSSRule(sheet, "#" + slideId + "-mw", str, getCssRulesLength(sheet));
      }
      str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
      addCSSRule(sheet, "#" + slideId + "-iw", str, getCssRulesLength(sheet));
      if (carousel) {
        str = horizontal && !autoWidth ? "width:" + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ";" : "";
        if (TRANSITIONDURATION) {
          str += getTransitionDurationStyle(speed);
        }
        addCSSRule(sheet, "#" + slideId, str, getCssRulesLength(sheet));
      }
      str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : "";
      if (options.gutter) {
        str += getSlideGutterStyle(options.gutter);
      }
      if (!carousel) {
        if (TRANSITIONDURATION) {
          str += getTransitionDurationStyle(speed);
        }
        if (ANIMATIONDURATION) {
          str += getAnimationDurationStyle(speed);
        }
      }
      if (str) {
        addCSSRule(sheet, "#" + slideId + " > .tns-item", str, getCssRulesLength(sheet));
      }
    } else {
      update_carousel_transition_duration();
      innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight);
      if (carousel && horizontal && !autoWidth) {
        container.style.width = getContainerWidth(fixedWidth, gutter, items);
      }
      var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : "";
      if (gutter) {
        str += getSlideGutterStyle(gutter);
      }
      if (str) {
        addCSSRule(sheet, "#" + slideId + " > .tns-item", str, getCssRulesLength(sheet));
      }
    }
    if (responsive && CSSMQ) {
      for (var bp in responsive) {
        bp = parseInt(bp);
        var opts = responsive[bp], str = "", middleWrapperStr = "", innerWrapperStr = "", containerStr = "", slideStr = "", itemsBP = !autoWidth ? getOption("items", bp) : null, fixedWidthBP = getOption("fixedWidth", bp), speedBP = getOption("speed", bp), edgePaddingBP = getOption("edgePadding", bp), autoHeightBP = getOption("autoHeight", bp), gutterBP = getOption("gutter", bp);
        if (TRANSITIONDURATION && middleWrapper && getOption("autoHeight", bp) && "speed" in opts) {
          middleWrapperStr = "#" + slideId + "-mw{" + getTransitionDurationStyle(speedBP) + "}";
        }
        if ("edgePadding" in opts || "gutter" in opts) {
          innerWrapperStr = "#" + slideId + "-iw{" + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + "}";
        }
        if (carousel && horizontal && !autoWidth && ("fixedWidth" in opts || "items" in opts || fixedWidth && "gutter" in opts)) {
          containerStr = "width:" + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ";";
        }
        if (TRANSITIONDURATION && "speed" in opts) {
          containerStr += getTransitionDurationStyle(speedBP);
        }
        if (containerStr) {
          containerStr = "#" + slideId + "{" + containerStr + "}";
        }
        if ("fixedWidth" in opts || fixedWidth && "gutter" in opts || !carousel && "items" in opts) {
          slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
        }
        if ("gutter" in opts) {
          slideStr += getSlideGutterStyle(gutterBP);
        }
        if (!carousel && "speed" in opts) {
          if (TRANSITIONDURATION) {
            slideStr += getTransitionDurationStyle(speedBP);
          }
          if (ANIMATIONDURATION) {
            slideStr += getAnimationDurationStyle(speedBP);
          }
        }
        if (slideStr) {
          slideStr = "#" + slideId + " > .tns-item{" + slideStr + "}";
        }
        str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;
        if (str) {
          sheet.insertRule("@media (min-width: " + bp / 16 + "em) {" + str + "}", sheet.cssRules.length);
        }
      }
    }
  }
  function initTools() {
    updateSlideStatus();
    outerWrapper.insertAdjacentHTML("afterbegin", '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + "</span>  of " + slideCount + "</div>");
    liveregionCurrent = outerWrapper.querySelector(".tns-liveregion .current");
    if (hasAutoplay) {
      var txt = autoplay ? "stop" : "start";
      if (autoplayButton) {
        setAttrs(autoplayButton, { "data-action": txt });
      } else if (options.autoplayButtonOutput) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button type="button" data-action="' + txt + '">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + "</button>");
        autoplayButton = outerWrapper.querySelector("[data-action]");
      }
      if (autoplayButton) {
        addEvents(autoplayButton, { "click": toggleAutoplay });
      }
      if (autoplay) {
        startAutoplay();
        if (autoplayHoverPause) {
          addEvents(container, hoverEvents);
        }
        if (autoplayResetOnVisibility) {
          addEvents(container, visibilityEvent);
        }
      }
    }
    if (hasNav) {
      if (navContainer) {
        setAttrs(navContainer, { "aria-label": "Carousel Pagination" });
        navItems = navContainer.children;
        forEach(navItems, function(item2, i2) {
          setAttrs(item2, {
            "data-nav": i2,
            "tabindex": "-1",
            "aria-label": navStr + (i2 + 1),
            "aria-controls": slideId
          });
        });
      } else {
        var navHtml = "", hiddenStr = navAsThumbnails ? "" : 'style="display:none"';
        for (var i = 0; i < slideCount; i++) {
          navHtml += '<button type="button" data-nav="' + i + '" tabindex="-1" aria-controls="' + slideId + '" ' + hiddenStr + ' aria-label="' + navStr + (i + 1) + '"></button>';
        }
        navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + "</div>";
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);
        navContainer = outerWrapper.querySelector(".tns-nav");
        navItems = navContainer.children;
      }
      updateNavVisibility();
      if (TRANSITIONDURATION) {
        var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(), str = "transition: all " + speed / 1e3 + "s";
        if (prefix) {
          str = "-" + prefix + "-" + str;
        }
        addCSSRule(sheet, "[aria-controls^=" + slideId + "-item]", str, getCssRulesLength(sheet));
      }
      setAttrs(navItems[navCurrentIndex], { "aria-label": navStr + (navCurrentIndex + 1) + navStrCurrent });
      removeAttrs(navItems[navCurrentIndex], "tabindex");
      addClass(navItems[navCurrentIndex], navActiveClass);
      addEvents(navContainer, navEvents);
    }
    if (hasControls) {
      if (!controlsContainer && (!prevButton || !nextButton)) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[0] + '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[1] + "</button></div>");
        controlsContainer = outerWrapper.querySelector(".tns-controls");
      }
      if (!prevButton || !nextButton) {
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }
      if (options.controlsContainer) {
        setAttrs(controlsContainer, {
          "aria-label": "Carousel Navigation",
          "tabindex": "0"
        });
      }
      if (options.controlsContainer || options.prevButton && options.nextButton) {
        setAttrs([prevButton, nextButton], {
          "aria-controls": slideId,
          "tabindex": "-1"
        });
      }
      if (options.controlsContainer || options.prevButton && options.nextButton) {
        setAttrs(prevButton, { "data-controls": "prev" });
        setAttrs(nextButton, { "data-controls": "next" });
      }
      prevIsButton = isButton(prevButton);
      nextIsButton = isButton(nextButton);
      updateControlsStatus();
      if (controlsContainer) {
        addEvents(controlsContainer, controlsEvents);
      } else {
        addEvents(prevButton, controlsEvents);
        addEvents(nextButton, controlsEvents);
      }
    }
    disableUI();
  }
  function initEvents() {
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      addEvents(container, eve);
    }
    if (touch) {
      addEvents(container, touchEvents, options.preventScrollOnTouch);
    }
    if (mouseDrag) {
      addEvents(container, dragEvents);
    }
    if (arrowKeys) {
      addEvents(doc, docmentKeydownEvent);
    }
    if (nested === "inner") {
      events2.on("outerResized", function() {
        resizeTasks();
        events2.emit("innerLoaded", info());
      });
    } else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
      addEvents(win2, { "resize": onResize });
    }
    if (autoHeight) {
      if (nested === "outer") {
        events2.on("innerLoaded", doAutoHeight);
      } else if (!disable) {
        doAutoHeight();
      }
    }
    doLazyLoad();
    if (disable) {
      disableSlider();
    } else if (freeze) {
      freezeSlider();
    }
    events2.on("indexChanged", additionalUpdates);
    if (nested === "inner") {
      events2.emit("innerLoaded", info());
    }
    if (typeof onInit === "function") {
      onInit(info());
    }
    isOn = true;
  }
  function destroy() {
    sheet.disabled = true;
    if (sheet.ownerNode) {
      sheet.ownerNode.remove();
    }
    removeEvents(win2, { "resize": onResize });
    if (arrowKeys) {
      removeEvents(doc, docmentKeydownEvent);
    }
    if (controlsContainer) {
      removeEvents(controlsContainer, controlsEvents);
    }
    if (navContainer) {
      removeEvents(navContainer, navEvents);
    }
    removeEvents(container, hoverEvents);
    removeEvents(container, visibilityEvent);
    if (autoplayButton) {
      removeEvents(autoplayButton, { "click": toggleAutoplay });
    }
    if (autoplay) {
      clearInterval(autoplayTimer);
    }
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      removeEvents(container, eve);
    }
    if (touch) {
      removeEvents(container, touchEvents);
    }
    if (mouseDrag) {
      removeEvents(container, dragEvents);
    }
    var htmlList = [containerHTML, controlsContainerHTML, prevButtonHTML, nextButtonHTML, navContainerHTML, autoplayButtonHTML];
    tnsList.forEach(function(item2, i) {
      var el = item2 === "container" ? outerWrapper : options[item2];
      if (typeof el === "object" && el) {
        var prevEl = el.previousElementSibling ? el.previousElementSibling : false, parentEl = el.parentNode;
        el.outerHTML = htmlList[i];
        options[item2] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
      }
    });
    tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = swipeAngle = moveDirectionExpected = running = onInit = events2 = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navActiveClass = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayHtmlStrings = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = panStart = rafIndex = getDist = touch = mouseDrag = null;
    for (var a in this) {
      if (a !== "rebuild") {
        this[a] = null;
      }
    }
    isOn = false;
  }
  function onResize(e) {
    raf(function() {
      resizeTasks(getEvent(e));
    });
  }
  function resizeTasks(e) {
    if (!isOn) {
      return;
    }
    if (nested === "outer") {
      events2.emit("outerResized", info(e));
    }
    windowWidth = getWindowWidth();
    var bpChanged, breakpointZoneTem = breakpointZone, needContainerTransform = false;
    if (responsive) {
      setBreakpointZone();
      bpChanged = breakpointZoneTem !== breakpointZone;
      if (bpChanged) {
        events2.emit("newBreakpointStart", info(e));
      }
    }
    var indChanged, itemsChanged, itemsTem = items, disableTem = disable, freezeTem = freeze, arrowKeysTem = arrowKeys, controlsTem = controls, navTem = nav, touchTem = touch, mouseDragTem = mouseDrag, autoplayTem = autoplay, autoplayHoverPauseTem = autoplayHoverPause, autoplayResetOnVisibilityTem = autoplayResetOnVisibility, indexTem = index;
    if (bpChanged) {
      var fixedWidthTem = fixedWidth, autoHeightTem = autoHeight, controlsTextTem = controlsText, centerTem = center, autoplayTextTem = autoplayText;
      if (!CSSMQ) {
        var gutterTem = gutter, edgePaddingTem = edgePadding;
      }
    }
    arrowKeys = getOption("arrowKeys");
    controls = getOption("controls");
    nav = getOption("nav");
    touch = getOption("touch");
    center = getOption("center");
    mouseDrag = getOption("mouseDrag");
    autoplay = getOption("autoplay");
    autoplayHoverPause = getOption("autoplayHoverPause");
    autoplayResetOnVisibility = getOption("autoplayResetOnVisibility");
    if (bpChanged) {
      disable = getOption("disable");
      fixedWidth = getOption("fixedWidth");
      speed = getOption("speed");
      autoHeight = getOption("autoHeight");
      controlsText = getOption("controlsText");
      autoplayText = getOption("autoplayText");
      autoplayTimeout = getOption("autoplayTimeout");
      if (!CSSMQ) {
        edgePadding = getOption("edgePadding");
        gutter = getOption("gutter");
      }
    }
    resetVariblesWhenDisable(disable);
    viewport = getViewportWidth();
    if ((!horizontal || autoWidth) && !disable) {
      setSlidePositions();
      if (!horizontal) {
        updateContentWrapperHeight();
        needContainerTransform = true;
      }
    }
    if (fixedWidth || autoWidth) {
      rightBoundary = getRightBoundary();
      indexMax = getIndexMax();
    }
    if (bpChanged || fixedWidth) {
      items = getOption("items");
      slideBy = getOption("slideBy");
      itemsChanged = items !== itemsTem;
      if (itemsChanged) {
        if (!fixedWidth && !autoWidth) {
          indexMax = getIndexMax();
        }
        updateIndex();
      }
    }
    if (bpChanged) {
      if (disable !== disableTem) {
        if (disable) {
          disableSlider();
        } else {
          enableSlider();
        }
      }
    }
    if (freezable && (bpChanged || fixedWidth || autoWidth)) {
      freeze = getFreeze();
      if (freeze !== freezeTem) {
        if (freeze) {
          doContainerTransform(getContainerTransformValue(getStartIndex(0)));
          freezeSlider();
        } else {
          unfreezeSlider();
          needContainerTransform = true;
        }
      }
    }
    resetVariblesWhenDisable(disable || freeze);
    if (!autoplay) {
      autoplayHoverPause = autoplayResetOnVisibility = false;
    }
    if (arrowKeys !== arrowKeysTem) {
      arrowKeys ? addEvents(doc, docmentKeydownEvent) : removeEvents(doc, docmentKeydownEvent);
    }
    if (controls !== controlsTem) {
      if (controls) {
        if (controlsContainer) {
          showElement(controlsContainer);
        } else {
          if (prevButton) {
            showElement(prevButton);
          }
          if (nextButton) {
            showElement(nextButton);
          }
        }
      } else {
        if (controlsContainer) {
          hideElement(controlsContainer);
        } else {
          if (prevButton) {
            hideElement(prevButton);
          }
          if (nextButton) {
            hideElement(nextButton);
          }
        }
      }
    }
    if (nav !== navTem) {
      if (nav) {
        showElement(navContainer);
        updateNavVisibility();
      } else {
        hideElement(navContainer);
      }
    }
    if (touch !== touchTem) {
      touch ? addEvents(container, touchEvents, options.preventScrollOnTouch) : removeEvents(container, touchEvents);
    }
    if (mouseDrag !== mouseDragTem) {
      mouseDrag ? addEvents(container, dragEvents) : removeEvents(container, dragEvents);
    }
    if (autoplay !== autoplayTem) {
      if (autoplay) {
        if (autoplayButton) {
          showElement(autoplayButton);
        }
        if (!animating && !autoplayUserPaused) {
          startAutoplay();
        }
      } else {
        if (autoplayButton) {
          hideElement(autoplayButton);
        }
        if (animating) {
          stopAutoplay();
        }
      }
    }
    if (autoplayHoverPause !== autoplayHoverPauseTem) {
      autoplayHoverPause ? addEvents(container, hoverEvents) : removeEvents(container, hoverEvents);
    }
    if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
      autoplayResetOnVisibility ? addEvents(doc, visibilityEvent) : removeEvents(doc, visibilityEvent);
    }
    if (bpChanged) {
      if (fixedWidth !== fixedWidthTem || center !== centerTem) {
        needContainerTransform = true;
      }
      if (autoHeight !== autoHeightTem) {
        if (!autoHeight) {
          innerWrapper.style.height = "";
        }
      }
      if (controls && controlsText !== controlsTextTem) {
        prevButton.innerHTML = controlsText[0];
        nextButton.innerHTML = controlsText[1];
      }
      if (autoplayButton && autoplayText !== autoplayTextTem) {
        var i = autoplay ? 1 : 0, html = autoplayButton.innerHTML, len = html.length - autoplayTextTem[i].length;
        if (html.substring(len) === autoplayTextTem[i]) {
          autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
        }
      }
    } else {
      if (center && (fixedWidth || autoWidth)) {
        needContainerTransform = true;
      }
    }
    if (itemsChanged || fixedWidth && !autoWidth) {
      pages = getPages();
      updateNavVisibility();
    }
    indChanged = index !== indexTem;
    if (indChanged) {
      events2.emit("indexChanged", info());
      needContainerTransform = true;
    } else if (itemsChanged) {
      if (!indChanged) {
        additionalUpdates();
      }
    } else if (fixedWidth || autoWidth) {
      doLazyLoad();
      updateSlideStatus();
      updateLiveRegion();
    }
    if (itemsChanged && !carousel) {
      updateGallerySlidePositions();
    }
    if (!disable && !freeze) {
      if (bpChanged && !CSSMQ) {
        if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
        }
        if (horizontal) {
          if (carousel) {
            container.style.width = getContainerWidth(fixedWidth, gutter, items);
          }
          var str = getSlideWidthStyle(fixedWidth, gutter, items) + getSlideGutterStyle(gutter);
          removeCSSRule(sheet, getCssRulesLength(sheet) - 1);
          addCSSRule(sheet, "#" + slideId + " > .tns-item", str, getCssRulesLength(sheet));
        }
      }
      if (autoHeight) {
        doAutoHeight();
      }
      if (needContainerTransform) {
        doContainerTransformSilent();
        indexCached = index;
      }
    }
    if (bpChanged) {
      events2.emit("newBreakpointEnd", info(e));
    }
  }
  function getFreeze() {
    if (!fixedWidth && !autoWidth) {
      var a = center ? items - (items - 1) / 2 : items;
      return slideCount <= a;
    }
    var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount], vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;
    if (center) {
      vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
    }
    return width <= vp;
  }
  function setBreakpointZone() {
    breakpointZone = 0;
    for (var bp in responsive) {
      bp = parseInt(bp);
      if (windowWidth >= bp) {
        breakpointZone = bp;
      }
    }
  }
  var updateIndex = function() {
    return loop ? carousel ? (
      // loop + carousel
      function() {
        var leftEdge = indexMin, rightEdge = indexMax;
        leftEdge += slideBy;
        rightEdge -= slideBy;
        if (edgePadding) {
          leftEdge += 1;
          rightEdge -= 1;
        } else if (fixedWidth) {
          if ((viewport + gutter) % (fixedWidth + gutter)) {
            rightEdge -= 1;
          }
        }
        if (cloneCount) {
          if (index > rightEdge) {
            index -= slideCount;
          } else if (index < leftEdge) {
            index += slideCount;
          }
        }
      }
    ) : (
      // loop + gallery
      function() {
        if (index > indexMax) {
          while (index >= indexMin + slideCount) {
            index -= slideCount;
          }
        } else if (index < indexMin) {
          while (index <= indexMax - slideCount) {
            index += slideCount;
          }
        }
      }
    ) : (
      // non-loop
      function() {
        index = Math.max(indexMin, Math.min(indexMax, index));
      }
    );
  }();
  function disableUI() {
    if (!autoplay && autoplayButton) {
      hideElement(autoplayButton);
    }
    if (!nav && navContainer) {
      hideElement(navContainer);
    }
    if (!controls) {
      if (controlsContainer) {
        hideElement(controlsContainer);
      } else {
        if (prevButton) {
          hideElement(prevButton);
        }
        if (nextButton) {
          hideElement(nextButton);
        }
      }
    }
  }
  function enableUI() {
    if (autoplay && autoplayButton) {
      showElement(autoplayButton);
    }
    if (nav && navContainer) {
      showElement(navContainer);
    }
    if (controls) {
      if (controlsContainer) {
        showElement(controlsContainer);
      } else {
        if (prevButton) {
          showElement(prevButton);
        }
        if (nextButton) {
          showElement(nextButton);
        }
      }
    }
  }
  function freezeSlider() {
    if (frozen) {
      return;
    }
    if (edgePadding) {
      innerWrapper.style.margin = "0px";
    }
    if (cloneCount) {
      var str = "tns-transparent";
      for (var i = cloneCount; i--; ) {
        if (carousel) {
          addClass(slideItems[i], str);
        }
        addClass(slideItems[slideCountNew - i - 1], str);
      }
    }
    disableUI();
    frozen = true;
  }
  function unfreezeSlider() {
    if (!frozen) {
      return;
    }
    if (edgePadding && CSSMQ) {
      innerWrapper.style.margin = "";
    }
    if (cloneCount) {
      var str = "tns-transparent";
      for (var i = cloneCount; i--; ) {
        if (carousel) {
          removeClass(slideItems[i], str);
        }
        removeClass(slideItems[slideCountNew - i - 1], str);
      }
    }
    enableUI();
    frozen = false;
  }
  function disableSlider() {
    if (disabled) {
      return;
    }
    sheet.disabled = true;
    container.className = container.className.replace(newContainerClasses.substring(1), "");
    removeAttrs(container, ["style"]);
    if (loop) {
      for (var j = cloneCount; j--; ) {
        if (carousel) {
          hideElement(slideItems[j]);
        }
        hideElement(slideItems[slideCountNew - j - 1]);
      }
    }
    if (!horizontal || !carousel) {
      removeAttrs(innerWrapper, ["style"]);
    }
    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item2 = slideItems[i];
        removeAttrs(item2, ["style"]);
        removeClass(item2, animateIn);
        removeClass(item2, animateNormal);
      }
    }
    disableUI();
    disabled = true;
  }
  function enableSlider() {
    if (!disabled) {
      return;
    }
    sheet.disabled = false;
    container.className += newContainerClasses;
    doContainerTransformSilent();
    if (loop) {
      for (var j = cloneCount; j--; ) {
        if (carousel) {
          showElement(slideItems[j]);
        }
        showElement(slideItems[slideCountNew - j - 1]);
      }
    }
    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item2 = slideItems[i], classN = i < index + items ? animateIn : animateNormal;
        item2.style.left = (i - index) * 100 / items + "%";
        addClass(item2, classN);
      }
    }
    enableUI();
    disabled = false;
  }
  function updateLiveRegion() {
    var str = getLiveRegionStr();
    if (liveregionCurrent.innerHTML !== str) {
      liveregionCurrent.innerHTML = str;
    }
  }
  function getLiveRegionStr() {
    var arr = getVisibleSlideRange(), start = arr[0] + 1, end = arr[1] + 1;
    return start === end ? start + "" : start + " to " + end;
  }
  function getVisibleSlideRange(val2) {
    if (val2 == null) {
      val2 = getContainerTransformValue();
    }
    var start = index, end, rangestart, rangeend;
    if (center || edgePadding) {
      if (autoWidth || fixedWidth) {
        rangestart = -(parseFloat(val2) + edgePadding);
        rangeend = rangestart + viewport + edgePadding * 2;
      }
    } else {
      if (autoWidth) {
        rangestart = slidePositions[index];
        rangeend = rangestart + viewport;
      }
    }
    if (autoWidth) {
      slidePositions.forEach(function(point, i) {
        if (i < slideCountNew) {
          if ((center || edgePadding) && point <= rangestart + 0.5) {
            start = i;
          }
          if (rangeend - point >= 0.5) {
            end = i;
          }
        }
      });
    } else {
      if (fixedWidth) {
        var cell = fixedWidth + gutter;
        if (center || edgePadding) {
          start = Math.floor(rangestart / cell);
          end = Math.ceil(rangeend / cell - 1);
        } else {
          end = start + Math.ceil(viewport / cell) - 1;
        }
      } else {
        if (center || edgePadding) {
          var a = items - 1;
          if (center) {
            start -= a / 2;
            end = index + a / 2;
          } else {
            end = index + a;
          }
          if (edgePadding) {
            var b = edgePadding * items / viewport;
            start -= b;
            end += b;
          }
          start = Math.floor(start);
          end = Math.ceil(end);
        } else {
          end = start + items - 1;
        }
      }
      start = Math.max(start, 0);
      end = Math.min(end, slideCountNew - 1);
    }
    return [start, end];
  }
  function doLazyLoad() {
    if (lazyload && !disable) {
      var arg = getVisibleSlideRange();
      arg.push(lazyloadSelector);
      getImageArray.apply(null, arg).forEach(function(img) {
        if (!hasClass(img, imgCompleteClass)) {
          var eve = {};
          eve[TRANSITIONEND] = function(e) {
            e.stopPropagation();
          };
          addEvents(img, eve);
          addEvents(img, imgEvents);
          img.src = getAttr(img, "data-src");
          var srcset = getAttr(img, "data-srcset");
          if (srcset) {
            img.srcset = srcset;
          }
          addClass(img, "loading");
        }
      });
    }
  }
  function onImgLoaded(e) {
    imgLoaded(getTarget(e));
  }
  function onImgFailed(e) {
    imgFailed(getTarget(e));
  }
  function imgLoaded(img) {
    addClass(img, "loaded");
    imgCompleted(img);
  }
  function imgFailed(img) {
    addClass(img, "failed");
    imgCompleted(img);
  }
  function imgCompleted(img) {
    addClass(img, imgCompleteClass);
    removeClass(img, "loading");
    removeEvents(img, imgEvents);
  }
  function getImageArray(start, end, imgSelector) {
    var imgs = [];
    if (!imgSelector) {
      imgSelector = "img";
    }
    while (start <= end) {
      forEach(slideItems[start].querySelectorAll(imgSelector), function(img) {
        imgs.push(img);
      });
      start++;
    }
    return imgs;
  }
  function doAutoHeight() {
    var imgs = getImageArray.apply(null, getVisibleSlideRange());
    raf(function() {
      imgsLoadedCheck(imgs, updateInnerWrapperHeight);
    });
  }
  function imgsLoadedCheck(imgs, cb) {
    if (imgsComplete) {
      return cb();
    }
    imgs.forEach(function(img, index2) {
      if (!lazyload && img.complete) {
        imgCompleted(img);
      }
      if (hasClass(img, imgCompleteClass)) {
        imgs.splice(index2, 1);
      }
    });
    if (!imgs.length) {
      return cb();
    }
    raf(function() {
      imgsLoadedCheck(imgs, cb);
    });
  }
  function additionalUpdates() {
    doLazyLoad();
    updateSlideStatus();
    updateLiveRegion();
    updateControlsStatus();
    updateNavStatus();
  }
  function update_carousel_transition_duration() {
    if (carousel && autoHeight) {
      middleWrapper.style[TRANSITIONDURATION] = speed / 1e3 + "s";
    }
  }
  function getMaxSlideHeight(slideStart, slideRange) {
    var heights = [];
    for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
      heights.push(slideItems[i].offsetHeight);
    }
    return Math.max.apply(null, heights);
  }
  function updateInnerWrapperHeight() {
    var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount), wp = middleWrapper ? middleWrapper : innerWrapper;
    if (wp.style.height !== maxHeight) {
      wp.style.height = maxHeight + "px";
    }
  }
  function setSlidePositions() {
    slidePositions = [0];
    var attr = horizontal ? "left" : "top", attr2 = horizontal ? "right" : "bottom", base = slideItems[0].getBoundingClientRect()[attr];
    forEach(slideItems, function(item2, i) {
      if (i) {
        slidePositions.push(item2.getBoundingClientRect()[attr] - base);
      }
      if (i === slideCountNew - 1) {
        slidePositions.push(item2.getBoundingClientRect()[attr2] - base);
      }
    });
  }
  function updateSlideStatus() {
    var range = getVisibleSlideRange(), start = range[0], end = range[1];
    forEach(slideItems, function(item2, i) {
      if (i >= start && i <= end) {
        if (hasAttr(item2, "aria-hidden")) {
          removeAttrs(item2, ["aria-hidden", "tabindex"]);
          addClass(item2, slideActiveClass);
        }
      } else {
        if (!hasAttr(item2, "aria-hidden")) {
          setAttrs(item2, {
            "aria-hidden": "true",
            "tabindex": "-1"
          });
          removeClass(item2, slideActiveClass);
        }
      }
    });
  }
  function updateGallerySlidePositions() {
    var l = index + Math.min(slideCount, items);
    for (var i = slideCountNew; i--; ) {
      var item2 = slideItems[i];
      if (i >= index && i < l) {
        addClass(item2, "tns-moving");
        item2.style.left = (i - index) * 100 / items + "%";
        addClass(item2, animateIn);
        removeClass(item2, animateNormal);
      } else if (item2.style.left) {
        item2.style.left = "";
        addClass(item2, animateNormal);
        removeClass(item2, animateIn);
      }
      removeClass(item2, animateOut);
    }
    setTimeout(function() {
      forEach(slideItems, function(el) {
        removeClass(el, "tns-moving");
      });
    }, 300);
  }
  function updateNavStatus() {
    if (nav) {
      navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
      navClicked = -1;
      if (navCurrentIndex !== navCurrentIndexCached) {
        var navPrev = navItems[navCurrentIndexCached], navCurrent = navItems[navCurrentIndex];
        setAttrs(navPrev, {
          "tabindex": "-1",
          "aria-label": navStr + (navCurrentIndexCached + 1)
        });
        removeClass(navPrev, navActiveClass);
        setAttrs(navCurrent, { "aria-label": navStr + (navCurrentIndex + 1) + navStrCurrent });
        removeAttrs(navCurrent, "tabindex");
        addClass(navCurrent, navActiveClass);
        navCurrentIndexCached = navCurrentIndex;
      }
    }
  }
  function getLowerCaseNodeName(el) {
    return el.nodeName.toLowerCase();
  }
  function isButton(el) {
    return getLowerCaseNodeName(el) === "button";
  }
  function isAriaDisabled(el) {
    return el.getAttribute("aria-disabled") === "true";
  }
  function disEnableElement(isButton2, el, val2) {
    if (isButton2) {
      el.disabled = val2;
    } else {
      el.setAttribute("aria-disabled", val2.toString());
    }
  }
  function updateControlsStatus() {
    if (!controls || rewind || loop) {
      return;
    }
    var prevDisabled = prevIsButton ? prevButton.disabled : isAriaDisabled(prevButton), nextDisabled = nextIsButton ? nextButton.disabled : isAriaDisabled(nextButton), disablePrev = index <= indexMin ? true : false, disableNext = !rewind && index >= indexMax ? true : false;
    if (disablePrev && !prevDisabled) {
      disEnableElement(prevIsButton, prevButton, true);
    }
    if (!disablePrev && prevDisabled) {
      disEnableElement(prevIsButton, prevButton, false);
    }
    if (disableNext && !nextDisabled) {
      disEnableElement(nextIsButton, nextButton, true);
    }
    if (!disableNext && nextDisabled) {
      disEnableElement(nextIsButton, nextButton, false);
    }
  }
  function resetDuration(el, str) {
    if (TRANSITIONDURATION) {
      el.style[TRANSITIONDURATION] = str;
    }
  }
  function getSliderWidth() {
    return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
  }
  function getCenterGap(num) {
    if (num == null) {
      num = index;
    }
    var gap = edgePadding ? gutter : 0;
    return autoWidth ? (viewport - gap - (slidePositions[num + 1] - slidePositions[num] - gutter)) / 2 : fixedWidth ? (viewport - fixedWidth) / 2 : (items - 1) / 2;
  }
  function getRightBoundary() {
    var gap = edgePadding ? gutter : 0, result = viewport + gap - getSliderWidth();
    if (center && !loop) {
      result = fixedWidth ? -(fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() : getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
    }
    if (result > 0) {
      result = 0;
    }
    return result;
  }
  function getContainerTransformValue(num) {
    if (num == null) {
      num = index;
    }
    var val2;
    if (horizontal && !autoWidth) {
      if (fixedWidth) {
        val2 = -(fixedWidth + gutter) * num;
        if (center) {
          val2 += getCenterGap();
        }
      } else {
        var denominator = TRANSFORM ? slideCountNew : items;
        if (center) {
          num -= getCenterGap();
        }
        val2 = -num * 100 / denominator;
      }
    } else {
      val2 = -slidePositions[num];
      if (center && autoWidth) {
        val2 += getCenterGap();
      }
    }
    if (hasRightDeadZone) {
      val2 = Math.max(val2, rightBoundary);
    }
    val2 += horizontal && !autoWidth && !fixedWidth ? "%" : "px";
    return val2;
  }
  function doContainerTransformSilent(val2) {
    resetDuration(container, "0s");
    doContainerTransform(val2);
  }
  function doContainerTransform(val2) {
    if (val2 == null) {
      val2 = getContainerTransformValue();
    }
    container.style[transformAttr] = transformPrefix + val2 + transformPostfix;
  }
  function animateSlide(number, classOut, classIn, isOut) {
    var l = number + items;
    if (!loop) {
      l = Math.min(l, slideCountNew);
    }
    for (var i = number; i < l; i++) {
      var item2 = slideItems[i];
      if (!isOut) {
        item2.style.left = (i - index) * 100 / items + "%";
      }
      if (animateDelay && TRANSITIONDELAY) {
        item2.style[TRANSITIONDELAY] = item2.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1e3 + "s";
      }
      removeClass(item2, classOut);
      addClass(item2, classIn);
      if (isOut) {
        slideItemsOut.push(item2);
      }
    }
  }
  var transformCore = function() {
    return carousel ? function() {
      resetDuration(container, "");
      if (TRANSITIONDURATION || !speed) {
        doContainerTransform();
        if (!speed || !isVisible(container)) {
          onTransitionEnd();
        }
      } else {
        jsTransform(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
      }
      if (!horizontal) {
        updateContentWrapperHeight();
      }
    } : function() {
      slideItemsOut = [];
      var eve = {};
      eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
      removeEvents(slideItems[indexCached], eve);
      addEvents(slideItems[index], eve);
      animateSlide(indexCached, animateIn, animateOut, true);
      animateSlide(index, animateNormal, animateIn);
      if (!TRANSITIONEND || !ANIMATIONEND || !speed || !isVisible(container)) {
        onTransitionEnd();
      }
    };
  }();
  function render(e, sliderMoved) {
    if (updateIndexBeforeTransform) {
      updateIndex();
    }
    if (index !== indexCached || sliderMoved) {
      events2.emit("indexChanged", info());
      events2.emit("transitionStart", info());
      if (autoHeight) {
        doAutoHeight();
      }
      if (animating && e && ["click", "keydown"].indexOf(e.type) >= 0) {
        stopAutoplay();
      }
      running = true;
      transformCore();
    }
  }
  function strTrans(str) {
    return str.toLowerCase().replace(/-/g, "");
  }
  function onTransitionEnd(event) {
    if (carousel || running) {
      events2.emit("transitionEnd", info(event));
      if (!carousel && slideItemsOut.length > 0) {
        for (var i = 0; i < slideItemsOut.length; i++) {
          var item2 = slideItemsOut[i];
          item2.style.left = "";
          if (ANIMATIONDELAY && TRANSITIONDELAY) {
            item2.style[ANIMATIONDELAY] = "";
            item2.style[TRANSITIONDELAY] = "";
          }
          removeClass(item2, animateOut);
          addClass(item2, animateNormal);
        }
      }
      if (!event || !carousel && event.target.parentNode === container || event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {
        if (!updateIndexBeforeTransform) {
          var indexTem = index;
          updateIndex();
          if (index !== indexTem) {
            events2.emit("indexChanged", info());
            doContainerTransformSilent();
          }
        }
        if (nested === "inner") {
          events2.emit("innerLoaded", info());
        }
        running = false;
        indexCached = index;
      }
    }
  }
  function goTo(targetIndex, e) {
    if (freeze) {
      return;
    }
    if (targetIndex === "prev") {
      onControlsClick(e, -1);
    } else if (targetIndex === "next") {
      onControlsClick(e, 1);
    } else {
      if (running) {
        if (preventActionWhenRunning) {
          return;
        } else {
          onTransitionEnd();
        }
      }
      var absIndex = getAbsIndex(), indexGap = 0;
      if (targetIndex === "first") {
        indexGap = -absIndex;
      } else if (targetIndex === "last") {
        indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
      } else {
        if (typeof targetIndex !== "number") {
          targetIndex = parseInt(targetIndex);
        }
        if (!isNaN(targetIndex)) {
          if (!e) {
            targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex));
          }
          indexGap = targetIndex - absIndex;
        }
      }
      if (!carousel && indexGap && Math.abs(indexGap) < items) {
        var factor = indexGap > 0 ? 1 : -1;
        indexGap += index + indexGap - slideCount >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
      }
      index += indexGap;
      if (carousel && loop) {
        if (index < indexMin) {
          index += slideCount;
        }
        if (index > indexMax) {
          index -= slideCount;
        }
      }
      if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
        render(e);
      }
    }
  }
  function onControlsClick(e, dir) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }
    var passEventObject;
    if (!dir) {
      e = getEvent(e);
      var target = getTarget(e);
      while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) {
        target = target.parentNode;
      }
      var targetIn = [prevButton, nextButton].indexOf(target);
      if (targetIn >= 0) {
        passEventObject = true;
        dir = targetIn === 0 ? -1 : 1;
      }
    }
    if (rewind) {
      if (index === indexMin && dir === -1) {
        goTo("last", e);
        return;
      } else if (index === indexMax && dir === 1) {
        goTo("first", e);
        return;
      }
    }
    if (dir) {
      index += slideBy * dir;
      if (autoWidth) {
        index = Math.floor(index);
      }
      render(passEventObject || e && e.type === "keydown" ? e : null);
    }
  }
  function onNavClick(e) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }
    e = getEvent(e);
    var target = getTarget(e), navIndex;
    while (target !== navContainer && !hasAttr(target, "data-nav")) {
      target = target.parentNode;
    }
    if (hasAttr(target, "data-nav")) {
      var navIndex = navClicked = Number(getAttr(target, "data-nav")), targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items, targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
      goTo(targetIndex, e);
      if (navCurrentIndex === navIndex) {
        if (animating) {
          stopAutoplay();
        }
        navClicked = -1;
      }
    }
  }
  function setAutoplayTimer() {
    autoplayTimer = setInterval(function() {
      onControlsClick(null, autoplayDirection);
    }, autoplayTimeout);
    animating = true;
  }
  function stopAutoplayTimer() {
    clearInterval(autoplayTimer);
    animating = false;
  }
  function updateAutoplayButton(action, txt) {
    setAttrs(autoplayButton, { "data-action": action });
    autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
  }
  function startAutoplay() {
    setAutoplayTimer();
    if (autoplayButton) {
      updateAutoplayButton("stop", autoplayText[1]);
    }
  }
  function stopAutoplay() {
    stopAutoplayTimer();
    if (autoplayButton) {
      updateAutoplayButton("start", autoplayText[0]);
    }
  }
  function play() {
    if (autoplay && !animating) {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }
  function pause() {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    }
  }
  function toggleAutoplay() {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    } else {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }
  function onVisibilityChange() {
    if (doc.hidden) {
      if (animating) {
        stopAutoplayTimer();
        autoplayVisibilityPaused = true;
      }
    } else if (autoplayVisibilityPaused) {
      setAutoplayTimer();
      autoplayVisibilityPaused = false;
    }
  }
  function mouseoverPause() {
    if (animating) {
      stopAutoplayTimer();
      autoplayHoverPaused = true;
    }
  }
  function mouseoutRestart() {
    if (autoplayHoverPaused) {
      setAutoplayTimer();
      autoplayHoverPaused = false;
    }
  }
  function onDocumentKeydown(e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);
    if (keyIndex >= 0) {
      onControlsClick(e, keyIndex === 0 ? -1 : 1);
    }
  }
  function onControlsKeydown(e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);
    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (!prevButton.disabled) {
          onControlsClick(e, -1);
        }
      } else if (!nextButton.disabled) {
        onControlsClick(e, 1);
      }
    }
  }
  function setFocus(el) {
    el.focus();
  }
  function onNavKeydown(e) {
    e = getEvent(e);
    var curElement = doc.activeElement;
    if (!hasAttr(curElement, "data-nav")) {
      return;
    }
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode), navIndex = Number(getAttr(curElement, "data-nav"));
    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (navIndex > 0) {
          setFocus(navItems[navIndex - 1]);
        }
      } else if (keyIndex === 1) {
        if (navIndex < pages - 1) {
          setFocus(navItems[navIndex + 1]);
        }
      } else {
        navClicked = navIndex;
        goTo(navIndex, e);
      }
    }
  }
  function getEvent(e) {
    e = e || win2.event;
    return isTouchEvent(e) ? e.changedTouches[0] : e;
  }
  function getTarget(e) {
    return e.target || win2.event.srcElement;
  }
  function isTouchEvent(e) {
    return e.type.indexOf("touch") >= 0;
  }
  function preventDefaultBehavior(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }
  function getMoveDirectionExpected() {
    return getTouchDirection(toDegree(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
  }
  function onPanStart(e) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }
    if (autoplay && animating) {
      stopAutoplayTimer();
    }
    panStart = true;
    if (rafIndex) {
      caf(rafIndex);
      rafIndex = null;
    }
    var $2 = getEvent(e);
    events2.emit(isTouchEvent(e) ? "touchStart" : "dragStart", info(e));
    if (!isTouchEvent(e) && ["img", "a"].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
      preventDefaultBehavior(e);
    }
    lastPosition.x = initPosition.x = $2.clientX;
    lastPosition.y = initPosition.y = $2.clientY;
    if (carousel) {
      translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ""));
      resetDuration(container, "0s");
    }
  }
  function onPanMove(e) {
    if (panStart) {
      var $2 = getEvent(e);
      lastPosition.x = $2.clientX;
      lastPosition.y = $2.clientY;
      if (carousel) {
        if (!rafIndex) {
          rafIndex = raf(function() {
            panUpdate(e);
          });
        }
      } else {
        if (moveDirectionExpected === "?") {
          moveDirectionExpected = getMoveDirectionExpected();
        }
        if (moveDirectionExpected) {
          preventScroll = true;
        }
      }
      if ((typeof e.cancelable !== "boolean" || e.cancelable) && preventScroll) {
        e.preventDefault();
      }
    }
  }
  function panUpdate(e) {
    if (!moveDirectionExpected) {
      panStart = false;
      return;
    }
    caf(rafIndex);
    if (panStart) {
      rafIndex = raf(function() {
        panUpdate(e);
      });
    }
    if (moveDirectionExpected === "?") {
      moveDirectionExpected = getMoveDirectionExpected();
    }
    if (moveDirectionExpected) {
      if (!preventScroll && isTouchEvent(e)) {
        preventScroll = true;
      }
      try {
        if (e.type) {
          events2.emit(isTouchEvent(e) ? "touchMove" : "dragMove", info(e));
        }
      } catch (err) {
      }
      var x = translateInit, dist = getDist(lastPosition, initPosition);
      if (!horizontal || fixedWidth || autoWidth) {
        x += dist;
        x += "px";
      } else {
        var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : dist * 100 / (viewport + gutter);
        x += percentageX;
        x += "%";
      }
      container.style[transformAttr] = transformPrefix + x + transformPostfix;
    }
  }
  function onPanEnd(e) {
    if (panStart) {
      if (rafIndex) {
        caf(rafIndex);
        rafIndex = null;
      }
      if (carousel) {
        resetDuration(container, "");
      }
      panStart = false;
      var $2 = getEvent(e);
      lastPosition.x = $2.clientX;
      lastPosition.y = $2.clientY;
      var dist = getDist(lastPosition, initPosition);
      if (Math.abs(dist)) {
        if (!isTouchEvent(e)) {
          var target = getTarget(e);
          addEvents(target, { "click": function preventClick(e2) {
            preventDefaultBehavior(e2);
            removeEvents(target, { "click": preventClick });
          } });
        }
        if (carousel) {
          rafIndex = raf(function() {
            if (horizontal && !autoWidth) {
              var indexMoved = -dist * items / (viewport + gutter);
              indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
              index += indexMoved;
            } else {
              var moved = -(translateInit + dist);
              if (moved <= 0) {
                index = indexMin;
              } else if (moved >= slidePositions[slideCountNew - 1]) {
                index = indexMax;
              } else {
                var i = 0;
                while (i < slideCountNew && moved >= slidePositions[i]) {
                  index = i;
                  if (moved > slidePositions[i] && dist < 0) {
                    index += 1;
                  }
                  i++;
                }
              }
            }
            render(e, dist);
            events2.emit(isTouchEvent(e) ? "touchEnd" : "dragEnd", info(e));
          });
        } else {
          if (moveDirectionExpected) {
            onControlsClick(e, dist > 0 ? -1 : 1);
          }
        }
      }
    }
    if (options.preventScrollOnTouch === "auto") {
      preventScroll = false;
    }
    if (swipeAngle) {
      moveDirectionExpected = "?";
    }
    if (autoplay && !animating) {
      setAutoplayTimer();
    }
  }
  function updateContentWrapperHeight() {
    var wp = middleWrapper ? middleWrapper : innerWrapper;
    wp.style.height = slidePositions[index + items] - slidePositions[index] + "px";
  }
  function getPages() {
    var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
    return Math.min(Math.ceil(rough), slideCount);
  }
  function updateNavVisibility() {
    if (!nav || navAsThumbnails) {
      return;
    }
    if (pages !== pagesCached) {
      var min = pagesCached, max = pages, fn = showElement;
      if (pagesCached > pages) {
        min = pages;
        max = pagesCached;
        fn = hideElement;
      }
      while (min < max) {
        fn(navItems[min]);
        min++;
      }
      pagesCached = pages;
    }
  }
  function info(e) {
    return {
      container,
      slideItems,
      navContainer,
      navItems,
      controlsContainer,
      hasControls,
      prevButton,
      nextButton,
      items,
      slideBy,
      cloneCount,
      slideCount,
      slideCountNew,
      index,
      indexCached,
      displayIndex: getCurrentSlide(),
      navCurrentIndex,
      navCurrentIndexCached,
      pages,
      pagesCached,
      sheet,
      isOn,
      event: e || {}
    };
  }
  return {
    version: "2.9.4",
    getInfo: info,
    events: events2,
    goTo,
    play,
    pause,
    isOn,
    updateSliderHeight: updateInnerWrapperHeight,
    refresh: initSliderTransform,
    destroy,
    rebuild: function() {
      return tns(extend(options, optionsElements));
    }
  };
};
const element$1 = "js-slider-brands";
const $element$1 = document.getElementsByClassName(element$1);
const length$1 = $element$1.length;
if (length$1) {
  initSlider();
  $(window).on("ajax-loaded", function() {
    initSlider();
  });
}
function initSlider() {
  for (let i = 0; i < length$1; i++) {
    if (!$element$1[i].classList.contains(className.Active)) {
      $element$1[i].classList.add(className.Active);
      const $slider = tns({
        container: $element$1[i].getElementsByClassName("js__slides")[0],
        loop: false,
        items: 7,
        gutter: 26,
        nav: false,
        speed: 400,
        mouseDrag: true,
        responsive: {
          0: {
            disable: true
          },
          768: {
            items: 3,
            gutter: 20,
            disable: false
          },
          985: {
            items: 4,
            gutter: 26
          },
          1024: {
            items: 5
          },
          1100: {
            items: 6
          },
          1300: {
            items: 7
          }
        }
      });
      $slider.events.on("transitionStart", () => {
        $element$1[i].classList.add(className.IsAnimate);
      });
      $slider.events.on("transitionEnd", () => {
        $element$1[i].classList.remove(className.IsAnimate);
      });
    }
  }
}
const element = "js-block-expand";
const $element = document.getElementsByClassName(element);
const length = $element.length;
if (length) {
  for (let i = 0; i < length; i++) {
    const $linkExpand = $element[i].getElementsByClassName("js__expand");
    for (let j = 0; j < $linkExpand.length; j++) {
      $linkExpand[j].addEventListener("click", function(event) {
        event.preventDefault();
        this.closest("." + element).classList.toggle(className.Active);
      });
    }
  }
}
