var Gpio = require('onoff').Gpio
var ledGreen = new Gpio(5, 'out')
var ledYellow = new Gpio(13, 'out')
var ledBlue = new Gpio(7, 'out')
var ledRed = new Gpio(4, 'out')
const axios = require('axios')
const Lcd = require('lcd');
const lcd = new Lcd({ rs: 25, e: 24, data: [23, 17, 18, 22], cols: 16, rows: 2 });
setInterval(checkApi, 100)
setInterval(checkText, 100)
var count = 0, i = 1, j,theText = "MERHABA";

process.on('SIGINT', () => {
    lcd.clear();
    lcd.close();
    end();
    process.exit();
});
printOnLcd(theText);
/*
lcd.on('ready', () => {
  setInterval(() => {
    lcd.setCursor(0, 0);
    lcd.print(new Date().toISOString().substring(11, 19), (err) => {
      if (err) {
        throw err;
      }
    });
  }, 100);
});
*/
function checkApi() {
    if (count % 100 == 0) {
        if (i < 10)
            i += 2;
        else
            i -= 2;
        process.stdout.write("Listening");
        for (j = 0; j < i; j++) {
            process.stdout.write('.');
        }
        process.stdout.write('\n')
    }
    count++;
    axios.get('https://lightledapi.herokuapp.com/led')
        .then(response => {
            if (response.data[0].red) {
                light(1);
            }
            else {
                off(1);
            }
            if (response.data[0].yellow) {
                light(4);
            }
            else {
                off(4);
            }
            if (response.data[0].green) {
                light(2);
            }
            else {
                off(2);
            }
            if (response.data[0].blue) {
                light(3);
            }
            else {
                off(3);
            }
        }).catch(error => { console.log(error.message); });
}
function checkText() {
    axios.get('https://lightledapi.herokuapp.com/text')
        .then(response => {
	    if(theText != response.data[0].value){
		theText = response.data[0].value;
		printOnLcd(theText);
		}
            //printOnLcd(fillWithSpaces(response.data[0].value));
            //return response.data[0].value;
        }).catch(error => {
            console.log(error.message);
        });
}
function printOnLcd(str) {
    //if(count%1000==0){
    //	console.log("lcd cleared");
    //	lcd.clear();}
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(str, (err) => {
        if (err) {
            throw err;
        }
    });
}
function fillWithSpaces(str){
	if(str.length>16){
		return str;	
	}
	else{
		return str;
	}
}
function light(color) {
    if (color == 1) {
        ledRed.writeSync(1);
    }
    else if (color == 2) {
        ledGreen.writeSync(1);
    }
    else if (color == 3) {
        ledBlue.writeSync(1);
    }
    else if (color == 4) {
        ledYellow.writeSync(1);
    }
}
function off(color) {
    if (color == 1) {
        ledRed.writeSync(0);
    }
    else if (color == 2) {
        ledGreen.writeSync(0);
    }
    else if (color == 3) {
        ledBlue.writeSync(0);
    }
    else if (color == 4) {
        ledYellow.writeSync(0);
    }
}

function end() {
    console.log("\nStopping Execution!")
    for (var i = 0; i < 3; i++) {
        light(1);
        light(2);
        light(3);
        light(4);
        delay(250);
        off(1);
        off(2);
        off(3);
        off(4);
        delay(250);
    }
    ledRed.unexport();
    ledGreen.unexport();
    ledBlue.unexport();
    ledYellow.unexport();
    lcd.close();
    console.log("Goodbye");
}
function delay(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e9; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

