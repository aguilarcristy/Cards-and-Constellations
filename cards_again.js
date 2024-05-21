import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';


let scene, camera, renderer, planesGroup;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffa3cc);

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(1, 1, 5);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    createPlanes();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createPlanes() {
    planesGroup = new THREE.Group();

    const textureLoader = new TextureLoader();

    for (let i = 0; i < 12; i++) {
        const texture = textureLoader.load(`Assets/Scorpio_Scorpion${i}.png`);
        const geometry = new PlaneGeometry(1, 1); // Adjust the size as needed
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);

        // Calculate positions in a circle
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3; // Adjust the radius as needed
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        plane.position.set(x, y, 0);

        plane.lookAt(new THREE.Vector3()); // Make the plane face the center of the circle

        planesGroup.add(plane);
    }

    scene.add(planesGroup);

    // Raycasting setup
    document.addEventListener('mousedown', onDocumentMouseDown);
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planesGroup.children, true);

    if (intersects.length > 0) {
        // Open a new page or perform any action when a plane is clicked
        window.open('your_page_url', '_blank');
    }
}

init();
animate();
