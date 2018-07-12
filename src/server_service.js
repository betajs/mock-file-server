var Express = require("express");
var Multer = require("multer");
var BodyParser = require("body-parser");

module.exports = {
		
	init: function (Config) {
		var upload = Multer({ storage: Multer.memoryStorage() });

		var express = Express();
		express.use(BodyParser());
		if (Config.staticServe)
			express.use("/static", Express["static"](Config.staticServe));

		var fileSystem = require(__dirname + "/file_system.js")({
			timer: Config.timer || 1000 * 30,
			clean: Config.clean || 1000 * 60 * 5 
		});

		var fileService = require(__dirname + "/file_service.js")(fileSystem);
		
		var saveFile = function(request, response, filename) {
			var result = fileService.writeFile(request.file.originalname, request.file.buffer);
			if (request.query._postmessage) {
				if (request.query._postmessageid)
					result.data._postmessageid = request.query._postmessageid;
				response
					.status(result.status)
					.header("Content-Type", "text/html")
					.send("<!DOCTYPE html><script>parent.postMessage(JSON.stringify(" + JSON.stringify(result.data) + "), '*');</script>");
			} else {
				response.status(result.status).send(result.data);
			}
		};

		express.options("/*", function(req, res, next){
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Cache-Control');
			res.send(200);
		});
		
		express.use(function(request, response, next) {
			response.header("Access-Control-Allow-Origin", "*");
			response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});

		express.get('/files/:filename/size', function (request, response) {
			var result = fileService.getFileSize(request.params.filename);
			response.status(result.status).send(result.data);
		});

		express.get('/files/:filename', function (request, response) {
			var result = fileService.readFile(request.params.filename);
			response.status(result.status).send(result.data);
		});

		express.post("/files", upload.single('file'), function (request, response) {
			saveFile(request, response, request.file.originalname);
		});

		express.post("/files/:filename", upload.single('file'), function (request, response) {
			saveFile(request, response, request.params.filename);
		});

		express.post("/chunk/:filename", upload.single('file'), function (request, response) {
			var result = fileService.writeFileChunk(request.params.filename, request.file.buffer, request.body[Config.parameterChunkNumber || "chunknumber"]);
			response.status(result.status).send(result.data);
		});

		express.post("/assemble/:filename", function (request, response) {
			var result = fileService.assembleFileChunks(request.params.filename, request.body[Config.parameterTotalSize || "totalsize"]);
			response.status(result.status).send(result.data);
		});
		
		return express;
	},
	
	run: function (server, port) {
		port = port || 5000;
		server.listen(port, function () {
			console.log("Listening on", port);
		});
	}
	
};
