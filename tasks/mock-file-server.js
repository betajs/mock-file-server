module.exports = function(grunt) {
	
	grunt.registerMultiTask("mock-file-server", "Runs a mock file server", function() {
		var Server = require(__dirname + "/../src/server_service.js");

		var server = Server.init({
			parameterChunkNumber: this.options().chunknumber,
			parameterTotalSize: this.options().totalsize,
			clean: this.options().clean,
			timer: this.options().timer,
			staticServe: this.options().staticserve
		});

		Server.run(server, this.options().port);
	});
	
};
