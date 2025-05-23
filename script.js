var code = 0; 
var gpt = document.getElementById("img")
var corehours = 0;
var createdCode = 1; 
var count = 200,
  defaults = {
    origin: { y: 0.7 },
  };
const button = document.getElementById('gptlogo');
const interval = 100; // milliseconds between clicks
const duration = 30 * 1000; // 30 seconds in milliseconds

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}
// Storage for the previous angle
var lastAngle = "";

function spin(){ 
  // Update the total angle needed
  lastAngle = +lastAngle + 180;
  
  // For testing:
  console.clear()
  console.log("Current total angle: " + lastAngle);

  // Move the needle:
  gpt.style.transform = "rotate(" + lastAngle + "deg)";
}
 

function buttonPressed() { 

code=code+createdCode; spin();spin()

             document.getElementById("total").innerHTML = code;	 
if (code%10==0&code!=0) {
  count = code
  fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
} 
function button2Pressed(){
  if (code>=10){
    code -= 10
    corehours += 1
  }
  else{
    alert("You dont have enough lines of code for that")
  }
  document.getElementById("total").innerHTML = code;	
  document.getElementById("cash").innerHTML = corehours;	
}
let autoclickerActive = false; // Prevent multiple autoclickers

function autoclicker(){
  if (corehours >= 1 && !autoclickerActive) {
    corehours -= 1;
    document.getElementById("cash").innerHTML = corehours;
    autoclickerActive = true;
    document.getElementById("auto").disabled = true; // Disable the button
    document.getElementById("auto").innerHTML = "Copilot Active";
    document.getElementById("auto").style.backgroundColor = "red"; // Change button color
    document.getElementById("auto").style.color = "white"; // Change text color
    document.getElementById("auto").style.border = "2px solid white"; // Change border color
    document.getElementById("auto").style.cursor = "not-allowed"; // Change cursor style
    document.getElementById("auto").style.transition = "background-color 0.3s, color 0.3s, border 0.3s, cursor 0.3s"; // Add transition effect
    document.getElementById("auto").style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.5)"; // Add shadow effect
    document.getElementById("auto").style.fontSize = "20px"; // Change font size
    

    const clickInterval = setInterval(() => {
      button.click();
    }, interval);

    setTimeout(() => {
      clearInterval(clickInterval);
      autoclickerActive = false;
      document.getElementById("auto").disabled = false; // Re-enable the button
      document.getElementById("auto").innerHTML = "Copilot Subscription";
      document.getElementById("auto").style.backgroundColor = ""; // Reset button color
      document.getElementById("auto").style.color = ""; // Reset text color
      document.getElementById("auto").style.border = ""; // Reset border color
      document.getElementById("auto").style.cursor = ""; // Reset cursor style
      document.getElementById("auto").style.transition = ""; // Reset transition effect
      document.getElementById("auto").style.boxShadow = ""; // Reset shadow effect
      document.getElementById("auto").style.fontSize = ""; // Reset font size
    }, duration);
  } else if (corehours < 1) {
    alert("You don't have enough corehours to activate the autoclicker");
  }
}