"use strict";!function e(r,a,t){function n(i,l){if(!a[i]){if(!r[i]){var o="function"==typeof require&&require;if(!l&&o)return o(i,!0);if(u)return u(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var s=a[i]={exports:{}};r[i][0].call(s.exports,function(e){var a=r[i][1][e];return n(a?a:e)},s,s.exports,e,r,a,t)}return a[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)n(t[i]);return n}({1:[function(e,r,a){function t(e,r,a,t){if(null==e)return null;var u=null!=t&&null!=t.defaultUniforms?t.defaultUniforms:{};e.useLightUniforms&&(u=n.UniformsUtils.merge([u,n.UniformsUtils.clone(n.UniformsLib.lights)])),u.time={type:"f",value:0};for(var i=0,l=e.uniforms;i<l.length;i++){var o=l[i],f=void 0;switch(o.type){case"f":f=o.value;break;case"c":f=new n.Color(o.value[0],o.value[1],o.value[2]);break;case"v2":f=new n.Vector2(o.value[0],o.value[1]);break;case"v3":f=new n.Vector3(o.value[0],o.value[1],o.value[2]);break;case"v4":f=new n.Vector4(o.value[0],o.value[1],o.value[2],o.value[3]);break;case"t":if(f=r[o.value],null==f){console.warn('Texture "'+o.name+'" is null');continue}}u[o.name]={type:o.type,value:f}}for(var s=0,v=e.attributes;s<v.length;s++){var c=v[s],h=[],d=void 0;switch(c.type){case"f":d=1;break;case"c":d=3;break;case"v2":d=2;break;case"v3":d=3;break;case"v4":d=4}for(var m=a.getAttribute("position").length/3,p=0;p<m;p++)for(var g=0;g<d;g++)h.push(Math.random());a.addAttribute(c.name,new n.BufferAttribute(new Float32Array(h),d))}var b=null!=t&&t.useDraft===!0,S=b?e.vertexShader.draft:e.vertexShader.text,w=b?e.fragmentShader.draft:e.fragmentShader.text;return new n.ShaderMaterial({uniforms:u,vertexShader:S,fragmentShader:w,transparent:!0,lights:e.useLightUniforms})}var n=SupEngine.THREE;a.createShaderMaterial=t},{}],2:[function(e,r,a){var t=e("./Shader");SupEngine.registerComponentClass("Shader",t)},{"./Shader":1}]},{},[2]);