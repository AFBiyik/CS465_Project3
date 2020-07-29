var shapeId = -2;

var addShapeType;

var a1 = 3;
var a2 = 3;
var a3 = 3;
var radius = 8;
var w = 32;
var n = 32;
var e1 = 1;
var e2 = 1;

var x = 0;
var y = 0;
var z = 0;
var pitch = 0;
var yaw = 0;
var roll = 0;

var texture = null;
var materialSpecular = vec4( 0.8, 0.8, 0.8, 1.0 );
var materialDiffuse = vec4( 0.5, 0.5, 0.5, 1.0 );;
var materialAmbient = vec4( 0.8, 0.8, 0.8, 1.0 );
var materialShininess = 20;

var textures = [];

function resetValues() {
    document.getElementById("wDivisionRange").value = 32;
    document.getElementById("nDivisionRange").value = 32;
    document.getElementById("a1Range").value = 3;
    document.getElementById("a2Range").value = 3;
    document.getElementById("a3Range").value = 3;
    document.getElementById("e1Range").value = 1;
    document.getElementById("e2Range").value = 1;
    document.getElementById("radiusRange").value = 8;

    document.getElementById("translateX").value = 0;
    document.getElementById("translateY").value = 0;
    document.getElementById("translateZ").value = 0;

    document.getElementById("rotatePitch").value = 0;
    document.getElementById("rotateYaw").value = 0;
    document.getElementById("rotateRoll").value = 0;

    document.getElementById("materialAmbient").value = "#CCCCCC";
    document.getElementById("materialSpecular").value = "#CCCCCC";
    document.getElementById("materialDiffuse").value = "#808080";

    document.getElementById("materialShininess").value = 20;

    a1 = 3;
    a2 = 3;
    a3 = 3;
    radius = 8;
    w = 32;
    n = 32;
    e1 = 1;
    e2 = 1;

    x = 0;
    y = 0;
    z = 0;
    pitch = 0;
    yaw = 0;
    roll = 0;

    texture = null;
    materialSpecular = vec4( 0.8, 0.8, 0.8, 1.0 );
    materialDiffuse = vec4( 0.5, 0.5, 0.5, 1.0 );;
    materialAmbient = vec4( 0.8, 0.8, 0.8, 1.0 );
    materialShininess = 20;
}

function setValues() {
    if (shapeId < 0)
        return;

    document.getElementById("wDivisionRange").value = shapes[shapeId].wDivision;
    document.getElementById("nDivisionRange").value = shapes[shapeId].nDivision;
    document.getElementById("a1Range").value = shapes[shapeId].a1;
    document.getElementById("a2Range").value = shapes[shapeId].a2;
    document.getElementById("a3Range").value = shapes[shapeId].a3;
    document.getElementById("e1Range").value = shapes[shapeId].e1;
    document.getElementById("e2Range").value = shapes[shapeId].e2;
    if (shapes[shapeId].shape.shapeType === 'toroid'){
        document.getElementById("radiusRange").value = shapes[shapeId].r;
        radius = shapes[shapeId].r;
    }

    document.getElementById("translateX").value = shapes[shapeId].shape.transform.trans.x;
    document.getElementById("translateY").value = shapes[shapeId].shape.transform.trans.y;
    document.getElementById("translateZ").value = shapes[shapeId].shape.transform.trans.z;

    document.getElementById("rotatePitch").value = shapes[shapeId].shape.transform.rot.pitch*180/Math.PI;
    document.getElementById("rotateYaw").value = shapes[shapeId].shape.transform.rot.yaw*180/Math.PI;
    document.getElementById("rotateRoll").value = shapes[shapeId].shape.transform.rot.roll*180/Math.PI;

    document.getElementById("materialAmbient").value = rgbToHex( shapes[shapeId].shape.material.materialAmbient);
    document.getElementById("materialSpecular").value = rgbToHex( shapes[shapeId].shape.material.materialSpecular);
    document.getElementById("materialDiffuse").value = rgbToHex( shapes[shapeId].shape.material.materialDiffuse);

    document.getElementById("materialShininess").value = shapes[shapeId].shape.material.materialShininess;


    a1 = shapes[shapeId].a1;
    a2 = shapes[shapeId].a2;
    a3 = shapes[shapeId].a3;

    w = shapes[shapeId].wDivision;
    n = shapes[shapeId].nDivision;
    e1 = shapes[shapeId].e1;
    e2 = shapes[shapeId].e2;

    x = shapes[shapeId].shape.transform.trans.x;
    y = shapes[shapeId].shape.transform.trans.y;
    z = shapes[shapeId].shape.transform.trans.z;
    pitch = shapes[shapeId].shape.transform.rot.pitch*180/Math.PI;
    yaw = shapes[shapeId].shape.transform.rot.yaw*180/Math.PI;
    roll = shapes[shapeId].shape.transform.rot.roll*180/Math.PI;

    texture = shapes[shapeId].shape.material.texture.img;
    materialSpecular = shapes[shapeId].shape.material.materialSpecular;
    materialDiffuse = shapes[shapeId].shape.material.materialDiffuse;
    materialAmbient = shapes[shapeId].shape.material.materialAmbient;
    materialShininess = shapes[shapeId].shape.material.materialShininess;
}

