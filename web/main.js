import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const animation = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);    // can reduce resolution by half to improve performance
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop( animate );
}


// create the scene first
    // globe with water
    // sun (some type of light source)
    // moon (some type of light source) depends on time of day
    // a small object (simulate what the plane would be)
    // clouds (particles)

    
if (WebGL.isWebGL2Available()) {
    animation();
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.body.appendChild(warning);
}
