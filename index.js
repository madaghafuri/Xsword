import * as THREE from './node_modules/three/build/three.module.js';
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import {Ground, Head, Body, RightArm, LeftArm, RightLeg, LeftLeg, AmbientLight, DirectionalLight, Shield} from './components.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let scene, tpsCamera, renderer, freeCamera, activeCamera, passiveCamera, tempCamera;
let control;
let ambientLight, directionalLight;
let ground;
let head, body, rightarm, leftarm, rightleg, leftleg, character;
let loader, shield;
let texture;

function initialize(){
  scene = new THREE.Scene();

  tpsCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
  tpsCamera.position.set(0, 5, 50)
  tpsCamera.lookAt(0, 5, 0);
  
  freeCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
  freeCamera.position.set(0, 5, 200)
  freeCamera.lookAt(0, 5, 0);

  activeCamera = tpsCamera;
  passiveCamera = freeCamera;

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    color: 0x303030
  })
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;
  

  control = new OrbitControls(activeCamera, renderer.domElement);

  ambientLight = AmbientLight();
  directionalLight = DirectionalLight();

  for(let i = 0; i<7; i++){
    for(let j = 0; j<10; j++){
      if(j == 4 || j == 5){
        ground = Ground();
        ground.position.set((j - 4.5)*10, -3.5, (i - 1.5)*10);
        scene.add(ground);
      }else{
        ground = Ground();
        ground.position.set((j - 4.5)*10, (Math.floor(Math.random() * 3) - 3), (i - 1.5)*10);
        scene.add(ground);
      }
    }
  }

  head = Head();
  body = Body();
  rightarm = RightArm();
  leftarm = LeftArm();
  rightleg = RightLeg();
  leftleg = LeftLeg();
  

  let fontloader = new THREE.FontLoader();
  fontloader.load('./node_modules/three/examples/fonts/helvetiker_regular.typeface.json', font => {
    let geo = new THREE.TextGeometry("Click the shield \n to break it!", {
      font: font,
      size: 0.5,
      height: 0.5
    });
    let material = new THREE.MeshPhongMaterial({
      color: 'black'
    });
    let mesh = new THREE.Mesh(geo, material);
    mesh.position.set(12, 8, -30);
    mesh.rotation.set(0, -Math.PI/8, 0);
    scene.add(mesh)
  })
  loader = new GLTFLoader();
  loader.load(
    './assets/3dmodel/model.gltf',
    sword => {
      sword.scene.position.set(0, 8, -30)
      sword.scene.rotation.set(Math.PI/2, 0, Math.PI/2);
      sword.scene.scale.set(0.01, 0.005, 0.005)
      scene.add(sword.scene);
      console.log(sword.scene);
    },
    xhr => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    err => {
      console.log(err);
    }
  )
  shield = Shield();
  shield.visible = true;
  console.log(loader);

  scene.background = new THREE.CubeTextureLoader()
  .setPath('./assets/skybox/')
  .load([
    'daylight_box_right.jpg',
    'daylight_box_left.jpg',
    'daylight_box_top.jpg',
    'daylight_box_bottom.jpg',
    'daylight_box_front.jpg',
    'daylight_box_back.jpg',
  ])
  
  document.addEventListener('keydown', onKeyDown, false)
  document.body.appendChild(renderer.domElement)
}

function onKeyDown(event){
  console.log(event.key)
  switch(event.key){
    case 'w':
      if(head.position.z == -20){
        break;
      }else {
        head.position.z -= 0.5;
        body.position.z -= 0.5;
        rightarm.position.z -= 0.5;
        leftarm.position.z -= 0.5;
        rightleg.position.z -= 0.5;
        leftleg.position.z -= 0.5;
        break;
      }
    case 'a':
      head.position.x -= 0.5;
      body.position.x -= 0.5;
      rightarm.position.x -= 0.5;
      leftarm.position.x -= 0.5;
      rightleg.position.x -= 0.5;
      leftleg.position.x -= 0.5;
      break;
    case 's':
      head.position.z += 0.5;
      body.position.z += 0.5;
      rightarm.position.z += 0.5;
      leftarm.position.z += 0.5;
      rightleg.position.z += 0.5;
      leftleg.position.z += 0.5;
      break;
    case 'd':
      head.position.x += 0.5;
      body.position.x += 0.5;
      rightarm.position.x += 0.5;
      leftarm.position.x += 0.5;
      rightleg.position.x += 0.5;
      leftleg.position.x += 0.5;
      break;
    case ' ':
      if(activeCamera == tpsCamera){
        // passiveCamera = activeCamera;
        activeCamera = freeCamera;
      }else if(activeCamera == freeCamera){
        // passiveCamera = activeCamera;
        activeCamera = tpsCamera;
      }
      break;
  }
}

function addComponent(){
  scene.add(head);
  scene.add(body);
  scene.add(rightarm);
  scene.add(leftarm);
  scene.add(rightleg);
  scene.add(leftleg);
  scene.add(ambientLight);
  scene.add(directionalLight);
  scene.add(shield)
}



window.onload = () => {
  initialize()
  rendering()
  addComponent()
}

function rendering(){
  renderer.render(scene, activeCamera)
  requestAnimationFrame(rendering)
  control.update();
  
}

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener("click", shieldVanish, false);

function shieldVanish(){
  if(head.position.z == -20 && shield.visible == true){
    shield.visible = false;
  }else if(head.position.z == -20 && shield.visible == false){
    shield.visible = true;
  }
}