class Robot {
  constructor(){
    this.sprite = new Sprite(width/2,height/2,50,50)
    this.pos = this.sprite.position
    this.angle = 0
    this.r = 50/2
    this.vel = createVector(0,0)
    this.maxSpeed = 1.5
    this.trail = []
  }
  
  insideMap(){
    if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
    }
    if (this.pos.x < this.r) {
      this.pos.x = this.r;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
    }
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
    } 
  }
  
  update(){
    this.insideMap()
    
    this.vel.limit(this.maxSpeed);
    this.vel = p5.Vector.fromAngle(this.angle)
    this.pos.add(this.vel);
    
    if(frameCount % 5 == 0){
      this.trail.push({x: this.pos.x , y: this.pos.y})
    }
    this.sprite.rotate = this.angle/PI * 180
    
    //your code here
    if(keyIsPressed && key == 'd'){
      this.angle += (1 / PI * 180) /1000      //suspicious looking angle fix
    }
    if(keyIsPressed && key == 'w'){
      this.vel = p5.Vector.fromAngle(this.angle)
      this.pos.add(this.vel);
    }
    if(frameCount % 250 == 0){
       this.angle = random(0,2*PI)
    }
    
  }
  
  
  drawRobot(){
    this.drawTrail()
    
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(0);
    circle(0, 0, this.r * 2);
    push()
    noStroke()
    fill('lightblue')
    circle(0,0,this.r * 2 -10)
    pop()
    rectMode(CENTER)
    rect(15,0,3,30)
    pop();
    
  }
  
  drawTrail(){
    for (let trail of this.trail) {
      noStroke();
      fill(255);
      circle(trail.x, trail.y, this.r * 2 - 10);
    }
  }
}
