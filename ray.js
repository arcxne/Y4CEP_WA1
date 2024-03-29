class Ray {
  constructor(x, y, angle) {
    this.pos = createVector(x, y);
    this.dir = p5.Vector.fromAngle(radians(angle));
  }

  // Check for intersection with a wall
  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return; // The lines are parallel or overlapping

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      const intersectionX = x1 + t * (x2 - x1);
      const intersectionY = y1 + t * (y2 - y1);
      return createVector(intersectionX, intersectionY);
    } else {
      return; // No intersection
    }
  }

  // Generate rays for the field of view
  lookAt(walls) {
    const rays = [];
    for (let a = -180; a <= 180 ; a += 1) {
      const ray = new Ray(this.pos.x, this.pos.y,  a);
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = dist(this.pos.x, this.pos.y, pt.x, pt.y);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        // line(this.pos.x, this.pos.y, closest.x, closest.y);
        // print("closest: ", closest);
        if (closest.x != 0 && closest.x != width && closest.y != 0 && closest.y != height) lines.push(closest);
      }
      rays.push(ray);
    }
    
    return rays;
  }

  show(walls) {
    // Display the rays
    stroke(0, 50);
    for (let ray of this.lookAt(walls)) {
      // line(this.pos.x, this.pos.y, ray.pos.x, ray.pos.y);
    }
  }
}
