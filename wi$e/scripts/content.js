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

function showOverlay() {
  const overlayHtml = `
  <div id="overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999;"></div>
  `;
  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

function removeOverlay() {
  const overlay = document.getElementById('overlay');
  if(overlay) {
    overlay.remove();
  }
}

// Display a popup with a warning message and information about the extension
function showPopup(index) {
  showOverlay();

  var domain = window.location.hostname;
  domain = domain.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];

  const popupHtml = `
    <div id="wise-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; color: green; background-color: white; border: 2px solid black; width: 500px; max-width: 80%; border-radius: 10px; z-index: 1000;">
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
        removeOverlay();
        // Redirect the user to another website
        if (index == 4) {
          window.location.href = "https://thegirlintheocean.com/eco-friendly-montreal-sustainable-shopping/#";
        } else {
          window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
        }
      });
  
      closePopupButton.addEventListener('click', () => {
        document.getElementById('wise-popup').remove();
        removeOverlay();
        if(index < questions.length - 1) {
          showPopup(index + 1)
        } else {
          //at end of questions
          removeOverlay();
        }
      });
      
    } else {
    closePopupButton.addEventListener('click', () => {
      document.getElementById('wise-popup').remove();
      removeOverlay();
      // Redirect the user to another website
      window.location.href = "https://google.com";
    });

    continueButton.addEventListener('click', () => {
      document.getElementById('wise-popup').remove();
      removeOverlay();
      if(index < questions.length - 1) {
        showPopup(index + 1)
      } else {
        //at end of questions
      }
    });

    }
    notSureButton.addEventListener('click', () => {
      document.getElementById('wise-popup').remove();
      removeOverlay();
      showTimerPopup(index, notSureButton);
    });
  }
}

function showTimerPopup(index, notSureButton) {
  showOverlay();

  const timerPopupHtml = `
    <div id="timer-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; color: white; background-color: black; border: 2px solid white; width: 200px; text-align: center; border-radius: 10px; z-index: 1000;">
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


