//Constantes
const MAX_TRACK = 10;
//Variables
nbTrack = 0; //Current number of track
lenghtBoard = 20; //Current number of cell of a track
idRemaining = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //id not allocated
colorRemaining = ["#f4d03f", "#f8c471", "#e67e22", "#ba4a00", "#2471a3", "#2e86c1", "#7d3c98", "#2e4053", "#707b7c", "#a6acaf", "#a2d9ce"]; //color not allocate
trackArray = []; //track allocated
//TOCHECK : maybe automatize it especially if we allow user to add their own track
soundArray = ["marimba1", "marimba2", "bass1", "bass2", "accordeon1", "accordeon2", "grelots", "maracas", "tambourg", "tambourin1", "tambourin2", "trompette1", "trompette2"] //List of Sound possible to play
playing = 0; //is the track currently playing ?


//onLoad function
//Create a track - Call when document is loaded
window.onload = function() {
	//Load a first track
	ajout_piste();

}

//Functions
// Append a new Track and allocate id and color - Call by button Add and onLoad
function ajout_piste() {

	//Check if the maximal number of Track is not achieved
	if (nbTrack >= MAX_TRACK) {
		alert("Nombre limite de pistes atteint")
		return
	}
	
	//increase var global nbTrack
	nbTrack++;

	//Reserve the track (color and number)
	var idtrack = idRemaining.shift();
	var colorTrack = colorRemaining.shift();
	var newtrack = new Track(idtrack, colorTrack);

	//Add the track to TrackArray
	trackArray.push(newtrack);

	//GET THE TABLE
	var board = document.getElementById("board");

	//CREATE ROW
	var trackBoard = document.createElement("TR");
	//Specificate id and class
	trackBoard.id = "trackBoard" + newtrack.getTrackId();
	trackBoard.classList.add("trackBoardOff");

	//Create Cells which each one represent a sound
	var trackCells = document.createElement("TD");
	//Specificate id and class
	trackCells.id = "trackcell" + newtrack.getTrackId();
	trackCells.classList.add("track");
	//CREATE A TABLE
	var trackTable = document.createElement("TABLE");
	//Specificate id and class
	trackTable.id = "trackTable" + newtrack.getTrackId();
	trackTable.classList.add("trackTable");
	//Create a track each cells represent a sound
	var track = document.createElement("TR");
	//Specificate id and class
	track.id = "track" + newtrack.getTrackId();
	track.classList.add("track");
	//CREATE cells each one represent a sound (the track itself)
	for (var i = 1; i <= lenghtBoard; i++) {
		var sound = document.createElement("TD");
		//Specificate id and class
		sound.id = "sound" + newtrack.getTrackId() + ":" + i;
		sound.classList.add("soundDisabled");
		sound.addEventListener("click", changeSoundState);
		//APPEND sound TO THE track
		track.appendChild(sound);
	}
	trackTable.appendChild(track);
	trackCells.appendChild(trackTable);


	//CREATE chooseSoundCell
	var chooseSoundCell = document.createElement("TD");
	//Specificate id and class
	chooseSoundCell.id = "chooseSoundCell" + newtrack.getTrackId();
	chooseSoundCell.classList.add("unchooseSoundCell");
	//CREATE comboBox to change sound of the track
	var comboBoxChooseSound = document.createElement('Select');
	comboBoxChooseSound.id = "comboBox" + newtrack.getTrackId();
	comboBoxChooseSound.addEventListener("change", changeSound);
	//CREATE OPTIONS for comboBox
	var option = document.createElement("option");
	option.value = "-";
	option.innerText = "Change Sound";
	option.selected = "selected";
	comboBoxChooseSound.appendChild(option);
	for (var i = 0; i < soundArray.length; i++) {
		option = document.createElement('option');
		option.value = soundArray[i];
		option.innerText = soundArray[i];
		comboBoxChooseSound.appendChild(option);
	}

	chooseSoundCell.appendChild(comboBoxChooseSound);

	//CREATE deleteButtonCell
	var deleteButtonCell = document.createElement("TD");
	//Specificate id and class
	deleteButtonCell.id = "deleteButtonCell" + nbTrack;
	deleteButtonCell.classList.add("deleteButtonCell");
	//CREATE button delete inside of the cell
	var buttonDelete = document.createElement('Button');
	buttonDelete.innerText = "Supprimer la piste";
	buttonDelete.addEventListener("click", removeTrack);
	deleteButtonCell.appendChild(buttonDelete);

	//CREATE set track name cell
	var setTrackNameCell = document.createElement("TD");
	setTrackNameCell.id = "setTrackNameCell" + nbTrack;
	setTrackNameCell.classList.add("setTrackNameCell");
	//CREATE set track name button
	var setTrackNameButton = document.createElement("Button");
	setTrackNameButton.innerText = "Renommer la piste";
	setTrackNameButton.addEventListener("click", nameTrack);
	setTrackNameCell.appendChild(setTrackNameButton);
	
	//CREATE track name cell
	var trackNameCell = document.createElement("TD");
	trackNameCell.id = "trackNameCell" + nbTrack;
	trackNameCell.classList.add("trackNameCell");
	//CREATE track name text node
	var trackName = document.createTextNode(newtrack.getName());
	trackNameCell.appendChild(trackName);

	//APPEND cells TO THE ROW (trackCells,chooseSoundCell,deleteButtonCell)
	trackBoard.appendChild(trackCells);
	trackBoard.appendChild(chooseSoundCell);
	trackBoard.appendChild(deleteButtonCell);
	trackBoard.appendChild(trackNameCell);
	trackBoard.appendChild(setTrackNameCell);
	//APPEND THE ROW TO THE TABLE-BODY
	board.appendChild(trackBoard);

}

