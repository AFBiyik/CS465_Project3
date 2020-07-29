var renderMode = 0;
var programs = [];
var textured = false;
var environmentMapped = false;

function Shape() {

    this.vertices = null;
    this.normals = null;
    this.texCoordinates = null;
    this.material = new Material();
    this.shapeType = null;
    this.transform = new Transform();

    this.viewMatrixLoc = null;
    this.projectionMatrixLoc = null;
    this.modelViewMatrixLoc = null;
    this.ambientProductLoc = null;
    this.diffuseProductLoc = null;
    this.specularProductLoc = null;

    this.lightPositionLoc = null;
    this.shininessLoc = null;
    this.texturedLoc = null;
    this.textureLoc = null;

    this.envMappedLoc = null;
    this.envMapLoc = null;

    this.vBuffer = null;
    this.vPosition = null;
    this.nBuffer = null;
    this.vNormal = null;
    this.tBuffer = null;
    this.vTexCoordinates = null;

    this.setType = function(){

        if (renderMode === 0) {

            this.projectionMatrixLoc = gl.getUniformLocation(programs[0], "projectionMatrix");
            this.modelViewMatrixLoc = gl.getUniformLocation(programs[0], "modelViewMatrix");


            this.vBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

            this.vPosition = gl.getAttribLocation(programs[0], "vPosition");
            gl.vertexAttribPointer(this.vPosition, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.vPosition);

        }
        else if (renderMode === 1){
            gl.useProgram(programs[1]);

            this.viewMatrixLoc = gl.getUniformLocation(programs[1], "viewMatrix");
            this.projectionMatrixLoc = gl.getUniformLocation(programs[1], "projectionMatrix");
            this.modelViewMatrixLoc = gl.getUniformLocation(programs[1], "modelViewMatrix");

            this.ambientProductLoc = gl.getUniformLocation(programs[1], "ambientProduct");
            this.diffuseProductLoc = gl.getUniformLocation(programs[1], "diffuseProduct");
            this.specularProductLoc = gl.getUniformLocation(programs[1], "specularProduct");
            this.lightPositionLoc = gl.getUniformLocation(programs[1], "lightPosition");
            this.shininessLoc = gl.getUniformLocation(programs[1], "shininess");

            this.texturedLoc = gl.getUniformLocation(programs[1], "textured");
            this.textureLoc = gl.getUniformLocation( programs[1], "tex");

            this.envMappedLoc = gl.getUniformLocation(programs[1], "environmentMapped");
            this.envMapLoc = gl.getUniformLocation(programs[1], "environmentMap");

            this.vBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

            this.vPosition = gl.getAttribLocation(programs[1], "vPosition");
            gl.vertexAttribPointer(this.vPosition, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.vPosition);

            this.nBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(this.normals), gl.STATIC_DRAW);

            this.vNormal = gl.getAttribLocation(programs[1], "vNormal");
            gl.vertexAttribPointer(this.vNormal, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.vNormal);

            this.tBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer);
            gl.bufferData( gl.ARRAY_BUFFER, flatten(this.texCoordinates), gl.STATIC_DRAW );

            this.vTexCoordinates = gl.getAttribLocation( programs[1], "vTexCoordinates" );
            gl.vertexAttribPointer( this.vTexCoordinates, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( this.vTexCoordinates );

        }
        else if (renderMode === 2){
            gl.useProgram(programs[2]);

            this.viewMatrixLoc = gl.getUniformLocation(programs[2], "viewMatrix");
            this.projectionMatrixLoc = gl.getUniformLocation(programs[2], "projectionMatrix");
            this.modelViewMatrixLoc = gl.getUniformLocation(programs[2], "modelViewMatrix");

            this.ambientProductLoc = gl.getUniformLocation(programs[2], "ambientProduct");
            this.diffuseProductLoc = gl.getUniformLocation(programs[2], "diffuseProduct");
            this.specularProductLoc = gl.getUniformLocation(programs[2], "specularProduct");
            this.lightPositionLoc = gl.getUniformLocation(programs[2], "lightPosition");
            this.shininessLoc = gl.getUniformLocation(programs[2], "shininess");

            this.texturedLoc = gl.getUniformLocation(programs[2], "textured");
            this.textureLoc = gl.getUniformLocation( programs[2], "tex");

            this.envMappedLoc = gl.getUniformLocation(programs[2], "environmentMapped");
            this.envMapLoc = gl.getUniformLocation(programs[2], "environmentMap");

            this.vBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

            this.vPosition = gl.getAttribLocation(programs[2], "vPosition");
            gl.vertexAttribPointer(this.vPosition, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.vPosition);

            this.nBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(this.normals), gl.STATIC_DRAW);

            this.vNormal = gl.getAttribLocation(programs[2], "vNormal");
            gl.vertexAttribPointer(this.vNormal, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this.vNormal);

            this.tBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer);
            gl.bufferData( gl.ARRAY_BUFFER, flatten(this.texCoordinates), gl.STATIC_DRAW );

            this.vTexCoordinates = gl.getAttribLocation( programs[2], "vTexCoordinates" );
            gl.vertexAttribPointer( this.vTexCoordinates, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( this.vTexCoordinates );
        }

    };

    this.renderShape = function(){

        var modelViewMatrix = mult(viewMatrix, this.transform.modelMatrix);


        if (renderMode === 0) {
            gl.useProgram(programs[0]);

            gl.uniformMatrix4fv(this.projectionMatrixLoc, false, flatten(projectionMatrix));
            gl.uniformMatrix4fv(this.modelViewMatrixLoc, false, flatten(modelViewMatrix));

            // vertex positions
            gl.bindBuffer( gl.ARRAY_BUFFER,  this.vBuffer );
            gl.vertexAttribPointer( this.vPosition, 4, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( this.vPosition );

            for (var i = 0; i < this.vertices.length / 3; i++) {
                gl.drawArrays(gl.LINE_LOOP, i * 3, 3);
            }
        }
        else if (renderMode === 1 || renderMode=== 2){

            gl.useProgram(programs[renderMode]);

            gl.uniformMatrix4fv(this.projectionMatrixLoc, false, flatten(projectionMatrix));
            gl.uniformMatrix4fv(this.modelViewMatrixLoc, false, flatten(modelViewMatrix));
            gl.uniformMatrix4fv(this.viewMatrixLoc, false, flatten(viewMatrix));

            gl.uniform4fv( this.ambientProductLoc, flatten(this.material.ambientProduct) );
            gl.uniform4fv( this.diffuseProductLoc, flatten(this.material.diffuseProduct) );
            gl.uniform4fv( this.specularProductLoc,flatten(this.material.specularProduct) );
            gl.uniform4fv( this.lightPositionLoc,flatten(lightPosition) );
            gl.uniform1f( this.shininessLoc,this.material.materialShininess );

            gl.uniform1i( this.texturedLoc, textured && this.material.texture.tex != null);
            gl.activeTexture( gl.TEXTURE0 );
            gl.bindTexture( gl.TEXTURE_2D, this.material.texture.tex );
            gl.uniform1i(this.textureLoc, 0);

            gl.uniform1i( this.envMappedLoc, environmentMapped && cubeMap != null);
            gl.activeTexture( gl.TEXTURE1 );
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMap);
            gl.uniform1i(this.envMapLoc, 1);

            // vertex positions
            gl.bindBuffer( gl.ARRAY_BUFFER,  this.vBuffer );
            gl.vertexAttribPointer( this.vPosition, 4, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( this.vPosition );

            // vertex normals
            gl.bindBuffer( gl.ARRAY_BUFFER, this.nBuffer );
            gl.vertexAttribPointer( this.vNormal, 4, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( this.vNormal );

            // Texture
            gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer);
            gl.vertexAttribPointer( this.vTexCoordinates, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( this.vTexCoordinates );

            gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);

        }
    };


}

