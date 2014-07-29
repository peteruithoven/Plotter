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
		
		function getStructure(element){
			var structure = {type:element.tagName};
			if(element.children.length > 0) {
				structure.children = [];
				for(var i=0;i<element.children.length;i++) {
					var child = element.children[i];
					structure.children.push(getStructure(child))
				}
			}
			return structure;
		}
		
//		console.log("structure: ",JSON.stringify(getStructure(svg.node)));
		
		// turn all shapes into paths
		svg.toPath(true);
//		console.log("structure: ",JSON.stringify(getStructure(svg.node)));

//		var paths = container.querySelectorAll("path");
//		console.log("  paths: ",paths);
//		console.log("  paths.length: ",paths.length);
//		for (var i = 0; i < paths.length; ++i) {
//			var path = paths[i];
//			var pathData = path.getAttribute("d");
//			console.log("    pathData: ",pathData);
//			var pathPoints = SVGParser.parsePathData(pathData);
//			console.log("    pathPoints: ",pathPoints);
//			_self.lines = _self.lines.concat(pathPoints);
//			console.log("    _self.lines: ",_self.lines);
//		}
//		_self.length = _self.lines.length;
		
		svg.toPoly("2px",true);
//		console.log("structure: ",JSON.stringify(getStructure(svg.node)));
		
		var polys = container.querySelectorAll("polyline,polygon");
		for (var i = 0; i < polys.length; ++i) {
			var poly = polys[i].instance;
			var pointsArray = poly.array;
			
			//console.log("  move: ",poly.trans.x,poly.trans.y)
			//pointsArray.move(bbox.x+poly.trans.x,bbox.y+poly.trans.y);
			var points = pointsArray.value;
			for (var j = 0; j < points.length; j++) {
				var point = points[j];
				var isMove = (j==0);
				//console.log("        isMove: ",isMove);
				var parsedPoint = new Point(isMove);
				parsedPoint.x = point[0]+poly.trans.x;
				parsedPoint.y = point[1]+poly.trans.y;
//				console.log("        parsedPoint: ",parsedPoint);
				_self.lines.push(parsedPoint);
			}
			if(poly.type === "polygon") {
				var parsedPoint = new Point(false);
				parsedPoint.x = points[0][0]+poly.trans.x;
				parsedPoint.y = points[0][1]+poly.trans.y;
				_self.lines.push(parsedPoint);
			}
		}
		
		_self.length = _self.lines.length;
	};
}