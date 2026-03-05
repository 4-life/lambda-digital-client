precision highp float;

#define NUM_METABALLS 100

uniform vec2 uResolution;
uniform vec3 uMetaballs[NUM_METABALLS];

void main() {
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;

  float sum = 0.0;
  for (int i = 0; i < NUM_METABALLS; i++) {
    vec3 metaball = uMetaballs[i];
    float dx = metaball.x - x;
    float dy = metaball.y - y;
    float radius = metaball.z;

    sum += (radius * radius) / (dx * dx + dy * dy);
  }

  if (sum >= 0.99) {
    gl_FragColor = vec4(
      mix(
        vec3(x / uResolution.x, y / uResolution.y, 0.8),
        vec3(0.0, 0.0, 0.0),
        max(0.0, 1.0 - (sum - 0.99) * 100.0)
      ),
      1.0
    );
    return;
  }

  gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}
