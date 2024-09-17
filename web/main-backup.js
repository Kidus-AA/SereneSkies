import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

// procedural generation of a globe

const globe = (scene) => {
    const geometry = new THREE.SphereGeometry(2, 32, 16);
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    return sphere;
}

const plane = (scene) => {
    const geometry = new THREE.CylinderGeometry(0, 1, 2, 8);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(4, 0, 0);
    plane.rotation.set(Math.PI / 2, 0, Math.PI);
    scene.add(plane);
    return plane;
}

// Maximum rotation angle
const maxRotationRight = Math.PI / 2; // Maximum rotation angle
const maxRotationLeft = (3 * Math.PI) / 2; // Test rotation angle

const userMovement = ({ camera, plane, controls, keys }) => {
    const speed = 0.1; // Movement speed
    const rotationSpeed = 0.05; // Rotation speed

    // Handle movement based on key presses
    if (keys['w']) plane.position.z -= speed;
    if (keys['s']) plane.position.z += speed;
    // rotate plane up instead
    if (keys['a']) {
        if (plane.rotation.z - rotationSpeed >= maxRotationRight) {
            plane.rotation.z -= rotationSpeed; // Rotate left
        } else {
            plane.rotation.z = maxRotationRight; // Cap at maxRotation
        }
    }
    if (keys['d']) {
        if (plane.rotation.z + rotationSpeed <= maxRotationLeft) {
            plane.rotation.z += rotationSpeed; // Rotate right
        } else {
            plane.rotation.z = maxRotationLeft; // Cap at -maxRotation
        }
    }

    // Update camera position to follow plane
    // camera.position.set(plane.position.x, plane.position.y + 2, plane.position.z + 5);
    camera.lookAt(plane.position);

    // Update controls target to follow the plane
    // if (controls) {
        controls.target.copy(plane.position);
        controls.update();
    // }
}

const setupScene = ({ scene, camera, controls }) => {
    const globeObj = globe(scene);
    const planeObj = plane(scene);

    // Initialize camera position
    camera.position.set(planeObj.position.x, planeObj.position.y + 2, planeObj.position.z + 5);
    camera.lookAt(planeObj.position);

    // Set up ambient and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 3, 0);
    scene.add(directionalLight);

    // Optional controls setup
    if (controls) {
        controls.target.copy(planeObj.position);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 0;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2;
        controls.update(); // Ensure initial setup is correct
    }

    return { globeObj, planeObj };
}

const init = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87CEEB); // Light blue background color
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);

    const { globeObj, planeObj } = setupScene({ scene, camera, controls });

    // Key press management
    const keys = {};
    window.addEventListener('keydown', (event) => keys[event.key] = true);
    window.addEventListener('keyup', (event) => keys[event.key] = false);

    // Enable/Disable OrbitControls based on mouse events
    const handleMouseDown = () => controls.enabled = true;
    const handleMouseUp = () => controls.enabled = false;

    // window.addEventListener('mousedown', handleMouseDown);
    // window.addEventListener('mouseup', handleMouseUp);
    // window.addEventListener('mouseleave', handleMouseUp); // Handle case when mouse leaves the window

    function animate() {
        userMovement({ camera, plane: planeObj, controls, keys });
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
}

if (WebGL.isWebGL2Available()) {
    init();
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.body.appendChild(warning);
}
