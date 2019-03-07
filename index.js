var opn = require('opn'),
	Tesseract = require('tesseract.js'),
	childProc = require('child_process'),
	robot = require("robotjs"),
	sharp = require('sharp');
	fs = require('fs'),
	screenshot = require('desktop-screenshot');
	
var filename = 'cropped.png',
	screen = robot.getScreenSize(),
	hex,
	hexLeft,
	hexRight,
	lookingForAnswer = false;


var myQuestionChecker = setInterval(function(){
	hex = robot.getPixelColor((screen.width/2), (screen.height/2-360));
	hexLeft = robot.getPixelColor((screen.width/2), (screen.height/2-360));
	hexRight = robot.getPixelColor(((screen.width/2)-100), (screen.height/2-360));
	console.log(hex);
	console.log(hexLeft);
	console.log(hexRight);
    if(hex === "fefefe" || hex === "ffffff" || hex === "fbfbfb" || hex === "fafafa" || hex === "fefefe" || hex === "fffeff" || hex === "fffdff"){
		if(hexLeft === "fefefe" || hexLeft === "ffffff" || hexLeft === "fbfbfb" || hexLeft === "fafafa" || hexLeft === "fefefe" || hexLeft === "fffeff" || hexLeft === "fffdff"){
			if(hexRight === "fefefe" || hexRight === "ffffff" || hexRight === "fbfbfb" || hexRight === "fafafa" || hexRight === "fefefe" || hexRight === "fffeff" || hexRight === "fffdff"){
				if(lookingForAnswer == false){
					lookingForAnswer = true;
					console.log("[Info] Found a question!");
						setTimeout(function() {
							screenshot("fullscreen.png", function(error, complete) {
								if(error) {
									console.log("Screenshot failed", error);
								} else {
									console.log("Screenshot succeeded");
									fs.readFile('fullscreen.png', function(err, data) {
									  console.log("width: 20, height: 20, left: "+((screen.width/2))+", top: "+((screen.height/2)))
									  if (err) throw err; // Fail if the file can't be read.
									  sharp(data)
										.extract({ width: 580, height: 200, left: ((screen.width/2)-290), top: ((screen.height/2)-360) })
										.toFile('cropped.png')
										.then(info => {
											Tesseract.recognize(filename)
											  .progress(function  (p) { console.log('progress', p)  })
											  .catch(err => console.error(err))
											  .then(function (result) {
												console.log(result.text.replace(/\n/g, " "));
												if(result.text.replace(/\n/g, " ").search("the following") === ""){
													console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
													console.log("!!! I CANT ANSWER THAT ONE !!!");
													console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
												} else {
												childProc.execSync('"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" "https://google.com/search?q='+String(result.text.replace(/\n/g, " ").replace('"', '\\"')) + '"');
												//process.exit(0)
												}
											  })
										});
									});
								};
							});
						}, 700);
				}
			} 
		}
	} else {
		lookingForAnswer = false;
	}
}, 100);