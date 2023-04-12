window.addEventListener('keydown', startKeyboardAction);
window.addEventListener('keyup', stopKeyboardAction);
window.addEventListener('mousedown', startClickAction);

const hotkeys = document.querySelectorAll('#hotbar .hotkey');
let activeHotkey = document.querySelector('.hotkey.active');
let playerEl = document.querySelector('#player');

let moveRightInterval;
let moveLeftInterval;
let jumpInterval;
let falling;
let jumping;
let currentMouseoverEle;

let isMovingRight = false;
let isMovingLeft = false;
let isJumping = false;
let isFalling = false;

let colidingGroundBlocks = [];
let colidingTopBlocks = [];
let colidingLeftBlocks = [];
let colidingRightBlocks = [];
let blockOverlapThreshold = 40;

let speed = 5;
let intervalSpeed = 10;
let jumpHeight = 160;
let jumps = 1;
let range = 250;

let player = {
    name: 'CosmicDwarf',
    race: 'Human',
    class: 'Warrior',
}

let playerCenterX = playerEl.offsetLeft + (playerEl.offsetWidth / 2);
let playerCenterY = playerEl.offsetTop + (playerEl.offsetHeight / 2);

let playerBottom = playerEl.offsetTop + playerEl.offsetHeight;
let playerTop = playerEl.offsetTop;
let playerLeft = playerEl.offsetLeft;
let playerRight = playerEl.offsetLeft + playerEl.offsetWidth;

function startKeyboardAction(e){
    switch(e.keyCode) {
        case 68:
            if(!isMovingRight){
                isMovingRight = true;
                moveRightInterval = setInterval( () => {
                    playerEl.style.left = `${playerEl.offsetLeft + speed}px`;
                    if(colidingRightBlocks.length > 0 && playerRight >= colidingRightBlocks[0].getAttribute('data-left-pos')){
                        playerEl.style.left = `${colidingRightBlocks[0].getAttribute('data-left-pos') - playerEl.offsetWidth}px`;
                    }
                    updatePlayerPos();
                    checkGround();
                }, intervalSpeed);
            }
        break;
        case 65:
            if(!isMovingLeft){
                isMovingLeft = true;
                moveLeftInterval = setInterval( () => {
                    playerEl.style.left = `${playerEl.offsetLeft - speed}px`;
                    if(colidingLeftBlocks.length > 0 && playerLeft <= colidingLeftBlocks[0].getAttribute('data-right-pos')){
                        playerEl.style.left = `${colidingLeftBlocks[0].getAttribute('data-right-pos')}px`;
                    }
                    updatePlayerPos();
                    checkGround();
                }, intervalSpeed);
            }
        break;
        case 32:
            if(!isJumping && !isFalling){
                jumpInterval = setInterval( () => {
                    jump();
                }, intervalSpeed);
            }
        break;
        case 49:
            setActiveHotkey(e);
        break;
        case 50:
            setActiveHotkey(e);
        break;
        case 51:
            setActiveHotkey(e);
        break;
        case 52:
            setActiveHotkey(e);
        break;
        case 53:
            setActiveHotkey(e);
        break;
        case 54:
            setActiveHotkey(e);
        break;
        case 55:
            setActiveHotkey(e);
        break;
        case 56:
            setActiveHotkey(e);
        break;
        case 57:
            setActiveHotkey(e);
        break;
    }
    if(isMovingRight && isMovingLeft){
        clearInterval(moveRightInterval);
        clearInterval(moveLeftInterval);
    }
}

function stopKeyboardAction(e){
    switch(e.keyCode) {
        case 68:
            if(isMovingRight && isMovingLeft){
                moveLeftInterval = setInterval( () => {
                    playerEl.style.left = `${playerEl.offsetLeft - speed}px`;
                    if(colidingLeftBlocks.length > 0 && playerLeft <= colidingLeftBlocks[0].getAttribute('data-right-pos')){
                        playerEl.style.left = `${colidingLeftBlocks[0].getAttribute('data-right-pos')}px`;
                    }
                    updatePlayerPos();
                    checkGround();
                }, intervalSpeed);
            }
            isMovingRight = false;
            clearInterval(moveRightInterval);
        break;
        case 65:
            if(isMovingRight && isMovingLeft){
                moveRightInterval = setInterval( () => {
                    playerEl.style.left = `${playerEl.offsetLeft + speed}px`;
                    if(colidingRightBlocks.length > 0 && playerRight >= colidingRightBlocks[0].getAttribute('data-left-pos')){
                        playerEl.style.left = `${colidingRightBlocks[0].getAttribute('data-left-pos') - playerEl.offsetWidth}px`;
                    }
                    updatePlayerPos();
                    checkGround();
                }, intervalSpeed);
            }
            isMovingLeft = false;
            clearInterval(moveLeftInterval);
        break;
        case 32:
            clearInterval(jumpInterval);
        break;
    }
}

function updatePlayerPos(){
    playerCenterX = playerEl.offsetLeft + (playerEl.offsetWidth / 2);
    playerLeft = playerEl.offsetLeft;
    playerRight = playerEl.offsetLeft + playerEl.offsetWidth;
}

