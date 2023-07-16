let player = {}
function createPlayerObj(){
    player.general = {
        id: 'player',
        name: 'Noobie',
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
        x: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
    player.colidingBlocks = {
        top: [],
        bottom: [],
        left: [],
        right: []
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
                if(obj[key][nestedKey] != [] || obj[key][nestedKey] != '' || typeof(obj[key][nestedKey]) == 'boolean' || typeof(obj[key][nestedKey]) == 'string' || typeof(obj[key][nestedKey]) == 'number'){
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
            specItemProperty.classList.add('spec-item-property');
            specItemProperty.dataset.property = property;
            specItemProperty.textContent = `${property}:`;
            specItem.append(specItemProperty);
        }
        if(value || value != '' || value != undefined){
            let specItemValue = document.createElement('div');
            specItemValue.classList.add('spec-item-value');
            specItemValue.textContent += `${value}`;
            specItem.append(specItemValue);
        }
        if(child){
            specItem.classList.add('indent');
        }
        specList.append(specItem);
    }
}

function updateSpecs(...specs){
    specs.forEach((spec) => {
        const propertyValue = spec.split('.').reduce((obj, key) => obj[key], player);
        let specItemValue = document.querySelector(`[data-property='${spec.split('.').pop()}']`).closest('.spec-item').querySelector('.spec-item-value');
        specItemValue.textContent = propertyValue;        
    });
}

createPlayerObj();
createSpecList(player);
const playArea = document.querySelector('#playarea');
let zeroTranslateValue = 12;
