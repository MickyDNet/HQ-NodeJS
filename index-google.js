var opn = require('opn'),
	Tesseract = require('tesseract.js'),
	childProc = require('child_process'),
	robot = require("robotjs"),
	sharp = require('sharp');
	fs = require('fs'),
	screenshot = require('desktop-screenshot'),
	google = require('google'),
	scraper = require('google-search-scraper'),
	request = require('request');;
	
var filename = 'cropped.png',
	filenamea = 'croppeda.png',
	filenameb = 'croppedb.png',
	filenamec = 'croppedc.png',
	screen = robot.getScreenSize(),
	hex,
	hexLeft,
	HexRight,
	lookingForAnswer = false,
	myLoop = 1;

	google.resultsPerPage = 100;
	

var myQuestionChecker = setInterval(function(){
	hex = robot.getPixelColor((screen.width/2), (screen.height/2-360));
	hexLeft = robot.getPixelColor((screen.width/2), (screen.height/2-360));
	hexRight = robot.getPixelColor(((screen.width/2)-100), (screen.height/2-360));
	//console.log("Mid:   "+hex);
	//console.log("Left:  "+hexLeft);
	//console.log("Right: "+hexRight);
	var nextCounter = 0;
	var a1 = 0;
	var a2 = 0;
	var a3 = 0;
	//console.log(hex);
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
											//childProc.execSync('"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" "https://google.com/search?q='+String(result.text.replace(/\n/g, " ").replace('"', '\\"')) + '"');
											console.log(); console.log();console.log(); console.log();console.log(); console.log();
											console.log(result.text.replace(/\n/g, " "));
											
											//ANSWER A
											google(result.text.replace(/\n/g, " "), function (err, res){
											  if (err) console.error(err)
												
												if (myLoop == 1){
												  myLoop = myLoop + 1;
												  
													  sharp(data)
														.extract({ width: 450, height: 100, left: ((screen.width/2)-235), top: ((screen.height/2)-148) })
														.toFile('croppeda.png')
														.then(info => {
															Tesseract.recognize(filenamea)
															  .progress(function  (p) { /*console.log('progress', p)*/ })
															  .catch(err => console.error(err))
															  .then(function (resultA) {
																  console.log(); console.log();console.log(); console.log();console.log(); console.log();
																  console.log("[Result] A: "+resultA.text.replace(/\n/g, " "));
																  for (var i = 0; i < res.links.length; ++i) {
																	var link = res.links[i];
																	//if(link.title.search(resultA.text) !== ""){ a1 = a1 + 1; }
																	//if(link.description.search(resultA.text) !== ""){ a1 = a1 + 1; }
																	
																	a1 = a1 + (link.title.match(new RegExp(resultA.text.trim(), "g")) || []).length;
																	a1 = a1 + (link.description.match(new RegExp(resultA.text.trim(), "g")) || []).length;
																  }
																  console.log("[End] A: "+a1);
															  });
														});
														
													  sharp(data)
														.extract({ width: 450, height: 100, left: ((screen.width/2)-235), top: ((screen.height/2)-38) })
														.toFile('croppedb.png')
														.then(info => {
															Tesseract.recognize(filenameb)
															  .progress(function  (p) { /*console.log('progress', p)*/  })
															  .catch(err => console.error(err))
															  .then(function (resultB) {
																  console.log(); console.log();console.log(); console.log();console.log(); console.log();
																  console.log("[Result] B: "+resultB.text);
																  for (var i = 0; i < res.links.length; ++i) {
																	var link = res.links[i];
																	//if(link.title.search(resultB.text) !== ""){ a2 = a2 + 1; }
																	//if(link.description.search(resultB.text) !== ""){ a2 = a2 + 1; }
																	
																	a2 = a2 + (link.title.match(new RegExp(resultB.text.trim(), "g")) || []).length;
																	a2 = a2 + (link.description.match(new RegExp(resultB.text.trim(), "g")) || []).length;
																  }
																  console.log("[End] B: "+a2);
															  });
														});
														
													  sharp(data)
														.extract({ width: 450, height: 100, left: ((screen.width/2)-235), top: ((screen.height/2)+63) })
														.toFile('croppedc.png')
														.then(info => {
															Tesseract.recognize(filenamec)
															  .progress(function  (p) { /*console.log('progress', p)*/ })
															  .catch(err => console.error(err))
															  .then(function (resultC) {
																  console.log(); console.log();console.log(); console.log();console.log(); console.log();
																  console.log("[Result] C: "+resultC.text);
																  for (var i = 0; i < res.links.length; ++i) {
																	var link = res.links[i];
																	//if(link.title.search(resultC.text) !== ""){ a3 = a3 + 1; }
																	//if(link.description.search(resultC.text) !== ""){ a3 = a3 + 1; }
																	
																	a3 = a3 + (link.title.match(new RegExp(resultC.text.trim(), "g")) || []).length;
																	a3 = a3 + (link.description.match(new RegExp(resultC.text.trim(), "g")) || []).length;
																	/*console.log(); console.log(); //DEBUG//
																	console.log("LinkTitle: "+link.title);
																	console.log("RegExpT:   "+link.title.match(new RegExp(resultC.text.trim(), "g")));
																	console.log("RegExpTF:  "+(link.title.match(new RegExp(resultC.text.trim(), "g")) || []).length);
																	console.log("RegExp:    "+link.description.match(new RegExp(resultC.text.trim(), "g")));
																	console.log("RegExpF:   "+(link.description.match(new RegExp(resultC.text.trim(), "g")) || []).length);
																	console.log("LinkDesc:  "+link.description);*/
																  }
																  console.log("[End] C: "+a3);
															  });
														});
														
												  if (nextCounter < 4) {
													nextCounter += 1
													if (res.next) res.next()
												  }
											  
												  if (nextCounter == 4) {
													console.log("[END] A: "+a1);
													console.log("[END] B: "+a2);
													console.log("[END] C: "+a3);
												  }
												}
											});
										  });
										});
								});
							};
						});
					}, 1200);
				}
			} else {
			//console.log("Right: Not the question!");
			lookingForAnswer = false;
			}
		} else {
			//console.log("Left: Not the question!");
			lookingForAnswer = false;
		}
	} else {
		//console.log("Mid: Not the question! - "+hex);
		lookingForAnswer = false;
	}
}, 100);