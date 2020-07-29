var canvas;

var gl;

var gridProgram;

var projectionMatrix;



// t2.shape.material.texture.image = document.getElementById("texImage");

window.onload = function init() {

    // Configure WebGL
    canvas = document.getElementById("canvas");

    gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {
        alert("WebGL isn't available");
        return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.6, 0.8, 0.6, 1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    programs.push( initShaders(gl, "wireframe-vertex-shader", "wireframe-fragment-shader"));
    programs.push( initShaders(gl, "gouraud-vertex-shader", "gouraud-fragment-shader"));
    programs.push( initShaders(gl, "phong-vertex-shader", "phong-fragment-shader"));
    gridProgram = initShaders(gl, "grid-vertex-shader", "grid-fragment-shader");
    lightProgram = initShaders(gl, "light-vertex-shader", "light-fragment-shader");


    projectionMatrix = perspective(60, canvas.width/canvas.height, 1 , 600);
    viewMatrix = lookAt( eyePosition, vec3(0,0,0), vec3(0, 1, 0));

    addHandlers();

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    if (rotateCamera) {

       moveCamera();
    }

    renderGrid();

    renderShapes();

    renderLight();

    window.requestAnimFrame(render);
}

function renderGrid() {

    var viewProjectionMatrix = mult(projectionMatrix,viewMatrix);

    gl.useProgram(gridProgram);

    // Perspective grid
    gl.uniformMatrix4fv( gl.getUniformLocation(gridProgram, "viewProjectionMatrix"), false, flatten(viewProjectionMatrix));

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(lines), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( gridProgram, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    gl.drawArrays(gl.LINES, 0, lines.length);
}

// Grid lines
var lines = (function () {
    var l = [];
    for (var i = 0; i < 600; i++){
        l.push(vec4(-600+i*2,0,-600));
        l.push(vec4(-600+i*2,0,600));
    }

    for (i = 0; i < 600; i++){
        l.push(vec4(-600,0,-600+i*2));
        l.push(vec4(600,0,-600+i*2));
    }
    return l;
})();