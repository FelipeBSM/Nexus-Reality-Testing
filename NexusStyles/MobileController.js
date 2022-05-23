
let direction = new THREE.Vector3();
let movement = new THREE.Vector3();
let target = new THREE.Vector3();

const camera = document.getElementById("cam-js");
const toggleGyro =  document.getElementById("toggle-gyro");

const gyroInfo = document.getElementById("exp-p");
var p = "";
var p_aux_1 ="<b>ROTAÇÃO POR MOVIMENTO ATIVADA.</b> Para visualizar o imóvel, utilize o giroscópio de seu dispositivo móvel. Esta opção é aocncelhada, pois aumenta a imersão dentro do imóvel.";
var p_aux_2 ="<b>ROTAÇÃO POR MOVIMENTO DESATIVADA.</b> Para visualizar o imóvel, utilize o giroscópio de seu dispositivo móvel. Esta opção é aocncelhada, pois aumenta a imersão dentro do imóvel.";

var gyroMode = false;

toggleGyro.addEventListener('change',function(){
    
    gyroInfo.innerHTML = '';
    if(this.checked){
        camera.setAttribute("look-controls",{
            "enabled":"true",
            "magicWindowTrackingEnabled":"true",
            "mouseEnabled":"true",
            "pointerLockEnabled":"false",
            "reverseMouseDrag":"false",
            "reverseTouchDrag":"false",
            "touchEnabled":"true"});
            p= p_aux_1;
    }
    else{
        camera.setAttribute("look-controls",{
            "enabled":"true",
            "magicWindowTrackingEnabled":"false",
            "mouseEnabled":"true",
            "pointerLockEnabled":"false",
            "reverseMouseDrag":"false",
            "reverseTouchDrag":"false",
            "touchEnabled":"true"});
            p= p_aux_2;
    }
      
    gyroInfo.innerHTML = p;
    gyroMode = camera.getAttribute("look-controls","magicWindowTrackingEnabled");
    console.log(gyroMode);
    
})


function touchEndListener(){
    movement = new THREE.Vector3();
}

function clickListener(ev){
    
    
    let scene = document.getElementById("m-s");
    let camDirection = scene.camera.getWorldDirection(target);
    camDirection.multiplyScalar(0.4);

    movement.x+=camDirection.x;
    movement.z+=camDirection.z;

    
}


AFRAME.registerComponent('user-control',{
    tick: function(){
        if(movement.length()==0){
            return;
        }

        let cam = document.getElementById("cam");
        let pos = cam.getAttribute('position');
        var speed = 0.1;

        pos.x+=movement.x * speed;
        pos.z+=movement.z * speed;
        
        cam.setAttribute('poisition',pos);
    },
    init : function(){
      let frontB = document.getElementById("front-btn-btn");

      frontB.addEventListener('touchstart', clickListener);
      frontB.addEventListener('touchend',touchEndListener);
    },
});

