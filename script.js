// Price Calculator
const basePrice = 20;
const addons = document.querySelectorAll('.addon');
const totalDisplay = document.getElementById('total');
const shipping = document.getElementById('shipping');

function updatePrice(){
    let total = basePrice;
    addons.forEach(addon => { if(addon.checked) total += parseInt(addon.value); });
    if(shipping.checked) total += 8;
    totalDisplay.textContent = total;
}

addons.forEach(addon => addon.addEventListener('change', updatePrice));
shipping.addEventListener('change', updatePrice);

// 3D Preview
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 400);
document.getElementById('preview').appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 10);
scene.add(light);
camera.position.set(0, 2, 5);

const loader = new THREE.GLTFLoader();

// Replace 'dummy13_real.glb' with your actual model
loader.load('dummy13_real.glb', function(gltf){
    const model = gltf.scene;
    scene.add(model);
});

function animate(){
    requestAnimationFrame(animate);
    scene.rotation.y += 0.01; // rotate model
    renderer.render(scene, camera);
}
animate();
