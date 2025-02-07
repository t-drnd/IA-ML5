let handPose;
let video;
let hands = [];

// A variable to track a pinch between thumb and index
let pinch = 0;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({ flipped: true , maxHands: 1});
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function menu() {}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // If there is at least one hand

  for (let hand of hands) {
    // Find the index finger tip and thumb tip

    let finger = hand.pinky_finger_tip;
    let thumb = hand.thumb_tip;
    let wrist = hand.wrist;
    let index = hand.index_finger_tip;
    let middle_finger = hand.middle_finger_tip;
    
    if(index.y>finger.y && middle_finger.y>finger.y){
      textSize(200);
      text("✌️",wrist.x, wrist.y)
    }
    else if (middle_finger.y > finger.y && ((finger.x- thumb.x)>40)||(finger.x- thumb.x)<-40){
      textSize(200);
      text("🖕",wrist.x, wrist.y)
    }
    else if (thumb.y < finger.y) {
      textSize(200);
      text("👍", wrist.x, wrist.y);
    } else {
      textSize(200);
      text("👎", wrist.x, thumb.y);
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}
