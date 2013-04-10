define(["CONFIG"], function (CONFIG) {

	var GuiPickupItem = function (args) {

		var img = document.createElement('div');
		img.style.backgroundImage = "url('" + args.img + "')";
		img.className = "pickupItem";
		img.style.left = args.pos.x + "px";
		img.style.top = args.pos.y + "px";
		img.style.width = args.size.x + "px";
		img.style.height = args.size.y + "px";
		this.img = img;
		document.getElementById(CONFIG.guiContainer).appendChild(img);
	};

	return GuiPickupItem;
});