// Change state of a cell and add a sound to the track - Call when we click on a cell
function changeSoundState(mouseEvent) {
	//Check id of the track
	var idtrack = mouseEvent.target.parentElement.parentElement.id;
	idtrack = idtrack.substring(10);
	idtrack = parseInt(idtrack, 10);
	//Search element in array of track
	var i = 0;
	var found = (idtrack == trackArray[i].getTrackId());
	var index;
	while (!found && i < trackArray.length) {
		i = i + 1
		found = (idtrack == trackArray[i].getTrackId())
	}
	if (found) {
		index = i;
	} else {
		alert("changeSoundState : Element not found");
		return;
	}
	//Check id of the sound
	var idSound = mouseEvent.target.id;
	idSound = idSound.substring(7);
	idSound = parseInt(idSound, 10);

	if (mouseEvent.target.classList == "soundDisabled" && mouseEvent.target.parentElement.parentElement.parentElement.parentElement.classList == "trackBoardOn") {
		//Play the sound
		playSound("Son/" + trackArray[index].getSound() + ".mp3");
		//Add the sound to the track
		trackArray[index].addSound(idSound);
		//Set background color ON
		mouseEvent.target.style.backgroundColor = trackArray[index].getTrackColor();
		//Change class - Unused
		mouseEvent.target.classList = "soundEnabled";
	} else {
		//Remove the sound of the track
		trackArray[index].removeSound(idSound);
		//Set background color OFF
		mouseEvent.target.style.backgroundColor = "transparent";

		//Change class - Unused
		mouseEvent.target.classList = "soundDisabled";
	}

}

// Change state of the track and change the sound of the track - Call when we change value of a choose sound comboBox
function changeSound(mouseEvent) {
	//Check id of the track
	var idtrack = mouseEvent.target.parentElement.parentElement.id;
	idtrack = idtrack.substring(10);
	idtrack = parseInt(idtrack, 10);
	//Search element in array of track
	var i = 0;
	var found = (idtrack == trackArray[i].getTrackId());
	var index;
	while (!found && i < trackArray.length) {
		i = i + 1
		found = (idtrack == trackArray[i].getTrackId())
	}
	if (found) {
		index = i;
	} else {
		alert("changeSoundState : Element not found");
		return;
	}

	//Recuperation of value choosen
	select = document.getElementById("comboBox" + idtrack);
	choice = select.selectedIndex // Recuperation of index du <option> choosen
	valueOption = select.options[choice].value; // Recuperation of value of <option> of index "choice"
	//Change the sound and interface if value is != - => Choose sound
	if (valueOption != "-") {
		//Add sound to track object
		trackArray[index].setSound(valueOption);
		//TOREMOVE
		//alert("Vous avez change(e) le son de la "+mouseEvent.target.parentElement.parentElement.id);
		//Set interface ON
		mouseEvent.target.parentElement.classList = "chooseSoundCell";
		mouseEvent.target.parentElement.parentElement.classList = "trackBoardOn"
	} else {
		//Erase sound to track object
		trackArray[index].setSound("undefined");
		//TOCHECK - Erase sound Box
		//Set interface OFF
		mouseEvent.target.parentElement.classList = "unchooseSoundCell";
		mouseEvent.target.parentElement.parentElement.classList = "trackBoardOff"
	}
	//activate track and show it

}

