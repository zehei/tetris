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

function getFullCubesRow(cubes){
	var countCubesPerRow = new Array(GAME_WINDOW_HEIGHT).fill(0);
	var fullCubesRow = new Array();
	var fullCubesRowCoord = new Array();
	for (var i = cubes.length - 1; i >= 0; i--) {
		coordY = getCoord(getPosition(cubes[i])[1]);
		if (coordY < 0 || coordY > GAME_WINDOW_HEIGHT){
		}
		else {
			countCubesPerRow[coordY] += 1;
		}
	}
	if (countCubesPerRow.indexOf(GAME_WINDOW_WIDTH) != -1) {
		for (var i = countCubesPerRow.length - 1; i >= 0; i--) {
			if (countCubesPerRow[i] == GAME_WINDOW_WIDTH) {
				fullCubesRowCoord.push(i);
			}
		}
	}
	for (var i = cubes.length - 1; i >= 0; i--) {
		coordY = getCoord(getPosition(cubes[i])[1]);
		if (fullCubesRowCoord.indexOf(coordY) != -1) {
			fullCubesRow.push(cubes[i]);
		}
	}
	return fullCubesRow;
}