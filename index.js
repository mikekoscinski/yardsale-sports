autographGallery = document.querySelector('.autographs');

function formatNameForFile(name) {
	return formattedName = name.toLowerCase().replace(/ /g, '-');
}

function Player(name, team, position) {
	this.name = name;
	this.team = team;
	this.position = position;
	this.file = `${formatNameForFile(this.name)}-autograph.jpg`;
}

// First, generate Player object for each individual autograph
// Store each Player object in an array (avail for forEach)

const players = [
	new Player('Adam Jones', 'Baltimore Orioles', 'Outfielder'),
	new Player('Andy Pettitte', 'New York Yankees', 'Pitcher'),
	new Player('David Ortiz', 'Boston Red Sox', 'Designated Hitter'),
	new Player('Derek Jeter', 'New York Yankees', 'Shortstop'),
	new Player('Hank Aaron', 'Atlanta Braves', 'Outfielder'),
	new Player('Jorge Posada', 'New York Yankees', 'Catcher'),
	new Player('Yogi Berra', 'New York Yankees', 'Catcher'),
];

// Then, generate HTML cards for each player

function makePlayerCardHTML (player) {
	return cardHTML = `
		<div class="card autograph">
			<img src="${player.file}" alt="${player.name} autographed baseball" title="${player.name}">
			<div class ="caption autograph">
				<p>${player.name}</p>
				<p>${player.team}</p>
				<p>${player.position}</p>
			</div>
		</div>
	`;
}


players.forEach(el => {
	const playerCardHTML = makePlayerCardHTML(el);

});





// then makePlayerCard function that passes parameters to the player card, returns the card & inserts it into the gallery div



// When user clicks into modal, generate new HTML? Or should I pre-generate? (Each player will have different... Could have arrays for each player's accolades, then accolades.forEach generate a <ul> to be added to the description card within the <p>accolades</p>)