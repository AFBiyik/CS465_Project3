function Hyperboloid(wDivision, nDivision, a1, a2, a3, e1, e2) {

    this.wDivision = wDivision;
    this.nDivision = nDivision;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.e1 = e1;
    this.e2 = e2;
    this.shape = new Shape();
    this.shape.shapeType = "hyperboloid";

    function createHyperboloid() {

        var pi = Math.PI;
        var n = -pi/2 + 0.2;
        var w = -pi;

        var stepN = -2 * n / nDivision;
        var stepW = -2 * w / wDivision;


        var vertices = [];
        var normals = [];
        var texCoordinates = [];

        for (var sw = 0; sw < wDivision; sw++) {

            n = -pi/2 + 0.2;
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

            s = (u + pi/2 - 0.2) / (pi - 0.4);
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
        var secN = 1/cosN;
        var tanN = sinN / cosN;
        var cosW = Math.cos(w);
        var sinW = Math.sin(w);

        var x = a1 * secN * Math.pow( Math.abs(secN), e1 - 1) * cosW * Math.pow( Math.abs(cosW), e2 - 1 );
        var y = a2 * secN * Math.pow( Math.abs(secN), e1 - 1) * sinW * Math.pow( Math.abs(sinW), e2 - 1 );
        var z = a3 * tanN * Math.pow( Math.abs(tanN), e1 - 1);

        var nX = secN * Math.pow( Math.abs(secN), 1 - e1) * cosW * Math.pow( Math.abs(cosW), 1 - e2 ) / a1;
        var nY = secN * Math.pow( Math.abs(secN), 1 - e1) * sinW * Math.pow( Math.abs(sinW), 1 - e2 ) / a2;
        var nZ = tanN * Math.pow(Math.abs(tanN), 1 - e1) / a3;

        return {
            position: vec4(x, y, z),
            normal: vec4(nX, nY, nZ)
        };
    }

    var t = createHyperboloid();

    this.shape.vertices = t.vertices;
    this.shape.normals = t.normals;
    this.shape.texCoordinates = t.texCoordinates;
}