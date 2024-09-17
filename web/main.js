import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

// Initialize scene, camera, renderer...
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

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

// Load the MTL file first, then load the OBJ file
const mtlLoader = new MTLLoader();
mtlLoader.load('/Users/kayele/Library/CloudStorage/OneDrive-UHG/Desktop/plans_2025/SereneSkies/web/public/models/airPlane.mlt', (materials) => {
    materials.preload(); // Preload materials

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials); // Apply the materials to the OBJ loader

    objLoader.load('/Users/kayele/Library/CloudStorage/OneDrive-UHG/Desktop/plans_2025/SereneSkies/web/public/models/airPlane.obj', (object) => {
        object.scale.set(4, 4, 4); // Scale down the model if needed
        object.position.set(0, 0, 0); // Center the model
        scene.add(object);
    }, undefined, (error) => {
        console.error('An error occurred loading the OBJ model:', error);
    });
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
