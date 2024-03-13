uniform sampler2D uPerlinTexture;
uniform float uTime;

varying vec2 vUv;


void main () {

  // Scale and animate
  vec2 smokeUv = vUv;
  smokeUv *= 0.5;
  smokeUv.y *=  0.3;
  smokeUv.y -= uTime * 0.03;

  // Smoke
  float smoke = texture(uPerlinTexture, smokeUv).r;

  // Remap
  // STUDY - assim os valores a baixo de 0.4 são 0, desta forma ceratas partes do fumo não aparecem
  smoke = smoothstep(0.3, 1.0, smoke);

  // Edges
  smoke *= smoothstep(0.0, 0.1, vUv.x);
  smoke *= smoothstep(1.0, 0.9, vUv.x);

  smoke *= smoothstep(0.0, 0.1, vUv.y);
  smoke *= smoothstep(1.0, 0.4, vUv.y);

  gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}