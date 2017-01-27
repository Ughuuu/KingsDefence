"use strict";!function t(r,n,i){function o(s,h){if(!n[s]){if(!r[s]){var a="function"==typeof require&&require;if(!h&&a)return a(s,!0);if(e)return e(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[s]={exports:{}};r[s][0].call(f.exports,function(t){var n=r[s][1][t];return o(n?n:t)},f,f.exports,t,r,n,i)}return n[s].exports}for(var e="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(t,r,n){window.RNG=t("./rng")},{"./rng":2}],2:[function(t,r,n){function i(t){this.s=new Array(256),this.i=0,this.j=0;for(var r=0;r<256;r++)this.s[r]=r;t&&this.mix(t)}function o(t){null==t?t=""+Math.random()+Date.now():"function"==typeof t?(this.uniform=t,this.nextByte=function(){return~~(256*this.uniform())},t=null):"[object String]"!==Object.prototype.toString.call(t)&&(t=JSON.stringify(t)),this._normal=null,t?this._state=new i(t):this._state=null}i.getStringBytes=function(t){for(var r=[],n=0;n<t.length;n++){var i=t.charCodeAt(n),o=[];do o.push(255&i),i>>=8;while(i>0);r=r.concat(o.reverse())}return r},i.prototype._swap=function(t,r){var n=this.s[t];this.s[t]=this.s[r],this.s[r]=n},i.prototype.mix=function(t){for(var r=i.getStringBytes(t),n=0,o=0;o<this.s.length;o++)n+=this.s[o]+r[o%r.length],n%=256,this._swap(o,n)},i.prototype.next=function(){return this.i=(this.i+1)%256,this.j=(this.j+this.s[this.i])%256,this._swap(this.i,this.j),this.s[(this.s[this.i]+this.s[this.j])%256]},o.prototype.nextByte=function(){return this._state.next()},o.prototype.uniform=function(){for(var t=7,r=0,n=0;n<t;n++)r*=256,r+=this.nextByte();return r/(Math.pow(2,8*t)-1)},o.prototype.random=function(t,r){return null==t?this.uniform():(null==r&&(r=t,t=0),t+Math.floor(this.uniform()*(r-t)))},o.prototype.normal=function(){if(null!==this._normal){var t=this._normal;return this._normal=null,t}var r=this.uniform()||Math.pow(2,-53),n=this.uniform();return this._normal=Math.sqrt(-2*Math.log(r))*Math.sin(2*Math.PI*n),Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*n)},o.prototype.exponential=function(){return-Math.log(this.uniform()||Math.pow(2,-53))},o.prototype.poisson=function(t){var r=Math.exp(-(t||1)),n=0,i=1;do n++,i*=this.uniform();while(i>r);return n-1},o.prototype.gamma=function(t){var r=(t<1?1+t:t)-1/3,n=1/Math.sqrt(9*r);do{do var i=this.normal(),o=Math.pow(n*i+1,3);while(o<=0);var e=this.uniform(),s=Math.pow(i,2)}while(e>=1-.0331*s*s&&Math.log(e)>=.5*s+r*(1-o+Math.log(o)));return t<1?r*o*Math.exp(this.exponential()/-t):r*o},o.roller=function(t,r){var n=t.split(/(\d+)?d(\d+)([+-]\d+)?/).slice(1),i=parseFloat(n[0])||1,e=parseFloat(n[1]),s=parseFloat(n[2])||0;return r=r||new o,function(){for(var t=i+s,n=0;n<i;n++)t+=r.random(e);return t}},o.$=new o,r.exports=o},{}]},{},[1]);