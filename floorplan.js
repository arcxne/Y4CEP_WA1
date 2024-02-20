class FloorPlan {
  constructor(){
    this.obstacles = []
    this.itemsTotalSize = 0
  }
  
  createObstacles(){
    let light = new Sprite(width-50, height - 50, 100, 100);
    light.shapeColor = color(165, 42, 42);
    this.itemsTotalSize += 100*100
  
    let light2 = new Sprite(width-50, 50, 100, 100);
    light2.shapeColor = color(165, 42, 42);
    this.itemsTotalSize += 100*100
    
    this.obstacles.push(light)
    this.obstacles.push(light2)
    
  }
  
  update(robot){
    for (let obstacle of this.obstacles){
      robot.sprite.collide(obstacle)
      drawSprite(obstacle)
    }
  }
}
