module.exports = function (fileSystem, options) {
	
	var result = function (status, data) {
		return {
			status: status,
			data: data || {}
		};
	};
	
	return {

		getFileSize: function (filename) {
			if (fileSystem.exists(filename)) {
				var size = fileSystem.size(filename);
				console.log("Request size of", filename, "is", size);
				return result(200, {size: size});
			} else {
				console.log("Request size of", filename, "not found");
				return result(404);
			}
		},
		
		readFile: function (filename) {
			if (fileSystem.exists(filename)) {
				console.log("Streaming", filename);
				return result(200, fileSystem.read(filename));
			} else {
				console.log("Streaming", filename, "not found");
				return result(404);
			}
		},
		
		writeFile: function (filename, buffer) {
			console.log("Storing", filename);
			fileSystem.write(filename, buffer);
			return result(200);
		},
		
		writeFileChunk: function (filename, buffer, chunkNumber) {
			console.log("Storing", filename, "chunk", chunkNumber);
			fileSystem.write(filename + "." + chunkNumber + ".chunk", buffer);
			return result(200);
		},
		
		assembleFileChunks: function (filename, requestTotalSize) {
			console.log("Assembling", filename, "total size", requestTotalSize);
			var chunkNumber = 1;
			var totalSize = 0;
			while (true) {
				var chunkName = filename + "." + chunkNumber + ".chunk";
				if (fileSystem.exists(chunkName)) {
					var size = fileSystem.size(chunkName);
					console.log("Testing", chunkName, "with size", size);
					chunkNumber++;
					totalSize += size;
				} else {
					console.log("Testing", chunkName, "not found");
					break;
				}
			}
			if (requestTotalSize != totalSize) {
				console.log("Request total size", requestTotalSize, "not equal to calculated total size", totalSize);
				return result(412);
			}
			console.log("Request total size", requestTotalSize, "equal to calculated total size", totalSize);
			var buffer = null;
			chunkNumber = 1;
			while (true) {
				var chunkNameX = filename + "." + chunkNumber + ".chunk";
				if (!fileSystem.exists(chunkNameX))
					break;
				buffer = buffer ? Buffer.concat([buffer, fileSystem.read(chunkNameX)]) : fileSystem.read(chunkNameX);
				fileSystem.remove(chunkNameX);
				chunkNumber++;
			}
			fileSystem.write(filename, buffer);
			return result(200);
		}

	};
};
