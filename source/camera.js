var viewMatrix;

var r = -20;
var eyePosition = vec3(0,0,r);
var nEyePosition = eyePosition;

var mouseDown = false;
var first = true;
var rotateCamera = false;
var mPos1;
var mPos2;



//var rotPrev = mat4();
var rotPrev = createQuaternion(0,vec3(0,1,0));

function moveCamera() {

    //eyePosition = vec3(0,0,r);

    var p1 = vec3(mPos1[0], -mPos1[1], Math.sqrt(r*r - mPos1[0] * mPos1[0] - mPos1[1] * mPos1[1]));
    var p2 = vec3(mPos2[0], -mPos2[1], Math.sqrt(r*r - mPos2[0] * mPos2[0] - mPos2[1] * mPos2[1]));

    var n = cross(p1, p2);

    var theta = length(n) / (length(p1) * length(p2));

    //var pitch = (mPos2[1] - mPos1[1]);
    //var yaw = (mPos2[0] - mPos1[0]);

    if (Math.abs(theta) > 0.01){


        //var rot = rotate(theta*180/Math.PI, n);
        //var rot = quaternionToRotationMatrix(calculateQuaternion(new Rotation( pitch,yaw,0)));

        //var rot = rotate(pitch*180/Math.PI, vec3(1,0,0));
       //rot = mult( rot, rotate(yaw*180/Math.PI, vec3(0,1,0)));

        var rot = createQuaternion(theta, normalize(n));
        rotPrev = multq(rotPrev, rot);

        var rrrr = quaternionToRotationMatrix(rotPrev);

        //var rrrr = mult( rotPrev, rot);

        //rotPrev = rrrr;

        nEyePosition = mult4(rrrr, vec4(eyePosition));
        nEyePosition.pop();

        viewMatrix = lookAt(nEyePosition, vec3(0, 0, 0), vec3(0, 1, 0));

        mPos1 = mPos2;
    }

}

function zoom() {
    eyePosition = vec3(0,0,r);

    var rrrr = quaternionToRotationMatrix(rotPrev);

    nEyePosition = mult4(rrrr, vec4(eyePosition));
    nEyePosition.pop();

    viewMatrix = lookAt(nEyePosition, vec3(0, 0, 0), vec3(0, 1, 0));
}

function mult4(mat, vec){
    var result = vec4(0,0,0,0);

    for(var i = 0; i < 4; i++){

        result[i] = mat[i][0] * vec[0] + mat[i][1] * vec[1] + mat[i][2] * vec[2] + mat[i][3] * vec[3]

    }


    return result;
}