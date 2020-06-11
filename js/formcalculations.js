// var theForm = document.forms["covopcalc"];
var form = document.getElementById("covopcalc").elements;

//range slider stuff
const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
	const range = wrap.querySelector(".range");
	const bubble = wrap.querySelector(".bubble");

	range.addEventListener("input", () => {
		setBubble(range, bubble);
	});
	setBubble(range, bubble);
});

function setBubble(range, bubble) {
	const val = range.value;
	const min = range.min ? range.min : 0;
	const max = range.max ? range.max : 100;
	const newVal = Number(((val - min) * 100) / (max - min));
	bubble.innerHTML = val;

	// Sorta magic numbers based on size of the native UI thumb
	bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}


//Set up an associative array
var government_bonus = new Array();
government_bonus["None"] = 0;
government_bonus["Corporatism"] = -5;
government_bonus["Democracy"] = -10;
government_bonus["Nationalism"] = 25;
government_bonus["Socialism"] = 0;
government_bonus["Totalitarianism"] = 15;
government_bonus["Anarchy"] = -15;

function getGovernmentBonus() {
	var governmentBonus = 0;
	var selectedGovernment = form["government"];
	governmentBonus = government_bonus[selectedGovernment.value];

	return governmentBonus;
}


function calculateTotal() {
	var guards = parseInt(document.getElementById("guards").value);
	var roids = parseInt(document.getElementById("roids").value);
	var guardsRoids = 0;
	var maxGuardsRoids = 15;
	if((guards / (roids + 1) > maxGuardsRoids)) guardsRoids = 15;
	var guardsBase = 50 + (5 * guardsRoids);
	console.log('guardsBase = '+ guardsBase)

	var securitycentres = parseInt(document.getElementById("securitycentres").value);
	var population = parseInt(document.getElementById("population").value);
	var modifier = 1 + (((securitycentres * 2.75) + getGovernmentBonus() + population) / 100);
	console.log('modifier = '+ modifier)
	var totalAlert = guardsBase * modifier;


	//display the result
	var divobj = document.getElementById('totalAlert');
	divobj.style.display = 'block';
	divobj.innerHTML = "Total alert: " + totalAlert;
}