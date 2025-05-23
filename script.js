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
  code = code + createdCode; spin(); spin();
  document.getElementById("total").innerHTML = code;

  // Track how many clicks since last confetti
  if (typeof window.clicksSinceConfetti === 'undefined') {
    window.clicksSinceConfetti = 0;
    window.confettiThreshold = 10;
  }
  window.clicksSinceConfetti++;

  if (window.clicksSinceConfetti >= window.confettiThreshold && code != 0) {
    // Use the current confetti threshold as the particle count, capped at 150
    count = Math.min(window.confettiThreshold, 150);
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
    // Increase threshold for next confetti, but cap at 150
    window.confettiThreshold = Math.min(window.confettiThreshold + 10, 150);
    window.clicksSinceConfetti = 0;
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
    document.getElementById("auto").innerHTML = "Copilot Active 🚀";
    document.getElementById("auto").style.backgroundColor = "red"; // Change button color
    document.getElementById("auto").style.color = "white"; // Change text color
    document.getElementById("auto").style.border = "2px solid white"; // Change border color
    document.getElementById("auto").style.cursor = "not-allowed"; // Change cursor style
    document.getElementById("auto").style.transition = "background-color 0.3s, color 0.3s, border 0.3s, cursor 0.3s"; // Add transition effect
    document.getElementById("auto").style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.5)"; // Add shadow effect
    document.getElementById("auto").style.fontSize = "20px"; // Change font size
    // Fallback: force style with setAttribute and !important
    const autoBtn = document.getElementById("auto");
    autoBtn.disabled = true;
    autoBtn.innerHTML = "Copilot Active 🚀";
    autoBtn.style.backgroundColor = "red";
    autoBtn.style.color = "white";
    autoBtn.style.border = "2px solid white";
    autoBtn.style.cursor = "not-allowed";
    autoBtn.style.transition = "background-color 0.3s, color 0.3s, border 0.3s, cursor 0.3s";
    autoBtn.style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.5)";
    autoBtn.style.fontSize = "20px";
    // Force style with setAttribute and !important
    autoBtn.setAttribute("style",
      "background-color: red !important; color: white !important; border: 2px solid white !important; cursor: not-allowed !important; transition: background-color 0.3s, color 0.3s, border 0.3s, cursor 0.3s !important; box-shadow: 0 0 10px rgba(255,0,0,0.5) !important; font-size: 20px !important;");


    const clickInterval = setInterval(() => {
      button.click();
    }, interval);

    setTimeout(() => {
      clearInterval(clickInterval);
      autoclickerActive = false;
      autoBtn.disabled = false;
      autoBtn.innerHTML = "Copilot Subscription";
      // Reset styles
      autoBtn.setAttribute("style", "");
    }, duration);
  } else if (corehours < 1) {
    alert("You don't have enough corehours to activate the autoclicker");
  }
}

// --- Local Storage Helpers ---
function saveGameState() {
  localStorage.setItem('code', code);
  localStorage.setItem('corehours', corehours);
  localStorage.setItem('createdCode', createdCode);
  localStorage.setItem('count', count);
  localStorage.setItem('lastAngle', lastAngle);
  localStorage.setItem('clicksSinceConfetti', window.clicksSinceConfetti || 0);
  localStorage.setItem('confettiThreshold', window.confettiThreshold || 10);
}

function loadGameState() {
  if (localStorage.getItem('code') !== null) code = parseInt(localStorage.getItem('code'));
  if (localStorage.getItem('corehours') !== null) corehours = parseInt(localStorage.getItem('corehours'));
  if (localStorage.getItem('createdCode') !== null) createdCode = parseInt(localStorage.getItem('createdCode'));
  if (localStorage.getItem('count') !== null) count = parseInt(localStorage.getItem('count'));
  if (localStorage.getItem('lastAngle') !== null) lastAngle = parseInt(localStorage.getItem('lastAngle'));
  if (localStorage.getItem('clicksSinceConfetti') !== null) window.clicksSinceConfetti = parseInt(localStorage.getItem('clicksSinceConfetti'));
  if (localStorage.getItem('confettiThreshold') !== null) window.confettiThreshold = parseInt(localStorage.getItem('confettiThreshold'));
}

function clearGameState() {
  localStorage.clear();
  location.reload();
}

// --- Auto-save on change ---
setInterval(saveGameState, 1000); // Save every second

// --- Load on start ---
window.addEventListener('DOMContentLoaded', function() {
  loadGameState();
  document.getElementById("total").innerHTML = code;
  document.getElementById("cash").innerHTML = corehours;
  if (typeof window.clicksSinceConfetti === 'undefined') window.clicksSinceConfetti = 0;
  if (typeof window.confettiThreshold === 'undefined') window.confettiThreshold = 10;
});