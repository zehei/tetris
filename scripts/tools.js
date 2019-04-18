function randomInteger(minInteger, maxInteger) {
	maxInteger -= 0.00000001;
	return Math.floor((Math.random()*(maxInteger + 1 - minInteger)) + minInteger);
}

function distance(coordA, coordB) {
	return Math.hypot(coordA[0] - coordB[0], coordA[1] - coordB[1]);
}

function getPosition(object) {
	var coordX = window.getComputedStyle(object, null).getPropertyValue("left").split("px")[0]/16;
	var coordY = window.getComputedStyle(object, null).getPropertyValue("top").split("px")[0]/16;
	return [coordX, coordY];
}

//!!!NOT FINISHED
function center(cubes) {
	var centerX = 0;
	var centerY = 0;
	for (var i = cubes.length - 1; i >= 0; i--) {
		centerX += getPosition(cubes[i])[0];
		centerY += getPosition(cubes[i])[1];
	}
	centerX = centerX/4 + 0.001;
	centerY = centerY/4 + 0.001;
	closest = 10000;
	closestIndex = -1;
	for (var i = cubes.length - 1; i >= 0; i--) {
		d = distance([centerX, centerY], getPosition(cubes[i]));
		if (d < closest) {
			closest = d;
			closestIndex = i;
		}
	}
	return getPosition(tetrisCube[closestIndex]);
}

function addArray(arr1, arr2) {
	for (var i = arr2.length - 1; i >= 0; i--) {
		arr1.push(arr2[i])
	}
	return arr1;
}

function subArray(arr1, arr2) {
	for (var i = arr1.length - 1; i >= 0; i--) {
		if (arr2.indexOf(arr1[i]) != -1){
			arr1.splice(i, 1);
		}
	}
	return arr1;
}