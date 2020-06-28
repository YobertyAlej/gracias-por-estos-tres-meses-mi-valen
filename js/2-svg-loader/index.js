"use strict";

/**
 * Main Scene
 */

const svgLoader = new THREE.SVGLoader();
const loader = new THREE.FontLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/**
 * Camera Config
 */

const fieldOfView = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

/**
 * Scene Config
 */

const background = "#000";

let scene = new THREE.Scene();
window.scene = scene;
let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
let renderer = new THREE.WebGLRenderer({ antialias: true });

let controls = new THREE.MapControls(camera, renderer.domElement);
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

camera.position.z = 5;
camera.position.x = -5;
renderer.setClearColor(background);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

/**
 * Figure #1 · Typograpghy Figure
 */

let legendGeometry = null;
let legendMaterial = null;
let legendMesh = null;

let nameGeometry = null;
let nameMaterial = null;
let nameMesh = null;

let signsGeometry = null;
let signsMaterial = null;
let signsMesh = null;

let dateGeometry = null;
let dateMaterial = null;
let dateMesh = null;

let iconGeometry = null;
let iconMaterial = null;
let iconMesh = null;

loader.load("/fonts/Dear_Sunshine_Regular.json", function(font) {
  legendGeometry = new THREE.TextGeometry('Millones de personas', {
    font: font,
    size: 0.7,
    height: 0
  });

  legendMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffcb74 });

  legendMesh = new THREE.Mesh(legendGeometry, legendMaterial);

  legendMesh.position.x = -8.4;
  legendMesh.position.y = 2.4;

  scene.add(legendMesh);
});

loader.load("/fonts/Dear_Sunshine_Regular.json", function(font) {
  nameGeometry = new THREE.TextGeometry("y tengo a", {
    font: font,
    size: 0.7,
    height: 0.02
  });

  signsGeometry = new THREE.TextGeometry("Isis Valentina", {
    font: font,
    size: 0.4,
    height: 0
  });
  
  dateGeometry = new THREE.TextGeometry("gracias por estos tres meses de felicidad", {
    font: font,
    size: 0.3,
    height: 0
  });

  iconGeometry = new THREE.TextGeometry("3 ", {
    font: font,
    size: 0.6,
    height: 0
  });

  nameMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff });
  signsMaterial = new THREE.MeshToonMaterial({ color: 0xffcb74 });

  nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);
  signsMesh = new THREE.Mesh(signsGeometry, signsMaterial);
  dateMesh = new THREE.Mesh(dateGeometry, signsMaterial);
  iconMesh = new THREE.Mesh(iconGeometry, signsMaterial);

  nameMesh.position.x = -6.5;
  nameMesh.position.y = 1.0;

  signsMesh.position.x = -6.15;
  signsMesh.position.y = -3.2;
  
  dateMesh.position.x = -7.7;
  dateMesh.position.y = -3.7;
  
  iconMesh.position.x = -5.3;
  iconMesh.position.y = -4.6;

  scene.add(nameMesh);
  scene.add(signsMesh);
  scene.add(dateMesh);
  scene.add(iconMesh);
  const event = new Event("figureLoaded");
  window.dispatchEvent(event);
});

loader.load("/fonts/Dear_Sunshine_Regular.json", function(font) {
  legendGeometry = new THREE.TextGeometry('tengo a la mejor de todas', {
    font: font,
    size: 0.7,
    height: 0
  });

  legendMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff });

  legendMesh = new THREE.Mesh(legendGeometry, legendMaterial);

  legendMesh.position.x = -9;
  legendMesh.position.y = -0.4;

  scene.add(legendMesh);
});


/**
 * Figure #2 · Square
 */
let squareGeometry = new THREE.BoxGeometry(7, 1.4, 1);
let squareMaterial = new THREE.MeshBasicMaterial({ color: 0xffcb74 });
let squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);

squareMesh.position.x = -4;
squareMesh.position.y = 0.4;
squareMesh.position.z = -1;

//scene.add(squareMesh);

var map = new THREE.TextureLoader().load( "textures/image.jpeg" );
var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
var sprite = new THREE.Sprite( material );
sprite.scale.set(2.5,2.5,1);
sprite.position.set(-5, -1.9 , -1)

scene.add( sprite );

/**
 * Figure #3 · Stars Geometry
 */

function getRandom() {
  let num = Math.floor(Math.random()*10) + 1;
  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  return num;
}

let stars = [];
let starTexture = new THREE.TextureLoader().load('textures/star.png');

for (let i = 0; i < 600; i++) {
  let starsGeometry = new THREE.PlaneGeometry( 0.1, 0.1 );
  let starsMaterial = new THREE.MeshBasicMaterial({ map: starTexture });
  let star = new THREE.Mesh( starsGeometry, starsMaterial );
  star.position.set( getRandom() - 5, getRandom(), getRandom() );
  star.material.side = THREE.DoubleSide;
  stars.push(star);
}

for (let j = 0; j < stars.length; j++) {
  scene.add( stars[j] );
}
/**
 * Light
 */

let frontlight = new THREE.PointLight(0xfffffc, 1.5, 0);
frontlight.position.set(0, 0, 25);

scene.add(frontlight);

/**
 * Render
 */
const render = function() {
  requestAnimationFrame(render);

  squareMesh.rotation.x += 0.005;

  renderer.render(scene, camera);
};

/**
 * Mouse handler
 */
let intersects;
const onMouseMove = function(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  intersects = raycaster.intersectObjects(scene.children, true);

  for (figure of intersects) {
    figure.object.material.color.set(0xff0000);
  }
};

window.addEventListener("mousemove", onMouseMove);

/**
 * Animation
 */

let interval = null;
window.addEventListener("figureLoaded", function(event) {
  let tl = new TimelineMax().delay(0.3);

  const animateSign = function() {
    tl.to(signsMesh.position, 0.3, { y: -2.2, ease: Expo.easeOut });
    tl.to(signsMesh.position, 0.3, { y: -3.2, ease: Expo.easeIn });
  };

  window.addEventListener("click", animateSign);
});

/**
 * Excecution
 */

render();
