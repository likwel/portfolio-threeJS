import '/style.css';
import bg from '/public/images/herobg.png';
console.log("ettollll");
import * as THREE from "/node_modules/three/build/three.module.js";
// import * as dat from 'dat.gui';
// import gsap from 'gsap';
// import Stats from 'three/addons/libs/stats.module.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from '/node_modules/three/examples/jsm/loaders/DRACOLoader';
import { FontLoader } from '/node_modules/three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '/node_modules/three/examples/jsm/geometries/TextGeometry.js';
// Debug
// const gui = new dat.GUI()

// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01,1000);

// scene.add(camera)

const container = document.querySelector(".three_bg")

// Loader texture
const loader_bg = new THREE.TextureLoader();


const renderer = new THREE.WebGL1Renderer()

//renderer.setClearColor("white");

renderer.setSize(window.innerWidth, window.innerHeight)
container.appendChild(renderer.domElement)

// Objects
const geometry = new THREE.PlaneGeometry(16,9,16,9);


// Materials
const material = new THREE.MeshBasicMaterial({
  map : loader_bg.load(bg),
  // color: 0xfff888,
})

// Mesh
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

camera.position.z = 5

const count = geometry.attributes.position.count
const clock = new THREE.Clock()

function animate() {
  const time = clock.getElapsedTime()
  for(let i=0;i<count;i++){
    const x = geometry.attributes.position.getX(i)
    const y = geometry.attributes.position.getY(i)

    const anim1 = 0.25 * Math.sin(x + time*0.7)
    const anim2 = 0.35 * Math.sin(x*1 + time*0.7)

    geometry.attributes.position.setZ(i,anim1+anim2)
    geometry.computeVertexNormals()
    geometry.attributes.position.needsUpdate = true
  }
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

//animate()


/** TEXT ANIMATION */

let titleText = null;


function loadFirstText() {
    
  const loader_text = new FontLoader();

  loader_text.load('fonts/helvatica.json', function (font) {
    const textMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x3FA7D6, flatShading: true }),
      new THREE.MeshPhongMaterial({ color: 0xffffff }),
    ];
    const titleGeo = new TextGeometry('Bienvenu dans mon bureau', {
      font: font,
      size: 0.06,
      height: 0.01,
    });

    console.log("atto");

    titleText = new THREE.Mesh(titleGeo, textMaterials);
    titleText.color = 0xffffff
    titleText.rotation.y = Math.PI * 0.5;
    titleText.position.set(-0.27, 0.7, 0.5);
    scene.add(titleText);
  });
}



const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load(
  // 'models/portfolio_nom_modif.glb',
  'models/room.gltf',
  function (room) {
    // hide loader on loade
    //scene.add(room.scene);
    animate();

    console.log(room.scene.children)


    // loadFirstText();

  },
  function (error) {
    console.error(error);
  }
);

document.querySelectorAll("body > header.hd_right > div > a").forEach(menu=>{
  menu.addEventListener("click",function(){

    let href = menu.getAttribute("href")

    if(href == "#home"){
      document.querySelector("#home").style.display = ""
      document.querySelector("#news").style.display = "none"
      document.querySelector("#contact").style.display = "none"

    }else if(href == "#news"){
      document.querySelector("#news").style.display = ""
      document.querySelector("#home").style.display = "none"
      document.querySelector("#contact").style.display = "none"
    }else{
      document.querySelector("#contact").style.display = ""
      document.querySelector("#news").style.display = "none"
      document.querySelector("#home").style.display = "none"
    }

  })
})
