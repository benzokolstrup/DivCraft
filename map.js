const initialPlayArea = {
    width: window.innerWidth,
    heigt: window.innerHeight,
    gridSize: 32
};
let map = [];
let rowLenght = Math.ceil(initialPlayArea.width/initialPlayArea.gridSize);
let columnLenght = Math.ceil(initialPlayArea.heigt/initialPlayArea.gridSize);

for(let i = 0; i < columnLenght; i++){
    let row = new Array(rowLenght).fill(0);
    map.push(row)
}

map.forEach((row, rowIndex) => {
    if(rowIndex < map.length / 2) return;
    row.forEach((tile, i) => {
        

        if(row[i - 1] != 0 && i > 0){
            let tileObjBefore = tileObjArr.find(obj => obj.tileValue == row[i-1]);
            let random = Math.floor(Math.random() * tileObjBefore.adjecentTilesHorizontal.length);
            row[i] = tileObjArr.find(obj => obj.tileValue == row[i-1]).adjecentTilesHorizontal[random]
        }
        if(rowIndex != 0){
            if(map[rowIndex - 1][i] != 0){

                // Stupid way of finding adjecent block. Might have to have both a vertical and horizontal neighbouring block property
                
                let tileObjAbove = tileObjArr.find(obj => obj.tileValue == map[rowIndex - 1][i]);
                let random = Math.floor(Math.random() * tileObjAbove.adjecentTilesVertical.length);
                    row[i] = tileObjAbove.adjecentTilesVertical[random];
            }
        }
        if(rowIndex == map.length / 2){
            row[0] = 1
            if(i > 0){
                row[i] = 5;
            }
        }
    });
});
console.log(map)












/*for(let x = 0; x < columnLenght; x++){
    let row = new Array(rowLenght).fill(0);
    for(let i = 0; i < rowLenght; i++){
        let random = Math.floor(Math.random() * rowLenght)
        if(i == random){
            row[i] = 1;
        }
        if(row[i - 1] != 0 && i > 0){
            let random = Math.floor(Math.random() * tileObjArr.find(obj => obj.tileValue == row[i-1]).adjecentTiles.length)
            row[i] = tileObjArr.find(obj => obj.tileValue == row[i-1]).adjecentTiles[random]
        }
    }
    map.push(row)
}*/