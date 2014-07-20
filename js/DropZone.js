function DropZone() {

	this.onload;
	var _dropped = false;
	var _element;
	var _self    = this;

	this.init = function(element) {
		_element = element;
		_element.addEventListener('drop', onFileDrop, false);
		document.addEventListener('dragover', onFileDragDocumentOver, false);
		document.addEventListener('dragleave', onFileDragDocumentLeave, false);
		document.addEventListener('drop', onFileDragDocumentDrop, false);
	};
	function onFileDrop(event) {
		var files = event.dataTransfer.files; // FileList object.
		for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = (function(loadedFile) {
				return function(event) {
					if(_self.onload) _self.onload(event.target.result);
				};
			})(f);
			reader.readAsText(f);
		}
		_dropped = true;
	}
	function onFileDragDocumentDrop(event) {
		event.stopPropagation();
		event.preventDefault();
		
		if(_dropped) {
			_element.className = _element.className.replace(" show","");
		}
	}
	function onFileDragDocumentOver(event) {
		if(_element.className.indexOf("show") === -1){
			_element.className += " show";
		}
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}
	function onFileDragDocumentLeave(event) {
		if(_dropped) {
			_element.className = _element.className.replace(" show","");
		}
	}
}
