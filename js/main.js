// Creating the shadow overlay
const playArea = document.querySelector('#playarea');
function createOverlayEl(){
    var shadeOverlay = document.createElement('div');
    shadeOverlay.classList.add('shade-overlay');
    playArea.append(shadeOverlay);
}
createOverlayEl();