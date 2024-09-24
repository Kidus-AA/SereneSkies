import * as THREE from 'three';

export const World = ({ scene }) => {
    const clock = new THREE.Clock();
    const noise = createNoise2D();

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x1f00ff });
    const airPlane = new THREE.Mesh(geometry, material);

    scene.add(airPlane);

    const mesh = () => {
        return airPlane;
    }

    const animate = () => {
        const time = clock.getElapsedTime();
        const noiseValue = noise(time * 0.1, 0);

        airPlane.position.x = noiseValue * 0.1;
        airPlane.position.y = Math.cos(time) * 0.2;
        airPlane.rotation.y = Math.sin(time) * 0.1;
    }

    return { animate, mesh };
}