function Material() {

    this.materialAmbient = vec4( 0.8, 0.8, 0.8, 1.0 );
    this.materialDiffuse = vec4( 0.5, 0.5, 0.5, 1.0 );
    this.materialSpecular = vec4( 0.8, 0.8, 0.8, 1.0 );
    this.materialShininess = 20.0;

    this.texture = {
        set image(img){
            this.img = img;
            this.initTexture();
        },
        img: null,
        tex: null,
        initTexture : function () {
            if (this.img != null){
                this.tex = gl.createTexture();
                gl.bindTexture( gl.TEXTURE_2D, this.tex );
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img);
                gl.generateMipmap( gl.TEXTURE_2D );
                gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
                gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            }
            else{
                this.tex = null;
            }
        }
    };

    this.init = function () {
        this.ambientProduct = mult(lightAmbient, this.materialAmbient);
        this.diffuseProduct = mult(lightDiffuse, this.materialDiffuse);
        this.specularProduct = mult(lightSpecular, this.materialSpecular);
    };


    this.init();
}

function Transform(){

    Object.defineProperty(this, "rotation", {
        set : function (rotation) {
            this.rot = rotation;
            this.modelMatrix = this.calculateModelMatrix();
        }
    });

    Object.defineProperty(this, "translation", {
        set : function (translation) {
            this.trans = translation;
            this.modelMatrix = this.calculateModelMatrix();
        }
    });

    this.rot = new Rotation(0 ,0, 0);
    this.trans = new XYZ(0, 0, 0);

    this.calculateModelMatrix = function() {

        var matrix = mat4();
        matrix = mult(matrix, translate(this.trans.x, this.trans.y, this.trans.z));
        matrix = mult(matrix, quaternionToRotationMatrix( calculateQuaternion( this.rot) ) );

        return matrix;
    };

    this.modelMatrix = this.calculateModelMatrix();
}

