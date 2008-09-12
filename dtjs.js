/*
    DtJS - the DtTvB's JavaScript Animation Framework
    Copyright (C) 2008  Thai Pangsakulyanont

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
    Project Page: http://dttvb-dtjs.googlecode.com/
*/

/*global ActiveXObject,dtjs*/

// Map $ to getElementById
if (window.$ === undefined) {
	window.$ = function(id) {
		return document.getElementById(id);
	};
}

// Map $t to getElementsByTagName
if (window.$t === undefined) {
	window.$t = function(tagname) {
		return document.getElementsByTagName(tagname);
	};
}

// Make dtjs.
window.dtjs = {
};

(function() {

// XMLHttpRequest ()
function xh() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP"); 
		} catch (e) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e2) {
				return false;
			}
		}
	}
	return false;
}
dtjs.xh = xh;

// Return Computed Style (element)
function compute(x) {
	if (window.getComputedStyle) {
		return document.defaultView.getComputedStyle(x, '');
	} else if (x.currentStyle) {
		return x.currentStyle;
	} else {
		return x.style;
	}
	return {};
}
dtjs.q = compute;

// Request (xmlhttprequest, method, url, postdata, onreadystatechange)
function r(x, m, u, d, c) {
	x.onreadystatechange = c;
	x.open (m, u, 1);
	if (m.toLowerCase() == 'post') {
		x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	x.send (d);
}
dtjs.r = r;

// Left (element)
function l(el) {
	var tmp = el.offsetLeft;
	el = el.offsetParent;
	while (el) {
		tmp += el.offsetLeft;
		el = el.offsetParent;
	}
	return tmp;
}
dtjs.l = l;

// Top (element)
function t(el) {
	var tmp = el.offsetTop;
	el = el.offsetParent;
	while (el) {
		tmp += el.offsetTop;
		el = el.offsetParent;
	}
	return tmp;
}
dtjs.t = t;

// ScrollPosition () 
function sc() {
	if (window.pageYOfsset) {
		return [window.pageXOfsset, window.pageYOfsset];
	} if (document.documentElement && document.documentElement.scrollTop) {
		return [document.documentElement.scrollLeft,
			document.documentElement.scrollTop];
	}
	return [document.body.scrollLeft, document.body.scrollTop];
}
dtjs.sc = sc;

// ViewportSize ()
function sz() {
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		return [document.documentElement.clientWidth,
			document.documentElement.clientHeight];
	}
	return [document.body.clientWidth, document.body.clientHeight];
}
dtjs.sz = sz;

// Opactiy (element, percentage)
function o(el, opx) {
	if (typeof(el.style.filter) != 'undefined') {
		el.style.filter= 'alpha(opacity=' + opx + ')';
	} else if (typeof(el.style.opacity) != 'undefined') {
		el.style.opacity = opx / 100;
	} else if (typeof(el.style.MozOpacity) != 'undefined') {
		el.style.MozOpacity = opx / 100;
	}
}
dtjs.o = o;

// AddEvent (element, eventname, callback)
function ae(el, evt, fnc) {
	if (el.addEventListener) {
		return el.addEventListener(evt, fnc, false); 
	} else if (el.attachEvent) {
		return el.attachEvent('on' + evt, fnc);
	}
	return false;
}
dtjs.ae = ae;

// RemoveEvent (element, eventname, callback)
function re(el, evt, fnc) {
	if (el.removeEventListener) {
		return el.removeEventListener(evt, fnc, false); 
	} else if (el.detachEvent) {
		return el.detachEvent('on' + evt, fnc);
	}
	return false;
}
dtjs.re = re;

})();

// Animation Module

