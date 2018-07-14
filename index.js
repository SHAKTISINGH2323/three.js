var scene,renderer,camera;
var control;
scene=new THREE.Scene();

camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.x=10;
camera.position.y=10;
camera.position.z=40;
camera.lookAt(scene.position);


renderer=new THREE.WebGLRenderer();
renderer.setClearColor(0x000000,1.0);
renderer.setSize(window.innerWidth,window.innerHeight);
control=new function(){
    this.rotationSpeed=0.09;
    this.scale=1;
    this.rang='#9184ff';
    this.message='press up /down /left/right keys';
};
var cubeGeometry=new THREE.BoxGeometry(10,10,10);
var cubeMaterial = new THREE.MeshBasicMaterial();
cubeMaterial.color=new THREE.Color(control.rang);

var cube=new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(cube);
document.body.appendChild(renderer.domElement);


function keyControls(){
    document.onkeydown=function(e){
        switch(e.keyCode){
            case 37:cube.rotation.y-=control.rotationSpeed;
                break;
            case 38 : cube.rotation.x-=control.rotationSpeed;
                break;
            case 39 : cube.rotation.y+=control.rotationSpeed;
                break;
            case 40 : cube.rotation.x+=control.rotationSpeed;
                break;
        }
    }

}
addControls(control);
function addControls(controlObject){
    var gui=new dat.GUI({load:JSON});
    gui.addColor(controlObject,'rang');
    gui.add(controlObject,'rotationSpeed',-0.1,0.4);
    gui.add(controlObject,'scale',0.1,2);
    gui.add(controlObject,'message');
    gui.remember(controlObject);

}
function render(){
    renderer.render(scene,camera);
    cube.rotation=keyControls();
    cube.scale.set(control.scale,control.scale,control.scale);
    cubeMaterial.color.set(control.rang);

    requestAnimationFrame(render);
}
render();
//scene.remove(cube);

