# mock-file-server 0.1.16
[![Code Climate](https://codeclimate.com/github/betajs/mock-file-server/badges/gpa.svg)](https://codeclimate.com/github/betajs/mock-file-server)
[![NPM](https://img.shields.io/npm/v/mock-file-server.svg?style=flat)](https://www.npmjs.com/package/mock-file-server)


BetaJS Mock File Server for Testing



## Getting Started


This a mock file server for testing uploading and retrieving files.

Files are stored in the memory of the server for a short time and are then removed.

```shell
npm install mock-file-server
```

You can then run the server as follows:

```shell
node node_modules/mock-file-server/server.js
```

You can also run it as a `grunt task`.



## Basic Usage


The server creates the following endpoints:

- GET /files/:filename/size`: returns the size of an uploaded file as json `{"size": size}`
- GET `/files/:filename`: returns an uploaded file as binary stream
- POST `/files/:filename`: stores an uploaded single file with field name `file`
- POST `/chunk/:filename`: stores a single chunk with field name `file` with the chunk number being present in the request body
- POST `/assemble/:filename`: assembles a chunked file, checking the total size with the total size being present in the request body



## Links
| Resource   | URL |
| :--------- | --: |
| Homepage   | [https://github.com/betajs/mock-file-server](https://github.com/betajs/mock-file-server) |
| Git        | [git://github.com/betajs/mock-file-server.git](git://github.com/betajs/mock-file-server.git) |
| Repository | [https://github.com/betajs/mock-file-server](https://github.com/betajs/mock-file-server) |
| Blog       | [http://blog.betajs.com](http://blog.betajs.com) | 
| Twitter    | [http://twitter.com/thebetajs](http://twitter.com/thebetajs) | 
 



## Compatability
| Target | Versions |
| :----- | -------: |
| NodeJS | 0.10 - Latest |






## Main Contributors

- Oliver Friedmann

## License

Apache-2.0







