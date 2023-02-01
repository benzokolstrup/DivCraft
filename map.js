const initialPlayArea = {
    width: window.innerWidth,
    heigt: window.innerHeight,
    gridSize: 16
};
let map = [];
let rowLenght = Math.ceil(initialPlayArea.width/initialPlayArea.gridSize);
let columnLenght = Math.ceil(initialPlayArea.heigt/initialPlayArea.gridSize);

for(let i = 0; i < columnLenght; i++){
    let row = new Array(rowLenght).fill(0);
    map.push(row)
}

map.forEach((row, rowIndex) => {
    if(rowIndex == Math.ceil(map.length / 2)){
        
        for(let i = 0; i < row.length; i++){
            if(i == 0){
                row[0] = 5;
            }
            if(i > 0){
                row[i] = 5;
                /*let tileObjAbove = tileObjArr.find(obj => obj.tileValue == map[rowIndex - 1][i]);
                let tileObjBefore = tileObjArr.find(obj => obj.tileValue == row[i - 1]);
                let first_array = tileObjAbove.adjecentTilesVertical;
                let second_array = tileObjBefore.adjecentTilesHorizontal;
                let new_array = first_array.filter((element) => second_array.includes(element));
                let random = Math.floor(Math.random() * new_array.length);
                if(tileObjBefore.tileValue == 2){
                    random = Math.floor(Math.random() * 1)
                }
                row[i] = new_array[random];*/
            }
        }
        console.log("test", row)
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
                    console.log(i, tileObjAbove, row[i - 1])

                }
            }
        }
    }
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








/*if(rowIndex != 0){
            if(map[rowIndex - 1][i] != 0){
                let tileObjAbove = tileObjArr.find(obj => obj.tileValue == map[rowIndex - 1][i]);
                let tileObjBefore = tileObjArr.find(obj => obj.tileValue == row[i-1]);
                let random = Math.floor(Math.random() * tileObjAbove.adjecentTilesVertical.length);
                let testVar = tileObjAbove.adjecentTilesVertical.some(item => tileObjAbove.adjecentTilesHorizontal.includes(item))

                tileObjBefore.adjecentTilesHorizontal.forEach((item) => {
                    console.log(i, item, tileObjAbove.adjecentTilesVertical.includes(item))
                });
                    row[i] = tileObjAbove.adjecentTilesVertical[random];
                
                
                console.log("test")
            }
        }

        if(rowIndex == map.length / 2){
            row[i] = 5
            if(i > 0){
                row[i] = 5;
            }
        }*/

        /*    if(rowIndex > map.length / 2){
        row.forEach((tile, i) => {
            if(row[i - 1] != 0 && i > 0){
                let tileObjBefore = tileObjArr.find(obj => obj.tileValue == row[i-1]);
                let random = Math.floor(Math.random() * tileObjBefore.adjecentTilesHorizontal.length);
                row[i] = tileObjArr.find(obj => obj.tileValue == row[i-1]).adjecentTilesHorizontal[random]
            }
        });
    } */