//Name a track
function nameTrack(mouseEvent) {
	// get track id
	var idtrack = mouseEvent.target.parentElement.parentElement.id;
	idtrack = idtrack.substring(10);
	idtrack = parseInt(idtrack, 10);
	
	// ask for name and check if it is valid
	var getName = prompt("Entrez le nom de la piste : ");
	var name = "";
	if (getName != null && getName.length <=30){
		name = getName;
	}
	else {
		alert("Name Incorrect");
		return;
	}
	
	//Search element in array of track
	var i = 0;
	var found = (idtrack == trackArray[i].getTrackId());
	var index = -1;
	while (!found && i < trackArray.length) {
		i = i + 1
		found = (idtrack == trackArray[i].getTrackId())
	}
	if (found) {
		index = i;
	} else {
		alert("nameTrack : Element not found");
		return;
	}

	//set name in class
	trackArray[index].setName(name);
	//set name in document
	mouseEvent.target.parentElement.parentElement.children[3].firstChild.data=name;
}


//Remove a track and desallocate it (id and color)
function removeTrack(mouseEvent) {
	//Check id of the track which as been delete and pass it to int
	var idtrack = mouseEvent.target.parentElement.parentElement.id;
	idtrack = idtrack.substring(10);
	idtrack = parseInt(idtrack, 10);

	//Search element in array of track
	var i = 0;
	var found = (idtrack == trackArray[i].getTrackId());
	var index;
	while (!found && i < trackArray.length) {
		i = i + 1
		found = (idtrack == trackArray[i].getTrackId())
	}
	if (found) {
		index = i;
	} else {
		alert("changeSound : Element not found");
		return;
	}

	//Add color and number in our array of remainColor and remainTrack
	idRemaining.push(trackArray[i].getTrackId());
	colorRemaining.push(trackArray[i].getTrackColor())

	//Delete track for our array of track
	trackArray.splice(index, 1);

	//Remove the track of the interface
	mouseEvent.target.parentElement.parentElement.remove();
	nbTrack--;
	if (nbTrack==0)
		playing=0;
}

// stop playing the track
function stop() {
	playing = 0;

}

//play tracks
async function play() {
	if (playing)
			return;
	//set playing to 1
	playing = 1;
	var trackEnable = []; //Store track which are in use
	//Fill arrays
	for (var j = 0; j < trackArray.length; j++) {
		if (trackArray[j].getSound() != "undefined") {
			trackEnable.push(trackArray[j]);
		}
	}
	// Browse each column and check for each track if cell are ON
	for (var cell = 0; cell < lenghtBoard; cell++) {
		//idtrackPlayed=[];
		// check for each track if cell are ON and play if it's true

		for (var i = 0; i < trackEnable.length; i++) {
			// color each cell to visualize play
			var trackId = trackEnable[i].getTrackId();
			var idCell = "sound" + trackId + ":" + (cell + 1);
			var toColor = document.getElementById(idCell);
			toColor.style.backgroundColor = "blue";

			if (trackEnable[i].getSoundCells()[cell]) {
				playSound("Son/" + trackEnable[i].getSound() + ".mp3");
				//console.log("play"+trackEnable[i].getTrackId()+"-"+(cell+1));
			}
		}
		await sleep(500);

		//set color back to initial
		for (var i = 0; i < trackEnable.length; i++) {
			var trackId = trackEnable[i].getTrackId();
			var idCell = "sound" + trackId + ":" + (cell + 1);
			var toColor = document.getElementById(idCell);
			toColor.style.background = "transparent";

			if (trackEnable[i].getSoundCells()[cell]) {
				toColor.style.background = trackEnable[i].getTrackColor();
			}
		}
	}
	
	//if stop has not been requested, continue playing
	if (playing) {
		play();
	}
}

//make program sleep
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

//Display a sound
function playSound(url) {
	var audio = document.createElement('audio');
	audio.style.display = "none";
	audio.src = url;
	audio.autoplay = true;
	audio.onended = function() {
		audio.remove() //Remove when played.
	};
	document.body.appendChild(audio);
}
