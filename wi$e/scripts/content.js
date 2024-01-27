// script.js

// Display a popup with a warning message and information about the extension
const popupHtml = `
  <div id="wise-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: white; border: 2px solid black;">
    <h2>WI$E Warning</h2>
    <p>This is a warning from the WI$E extension:</p>
    <p><strong>www.sephora.com</strong> may not be the wisest choice for your purchases.</p>
    <p>Please shop responsibly and consider your financial well-being.</p>
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
