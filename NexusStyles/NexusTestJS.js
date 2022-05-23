var screenValue = 0;
var actualValue = 0;

const nextButton = document.getElementById("btn-next");
const jumpButton = document.getElementById("btn-jump");

const settingsButton = document.getElementById("setting-btn");
const settingsButtonContainer = document.getElementById("setting-button-container");


const cameraRig = document.getElementById("cam");
const cameraObj = document.getElementById("cam-js");

const cameraButton = document.querySelector("#camera-btn");

const i1 = document.getElementById("i1");
const i2 = document.getElementById("i2");
const holeTut = document.getElementById("tuto-plane-cointainer");
const tutoImageDiv = document.getElementsByClassName("removable");
const imagesContainers = document.getElementsByClassName("order-images");

const mobileInputContainer =  document.getElementById("mobile-input-container");

const settingsContainer =  document.getElementById("settings-container");

const backButtonSettings =  document.getElementById("settings-bk-btn");

const ap_OBJ = document.getElementById("3d-AP");

var isMobile = false;
var hasEndAnimation = true;


const animationButtonContainer = document.getElementById("animation-button-container");
const animationButton = document.getElementById("animationButton");


window.onload = ResolvePlat();



nextButton.addEventListener('click',event=>{

    screenValue+=1;
    if(screenValue===1){
        StepForward();
    }
    else if(screenValue===2){
        QuitTutorial();
        if(isMobile === true)
            AttGyro();
        
    }
    

})


jumpButton.addEventListener('click',event=>{

    QuitTutorial();
    if(isMobile ===true)
        AttGyro();
    
    
})

settingsButton.addEventListener('click',event=>{

    InitSettingsBox();
})

cameraButton.addEventListener('click',event=>{
    InitCameraAnimation();

})

animationButton.addEventListener('click',event=>{
    ControlRotationAnimation();
})

function QuitTutorial(){
 holeTut.innerHTML='';
 holeTut.style.display="none";
 
}
function StepForward(){
    i1.style.display="none";    
    i2.style.display="block";
}
function ResolvePlat(){
    if(DetectMobile() === true){
        
        isMobile = true;
        for(var i=0,len=tutoImageDiv.length; i< len;i++){
            tutoImageDiv[i].innerHTML='';
            
        }


        
        var t1 = "Use o seu giroscópio para rotacionar sua visão.";
        var t2 = "No canto inferior direto, segure o botão ilustrado abaixo para movimentar-se pelo ambiente.";
        var p1= document.createElement('p');
        var p2= document.createElement('p');
        p1.innerHTML=t1;
        p2.innerHTML=t2;
        tutoImageDiv[0].appendChild(p1);
        tutoImageDiv[2].appendChild(p2);

        var i1= document.createElement('img');
        var i2= document.createElement('img');

        i1.setAttribute("src", "Modelos/rotate_info.png")
        imagesContainers[0].appendChild(i1);

        i2.setAttribute("src", "Modelos/mobileInput.png")
        imagesContainers[1].appendChild(i2);

        


        var script = document.createElement("script");
        script.setAttribute("type","text/javascript");
        script.setAttribute("src", "NexusStyles/MobileController.js");
        document.body.appendChild(script);
    }
    else{
        console.log("nop mob");
        mobileInputContainer.remove();
        settingsButtonContainer.remove();
    }
}
function DetectMobile(){
    return ((window.innerWidth<=820) && (window.innerHeight<=1200));
}

var active = false;
var a = true;
function InitSettingsBox()
{
    
    if(!active){
        settingsContainer.style.display="flex";
        cameraButton.disabled = true;
    }
    else
    {
        settingsContainer.style.display="none";
        cameraButton.disabled = false;
    }

    active = !active;
}
backButtonSettings.addEventListener('click',event=>{

    BackButtonSettings();

})

function BackButtonSettings(){
    settingsContainer.style.display="none";
    cameraButton.disabled = false;
    active = false;
}


var camPrevPosition = new THREE.Vector3();
var camPrevRotation = new THREE.Vector3();
let camLookControlsHolder;

