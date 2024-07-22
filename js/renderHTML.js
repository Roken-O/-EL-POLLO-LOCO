/**
 * Generates the HTML content for the information window displaying game controls.
 * 
 * This function returns a string containing the HTML structure for the information
 * window, which includes descriptions of the game controls. The HTML includes:
 * - A container with the class `popup-infoWindow-container` and an `onclick` attribute
 *   to prevent closing when clicking inside.
 * - A heading "Controls".
 * - A series of control descriptions, each containing:
 *   - A button or label indicating the control key (e.g., "D" for throwing bottles, ">" for moving right).
 *   - A brief description of the control's function (e.g., "Throw bottles", "Move right").
 * 
 * The control descriptions are styled and arranged in a container.
 * 
 * @returns {string} The HTML string to be inserted into the information window.
 */
function infoWindowHTML(){
    return `
    <div id="popup-infoWindow-container" class="popup-infoWindow-container" onclick="doNotClose(event)">
      <h2>Controls</h2>
      <div class="controlsContainer">
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span id="throwBtn">D</span></div>
                    <div>Throw bottles</div>
            </div>
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span id="rightBtn">></span></div>
                    <div>Move right</div>
            </div>
            <div class="sub-controlsContainer">
                    <div class="letterContainer"><span id="leftBtn"><</span></div>
                    <div>Move left</div>
            </div>
            <div class="sub-controlsContainer">
                    <div id="jumpBtnContainer" class="letterContainer spacebar"><span id="jumpBtn">spacebar</span></div>
                    <div>Jump</div>
            </div>
      </div>
   </div>`;
}

/**
 * Returns the background image URLs for the end game overlay.
 * @returns {string} - The concatenated background image URLs.
 */
function returnImage() {
    return "url('img/2_character_pepe/3_jump/J-35.png'), " +
        "url('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'), " +
        "url('img/8_coin/coin_1.png'), " +
        "url('img/8_coin/coin_1.png'), " +
        "url('img/5_background/layers/4_clouds/1.png')," +
        "url('img/5_background/layers/air.png')";
}

/**
 * Generates the HTML content for the imprint window.
 * 
 * This function returns a string containing the HTML structure for the
 * imprint window, including the contact information and address as required
 * by § 5 TMG. The HTML includes:
 * - A container with class names for styling and animation
 * - A heading for "Impressum"
 * - Subheadings and contact details including name, address, phone number,
 *   and email.
 * 
 * @returns {string} The HTML string to be inserted into the imprint window.
 */
function imprintHTML(){
    return `<div id="popup-imprintWindow-container" class="popup-infoWindow-container popup-imprint">
   <h2> Imprint </h2>
   <h3> Angaben gemäß § 5 TMG:</h3>
    <span>Roken Othman<br>
    Langerfelder Str.76<br>
    42389 Wuppertal<br>
    Deutschland</span>
    <h3>Kontakt:</h3>
    <span>Telefon: 017643611217<br>
    E-Mail: roken.othman91@gmail.com </span>
    </div>
    `;
}