function getDeviceWidth() { return document.body.clientWidth/16; }

function createGameWindow() {
	var gameWindow = document.createElement("div");
	marginLeft = (getDeviceWidth() - GAME_WINDOW_WIDTH)/2;
	gameWindow.setAttribute("id", "gameWindow");
	var width = GAME_WINDOW_WIDTH*CUBE_LENGTH;
	var height = GAME_WINDOW_HEIGHT*CUBE_LENGTH;
	gameWindow.setAttribute("style", 
		"width:" + width + "em;" +
		"height:" + height + "em;" +
		"padding:" + "0.15em;" +
		"margin-top:" + "2em;" +
		"margin-left:" + marginLeft + "em;");
	document.body.appendChild(gameWindow);
	return gameWindow;
}

function createTetrisCube(gameWindow, tetrisCubeType) {
	var coordList = TETRIS_CUBE_TYPE_DICT[tetrisCubeType];
	var tetrisCube = new Array();
	for (let i = coordList.length - 1; i >= 0; i--) {
		tetrisCube.push(createCube(gameWindow, coordList[i]));
	}
	return tetrisCube;
}

function getCoord(em){
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