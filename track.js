//Class track
class Track{

	//constructor of Track
	constructor(idTrack,colorTrack) {
		// variables de classe.
		this.id = idTrack; //int - id reserve for the track
		this.colorTrack = colorTrack; //String - color reserve for the track
		//Initialize song as undefined
		this.sound=undefined; //String - sound choosen for the track
		this.soundCells=[]; //Array of Boolean - each one represent a cell (activate/desactivate)
		//Initialize name as (Piste sans nom)
		this.name="(Piste sans nom)";

		//Initialize songCells to False
		for(var i=0;i<lenghtBoard;i++){
			this.soundCells.push(false);
		}

	}

	//GETTER
	//return name of track
	getName(){
		return this.name;
	}
	//return id allocate to the track
	getTrackId(){
		return this.id;
	}
	//return color allocate to the track
	getTrackColor(){
		return this.colorTrack;
	}
	//return song choosen for the track
	getSound(){
		return this.sound;
	}
	//return songCells
	getSoundCells(){
		return this.soundCells;
	}

	//SETTER
	//set sound of a track
	setSound(sound){
		this.sound=sound;
	}
	//set name of track
	setName(name){
		this.name=name;
	}

	//Others Functions
	//set a cell to true
	addSound(indexSound){
		this.soundCells[indexSound-1]=true;
		//TO REMOVE - affiche l'état du tableau de son
		//console.log("Track "+this.id+" - "+this.soundCells);
	}

	//set a cell to false
	removeSound(indexSound){
		this.soundCells[indexSound-1]=false;
		//TO REMOVE - affiche l'état du tableau de son
		//console.log("Track "+this.id+" - "+this.soundCells);
	}

}