function jump(){
    if(!isJumping){
        isJumping = true;
        let jumpingSpeed = speed * 1.5;
        let startingTopPos = playerEl.offsetTop;
        jumping = setInterval( () => {
            jumpingSpeed *= 0.99;
            playerEl.style.top = `${playerEl.offsetTop - jumpingSpeed}px`;
            if(playerEl.offsetTop <= startingTopPos - jumpHeight){
                clearInterval(jumping);
                fall();
            }
            playerBottom = playerEl.offsetTop + playerEl.offsetHeight;
            playerTop = playerEl.offsetTop;
            playerCenterY = playerEl.offsetTop + (playerEl.offsetHeight / 2);
            checkGround();
        }, intervalSpeed);
    }
}

function fall(){
    isFalling = true;
    let fallingSpeed = speed;
    falling = setInterval( () => {
        checkGround();
        fallingSpeed *= 1.01;
        playerEl.style.top = `${playerEl.offsetTop + fallingSpeed}px`;
        playerBottom = playerEl.offsetTop + playerEl.offsetHeight;
        playerTop = playerEl.offsetTop;
        playerCenterY = playerEl.offsetTop + (playerEl.offsetHeight / 2);
        if(colidingGroundBlocks.length > 0 && playerBottom >= colidingGroundBlocks[0].getAttribute('data-top-pos')){
            playerEl.style.top = `${colidingGroundBlocks[0].getAttribute('data-top-pos') - playerEl.offsetHeight}px`;
            clearInterval(falling);
            clearInterval(jumping);
            isFalling = false;
            isJumping = false;
            playerBottom = playerEl.offsetTop + playerEl.offsetHeight;
            playerTop = playerEl.offsetTop;
            playerCenterY = playerEl.offsetTop + (playerEl.offsetHeight / 2);
        }

    }, intervalSpeed);
    checkGround();
}

function checkGround(){
    let allBlocks = document.querySelectorAll('.block');
    colidingGroundBlocks = [];
    colidingRightBlocks = [];
    colidingLeftBlocks = [];
    allBlocks.forEach((block) => {
        block.classList.remove('active');
        // Check for blocks under the player
        if(block.getAttribute('data-top-pos') >= playerBottom && block.getAttribute('data-top-pos') < playerBottom + blockOverlapThreshold){
            if(block.getAttribute('data-left-pos') <= playerLeft && block.getAttribute('data-right-pos') > playerLeft || block.getAttribute('data-right-pos') >= playerRight && block.getAttribute('data-left-pos') < playerRight){
                colidingGroundBlocks.push(block);
            }
        }
        // Check for blocks on the right of the player
        if(block.getAttribute('data-left-pos') < playerRight + blockOverlapThreshold && block.getAttribute('data-right-pos') > playerRight && block.getAttribute('data-top-pos') > playerTop - blockOverlapThreshold && block.getAttribute('data-bottom-pos') < playerBottom + blockOverlapThreshold){
            colidingRightBlocks.push(block);
        }
        // Check for blocks on the left of the player
        if(block.getAttribute('data-right-pos') > playerLeft - blockOverlapThreshold && block.getAttribute('data-left-pos') <= playerLeft && block.getAttribute('data-top-pos') > playerTop - blockOverlapThreshold && block.getAttribute('data-bottom-pos') < playerBottom + blockOverlapThreshold){
            colidingLeftBlocks.push(block);
        }
    });
    if(colidingGroundBlocks.length > 0){
        colidingGroundBlocks.forEach((block) => {
            block.classList.add('active');
        })
        colidingGroundBlocks.sort((a, b) => {
            const aTopPos= parseInt(a.getAttribute('data-top-pos'));
            const bTopPos = parseInt(b.getAttribute('data-top-pos'));
            return aTopPos - bTopPos;
        });
    }
    if(colidingRightBlocks.length > 0){
        colidingRightBlocks.forEach((block) => {
            block.classList.add('active');
        })
        colidingRightBlocks.sort((a, b) => {
            const aLeftPos= parseInt(a.getAttribute('data-Left-pos'));
            const bLeftPos = parseInt(b.getAttribute('data-Left-pos'));
            return aLeftPos - bLeftPos;
        });
        console.log(colidingRightBlocks)
    }
    if(colidingLeftBlocks.length > 0){
        colidingLeftBlocks.forEach((block) => {
            block.classList.add('active');
        })
        colidingLeftBlocks.sort((a, b) => {
            const aRightPos= parseInt(a.getAttribute('data-Right-pos'));
            const bRightPos = parseInt(b.getAttribute('data-Right-pos'));
            return aRightPos - bRightPos;
        });
        console.log(colidingLeftBlocks)
    }
    if(!isJumping && !isFalling && colidingGroundBlocks.length == 0){
        fall();
    }
}

function setActiveHotkey(e){
    hotkeys.forEach((key) => {
        key.classList.remove('active');
    });
    activeHotkey = document.querySelector(`[data-hotkey='${e.key}']`);
    if(activeHotkey){
        activeHotkey.classList.add('active');
    }
}

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
            checkGround();
        }
    }
    checkGround();
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