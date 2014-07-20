function Code() {
	
	this.lines         = [];
	this.length        = 0;
	this.duration      = 0;
	
	var _self          = this;

	this.concat = function(content) {
		console.log("concat");
		
//		var object = document.createElement("object");
//		console.log("object: ",object);
//		object.type = "image/svg+xml";
//		object.data = content;
		
		//var div = document.createElement("div");
		var container = document.createElement("svg");
      /* properly close svg tags and add them to the DOM */
		container.innerHTML = content
			//.replace(/\n/, '');
			//.replace(/<(\w+)([^<]+?)\/>/g, '<$1$2></$1>')
		//container.
		var paths = container.querySelectorAll("path");
		_self.lines = [];
		console.log("  paths: ",paths);
		console.log("  paths.length: ",paths.length);
		for (var i = 0; i < paths.length; ++i) {
			var path = paths[i];
			console.log("    path: ",path);
			
			var pathData = path.getAttribute("d");
			console.log("    pathData: ",pathData);
			var pathPoints = SVGParser.parsePathData(pathData);
			console.log("    pathPoints: ",pathPoints);
			_self.lines = _self.lines.concat(pathPoints);
			console.log("    _self.lines: ",_self.lines);
			
			// using getPointAtLength
//			var pathLength = path.getTotalLength()
//			console.log("  pathLength: ",pathLength);
//			var sampleDis = 10;
//			var numSamples = Math.floor(pathLength/sampleDis);
//			var pathPoints = [];
//			for(var j=0;j<numSamples;j++) {
//				var length = pathLength/numSamples*j;
//				var point = path.getPointAtLength(length);
//				_self.lines.push(point);
//			}
		}
		_self.length = _self.lines.length;
		
//		var pathLength = path.getTotalLength()
//		console.log("  pathLength: ",pathLength);
//		
//		layer = d3.select("#lines_container svg > g");
//		var sampleDis = 10;
//		var numSamples = Math.floor(pathLength/sampleDis);
//		for(var i=0;i<numSamples;i++) {
//			var length = pathLength/numSamples*i;
//			var point = path.getPointAtLength(length);
//			//console.log("  point: ",point);
//			layer.append("circle")
//				.attr({cx:point.x,
//							 cy:point.y,
//							 r:2,
//							 fill:"none",
//							 stroke:"#000"
//							});
//		}
	};
}