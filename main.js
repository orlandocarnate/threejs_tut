let scene, camera, renderer, cube, clock, delta, spotLight;

function init() {

    // clock = new THREE.Clock();

    scene = new THREE.Scene();

    // create new camera with FOV, aspect ratio, Near clipping, Far clipping parameters
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // LIGHTS

    scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

    spotLight = new THREE.SpotLight(0xffffbb, 2);
    spotLight.position.set(0.5, 0, 1);
    spotLight.position.multiplyScalar(700);
    scene.add(spotLight);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;

    spotLight.shadow.camera.near = 200;
    spotLight.shadow.camera.far = 1500;

    spotLight.shadow.camera.fov = 40;

    spotLight.shadow.bias = - 0.005;

    //

    // --- Cube mesh ---
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({
    //     color: 0x00ff00
    // });

    const texture = new THREE.TextureLoader().load('textures/crate.gif');
    const bump = new THREE.TextureLoader().load('textures/brick_bump.gif');
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        bumpMap: bump,
        bumpScale: 120
    });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

}


// -- main function
function animate() {

    requestAnimationFrame(animate);
    // time = clock.getElapsedTime();
    // delta = clock.getDelta();

    // cube.rotation.x += delta * 1000;
    // cube.rotation.y += delta * 1000;

    cube.rotation.x += .01;
    cube.rotation.y += .01;


    renderer.render(scene, camera)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false)

init();
animate();