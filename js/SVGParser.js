function SVGParser() {}
(function() {
	var paramSetLengths = {
		z:0,
		h:1,v:1,
		m:2,l:2,t:2,
		s:4,q:4,
		c:6,
		a:7
	}
	
	var isAbsoluteRegExp = /[A-Z]/;
	var cmdRegExp = /([a-z])\s*([^a-z]*\d)*/ig;
	
	// make path consistent
	//   m0,0,38-43,71-18 > m0,0,38,-43,71,-18
	//   M 100,100 L 200,200 > M 100 100 L 200 200
	//   M100 100L200 200 > M 100 100 L 200 200
	//   M 100 200 L 200 100 L -100 -200 > M 100 200 L 200 100 -100 -200
	SVGParser.fixPathData = function(pathData) {
		pathData = pathData.replace(/([a-z])/ig," $1 "); // surround cmd's with spaces
		pathData = pathData.replace(/-/g," -"); // prepend -'s with space
		pathData = pathData.replace(/,/g," "); // replace comma's for spaces
		pathData = pathData.replace(/\s{2,}/g," "); // prevent multiple whitespace
		pathData = pathData.replace(/^\s/i,""); // remove spaces at the start
		pathData = pathData.replace(/\s$/i,""); // remove spaces at the end
		return pathData;
	}
	SVGParser.parsePathData = function(pathData) {
		
		var pathData = SVGParser.fixPathData(pathData);
//		console.log("  pathData: ",pathData);
		var points = [];
		var prevX = 0;
		var prevY = 0;
		//var pointsRegExp = /\s*([^\d.\-]*)\s*([\d.\-]+),([\d.\-]+)/ig;
		//var pointsRegExp = /(\w)\s*(([\d.\-]*)\s)*/ig;
		
		// using replace to go over all matches and per match check subgroups
		pathData.replace(cmdRegExp,function(match, type, rawParams) {
//			console.log("  match: "+match);
//			console.log("    type: "+type);
//			console.log("    rawParams: "+rawParams);
			
			var isMove = (type == "m" || type == "M");
			var isAbsolute = isAbsoluteRegExp.test(type);
			
			if(rawParams.length === 0) {
				if(type.toLowerCase() === "z") {
					var point = new Point(isMove);
					prevX = point.x = points[0].x;
					prevY = point.y = points[0].y;
					points.push(point);
				}
			} else {
				var paramSetLength = paramSetLengths[type.toLowerCase()];
//				console.log("    paramSetLength: ",paramSetLength);
				var params = rawParams.split(" ");
//				console.log("    params: ",params);
				for(var i in params) {
					params[i]	= parseFloat(params[i]);
				}
				var numParams = params.length;
				for(var i=0;i<numParams;i+=paramSetLength) {
					// after one move command switch to line automatically
					if(isMove && i>=paramSetLength-1) {
						isMove = false;
						type = (type === "M") ? "L" : "l";
					}
					var point = new Point(isMove);
					var x;
					var y;
					switch(type.toLowerCase()) {
						case "m":
						case "l":
						case "t":
							x = params[i];
							y = params[i+1];
							break;
						case "h":
							x = params[i];
							break;
						case "v":
							y = params[i];
							break;
						case "c":
							x = params[i+4];
							y = params[i+5];
							break;
						case "s":
						case "q":	
							x = params[i+2];
							y = params[i+3];
							break;
					}
					if(isAbsolute) {
						prevX = (x === undefined)? prevX : x;
						prevY = (y === undefined)? prevY : y;
					} else {
						if(x !== undefined) prevX += x;
						if(y !== undefined) prevY += y;
					}
					point.x = prevX;
					point.y = prevY;
//					console.log("      point: ",point);
					points.push(point);
				}
			}
		});
//		console.log("      points: ",points);
		return points;
	}
})();
function Point(isMove,x,y) {
	this.isMove = isMove;
	this.x = x;
	this.y = y;
}