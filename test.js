var equation
var wasSymbol
var chosenSymbol = "0"
var lastNumber = "0";
var convert = true
var hasCalculated = true
var inputs
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

    //changeColor(btnNr)

    if (hasCalculated) {
        label.value = btnNr
        lastNumber = btnNr
        equation = ""
        equ_label.value = "" // chnge visibility
    } else {
        // get last character
        var lastChar = equ_label.value.slice(-1)
        if (lastChar >= '0' && lastChar <= '9') /*&& (label.value.length < 9)*/ {
            label.value += btnNr
            lastNumber += btnNr
        } else {
            if (wasSymbol) {
                label.value = btnNr
            } 
            // else
            // {
            //     if (label.Content.ToString().Length < 9)
            //     {
            //         label.Content += btnNr;
            //         lastNumber += btnNr;
            //     }
            // }
        }
    }
    wasSymbol = false
    hasCalculated = false
}

// +, -, *, /
function actionButton(btnSymbol) {

    // change color

    if (!hasCalculated) {
        if (!wasSymbol) {
            equation += label.value + btnSymbol
            equ_label.value = equation
            lastNumber = label.value
            label.value = calculateEquation(equation)
            chosenSymbol = btnSymbol
            equ_label.value = "" // hidden
        } else {
            var tmp = equ_label.value.slice(0, -1)
            equation = tmp + btnSymbol
            equ_label.value = equation
            chosenSymbol = btnSymbol
        }
    } else {
        chosenSymbol = btnSymbol
        lastNumber = label.content
        equation = lastNumber + chosenSymbol
        equ_label.value = equation
    }

    hasCalculated = false
    wasSymbol = true
}

function calculate() {

    // change color

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

function addValue(val) {

    const signsArray = ['/', '*', '-', '+']
    var isSymbol = false
    
    for (var i = 0; i < signsArray.length; i++) {
        if (val == signsArray[i]) {
            actionButton(val)
            isSymbol = true
            break
        }
    }

    if (!isSymbol) {
        nrButton(val)
    }
}

function changeColor(val) {

	if (lastCharacter != "") {
		// change color of previously clicked sign
		document.getElementById(chosenSymbol).style.color = "#FFF"
		document.getElementById(chosenSymbol).style.backgroundColor = "#0c2835"
	}

	//change color of the chosen sign
	document.getElementById(val).style.color = "#111"
	document.getElementById(val).style.backgroundColor = "#0091ea"
}

// on open change input to none
document.addEventListener('DOMContentLoaded', function() {

	inputs = document.querySelectorAll('input')
	inputs.forEach( input => {
    	input.value = ""
    })
     
    label = inputs[0]
    equ_label = inputs[1]

  	spans = document.querySelectorAll('span')
  	clearButton = spans[0]

}, false)