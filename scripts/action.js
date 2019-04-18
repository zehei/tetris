function gameOver(freezedCubes){
	var bool = false;
	for (var i = freezedCubes.length - 1; i >= 0; i--) {
		coordY = getPosition(freezedCubes[i])[1];
		if (coordY < 0){ bool = true; }
	}
	return bool;
}

function deleteCubes(gameWindow, freezedCubes, deletedCubes){
	for (var i = deletedCubes.length - 1; i >= 0; i--) {
		deletedCoord = getPosition(deletedCubes[i]);
		for (var j = freezedCubes.length - 1; j >= 0; j--) {
			coord = getPosition(freezedCubes[j]);
			if (Math.abs(coord[0] - deletedCoord[0]) < 0.001 && (coord[1] < deletedCoord[1])) {
				move([freezedCubes[j]], freezedCubes, "down", ignoreOverlap=true);
			}
		}
		gameWindow.removeChild(deletedCubes[i]);
	}
}

function checkFullCubesRow(cubes){
	for (var i = GAME_WINDOW_HEIGHT; i >= 0; i--){
		for (var j = cubes.length - 1; j >= 0; j--) {
			getCoord(getPosition(cubes[j]))
		}
		getCoord()
	}
}

function countNumberOfCubesPerRow(cubes){
	var numberOfCubesPerRow = new Array(GAME_WINDOW_HEIGHT).fill(0);

	for (var i = cubes.length - 1; i >= 0; i--) {
		coordY = getCoord(getPosition(cubes[i])[1]);
		if (coordY >= 0 && coordY <= GAME_WINDOW_HEIGHT) { 
			numberOfCubesPerRow[coordY] += 1; 
		}
	}
	return numberOfCubesPerRow;
}

function getCoordOfFullRow(cubes){
	var numberOfCubesPerRow = countNumberOfCubesPerRow(cubes);
	var coordOfFullRow = new Array()
	for (var i = numberOfCubesPerRow.length - 1; i >= 0; i--) {
		if (numberOfCubesPerRow[i] == GAME_WINDOW_WIDTH) {	
			coordOfFullRow.push(i);
		}
	}
	return coordOfFullRow;
}

function getFullRowList(cubes){
	coordOfFullRow = getCoordOfFullRow(cubes);
	var fullRowList = new Array();
	for (var i = coordOfFullRow.length - 1; i >= 0; i--) {
		var fullRow = new Array();
		for (var j = cubes.length - 1; j >= 0; j--) {
			if (getCoord(getPosition(cubes[j])[1]) == coordOfFullRow[i]) {
				fullRow.push(cubes[j]);
			}
		}
		fullRowList.push(fullRow);
	}
	return fullRowList;
}