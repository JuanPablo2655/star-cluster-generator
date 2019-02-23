var stars = [];

function setup() {
  createCanvas(1366, 768);
  background('#3B3B3B');
  
  var protection = 0;
  
  while (stars.length < 500) {
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