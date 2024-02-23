//'d' to rotate the robot clockwise
//'w' to move it forward

// I hate comments on p5js editor
// Looks significantly less distracting on vscode :)

let robot
let scoreButton
let floorPlan

let matrix = [];

function setup() {
  createCanvas(800, 600);
  robot = new Robot()
  floorPlan = new FloorPlan()
  floorPlan.createObstacles()
  
  scoreButton = createButton('check score')
  scoreButton.mousePressed(tabulate);

  // Matrix of field in blocks of 50x50
  for (let i=0; i<width; i+=50) {
    let r = [];
    for (let j=0; j<height; j+=50) {
      r.push(0);
    }
    matrix.push(r);
  }

  print(matrix);
}

function draw() {
  background(100);
  
  robot.drawRobot()
  robot.update()
  floorPlan.update(robot)
    
  if(frameCount == 60*60*2){
    createP('done!')
    noLoop() 
  }
}

// useless function honestly
function printMatrix() {
  for (let i=0, n=width/20; i<width/n; i++) {
    for (let j=0, m=height/20; j<height/m; j++) {
      print(matrix[i][j]);
    }
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
}