function degrees2Radians(degrees) {
    return degrees * (Math.PI/180);
}

function Rotation(pitch, yaw, roll) {
    this.pitch = degrees2Radians( pitch);
    this.yaw = degrees2Radians( yaw);
    this.roll = degrees2Radians( roll);
}

function XYZ(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function calculateQuaternion( rotation ) {

    var pitch = rotation.pitch;
    var yaw = rotation.yaw;
    var roll = rotation.roll;

    var cr = Math.cos(roll * 0.5);
    var sr = Math.sin(roll * 0.5);
    var cy = Math.cos(yaw * 0.5);
    var sy = Math.sin(yaw * 0.5);
    var cp = Math.cos(pitch * 0.5);
    var sp = Math.sin(pitch * 0.5);

    return  vec4(
        cr * cy * cp + sr * sy * sp,
        cr * cy * sp - sr * sy * cp,
        sr * cy * sp + cr * sy * cp,
        sr * cy * cp - cr * sy * sp
    );
}

function createQuaternion(angle, axis) {

    var s = Math.sin(angle/2);

    return  vec4(Math.cos(angle/2), axis[0]*s, axis[1]*s, axis[2]*s)
}

function inverseq(q) {

    var k = 1/(q[0]*q[0] + q[1]*q[1] + q[2]*q[2] + q[3]*q[3]);

    return vec4(
        k * q[0],
        -k * q[1],
        -k * q[2],
        -k * q[3]
    );
}

function multq(q1,q2) {
    return vec4(
        q1[0]*q2[0] - q1[1]*q2[1] - q1[2]*q2[2] - q1[3]*q2[3],
        q1[0]*q2[1] + q1[1]*q2[0] + q1[2]*q2[3] - q1[3]*q2[2],
        q1[0]*q2[2] - q1[1]*q2[3] + q1[2]*q2[0] + q1[3]*q2[1],
        q1[0]*q2[3] + q1[1]*q2[2] - q1[2]*q2[1] + q1[3]*q2[0])
}

function quaternionToRotationMatrix(q) {
    var R = mat4(
        [q[0]*q[0] + q[1]*q[1] - q[2]*q[2] - q[3]*q[3], 2*( q[1]*q[2] - q[0]*q[3] )                  , 2*( q[0]*q[2] + q[1]*q[3] )                  , 0],
        [2*( q[1]*q[2] + q[0]*q[3] )                  , q[0]*q[0] - q[1]*q[1] + q[2]*q[2] - q[3]*q[3], 2*( q[2]*q[3] - q[0]*q[1] )                  , 0],
        [2*( q[1]*q[3] - q[0]*q[2] )                  , 2*( q[0]*q[1] + q[2]*q[3] )                  , q[0]*q[0] - q[1]*q[1] - q[2]*q[2] + q[3]*q[3], 0],
        [0,0,0,1] );

    return R;
}