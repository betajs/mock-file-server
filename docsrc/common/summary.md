The server creates the following endpoints:

- GET /files/:filename/size`: returns the size of an uploaded file as json `{"size": size}`
- GET `/files/:filename`: returns an uploaded file as binary stream
- POST `/files/:filename`: stores an uploaded single file with field name `file`
- POST `/chunk/:filename`: stores a single chunk with field name `file` with the chunk number being present in the request body
- POST `/assemble/:filename`: assembles a chunked file, checking the total size with the total size being present in the request body
