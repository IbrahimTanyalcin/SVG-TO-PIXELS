
#Aim

	svgToPixels.js is an attempt to provide a cross browser js solution to download dynamically generated SVGs as any of the
image related [data mime types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

##Compatibility

*Chrome, Firefox, IE(>9;svg only), Safari(?)*

	Currently tested with Chrome and Firefox. A fallback mechanism exists in ie >10 which displays an alert and subsequently downloads an svg file instead.
Unfortunately:

```
canvas.toDataURL(..
```

method will invoke a security error in ie. However, this seems to be a verified bug in ie<=11 and is already reported to be fixed in [edge](https://connect.microsoft.com/IE/feedback/details/828416/cavas-todataurl-method-doesnt-work-after-draw-svg-file-to-canvas).
	
	For Safari, the a.download property and/or attribute does not exit, therefore the output is displayed in a new window.
Check that your pop-up blockers are __disabled__.

##Dependencies

	None.

##Usage

###*Inclusion*

	Include the svgToPixels.js file within the <head>:

```
...
<script src="./svgToPixels.js"></script>
</head>
...
```

	Upon inclusion an svgToPixels global variable is exported.
	
###*__How to use__*

	For the below examples you can refer to a minimal example generated [__here__](example/svgToPng.html).
	Consider a root *SVG element* (*container*) and a *controller* element (*div or any other tag that is capable of having an link as a childElement*).
	Assume that we want to click on the *controller* and download a corresponding file in "png" format:

```
svgToPixels.hook(*container,target[,type[,fileName[,once[,filter]]]]*)
```
	* *container* = This is your root SVG element. It can either be a node, or an id string as in "myId" or an id string with *#* as in "#myId".
 	* *target* = This is the *div/span...* tag that will be appended with an invisable a tag that will be removed and url-revoked once download is complete. Like above, it can be a node or an id string.
	* *type* = Specify one of the valid image [mime types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). Defaults to *"image/png"*.
	* *file* = Specify a file name in valid string. Passing an *undefined* will result in the file name:
		```
		"file."+(type.replace(/^.*\//,""))
		```
		where *type* is the previously provided/default mime type.
	* *once* = Specify whether if you want the click callback to execute only once. Set to *false* by default.
	* *filter* = Specify a valid *css filter*. The chosen filter will __not__ be applied on the original SVG. Set to *false* by default. (*Important:If you are an IE, the fallback SVG only method does __not__ allow usage of css filters as the only valid filters in SVGSVGElement are the ones declared in SVG namespace.*)
	
	If you want to hook several listeners on different elements at once you can use:
	
```
svgToPixels.hook(...).hook(...).hook(...)..
```

	####Examples:
	
	```
	svgToPixels.hook("mySVG","myDIV","image/png","someFileName",false,false);
	svgToPixels.hook("#mySVG","#myDIV","image/png","someFileName",false,false);
	svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,false);
	svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,false);
	svgToPixels.hook(svgNode,divNode,"image/png","someFileName",true,false);
	svgToPixels.hook(svgNode,divNode,"image/jpeg","someFileName",true,"grayscale(100%)");
	svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,"invert(100%)");
	```
##Lisence
	Lisenced under [*ATTRIBUTION ASSURANCE LICENSE*](./Lisence.md)
	
##Support
	For any related questions drop an email at:
	* *ibrahim.tanyalcin@i-pv.org*
	