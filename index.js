function formatNameForFile(name) {
	return formattedName = name.toLowerCase().replace(/ /g, '-');
}

function Player(name, team) {
	this.name = name;
	this.team = team;
	this.file = `${formatNameForFile(this.name)}-autograph.jpg`;
}

// First, generate Player object for each individual autograph

const ADAM_JONES = new Player('Adam Jones', 'Baltimore Orioles');
const ANDY_PETTITTE = new Player('Andy Pettitte', 'New York Yankees');
const DAVID_ORTIZ = new Player('David Ortiz', 'Boston Red Sox');
const DEREK_JETER = new Player('Derek Jeter', 'New York Yankees');
const HANK_AARON = new Player('Hank Aaron', 'Atlanta Braves');
const JORGE_POSADA = new Player('Jorge Posada', 'New York Yankees');
const YOGI_BERRA = new Player('Yogi Berra', 'New York Yankees');

// Store each Player object in an array - we will use .forEach method on them later

const players = [
	ADAM_JONES,
	ANDY_PETTITTE,
	DAVID_ORTIZ,
	DEREK_JETER,
	HANK_AARON,
	JORGE_POSADA,
	YOGI_BERRA,
];

console.log(players);


// Then, generate HTML cards for each player. These will be visible on the DOM

players.forEach(el => {
	// insert playerCard HTML
});






// then makePlayerCard function that passes parameters to the player card, returns the card & inserts it into the gallery div



// When user clicks into modal, generate new HTML? Or should I pre-generate? (Each player will have different... Could have arrays for each player's accolades, then accolades.forEach generate a <ul> to be added to the description card within the <p>accolades</p>)