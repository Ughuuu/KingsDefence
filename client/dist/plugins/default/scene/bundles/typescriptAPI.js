"use strict";!function n(e,t,o){function r(c,s){if(!t[c]){if(!e[c]){var i="function"==typeof require&&require;if(!s&&i)return i(c,!0);if(a)return a(c,!0);var p=new Error("Cannot find module '"+c+"'");throw p.code="MODULE_NOT_FOUND",p}var l=t[c]={exports:{}};e[c][0].call(l.exports,function(n){var t=e[c][1][n];return r(t?t:n)},l,l.exports,n,e,t,o)}return t[c].exports}for(var a="function"==typeof require&&require,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(n,e,t){SupCore.system.registerPlugin("typescriptAPI","Sup.Scene",{code:'namespace Sup {\n  const tmpVector3 = new SupEngine.THREE.Vector3();\n  const tmpQuaternion = new SupEngine.THREE.Quaternion();\n\n  export class Scene extends Asset {}\n\n  export function loadScene(pathOrAsset) {\n    player.gameInstance.destroyAllActors();\n    appendSceneInternal(pathOrAsset);\n  }\n  \n  export function appendScene(pathOrAsset: string|Scene, parent?: Actor) {\n    return appendSceneInternal(pathOrAsset, parent);\n  }\n\n  function appendSceneInternal(pathOrAsset: string|Scene, rootParentActor?: Actor, prefabNode?: any): any {\n    const sceneAsset = (typeof pathOrAsset === "string") ? get(pathOrAsset, Scene) : pathOrAsset as Scene;\n\n    const actors: Actor[] = [];\n    let allComponents = [];\n\n    const walk = (node, parentActor) => {\n      let actor: Actor;\n      if (node.prefab != null) {\n        const prefabAsset = player.getOuterAsset(node.prefab.sceneAssetId);\n        if (prefabAsset != null) {\n          const result = appendSceneInternal(prefabAsset, parentActor, node);\n          actor = result.actors[0];\n          allComponents = allComponents.concat(result.allComponents);\n        } else throw new Error(`The prefab "${node.name}" in scene "${sceneAsset.name} has no scene defined.`);\n      } else {\n        actor = player.createActor(node.name, parentActor, { visible: node.visible, layer: node.layer });\n\n        if (prefabNode != null && parentActor === rootParentActor) {\n          actor.__inner.name = prefabNode.name;\n          actor.__inner.threeObject.visible = prefabNode.visible;\n\n          tmpVector3.set(node.position.x, node.position.y, node.position.z).add(prefabNode.position);\n          actor.__inner.setLocalPosition(tmpVector3);\n\n          const localOrientation = new SupEngine.THREE.Quaternion(node.orientation.x, node.orientation.y, node.orientation.z, node.orientation.w);\n          tmpQuaternion.set(prefabNode.orientation.x, prefabNode.orientation.y, prefabNode.orientation.z, prefabNode.orientation.w);\n          actor.__inner.setLocalOrientation(tmpQuaternion.multiply(localOrientation));\n\n          tmpVector3.set(node.scale.x, node.scale.y, node.scale.z).multiply(prefabNode.scale);\n          actor.__inner.setLocalScale(tmpVector3);\n        } else {\n          actor.__inner.setLocalPosition(tmpVector3.set(node.position.x, node.position.y, node.position.z));\n          actor.__inner.setLocalOrientation(tmpQuaternion.set(node.orientation.x, node.orientation.y, node.orientation.z, node.orientation.w));\n          actor.__inner.setLocalScale(tmpVector3.set(node.scale.x, node.scale.y, node.scale.z));\n        }\n\n        node.components.forEach((sceneComponent) => {\n          allComponents.push({\n            sceneComponent: sceneComponent,\n            actorComponent: player.createComponent(sceneComponent.type, actor, sceneComponent.config)\n          });\n        });\n\n        actor.__inner.awoken = false;\n        node.children.forEach((child) => { walk(child, actor); });\n      }\n\n      return actor;\n    }\n    sceneAsset.__inner.nodes.forEach((node) => { actors.push(walk(node, rootParentActor)); });\n\n    if (prefabNode != null) return { actors, allComponents };\n\n    allComponents.forEach((x) => {\n      SupRuntime.plugins[x.sceneComponent.type].setupComponent(player, x.actorComponent.__inner, x.sceneComponent.config);\n    });\n\n    const awakeActor = (actor) => {\n      if (actor.__inner.awoken) return;\n\n      actor.__inner.awoken = true;\n      actor.__inner.awake();\n      actor.getChildren().forEach((child) => { awakeActor(child); });\n    }\n    actors.forEach((actor) => { awakeActor(actor); });\n    return actors;\n  }\n}',defs:"declare namespace Sup {\n  function loadScene(sceneAsset: Scene): void;\n  function loadScene(sceneAssetPath: string): void;\n  function appendScene(sceneAsset: Scene, parent?: Actor): Actor[];\n  function appendScene(sceneAssetPath: string, parent?: Actor): Actor[];\n\n  class Scene extends Asset {\n    dummySceneMember;\n  }\n}\n"})},{}]},{},[1]);