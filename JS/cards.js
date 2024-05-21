import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, mixer, raycaster, cards;
let model;
let Name;
let Aries;
let Taurus;
let Gemini;
let Cancer;
let Leo;
let Virgo;
let Libra;
let Scorpio;
let Sagittarius;
let Capricorn;
let Aquarius;
let Pisces;


function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffa3cc);
    const light = new THREE.DirectionalLight(0xfffff, 5);
    light.position.set(1, 1, 5);
    scene.add(light);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    // ORIGINAL CODE - Line 31
    // renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 0;
}

function animate() {
    requestAnimationFrame(animate);
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


const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// loader.load('Assets/Animated_Cards.glb', function (gltf) {
//     cards = gltf.scene;
//     scene.add(cards);
//     mixer = new THREE.AnimationMixer(cards);
//     const clips = gltf.animations;
//     const clip = THREE.AnimationClip.findByName(clips, 'ArrowAction'); // Make sure that animation is called correctly!
//     if (clip) {
//         const action = mixer.clipAction(clip);
//         action.play();
//     } else {
//         console.error('Animation clip not found.');
//     }
// });

document.body.appendChild( renderer.domElement );

// CALLING SEPARATE CARDS WITHIN MODEL CODE?    
loader.load('Assets/Animated_Cards.glb', (gltf) => {
cards = gltf.scene;
    
Aries = cards.getObjectByName('1Aries');
Taurus = cards.getObjectByName('2Taurus');
Gemini = cards.getObjectByName('3Gemini');
Cancer = cards.getObjectByName('4Cancer');
Leo = cards.getObjectByName('5Leo');
Virgo = cards.getObjectByName('6Virgo');
Libra = cards.getObjectByName('7Libra');
Scorpio = cards.getObjectByName('8Scorpio');
Sagittarius = cards.getObjectByName('9Sagittarius');
Capricorn = cards.getObjectByName('10Capricorn');
Aquarius = cards.getObjectByName('11Aquarius');
Pisces = cards.getObjectByName('12Pisces');
Name = cards.getObjectByName('Name');
scene.add(cards);
raycaster = new THREE.Raycaster();

    mixer = new THREE.AnimationMixer(cards);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'ArrowAction'); // Make sure that animation is called correctly!
    if (clip) {
        const action = mixer.clipAction(clip);
        action.play();
    } else {
        console.error('Animation clip not found.');
    }

}
);

function onDocumentMouseDown(event) {
    event.preventDefault();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(cards.children, true); // Use cards.children instead of scene.children

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const cardName = intersectedObject.name;
        const link = getLinkForCard(cardName);
        if (link) {
            window.open(link, '_blank');
        }
    }
}

function getLinkForCard(cardName) {
    const cardLinks = {
        'Aries': 'https://www.allure.com/story/aries-zodiac-sign-personality-traits',
        'Taurus': 'https://www.allure.com/story/taurus-zodiac-sign-personality-traits',
        'Gemini': 'https://www.allure.com/story/gemini-zodiac-sign-personality-traits',
        'Cancer': 'https://www.allure.com/story/cancer-zodiac-sign-personality-traits',
        'Leo': 'https://www.allure.com/story/leo-zodiac-sign-personality-traits',
        'Virgo': 'https://www.allure.com/story/virgo-zodiac-sign-personality-traits',
        'Libra': 'https://www.allure.com/story/libra-zodiac-sign-personality-traits',
        'Scorpio': 'https://www.allure.com/story/scorpio-zodiac-sign-personality-traits',
        'Sagittarius': 'https://www.allure.com/story/sagittarius-zodiac-sign-personality-traits',
        'Capricorn': 'https://www.allure.com/story/capricorn-zodiac-sign-personality-traits',
        'Aquarius': 'https://www.allure.com/story/aquarius-zodiac-sign-personality-traits',
        'Pisces': 'https://www.allure.com/story/pisces-zodiac-sign-personality-traits'
    };

    // Return the link for the given card name
    return cardLinks[cardName];
}
