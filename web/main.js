import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

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

const userMovement = ({ camera, plane }) => {
}

const setupScene = ({ scene, camera, controls }) => {
    const globeObj = globe(scene);
    const planeObj = plane(scene);

    // controls.target.copy(planeObj.position);
    camera.position.set(planeObj.position.x, planeObj.position.y, planeObj.position.z + 5);

    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;
    // controls.screenSpacePanning = false;
    // controls.minDistance = 0;
    // controls.maxDistance = 20;
    // controls.maxPolarAngle = Math.PI / 2;

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
    renderer.setSize(window.innerWidth, window.innerHeight);    // can reduce resolution by half to improve performance
    document.body.appendChild(renderer.domElement);

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.listenToKeyEvents(window);

    const { globeObj, planeObj } = setupScene({ scene, camera });

    function animate() {
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop( animate );
}

// make the plane move
// smoother movement from the plane
// lighting
    
if (WebGL.isWebGL2Available()) {
    init();
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.body.appendChild(warning);
}
