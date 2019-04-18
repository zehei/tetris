function getDeviceWidth() { return document.body.clientWidth/16; }

function createGameWindow() {
	var gameWindow = document.createElement("div");
	var marginLeft = (getDeviceWidth() - GAME_WINDOW_WIDTH*CUBE_LENGTH)/2;
	gameWindow.setAttribute("id", "gameWindow");
	var width = GAME_WINDOW_WIDTH*CUBE_LENGTH;
	var height = GAME_WINDOW_HEIGHT*CUBE_LENGTH;
	gameWindow.setAttribute("style", 
		"width:" + width + "em;" +
		"height:" + height + "em;" +
		"padding:" + "0.15em;" +
		"margin-top:" + "2em;" +
		"margin-left:" + marginLeft + "em;");
	console.log("GAME WINDOW CREATED");
	document.body.appendChild(gameWindow);
	return gameWindow;
}

function createScoreboard() {
	var scoreboard = document.createElement("div");
	var marginLeft = (getDeviceWidth() - SCOREBOARD_WIDTH*CUBE_LENGTH)/2;
	var marginTop = 2.5;
	scoreboard.setAttribute("id", "scoreboard");
	var width = SCOREBOARD_WIDTH*CUBE_LENGTH;
	var height = SCOREBOARD_HEIGHT*CUBE_LENGTH;
	scoreboard.setAttribute("style", 
		"width:" + width + "em;" +
		"height:" + height + "em;" +
		"padding:" + "0.15em;" +
		"margin-top:" + marginTop + "em;" +
		"margin-left:" + marginLeft + "em;" + 
		"line-height:" + height + "em;");
	document.body.appendChild(scoreboard);
	scoreboard.appendChild(TEXT_NODE);
	console.log("SCOREBOARD CREATED");
	return scoreboard;
}

function createTetrisCube(gameWindow, tetrisCubeType) {
	var coordList = TETRIS_CUBE_TYPE_DICT[tetrisCubeType];
	var tetrisCube = new Array();
	for (let i = coordList.length - 1; i >= 0; i--) {
		tetrisCube.push(createCube(gameWindow, coordList[i]));
	}
	return tetrisCube;
}

function getCoord(em) {
	return Math.round((em - GAME_WINDOW_PADDING)/(CUBE_LENGTH))
}

function createCube(gameWindow, coord) {
	var cube = document.createElement("div");
	var width = CUBE_LENGTH - CUBE_MARGIN*2;
	var top = GAME_WINDOW_PADDING + CUBE_LENGTH*(coord[1] - 1);
	var left = GAME_WINDOW_PADDING + CUBE_LENGTH*coord[0];
	cube.setAttribute("class", "cube");
	cube.setAttribute("style", 
		"width:" + width + "em;" +
		"height:" + width + "em;" +
		"margin:" + CUBE_MARGIN + "em;" +
		"top:" + top + "em;" +
		"left:" + left + "em;");
	gameWindow.appendChild(cube);
	return cube;
}