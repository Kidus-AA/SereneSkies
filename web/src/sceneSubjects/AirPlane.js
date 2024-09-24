import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export const AirPlane = ({ scene }) => {
    const clock = new THREE.Clock();
    const noise = createNoise2D();

    // movement variables
    const speed = 0.02;
    const rotationSpeed = 0.01;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x1f00ff });
    const airPlane = new THREE.Mesh(geometry, material);

    scene.add(airPlane);

    const mesh = () => {
        return airPlane;
    }

    const keys = {
        w: false,
        a: false,
        d: false,
    }

    // Add event listeners for keydown and keyup
    window.addEventListener('keydown', (event) => {
        switch (event.key.toLowerCase()) {
            case 'w':
                keys.w = true;
                break;
            case 'a':
                keys.a = true;
                break;
            case 'd':
                keys.d = true;
                break;
        }
    });

    window.addEventListener('keyup', (event) => {
        switch (event.key.toLowerCase()) {
            case 'w':
                keys.w = false;
                break;
            case 'a':
                keys.a = false;
                break;
            case 'd':
                keys.d = false;
                break;
        }
    });

    const animate = () => {
        const time = clock.getElapsedTime();
        const noiseValue = noise(time * 0.1, 0);

        airPlane.position.x += noiseValue * 0.001;
        airPlane.position.y += Math.cos(time) * 0.001;
        airPlane.rotation.y += Math.sin(time) * 0.001;

        if (keys.w) {
            const forward = new THREE.Vector3(0, 0, -1);
            forward.applyQuaternion(airPlane.quaternion);
            forward.multiplyScalar(speed);
            airPlane.position.add(forward);
        }

        if (keys.a) {
            airPlane.rotation.y += rotationSpeed;
        } else if(keys.d) {
            airPlane.rotation.y -= rotationSpeed;
        }

    }

    return { animate, mesh };
}