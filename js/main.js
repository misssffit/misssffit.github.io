import * as THREE from './three.module.js';
import {GLTFLoader} from './GLTFLoader.js';

var canvasWidth = window.innerWidth/2;
var canvasHeight =canvasWidth/2;
const canv = document.querySelector('canvas');
var scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, ((canvasWidth)/(canvasHeight)), 0.1, 1000);
 renderer = new THREE.WebGLRenderer({
    alpha : true,
    canvas : artifactCanvas
});

renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 200;

function canvasTop(){
    const canvasBlock = document.querySelector('.about');
    var row = document.querySelector('.about__row');
    var canvasPosition =  canvasBlock.getBoundingClientRect().top + pageYOffset +120;
    var canvasPositionLeft = 50;
    var textPosition = canvasHeight/2;
    var textPositionLeft = 0;
    var rowMargin = 0;
    if(window.innerWidth<=1200 && window.innerWidth >992){
        canvasPosition = canvasBlock.getBoundingClientRect().top + pageYOffset ;
        textPositionLeft = -canvasWidth/4;
    }else if(window.innerWidth<=992 && window.innerWidth > 767){
        canvasPosition = canvasBlock.getBoundingClientRect().top + pageYOffset +canvasBlock.getBoundingClientRect().height;
        canvasPositionLeft = 30;
        textPosition = canvasHeight;
        rowMargin = canvasHeight+100;
    }else if(window.innerWidth<=767){
        canvasPosition = canvasBlock.getBoundingClientRect().top + pageYOffset +canvasBlock.getBoundingClientRect().height;
        canvasPositionLeft = 30;
        textPositionLeft = -canvasWidth/2;
        textPosition = canvasHeight+canvasBlock.getBoundingClientRect().height;
        rowMargin = canvasHeight+100;
    }
    row.style.marginBottom = rowMargin+'px';
    canv.style.top = canvasPosition+'px';
    canv.style.left = canvasPositionLeft+'%';
    textElement.style.top = textPosition+'px';
    textElement.style.left = textPositionLeft+'px';
}

canv.width = canvasWidth;
canv.height = canvasHeight;
//////////////////

window.addEventListener( 'resize', function(){
    var width = canvasWidth;
    var height = canvasHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
} )

/////////////////
 const loader = new GLTFLoader();

 var head;
 loader.load( '../assets/scene.gltf', function ( gltf ) {
    head = gltf.scene;
    head.position.y = -80;
     scene.add( head );
 
 }, undefined, function ( error ) {
 
     console.error( error );
 
 } );

 const light = new THREE.AmbientLight( 0xffffff, 30);
 scene.add(light);


window.onmousemove = function(ev){
    var halfHeight = canvasHeight/2;
    var halfWidth = canvasWidth/2;
    head.rotation.x = (ev.clientY-window.innerHeight+canvasWidth-halfHeight)/1500;
    head.rotation.y = (ev.clientX-window.innerWidth+canvasWidth-halfWidth)/1500;

}

const raycaster = new THREE.Raycaster();
const mouseClick = new THREE.Vector2();
const textElement = document.querySelector('.clickme');

window.addEventListener('click', event =>{
    mouseClick.x = ( event.offsetX / canvasWidth ) * 2 - 1;
	mouseClick.y = - ( event.offsetY / canvasHeight ) * 2 + 1;
    raycaster.setFromCamera( mouseClick, camera );
	const found = raycaster.intersectObjects( scene.children );
    if(found.length > 0){
        textElement.classList.add('active');
        textElement.innerHTML = 'if you have any questions - contact me';
    }
})

var render = function(){
    renderer.render(scene, camera);
};

var GameLoop = function(){
    requestAnimationFrame(GameLoop);
    canvasTop();
    render();
}



GameLoop();