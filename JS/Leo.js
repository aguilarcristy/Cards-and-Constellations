import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, mixer;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffa3cc);
    // scene.background = null;
    const light = new THREE.DirectionalLight(0xfffff, 5);
    light.position.set(1, 1, 5);
    scene.add(light);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 1;
}

function animate() {
        requestAnimationFrame(animate);
    
        if (scene) {
            scene.rotation.y += 0.01; // Adjust the rotation speed as needed
        }
            if (mixer) {
            mixer.update(0.016); // Adjust time delta as needed (0.016 corresponds to 60 fps)
        }
    
        renderer.render(scene, camera);
    }


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    moveCamera(); 
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    console.log("t:", t);
    camera.position.z = t * 0.01; 
    console.log("camera position z:", camera.position.z);
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();

document.body.onscroll = moveCamera; 

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();
loader.load('Assets/Leo.glb', function (gltf) {
    const card = gltf.scene;
    scene.add(card);

});
