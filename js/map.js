const initialPlayArea = {
    width: window.innerWidth,
    height: window.innerHeight,
    gridSize: 64
};
let map = [];

function initializeBlankMap(){
    let rowLenght = Math.ceil(initialPlayArea.width / initialPlayArea.gridSize);
    let columnLenght = Math.ceil(initialPlayArea.height / initialPlayArea.gridSize);
    for(let i = 0; i < columnLenght; i++){
        let row = new Array(rowLenght).fill(0);
        map.push(row);
    }
    addFlatDirtlayer(map);
    //lookForTilePatterns(map);
}

function addFlatDirtlayer(map){
    let startRow = Math.ceil(map.length / 2);
    map.forEach((row, rowIndex) => {
        for(let i = 0; i < row.length; i++){
            if(rowIndex == startRow){
                row[i] = 5;
            }
            if(rowIndex > startRow){
                row[i] = 9;
            }
        }
    });
}

/*function lookForTilePatterns(map){
    map.forEach((row, rowIndex) => {
        let tileCount = 0;
        row.forEach((column, columnIndex) => {
            if(column == 5){
                tileCount++
            }else{
                tileCount = 0;
            }
            if(tileCount > 15){
                addCave(map, rowIndex, columnIndex);
                tileCount = 0;
            }
        });
    });
}*/

function addItems(){


}

/*function addCave(map, rowIndex, columnIndex){
    let caveWidth = 4;
    let rowsRemaining = map.length - rowIndex;
    console.log(rowsRemaining)
    map[rowIndex][columnIndex - 1] = 2;
    for(let i = 0; i < caveWidth; i++){
        map[rowIndex][columnIndex + i] = 0;
        if(i == caveWidth - 1){
            map[rowIndex][columnIndex + caveWidth] = 1;
        }
    }
    for(let x = 0; x < rowsRemaining; x++){
        if((rowsRemaining + x) < map.length){
            map[rowsRemaining + 2 + x][columnIndex - 1] = 8;
            for(let i = 0; i < caveWidth; i++){
                map[rowsRemaining + 2 + x][columnIndex + i] = 0;
                if(i == caveWidth - 1){
                    map[rowIndex][columnIndex + caveWidth] = 1;
                }
            }
        }
    }
}*/





initializeBlankMap();




































// FIRST TRY OF RANDOM GENERATING
/*
map.forEach((row, rowIndex) => {
    if(rowIndex == Math.ceil(map.length / 2)){
        for(let i = 0; i < row.length; i++){
            if(i == 0){
                row[i] = 5;
            }
            if(i > 0){
                let tileObjAbove = tileObjArr.find(obj => obj.tileValue == map[rowIndex - 1][i]);
                let tileObjBefore = tileObjArr.find(obj => obj.tileValue == row[i - 1]);
                let first_array = tileObjAbove.adjecentTilesVertical;
                let second_array = tileObjBefore.adjecentTilesHorizontal;
                let new_array = first_array.filter((element) => second_array.includes(element));
                let random = Math.floor(Math.random() * new_array.length);
                if(tileObjBefore.tileValue == 2){
                    random = Math.floor(Math.random() * 1)
                }
                row[i] = new_array[random];
            }
        }
    }
    if(rowIndex > Math.ceil(map.length / 2)){
        for(var i = 0; i < row.length; i++){
            if(i == 0){
                let tileObjAbove = tileObjArr.find(obj => obj.tileValue == map[rowIndex - 1][i]);
                let random = Math.floor(Math.random() * tileObjAbove.adjecentTilesVertical.length);
                row[i] = tileObjAbove.adjecentTilesVertical[random];
            }
            if(i > 0){         
                let tileObjAbove = tileObjArr.find(obj => obj.tileValue == map[rowIndex - 1][i]);
                let tileObjBefore = tileObjArr.find(obj => obj.tileValue == row[i - 1]);
                let first_array = tileObjAbove.adjecentTilesVertical;
                let second_array = tileObjBefore.adjecentTilesHorizontal;
                let new_array = first_array.filter((element) => second_array.includes(element));
                if(new_array.length){
                    let random = Math.floor(Math.random() * new_array.length);
                    if(tileObjBefore.tileValue == 2){
                        random = Math.floor(Math.random() * 1)
                    }
                    row[i] = new_array[random];
                }
                if(!new_array.length){                    
                }
            }
        }
    }
});
*/