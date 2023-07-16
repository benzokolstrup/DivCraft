window.addEventListener('keydown', startKeyboardAction);
window.addEventListener('keyup', stopKeyboardAction);

const hotkeys = document.querySelectorAll('#hotbar .hotkey');
let activeHotkey = document.querySelector('.hotkey.active');
let playerEl = document.querySelector('#player');

playerEl.style.left = (window.innerWidth / 2) + 'px';
playerEl.style.top = (window.innerHeight / 2) + 'px';

playArea.style.transform = `translate(${(window.innerWidth / 2)}px, ${(window.innerHeight / 2) + 100}px)`;

let moveMonster;

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

let blockOverlapThreshold = 30;

let speed = 3.5;
let intervalSpeed = 10;
let maxJumpHeight = 130;
let jumps = 1;
let range = 250;

let playerCenterX = playerEl.offsetLeft + (playerEl.offsetWidth / 2);
let playerCenterY = playerEl.offsetTop + (playerEl.offsetHeight / 2);

let playerMapCenterPosX = playerEl.offsetLeft + (playerEl.offsetWidth / 2);
let playerMapCenterPosY = playerEl.offsetTop + (playerEl.offsetHeight / 2);

function startKeyboardAction(e){
    switch(e.keyCode) {
        case 68:
            if(!isMovingRight){
                moveRight();
            }
        break;
        case 65:
            if(!isMovingLeft){
                moveLeft();
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
                moveLeft();
            }
            isMovingRight = false;
            player.movement.isMovingRight = false;
            updateSpecs('movement.isMovingRight');
            clearInterval(moveRightInterval);
        break;
        case 65:
            if(isMovingRight && isMovingLeft){
                moveRight();
            }
            isMovingLeft = false;
            player.movement.isMovingLeft = false;
            updateSpecs('movement.isMovingLeft');
            clearInterval(moveLeftInterval);
        break;
        case 32:
            for(let i = 0; i < 100; i++){
                clearInterval(jumpInterval);
            }
            if(isJumping && !isFalling){
                for(let i = 0; i < 100; i++){
                    clearInterval(jumping);
                }
                fall();
            }
        break;

    }
}

function moveRight(){
    isMovingRight = true;
    player.movement.isMovingRight = true;
    updateSpecs('movement.isMovingRight');
    moveRightInterval = setInterval( () => {
        updatePlayerObjPosition();
        checkForColidingBlocks(player);
        playArea.style.transform = `translate(${getTranslateX() - speed}px, ${getTranslateY()}px)`;
        if(player.colidingBlocks.right.length > 0 && player.position.right >= player.colidingBlocks.right[0].getAttribute('data-left-pos')){
            playArea.style.transform = `translate(${(playerEl.offsetLeft - player.colidingBlocks.right[0].getAttribute('data-left-pos')) + playerEl.offsetWidth}px, ${getTranslateY()}px)`;
        }
    }, intervalSpeed);
}

function moveLeft(){
    isMovingLeft = true;
    player.movement.isMovingLeft = true;
    updateSpecs('movement.isMovingLeft');
    moveLeftInterval = setInterval( () => {
        updatePlayerObjPosition();
        checkForColidingBlocks(player);
        playArea.style.transform = `translate(${getTranslateX() + speed}px, ${getTranslateY()}px)`;
        if(player.colidingBlocks.left.length > 0 && player.position.left <= player.colidingBlocks.left[0].getAttribute('data-right-pos')){
            playArea.style.transform = `translate(${playerEl.offsetLeft - player.colidingBlocks.left[0].getAttribute('data-right-pos')}px, ${getTranslateY()}px)`;
        }
    }, intervalSpeed);
}

function jump(){
    if(!isJumping){
        let jumpSpeed = speed;
        let jumpHeight = 0;
        isJumping = true;
        player.movement.isJumping = true;
        updateSpecs('movement.isJumping');
        jumping = setInterval( () => {
            jumpSpeed -= maxJumpHeight / 4500;
            playArea.style.transform = `translate(${getTranslateX()}px, ${getTranslateY() + jumpSpeed}px)`;
            updatePlayerObjPosition();
            jumpHeight += jumpSpeed;
            if(jumpHeight >= maxJumpHeight){
                clearInterval(jumping);
                fall();
            }
            if(player.colidingBlocks.top.length > 0 && player.position.top <= player.colidingBlocks.top[0].getAttribute('data-bottom-pos')){
                playArea.style.transfrom = `translate(${getTranslateX()}px, ${(playerEl.offsetTop - player.colidingBlocks.top[0].getAttribute('data-bottom-pos'))}px)`;
                console.log(`translate(${getTranslateX()}px, ${(playerEl.offsetTop - player.colidingBlocks.top[0].getAttribute('data-bottom-pos'))}px)`);
                clearInterval(jumping);
                fall();
            }
            checkForColidingBlocks(player);
        }, intervalSpeed);
        checkForColidingBlocks(player);
    }
}

function fall(){
    let fallSpeed = speed + 1.5;
    isFalling = true;
    player.movement.isFalling = true;
    updateSpecs('movement.isFalling');
    falling = setInterval( () => {
        playArea.style.transform = `translate(${getTranslateX()}px, ${getTranslateY() - fallSpeed}px)`;
        updatePlayerObjPosition();
        if(player.colidingBlocks.bottom.length > 0 && player.position.bottom >= player.colidingBlocks.bottom[0].getAttribute('data-top-pos')){
            playArea.style.transform = `translate(${getTranslateX()}px, ${(playerEl.offsetTop + playerEl.offsetHeight) - player.colidingBlocks.bottom[0].getAttribute('data-top-pos')}px)`;
            isFalling = false;
            isJumping = false;
            player.movement.isFalling = false;
            player.movement.isJumping = false;
            updateSpecs('movement.isJumping', 'movement.isFalling');
            updatePlayerObjPosition();
            clearInterval(falling);
            clearInterval(jumping);
        }
        checkForColidingBlocks(player);
    }, intervalSpeed);
    checkForColidingBlocks(player);
}

function updatePlayerObjPosition(){
    player.position.left = parseInt(playerEl.offsetLeft - getTranslateX());
    player.position.right = parseInt(playerEl.offsetLeft - getTranslateX() + playerEl.offsetWidth);
    player.position.top = parseInt(playerEl.offsetTop - getTranslateY());
    player.position.bottom = parseInt(playerEl.offsetTop - getTranslateY() + playerEl.offsetHeight);
    updateSpecs('position.left', 'position.right', 'position.top', 'position.bottom');
}

function getTranslateX() {
    var style = window.getComputedStyle(playArea);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
}

function getTranslateY() {
    var style = window.getComputedStyle(playArea);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m42;
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