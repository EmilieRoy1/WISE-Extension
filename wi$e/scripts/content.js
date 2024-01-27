//Get current domain
var domain = window.location.hostname;
domain = domain.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
var brand = "this Company";
var overall = "N/A";
var myid = chrome.i18n.getMessage("@@extension_id");

// Function to generate a random question
function getRandomQuestion() {
  const questions = [
    "Are you making a WI$E purchase?",
    "Do you really need this?",
    "Will this purchase bring you joy?",
    "Can you find a better deal elsewhere?",
    "Is this an impulse buy?"
  ];

  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

// Get a random question
const randomQuestion = getRandomQuestion();

// Display a popup with a warning message and information about the extension
const popupHtml = `
  <div id="wise-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; color: white; background-color: red; border: 20px solid white; border-style: dashed; border-radius: 10px;">
    <h1 style="font-size: 300%; text-align: center;">WI$E Warning</h1>
    <p>This is a warning from the WI$E extension:</p>
    <p><strong>${domain}</strong> may not be the wisest choice for your purchases. Please shop responsibly and consider your financial well-being.</p>
    <h2 style="font-size: 200%; text-align: center;">${randomQuestion}</h2>
    <button id="close-popup">Close</button>
  </div>
`;

// Inject the HTML into the page
document.body.insertAdjacentHTML('beforeend', popupHtml);

// Add functionality to close the popup
const closePopupButton = document.getElementById('close-popup');
if (closePopupButton) {
  closePopupButton.addEventListener('click', () => {
    document.getElementById('wise-popup').remove();
  });
}

/* 

if (confirmation) {
  alert("PROCEED WITH CAUTION.");
} else {
  // Redirect the user to another website
  window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
} */
