// autor Tobiasz Witalis

const signsArray = ['/', '*', '-', '+']
const specialSignsArray = ['sin', 'cos', 'tan', 'sqrt', 'x^2', 'arcsin']
var isSign
var changeValue
var inputs
var lastCharacter
var lastCharacterIsSign
var giveResult = 0
var clearButton
var justCalculated

function addValue(val) {

	if (justCalculated) {
		clearValues()
		justCalculated = false
	}

	lastCharacter = inputs[1].value.slice(-1)
	lastCharacterIsSign = false
	isSign = false
	isSpecialSign = false
	console.log(giveResult)

	for (var i = 0; i < signsArray.length; i++)  {

		// sprawdz czy nowy val jest znakiem
		if (signsArray[i] == val)
			isSign = true

		// sprawdz czy ostatni charakter jest symbolem
		if (signsArray[i] == lastCharacter)
			lastCharacterIsSign = true
	}

	for (var i = 0; i < specialSignsArray.length; i++) {
		if (specialSignsArray[i] == val) {
			isSpecialSign = true
			break
		}
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
	else if (!isSpecialSign) {
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

	// znaki specjalne
	else {

		console.log("special sign")
		if (inputs[0].value != "") {

			if (val == 'sin')
				inputs[0].value = Math.sin(inputs[0].value)
			else if (val == 'cos')
				inputs[0].value = Math.cos(inputs[0].value)
			else if (val == 'tan')
				inputs[0].value = Math.tan(inputs[0].value)
			else if (val == 'sqrt')
				inputs[0].value = Math.sqrt(inputs[0].value)
			else if (val == 'x^2')
				inputs[0].value = Math.pow(inputs[0].value, 2)
			else if (val == 'arcsin')
				inputs[0].value = Math.asin(inputs[0].value)
		}
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

	if (x.style.display == "none") {
		document.getElementById("hidden_spec").style.display = "block"
	} else {
		document.getElementById("hidden_spec").style.display = "none"
	}
}

function calculateValue() {
	
	inputs[1].value += inputs[0].value
	if (!lastCharacterIsSign)
		inputs[0].value = eval(inputs[1].value.slice(0, -1))
	else 
		inputs[0].value = eval(inputs[1].value)

	justCalculated = true
}

// clear button
function clearValues() {

	console.log("clear")
	inputs.forEach( input => {
    	input.value = ""
  	})
}

// on open change input to none
document.addEventListener('DOMContentLoaded', function() {

	inputs = document.querySelectorAll('input')
	inputs.forEach( input => {
    	input.value = ""
  	}) 

  	spans = document.querySelectorAll('span')
  	clearButton = spans[0]

}, false)

