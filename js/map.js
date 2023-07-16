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
    
}

function addFlatDirtlayer(map){
    map.forEach((row) => {
        for(let i = 0; i < row.length; i++){
            row[i] = 9;
        }
    });
}

function renderMap(){
    map.forEach((mapRow, rowIndex) => {
        mapRow.forEach((tile, index) => {
            createTile(tile, index, rowIndex);
        });
    });
}

function renderLeftChunk(){
    let chunk = [];
    let rowLenght = Math.ceil(initialPlayArea.width / initialPlayArea.gridSize);
    let columnLenght = Math.ceil(initialPlayArea.height / initialPlayArea.gridSize);
    for(let i = 0; i < columnLenght; i++){
        let row = new Array(rowLenght).fill(0);
        chunk.push(row);
    }
    addFlatDirtlayer(chunk)
    chunk.forEach((row, index) => {
        row.reverse();
        row.forEach((rowItem) => {
            map[index].unshift(rowItem)
        })
        console.log(map[index])
    });
}

function addItems(){


}
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