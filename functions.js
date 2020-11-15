// autor - Tobiasz Witalis

var equation = ""
var wasSymbol
var chosenSymbol = "/"
var lastNumber = "0"
var convert = true
var hasCalculated = true
var label
var equ_label

// calculate equation
function calculateEquation(equ) {
    var lastChar = equ.slice(-1)
    
    // if is not a number
    if (!(lastChar >= '0' && lastChar <= '9')) {
    
        // remove last character
        equ = equ.slice(0, -1)
    }
    return eval(equ)
}

// manipulatie number-buttons
function nrButton(btnNr) {
    
    changeColor(chosenSymbol)

    if (hasCalculated) {
        // add and replace new number
        console.log("1")
        label.value = btnNr
        lastNumber = btnNr
        equation = ""
        equ_label.value = "" // change visibility
    } else {
        // add number at the end
        var lastChar = equ_label.value.slice(-1)
        if ((lastChar >= '0' && lastChar <= '9') || lastChar == "") /*&& (label.value.length < 9)*/ {
            label.value += btnNr
            lastNumber += btnNr
        } else {
            if (wasSymbol) {
                label.value = btnNr
            } else {
                label.value += btnNr
                lastNumber += btnNr
            }
        }
    }
    wasSymbol = false
    hasCalculated = false
}

// +, -, *, /
function actionButton(btnSymbol) {

    changeColor(btnSymbol)

    if (!hasCalculated) {
        if (!wasSymbol) {
            console.log("3")
            equation += label.value + btnSymbol
            equ_label.value = equation
            lastNumber = label.value
            label.value = calculateEquation(equation)
            chosenSymbol = btnSymbol
        } else {
            console.log("4")
            var tmp = equ_label.value.slice(0, -1)
            equation = tmp + btnSymbol
            equ_label.value = equation
            chosenSymbol = btnSymbol
        }
    } else {
        console.log("5")
        chosenSymbol = btnSymbol
        lastNumber = label.value
        equation = lastNumber + chosenSymbol
        equ_label.value = equation
    }

    hasCalculated = false
    wasSymbol = true
}

function addValue(val) {

    const signsArray = ['/', '*', '-', '+']
    const specialSignsArray = ['sin', 'cos', 'tan', 'sqrt', 'x^2', 'arcsin']
    var isSymbol = false
    var isSpecialSign = false
    
    for (var i = 0; i < specialSignsArray.length; i++) {
		if (specialSignsArray[i] == val) {
			isSpecialSign = true
			break
		}
	}

    for (var i = 0; i < signsArray.length; i++) {
        if (val == signsArray[i]) {
            // symbol button
            actionButton(val)
            isSymbol = true
            break
        }
    }

    // number button
    if (!isSymbol && !isSpecialSign) {
        nrButton(val)
    }

    // special sign
    else {
		if (label.value != "") {

			if (val == 'sin')
                label.value = Math.sin(label.value)
			else if (val == 'cos')
                label.value = Math.cos(label.value)
			else if (val == 'tan')
                label.value = Math.tan(label.value)
			else if (val == 'sqrt')
                label.value = Math.sqrt(label.value)
			else if (val == 'x^2')
                label.value = Math.pow(label.value, 2)
			else if (val == 'arcsin')
                label.value = Math.asin(label.value)
		}
    }
}

// onclick "=" button
function calculateValue() {

    changeColor(chosenSymbol)

    if (!wasSymbol) {
        if (chosenSymbol == '/' && label.value == '') {
            label.value = "Błąd"
            convert = false
        } else {
            lastNumber = label.value
            equation += label.value
        }
    } else {
        equation = label.value + chosenSymbol + lastNumber
    }

    if (convert) {
        equ_label.value = equation
        label.value = calculateEquation(equation)
    }

    wasSymbol = true
    hasCalculated = true
    convert = true
}

// onClick "c" (clear) button
function clearValues() {
    changeColor(chosenSymbol)
    label.value = ""
    equation = ""
    wasSymbol = true
    chosenSymbol = "/"
    lastNumber = "0"
    equ_label.value = ""
    hasCalculated = true
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

function changeColor(val) {

    //change color of the chosen sign
    document.getElementById(val).style.color = "#111"
    document.getElementById(val).style.backgroundColor = "#0091ea"

	// change color of previously clicked sign
	document.getElementById(chosenSymbol).style.color = "#FFF"
    document.getElementById(chosenSymbol).style.backgroundColor = "#0c2835"
	
}

// on open change input to none
document.addEventListener('DOMContentLoaded', function() {

	var inputs = document.querySelectorAll('input')
	inputs.forEach( input => {
    	input.value = ""
    })
     
    label = inputs[0]
    equ_label = inputs[1]

  	spans = document.querySelectorAll('span')
  	clearButton = spans[0]

}, false)