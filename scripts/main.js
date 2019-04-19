COLLIDE_GROUND = false;
FREEZED_CUBES = new Array();
SCORE = 0;
SCORE_CHANGE = false;
TEXT_NODE = document.createTextNode("SCORE: " + SCORE);

window.onload = function(){
	GAME_WINDOW = createGameWindow();
	SCOREBOARD = createScoreboard();
	startNewRound(gameWindow, FREEZED_CUBES);
}

function startNewRound() {
	tetrisCubeType = Object.keys(TETRIS_CUBE_TYPE_DICT)[randomInteger(0, 6)];
	if (gameOver(FREEZED_CUBES)) {
		clearTimeout(UPDATE_SCORE_EVENT);
		clearTimeout(COLLIDE_LISTENER);
		alert("Game Over!");
	}
	else {
		tetrisCube = createTetrisCube(GAME_WINDOW, tetrisCubeType);
		registerCollideListener(tetrisCube);
		registerMoveDownEvent(tetrisCube);
		registerUpdateScore();
	}
}

function registerUpdateScore() {
	if (SCORE_CHANGE) {
		TEXT_NODE.remove();
		TEXT_NODE = document.createTextNode("SCORE: " + SCORE);
		SCOREBOARD.append(TEXT_NODE);
		SCORE_CHANGE = false;
	}
	UPDATE_SCORE_EVENT = setTimeout("registerUpdateScore()", 100);
}

function registerMoveDownEvent(tetrisCube) {
	move(tetrisCube, FREEZED_CUBES, "down");
	MOVE_DOWN_EVENT = setTimeout("registerMoveDownEvent(tetrisCube)", 1000);
}

function registerCollideListener(tetrisCube) {
	if (COLLIDE_GROUND == true) {
		clearTimeout(MOVE_DOWN_EVENT);
		//the tetris-cube will be "freezed" and absorbed by the existing freezed cubes list.
		FREEZED_CUBES = addArray(FREEZED_CUBES, tetrisCube);
		//if there is one row full of freezed cubes, it will be eliminated.
		var fullRowList = getFullRowList(FREEZED_CUBES);
		if (fullRowList.length != 0) {
			for (var i = fullRowList.length - 1; i >= 0; i--) {
				var fullRow = fullRowList[i];
				FREEZED_CUBES = subArray(FREEZED_CUBES, fullRow);
				deleteCubes(GAME_WINDOW, FREEZED_CUBES, fullRow);
				SCORE += 1;
				SCORE_CHANGE = true;
			}
		}
		COLLIDE_GROUND = false;
		startNewRound();
	}
	COLLIDE_LISTENER = setTimeout("registerCollideListener(tetrisCube)", 100);
}

document.onkeydown = function() {
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if (e) {
		direction = KEY_DICT[e.keyCode + ""];
		move(tetrisCube, FREEZED_CUBES, direction);
	}	
};

var touch=function(e){
	var x=e.touches[0].pageX;
	var y=e.touches[0].pageY;
	if (x < window.innerWidth/3) { direction = "left"; }
	else if (x > window.innerWidth/3*2) { direction = "right"; }
	else if (y > window.innerHeight/2) { direction = "down"; }
	else { direction = "rotate";}
	move(tetrisCube, FREEZED_CUBES, direction);
};

document.addEventListener("touchstart", touch);