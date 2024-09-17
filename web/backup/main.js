import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Initialize scene, camera, renderer...
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5); // Adjust camera position

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB); // Light blue background color
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Load the GLB model using GLTFLoader
const loader = new GLTFLoader();
loader.load('/airplane.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5); // Adjust the scale if needed
    model.position.set(0, 0, 0); // Center the model
    scene.add(model);
}, undefined, (error) => {
    console.error('An error occurred loading the GLB model:', error);
});

// Animation loop...
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
