var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

// There's no reason to set the aspect here because we're going
// to set it every frame anyway so we'll set it to 2 since 2
// is the the aspect for the canvas default size (300w/150h = 2)

var  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeights, 1, 2600);
camera.position.z = 2600;

var scene = new THREE.Scene();
scene.background = new THREE.Color( "white" );

var DynamicTexture = new THREEx.DynamicTexture(1000,750);



//1
var geometry = new THREE.BoxGeometry(600,400,600);

var material = new THREE.MeshBasicMaterial({
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
// var wireframe = new THREE.LineSegments( geo, mat );
// mesh.add( wireframe );

//2
var geometry2 = new THREE.BoxGeometry(600,400,600);

var material2 = new THREE.MeshBasicMaterial({
  shading: THREE.SmoothShading,
  map: DynamicTexture.texture
});

var mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0,410,0);
scene.add(mesh2);

var geo2 = new THREE.EdgesGeometry( mesh2.geometry2 );
var mat2 = new THREE.LineBasicMaterial( { 
  color: 0x000000, 
});
var wireframe2 = new THREE.LineSegments( geo2, mat2 );
mesh2.add( wireframe2 );


//3
var geometry3 = new THREE.BoxGeometry(600,400,600);

var material3 = new THREE.MeshBasicMaterial({
  shading: THREE.SmoothShading,
  map: DynamicTexture.texture
});

var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(0,-410,0);
scene.add(mesh3);

var geo3 = new THREE.EdgesGeometry( mesh3.geometry3 );
var mat3 = new THREE.LineBasicMaterial( { 
  color: 0x000000, 
});
var wireframe3 = new THREE.LineSegments( geo3, mat3 );
mesh3.add( wireframe3 );



// var helper = new THREE.BoxHelper( mesh );
// helper.material.color.set( 0xffffff );
// scene.add( helper );

pivot = new THREE.Group();
pivot.position.set(0,0,0);
scene.add(pivot);
pivot.add(mesh);

var color = 0xFFFFFF;
var intensity = 1;
var light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 0, 600);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

function resizeCanvasToDisplaySize() {
  var canvas = renderer.domElement;
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (canvas.width !== width ||canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // mesh.scale.set(width,height,width);
    // set render target sizes here
    
  }
}

function printName()  {
  DynamicTexture.clear('black');

  var contextText = document.getElementById('contextText').value;

  DynamicTexture.drawTextCooked({
    text: contextText,
    lineHeight: 0.32,
    fillStyle : 'white',
		font : "bold "+(170)+"px Noto Sans KR, sans-serif",
    align: 'center',
    margin: 0.1
  });

 
  
  // $(document).click(function animate(time) {
  //   time *= 0.001;  // seconds
  
  //   resizeCanvasToDisplaySize();
  
  //     mesh.rotation.x = time * 0;
  //     mesh.rotation.y = time * 0.1;   

  //     mesh2.rotation.x = time * 0;
  //     mesh2.rotation.y = time * 0.2;   

      
  //     renderer.render(scene, camera);
  //     requestAnimationFrame(animate);
  // })
}



DynamicTexture.texture.needsUpdate = true;


function animate(time) {
  time *= 0.001;  // seconds


  resizeCanvasToDisplaySize();

      mesh.rotation.x = time * 0;
      mesh.rotation.y = time * 0.2;   

      mesh2.rotation.x = time * 0;
      mesh2.rotation.y = time * 0.3;   

      mesh3.rotation.x = time * 0;
      mesh3.rotation.y = time * 0.1;   


  

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  

}

requestAnimationFrame(animate);
