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
    let light = new THREE.PointLight(0xFFFFFF, 1, 100)
    light.position.set(4, 4, 4);
    scene.add(light);


    // --- Cube mesh ---
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshLambertMaterial({
    //     color: 0x555555
    // });


    const texture = new THREE.TextureLoader().load('textures/antique-grate1-albedo.png');
    // var bumpMap = THREE.ImageUtils.loadTexture("textures/brick_bump.jpg")
    const bumpMap = new THREE.TextureLoader().load('textures/antique-grate1-normal-ogl.png');
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        normalMap: bumpMap,
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

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onWindowResize, false)

window.addEventListener('resize', () => {
    camera.updateProjectionMatrix();
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
})

init();
animate();