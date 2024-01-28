var brand = "this Company";
var overall = "N/A";
var myid = chrome.i18n.getMessage("@@extension_id");

const questions = [
  "Are you making a WI$E purchase?",
  "Is this an impulse buy?",
  "Will this purchase bring you joy?",
  "Do you really need this?",
  "Are you open to a more sustainable option?"
];

// Display a popup with a warning message and information about the extension
function showPopup(index) {
  var domain = window.location.hostname;
  domain = domain.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];

  const popupHtml = `
    <div id="wise-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; color: green; background-color: white; border: 2px solid black; width: 500px; max-width: 80%; border-radius: 10px;">
      <h1 style="font-size: 300%; text-align: center;">WI$E Reminder!<br></h1>
      <h2 style="font-size: 200%; text-align: center;">${questions[index]}</h2>
        <div style="text-align: center; margin-top: 20px;"> <!-- Add margin-top for spacing -->
          <button id="close-popup" style="border: 2px solid black; padding: 10px; margin-right: 10px;">No</button>
          <button id="continue" style="border: 2px solid black; padding: 10px; margin-right: 10px;">Yes</button>
          <button id="not-sure" style="border: 2px solid black; padding: 10px;">I'm not sure</button>
        </div>
      </div>
  `;

  // Inject the HTML into the page
  document.body.insertAdjacentHTML('beforeend', popupHtml);

  const closePopupButton = document.getElementById('close-popup');
  const continueButton = document.getElementById('continue');
  const notSureButton = document.getElementById('not-sure');

  if (closePopupButton && continueButton && notSureButton) {
    if(index == 1 || index == 4) {
      continueButton.addEventListener('click', () => {
        document.getElementById('wise-popup').remove();
        // Redirect the user to another website
        if (index == 4) {
          window.location.href = "https://thegirlintheocean.com/eco-friendly-montreal-sustainable-shopping/#";
        } else {
          window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
        }
      });
  
      closePopupButton.addEventListener('click', () => {
        document.getElementById('wise-popup').remove();
        if(index < questions.length - 1) {
          showPopup(index + 1)
        } else {
          //at end of questions
        }
      });
    } else {
    closePopupButton.addEventListener('click', () => {
      document.getElementById('wise-popup').remove();
      // Redirect the user to another website
      window.location.href = "https://google.com";
    });

    continueButton.addEventListener('click', () => {
      document.getElementById('wise-popup').remove();
      if(index < questions.length - 1) {
        showPopup(index + 1)
      } else {
        //at end of questions
      }
    });

    }
    notSureButton.addEventListener('click', () => {
      document.getElementById('wise-popup').remove();
      showTimerPopup(index, notSureButton);
    });
  }
}

function showTimerPopup(index, notSureButton) {
  const timerPopupHtml = `
    <div id="timer-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; color: white; background-color: black; border: 2px solid white; width: 200px; text-align: center; border-radius: 10px;">
      <h1 style="font-size: 200%;">Take some time to think...</h1>
      <div id="timer">10s</div>
    </div>
  `;

  // Inject the timer HTML into the page
  document.body.insertAdjacentHTML('beforeend', timerPopupHtml);

  let seconds = 10;

  // Update the countdown every 1 second
  const interval = setInterval(updateCountdown, 1000);
  const timerElement = document.getElementById('timer');
  
  function updateCountdown() {
    if(!timerElement) {
      clearInterval(interval);
      return;
    }

    if (seconds <= 0) {
      clearInterval(interval);
      timerElement.innerHTML = 'Times Up!';
      setTimeout(function() {
        //your code to be executed after 1 second
        document.getElementById('timer-popup').remove();
        // After the timer expires, show the same question
        showPopup(index);
      }, 2000);
    } else {
      timerElement.innerHTML = `${seconds}s`;
      seconds--;
    }
  }

  //reset timer
  notSureButton.addEventListener('click', () => {
    clearInterval(interval);
    showTimerPopup(index);
  });
}

// Initial popup
showPopup(0);

// Initialize the chatbot
const chatbot = new OpenAIChatbot({ apiKey: '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' });

// Add an event listener to handle extension click
chrome.browserAction.onClicked.addListener(function (tab) {
  // Get the current URL or relevant information
  const currentUrl = tab.url;

  // Open a chat window or modal
  chatbot.openChatWindow({
    context: `Ask about sustainability on ${currentUrl}`,
    // Additional options or customization can be added here
  });
});

// Handle user interactions with the chatbot
// Example: Send a message to the chatbot and display the response
const userMessage = "Tell me about the sustainability practices of this company.";
chatbot.sendMessage(userMessage)
  .then(response => {
    console.log("Bot Response:", response);
    // You can handle the response as needed (e.g., display in the chat window)
  })
  .catch(error => {
    console.error("Error:", error);
    // Handle errors
  });