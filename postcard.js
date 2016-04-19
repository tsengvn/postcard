const gm = require('gm').subClass({imageMagick: true})

module.exports = {
  makeImage: function (imgIn, imgOut, text, callback) {
	// gm(imgIn)
	// .autoOrient()
	// .resize(540, 270, "!")
	// .fill("#00000066")
	// .drawRectangle(0, 0, 540, 40)
	// .drawRectangle(0, 230, 540, 270)
	// .font("Avenir")
	// .fontSize(20)
	// .fill("#FFF")
	// .drawText(0, -110, text, "Center")
	// .write(imgOut, callback);
 //  },
 	gm(imgIn)
 	.resize(540, 270, '!')
 	.fill("#00000066")
 	.drawRectangle(0, 0, 540, 40)
 	.drawRectangle(0, 230, 540, 270)
 	.write('temp.png', function(error) {
 		if (error) console.log(error);
		console.log('done resize')
 		gm()
 		.out('-background','transparent')
 		.out('-gravity', 'center')
 		.out('-fill', 'white')
 		.out('-size', '540x40', 'caption:' + text, 'temp.png')
 		.out('+swap')
 		.out('-gravity', 'north')
 		.out('-composite')
 		.out('-gravity', 'SouthWest')
 		.out('-draw', 'image Over 0,0 40,40 givn.png')
 		.out('-gravity', 'SouthEast')
 		.out('-draw', 'image Over 0,0 40,40 givn.png')
 		.write(imgOut, callback);
 	})
 }
}