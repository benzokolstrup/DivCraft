function spawnMonster(){
    let monsterObj = new SmallMonster('Bean', 50);
    console.log(monsterObj)
    let monster = document.createElement('div');
    monster.classList.add('monster', 'small');
    monster.style.top = '450px';
    playArea.append(monster);
    moveMonster = setInterval( () => {
        if(monster.offsetLeft < player.position.left){
            monster.style.left = monster.offsetLeft + 1.2 + 'px';
        }
        if(monster.offsetLeft > player.position.left){
            monster.style.left = monster.offsetLeft - 1.2 + 'px';
        }
        checkForColidingBlocks(monsterObj);
    }, intervalSpeed);
}

const spawnMonsterBtn = document.querySelector('[data-btn-spawn-monster]');
spawnMonsterBtn.addEventListener('click', spawnMonster);

function SmallMonster(name, health){
    this.general = {
        id: '12345',
        name: name
    },
    this.attributes = {
        health: health
    },
    this.colidingBlocks = {
        top: [],
        bottom: [],
        left: [],
        right: []
    }
}