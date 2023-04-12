/*function checkGround(){
    let allBlocks = document.querySelectorAll('.block');
    colidingGroundBlocks = [];
    colidingRightBlocks = [];
    allBlocks.forEach((block) => {
        block.classList.remove('active');
        if(block.getAttribute('data-top-pos') >= playerBottom && block.getAttribute('data-top-pos') < playerBottom + blockOverlapThreshold){
            if(block.getAttribute('data-left-pos') <= playerLeft && block.getAttribute('data-right-pos') > playerLeft || block.getAttribute('data-right-pos') >= playerRight && block.getAttribute('data-left-pos') < playerRight){
                colidingGroundBlocks.push(block);
            }
        }
        if(block.getAttribute('data-left-pos') < playerRight + blockOverlapThreshold && block.getAttribute('data-right-pos') >= playerRight && block.getAttribute('data-top-pos') > playerTop - blockOverlapThreshold && block.getAttribute('data-bottom-pos') < playerBottom + blockOverlapThreshold){
            colidingRightBlocks.push(block);
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
    }
    if(!isJumping && !isFalling && colidingGroundBlocks.length == 0){
        fall();
    }
}*/