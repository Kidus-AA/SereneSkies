import * as THREE from 'three';
import { SceneSubjects } from './sceneSubjects';
// import { AirPlane } from './sceneSubjects/AirPlane';

export const SceneManager = () => {
    const setupScene = () => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xff00ff);
        return scene;
    }
    
    const setupRender = () => {
        const renderer = new THREE.WebGLRenderer();
    
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.outputEncoding = THREE.sRGBEncoding;
    
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        return renderer;
    }
    
    const setupCamera = () => {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const fieldOfView = 75;
        const nearPlane = 0.1;  // TODO: Play around with these values
        const farPlane = 1000; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    
        return camera;
    }
    
    
    const createSceneSubjects = ({ scene }) => {
        const sceneSubjects = {
            airPlaneSubject: SceneSubjects.AirPlane({ scene }),
        };

        return sceneSubjects;
    }

    const scene = setupScene();
    const renderer = setupRender();
    const camera = setupCamera();
    const sceneSubjects = createSceneSubjects({ scene});

    scene.add( new THREE.GridHelper() );
    scene.add( new THREE.AxesHelper( 10 ) );

    const animate = () => {
        const { airPlaneSubject } = sceneSubjects;
        Object.keys(sceneSubjects).forEach((sceneSubject) => {
            sceneSubjects[sceneSubject].animate();    
        })

        const airPlane = airPlaneSubject.mesh();

        const offset = new THREE.Vector3(0, 4, 4);
        offset.applyQuaternion(airPlane.quaternion);  // Rotate the offset with the cube's orientation
        camera.position.copy(airPlane.position).add(offset);  // Set camera position relative to cube    

        camera.lookAt(airPlane.position);
        renderer.render(scene, camera);
    }

    return { animate };
}
