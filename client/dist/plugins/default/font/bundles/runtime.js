"use strict";!function t(e,n,r){function i(u,a){if(!n[u]){if(!e[u]){var s="function"==typeof require&&require;if(!a&&s)return s(u,!0);if(o)return o(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[u]={exports:{}};e[u][0].call(l.exports,function(t){var n=e[u][1][t];return i(n?n:t)},l,l.exports,t,e,n,r)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}({1:[function(t,e,n){function r(t,e,n){if(e.setText(n.text),e.setOptions({alignment:n.alignment,verticalAlignment:n.verticalAlignment,size:n.size,color:n.color}),n.overrideOpacity&&(e.opacity=n.opacity),null!=n.fontAssetId){var r=t.getOuterAsset(n.fontAssetId).__inner;n.overrideOpacity||(e.opacity=r.opacity),e.setFont(r)}}n.setupComponent=r},{}],2:[function(t,e,n){function r(t,e,n){t.getAssetData("assets/"+e.storagePath+"/asset.json","json",function(r,o){if(o.isBitmap){var u=new Image;u.onload=function(){o.texture=new SupEngine.THREE.Texture(u),o.texture.needsUpdate=!0,"pixelated"===o.filtering&&(o.texture.magFilter=SupEngine.THREE.NearestFilter,o.texture.minFilter=SupEngine.THREE.NearestFilter),n(null,o)},u.onerror=function(){n(null,o)},u.src=t.dataURL+"assets/"+e.storagePath+"/bitmap.dat"}else{o.name="Font"+e.id;var a=void 0;try{a=new FontFace(o.name,"url("+t.dataURL+"assets/"+i(e.storagePath)+"/font.dat)"),document.fonts.add(a)}catch(t){}null!=a?a.load().then(function(){n(null,o)},function(){n(null,o)}):n(null,o)}})}function i(t){return t.split("/").map(function(t){return encodeURIComponent(t).replace(/[!'()*]/g,function(t){return"%"+t.charCodeAt(0).toString(16)})}).join("/")}function o(t,e){return new window.Sup.Font(e)}n.loadAsset=r,n.createOuterAsset=o},{}],3:[function(t,e,n){var r=t("./TextRenderer"),i=t("./font");SupRuntime.registerPlugin("TextRenderer",r),SupRuntime.registerPlugin("font",i)},{"./TextRenderer":1,"./font":2}]},{},[3]);