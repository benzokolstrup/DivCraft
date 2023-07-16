window.addEventListener('mousedown', startClickAction);
function startClickAction(e){
    if(e.target.classList.contains('block') && e.target.classList.contains('mouse-over')){
        e.target.remove();
        createTile(0, e.target.getAttribute('data-tile-map-column'), e.target.getAttribute('data-tile-map-row'));
        window.addEventListener('mousemove', mouseMoveAfterClick);
        window.addEventListener('mouseup', removeMouseMoveAfterClick);
    }
    if(e.target.classList.contains('air')){
        if(e.target.classList.contains('mouse-over')){
            createTile(activeHotkey.getAttribute('data-hotkey'), e.target.getAttribute('data-tile-map-column'), e.target.getAttribute('data-tile-map-row'));
        }
    }
    function removeMouseMoveAfterClick(){
        window.removeEventListener('mousemove', mouseMoveAfterClick);
        window.removeEventListener('mouseup', removeMouseMoveAfterClick);
    }
    function mouseMoveAfterClick(e){
        if(e.target.classList.contains('block') && e.target.classList.contains('mouse-over')){
            e.target.remove();
            createTile(0, e.target.getAttribute('data-tile-map-column'), e.target.getAttribute('data-tile-map-row'));
            checkForColidingBlocks(player);
        }
    }
    checkForColidingBlocks(player);
}

window.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if(currentMouseoverEle){
        let previousMouseoverEle = currentMouseoverEle;
        previousMouseoverEle.classList.remove('mouse-over');
    }
    if(mouseX < playerCenterX + range && mouseX > playerCenterX - range && mouseY < playerCenterY + range && mouseY> playerCenterY - range){
        currentMouseoverEle = e.target;
        currentMouseoverEle.classList.add('mouse-over');
    }
});