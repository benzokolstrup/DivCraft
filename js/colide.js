function checkForColidingBlocks(obj){
    let allBlocks = document.querySelectorAll('.block');
    if(obj){
        obj.colidingBlocks.top = [];
        obj.colidingBlocks.bottom = [];
        obj.colidingBlocks.left = [];
        obj.colidingBlocks.right = [];
    }
    colidingGroundBlocks = [];
    colidingRightBlocks = [];
    colidingLeftBlocks = [];
    colidingTopBlocks = [];
    allBlocks.forEach((block) => {
        block.classList.remove('active');
        block.classList.remove(`active-${obj.general.id}`);
        // Check for blocks on the top of the obj
        if(block.getAttribute('data-bottom-pos') <= obj.position.top && block.getAttribute('data-bottom-pos') > obj.position.top - blockOverlapThreshold){
            if(block.getAttribute('data-left-pos') <= obj.position.left && block.getAttribute('data-right-pos') > obj.position.left || block.getAttribute('data-right-pos') >= obj.position.right && block.getAttribute('data-left-pos') < obj.position.right){
                colidingTopBlocks.push(block);
            }
        }
        // Check for blocks under the obj
        if(block.getAttribute('data-top-pos') >= obj.position.bottom && block.getAttribute('data-top-pos') < obj.position.bottom + blockOverlapThreshold){
            if(block.getAttribute('data-left-pos') <= obj.position.left && block.getAttribute('data-right-pos') > obj.position.left || block.getAttribute('data-right-pos') >= obj.position.right && block.getAttribute('data-left-pos') < obj.position.right){
                colidingGroundBlocks.push(block);
            }
        }
        // Check for blocks on the left of the obj
        if(block.getAttribute('data-right-pos') > obj.position.left - blockOverlapThreshold && block.getAttribute('data-left-pos') <= obj.position.left && block.getAttribute('data-top-pos') > obj.position.top - 50 && block.getAttribute('data-bottom-pos') < obj.position.bottom + 50){
            colidingLeftBlocks.push(block);
        }
        // Check for blocks on the right of the obj
        if(block.getAttribute('data-left-pos') < obj.position.right + blockOverlapThreshold && block.getAttribute('data-right-pos') > obj.position.right && block.getAttribute('data-top-pos') > obj.position.top - 50 && block.getAttribute('data-bottom-pos') < obj.position.bottom + 50){
            colidingRightBlocks.push(block);
        }
    });
    if(colidingGroundBlocks.length > 0){
        colidingGroundBlocks.forEach((block) => {
            block.classList.add(`active-${obj.general.id}`);
            block.classList.add(`active`);
        })
        colidingGroundBlocks.sort((a, b) => {
            const aTopPos= parseInt(a.getAttribute('data-top-pos'));
            const bTopPos = parseInt(b.getAttribute('data-top-pos'));
            return aTopPos - bTopPos;
        });
    }
    if(colidingTopBlocks.length > 0){
        colidingTopBlocks.forEach((block) => {
            block.classList.add(`active-${obj.general.id}`);
            block.classList.add(`active`);
        })
        colidingTopBlocks.sort((a, b) => {
            const aTopPos= parseInt(a.getAttribute('data-bottom-pos'));
            const bTopPos = parseInt(b.getAttribute('data-bottom-pos'));
            return aTopPos - bTopPos;
        });
    }
    if(colidingRightBlocks.length > 0){
        colidingRightBlocks.forEach((block) => {
            block.classList.add(`active-${obj.general.id}`);
            block.classList.add(`active`);
        })
        colidingRightBlocks.sort((a, b) => {
            const aLeftPos= parseInt(a.getAttribute('data-left-pos'));
            const bLeftPos = parseInt(b.getAttribute('data-left-pos'));
            return aLeftPos - bLeftPos;
        });
    }
    if(colidingLeftBlocks.length > 0){
        colidingLeftBlocks.forEach((block) => {
            block.classList.add(`active-${obj.general.id}`);
            block.classList.add(`active`);
        })
        colidingLeftBlocks.sort((a, b) => {
            const aRightPos= parseInt(a.getAttribute('data-right-pos'));
            const bRightPos = parseInt(b.getAttribute('data-right-pos'));
            return aRightPos - bRightPos;
        });
    }
    obj.colidingBlocks.top = colidingTopBlocks;
    obj.colidingBlocks.bottom = colidingGroundBlocks;
    obj.colidingBlocks.left = colidingLeftBlocks;
    obj.colidingBlocks.right = colidingRightBlocks;
    if(!isJumping && !isFalling && colidingGroundBlocks.length == 0){
        fall();
    }
}