function Code() {
	
	this.lines         = [];
	this.length        = 0;
	this.duration      = 0;
	
	var _self          = this;

	this.concat = function(content) {
		console.log("concat");

		// import svg into a hidden svg element
		var container = document.createElement("div");
		document.body.appendChild(container);
		var svg = SVG(container)
		svg.style('opacity:0;position:fixed;left:100%;top:100%;overflow:hidden')
		var store = svg.svg(content);

		// turn all shapes into paths
		svg.toPath(true);
		
		var paths = container.querySelectorAll("path");
		
//		console.log("  paths: ",paths);
//		console.log("  paths.length: ",paths.length);
		for (var i = 0; i < paths.length; ++i) {
			var path = paths[i];
			console.log("    path: ",path);
			
			var pathData = path.getAttribute("d");
			console.log("    pathData: ",pathData);
			var pathPoints = SVGParser.parsePathData(pathData);
//			console.log("    pathPoints: ",pathPoints);
			_self.lines = _self.lines.concat(pathPoints);
			//console.log("    _self.lines: ",_self.lines);
			
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
	};
}