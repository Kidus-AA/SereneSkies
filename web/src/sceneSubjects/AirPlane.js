import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export const AirPlane = ({ scene }) => {
    const clock = new THREE.Clock();
    const noise = createNoise2D();

    // movement variables
    const speed = 0.02;
    const rotationSpeed = 0.01;
    const tiltSpeed = 0.01;

    const rotationXSpeed = 0.02;  // Controls the speed of upward rotation (S key)
    const flipThreshold = Math.PI / 2;  // Flip threshold for nose up or down

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
        s: false,
    }
    setEventListeners({ keys });

    const animate = () => {
        const time = clock.getElapsedTime();
        const noiseValue = noise(time * 0.1, 0);

        airPlane.position.x += noiseValue * 0.001;
        airPlane.position.y += Math.cos(time) * 0.001;
        airPlane.rotation.y += Math.sin(time) * 0.001;

        // Forward movement
        if (keys.w) {
            const forward = new THREE.Vector3(0, 0, -1);
            forward.applyQuaternion(airPlane.quaternion);
            forward.multiplyScalar(speed);
            airPlane.position.add(forward);
        }

        // Rotation and tilting when turning left (A) or right (D)
        if (keys.a && keys.w) {
            // Rotate left and tilt left
            airPlane.rotation.y += rotationSpeed;
            airPlane.rotation.z = THREE.MathUtils.lerp(airPlane.rotation.z, Math.PI / 3, tiltSpeed); // Smooth left tilt
        } else if (keys.d && keys.w) {
            // Rotate right and tilt right
            airPlane.rotation.y -= rotationSpeed;
            airPlane.rotation.z = THREE.MathUtils.lerp(airPlane.rotation.z, -Math.PI / 3, tiltSpeed); // Smooth right tilt
        } else {
            // Smoothly reset tilt to neutral when no turning key is pressed
            airPlane.rotation.z = THREE.MathUtils.lerp(airPlane.rotation.z, 0, 0.03);
        }
    }

    return { animate, mesh };
}

const setEventListeners = ({ keys }) => {
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
            case 's':
                keys.s = true;
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
            case 's':
                keys.s = false;
                break;
        }
    });
}