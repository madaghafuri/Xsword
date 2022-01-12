import * as THREE from './node_modules/three/build/three.module.js';
import {GLTFLoader} from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'


export const AmbientLight = () => {
  const light = new THREE.AmbientLight(0xFFFFFF, 1);
  return light;
}

export const DirectionalLight = () => {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10,10,10);
  light.castShadow = true;
  light.shadow.mapSize.width = 5120;
  light.shadow.mapSize.height = 5120;
  // light.shadowCameraLeft = -100;
  // light.shadowCameraRight = 100;
  // light.shadowCameraTop = 100;
  // light.shadowCameraBottom = -100;
  return light
}

export const Ground = () => {
  const geo = new THREE.BoxGeometry(10, 1, 10);
  const material = new THREE.MeshPhongMaterial({
    color: 'grey',
    opacity: 0.5,
    transparent: true,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geo, material);
  mesh.receiveShadow = true;
  return mesh
}

export const Head = () => {
  const geo = new THREE.OctahedronGeometry(2);
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000
  })
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(0, 0.3, -1.5)
  mesh.castShadow = true;
  return mesh
}

export const Body = () => {
  const geo = new THREE.SphereGeometry(2, 30, 30);
  const material = new THREE.MeshPhongMaterial({
    color: 0xD4AF37
  })
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(0, 0, 0);
  mesh.castShadow = true;
  return mesh
}

export const RightArm = () => {
  const geo = new THREE.SphereGeometry(0.8, 30, 30)
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000
  })
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(3, -0.5, 0)
  mesh.rotation.set(0, 0, 1);
  mesh.castShadow = true;
  return mesh;
}

export const LeftArm = () => {
  const geo = new THREE.SphereGeometry(0.8, 30, 30)
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000
  })
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(-3, -0.5, 0)
  mesh.rotation.set(0, 0, 1);
  mesh.castShadow = true;
  return mesh;
}

export const RightLeg = () => {
  const geo = new THREE.CylinderGeometry(0.5, 1, 0.5, 50);
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000
  })
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(1.5, -2.5, 0)
  mesh.castShadow = true;
  return mesh
}

export const LeftLeg = () => {
  const geo = new THREE.CylinderGeometry(0.5, 1, 0.5, 50);
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000
  })
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(-1.5, -2.5, 0)
  mesh.castShadow = true;
  return mesh
}

export const Shield = () => {
  const geo = new THREE.CylinderGeometry(10, 10, 100, 50);
  const texture = new THREE.TextureLoader().load('./assets/textures/zone.png');
  texture.wrapT = THREE.RepeatWrapping
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.set(10, 10)
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000FF,
    side: THREE.FrontSide,
    opacity: 0.5,
    transparent: true,
    normalMap: texture
  })
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(0, 0, -30);
  return mesh
}

