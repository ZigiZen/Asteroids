var ship;

function setup() {
    // createCanvas(400, 400);
    createCanvas(550, 400);
    frameRate(30);
    ship = new ship();
}

function draw() {
    background(10, 10, 10);
    ship.render();
    ship.turn();
    ship.update();
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        ship.setRotation(-0.1);
    }

    if (keyCode == UP_ARROW){
        ship.boost();
    }
}

function keyReleased() {
    ship.setRotation(0);
}

function ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 10;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);

    this.update = function () {
        this.pos.add(this.vel);
        this.vel.mult(0.96);
    }

    this.boost = function(){
        var force = p5.Vector.fromAngle(this.heading);
        this.vel.add(force);
    }

    this.render = function () {
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        noFill();
        stroke(255);
        strokeWeight(3);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    }

    this.setRotation = function (a) {
        this.rotation = a;
    }

    this.turn = function () {
        this.heading += this.rotation;
    }
}