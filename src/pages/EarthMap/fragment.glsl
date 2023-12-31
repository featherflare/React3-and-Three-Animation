precision mediump float;
precision mediump int;
uniform float time;
varying vec3 vPosition;
void main()	{

  	    float border = 0.2;
	    float radius = 0.5;
	    vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);
	    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
	    vec2 m = vPosition.xy;
	    float dist = radius - sqrt(m.x * m.x + m.y * m.y);
	    float t = 0.0;
	    if (dist > border)
	      t = 1.0;
	    else if (dist > 0.0)
	      t = dist / border;
	    gl_FragColor = mix(color0, color1, t);
}