(function() {

var cmd = function(i_start, i_end, i_duration, i_frame, i_callback, i_easing) {
	var what = {};
	var value  = i_start;
	var active = 1;
	var frame = function(a, b) {
		value = b;
		i_frame.call (what, a, b);
		if (b) {
			if (i_callback) {
				i_callback.call (what, a, b);
			}
			active = 0;
		}
		return true;
	};
	var animation = cmd.c(i_start, i_end, i_duration, frame, i_easing);
	what.stop = function() {
		animation ();
		active = 0;
		return true;
	};
	what.getValue   = function() { return value; };
	what.isFinished = function() { return !active; };
	what.callBack   = function() { i_callback.call(what, i_end, 1); };
	return what;
};

// Create (start, end, duration, callback, easing, framepersec)
var create = function(s, e, t, f, ef, fps) {
	var tid = 0;
	var st = (new Date().getTime());
	if (typeof ef != 'function') {
		ef = function(x) {
			return x;
		};
	}
	var dl = (typeof fps == 'undefined') ? 20 : Math.round(1000 / fps);
	var cvl = s;
	var fm = function() {
		var ct = (new Date().getTime());
		var tv = (ct - st) / (t * 1000);
		if (tv < 0) { tv = 0; }
		if (tv > 1) { tv = 1; }
		var cv = s + ((e - s) * ef(tv));
		f (cv, tv === 1);
		cvl = cv;
		if (tv < 1) { tid = setTimeout(fm, dl); }
	};
	fm ();
	return function(c, v) {
		if (typeof c == 'undefined') {
			clearTimeout (tid);
			return;
		}
		if (c === 0) { return cvl; }
		if (c === 1) { return (s = v); }
		if (c === 2) { return (e = v); }
	};
};
cmd.c = create;

// EaseIn (position)
function i(pos) {
	return pos === 0 ? 0 : Math.pow(pos, 2);
}
cmd.i = i;

// EaseOut (position)
function o(pos) {
	return pos === 0 ? 0 : 1 - Math.pow(1 - pos, 2);
}
cmd.o = o;

// EaseInOut (position)
function io(pos) {
	return pos === 1 ? 1 : (pos < 0.5 ? cmd.i(pos * 2) / 2 : (cmd.o((pos - 0.5) * 2) / 2) + 0.5);
}
cmd.io = io;

// Slightly Modified Easing Equations v1.5
// By Robert Penner <http://www.robertpenner.com/easing/>
// BSD License
var bs = Math.sin(0.57075);

// SineIn (position)
function si(pos) {
	return 1 - ((Math.sin(1.57075 - pos) - bs) / (1 - bs));
}
cmd.si = si;

// SineOut (position)
function so(pos) {
	return 1 - si(1 - pos);
}
cmd.so = so;

// SineInOut (position)
function sio(pos) {
	return (pos < 0.5 ? si(pos * 2) / 2 : ((so((pos * 2) - 1)) / 2) + 0.5);
}
cmd.sio = sio;

// These Easing Equations are by Me.

// Elastic (position)
function e(x) {
	return 1 - (Math.cos(x * 24) * Math.pow(1 - x, 3.2));
}
cmd.e = e;

// Bounce (position)
function b(x) {
	return 1 - (Math.abs(Math.cos(Math.pow((x * 3.5) + 1.772, 2))) * Math.pow(1 - x, 3));
}
cmd.b = b;

// TimesteppedInOut (position)
function ioe(x) {
	var n = io(x);
	return n + (n * 1.6 * (1 - n));
}
cmd.ioe = ioe;

dtjs.a = cmd;

})();

// Color Module

(function() {

var cmd = {};

// ParseColor (string)
var parseColor = function(s) {
	var m;
	m = s.toLowerCase().match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
	if (m) { return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]; }
	m = m = s.toLowerCase().match(/^rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)$/);
	if (m) { return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)]; }
	return false;
};

// MakeRGBValues (arrayrgb)
var makeRGB = function(x) {
	if (x[0] > 255) { x[0] = 255; }
	if (x[1] > 255) { x[1] = 255; }
	if (x[2] > 255) { x[2] = 255; }
	if (x[0] < 0)   { x[0] = 0; }
	if (x[1] < 0)   { x[1] = 0; }
	if (x[2] < 0)   { x[2] = 0; }
	return 'rgb(' + Math.round(x[0]) + ', ' + Math.round(x[1]) + ', ' + Math.round(x[2]) + ')';
};

// HSVtoRGB (arrayhsv)
var h2r = function(ihsv) {
	var a = [ihsv[0] % 360, ihsv[1] / 100, ihsv[2] / 100];
	var b = Math.floor(a[0] / 60);
	var c = (a[0] % 60) / 60;
	var d = a[2] * (1 - a[1]);
	var e = a[2] * (1 - (c * a[1]));
	var f = a[2] * (1 - ((1 - c) * a[1]));
	var g = [0, 0, 0];
	if (b === 0)
		{ g = [a[2], f, d]; }
	else if (b === 1)
		{ g = [e, a[2], d]; }
	else if (b === 2)
		{ g = [d, a[2], f]; }
	else if (b === 3)
		{ g = [d, e, a[2]]; }
	else if (b === 4)
		{ g = [f, d, a[2]]; }
	else if (b === 5)
		{ g = [a[2], d, e]; }
	return [Math.round(g[0] * 255), Math.round(g[1] * 255), Math.round(g[2] * 255)];
};

// RGBtoHSV (arrayrgb)
var r2h = function(irgb) {
	var a = [irgb[0] / 255, irgb[1] / 255, irgb[2] / 255];
	var b = a[0];
	var c = a[0];
	var d, e, f;
	if (a[1] < b) { b = a[1]; }
	if (a[2] < b) { b = a[2]; }
	if (a[1] > c) { c = a[1]; }
	if (a[2] > c) { c = a[2]; }
	if (b == c) { d = 0; }
	else if (c == a[0]) { d = (60 * ((a[1] - a[2]) / (c - b))); }
	else if (c == a[1]) { d = (60 * ((a[2] - a[0]) / (c - b))) + 120; }
	else if (c == a[2]) { d = (60 * ((a[0] - a[1]) / (c - b))) + 240; }
	if (d < 0) { d += 360; }
	e = Math.round(100 * ((c === 0) ? 0 : (1 - (b / c))));
	f = Math.round(100 * c);
	return [Math.round(d % 360), e, f];
};

// Fade (arraystart, arrayend, position)
var fade = function(x, y, p) {
	return [
		Math.round(x[0] + ((y[0] - x[0]) * p)),
		Math.round(x[1] + ((y[1] - x[1]) * p)),
		Math.round(x[2] + ((y[2] - x[2]) * p))
	];
};

cmd.a = parseColor;
cmd.c = makeRGB;
cmd.r = h2r;
cmd.h = r2h;
cmd.f = fade;

dtjs.c = cmd;


})();
