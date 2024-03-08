class FloorPlan {
  constructor(){
    this.obstacles = []
    this.itemsTotalSize = 0
  }
  
  createObstacles(){
    let light = new Sprite(width-50, height - 50, 100, 100);
    light.shapeColor = color(165, 42, 42);
    this.itemsTotalSize += 100*100
  
    let light2 = new Sprite(width-200, 150, 100, 100);
    light2.shapeColor = color(165, 42, 42);
    this.itemsTotalSize += 100*100
    
    let light3 = new Sprite(500, 250, 40, 100);
    light3.shapeColor = color(165, 42, 42);
    this.itemsTotalSize += 40*120

    let light4 = new Sprite(350, 500, 90, 150);
    light4.shapeColor = color(165, 42, 42);
    this.itemsTotalSize += 90*150
    
    let light5 = new Sprite(150, 50, 20, 200);
    light5.shapeColor = color(165, 42, 42);
    this.itemsTotalSize += 20*200
    
    this.obstacles.push(light)
    this.obstacles.push(light2)
    this.obstacles.push(light3)
    this.obstacles.push(light4)
    this.obstacles.push(light5)
  }
  
  update(robot){
    for (let obstacle of this.obstacles){
      robot.sprite.collide(obstacle)
      drawSprite(obstacle)
    }
  }
}
