const playArea = document.querySelector('#playarea');

let player = {}

function createPlayerObj(){
    player.general = {
        name: 'Throrain',
        level: 1,
        experience: 0
    },
    player.attributes = {
        health: 100,
        mana: 50,
        jumps: 1,
        jumpHeight: 100,
        movementSpeed: 3.5,
    }
    player.movement = {
        isMovingLeft: false,
        isMovingRight: false,
        isJumping: false,
        isFalling: false
    }
    player.position = {
        top: '',
        bottom: '',
        left: '',
        right: ''
    }
    player.colidingBlocks = {
        top: [],
        bottom: [],
        left: [],
        right: []
    }
    player.hotbar = {

    }
    player.equipped = {
        helmet: '',
        chest: '',
        legs: '',
        feet: ''
    }
    player.inventory = {

    }
}


function createSpecList(obj){
    const specs = document.querySelector('#specs');
    let specContainer = document.createElement('div');
    specContainer.classList.add('spec-list');
    specs.append(specContainer);

    let specHeader = document.createElement('div');
    specHeader.classList.add('spec-header');
    specHeader.textContent = 'Player specs';

    specContainer.append(specHeader);

    let specList = document.createElement('div');
    specList.classList.add('spec-list');
    specContainer.append(specList);

    Object.keys(obj).forEach((key) => {
        if(typeof(obj[key]) == 'object'){
            createSpecListItem(key, '', false);
            const properties = Object.getOwnPropertyNames(obj[key]);
            Object.keys(obj[key]).forEach((nestedKey, index) => {
                console.log(obj[key][nestedKey])
                if(obj[key][nestedKey] != [] || obj[key][nestedKey] != '' || typeof(obj[key][nestedKey]) == 'boolean'){
                    createSpecListItem(properties[index], obj[key][nestedKey], true);
                }
            });
        }
    });

    function createSpecListItem(property, value, child){
        let specItem = document.createElement('div');
        specItem.classList.add('spec-item');
        if(property != '' || property != undefined){
            let specItemProperty = document.createElement('div');
            specItemProperty.textContent = `${property}:`;
            specItem.append(specItemProperty);
        }
        if(value != '' || value != undefined){
            let specItemValue = document.createElement('div');
            specItemValue.textContent += `${value}`;
            
            specItem.append(specItemValue);
        }
        if(child){
            specItem.classList.add('indent');
        }
        specList.append(specItem);
    }
}

createPlayerObj();
createSpecList(player);
