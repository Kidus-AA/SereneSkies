import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff00ff);

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 4 );

// Create renderer
const renderer = new THREE.WebGLRenderer();

// Set renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Add renderer to the DOM
document.body.appendChild(renderer.domElement);

// Create light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

scene.add( new THREE.GridHelper() );

// Create box
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x1f00ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;

    // Rotate the cube
    cube.position.x = Math.sin(time) * 2;
    cube.position.y = Math.cos(time) * 2;

    cube.rotation.y = Math.sin(time) * 2;

    // camera.position.x = Math.sin(time) * 2;
    // // camera.position.y = Math.cos(time) * 2;
    // camera.rotation.y = Math.sin(time) * 2;


    const offset = new THREE.Vector3(0, 4, 4);  // Position offset from the cube
    offset.applyQuaternion(cube.quaternion);  // Rotate the offset with the cube's orientation
    camera.position.copy(cube.position).add(offset);  // Set camera position relative to cube


    camera.lookAt(cube.position);

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
