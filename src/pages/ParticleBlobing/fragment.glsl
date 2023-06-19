uniform sampler2D uTexture;
varying vec3 v_position;
varying vec2 vUv;
void main() {
  vec4 image = texture2D(textureSampler,vUv);

  vec3 normal = normalize(cross(dFdx(v_position),dFdy(v_position)));

  vec3 light = vec3(0.,0.,1.);

  vec3 prod = clamp(cross(normal,light), 0., 1.0);


  gl_FragColor = image*(1. - prod.r/3. - prod.g/3. - prod.g/3.);
}