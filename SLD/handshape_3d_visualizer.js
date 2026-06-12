//-----------------------------------
// 3D Handshape Visualizer Integration
//
// Based on official code by Dr. Jacob Tosado
// Adapted for nulpoints.github.io integration
//-----------------------------------
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HanshapeControls } from './handshape_controls.js?v=3';

const container = document.getElementById('handshape3d');
if (!container) {
    console.error("3D container '#handshape3d' not found.");
}

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
const container_width = container.clientWidth || 350;
const container_height = container.clientHeight || 350;
renderer.setSize(container_width, container_height);
renderer.setPixelRatio(window.devicePixelRatio || 1);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// We don't set a solid white background here so it remains transparent
// over the dark-mode glassmorphic background of the container card.

const camera = new THREE.PerspectiveCamera(45, container_width / container_height, 0.1, 1000);
camera.position.set(0, 0, 1.3);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enablePan = false;
orbit.enableZoom = true; // Let user zoom in/out slightly if they want
orbit.minDistance = 0.8;
orbit.maxDistance = 2.0;
orbit.update();

//----------------------------------------
// PROCEDURAL SKIN TEXTURE GENERATOR
//----------------------------------------
function createSkinBumpMap() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Fill with mid-gray (neutral height for bump map)
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);
    
    // Add fine noise to simulate skin pores/grain
    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 16;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(12, 12); // Repeat texture to make grain fine
    return texture;
}

const skinBumpMap = createSkinBumpMap();

//----------------------------------------
// LOADING MODEL
//----------------------------------------
let hanshapeControls = null;
const handshapeUrl = new URL('./hand_model.glb', import.meta.url);

const assetLoader = new GLTFLoader();
assetLoader.load(handshapeUrl.href, function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0.65, -0.45, -0.5);

    // Apply medium-dark skin tone with bump map texture
    model.traverse((child) => {
        if (child.isMesh && child.material) {
            // Disable vertex colors to let the custom hex color take effect
            child.material.vertexColors = false;
            
            // Rich dark warm brown skin tone
            child.material.color.setHex(0x6D4C41);
            child.material.roughness = 0.85;
            child.material.metalness = 0.02;
            
            // Emissive tone to add depth in shadow
            child.material.emissive = new THREE.Color(0x22140d);
            child.material.emissiveIntensity = 0.2;
            
            // Apply bump map to make skin texture and shapes extremely clear
            child.material.bumpMap = skinBumpMap;
            child.material.bumpScale = 0.003;
            
            child.material.needsUpdate = true;
        }
    });

    const mixer = new THREE.AnimationMixer(model);
    hanshapeControls = new HanshapeControls(model, mixer, orbit, camera);
    window.hanshapeControls = hanshapeControls;

    // Apply any signature that was requested before load completed
    if (window.pendingSignature) {
        applyHandshape(window.pendingSignature);
        window.pendingSignature = null;
    }
}, undefined, function (error) {
    console.error("Error loading GLTF model:", error);
});

//----------------------------------------
// LIGHTING
//----------------------------------------
// Main light - soft warm light
const light1 = new THREE.DirectionalLight(0xFFF5E6, 1.2);
const lightOffSet = 5;
light1.position.set(camera.position.x + lightOffSet, camera.position.y + 2, camera.position.z + lightOffSet);
scene.add(light1);

// Fill light — soften shadows on the opposite side with cool ambient blue
const fillLight = new THREE.DirectionalLight(0xB0C4DE, 0.4);
fillLight.position.set(-3, 1, 2);
scene.add(fillLight);

// Hemisphere light — warm sky / cool ground ambient (subtle)
const hemiLight = new THREE.HemisphereLight(0xFFF5E6, 0x3E2723, 0.3);
scene.add(hemiLight);

// Rim light — highlight edges against dark background
const rimLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
rimLight.position.set(-2, 2, -3);
scene.add(rimLight);

//----------------------------------------
// ANIMATION RENDER LOOP
//----------------------------------------
function animate() {
    if (hanshapeControls) {
        hanshapeControls.update();
    }

    // Keep key light aligned with camera position for perfect lighting from the viewer's angle
    light1.position.x = camera.position.x * lightOffSet;
    light1.position.y = camera.position.y;
    light1.position.z = camera.position.z * lightOffSet;

    orbit.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Window resize handler
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Global bridge function to apply handshapes
function applyHandshape(sigStr) {
    if (hanshapeControls) {
        const signatureErrors = hanshapeControls.setHandshape(sigStr);
        const alertBox = document.getElementById('statusAlert');
        if (alertBox) {
            if (signatureErrors && signatureErrors !== 'Valid signature.') {
                alertBox.innerHTML = `⚠️ ${signatureErrors}`;
                alertBox.style.display = 'block';
            } else {
                alertBox.style.display = 'none';
            }
        }
    } else {
        window.pendingSignature = sigStr;
    }
}

// Expose bridge function globally
window.applyHandshape3D = applyHandshape;
