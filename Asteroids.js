var ship;
var asteroids = [];
var lasers = [];

function setup() {
    // createCanvas(400, 400);
    createCanvas(550, 500);
    frameRate(30);
    Ship = new Ship();
    for (var i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(10, 10, 10);
    for (var i = 0; i < asteroids.length; i++) {
        if (Ship.hits(asteroids[i])) {
            console.log("jajco");
        }
        asteroids[i].render();
        asteroids[i].update();
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        for (var j = asteroids.length - 1; j >= 0; j--) {
            if (lasers[i].hits(asteroids[j])) {
                if (asteroids[j].r > 10) {
                    var newAsteroids = asteroids[j].breakup();
                    console.log("newA pos = " + newAsteroids[0].pos)
                    asteroids = asteroids.concat(newAsteroids);
                }
                asteroids.splice(j, 1);
                lasers.splice(i, 1);
                break;
            }
        }
        if (typeof lasers[i] != 'undefined') {
            if (lasers[i].offscreen()) {
                lasers.splice(i, 1);
            }
        }
    }


    Ship.render();
    Ship.turn();
    Ship.update();
    Ship.edges();
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW | keyCode == 68) {
        Ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW | keyCode == 65) {
        Ship.setRotation(-0.1);
    }

    if (keyCode == UP_ARROW | keyCode == 87) {
        Ship.boosting(true);
    }

    if (keyCode == 32) {
        // if (event.key == 32) {
        lasers.push(new Laser(Ship.pos, Ship.heading));
    }
}

function keyReleased() {
    Ship.setRotation(0);
    Ship.boosting(false);
}