function rgbToHex(color) {
    return "#" + ((1 << 24) + ( Math.floor(color[0]*255) << 16) + (Math.floor(color[1]*255) << 8) + Math.floor(color[2]*255)).toString(16).slice(1);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var color = vec4(
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255);

    return result ? color : null;
}

function updateShapeList(){

        var options = "";

        function getOption(shape, id){
            return "<option value='" + id +"'>" + id + " - " + shape.shape.shapeType + "</option>";
        }

        for (var i = 0; i < shapes.length; i++){
            options += getOption( shapes[i], i );
        }

        document.getElementById("shapeList").innerHTML = options;

}

async function addHandlers() {

    textures.push(null);

    for (var i = 1; i < 6; i++){
        textures.push(document.getElementById("texture" + i));
    }

    envMapIndex = 0;

    for (var i = 1; i < 3; i++) {

        var im = {};
        im.envPX = document.getElementById("env_" + i + "_p_x");
        im.envPY = document.getElementById("env_" + i + "_p_y");
        im.envPZ = document.getElementById("env_" + i + "_p_z");
        im.envNX = document.getElementById("env_" + i + "_n_x");
        im.envNY = document.getElementById("env_" + i + "_n_y");
        im.envNZ = document.getElementById("env_" + i + "_n_z");

        envMaps.push(im);
    }

    initCube();

    canvas.onmousedown = function (event) {
        mouseDown = true;

        mPos1 = vec2((2*event.clientX/canvas.width-1)*r,
            (2*(canvas.height-event.clientY)/canvas.height-1)*r);

    };

    canvas.onmousemove = function (event){

        if (mouseDown){

            if (first){
                mPos1 = vec2((2*event.clientX/canvas.width-1)*r,
                    (2*(canvas.height-event.clientY)/canvas.height-1)*r);
                first = false;
            }
            else {
                mPos2 = vec2((2*event.clientX/canvas.width-1)*r,
                    (2*(canvas.height-event.clientY)/canvas.height-1)*r);

                rotateCamera = true;
            }

        }

    };

    canvas.onmouseout = function(){
        mouseDown = false;
        first = true;
        rotateCamera = false;
    };



    canvas.onmouseup = function (event) {

        mouseDown = false;
        first = true;
        rotateCamera = false;

    };

    canvas.onwheel = function(event) {
        event.preventDefault();

        r += event.deltaY * -0.02;
        r = Math.min(Math.max(-600, r), -2);

        zoom();
    };

    document.getElementById("renderMode").onchange = function () {
        var data = new FormData(this);
        var value = parseInt( data.entries().next().value[1] );

        setMode(value);
    };

    document.getElementById("texture").onchange = function () {
        textured = this.checked;
        environmentMapped = false;
        document.getElementById("envMap").checked = false;
    };

    document.getElementById("envMap").onchange = function () {
        environmentMapped = this.checked;
        textured = false;
        document.getElementById("texture").checked = false;
    };

    document.getElementById("envSelect").onchange = function () {

        envMapIndex = this.selectedIndex;

        initCube();
    };

    document.getElementById("shapeSelect").onblur = function () {

        var elements = this.options;

        for(var i = 0; i < elements.length; i++){
            elements[i].selected = false;
        }

        for(var i = 0; i < elements.length; i++){
            elements[i].style = "";
        }

        if (shapeId == -1){
            elements[addShapeType].style = "background-color: lightblue;";
        }
    };

    document.getElementById("shapeSelect").onchange = function () {

        var elements = this.options;
        for(var i = 0; i < elements.length; i++){
            elements[i].style = "";
        }

        addShapeType = this.selectedIndex;
        shapeId = -1;

    };


    document.getElementById("shapeList").onblur = function () {

        var elements = this.options;

        for(var i = 0; i < elements.length; i++){
            elements[i].selected = false;
        }

        for(var i = 0; i < elements.length; i++){
            elements[i].style = "";
        }

        if (shapeId > -1){
            elements[shapeId].style = "background-color: lightblue;";
        }
    };


    document.getElementById("shapeList").onchange = function () {
        var elements = this.options;
        for(var i = 0; i < elements.length; i++){
            elements[i].style = "";
        }

        shapeId = this.selectedIndex;

        elements[shapeId].style = "background-color: lightblue;";

        setValues();
    };




    document.getElementById("addShapeButton").onclick = function () {


        if (addShapeType == 0){
            addShape(new Toroid(w,n,a1,a2,a3,radius,e1,e2));

            shapeId = shapes.length-1;
            translation();
            rotation();
            setMaterialColor();
            shapeId = -1;
        }
        else {
            addShape(new Hyperboloid(w,n,a1,a2,a3,e1,e2));
            shapeId = shapes.length-1;
            translation();
            rotation();
            setMaterialColor();
            shapeId = -1;
        }
    };

    document.getElementById("resetParamButton").onclick = function (){
      resetValues();
    };


    document.getElementById("deleteShapeButton").onclick = function () {

        if (shapeId < 0)
            return;

        shapes.splice(shapeId, 1);

        updateShapeList();

    };

    function setMaterialColor(){

        if (shapeId < 0)
            return;

        shapes[shapeId].shape.material.texture.image = texture;
        shapes[shapeId].shape.material.materialAmbient = materialAmbient;
        shapes[shapeId].shape.material.materialDiffuse = materialDiffuse;
        shapes[shapeId].shape.material.materialSpecular = materialSpecular;
        shapes[shapeId].shape.material.materialShininess = materialShininess;
        shapes[shapeId].shape.material.init();
    }


    document.getElementById("materialAmbient").onchange = function () {
        var color = this.value;
        color = hexToRgb(color);

        if (color != null){
            materialAmbient = color;
            setMaterialColor();
        }
    };

    document.getElementById("materialDiffuse").onchange = function () {
        var color = this.value;
        color = hexToRgb(color);

        if (color != null){
            materialDiffuse = color;
            setMaterialColor();
        }
    };

    document.getElementById("materialSpecular").onchange = function () {
        var color = this.value;
        color = hexToRgb(color);

        if (color != null){
            materialSpecular = color;
            setMaterialColor();
        }
    };

    document.getElementById("materialShininess").oninput = function () {
        materialShininess = this.value;
        setMaterialColor();
    };





    document.getElementById("textureList").onchange = function () {

        texture = textures[ this.selectedIndex ];

        if (shapeId < 0)
            return;

        shapes[shapeId].shape.material.texture.image = texture;

    };





    function updateShape(){

        if (shapeId < 0)
            return;

        var prevMaterial = shapes[shapeId].shape.material;
        var prevTransform = shapes[shapeId].shape.transform;

        if (shapes[shapeId].shape.shapeType === "toroid"){
            addShape( new Toroid(w,n,a1,a2,a3,radius,e1,e2), shapeId);
        }
        else if (shapes[shapeId].shape.shapeType === "hyperboloid") {
            addShape( new Hyperboloid(w,n,a1,a2,a3,e1,e2), shapeId);
        }

        shapes[shapeId].shape.material = prevMaterial;
        shapes[shapeId].shape.transform = prevTransform;
    }




    document.getElementById("wDivisionRange").oninput = function () {
        w = this.value;
        updateShape();
    };


    document.getElementById("nDivisionRange").oninput = function () {
        n = this.value;
        updateShape();
    };

    document.getElementById("lightAmbient").onchange = function () {
        var color = this.value;
        color = hexToRgb(color);

        if (color != null){
            lightAmbient = color;
            calculateLight();
        }
    };

    document.getElementById("lightDiffuse").onchange = function () {
        var color = this.value;
        color = hexToRgb(color);

        if (color != null){
            lightDiffuse = color;
            calculateLight();
        }
    };

    document.getElementById("lightSpecular").onchange = function () {
        var color = this.value;
        color = hexToRgb(color);

        if (color != null){
            lightSpecular = color;
            calculateLight();
        }
    };

    document.getElementById("lightX").oninput = function(){

        lightPosition[0] = parseFloat(this.value);

    };

    document.getElementById("lightY").oninput = function () {

        lightPosition[1] = parseFloat(this.value);


    };

    document.getElementById("lightZ").oninput = function () {

        lightPosition[2] = parseFloat(this.value);


    };



    document.getElementById("a1Range").oninput = function () {
        a1 = this.value;
        updateShape();
    };




    document.getElementById("a2Range").oninput = function () {
        a2 = this.value;
        updateShape();
    };





    document.getElementById("a3Range").oninput = function () {
        a3 = this.value;
        updateShape();
    };






    document.getElementById("radiusRange").oninput = function () {
        radius = this.value;
        updateShape();
    };


    document.getElementById("e1Range").oninput = function () {
        e1 = this.value;
        updateShape();
    };

    document.getElementById("e2Range").oninput = function () {
        e2 = this.value;
        updateShape();
    };


    function translation(){

        if (shapeId < 0)
            return;

        shapes[shapeId].shape.transform.translation = new XYZ(x,y,z);

    }

    document.getElementById("translateX").oninput = function(){

        x = parseFloat(this.value);
        translation();

    };

    document.getElementById("translateY").oninput = function () {

        y = parseFloat(this.value);
        translation();

    };

    document.getElementById("translateZ").oninput = function () {

        z = parseFloat(this.value);
        translation();

    };




    function rotation(){

        if (shapeId < 0)
            return;

        shapes[shapeId].shape.transform.rotation = new Rotation(pitch,yaw,roll);

    }

    document.getElementById("rotatePitch").oninput = function () {

        pitch = parseFloat(this.value);
        rotation();

    };


    document.getElementById("rotateYaw").oninput = function () {

        yaw = parseFloat(this.value);
        rotation();

    };


    document.getElementById("rotateRoll").oninput = function () {

        roll = parseFloat(this.value);
        rotation();

    };



}