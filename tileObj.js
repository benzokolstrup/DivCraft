const tileObjArr = [
    {
        // The name should match the correct image path.
        name: 'templateObj',
        // Unique identifier for the specific tile.
        tileId: 1234567890,
        // Type of tile. Will determine where this can spawn and if plants can grow on top.
        type: 'grass',
        // Technically the health of a the tile. How many hits will it take before it breaks
        toughness: 2,
        // The level of tool needed to be able to destroy the tile. 0 being without a tool, 1 being wooden tool etc
        hardness: 0,
        // Path to the image.
        tileImagePath: `assets/tiles/${this.type}${this.name}.png`,
    },
    {
        name: 'topLeftCorner',
        tileValue: 1,
        tileImagePath: 'assets/tiles/grass/topleft.png',
        adjecentTiles: [2,6],
        type: 'grassblock',
        toughness: '2'
    },
    {
        name: 'topRightCorner',
        tileValue: 2,
        tileImagePath: 'assets/tiles/grass/toprightcorner.png',
        adjecentTiles: [0],
        type: 'grassblock',
        toughness: '2'
    },
    {
        name: 'bottomRightCorner',
        tileValue: 3,
        tileImagePath: 'assets/tiles/grass/bottomrightcorner.png',
        adjecentTiles: [0],
        type: 'grassblock',
        toughness: '2'
    },
    {
        name: 'bottomLeftCorner',
        tileValue: 4,
        tileImagePath: 'assets/tiles/grass/bottomleftcorner.png',
        adjecentTiles: [0,5],
    },
    {
        name: 'bottomFlat',
        tileValue: 5,
        tileImagePath: 'assets/tiles/grass/bottomflat.png',
        adjecentTiles: [0,5],
    },
    {
        name: 'topFlat',
        tileValue: 6,
        tileImagePath: 'assets/tiles/grass/topflat.png',
        adjecentTiles: [2,6],
        type: 'grassblock',
        toughness: '2'
    }
]