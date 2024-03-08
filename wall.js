class Wall {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1); // Start point of the wall
    this.b = createVector(x2, y2); // End point of the wall
  }

  // Display the wall
  show() {
    stroke(0, 0, 255); // Set stroke color to black
    strokeWeight(1);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
