import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';

let dices;
let board;

function main() {
  const canvas = document.getElementById("c");
  const renderer = new THREE.WebGLRenderer({ canvas });
  const camera = createCamera();

  const scene = new THREE.Scene();
  dices = [createDice(1, 0, 0, 0), createDice(1, 2, 3, 0), createDice(1, 4, 4, 0),];
  board = createBoard();
  scene.add(board);
  dices.forEach((dice) => scene.add(dice));
  addLight(scene, 1, 1, 3);

  renderObjects(scene, camera, renderer);
}

function createCamera() {
  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;
  return camera;
}

function createDiceTexture() {
  const loader = new THREE.TextureLoader();
  return [
    new THREE.MeshBasicMaterial({
      map: loader.load("src/resources/images/gran1.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("src/resources/images/gran2.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("src/resources/images/gran3.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("src/resources/images/gran4.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("src/resources/images/gran5.png")
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load("src/resources/images/gran6.png")
    })
  ];
}

function createMaterial() {
  const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
  });

  const hue = Math.random();
  const saturation = 1;
  const luminance = .5;
  material.color.setHSL(hue, saturation, luminance);

  return material;
}

function createBoard() {
  const width = 20;
  const height = 15;
  const board = new THREE.Mesh(new THREE.PlaneGeometry(width, height), createMaterial());
  
  board.position.x = 0;
  board.position.y = 0;
  board.position.z = -20;
  return board;
}

function createDice(size, x, y, z) {
  const boxWidth = size;
  const boxHeight = size;
  const boxDepth = size;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const materials = createDiceTexture();
  const cube = new THREE.Mesh(geometry, materials);

  if (x !== undefined && x !== null) cube.position.x = x;
  if (y !== undefined && y !== null) cube.position.y = y;
  if (z !== undefined && z !== null) cube.position.z = z;

  return cube;
}

function addLight(scene, x, y, z) {
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(x, y, z);
  scene.add(light);
}

function convertToSeconds(time) {
  return time * 0.001;
}

function resizeRendererToDisplaySize(renderer, camera) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio; //needs to optimise rendering for hd dpi
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;

  const needResize = canvas.width !== width || canvas.heigth !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}
 
function animate(time) {
  time = convertToSeconds(time);
  dices.forEach((obj) => {
    obj.rotation.z = time;
    obj.rotation.x = time;
    obj.position.z = -time*4;
  });
}

function renderObjects(scene, camera, renderer) {
  function render(time) {
    resizeRendererToDisplaySize(renderer, camera);
    animate(time);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
