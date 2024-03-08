class Robot {
  constructor(){
    this.sprite = new Sprite(width/2,height/2,50,50)
    this.pos = this.sprite.position
    this.angle = 0
    this.r = 50/2
    this.vel = createVector(0,0)
    this.maxSpeed = 1.5
    this.trail = []
    this.spiralling = false;
    this.finding = true;
    this.state = "up";
    this.positions = [];
    this.start = true;
    this.startDelay = 5;
    this.change = false;                      // to confirm if robot is not moving due to obstacle obstruction
    this.prevState = "up";
    this.savePos = [this.pos.x, this.pos.y];  // to check the distance travelled for a row/coloumn switch
    this.snakePattern = "up-down";            // Snaking pattern
    this.possiblyChanging = false;            // snaking pattern might change - if true again, switch pattern
    this.leftRightSnakeStart = "bottom";      // check if left-right snaking starts from the bottom or top

    this.distance = 38;
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
    
    // // your code here
    if(keyIsPressed && key == 'd'){
      this.angle += (1 / PI * 180) /1000      //suspicious looking angle fix
    }
    if(keyIsPressed && key == 'w'){
      this.vel = p5.Vector.fromAngle(this.angle)
      this.pos.add(this.vel);
    }
    // if(frameCount % 250 == 0){
    //    this.angle = random(0,2*PI)
    // }

    /* Snaking */

    this.positions.unshift([this.pos.x, this.pos.y]);
    if (this.positions.length > 16) {
      this.positions.pop();
    }

    if (this.positions.length > 5) {
      if (this.positions[0][0] == this.positions[5][0] && 
        this.positions[0][1] == this.positions[5][1]) {
        this.change = true;
      } else {
        this.change = false;
      }
    }

    if (this.state == "up") {
      this.angle = 1.5*PI;
    } else if (this.state == "left") {
      this.angle = PI;
    } else if (this.state == "down") {
      this.angle = 0.5 * PI;
    } else if (this.state == "right") {
      this.angle = 0;
    }

    if (this.start && this.positions.length > 5) {
      if (this.state == "left") {
        if (this.startDelay != 0) {
          this.startDelay--;
        } else if (this.change) {
          this.state = "down";
          this.prevState = "down";
          this.startDelay = 5;

          this.start = false;
        }
      }

      if (this.state == "up" &&
          this.change) {
        this.state = "left";
      }
    }

    if (this.start) return 0;

    if (this.snakePattern == "up-down") {
      if (this.state == "down" || this.state == "up") {
        if (this.startDelay != 0) {
          this.startDelay--;
        } else if (this.change) {
          print("state:", this.state);
          this.prevState = this.state;
          this.state = "right";
          this.savePos = [this.pos.x, this.pos.y];
          this.startDelay = 5;
        }
      } else if (this.state == "right") {
        if (this.startDelay != 0) {
          this.startDelay--;
        } else if (this.pos.x - this.savePos[0] >= this.distance) {
          this.startDelay = 5;
          if (this.prevState == "down") {
            this.state = "up";
          } else if (this.prevState == "up") {
            this.state = "down";
          }

          this.possiblyChanging = false;
        } else if (this.change) {
          this.startDelay = 5;

          // Change snaking pattern
          if (this.possiblyChanging) {
            this.snakePattern = "left-right";

            if (this.pos.y > height/2) {
              this.leftRightSnakeStart = "up";
            } else {
              this.leftRightSnakeStart = "down";
            }
            this.state = "left";
            this.startDelay = 5;
            return 0;
          }

          if (this.prevState == "down") {
            this.state = "up";
          } else if (this.prevState == "up") {
            this.state = "down";
          }

          this.possiblyChanging = true;
        }
      }
    } else if (this.snakePattern == "left-right") {
      if (this.state == "left" || this.state == "right") {
        if (this.startDelay != 0) {
          this.startDelay--;
        } else if (this.change) {
          print("state:", this.state);
          this.prevState = this.state;
          this.state = this.leftRightSnakeStart;
          this.savePos = [this.pos.x, this.pos.y];
          this.startDelay = 5;
        }
      } else if (this.state == this.leftRightSnakeStart) {
        if (this.startDelay != 0) {
          this.startDelay--;
        } else if (abs(this.pos.y - this.savePos[1]) >= this.distance) {
          this.startDelay = 5;
          
          if (this.prevState == "left") {
            this.state = "right";
          } else if (this.prevState == "right") {
            this.state = "left";
          }

          this.possiblyChanging = true;
        } else if (this.change) {
          this.startDelay = 5;

          if (this.possiblyChanging) {
            if (this.leftRightSnakeStart == "up") {
              this.leftRightSnakeStart = "down";
            } else if (this.leftRightSnakeStart == "down") {
              this.leftRightSnakeStart = "up";
            }
            return 0;
          }

          if (this.prevState == "left") {
            this.state = "right";
          } else if (this.prevState == "right") {
            this.state = "left";
          }
        }
      }
    }




    /* raycasting */

  //   if (this.spiralling) {
  //     this.angle += PI / 60;

  //     return 0;
  //   }

  //   print("omg bruh")
  //   print(this.angle);
  //   print(this.pos.x, this.pos.y);

  //   if ((this.pos.x - 25) % 50 != 0 && this.angle % PI != 0.5) {
  //     let distx = (this.pos.x - 25) % 50;
  //     let disty = (this.pos.y - 25) % 50;

  //     this.angle = atan2(disty, distx);
  //     // return 0;
  //   }

  //   else if ((this.pos.y - 25) % 50 != 0 && this.angle % PI != 0) {
  //     let distx = (this.pos.x - 25) % 50;
  //     let disty = (this.pos.y - 25) % 50;

  //     this.angle = atan2(disty, distx);
  //     // return 0;
  //   }
  //   else {
  //     print("how??")
  //   let matrixX = (this.pos.x - 25) / 50;
  //   let matrixY = (this.pos.y - 25) / 50;
  //   matrix[matrixX, matrixY] = 2;

  //   print(matrixX, matrixY);
  //   print(matrix);

  //   if (matrixX != 0 && matrix[matrixY][matrixX - 1] == 0) {
  //     this.angle = 1.5 * PI;
  //   } else if (matrixY != matrix.length && matrix[matrixY + 1][matrixX] == 0) {
  //     this.angle = PI;
  //   } else if (matrixX != matrix[0].length && matrix[matrixY][matrixX + 1] == 0) {
  //     this.angle = 0.5 * PI;
  //   } else if (matrixY != 0 && matrix[matrixY - 1][matrixX] == 0) {
  //     this.angle = 0;
  //   } else {
  //     this.spiralling = true;
  //   }
  // }

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
