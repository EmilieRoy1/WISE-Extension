//Get current domain
//var domain = window.location.hostname;
//domain = domain.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
var brand = "this Company";
var overall = "N/A";
var myid = chrome.i18n.getMessage("@@extension_id");

// Function to generate a random question
/*function getRandomQuestion() {
  const questions = [
    "Are you making a WI$E purchase?",
    "Do you really need this?",
    "Will this purchase bring you joy?",
    "Can you find a better deal elsewhere?",
    "Is this an impulse buy?"
  ];

  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}*/

const questions = [
  "Are you making a WI$E purchase?",
  "Are you sure this is not an impulse buy?",
  "Will this purchase bring you joy?",
  "Do you really need this?",
  "Are you open to a more sustainable option?"
];

// Get a random question
//const randomQuestion = getRandomQuestion();

// Display a popup with a warning message and information about the extension
function showPopup(index) {
  var domain = window.location.hostname;
  domain = domain.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];

  const popupHtml = `
    <div id="wise-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; color: white; background-color: red; border: 20px solid white; border-style: dashed; border-radius: 10px;">
      <h1 style="font-size: 300%; text-align: center;">WI$E Warning</h1>
      <p>This is a warning from the WI$E extension:</p>
      <p><strong>${domain}</strong> may not be the wisest choice for your purchases. Please shop responsibly and consider your financial well-being.</p>
      <h2 style="font-size: 200%; text-align: center;">${questions[index]}</h2>
      <div style="text-align: center;">
        <button id="close-popup">No</button>
        <button id="continue">Yes</button>
        <button id="not-sure">I'm not sure</button>
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
        window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
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
      window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
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
      //timer
      showPopup(index);
    });
  }
};/* else if (continueButton) {
    showPopup(1);
    if(closePopupButton) {
      showPopup(2);
      if(closePopupButton) {
        closePopupButton.addEventListener('click', () => {
          document.getElementById('wise-popup').remove();
        });
        // Redirect the user to another website
        window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
      } else if(continueButton) {
          showPopup(3);
          if(closePopupButton) {
            closePopupButton.addEventListener('click', () => {
              document.getElementById('wise-popup').remove();
            });
            // Redirect the user to another website
            window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
          } else if(continueButton) {
              showPopup(4);
              if(closePopupButton) {
                //do something
              } else if(continueButton) {
                continueButton.addEventListener('click', () => {
                  document.getElementById('wise-popup').remove();
                });
                //redirect to local business
                window.location.href = "";
              } else {
                //timer
                showPopup(4);
              }
          } else {
            //timer
            showPopup(3);
          }
      } else {
        //timer
        showPopup(2);
      }
    } else if(continueButton) {
      continueButton.addEventListener('click', () => {
        document.getElementById('wise-popup').remove();
      });
      // Redirect the user to another website
      window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
    } else {
      //timer
      showPopup(1);
    }
  } else {
    //timer and loop back to question
    showPopup(0);
  }

};*/
showPopup(0);

/*if (closePopupButton) {
  closePopupButton.addEventListener('click', () => {
    document.getElementById('wise-popup').remove();
  });
}*/


// Add functionality to close the popup
/*const closePopupButton = document.getElementById('close-popup');
const continueButton = document.getElementById('continue');

if (closePopupButton) {
  // Redirect the user to another website
  window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
} else if (continueButton) {
  popupHtml(1);
  if(closePopupButton) {
    popupHtml(2);
    if(closePopupButton) {
      // Redirect the user to another website
      window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
    } else if(continueButton) {
        popupHtml(3);
        if(closePopupButton) {
          // Redirect the user to another website
          window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
        } else if(continueButton) {
            popupHtml(4);
            if(closePopupButton) {
              //do something
            } else if(continueButton) {
              //redirect to local business
              window.location.href = "";
            } else {
              //timer
              popupHtml(4);
            }
        } else {
          //timer
          popupHtml(3);
        }
    } else {
      //timer
      popupHtml(2);
    }
  } else if(continueButton) {
    // Redirect the user to another website
    window.location.href = "https://www.tiktok.com/@sadgrlswag/video/7191631951827307822";
  } else {
    //timer
    popupHtml(1);
  }
} else {
  //timer and loop back to question
  popupHtml(0);
}
*/
