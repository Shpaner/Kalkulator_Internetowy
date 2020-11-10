// autor Tobiasz Witalis

const signsArray = ['/', '*', '-', '+']
var isSign
var changeValue
var inputs
var lastCharacter
var lastCharacterIsSign
var giveResult = 0

function addValue(val) {

	lastCharacter = inputs[1].value.slice(-1)
	lastCharacterIsSign = false
	isSign = false
	console.log(giveResult)

	for (var i = 0; i < signsArray.length; i++)  {

		// sprawdz czy nowy val jest znakiem
		if (signsArray[i] == val)
			isSign = true

		// sprawdz czy ostatni charakter jest symbolem
		if (signsArray[i] == lastCharacter)
			lastCharacterIsSign = true
	}

	if (isSign) {

		// +, + or -, -, etc (doubled the val) - nothing happens
		if (lastCharacter == val) {
			console.log("1")
			changeValue = true
		}

		// podmianka
		else if (lastCharacterIsSign) {

			if (giveResult < 2) {
				console.log("2")
				inputs[1].value = inputs[1].value.slice(0, -1) + val
				changeColor(val)
			} 

			else {
				inputs[1].value = inputs[1].value + inputs[0].value + val
				inputs[0].value = eval(inputs[1].value.slice(0, -1))
				giveResult -= 1
			}
			changeValue = true
		}

		// dodaj znak na koncu
		else if (!lastCharacterIsSign) {
			console.log("3")
			changeColor(val)
			inputs[1].value += inputs[0].value + val
			changeValue = true
			giveResult += 1
		}
	}
	
	// normalne liczby (nie jest znakiem)
	else {
		if (!changeValue) {
			console.log("4")
			inputs[0].value += val // dodaj liczbe
		} else {
			console.log("5")
			inputs[0].value = val // zresetuj i dodaj liczbe
			giveResult += 1
		}
		changeValue = false
	}
}

function changeColor(val) {

	if (lastCharacter != "") {
		// change color of previously clicked sign
		document.getElementById(lastCharacter).style.color = "#FFF"
		document.getElementById(lastCharacter).style.backgroundColor = "#0c2835"
	}

	//change color of the chosen sign
	document.getElementById(val).style.color = "#111"
	document.getElementById(val).style.backgroundColor = "#0091ea"
}

// open special options signs
function openSpec() {

	var i, x
	x = document.getElementById("hidden_spec")

	console.log(x.style.display)

	if (x.style.display == "none") {
		document.getElementById("hidden_spec").style.display = "block"
	} else {
		document.getElementById("hidden_spec").style.display = "none"
	}
}

// on open change input to none
document.addEventListener('DOMContentLoaded', function() {

	inputs = document.querySelectorAll('input')
	inputs.forEach( input => {
    	input.value = ""
  	})    

}, false)