QUnit.test( "prettyPath", function( assert ) {
	//assert.ok( 1 == "1", "Passed!" );
	
	//var svgParser = new SVGParser();
	assert.equal(SVGParser.fixPathData("m100,0"),"m 100 0");
	assert.equal(SVGParser.fixPathData("m 100,0"),"m 100 0");
	assert.equal(SVGParser.fixPathData("m 100,0 200,0 300,0"),"m 100 0 200 0 300 0");
	assert.equal(SVGParser.fixPathData("m 100,0-2,5"),"m 100 0 -2 5");
	assert.equal(SVGParser.fixPathData("m-100,0-2,5"),"m -100 0 -2 5");
	assert.equal(SVGParser.fixPathData("m100,0l0,100 100,0"),"m 100 0 l 0 100 100 0");
	assert.equal(SVGParser.fixPathData("M100,0L0,100 100,0"),"M 100 0 L 0 100 100 0");
	
});

QUnit.test( "parsePathData", function( assert ) {
	//var svgParser = new SVGParser();
	
	var rect = [
							new Point(true,100,100),
							new Point(false,200,100),
							new Point(false,200,200),
							new Point(false,100,200),
							new Point(false,100,100)
						 ];
	var a = [
							new Point(true,100,0),
							new Point(false,1,20),
							new Point(false,30,40),
							new Point(false,20,60),
							new Point(false,50,100),
							new Point(false,51.5,102.8),
						 ];
	
	assert.deepEqual(SVGParser.parsePathData("M100,0L1,20 30,40l-10,20 30,40 1.5 2.8"),a);
	assert.deepEqual(SVGParser.parsePathData("M100,100L200,100 200,200 100,200 100,100"),rect);
	assert.deepEqual(SVGParser.parsePathData("M100,100L200,100L200,200L100,200Z"),rect);
	assert.deepEqual(SVGParser.parsePathData("m100,100l100,0l0,100l-100,0Z"),rect);
	assert.deepEqual(SVGParser.parsePathData("m100,100h100v100h-100z"),rect);
	assert.deepEqual(SVGParser.parsePathData("m 100 100 h 100 v 100 h -100 z"),rect);
	assert.deepEqual(SVGParser.parsePathData("M 100 100 H 200 V 200 H 100 z"),rect);
		
	
});