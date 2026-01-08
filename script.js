// PRICE CALCULATOR
const basePrice = 20;
const addons = document.querySelectorAll('.addon');
const totalDisplay = document.getElementById('total');
const shipping = document.getElementById('shipping');
const colorSelect = document.getElementById('color');

function updatePrice() {
    let total = basePrice;
    addons.forEach(addon => {
        if (addon.checked) total += parseInt(addon.value);
    });
    if (shipping.checked) total += 8;
    totalDisplay.textContent = total;
}

// Event listeners for price changes
addons.forEach(addon => addon.addEventListener('change', updatePrice));
shipping.addEventListener('change', updatePrice);

// 3D SCENE SETUP
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 400);
document.getElementById('preview').appendChild(renderer.domElement);

// LIGHTING
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
light.position.set(0, 20, 10);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// LOAD REALISTIC DUMMY 13 MODEL (GLB)
const loader = new THREE.GLTFLoader();

// Replace 'dummy13_real.glb' with the GLB you got from online conversion
loader.load('dummy13_real.glb', function(gltf) {
    const model = gltf.scene;

    // Make model slightly bigger if needed
    model.scale.set(1.2, 1.2, 1.2);

    // Center model
    model.position.y = 0;

    // Save reference to change color later
    window.dummyModel = model;

    scene.add(model);
}, undefined, function(error) {
    console.error('Error loading model:', error);
});

// FUNCTION TO CHANGE COLOR
colorSelect.addEventListener('change', () => {
    const colorValue = colorSelect.value;

    if (!window.dummyModel) return; // wait until model is loaded

    // Traverse all meshes in the model and change material color
    window.dummyModel.traverse(child => {
        if (child.isMesh) {
            child.material.color.set(colorValue);
        }
    });
});

// ANIMATE ROTATION
function animate() {
    requestAnimationFrame(animate);

    if (window.dummyModel) {
        // Rotate the whole model slowly
        window.dummyModel.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

animate();

