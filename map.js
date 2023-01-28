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
    let random = Math.floor(Math.random() * rowLenght);
    row.forEach((tile, i) => {
        if(i == random){
            row[i] = 1;
        }
        if(row[i - 1] != 0 && i > 0){
            let random = Math.floor(Math.random() * tileObjArr.find(obj => obj.tileValue == row[i-1]).adjecentTiles.length)
            row[i] = tileObjArr.find(obj => obj.tileValue == row[i-1]).adjecentTiles[random]
        }
        if(rowIndex != 0){
            console.log(map[rowIndex - 1], "previous")
            console.log(row, "current")
            if(map[rowIndex - 1][i] != 0){

                // Stupid way of finding adjecent block. Might have to have both a vertical and horizontal neighbouring block property
                if(map[rowIndex - 1][i] == 6){
                    row[i] = 5;
                }
                if(map[rowIndex - 1][i] == 6){
                    row[i] = 5;
                }
                if(map[rowIndex - 1][i] == 1){
                    row[i] = 4;
                }
                if(map[rowIndex - 1][i] == 2){
                    row[i] = 3;
                }
            }
        }
        
    });
});













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