/**
 * the DtTvB's JavaScript Library
 * @author the DtTvB (http://dttvb.yi.org/)
 *--------------------------------
 * You may use and edit this script for any purposes, but please do not
 * modify or remove this notice.
 *--------------------------------
 * Get the latest version of this script and read the manual
 * at http://dttvb.yi.org/dtjs/
 *--------------------------------
 * Compressed and packed using packer.
 * (http://dean.edwards.name/packer/)
 */
if(window.$===undefined){
window.$=function(a){
return document.getElementById(a)}}if(window.$t===undefined){
window.$t=function(a){
return document.getElementsByTagName(a)}}window.dtjs={};
(function(){
function xh(){
if(window.XMLHttpRequest){
return new XMLHttpRequest}else if(window.ActiveXObject){
try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){
try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e2){
return false}}}return false}dtjs.xh=xh;
function compute(x){
if(window.getComputedStyle){
return document.defaultView.getComputedStyle(x,"")}else if(x.currentStyle){
return x.currentStyle}else{return x.style}return{}}dtjs.q=compute;
function r(x,m,u,d,c){
x.onreadystatechange=c;
x.open(m,u,1);
if(m.toLowerCase()=="post"){
x.setRequestHeader("Content-Type","application/x-www-form-urlencoded")}x.send(d)}dtjs.r=r;
function l(a){
var b=a.offsetLeft;
a=a.offsetParent;
while(a){
b+=a.offsetLeft;
a=a.offsetParent}return b}dtjs.l=l;
function t(a){
var b=a.offsetTop;
a=a.offsetParent;
while(a){
b+=a.offsetTop;
a=a.offsetParent}return b}dtjs.t=t;
function sc(){
if(window.pageYOfsset){
return[window.pageXOfsset,window.pageYOfsset]}if(document.documentElement&&document.documentElement.scrollTop){
return[document.documentElement.scrollLeft,document.documentElement.scrollTop]}return[document.body.scrollLeft,document.body.scrollTop]}dtjs.sc=sc;
function sz(){
if(document.documentElement&&document.documentElement.clientHeight&&document.documentElement.clientWidth){
return[document.documentElement.clientWidth,document.documentElement.clientHeight]}return[document.body.clientWidth,document.body.clientHeight]}dtjs.sz=sz;
function o(a,b){
if(typeof a.style.filter!="undefined"){
a.style.filter="alpha(opacity="+b+")"}else if(typeof a.style.opacity!="undefined"){
a.style.opacity=b/100}else if(typeof a.style.MozOpacity!="undefined"){
a.style.MozOpacity=b/100}}dtjs.o=o;
function ae(a,b,c){
if(a.addEventListener){
return a.addEventListener(b,c,false)}else if(a.attachEvent){
return a.attachEvent("on"+b,c)}return false}dtjs.ae=ae;
function re(a,b,c){
if(a.removeEventListener){
return a.removeEventListener(b,c,false)}else if(a.detachEvent){
return a.detachEvent("on"+b,c)}return false}dtjs.re=re})();
(function(){
var p=function(c,d,e,f,g,h){
var i={};
var j=c;
var k=1;
var l=function(a,b){
j=b;
f.call(i,a,b);
if(b){
if(g){
g.call(i,a,b)}k=0}return true};
var m=p.c(c,d,e,l,h);
i.stop=function(){
m();
k=0;
return true};
i.getValue=function(){
return j};
i.isFinished=function(){
return!k};
i.callBack=function(){
g.call(i,d,1)};
return i};
var q=function(s,e,t,f,d,g){
var h=0;
var i=(new Date).getTime();
if(typeof d!="function"){
d=function(x){
return x}}var j=typeof g=="undefined"?20:Math.round(1000/g);
var k=s;
var l=function(){
var a=(new Date).getTime();
var b=(a-i)/(t*1000);
if(b<0){
b=0}if(b>1){
b=1}var c=s+(e-s)*d(b);
f(c,b===1);
k=c;
if(b<1){
h=setTimeout(l,j)}};
l();
return function(c,v){
if(typeof c=="undefined"){
clearTimeout(h);
return}if(c===0){
return k}if(c===1){
return s=v}if(c===2){
return e=v}}};
p.c=q;
function i(a){
return a===0?0:Math.pow(a,2)}p.i=i;
function o(a){
return a===0?0:1-Math.pow(1-a,2)}p.o=o;
function io(a){
return a===1?1:a<0.5?p.i(a*2)/2:p.o((a-0.5)*2)/2+0.5}p.io=io;
var r=Math.sin(0.57075);
function si(a){
return 1-(Math.sin(1.57075-a)-r)/(1-r)}p.si=si;
function so(a){
return 1-si(1-a)}p.so=so;
function sio(a){
return a<0.5?si(a*2)/2:so(a*2-1)/2+0.5}p.sio=sio;
function e(x){
return 1-Math.cos(x*24)*Math.pow(1-x,3.2)}p.e=e;
function b(x){
return 1-Math.abs(Math.cos(Math.pow(x*3.5+1.772,2)))*Math.pow(1-x,3)}p.b=b;
function ioe(x){
var n=io(x);
return n+n*1.6*(1-n)}p.ioe=ioe;
dtjs.a=p})();
(function(){
var i={};
var j=function(s){
var m;
m=s.toLowerCase().match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
if(m){
return[parseInt(m[1],16),parseInt(m[2],16),parseInt(m[3],16)]}m=m=s.toLowerCase().match(/^rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)$/);
if(m){
return[parseInt(m[1],10),parseInt(m[2],10),parseInt(m[3],10)]}return false};
var k=function(x){
if(x[0]>255){
x[0]=255}if(x[1]>255){
x[1]=255}if(x[2]>255){
x[2]=255}if(x[0]<0){
x[0]=0}if(x[1]<0){
x[1]=0}if(x[2]<0){
x[2]=0}return"rgb("+Math.round(x[0])+", "+Math.round(x[1])+", "+Math.round(x[2])+")"};
var l=function(h){
var a=[h[0]%360,h[1]/100,h[2]/100];
var b=Math.floor(a[0]/60);
var c=a[0]%60/60;
var d=a[2]*(1-a[1]);
var e=a[2]*(1-c*a[1]);
var f=a[2]*(1-(1-c)*a[1]);
var g=[0,0,0];
if(b===0){
g=[a[2],f,d]}else if(b===1){
g=[e,a[2],d]}else if(b===2){
g=[d,a[2],f]}else if(b===3){
g=[d,e,a[2]]}else if(b===4){
g=[f,d,a[2]]}else if(b===5){
g=[a[2],d,e]}return[Math.round(g[0]*255),Math.round(g[1]*255),Math.round(g[2]*255)]};
var n=function(g){
var a=[g[0]/255,g[1]/255,g[2]/255];
var b=a[0];
var c=a[0];
var d,e,f;
if(a[1]<b){
b=a[1]}if(a[2]<b){
b=a[2]}if(a[1]>c){
c=a[1]}if(a[2]>c){
c=a[2]}if(b==c){
d=0}else if(c==a[0]){
d=60*((a[1]-a[2])/(c-b))}else if(c==a[1]){
d=60*((a[2]-a[0])/(c-b))+120}else if(c==a[2]){
d=60*((a[0]-a[1])/(c-b))+240}if(d<0){
d+=360}e=Math.round(100*(c===0?0:1-b/c));
f=Math.round(100*c);
return[Math.round(d%360),e,f]};
var o=function(x,y,p){
return[Math.round(x[0]+(y[0]-x[0])*p),Math.round(x[1]+(y[1]-x[1])*p),Math.round(x[2]+(y[2]-x[2])*p)]};
i.a=j;
i.c=k;
i.r=l;
i.h=n;
i.f=o;
dtjs.c=i})();
