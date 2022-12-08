//choosing one option out of two

function numberButton() {
    let titlePage = document.getElementById("titlePage");
    document.getElementById("main").removeChild(titlePage);
    numberPuzzle();
    document.getElementById("nextPage").classList.remove("page2");
}

function numberPuzzle() {
    //creating 3-3 table using loops
    var gridSize = 3;
    var tileGrid = [];
    for (var i = 0; i < gridSize; i++) {
        tileGrid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            tileGrid[i][j] = i * gridSize + j;
        }
    }

    // shuffle the tiles
    for (var k = 0; k < gridSize * gridSize; k++) {
        var swapRow = Math.floor(Math.random() * gridSize);
        var swapCol = Math.floor(Math.random() * gridSize);
        var temp = tileGrid[k % gridSize][Math.floor(k / gridSize)];
        tileGrid[k % gridSize][Math.floor(k / gridSize)] = tileGrid[swapRow][swapCol];
        tileGrid[swapRow][swapCol] = temp;
    }

    // create and appending mini grid into board
    var gridElement = document.getElementById("grid");
    for (var s = 0; s < gridSize; s++) {
        for (var t = 0; t < gridSize; t++) {
            var tile = document.createElement("div");
            tile.className = "tile";
            tile.innerHTML = tileGrid[s][t];
            tile.onclick = slideTile;
            gridElement.appendChild(tile);
        }
    }

    function slideTile() {
        var emptyRow = 0;
        var emptyCol = 0;
        var slideRow = 0;
        var slideCol = 0;

        // find the empty tile and the clicked tile
        for (var x = 0; x < gridSize; x++) {
            for (var y = 0; y < gridSize; y++) {
                if (tileGrid[x][y] === 0) {
                    emptyRow = x;
                    emptyCol = y;
                } else if (tileGrid[x][y] === this.innerHTML) {
                    slideRow = x;
                    slideCol = y;
                }
            }
        }

        // check if the clicked tile can slide to the empty space
        if (slideRow === emptyRow && Math.abs(slideCol - emptyCol) === 1 ||
            slideCol === emptyCol && Math.abs(slideRow - emptyRow) === 1) {
            tileGrid[emptyRow][emptyCol] = this.innerHTML;
            tileGrid[slideRow][slideCol] = 0;
            drawGrid();
        }
    }

    // redraw the grid on the page
    function drawGrid() {
        var tiles = document.getElementsByClassName("tile");
        for (var z = 0; z < gridSize * gridSize; z++) {
            tiles[z].innerHTML = tileGrid[z % gridSize][Math.floor(z / gridSize)];
        }
    }
}

// swapping exactly into one another with zero tile to next adjacent tile using swap method..