// build time:Wed Mar 28 2018 07:43:04 GMT+0800 (CST)
function _extends(){_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r){if(Object.prototype.hasOwnProperty.call(r,i)){t[i]=r[i]}}}return t};return _extends.apply(this,arguments)}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||false;i.configurable=true;if("value"in i)i.writable=true;Object.defineProperty(t,i.key,i)}}function _createClass(t,e,r){if(e)_defineProperties(t.prototype,e);if(r)_defineProperties(t,r);return t}var ScrollSpy=function(t){var e="scrollspy";var r="4.0.0";var i="bs.scrollspy";var s="."+i;var n=".data-api";var o=t.fn[e];var a={offset:10,method:"auto",target:""};var l={offset:"number",method:"string",target:"(string|element)"};var f={ACTIVATE:"activate"+s,SCROLL:"scroll"+s,LOAD_DATA_API:"load"+s+n};var c={DROPDOWN_ITEM:"dropdown-item",DROPDOWN_MENU:"dropdown-menu",ACTIVE:"active"};var h={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",NAV_ITEMS:".nav-item",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"};var _={OFFSET:"offset",POSITION:"position"};var g=function(){function n(e,r){var i=this;this._element=e;this._scrollElement=e.tagName==="BODY"?window:e;this._config=this._getConfig(r);this._selector=this._config.target+" "+h.NAV_LINKS+","+(this._config.target+" "+h.LIST_ITEMS+",")+(this._config.target+" "+h.DROPDOWN_ITEMS);this._offsets=[];this._targets=[];this._activeTarget=null;this._scrollHeight=0;t(this._scrollElement).on(f.SCROLL,function(t){return i._process(t)});this.refresh();this._process()}var o=n.prototype;o.refresh=function g(){var e=this;var r=this._scrollElement===this._scrollElement.window?_.OFFSET:_.POSITION;var i=this._config.method==="auto"?r:this._config.method;var s=i===_.POSITION?this._getScrollTop():0;this._offsets=[];this._targets=[];this._scrollHeight=this._getScrollHeight();var n=t.makeArray(t(this._selector));n.map(function(e){var r;var n=Util.getSelectorFromElement(e);if(n){r=t(n)[0]}if(r){var o=r.getBoundingClientRect();if(o.width||o.height){return[t(r)[i]().top+s,n]}}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]);e._targets.push(t[1])})};o.dispose=function u(){t.removeData(this._element,i);t(this._scrollElement).off(s);this._element=null;this._scrollElement=null;this._config=null;this._selector=null;this._offsets=null;this._targets=null;this._activeTarget=null;this._scrollHeight=null};o._getConfig=function d(r){r=_extends({},a,r);if(typeof r.target!=="string"){var i=t(r.target).attr("id");if(!i){i=Util.getUID(e);t(r.target).attr("id",i)}r.target="#"+i}Util.typeCheckConfig(e,r,l);return r};o._getScrollTop=function v(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop};o._getScrollHeight=function p(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)};o._getOffsetHeight=function T(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height};o._process=function m(){var t=this._getScrollTop()+this._config.offset;var e=this._getScrollHeight();var r=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e){this.refresh()}if(t>=r){var i=this._targets[this._targets.length-1];if(this._activeTarget!==i){this._activate(i)}return}if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0){this._activeTarget=null;this._clear();return}for(var s=this._offsets.length;s--;){var n=this._activeTarget!==this._targets[s]&&t>=this._offsets[s]&&(typeof this._offsets[s+1]==="undefined"||t<this._offsets[s+1]);if(n){this._activate(this._targets[s])}}};o._activate=function I(e){this._activeTarget=e;this._clear();var r=this._selector.split(",");r=r.map(function(t){return t+'[data-target="'+e+'"],'+(t+'[href="'+e+'"]')});var i=t(r.join(","));if(i.hasClass(c.DROPDOWN_ITEM)){i.closest(h.DROPDOWN).find(h.DROPDOWN_TOGGLE).addClass(c.ACTIVE);i.addClass(c.ACTIVE)}else{i.addClass(c.ACTIVE);i.parents(h.NAV_LIST_GROUP).prev(h.NAV_LINKS+", "+h.LIST_ITEMS).addClass(c.ACTIVE);i.parents(h.NAV_LIST_GROUP).prev(h.NAV_ITEMS).children(h.NAV_LINKS).addClass(c.ACTIVE)}t(this._scrollElement).trigger(f.ACTIVATE,{relatedTarget:e})};o._clear=function O(){t(this._selector).filter(h.ACTIVE).removeClass(c.ACTIVE)};n._jQueryInterface=function E(e){return this.each(function(){var r=t(this).data(i);var s=typeof e==="object"&&e;if(!r){r=new n(this,s);t(this).data(i,r)}if(typeof e==="string"){if(typeof r[e]==="undefined"){throw new TypeError('No method named "'+e+'"')}r[e]()}})};_createClass(n,null,[{key:"VERSION",get:function A(){return r}},{key:"Default",get:function S(){return a}}]);return n}();t(window).on(f.LOAD_DATA_API,function(){var e=t.makeArray(t(h.DATA_SPY));for(var r=e.length;r--;){var i=t(e[r]);g._jQueryInterface.call(i,i.data())}});t.fn[e]=g._jQueryInterface;t.fn[e].Constructor=g;t.fn[e].noConflict=function(){t.fn[e]=o;return g._jQueryInterface};return g}($);
//rebuild by neat 