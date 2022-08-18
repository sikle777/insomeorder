

var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

// There's no reason to set the aspect here because we're going
// to set it every frame anyway so we'll set it to 2 since 2
// is the the aspect for the canvas default size (300w/150h = 2)

var  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeights, 1, 2600);
camera.position.z = 2600;

var scene = new THREE.Scene();
var DynamicTexture = new THREEx.DynamicTexture(window.innerWidth,window.innerHeight);

// DynamicTexture.context.font = "bold"+100+"px Arial";
DynamicTexture.clear('white');



var geometry = new THREE.BoxGeometry(1,1,1);

var material = new THREE.MeshBasicMaterial({
  color: 'white',
  shading: THREE.SmoothShading,
  map: DynamicTexture.texture
});

var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0,0,0);
scene.add(mesh);

var geo = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
var mat = new THREE.LineBasicMaterial( { 
  color: 0x000000, 
});
var wireframe = new THREE.LineSegments( geo, mat );
mesh.add( wireframe );

var helper = new THREE.BoxHelper( mesh );
helper.material.color.set( 0xffffff );
scene.add( helper );

pivot = new THREE.Group();
pivot.position.set(0,0,0);
scene.add(pivot);
pivot.add(mesh);




var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

function resizeCanvasToDisplaySize() {
  var canvas = renderer.domElement;
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (canvas.width !== width ||canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    mesh.scale.set(width,height,width);
    // set render target sizes here
    
  }
}

function printName()  {
  var contextText = document.getElementById('contextText').value;
  DynamicTexture.drawTextCooked({
    text: contextText,
    lineHeight: 0.1

    
  });
 
  $(document).click(function animate(time) {
    time *= 0.001;  // seconds
  
    resizeCanvasToDisplaySize();
  
      mesh.rotation.x = time * 0;
      mesh.rotation.y = time * 0.5;   
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
  
  
  })

  
}


DynamicTexture.texture.needsUpdate = true;


function animate(time) {

  resizeCanvasToDisplaySize();


  

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  

}

requestAnimationFrame(animate);