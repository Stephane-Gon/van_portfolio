varying vec2 vUv;
uniform float u_intensity;
uniform float u_amount;
uniform float u_time;
uniform float u_shineStrength;
uniform float u_shineChance;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // Gradient colors for background
  vec3 topColor = vec3(0.02, 0.1, 0.2);
  vec3 bottomColor = vec3(0.0, 0.0, 0.0);
  
  // Calculate gradient from bottom to top
  vec3 gradient = mix(bottomColor, topColor, vUv.y);
  
  // Generate random number for stars based on vUv
  float starRandom = random(vUv);
  
  // Make stars appear less frequently by introducing a threshold
  float starThreshold = u_amount; // Adjust this value to control star ammount
  float starVisibility = step(starThreshold, starRandom);  // Star is visible if random value exceeds threshold

  // Generate another random number to decide which stars will shine
  float shineChance = random(vUv * 10.0);  // Change multiplier to adjust shine distribution
  float shouldShine = step(u_shineChance, shineChance); // Only stars with random > 0.8 will shine (20% chance)

  // Vary the brightness of stars based on a second random value
  float brightnessVariation = random(vUv * 5.0); // Adjust multiplier for more/less variation
  brightnessVariation += shouldShine * (u_shineStrength * sin(u_time + starRandom * 5.0)); // Shine only for selected stars

  // Calculate the star's intensity, scaling by u_intensity uniform and brightness variation
  float starIntensity = starVisibility * brightnessVariation * u_intensity;
  
  // Set star color (brighter stars will have more intensity)
  vec3 starColor = vec3(1.0) * starIntensity;

  // Combine the gradient background and stars
  vec3 finalColor = gradient + starColor;
  
  // Output the final color
  gl_FragColor = vec4(finalColor, 1.0);
}