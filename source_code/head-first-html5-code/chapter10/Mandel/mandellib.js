/* 
 * mandellib.js
 *
 *
 * ------ Ready Bake Globals ---- 
 */
var canvas;
var ctx;

var i_max = 1.5;
var i_min = -1.5;
var r_min = -2.5;
var r_max = 1.5;

var max_iter = 1024;
var escape = 100;
var palette = [];


/* 
 * ------- Ready Bake Code --------
 *
 */

//
// packages up the data we need to send to the worker
//
function createTask(row) {
	var task = {
		row: row,				// row number we're working on
		width: rowData.width,   // width of the ImageData object to fill
		generation: generation, // how far in we are
		r_min: r_min,
		r_max: r_max,
		i: i_max + (i_min - i_max) * row / canvas.height,
		max_iter: max_iter,
		escape: escape
	};
	return task;
}
//
// This function maps the numbers 0 to max_iter to 
// 256 and then fills the palette with (r, g, b) values
// so that the colors next to each other in the array
// are relatively close to each other in color, and
// by increasing each of r, g, b at a different rate this 
// works well to fill the spectrum for max_iter > 256.
//
//
function makePalette() {
    function wrap(x) {
        x = ((x + 256) & 0x1ff) - 256;
        if (x < 0) x = -x;
        return x;
    }
    for (i = 0; i <= this.max_iter; i++) {
        palette.push([wrap(7*i), wrap(5*i), wrap(11*i)]);
    }
}





//
// drawRow gets maps the values in the array returned from a worker
// 	for one row to a color using the palette.
//
function drawRow(workerResults) {
    var values = workerResults.values;	// The values array the worker sends back
    var pixelData = rowData.data;		// The actual pixels in the ImageData obj
										// The pixelData is a *reference* to the
										// 	rowData.data! so changing pixelData
										// 	changes the rowData.data!!!
    for (var i = 0; i < rowData.width; i++) {  // for each pixel in the row
		var red = i * 4;
		var green = i * 4 + 1;
		var blue = i * 4 + 2;
		var alpha = i * 4 + 3;

        pixelData[alpha] = 255; // set alpha to opaque

		// if the values array has a neg number, set the color to black
        if (values[i] < 0) {
            pixelData[red] = pixelData[green] = pixelData[blue] = 0;
        } else {
			//
			// map the number from the values array returned by the worker
			// to a color from the palette
			//
            var color = this.palette[values[i]];

			//
			// each color has an rgb component, so set the rgb of
			// the pixel we're working on to r,g,b.
			//
            pixelData[red] = color[0];
            pixelData[green] = color[1];
            pixelData[blue] = color[2];
        }
    }
	//
	// paint the row back into the canvas
	// workerData.row is the row number we're working on
	// rowData contains the data we just updated!
	// we start at column 0, so x, y = 0, row
	//
    ctx.putImageData(this.rowData, 0, workerResults.row);
}


//
// setupGraphics sets up some of the initial values for the variables used in
// 	 the Mandelbrot computation, and sets the canvas width and height
//	 to the width and height of the window.
//
function setupGraphics() {

	canvas = document.getElementById("fractal");
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var width = ((i_max - i_min) * canvas.width / canvas.height);
	var r_mid = (r_max + r_min) / 2;
	r_min = r_mid - width/2;
	r_max = r_mid + width/2;

	rowData = ctx.createImageData(canvas.width, 1);

	makePalette();
}
