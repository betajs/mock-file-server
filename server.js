opt = require('node-getopt').create([
    ["", "port=PORT", "server port (default 5000)"],
    ["", "chunknumber=CHUNKNUMBER", "chunk number parameter (default 'chunknumber')"],
    ["", "totalsize=TOTALSIZE", "total size parameter (default 'totalsize')"],
    ["", "staticserve=DIRECTORY", "statically serve directory (default disabled)"],
    ["", "clean=CLEAN", "time to clean virtual file system, in ms (default 5 minutes)"],
    ["", "timer=TIMER", "timer for cleaning file system, in ms (default 30 seconds)"]
]).bindHelp().parseSystem().options;

var Server = require(__dirname + "/src/server_service.js");

var server = Server.init({
	parameterChunkNumber: opt.chunknumber,
	parameterTotalSize: opt.totalsize,
	clean: opt.clean ? parseInt(opt.clean, 10) : null,
	timer: opt.timer ? parseInt(opt.timer, 10) : null,
	staticServe: opt.staticserve
});

Server.run(server, opt.port ? parseInt(opt.port, 10) : null);