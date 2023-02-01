const playArea = document.querySelector('#playarea');
function createTile(tileValue, index, rowIndex){
    
    if(tileValue == 0 || tileValue == undefined) return;
    var tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.id = tileValue;
    tile.style.height = `${initialPlayArea.gridSize}px`;
    tile.style.width = `${initialPlayArea.gridSize}px`;
    tile.style.left = `${index * initialPlayArea.gridSize}px`;
    tile.style.top = `${rowIndex * initialPlayArea.gridSize}px`;
    tile.style.backgroundImage = `url(${tileObjArr.find(obj => obj.tileValue == tileValue).tileImagePath}`;
    playArea.append(tile);
}

map.forEach((mapRow, rowIndex) => {
    mapRow.forEach((tile, index) => {
        createTile(tile, index, rowIndex);
    });
})