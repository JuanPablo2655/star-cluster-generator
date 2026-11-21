var stars = [];

function setup() {
  createCanvas(1366, 768);
  var galaxy = createGalaxyProfile();
  drawGeneratedGalaxyMap(galaxy);

  var amount = Math.round(random(900, 1400));
  document.getElementById("amount").innerHTML = amount;

  stars = generateSpiralGalaxyStars(amount, galaxy);

  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    fill(star.color[0], star.color[1], star.color[2], star.color[3]);
    noStroke();
    ellipse(star.x, star.y, star.r * 2, star.r * 2);
  }
}

function createGalaxyProfile() {
  return {
    centerX: width / 2,
    centerY: height / 2,
    maxRadius: min(width, height) * 0.45,
    armCount: floor(random(2, 6)),
    armTightness: random(4.8, 7.2),
    diskTilt: random(0.52, 0.72),
    rotation: random(TWO_PI)
  };
}

function drawGeneratedGalaxyMap(galaxy) {
  background("#04070f");

  noStroke();
  for (var i = 0; i < 420; i++) {
    var t = random();
    var radius = pow(t, 1.45) * galaxy.maxRadius;
    var arm = floor(random(galaxy.armCount));
    var armOffset = (arm / galaxy.armCount) * TWO_PI;
    var armSpread = 0.18 + (radius / galaxy.maxRadius) * 0.35;
    var angle = radius / galaxy.maxRadius * galaxy.armTightness + armOffset + randomGaussian(0, armSpread) + galaxy.rotation;

    var x = galaxy.centerX + cos(angle) * radius;
    var y = galaxy.centerY + sin(angle) * radius * galaxy.diskTilt;
    var cloudSize = random(40, 130) * (1 - radius / galaxy.maxRadius * 0.45);

    fill(90 + random(40), 95 + random(45), 150 + random(60), random(12, 36));
    ellipse(x, y, cloudSize, cloudSize * random(0.5, 0.9));
  }

  for (var j = 0; j < 2000; j++) {
    fill(180 + random(70), 180 + random(70), 200 + random(55), random(8, 35));
    ellipse(random(width), random(height), random(0.3, 1.2), random(0.3, 1.2));
  }

  for (var k = 0; k < 90; k++) {
    var coreRadius = abs(randomGaussian(0, galaxy.maxRadius * 0.08));
    var coreAngle = random(TWO_PI);
    var coreX = galaxy.centerX + cos(coreAngle) * coreRadius;
    var coreY = galaxy.centerY + sin(coreAngle) * coreRadius * galaxy.diskTilt;
    fill(190 + random(55), 170 + random(50), 140 + random(45), random(35, 70));
    ellipse(coreX, coreY, random(25, 70), random(16, 42));
  }
}

function generateSpiralGalaxyStars(amount, galaxy) {
  var result = [];

  for (var i = 0; i < amount; i++) {
    var isCoreStar = random() < 0.24;
    var radius = isCoreStar ? abs(randomGaussian(0, galaxy.maxRadius * 0.08)) : pow(random(), 1.5) * galaxy.maxRadius;
    var armIndex = floor(random(galaxy.armCount));
    var armOffset = (armIndex / galaxy.armCount) * TWO_PI;
    var armSpread = 0.1 + (radius / galaxy.maxRadius) * 0.22;
    var angle = radius / galaxy.maxRadius * galaxy.armTightness + armOffset + randomGaussian(0, armSpread) + galaxy.rotation;

    var radialJitter = isCoreStar ? randomGaussian(0, 6) : randomGaussian(0, 2.2);
    var x = galaxy.centerX + cos(angle) * (radius + radialJitter);
    var y = galaxy.centerY + sin(angle) * (radius + radialJitter) * galaxy.diskTilt;

    if (x < 0 || x > width || y < 0 || y > height) {
      continue;
    }

    var brightness = isCoreStar ? random(215, 255) : random(170, 250);
    var warmth = isCoreStar ? random(3, 20) : random(-12, 14);
    var size = isCoreStar ? random(1.5, 3.8) : random(0.6, 2.2);

    result.push({
      x: x,
      y: y,
      r: size,
      color: [
        constrain(brightness, 0, 255),
        constrain(brightness - warmth, 0, 255),
        constrain(brightness + random(-10, 10), 0, 255),
        random(130, 245)
      ]
    });
  }

  return result;
}
