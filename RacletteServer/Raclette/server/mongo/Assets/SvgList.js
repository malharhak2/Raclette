define(['mongoose'], function (mongoose) {
	
	var SvgList = new mongoose.Schema ({

		svgParcelles : [SvgParcelle]
	});

	var SvgListModel = mongoose.model('svgList', SvgList);
	return SvgListModel;
});