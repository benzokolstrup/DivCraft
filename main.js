function createTile(tileValue, index, rowIndex){
    if(tileValue == 0) return;
    let tile = document.createElement('div');
    tile.classList.add('tile');
    tile.style.left = index*32+'px';
    tile.style.top = (rowIndex*32)+300+'px';
    tile.style.backgroundImage = `url(${tileObjArr.find(obj => obj.tileValue == tileValue).tileImagePath}`;
    document.querySelector('body').append(tile);

}

map.forEach((mapRow, rowIndex) => {
    mapRow.forEach((tile, index) => {
        console.log(tile, index, rowIndex)
        createTile(tile, index, rowIndex);
    });
})



