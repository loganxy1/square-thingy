var noseX = 0;
var noseY = 0;

var right_x = 0;
var left_x = 0;
var difference = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 425);
    canvas.position(800, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X : "+noseX+", Nose Y : "+noseY);

        left_x = results[0].pose.leftWrist.x;
        right_x = results[0].pose.rightWrist.x;
        difference = floor(left_x - right_x);
        console.log("Left Wrist X : "+left_x+", Right Wrist X : "+right_x+", Difference : "+difference);
    }
}

function draw(){
    background('#87ceeb');
    document.getElementById("square_span").innerHTML = "Width and Height of the Square - "+difference+"px";
    fill('#F400FF');
    stroke('00E9FF');
    square(noseX, noseY, difference);
}