"use strict";!function e(t,s,i){function r(a,o){if(!s[a]){if(!t[a]){var l="function"==typeof require&&require;if(!o&&l)return l(a,!0);if(n)return n(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var d=s[a]={exports:{}};t[a][0].call(d.exports,function(e){var s=t[a][1][e];return r(s?s:e)},d,d.exports,e,t,s,i)}return s[a].exports}for(var n="function"==typeof require&&require,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(e,t,s){function i(e,t){for(var s,i=e[e.length-1],r=0,n=e;r<n.length;r++){var a=n[r];if(s=a,a.time>t)break;i=a}i===s&&(s=e[0]);var o=s.time-i.time,l=t-i.time,h=o>0?l/o:0;return{prevKeyFrame:i,nextKeyFrame:s,t:h}}var r=this&&this.__extends||function(e,t){function s(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(s.prototype=t.prototype,new s)},n=SupEngine.THREE,a=new n.Matrix4,o=new n.Vector3,l=new n.Quaternion,h=e("./ModelRendererUpdater"),d=function(e){function t(t){e.call(this,t,"ModelRenderer"),this.color={r:1,g:1,b:1},this.hasPoseBeenUpdated=!1,this.materialType="basic",this.castShadow=!1,this.receiveShadow=!1}return r(t,e),t.prototype._clearMesh=function(){null!=this.skeletonHelper&&(this.actor.threeObject.remove(this.skeletonHelper),this.skeletonHelper=null),this.actor.threeObject.remove(this.threeMesh),this.threeMesh.traverse(function(e){null!=e.dispose&&e.dispose()}),this.threeMesh=null,this.material.dispose(),this.material=null},t.prototype._destroy=function(){null!=this.threeMesh&&this._clearMesh(),this.asset=null,e.prototype._destroy.call(this)},t.prototype.setModel=function(e,t,s){if(null!=this.threeMesh&&this._clearMesh(),this.asset=e,null!=t&&(this.materialType=t),null!=s&&(this.shaderAsset=s),this.animation=null,this.animationsByName={},null!=e&&null!=e.attributes.position){this.updateAnimationsByName();var i=new n.BufferGeometry;if(null!=this.asset.attributes.position){var r=new Float32Array(this.asset.attributes.position);i.addAttribute("position",new n.BufferAttribute(r,3))}if(null!=this.asset.attributes.index){var r=new Uint16Array(this.asset.attributes.index);i.setIndex(new n.BufferAttribute(r,1))}if(null!=this.asset.attributes.uv){var r=new Float32Array(this.asset.attributes.uv);i.addAttribute("uv",new n.BufferAttribute(r,2))}if(null!=this.asset.attributes.normal){var r=new Float32Array(this.asset.attributes.normal);i.addAttribute("normal",new n.BufferAttribute(r,3))}if(null!=this.asset.attributes.color){var r=new Float32Array(this.asset.attributes.color);i.addAttribute("color",new n.BufferAttribute(r,3))}if(null!=this.asset.attributes.skinIndex){var r=new Float32Array(this.asset.attributes.skinIndex);i.addAttribute("skinIndex",new n.BufferAttribute(r,4))}if(null!=this.asset.attributes.skinWeight){var r=new Float32Array(this.asset.attributes.skinWeight);i.addAttribute("skinWeight",new n.BufferAttribute(r,4))}if("shader"===this.materialType)this.material=SupEngine.componentClasses.Shader.createShaderMaterial(this.shaderAsset,this.asset.textures,i);else{var o=void 0;"basic"===this.materialType?o=new n.MeshBasicMaterial:"phong"===this.materialType&&(o=new n.MeshPhongMaterial,o.lightMap=this.asset.textures[this.asset.mapSlots.light]),o.map=this.asset.textures[this.asset.mapSlots.map],o.specularMap=this.asset.textures[this.asset.mapSlots.specular],o.alphaMap=this.asset.textures[this.asset.mapSlots.alpha],"phong"===this.materialType&&(o.normalMap=this.asset.textures[this.asset.mapSlots.normal]),o.alphaTest=.1,this.material=o}if(this.setColor(this.color.r,this.color.g,this.color.b),this.setOpacity(this.opacity),null!=this.asset.bones){if(this.threeMesh=new n.SkinnedMesh(i,this.material),null!=this.asset.upAxisMatrix){var l=(new n.Matrix4).fromArray(this.asset.upAxisMatrix);this.threeMesh.applyMatrix(l)}var h=[];this.bonesByName={};for(var d=0,u=this.asset.bones;d<u.length;d++){var m=u[d],p=new n.Bone(this.threeMesh);p.name=m.name,this.bonesByName[p.name]=p,p.applyMatrix(a.fromArray(m.matrix)),h.push(p)}for(var c=0;c<this.asset.bones.length;c++){var m=this.asset.bones[c];null!=m.parentIndex?h[m.parentIndex].add(h[c]):this.threeMesh.add(h[c])}this.threeMesh.updateMatrixWorld(!0);var f=!1;this.threeMesh.bind(new n.Skeleton(h,void 0,f)),this.material.skinning=!0}else this.threeMesh=new n.Mesh(i,this.material);this.setUnitRatio(e.unitRatio),this.setCastShadow(this.castShadow),this.threeMesh.receiveShadow=this.receiveShadow,this.actor.threeObject.add(this.threeMesh),null==i.getAttribute("normal")&&this.threeMesh.geometry.computeVertexNormals(),this.threeMesh.updateMatrixWorld(!1)}},t.prototype.setCastShadow=function(e){this.castShadow=e,this.threeMesh.castShadow=e},t.prototype.setOpacity=function(e){this.opacity=e,null!=this.material&&(null!=this.opacity?(this.material.transparent=!0,this.material.opacity=this.opacity):(this.material.transparent=!1,this.material.opacity=1),this.material.needsUpdate=!0)},t.prototype.setColor=function(e,t,s){if(this.color.r=e,this.color.g=t,this.color.b=s,this.material instanceof n.ShaderMaterial){var i=this.material.uniforms;null!=i.color&&i.color.value.setRGB(e,t,s)}else this.material.color.setRGB(e,t,s)},t.prototype.setUnitRatio=function(e){if(null!=this.threeMesh){var t=1/e;this.threeMesh.scale.set(t,t,t),this.threeMesh.updateMatrixWorld(!1)}},t.prototype.setShowSkeleton=function(e){if(e!==(null!=this.skeletonHelper)){if(e){if(this.skeletonHelper=new n.SkeletonHelper(this.threeMesh),null!=this.asset.upAxisMatrix){var t=(new n.Matrix4).fromArray(this.asset.upAxisMatrix);this.skeletonHelper.root=this.skeletonHelper,this.skeletonHelper.applyMatrix(t),this.skeletonHelper.update()}this.skeletonHelper.material.linewidth=3,this.actor.threeObject.add(this.skeletonHelper)}else this.actor.threeObject.remove(this.skeletonHelper),this.skeletonHelper=null;null!=this.threeMesh&&this.threeMesh.updateMatrixWorld(!0)}},t.prototype.updateAnimationsByName=function(){for(var e=0,t=this.asset.animations;e<t.length;e++){var s=t[e];this.animationsByName[s.name]=s}},t.prototype.setAnimation=function(e,t){if(void 0===t&&(t=!0),null!=e){var s=this.animationsByName[e];if(null==s)throw new Error("Animation "+e+" doesn't exist");if(s===this.animation&&this.isAnimationPlaying)return;this.animation=s,this.animationLooping=t,this.animationTimer=0,this.isAnimationPlaying=!0}else this.animation=null,this.clearPose()},t.prototype.getAnimation=function(){return null!=this.animation?this.animation.name:null},t.prototype.setAnimationTime=function(e){if("number"!=typeof e||e<0||e>this.getAnimationDuration())throw new Error("Invalid time");this.animationTimer=e*this.actor.gameInstance.framesPerSecond,this.updatePose()},t.prototype.getAnimationTime=function(){return null!=this.animation?this.animationTimer/this.actor.gameInstance.framesPerSecond:0},t.prototype.getAnimationDuration=function(){return null==this.animation||null==this.animation.duration?0:this.animation.duration},t.prototype.playAnimation=function(e){void 0===e&&(e=!0),this.animationLooping=e,this.isAnimationPlaying=!0},t.prototype.pauseAnimation=function(){this.isAnimationPlaying=!1},t.prototype.stopAnimation=function(){null!=this.animation&&(this.isAnimationPlaying=!1,this.animationTimer=0,this.updatePose())},t.prototype.clearPose=function(){if(null!=this.threeMesh&&null!=this.threeMesh.skeleton){for(var e=0;e<this.threeMesh.skeleton.bones.length;e++){var t=this.threeMesh.skeleton.bones[e];t.matrix.fromArray(this.asset.bones[e].matrix),t.matrix.decompose(t.position,t.quaternion,t.scale)}this.threeMesh.updateMatrixWorld(!1),null!=this.skeletonHelper&&this.skeletonHelper.update()}},t.prototype.getBoneTransform=function(e){this.hasPoseBeenUpdated||this._tickAnimation();var t=new n.Vector3,s=new n.Quaternion,i=new n.Vector3;return null==this.bonesByName||null==this.bonesByName[e]?null:(this.bonesByName[e].matrixWorld.decompose(t,s,i),{position:t,orientation:s,scale:i})},t.prototype.updatePose=function(){this.hasPoseBeenUpdated=!0;var e=1,t=this.animationTimer*e/this.actor.gameInstance.framesPerSecond;if(t>this.animation.duration&&(this.animationLooping?(this.animationTimer-=this.animation.duration*this.actor.gameInstance.framesPerSecond/e,t-=this.animation.duration):(t=this.animation.duration,this.isAnimationPlaying=!1)),null!=this.threeMesh.skeleton){for(var s=0;s<this.threeMesh.skeleton.bones.length;s++){var r=this.threeMesh.skeleton.bones[s],n=this.animation.keyFrames[r.name];if(null!=n){if(null!=n.translation){var a=i(n.translation,t),h=a.prevKeyFrame,d=a.nextKeyFrame,u=a.t;r.position.fromArray(h.value),r.position.lerp(o.fromArray(d.value),u)}if(null!=n.rotation){var m=i(n.rotation,t),h=m.prevKeyFrame,d=m.nextKeyFrame,u=m.t;r.quaternion.fromArray(h.value),r.quaternion.slerp(l.fromArray(d.value),u)}if(null!=n.scale){var p=i(n.scale,t),h=p.prevKeyFrame,d=p.nextKeyFrame,u=p.t;r.scale.fromArray(h.value),r.scale.lerp(o.fromArray(d.value),u)}}}this.threeMesh.updateMatrixWorld(!1),null!=this.skeletonHelper&&this.skeletonHelper.update()}},t.prototype.update=function(){if(null!=this.material){var e=this.material.uniforms;null!=e&&(e.time.value+=1/this.actor.gameInstance.framesPerSecond)}return this.hasPoseBeenUpdated?void(this.hasPoseBeenUpdated=!1):(this._tickAnimation(),void(this.hasPoseBeenUpdated=!1))},t.prototype._tickAnimation=function(){null!=this.threeMesh&&null!=this.threeMesh.skeleton&&null!=this.animation&&0!==this.animation.duration&&this.isAnimationPlaying&&(this.animationTimer+=1,this.updatePose())},t.prototype.setIsLayerActive=function(e){null!=this.threeMesh&&(this.threeMesh.visible=e)},t.Updater=h.default,t}(SupEngine.ActorComponent);Object.defineProperty(s,"__esModule",{value:!0}),s.default=d},{"./ModelRendererUpdater":2}],2:[function(e,t,s){var i=function(){function e(e,t,s,i){var r=this;if(this.client=e,this.modelRenderer=t,this.externalSubscriber=i,this.overrideOpacity=!1,this.modelAsset=null,this.onModelAssetReceived=function(e,t){null==r.modelRenderer.opacity&&(r.modelRenderer.opacity=t.pub.opacity),r.prepareMaps(t.pub.textures,function(){r.modelAsset=t,r.setModel(),null!=r.externalSubscriber.onAssetReceived&&r.externalSubscriber.onAssetReceived(e,t)})},this.onModelAssetEdited=function(e,t){for(var s=[],i=2;i<arguments.length;i++)s[i-2]=arguments[i];var n=r.onEditCommands[t];null!=n&&n.apply(r,s),null!=r.externalSubscriber.onAssetEdited&&(a=r.externalSubscriber).onAssetEdited.apply(a,[e,t].concat(s));var a},this.onEditCommands={setModel:function(){r.setModel()},setMaps:function(e){r.prepareMaps(r.modelAsset.pub.textures,function(){r.setModel()})},newAnimation:function(e,t){r.modelRenderer.updateAnimationsByName(),r.playAnimation()},deleteAnimation:function(e){r.modelRenderer.updateAnimationsByName(),r.playAnimation()},setAnimationProperty:function(e,t,s){r.modelRenderer.updateAnimationsByName(),r.playAnimation()},setMapSlot:function(e,t){r.setModel()},deleteMap:function(e){r.setModel()},setProperty:function(e,t){switch(e){case"unitRatio":r.modelRenderer.setUnitRatio(t);break;case"opacity":r.overrideOpacity||r.modelRenderer.setOpacity(t)}}},this.onModelAssetTrashed=function(){r.modelAsset=null,r.modelRenderer.setModel(null)},this.onShaderAssetReceived=function(e,t){r.shaderPub=t.pub,r.setModel()},this.onShaderAssetEdited=function(e,t){for(var s=[],i=2;i<arguments.length;i++)s[i-2]=arguments[i];"editVertexShader"!==t&&"editFragmentShader"!==t&&r.setModel()},this.onShaderAssetTrashed=function(){r.shaderPub=null,r.setModel()},null==this.externalSubscriber&&(this.externalSubscriber={}),this.modelAssetId=s.modelAssetId,this.animationId=s.animationId,this.materialType=s.materialType,this.shaderAssetId=s.shaderAssetId,null!=s.castShadow&&(this.modelRenderer.castShadow=s.castShadow),null!=s.receiveShadow&&(this.modelRenderer.receiveShadow=s.receiveShadow),null!=s.overrideOpacity&&(this.overrideOpacity=s.overrideOpacity,this.overrideOpacity&&(this.modelRenderer.opacity=s.opacity)),null!=s.color){var n=parseInt(s.color,16);this.modelRenderer.color.r=(n>>16&255)/255,this.modelRenderer.color.g=(n>>8&255)/255,this.modelRenderer.color.b=(255&n)/255}this.modelSubscriber={onAssetReceived:this.onModelAssetReceived,onAssetEdited:this.onModelAssetEdited,onAssetTrashed:this.onModelAssetTrashed},this.shaderSubscriber={onAssetReceived:this.onShaderAssetReceived,onAssetEdited:this.onShaderAssetEdited,onAssetTrashed:this.onShaderAssetTrashed},null!=this.modelAssetId&&this.client.subAsset(this.modelAssetId,"model",this.modelSubscriber),null!=this.shaderAssetId&&this.client.subAsset(this.shaderAssetId,"shader",this.shaderSubscriber)}return e.prototype.destroy=function(){null!=this.modelAssetId&&this.client.unsubAsset(this.modelAssetId,this.modelSubscriber),null!=this.shaderAssetId&&this.client.unsubAsset(this.shaderAssetId,this.shaderSubscriber)},e.prototype.prepareMaps=function(e,t){function s(){r--,0===r&&t()}var i=Object.keys(e),r=i.length;return 0===r?void t():void i.forEach(function(t){var i=e[t].image;i.complete?s():i.addEventListener("load",s)})},e.prototype.setModel=function(){return null==this.modelAsset||"shader"===this.materialType&&null==this.shaderPub?void this.modelRenderer.setModel(null):(this.modelRenderer.setModel(this.modelAsset.pub,this.materialType,this.shaderPub),void(null!=this.animationId&&this.playAnimation()))},e.prototype.playAnimation=function(){var e=this.modelAsset.animations.byId[this.animationId];this.modelRenderer.setAnimation(null!=e?e.name:null)},e.prototype.config_setProperty=function(e,t){switch(e){case"modelAssetId":null!=this.modelAssetId&&this.client.unsubAsset(this.modelAssetId,this.modelSubscriber),this.modelAssetId=t,this.modelAsset=null,this.modelRenderer.setModel(null,null),null!=this.modelAssetId&&this.client.subAsset(this.modelAssetId,"model",this.modelSubscriber);break;case"animationId":this.animationId=t,null!=this.modelAsset&&this.playAnimation();break;case"castShadow":this.modelRenderer.setCastShadow(t);break;case"receiveShadow":this.modelRenderer.threeMesh.receiveShadow=t,this.modelRenderer.threeMesh.material.needsUpdate=!0;break;case"overrideOpacity":this.overrideOpacity=t,this.modelRenderer.setOpacity(t?null:this.modelAsset.pub.opacity);break;case"opacity":this.modelRenderer.setOpacity(t);break;case"color":var s=parseInt(t,16);this.modelRenderer.setColor((s>>16&255)/255,(s>>8&255)/255,(255&s)/255);break;case"materialType":this.materialType=t,this.setModel();break;case"shaderAssetId":null!=this.shaderAssetId&&this.client.unsubAsset(this.shaderAssetId,this.shaderSubscriber),this.shaderAssetId=t,this.shaderPub=null,this.modelRenderer.setModel(null),null!=this.shaderAssetId&&this.client.subAsset(this.shaderAssetId,"shader",this.shaderSubscriber)}},e}();Object.defineProperty(s,"__esModule",{value:!0}),s.default=i},{}],3:[function(e,t,s){var i=e("./ModelRenderer");SupEngine.registerComponentClass("ModelRenderer",i.default)},{"./ModelRenderer":1}]},{},[3]);