import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const globe = (scene) => {
    const geometry = new THREE.SphereGeometry(2, 32, 16);
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    return sphere;
}

const plane = (scene) => {
    const geometry = new THREE.CylinderGeometry(0, 1, 2, 8); // Simple cylinder as the plane
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(4, 0, 0);
    plane.rotation.set(Math.PI / 2, 0, Math.PI);
    scene.add(plane);
    return plane;
}

const userMovement = ({ camera, plane, keys }) => {
    const speed = 0.05; // Movement speed
    const rotationSpeed = 0.005; // Smooth rotation speed

    // Handle movement based on key presses
    let moving = false;

    // Move forward/backward based on plane's current rotation
    if (keys['w']) {
        plane.position.z -= Math.cos(plane.rotation.z) * speed;
        plane.position.x -= Math.sin(plane.rotation.z) * speed;
        moving = true;
    }
    if (keys['s']) {
        plane.position.z += Math.cos(plane.rotation.z) * speed;
        plane.position.x += Math.sin(plane.rotation.z) * speed;
        moving = true;
    }

    // Rotate plane left/right smoothly
    if (keys['a']) {
        plane.rotation.z += rotationSpeed; // Rotate plane left
        moving = true;
    }
    if (keys['d']) {
        plane.rotation.z -= rotationSpeed; // Rotate plane right
        moving = true;
    }

    // Always lock the camera behind the plane, and make it look at the center of the base
    if (moving) {
        // Define the camera's position relative to the plane (behind the base and above slightly)
        const cameraOffset = new THREE.Vector3(0, 1, 6); // Offset behind and above the plane

        // Calculate the camera's new position based on the plane's current orientation
        const cameraPosition = new THREE.Vector3().copy(cameraOffset).applyAxisAngle(
            new THREE.Vector3(0, 1, 0), plane.rotation.z
        );
        camera.position.copy(plane.position).add(cameraPosition);

        // Ensure the camera is always looking at the base of the plane (center of the circular base)
        const baseOfPlane = new THREE.Vector3(plane.position.x, plane.position.y - 1, plane.position.z);
        camera.lookAt(baseOfPlane);
    }
}

const setupScene = ({ scene, camera }) => {
    const globeObj = globe(scene);
    const planeObj = plane(scene);

    // Initialize camera position
    camera.position.set(planeObj.position.x, planeObj.position.y + 2, planeObj.position.z + 6); // Start behind and above the plane
    const baseOfPlane = new THREE.Vector3(planeObj.position.x, planeObj.position.y - 1, planeObj.position.z); // Base of the plane
    camera.lookAt(baseOfPlane); // Camera looks at the base of the plane

    // Set up ambient and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 3, 0);
    scene.add(directionalLight);

    return { globeObj, planeObj };
}

const init = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87CEEB); // Light blue background color
    document.body.appendChild(renderer.domElement);

    const { globeObj, planeObj } = setupScene({ scene, camera });

    // Key press management
    const keys = {};
    window.addEventListener('keydown', (event) => keys[event.key.toLowerCase()] = true);
    window.addEventListener('keyup', (event) => keys[event.key.toLowerCase()] = false);

    function animate() {
        userMovement({ camera, plane: planeObj, keys });

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
