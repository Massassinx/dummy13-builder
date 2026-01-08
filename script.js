// Price Calculator
const basePrice = 20;
const addons = document.querySelectorAll('.addon');
const totalDisplay = document.getElementById('total');
const shipping = document.getElementById('shipping');
const colorSelect = document.getElementById('color');

function updatePrice(){
    let total = basePrice;
    addons.forEach(addon => { if(addon.checked) total += parseInt(addon.value); });
    if(shipping.checked) total += 8;
    totalDisplay.textContent = total;
}
addons.forEach(addon => addon.addEventListener('change', updatePrice));
shipping.addEventListener('change', updatePrice);

// 3D Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(400,400);
document.getElementById('preview').appendChild(renderer.domElement);

// Lighting
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0,20,10);
scene.add(light);
camera.position.set(0,2,5);

// Materials
let bodyMat = new THREE.MeshStandardMaterial({color: 0x5555ff});
let headMat = new THREE.MeshStandardMaterial({color: 0xdddddd});
let limbMat = new THREE.MeshStandardMaterial({color: 0x5555ff});

// Helper function for creating joints
function createLimb(length, radius, color){
    const geom = new THREE.CylinderGeometry(radius,radius,length,16);
    const mat = new THREE.MeshStandardMaterial({color: color});
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    return mesh;
}

// Root group
const dummy = new THREE.Group();
scene.add(dummy);

// Body
const torso = createLimb(1.5,0.5,0x5555ff);
torso.position.y = 0.75;
dummy.add(torso);

// Head
const head = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), headMat);
head.position.y = 2.25;
torso.add(head);

// Arms with joints
const leftArm = new THREE.Group();
leftArm.position.set(-0.65, 1.5,0);
torso.add(leftArm);
const leftUpper = createLimb(0.8,0.15,0x5555ff);
leftUpper.rotation.z = Math.PI/4;
leftUpper.position.y = -0.4;
leftArm.add(leftUpper);
const leftLower = createLimb(0.7,0.12,0x5555ff);
leftLower.position.y = -0.75;
leftUpper.add(leftLower);

const rightArm = new THREE.Group();
rightArm.position.set(0.65,1.5,0);
torso.add(rightArm);
const rightUpper = createLimb(0.8,0.15,0x5555ff);
rightUpper.rotation.z = -Math.PI/4;
rightUpper.position.y = -0.4;
rightArm.add(rightUpper);
const rightLower = createLimb(0.7,0.12,0x5555ff);
rightLower.position.y = -0.75;
rightUpper.add(rightLower);

// Legs with joints
const leftLeg = new THREE.Group();
leftLeg.position.set(-0.25,0,0);
torso.add(leftLeg);
const leftThigh = createLimb(0.8,0.2,0x5555ff);
leftThigh.position.y = -0.4;
leftLeg.add(leftThigh);
const leftShin = createLimb(0.7,0.15,0x5555ff);
leftShin.position.y = -0.75;
leftThigh.add(leftShin);

const rightLeg = new THREE.Group();
rightLeg.position.set(0.25,0,0);
torso.add(rightLeg);
const rightThigh = createLimb(0.8,0.2,0x5555ff);
rightThigh.position.y = -0.4;
rightLeg.add(rightThigh);
const rightShin = createLimb(0.7,0.15,0x5555ff);
rightShin.position.y = -0.75;
rightThigh.add(rightShin);

// Animate rotation
function animate(){
    requestAnimationFrame(animate);
    dummy.rotation.y += 0.01;
    renderer.render(scene,camera);
}
animate();

// Change color dynamically
colorSelect.addEventListener('change', ()=>{
    const color = colorSelect.value;
    bodyMat.color.set(color);
    limbMat.color.set(color);
});
