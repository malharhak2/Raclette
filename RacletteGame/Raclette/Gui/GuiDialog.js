define(["Debug", 'jquery', 'Gui/GuiQuestion', "Resources/SoundManager", "GlobalVariables"], function(debug, $, Question, SoundManager, globalVariables) {

	var GuiDialog = function(params) {

		this.id = params.id;
		this.content = params.content || 'Sample of [Dialog]';

		

		this.classe = params.classe || '';
		this.icon = params.icon || 'default.png';
		this.gui = params.parent;
		this.container = false;

		this.pointer = 0;
		this.directionPointer = 0;
		this.branchPointer = 0;

		this.linePointer = 1;

		this.lettersPerTick = 2;
		this.timePerTick = 10;
		this.lastTick = Date.now();

		this.maxLines = 3;
		this.currentLineText = "";
		this.currentPartText = "";
		this.currentWordText = "";

		this.textLines = [];

		this.closed = false;



		this.wordsToWrite = [];
		
		this.currentWord = 0;
		this.wordPointer = 0;

		this.writing = false;


		this.callOnClose = params.callOnClose || false;


		this.sound = params.sound;

		this.question = false;
	};

	GuiDialog.prototype.init = function(callback) {

		this.callOnClose = callback;
		
		this.writeStep(this.nextStep);

		if (this.sound) {SoundManager.play(this.sound)}

		this.writing = true;
	};

	GuiDialog.prototype.writeStep = function () {
		this.chosing = false;
		if (this.pointer > this.content.length - 1) {
			this.close();
			return;
		}
		if (this.type =="embranchement" && this.branchPointer >= this.content[this.pointer].length) {
			this.goToNextStep();
			return;
		}
		if (typeof this.content[this.pointer] == "string") {
			this.type = "phrase";
		} else if (typeof this.content[this.pointer] == "object") {
			this.type = "embranchement";
		}
		if (this.content[this.pointer + 1] !== undefined && typeof this.content[this.pointer + 1] == "object" && this.type == "phrase") {
			this.chosing = true;
		}

		this.lineToWrite = this.getStep();
		this.wordsToWrite = this.lineToWrite.split(" ");
		if (this.chosing) {
			this.questionToWrite = this.getQuestion();
		}
		this.startBox();
	};

	GuiDialog.prototype.startBox = function () {
		if(!this.container) {
			this.container = $('<div />').addClass('dialog').appendTo(this.gui);
			this.imageDiv = $('<img />').addClass('dialogIcon').appendTo(this.container);
			this.imageDiv.attr('src', "images/" + this.icon);
			this.textContent = $('<p />').addClass('dialogText').appendTo(this.container);
			this.clickIcon = $('<i />').addClass('icon-sort-down').addClass('clickIcon').appendTo(this.container).hide();
		} else {
			this.textContent.html("");
		}
		this.container.bind('click', function(event) {
			event.stopPropagation();
		});
	};

	GuiDialog.prototype.update = function () {
		
		if (this.writing && Date.now() - this.lastTick > this.timePerTick) {
			this.wordPointer += this.lettersPerTick;
			this.currentWordText = this.wordsToWrite[this.currentWord].substr(0, this.wordPointer);
			if (!this.testLength(this.currentLineText + " " + this.currentWordText)) {
				this.nextLine();
			}
			if (this.wordPointer > this.wordsToWrite[this.currentWord].length - 1) {
				this.nextWord();
			}
			this.lastTick = Date.now();
			this.fillText();
		}
	};

	GuiDialog.prototype.fillText = function () {
		var txt = "";
		for (var i = 0; i < 3; i++) {
			if (this.textLines[i] !== undefined) {
				txt += this.textLines[i];
			} else if (i == this.linePointer - 1) {
				txt += this.currentLineText;
				txt += " " + this.currentWordText;
				if (i != 2) {
					txt += "<br />";
				}
			} else {
				if (i != 2) {
					txt += "<br />";
				}
			}
		};

		this.textContent.html(txt);
	};

	GuiDialog.prototype.nextWord = function () {
		if (this.currentLineText != "") {
			this.currentLineText += " ";
		}
		this.currentLineText += this.wordsToWrite[this.currentWord];
		this.currentWord++;
		this.currentWordText = "";
		if (this.currentWord >= this.wordsToWrite.length) {
			if (this.type == "embranchement") {
				this.nextBranch();
			} else {
				this.nextStep();
			}
		}
		this.wordPointer = 0;
	}

	GuiDialog.prototype.nextLine = function () {
		this.textLines.push(this.currentLineText + "<br />");
		this.linePointer++;
		this.currentLineText = "";
		if (this.linePointer > this.maxLines) {
			this.nextPart();
		}
	};

	GuiDialog.prototype.nextPart = function () {
		//console.log("[GUI] (pointer : " + this.pointer + ") NextPart : ", this.wordPointer, this.wordCounter, this.linePointer);

		this.writing = false;
		this.clickIcon.show();

		var that = this;
		this.container.bind('click', function () {
			that.goToNextPart();
			event.stopPropagation();
		});
	};

	GuiDialog.prototype.goToNextPart = function () {

		this.currentPartText = "";
		this.currentLineText = "";
		this.currentWordText = "";
		this.textLines = [];
		this.linePointer = 1;
		this.writing = true;
		this.container.unbind('click');	
		this.clickIcon.hide();
	}

	GuiDialog.prototype.nextStep = function () {
		debug.log("Dialog", "nextStep");
		this.writing = false;
		if (!this.chosing) {
			this.clickIcon.show();

			var that = this;
			this.container.bind('click', function () {
				that.goToNextStep();
				event.stopPropagation();
			})
		} else {
			this.popChoice();
		}
	};

	GuiDialog.prototype.goToNextStep = function () {
		this.branchPointer = 0;
		this.currentPartText = "";
		this.currentLineText = "";
		this.currentWordText = "";
		this.textLines = [];
		this.linePointer = 1;
		this.wordCounter = 0;
		this.currentWord = 0;
		this.container.unbind('click');
		this.writing = true;
		this.clickIcon.hide();
		this.pointer++;
		this.writeStep();
	};

	GuiDialog.prototype.nextBranch = function () {
		this.writing = false;
		this.clickIcon.show();
		var that = this;
		this.container.bind('click', function () {
			that.goToNextBranch();
			event.stopPropagation();
		})
	}

	GuiDialog.prototype.goToNextBranch = function () {
		this.currentPartText = "";
		this.currentLineText = "";
		this.currentWordText = "";
		this.textLines = [];
		this.linePointer = 1;
		this.wordCounter = 0;
		this.currentWord = 0;
		this.container.unbind('click');
		this.writing = true;
		this.clickIcon.hide();
		this.branchPointer++;
		this.writeStep();
	}


	GuiDialog.prototype.onLineEnd = function () {

	};

	GuiDialog.prototype.onPartEnd = function () {

	};

	GuiDialog.prototype.testLength = function (txt) {
     	var div = $('<div />').css({
     		'position': 'absolute',
     		'white-space': 'nowrap',
     		'visibility': 'hidden'
     	}).html(txt).appendTo('body');
     	var w = div.width();
     	var result = true;
     	if(w > this.textContent.width()) {
     		result = false;
     	}
     	div.remove();
     	return result;		
	};

	GuiDialog.prototype.getStep = function () {
		console.log("[GUI] getStep :", this.type)
		switch (this.type) {
			case "phrase" : 
				return this.analyseText(this.content[this.pointer]);
			break;
			case "embranchement" : 
				return this.analyseText(this.content[this.pointer][this.branchPointer][this.directionPointer]);
			break;
			default :
				return "Undefined";
			break;
		}
	};

	GuiDialog.prototype.getQuestion = function () {

		var that = this;
		var question = {
			parent : this.container,
			choices : {
				"oui" : {
					text : this.content[this.pointer + 1][0],
					callback : function () {
						that.questionEnd(0);
					}
				},
				"non" : {
					text : this.content[this.pointer + 1][1],
					callback : function () {
						that.questionEnd(1);
					}
				}
			}
		};
		this.question = new Question(question);

		return this.question;
	};

	GuiDialog.prototype.questionEnd = function (nb) {
		this.directionPointer = nb;
		this.question.DOMElement.remove();
		this.question = false;
		this.chosing = false;
		this.pointer++;
		this.goToNextStep();
	};

	GuiDialog.prototype.close = function () {
		var that = this;
		//console.log("[GUI] (pointer : " + this.pointer + ") CLOSE");
		this.writing = false;
		if (this.container) {
			this.container.unbind('click');
			this.container.remove();
			that.container = false;
			if(typeof that.callOnClose == 'function') {
				that.callOnClose({
					align : that.currentAlign
				});
			}	
		}
	};

	GuiDialog.prototype.popChoice = function () {
		this.question.insertIntoDOM(this.container);
		this.question.show();
		this.chosing = false;
	};

     GuiDialog.prototype.analyseText = function (text) {
     	//console.log("[GUI] (pointer : " + this.pointer + ") analyseText", text)
     	var hashes = text.split("#");
     	for (var i = 1; i < hashes.length; i+= 2) {
     		hashes[i] = this.readVariable(hashes[i]);
     	};
     	return hashes.join("");
     };

     GuiDialog.prototype.readVariable = function (variable) {
     	return globalVariables.readVariable(variable);
     };

     return GuiDialog;
 });