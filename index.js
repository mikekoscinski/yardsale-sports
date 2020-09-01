// TODO: Will need to revise the div names (and the class names) once I add sports cards to the site as well. '.gallery' will need to become 'gallery autographs' or something like that

autographGallery = document.querySelector('.gallery');

function formatNameForFile(name) {
	return formattedName = name.toLowerCase().replace(/ /g, '-');
}

function Player(name, team, position) {
	this.name = name;
	this.team = team;
	this.position = position;
	this.file = `${formatNameForFile(this.name)}-autograph.jpg`;
}

// Generate Player objects; store in Array (use forEach later)
const players = [
	new Player('Adam Jones', 'Baltimore Orioles', 'Outfielder'),
	new Player('Andy Pettitte', 'New York Yankees', 'Pitcher'),
	new Player('David Ortiz', 'Boston Red Sox', 'Designated Hitter'),
	new Player('Derek Jeter', 'New York Yankees', 'Infielder'),
	new Player('Hank Aaron', 'Atlanta Braves', 'Outfielder'),
	new Player('Jorge Posada', 'New York Yankees', 'Catcher'),
	new Player('Yogi Berra', 'New York Yankees', 'Catcher'),
];

// Generate HTML cards for each player
function makePlayerCardFrontHTML (player) {
	return cardHTML = `
		<div class="card">
			<img src="./images/${player.file}" alt="${player.name} autographed baseball" title="${player.name}">
			<div class ="caption autograph">
				<h3>${player.name}</h3>
				<p>${player.team}</p>
				<p>${player.position}</p>
			</div>
		</div>
	`;
}

// For each player, generate a playerCardHTML snippet & insert it into the autographGallery
players.forEach(el => {
	const playerCardHTML = makePlayerCardFrontHTML(el);
	autographGallery.insertAdjacentHTML('beforeend', playerCardHTML);
});

// When user clicks into modal, generate new HTML? Or should I pre-generate? (Each player will have different... Could have arrays for each player's accolades, then accolades.forEach generate a <ul> to be added to the description card within the <p>accolades</p>)















// TODO: add these to 'players' array once i find images for each
const playersToAddLater = [
	new Player('Akinori Iwamura',	'Tampa Bay Rays', 'Infielder'),
	new Player('Alex Gordon',	'Kansas City Royals', 'Outfielder'),
	new Player('Alex Rodriguez', 'Yankees', 'Infielder'),
	new Player('Aubrey Huff',	'Baltimore Orioles', 'Infielder'),
	new Player('Billy Ripken',	'Baltimore Orioles', 'Infielder'),
	new Player('Boof Bonsor',	'Minnesota Twins', 'Pitcher'),
	new Player('Brian Bannister',	'Kansas City Royals', 'Pitcher'),
	new Player('Brian Bruney',	'New York Yankees', 'Pitcher'),
	new Player('Brian Burres',	'Baltimore Orioles', 'Pitcher'),
	new Player('Brian Matusz',	'Baltimore Orioles', 'Pitcher'),
	new Player('Brian Roberts',	'Baltimore Orioles', 'Infielder'),
	new Player('Denard Span', 'Minnesota Twins', 'Outfielder'),
	new Player('Dennis Sarfate', 'Fukuoka SoftBank Hawks', 'Pitcher'),
	new Player('Dick Hall',	'Baltimore Orioles', 'Pitcher'),
	new Player('Edwar Ramirez',	'New York Yankees', 'Pitcher'),
	new Player('Edwin Jackson',	'Tampa Bay Rays', 'Pitcher'),
	new Player('Erik Beddard',	'Baltimore Orioles', 'Pitcher'),
	new Player('Garrett Olson', 'Baltimore Orioles', 'Pitcher'),
	new Player('George Sherrill',	'Baltimore Orioles', 'Pitcher'),
	new Player('James Shields',	'Tampa Bay Rays', 'Pitcher'),
	new Player('Jamie Walker',	'Baltimore Orioles', 'Pitcher'),
	new Player('Jered Weaver',	'Los Angeles Angels', 'Pitcher'),
	new Player('Jim Hickey',	'Tampa Bay Rays', 'Pitching Coach'),
	new Player('Jim Palmer', 'Baltimore Orioles', 'Pitcher'),
	new Player('Joe Maddon',	'Tampa Bay Rays', 'Manager'),
	new Player('Justin Masterson', 'Boston Red Sox', 'Pitcher'), 
	new Player('Kevin Millar', 'Baltimore Orioles', 'Infielder'),
	new Player('Kevin Slowey',	'Minnesota Twins', 'Pitcher'),
	new Player('Larry Sheets',	'Baltimore Orioles'),
	new Player('Luke Scott',	'Baltimore Orioles', 'Outfielder'),
	new Player('Matt Garza', 'Tampa Bay Rays', 'Pitcher'),
	new Player('Mark Grudzielanek',	'Kansas City Royals', 'Infielder'),
	new Player('Mark Teahen',	'Kansas City Royals', 'Outfielder'),
	new Player('Melvin Mora',	'Baltimore Orioles', 'Infielder'),
	new Player('Nelson Figueroa',	'New York Mets', 'Pitcher'),
	new Player('Nick Swisher', 'New York Yankees', 'Outfielder'),
	new Player('Paul Blair',	'Baltimore Orioles', 'Outfielder'),
	new Player('Rick Dempsey',	'Baltimore Orioles', 'Catcher'),
	new Player('Scott Kazmir',	'Tampa Bay Rays', 'Pitcher'),
	new Player('Sean Casey',	'Boston Red Sox', 'Infielder'),
	new Player('Terry Francona', 'Boston Red Sox', 'Manager'),
	new Player('Tim Kurkjian', 'ESPN', 'Reporter'),
	new Player('Tim Teufel', 'New York Mets', 'Infielder'),
	new Player('Torii Hunter', 'Los Angeles Angels', 'Outfielder'),
];