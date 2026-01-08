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

// Three.js 3D Preview (placeholder Dummy 13)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 400);
document.getElementById('preview').appendChild(renderer.domElement);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 10);
scene.add(light);
camera.position.set(0, 2, 5);

// Materials
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x5555ff });
const headMat = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const limbMat = new THREE.MeshStandardMaterial({ color: 0x5555ff });

// Body parts
const body = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1.5,32), bodyMat);
body.position.y = 0.75;
scene.add(body);

const head = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), headMat);
head.position.y = 2.1;
scene.add(head);

// Arms
const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,1,16), limbMat);
leftArm.position.set(-0.65, 1.5, 0);
leftArm.rotation.z = Math.PI/4;
scene.add(leftArm);

const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,1,16), limbMat);
rightArm.position.set(0.65, 1.5, 0);
rightArm.rotation.z = -Math.PI/4;
scene.add(rightArm);

// Legs
const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,1,16), limbMat);
leftLeg.position.set(-0.25, -0.5, 0);
scene.add(leftLeg);

const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,1,16), limbMat);
rightLeg.position.set(0.25, -0.5, 0);
scene.add(rightLeg);

// Animate rotation
function animate(){
    requestAnimationFrame(animate);
    body.rotation.y += 0.01;
    head.rotation.y += 0.01;
    leftArm.rotation.y += 0.01;
    rightArm.rotation.y += 0.01;
    leftLeg.rotation.y += 0.01;
    rightLeg.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

