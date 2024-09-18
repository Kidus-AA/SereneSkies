import { SceneManager } from './sceneManager';

const sceneManager = SceneManager();

const render = () => {
    requestAnimationFrame(render);
    sceneManager.animate();
}

render();