var dropZone     = new DropZone();
var code          = new Code();
var svgParser          = new SVGParser();
var currentLine   = 0;
var preview       = new Preview();

preview.init(document.getElementById('preview'));
preview.setContent(code);
dropZone.init(document.getElementById('dropzone'));
dropZone.onload = function(content) {
	//console.log("  code: ",content);
	code.concat(content);
	preview.setOriginal(content);
	preview.setContent(code);
};