function move(tetrisCube, freezedCubes, direction, ignoreOverlap=false) {
	var collideGround = false;
	var targetCoordList = new Array(tetrisCube.length);
	for (var i = tetrisCube.length - 1; i >= 0; i--) {
		var currentCoord = getPosition(tetrisCube[i]);
		var targetCoord = currentCoord.slice(0);
		if (direction == "left")       { targetCoord[0] = currentCoord[0] - CUBE_LENGTH; }
		else if (direction == "right") { targetCoord[0] = currentCoord[0] + CUBE_LENGTH; }
		else if (direction == "up")    { targetCoord[1] = currentCoord[1] - CUBE_LENGTH; }
		else if (direction == "down")  { targetCoord[1] = currentCoord[1] + CUBE_LENGTH; }
		else if (direction == "rotate"){ targetCoord = getRotatedCoord(tetrisCube[i], center(tetrisCube)) }
		else {}
		targetCoordList[i] = targetCoord;
	}
	if (direction == "down") {
		collideGround = checkCollideGround(targetCoordList);
		if (!ignoreOverlap) {
			collideGround = collideGround || checkOverlap(targetCoordList, freezedCubes);
		}
		if (!collideGround) { moveCubes(tetrisCube, targetCoordList); }
	}
	else {
		if (!checkCollideGround(targetCoordList) && !checkCollideBorder(targetCoordList) && !checkOverlap(targetCoordList, freezedCubes)){
			moveCubes(tetrisCube, targetCoordList);
		}
	}
	COLLIDE_GROUND = collideGround;
}

function moveCubes(cubeList, targetCoordList) {
	for (var i = cubeList.length - 1; i >= 0; i--) {
		cubeList[i].style.left = targetCoordList[i][0] + "em";
		cubeList[i].style.top = targetCoordList[i][1] + "em";
	}
}

function getRotatedCoord(object, center, angle=Math.PI/2) {
	var currentCoord = getPosition(object);
	var targetCoord = new Array(2);
	targetCoord[0] = center[0] + (currentCoord[0] - center[0])*Math.cos(angle) + (currentCoord[1] - center[1])*Math.sin(angle);
	targetCoord[1] = center[1] + -(currentCoord[0] - center[0])*Math.sin(angle) + (currentCoord[1] - center[1])*Math.cos(angle);
	return targetCoord;
}

function checkCollideGround(targetCoordList) {
	let collideGround = false;
	for (var i = targetCoordList.length - 1; i >= 0; i--) {
		coordY = targetCoordList[i][1];
		if (coordY > parseFloat(GAME_WINDOW_HEIGHT*CUBE_LENGTH) + 0.001) { 
			collideGround = true; 
		}
	}
	return collideGround;
}

function checkCollideBorder(targetCoordList) {
	let collideBorder = false;
	for (var i = targetCoordList.length - 1; i >= 0; i--) {
		coordX = targetCoordList[i][0];
		if (coordX > parseFloat(GAME_WINDOW_WIDTH*CUBE_LENGTH) + 0.001 || coordX < -0.001) { 
			collideBorder = true; 
		}
	}
	return collideBorder;
}

function checkOverlap(targetCoordList, freezedCubes) {
	let overlap = false;
	for (var i = targetCoordList.length - 1; i >= 0; i--) {
		for (var j = freezedCubes.length - 1; j >= 0; j--) {
			if (distance(targetCoordList[i], getPosition(freezedCubes[j])) < 0.001){ 
				overlap = true; 
			}
		}
	}
	return overlap;
}
