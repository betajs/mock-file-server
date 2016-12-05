module.exports = function(options) {
	
	var fileSystem = {

		files : {},

		cleanup : function() {
			console.log("Starting cleanup...");
			var current = (new Date()).getTime();
			for ( var filename in this.files) {
				var value = this.files[filename];
				if (value.age + options.clean <= current) {
					console.log("Removing", filename);
					this.remove(filename);
				}
			}
			console.log("Cleanup done.");
		},

		exists : function(filename) {
			return !!this.files[filename];
		},

		size : function(filename) {
			return this.files[filename].size;
		},

		read : function(filename) {
			return this.files[filename].buffer;
		},

		remove : function(filename) {
			delete this.files[filename];
			return this;
		},

		write : function(filename, buffer) {
			this.files[filename] = {
				size : buffer.length,
				buffer : buffer,
				age : (new Date()).getTime()
			};
			return this;
		}

	};

	setInterval(function() {
		fileSystem.cleanup();
	}, options.timer);

	return fileSystem;
};