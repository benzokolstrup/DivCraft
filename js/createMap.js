function createTile(tileValue, index, rowIndex){
    if(tileValue == undefined) return;
    if(tileValue == 0){
        var tile = document.createElement('div');
        tile.classList.add('tile', 'air');
        tile.dataset.tileMapRow = rowIndex;
        tile.dataset.tileMapColumn = index;
        tile.dataset.id = tileValue;
        tile.style.height = `${initialPlayArea.gridSize}px`;
        tile.style.width = `${initialPlayArea.gridSize}px`;
        tile.style.left = `${index * initialPlayArea.gridSize}px`;
        tile.style.top = `${rowIndex * initialPlayArea.gridSize}px`;
        playArea.append(tile);
    }
    if(tileValue != 0){
        var tile = document.createElement('div');
        tile.classList.add('tile', 'block');
        tile.dataset.tileMapRow = rowIndex;
        tile.dataset.tileMapColumn = index;
        tile.dataset.id = tileValue;
        tile.dataset.toughness = 2;



        tile.dataset.topPos = rowIndex * initialPlayArea.gridSize;
        tile.dataset.bottomPos = (rowIndex * initialPlayArea.gridSize) + initialPlayArea.gridSize;
        tile.dataset.leftPos = index * initialPlayArea.gridSize;
        tile.dataset.rightPos = (index * initialPlayArea.gridSize) + initialPlayArea.gridSize;
        tile.style.height = `${initialPlayArea.gridSize}px`;
        tile.style.width = `${initialPlayArea.gridSize}px`;
        tile.style.left = `${index * initialPlayArea.gridSize}px`;
        tile.style.top = `${rowIndex * initialPlayArea.gridSize}px`;
        tile.style.backgroundImage = `url(${tileObjArr.find(obj => obj.tileValue == tileValue).tileImagePath}`;
        playArea.append(tile);
    }
}
renderMap()