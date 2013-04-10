define([], function () {
	var GuiTooltip = function (args) {

		if (args.title !== undefined) {
			this.title = args.title;
		} else {
			this.title = "NO_TITLE";
		}
		if (args.content !== undefined) {
			this.content = args.content;
		} else {
			this.content = "NO_CONTENT";
		}
		if (args.img !== undefined) {
			this.icon = args.img;
		} else {
			this.icon = "empty.png";
		}
	};

	GuiTooltip.prototype.init = function (parent) {
		var container = $('<span />');
		this.containerElement = container;

		parent.append(container);
		parent.addClass("guiTooltip");

		var icon = $('<img />');
		icon.attr({
			src : "images/" + this.icon,
			class : "tooltipIcon"
		});
		container.append(icon);
		this.iconContainer = icon;
		var textContainer = $('<div />');
		textContainer.addClass("tooltipTextContainer");
		container.append(textContainer);
		var title = $('<h3 />');
		title.html(this.title);
		title.attr('class', "tooltipTitle");
		textContainer.append(title);
		this.titleContainer = title;

		var content = $("<p />");
		content.html(this.content);
		content.attr('class', 'tooltipContent');
		textContainer.append(content);
		this.contentContainer = content;


	};

	return GuiTooltip;
})