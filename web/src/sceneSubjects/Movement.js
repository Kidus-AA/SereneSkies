import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export const Box = ({ scene }) => {
    const clock = new THREE.Clock();
    const noise = createNoise2D();

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x1f00ff });
    const box = new THREE.Mesh(geometry, material);

    scene.add(box);

    const mesh = () => {
        return box;
    }

    const animate = () => {
        const time = clock.getElapsedTime();
        const noiseValue = noise(time * 0.1, 0);

        box.position.x = noiseValue * 0.1;
        box.position.y = Math.cos(time) * 0.2;
        box.rotation.y = Math.sin(time) * 0.1;
    }

    return { animate, mesh };
}