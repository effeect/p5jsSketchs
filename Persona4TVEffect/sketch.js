let boolean = false;
let increment = 0;

function setup() {
    createCanvas(1024, 1024);
    rectMode(CENTER);

    let test = new Rectangles()
    rectanglesStor.push(test)
    angleMode(DEGREES)
}

let rectanglesStor = [];


function draw() {
    background(255)
    noFill()
    stroke(255);

    increment++;

    if (increment > 100) {
        rectanglesStor.push(new Rectangles())
        increment = 0;
        boolean = !boolean
    }

    for (var i = 0; i < rectanglesStor.length; i++) {
        rectanglesStor[i].show();
        rectanglesStor[i].update();

        if (rectanglesStor[i].gone()) {
            rectanglesStor.splice(i, 1);
        }
    }
}


class Rectangles {
    constructor() {
        this.size = 5;
        this.rotation = 0;
    }

    update() {
        this.size++;
        this.rotation++;

    }

    show() {
        console.log(this.size)
        push()
        translate(width / 2, height / 2)
        fill(this.size / 4)
        ellipse(0, 0, this.size, this.size)
        pop()
    }
    gone() {
        return this.size > 1050;
    }

}