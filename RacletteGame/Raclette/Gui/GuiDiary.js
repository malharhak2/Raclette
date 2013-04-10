define (["Debug", "CONFIG", "jquery"], function (debug, CONFIG, $) {
	var GuiDiary = function (params) {
		this.id = "guiDiary";

		this.caps = {
			right : "-2deg",
			left : "-178deg"
		};

		this.pagesContent = [
			["Page 1", 
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero sed libero laoreet viverra non non diam. Phasellus sit amet quam ac lorem luctus sollicitudin. Nunc vitae neque ac sem accumsan mattis quis id risus. Proin purus sem, volutpat posuere consectetur vel, bibendum non ipsum. Mauris congue mattis malesuada. Duis eu nulla tellus, id ultrices augue. Nam eget libero orci, at rutrum ipsum."],
			["Page 2", 
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero sed libero laoreet viverra non non diam. Phasellus sit amet quam ac lorem luctus sollicitudin. Nunc vitae neque ac sem accumsan mattis quis id risus. Proin purus sem, volutpat posuere consectetur vel, bibendum non ipsum. Mauris congue mattis malesuada. Duis eu nulla tellus, id ultrices augue. Nam eget libero orci, at rutrum ipsum."],
			["Page 3", 
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero sed libero laoreet viverra non non diam. Phasellus sit amet quam ac lorem luctus sollicitudin. Nunc vitae neque ac sem accumsan mattis quis id risus. Proin purus sem, volutpat posuere consectetur vel, bibendum non ipsum. Mauris congue mattis malesuada. Duis eu nulla tellus, id ultrices augue. Nam eget libero orci, at rutrum ipsum."],
			["Page 4", 
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero sed libero laoreet viverra non non diam. Phasellus sit amet quam ac lorem luctus sollicitudin. Nunc vitae neque ac sem accumsan mattis quis id risus. Proin purus sem, volutpat posuere consectetur vel, bibendum non ipsum. Mauris congue mattis malesuada. Duis eu nulla tellus, id ultrices augue. Nam eget libero orci, at rutrum ipsum."],
			["Page 5", 
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero sed libero laoreet viverra non non diam. Phasellus sit amet quam ac lorem luctus sollicitudin. Nunc vitae neque ac sem accumsan mattis quis id risus. Proin purus sem, volutpat posuere consectetur vel, bibendum non ipsum. Mauris congue mattis malesuada. Duis eu nulla tellus, id ultrices augue. Nam eget libero orci, at rutrum ipsum."],
			["Page 6", 
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non libero sed libero laoreet viverra non non diam. Phasellus sit amet quam ac lorem luctus sollicitudin. Nunc vitae neque ac sem accumsan mattis quis id risus. Proin purus sem, volutpat posuere consectetur vel, bibendum non ipsum. Mauris congue mattis malesuada. Duis eu nulla tellus, id ultrices augue. Nam eget libero orci, at rutrum ipsum."]

		];
		this.opened = false;
		this.initialised = false;
		this.pages = [];

		this.gui = params.parent;
		this.currentPage = 0;

		this.container = $('<div />').addClass('diaryContainer');
		this.spacer = $('<img />').addClass('diarySpacer').appendTo(this.container);
		this.spacer.attr('src', 'images/diaryratio.png');
		this.scene = $('<div />').addClass('diaryScene').appendTo(this.container);
		this.page = $("<div />").addClass("diaryContent").appendTo(this.scene);
		

		var that = this;
		for (var i = 0; i < this.pagesContent.length ; i++) {
			var p = this.pagesContent[i];
			var nb = i;
			this.pages[i] = {
				page : $('<div />').addClass('page').appendTo(this.page),
				id : nb
			};
			this.pages[i].page.css('webkitTransform', "rotateY(" + this.caps.right + ") translateZ(" + (this.pagesContent.length * 2 - nb * 2) + "px)");
			var klass = (i % 2 == 0) ? "rightPageContent" : "leftPageContent";
			this.pages[i].content = $('<div />').addClass(klass).appendTo(this.pages[i].page);
			this.pages[i].title = $("<h1 />").addClass("diaryTitle").appendTo(this.pages[i].content);
			this.pages[i].blabla = $("<p />").addClass("diaryDesc").appendTo(this.pages[i].content);
			this.pages[i].title.html(this.pagesContent[i][0]);
			this.pages[i].blabla.html(this.pagesContent[i][1]);
			if (klass == "rightPageContent") {
				this.pages[i].next = $("<i />").addClass("icon-angle-left").css("font-size", "40px").appendTo(this.pages[i].content);
				this.pages[i].next.on('click', function () {
					that.nextPage();			
				});
			} else {
				this.pages[i].previous = $("<i />").addClass('icon-angle-right').css('font-size', '40px').appendTo(this.pages[i].content);
				this.pages[i].previous.on('click', function () {
					that.previousPage();
				});
			}
		};
	};

	GuiDiary.prototype.init = function () {
		this.container.appendTo(this.gui);
		this.fill();
		this.close();
		this.initialised = true;
	};

	GuiDiary.prototype.update = function () {

	};

	GuiDiary.prototype.fill = function () {

	};

	GuiDiary.prototype.nextPage = function () {
		
		for (var i = this.currentPage; i < this.currentPage + 2; i++) {
			if (this.pages[i] !== undefined) {
				this.pages[i].page.css('webkitTransform',
					'rotateY(' + this.caps.left + ')' +
					' translateZ(' + (this.pagesContent.length * 2 - i * 2) + 'px)');
			}
		};
		this.currentPage += 2;
	};

	GuiDiary.prototype.previousPage = function () {
		if (this.currentPage > 0) {
			for (var i = this.currentPage - 1; i >= this.currentPage - 2; i--) {
				if (i >= 0) {
					this.pages[i].page.css('webkitTransform',
						'rotateY(' + this.caps.right + ')' + 
						' translateZ(' + (this.pagesContent.length * 2 - i * 2) + 'px)');
				}
			};
			this.currentPage -= 2;
		}
	};

	GuiDiary.prototype.toggle = function () {
		if (this.opened) {
			this.close();
		} else {
			this.open();
		}
	}

	GuiDiary.prototype.open = function () {
		this.update();
		this.container.show();
		this.opened = true;
	};

	GuiDiary.prototype.close = function () {
		this.container.hide();
		this.opened = false;
	}

	return GuiDiary;
});