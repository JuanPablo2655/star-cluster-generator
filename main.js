var stars = [];
var grid;

function preload() {
  grid = loadImage("cluster_map_template.png");
}

function setup() {
  createCanvas(1366, 768);
  background(grid);
  
  var protection = 0;
  amount = Math.round(random(200,500));
  document.getElementById("amount").innerHTML = amount;
  
  while (stars.length < amount) {
    var star = {
      x: random(width),
      y: random(height),
      r: random(2,4)
    }

    var overlapping = false;
    for (var j = 0; j < stars.length; j++) {
      var other = stars[j];
      var d = dist(star.x, star.y, other.x, other.y);
      if (d < star.r + other.r) {
        overlapping = true;
      }
    }
  
    if (!overlapping) {
      stars.push(star);
    }
    
    protection++;
    if (protection > 10000) {
      break;
    }
  }

  for (var i = 0; i < stars.length; i++) {
    fill('#fff');
    noStroke();
    ellipse(stars[i].x, stars[i].y, stars[i].r * 2, stars[i].r * 2);
  }

}