
var scene = new THREE.Scene();
var camera = getCamera();
var renderer = getRenderer();
var light = getLight(scene);
var controls = getControls(camera, renderer);

var cube, cube2, modelObject;

// cube 1
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -2;
scene.add(cube);

// cube 2
var cube2Geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
var cube2Material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
cube2.position.x = 2;
scene.add(cube2);


var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
var linePoints = [
  new THREE.Vector3(-2, 0, 0),
  new THREE.Vector3(2, 0, 0)
];
var lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
var line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

//  OBJ Model
var loader = new THREE.OBJLoader();
loader.load('models/cat.obj', function (object) {
  modelObject = object;
  modelObject.scale.set(0.2, 0.2, 0.2);
  modelObject.position.y = -1;
  scene.add(modelObject);
}, undefined, function (error) {
  console.error('Error loading model:', error);
});


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;
  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;
  line.rotation.y += 0.01;

  if (modelObject) {
    modelObject.rotation.y += 0.01;
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();


function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 5, 10);
  return camera;
}

function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(20, 50, 20);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}

function getRenderer() {
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}
