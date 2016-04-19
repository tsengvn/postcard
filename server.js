const http = require('http')
const formidable = require('formidable')
const hostname = 'localhost'
const port = process.env.PORT || 3000 
const postcard = require('./postcard')
const fs = require('fs')

const server = http.createServer((req, res) => {
	var headers = req.headers
	var method = req.method
	var url = req.url
	var body = []

	if (method == 'POST') {
		var form = new formidable.IncomingForm()
		form.parse(req, function(error, fields, files) {
			if (error) {
				console.log(error)
				return
			}
			var outFile = 'img/'+process.hrtime()+'.png'
			var inFile
			var text
			if (fields.text) {
				text = fields.text
			} else {
				text = "this is a sample text"
			}

			if (files.image) {
				inFile = files.image.path
			} else {
				inFile = 'base.png'
			}

			postcard.makeImage(
				inFile, 
				outFile, 
				text, 
				function(error) {
					if (error) {
						console.log('error : ' + error);
						res.writeHead(500);
						res.end(error)
					} else {
						var stat = fs.statSync(outFile)
						res.writeHead(200, {
							'content-type': 'image/png',
							'content-length': stat.size,
							'cache-control':'must-revalidate, no-cache, no-store'
						})
						fs.createReadStream(outFile).pipe(res)
						console.log('out : ' + outFile);
					}
					
				})
		})
	} else {
		res.writeHead(200);
		res.end('hehe')
	}

})


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
