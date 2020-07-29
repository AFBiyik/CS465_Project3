function Toroid(wDivision, nDivision, a1, a2, a3, r, e1, e2) {

    this.wDivision = wDivision;
    this.nDivision = nDivision;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.r = r;
    this.e1 = e1;
    this.e2 = e2;
    this.shape = new Shape();
    this.shape.shapeType = "toroid";

    var a0 = r / Math.sqrt(a1 * a1 + a2 * a2);

    function createToroid() {

        var pi = Math.PI;
        var n = -pi;
        var w = -pi;

        var stepN = -2 * n / nDivision;
        var stepW = -2 * w / wDivision;

        var vertices = [];
        var normals = [];
        var texCoordinates = [];

        for (var sw = 0; sw < wDivision; sw++) {

            n = -pi;
            for (var sn = 0; sn < nDivision; sn++) {

                var vertex1 = createVertex(n, w);
                var vertex2 = createVertex(n + stepN, w);
                var vertex3 = createVertex(n, w + stepW);
                var vertex4 = createVertex(n + stepN, w + stepW);

                vertices.push(vertex1.position);
                vertices.push(vertex2.position);
                vertices.push(vertex3.position);

                vertices.push(vertex2.position);
                vertices.push(vertex3.position);
                vertices.push(vertex4.position);

                normals.push(vertex1.normal);
                normals.push(vertex2.normal);
                normals.push(vertex3.normal);

                normals.push(vertex2.normal);
                normals.push(vertex3.normal);
                normals.push(vertex4.normal);

                texCoordinates.push(normalizeTexCoordinates( n, w));
                texCoordinates.push(normalizeTexCoordinates(n + stepN, w));
                texCoordinates.push(normalizeTexCoordinates(n, w + stepW));
                texCoordinates.push(normalizeTexCoordinates(n + stepN, w));
                texCoordinates.push(normalizeTexCoordinates(n, w + stepW));
                texCoordinates.push(normalizeTexCoordinates(n + stepN, w + stepW));

                n += stepN;
            }
            w += stepW;
        }

        function normalizeTexCoordinates(u, v) {
            var s;
            var t;

            s = (u + pi) / (2*pi);
            t = (v + pi) / (2*pi);

            return vec2(s, t);
        }

        return {
            vertices: vertices,
            normals: normals,
            texCoordinates: texCoordinates
        };

    }

    function createVertex(n, w) {

        var cosN = Math.cos(n);
        var sinN = Math.sin(n);
        var cosW = Math.cos(w);
        var sinW = Math.sin(w);

        var x;
        var y;
        var z;
        var nX;
        var nY;
        var nZ;

        if (Math.abs(cosW) <  0.000000005) {
            x = 0;
            nX = 0;
        }
        else if (Math.abs(cosN) <  0.000000005 ){
            x = a1 * a0 * cosW * Math.pow( Math.abs(cosW), e2 - 1);
            nX = 0;
        }
        else {
            x = a1 * ( a0 + cosN * Math.pow( Math.abs(cosN), e1 - 1)) * cosW * Math.pow( Math.abs(cosW), e2 - 1);
            nX = cosN * Math.pow( Math.abs(cosN), 1 - e1) * cosW * Math.pow( Math.abs(cosW), 1 - e2) / a1;
        }

        if ( Math.abs(sinW) <  0.000000005) {
            y = 0;
            nY = 0;
        }
        else if (Math.abs(cosN) <  0.000000005){
            y = a2 * a0 * sinW * Math.pow( Math.abs(sinW), e2 - 1);
            nY = 0;
        }
        else {
            y = a2 * ( a0 + cosN * Math.pow( Math.abs(cosN), e1 - 1)) * sinW * Math.pow( Math.abs(sinW), e2 - 1);
            nY = cosN * Math.pow( Math.abs(cosN), 1 - e1) * sinW * Math.pow( Math.abs(sinW), 1 - e2) / a2;
        }

        if (Math.abs(sinN) <  0.000000005) {
            z = 0;
            nZ = 0;
        }
        else {
            z = a3 * sinN * Math.pow( Math.abs(sinN), e1 - 1);
            nZ = sinN * Math.pow( Math.abs(sinN), 1 - e1) / a3;
        }


        return {
            position: vec4(x, y, z),
            normal: vec4(nX, nY, nZ)
        };
    }

    var t = createToroid();

    this.shape.vertices = t.vertices;
    this.shape.normals = t.normals;
    this.shape.texCoordinates = t.texCoordinates;
}