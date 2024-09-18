import * as THREE from 'three';

export const AirPlane = ({ scene }) => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x1f00ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const mesh = () => {
        return cube;
    }

    const animate = () => {
        const time = Date.now() * 0.001;

        cube.position.x = Math.sin(time) * 2;
        cube.position.y = Math.cos(time) * 2;
        cube.rotation.y = Math.sin(time) * 2;
    }

    return { animate, mesh };
}