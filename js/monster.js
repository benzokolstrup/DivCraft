function spawnMonster(){
    let monster = document.createElement('div');
    monster.classList.add('monster', 'small');
    monster.style.top = '450px'
    playArea.append(monster);

    const moveMonster = setInterval( () => {
        if(monster.offsetLeft < playerMapCenterPosX){
            monster.style.left = monster.offsetLeft + 1.2 + 'px';
        }
        if(monster.offsetLeft > playerMapCenterPosX){
            monster.style.left = monster.offsetLeft - 1.2 + 'px';
        }
    }, intervalSpeed);
}

const spawnMonsterBtn = document.querySelector('[data-btn-spawn-monster]');
spawnMonsterBtn.addEventListener('click', spawnMonster);