var firstClick = false;
var canRotate = true;
function InitCameraAnimation(){
    
    
    if(hasEndAnimation === true){
        let targetPos, cameraPos;
        let camNewRotation;

        let df = ObjectToPos(new THREE.Vector3(0,0,0));
        let dr = ObjectToPos(new THREE.Vector3(0,0,0));
        cameraObj.removeAttribute('position');
        cameraObj.removeAttribute('rotation');
        if(a === true){
            settingsButton.style.display="none";
            mobileInputContainer.style.display="none";
            animationButtonContainer.style.display="flex";
            
           
            hasEndAnimation = false;
            camLookControlsHolder=cameraObj.getAttribute('look-controls');

            cameraObj.removeAttribute('wasd-controls');
            cameraObj.removeAttribute('look-controls');
    
            
            targetPos = new THREE.Vector3(0.162, 11.65, 4.095);
            targetPos = ObjectToPos(targetPos);
            let worldPos = new THREE.Vector3();
            cameraPos = ObjectToPos(worldPos.setFromMatrixPosition(cameraObj.object3D.matrixWorld));
            console.log(cameraPos);
            camPrevPosition = cameraPos;
            
            
            camPrevRotation = ObjectToPos(cameraRig.getAttribute('rotation'));
            camNewRotation = ObjectToPos(new THREE.Vector3(-70, 0, 0));
            
            cameraRig.setAttribute('animation',`property: position; from: ${cameraPos}; to: ${targetPos};dur: 700`);
            cameraRig.setAttribute('animation__2',`property: rotation; from: ${camPrevRotation}; to: ${camNewRotation};dur: 700`);
            
            
            
        }
        else{
            settingsButton.style.display="block";
            animationButtonContainer.style.display="none";
            mobileInputContainer.style.display="block";
           
            hasEndAnimation = false;
            cameraPos = ObjectToPos(cameraRig.getAttribute('position'));
            camNewRotation = ObjectToPos(cameraRig.getAttribute('rotation'));
            cameraObj.setAttribute('wasd-controls',{
                "enabled":"true",
                "acceleration":"65",
                "adAxis":"x",
                "adInverted":"false",
                "fly":"false",
                "wsAxis":"z",
                "wsInverted":"false"
            });
            cameraObj.setAttribute('look-controls',camLookControlsHolder);
            cameraRig.setAttribute('animation',`property: position; from: ${cameraPos}; to: ${camPrevPosition};dur: 700`);
            cameraRig.setAttribute('animation__2',`property: rotation; from: ${camNewRotation}; to: ${camPrevRotation};dur: 700`);

            StopRotateAp();
        }
    }else{return;}
   

    a=!a;
}

function ObjectToPos(posObject){
    return posObject.x + " " +posObject.y + " " + posObject.z;
}
cameraRig.addEventListener('animationcomplete',function(){
    hasEndAnimation = true;
    console.log("doneAnimation");
})
function AttGyro(){

    

    const toggleGyro =  document.getElementById("toggle-gyro");

    const gyroInfo = document.getElementById("exp-p");
    var p = "";
    var p_aux_1 ="<b>ROTAÇÃO POR MOVIMENTO ATIVADA.</b> Para visualizar o imóvel, utilize o giroscópio de seu dispositivo móvel. Esta opção é aocncelhada, pois aumenta a imersão dentro do imóvel.";
    var p_aux_2 ="<b>ROTAÇÃO POR MOVIMENTO DESATIVADA.</b> Para visualizar o imóvel, utilize o giroscópio de seu dispositivo móvel. Esta opção é aocncelhada, pois aumenta a imersão dentro do imóvel.";

    var gyroMode = false;

    gyroMode = cameraObj.getAttribute("look-controls","magicWindowTrackingEnabled");
    console.log(gyroMode);

    let exp_obj ={
        enabled:true,
        magicWindowTrackingEnabled:true,
        mouseEnabled:true,
        pointerLockEnabled:false,
        reverseMouseDrag:false,
        reverseTouchDrag:false,
        touchEnabled:true
    }
  

    if(gyroMode.magicWindowTrackingEnabled === exp_obj.magicWindowTrackingEnabled){
        gyroMode = true;
        p= p_aux_1;
    }    
    else{
        gyroMode = false;
        p= p_aux_2;
    }
       

    gyroInfo.innerHTML = p;
    toggleGyro.checked = gyroMode;
}


function RotateAp(){
    ap_OBJ.setAttribute('animation',`property: rotation; to: 0 360 0;dur: 40000; loop:true; easing:linear; pauseEvents:pauseAnim; resumeEvents:resumeAnim;`)
}
function StopRotateAp(){
    ap_OBJ.setAttribute('rotation','0 0 0');
    ap_OBJ.removeAttribute('animation');
    firstClick = false;
    canRotate = true;
    animationButton.innerHTML="ATIVAR ROTAÇÃO 360°";
}
function PauseRotation(){
    ap_OBJ.emit('pauseAnim',null,false);
    
}

function ResumeRotation(){
    ap_OBJ.emit('resumeAnim',null,false);
}



function ControlRotationAnimation(){
    

    if(canRotate){
        if(firstClick === false){
            RotateAp();
            firstClick = true;
        }
        else{
            ResumeRotation();
        }
        animationButton.innerHTML="DESATIVAR ROTAÇÃO 360°";
        
    }
    else{
        PauseRotation();
        animationButton.innerHTML="ATIVAR ROTAÇÃO 360°";
    }

    canRotate = !canRotate;
}