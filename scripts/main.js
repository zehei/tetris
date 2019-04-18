COLLIDE_GROUND = false;
FREEZED_CUBES = new Array();

window.onload = function(){
	GAME_WINDOW = createGameWindow();
	startNewRound(gameWindow, FREEZED_CUBES);
}

function startNewRound() {
	tetrisCubeType = Object.keys(TETRIS_CUBE_TYPE_DICT)[randomInteger(0, 6)];
	if (gameOver(FREEZED_CUBES)) {
		alert("Game Over!");
	}
	else {
		tetrisCube = createTetrisCube(GAME_WINDOW, tetrisCubeType);
		registerCollideListener(tetrisCube);
		registerMoveDownEvent(tetrisCube);
	}
}

function registerMoveDownEvent(tetrisCube) {
	move(tetrisCube, FREEZED_CUBES, "down");
	window.moveDownEvent = setTimeout("registerMoveDownEvent(tetrisCube)", 1000);
}

function registerCollideListener(tetrisCube) {
	if (COLLIDE_GROUND == true) {
		clearTimeout(window.moveDownEvent);
		//the tetris-cube will be "freezed" and absorbed by the existing freezed cubes list.
		FREEZED_CUBES = addArray(FREEZED_CUBES, tetrisCube);
		//if there is one row full of freezed cubes, it will be eliminated.
		var fullCubesRow = getFullCubesRow(FREEZED_CUBES);
		if (fullCubesRow.length != 0) {
			FREEZED_CUBES = subArray(FREEZED_CUBES, fullCubesRow);
			deleteCubes(GAME_WINDOW, FREEZED_CUBES, fullCubesRow);
		}
		COLLIDE_GROUND = false;
		startNewRound();
	}
	setTimeout("registerCollideListener(tetrisCube)", 100);
}

document.onkeydown = function() {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e) {
		direction = KEY_DICT[e.keyCode + ""];
		move(tetrisCube, FREEZED_CUBES, direction);
	}	
};