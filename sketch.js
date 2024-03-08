//'d' to rotate the robot clockwise
//'w' to move it forward

// I hate comments on p5js editor
// Looks significantly less distracting on vscode :)

let robot
let scoreButton
let floorPlan

let ray;
let lines = [];
let fullLines = [];
let walls = [];

const div = 50;
let matrix = [];
let start = false;

let dirtyFloor;

function preload() {
  dirtyFloor = loadImage('images/lots%20of%20love%20-%20from%20Bertram.png');
}

function setup() {
  createCanvas(800, 600);
  robot = new Robot()
  floorPlan = new FloorPlan()
  floorPlan.createObstacles()

  scoreButton = createButton('check score')
  scoreButton.mousePressed(tabulate);

  // Matrix of field in blocks of 50x50
  for (let i=0; i<height; i+=div) {
    let r = [];
    for (let j=0; j<width; j+=div) {
      r.push(0);
      line(j, 0, j, height);
      line(0, i, width, i);
    }
    matrix.push(r);
  }

  makeWalls(floorPlan.obstacles);
  print("start");
  print(floorPlan.obstacles);
  print(walls);
  print(matrix);

  start = true;

  print("hi");
}

function draw() {
  background(100);
  dirtyFloor.resize(width, 0);
  image(dirtyFloor, 0, 0);
  // if (start) {

    if (frameCount % 60 == 0) {
      ray = new Ray(robot.pos.x, robot.pos.y, 0);
      ray.lookAt(walls);
      ray.show(walls);
    }

    editMatrix();

    robot.drawRobot();
    robot.update();
    floorPlan.update(robot);

    // display walls
    for (let wall of walls) {
      wall.show();
    }

    if(frameCount == 60*60*2){
      createP('done!')
      noLoop() 
    }

  // }
}

function editMatrix() {
  fullLines.push(lines);

  // if (lines.length > 0) print("line ", lines[0], lines[0].x, lines[0].y);
  
  for (let i=0; i<lines.length; i++) {
  
    let pt = lines[i];
  
    pt.x = (pt.x - pt.x%div) / div;
    pt.y = (pt.y - pt.y%div) / div;

    // print(pt.x, pt.y);
    matrix[pt.y][pt.x] = 1;
  }
  lines.length = 0;
}

// grab the obstacles and make them into walls (assuming all rectangles)
function makeWalls(obstacles) {
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(0, 0, 0, height));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(0, height, width, height));
  // print(obstacles.length);
  for (let ob of obstacles) {
    // // check if each dimension is defined. if not, square!
    // if (ob.x == null) ob.x = ob.h;
    // if (ob.h == null) ob.h = ob.w;

    let cx = ob.position.x,
        cy = ob.position.y;

    let x1 = cx-ob._internalWidth/2,
        y1 = cy-ob._internalHeight/2,
        x2 = cx+ob._internalWidth/2,
        y2 = cy+ob._internalHeight/2;
   
    print(ob._internalWidth, cx);
    print(ob._internalHeight, cy);
    walls.push(new Wall(x1, y1, x2, y1));
    walls.push(new Wall(x1, y1, x1, y2));
    walls.push(new Wall(x2, y1, x2, y2));
    walls.push(new Wall(x1, y2, x2, y2));
  }
}

function tabulate() {
  // If the sketch is a graph paper, "total" variable is the number of small squares on said graph paper
  let total = width * height;

  loadPixels();

  // Refer to https://p5js.org/reference/#/5/pixels
  // Some displays will draw multiple pixels per "small square" of graph paper. The total number of pixels used per square can be calculated using pixelDensity()
  let pixelsPerSquare = pixelDensity() * pixelDensity();

  // Find the number of squares that are white in colour. To do so, we find groups of 4 consecutive values in the array that equal 255 (i.e. RGBA is all 255), then divide the total number of groups by pixel density
  // We cannot directly filter the array to include items that equal 255, because alpha values for other coloured pixels will also equal 255.
  let whiteSquaresCount = 0;

  for (let i = 3; i <= pixels.length; i += 4) {
    if (
      pixels[i] == 255 &&
      pixels[i - 1] == 255 &&
      pixels[i - 2] == 255 &&
      pixels[i - 3] == 255
    ) {
      whiteSquaresCount += 1;
    }
  }

  whiteSquaresCount /= pixelsPerSquare;

  // Calculate percentage of squares that are white
  let score =
    str(
      round((whiteSquaresCount / (total - floorPlan.itemsTotalSize)) * 100, 2)
    ) + "% of the room is clean.";
  createP(score);

  print(matrix);
  print(matrix.length);
}
