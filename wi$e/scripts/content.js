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
};
showPopup(0);
