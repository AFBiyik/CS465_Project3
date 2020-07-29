var lightPosition = vec4(0, 20, 0, 1.0 );
var lightAmbient = vec4(0.25, 0.25, 0.25, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var lightProgram;

var shapes = [];

/*var envImages = {
    envPX : null,
    envPY : null,
    envPZ : null,
    envNX : null,
    envNY : null,
    envNZ : null
};*/

var envMaps = [];

var envMapIndex;


var cubeMap;

function initCube() {

    cubeMap = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMap);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X ,0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, envMaps[envMapIndex].envPX);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X ,0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, envMaps[envMapIndex].envNX);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y ,0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, envMaps[envMapIndex].envPY);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y ,0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, envMaps[envMapIndex].envNY);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z ,0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, envMaps[envMapIndex].envPZ);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z ,0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, envMaps[envMapIndex].envNZ);


    gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
}


function calculateLight() {
    for (var i = 0; i < shapes.length; i++){

        shapes[i].shape.material.init();
    }
}

function setMode(mode) {
    renderMode = mode;

    for (var i = 0; i < shapes.length; i++){

        shapes[i].shape.setType();
    }

    updateShapeList();
}

function renderShapes() {

    for (var i = 0; i < shapes.length; i++){

        shapes[i].shape.renderShape();
    }
}

function addShape(shape, id) {

    shape.shape.setType();

    if (arguments.length === 1)
    {
        shapes.push(shape);
    }
    else {
        shapes[id] = shape;
    }

    updateShapeList();
}


function renderLight() {

    var viewProjectionMatrix = mult(projectionMatrix,viewMatrix);

    var color = vec4((lightDiffuse[0]+lightSpecular[0])/2,(lightDiffuse[1]+lightSpecular[1])/2,(lightDiffuse[2]+lightSpecular[2])/2);

    gl.useProgram(lightProgram);

    // Perspective grid
    gl.uniformMatrix4fv( gl.getUniformLocation(lightProgram, "viewProjectionMatrix"), false, flatten(viewProjectionMatrix));
    gl.uniform4fv( gl.getUniformLocation(lightProgram, "vPosition"), flatten(lightPosition));
    gl.uniform4fv( gl.getUniformLocation(lightProgram, "vColor"), flatten(color));

    gl.drawArrays(gl.POINTS, 0, lines.length);
}