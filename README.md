
#Aim
&nbsp;&nbsp;&nbsp;&nbsp;svgToPixels.js is an attempt to provide a cross browser js solution to download dynamically generated SVGs as any of the
image related [data mime types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

##Compatibility
&nbsp;&nbsp;&nbsp;&nbsp;*Chrome, Firefox, IE(>9;svg only), Safari(?, force open base64 serialzed svg string)*

&nbsp;&nbsp;&nbsp;&nbsp;Currently tested with Chrome and Firefox. A fallback mechanism exists in IE >10 which displays an alert and subsequently downloads an SVG file instead.

Unfortunately:

```
canvas.toDataURL(..
```

method will invoke a security error in IE. However, this seems to be a verified bug in IE<=11 and is already reported to be fixed in [edge](https://connect.microsoft.com/IE/feedback/details/828416/cavas-todataurl-method-doesnt-work-after-draw-svg-file-to-canvas).

&nbsp;&nbsp;&nbsp;&nbsp;For Safari, the *a.download* property and/or _attribute_ does not exit, therefore the output is displayed in a *new window*.

&nbsp;&nbsp;&nbsp;&nbsp;For Safari, check that your pop-up blockers are __disabled__. Safari still requires the png to be generated at the server side, making a round trip. For this reason there is a new force parameter
which forces the browser to display the base64 svg string to be opened in a new window. You can then export this to PDF using iBooks in iOS.

##Dependencies
&nbsp;&nbsp;&nbsp;&nbsp;None.

##Mechanism

&nbsp;&nbsp;&nbsp;&nbsp;The script assumes that either a viewBox or a width&height attributes are explicitly set in the parent SVG. If a height does not exist, it is assumed to be the same as width.

##Usage

###*Inclusion*
&nbsp;&nbsp;&nbsp;&nbsp;Include the svgToPixels.js file within the <head>:

```
...
<script src="./svgToPixels.js"></script>
</head>
...
```

&nbsp;&nbsp;&nbsp;&nbsp;Upon inclusion an svgToPixels global variable is exported.
	
###*__How to use__*

&nbsp;&nbsp;&nbsp;&nbsp;For the below examples you can refer to a minimal example generated [__here__](example/svgToPng.html).

&nbsp;&nbsp;&nbsp;&nbsp;Consider a root *SVG element* (*container*) and a *controller* element (*div or any other tag that is capable of having an link as a childElement*).

&nbsp;&nbsp;&nbsp;&nbsp;Assume that we want to click on the *controller* and download a corresponding file in "png" format:

<pre>
svgToPixels.hook(<i>container,target[,type[,fileName[,once[,filter[,sx[,sy[,dx[,dy[,force]]]]]]]]]</i>)
</pre>

* _container_ = This is your root SVG element. It can either be a node, or an id string as in "myId" or an id string with *#* as in "#myId".
* _target_ = This is the *div/span...* tag that will be appended with an invisable a tag that will be removed and url-revoked once download is complete. Like above, it can be a node or an id string.
* _type_ = Specify one of the valid image [mime types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). Defaults to *"image/png"*.
* _file_ = Specify a file name in valid string. Passing an *undefined* will result in the file name:
```
"file."+(type.replace(/^.*\//,""))
```
where _type_ is the previously provided/default mime type.
* _once_ = Specify whether if you want the click callback to execute only once. Set to *false* by default.
* _filter_ = Specify a valid *css filter*. The chosen filter will __not__ be applied on the original SVG. Set to *false* by default. (*Important:If you are an IE, the fallback SVG only method does __not__ allow usage of css filters as the only valid filters in SVGSVGElement are the ones declared in SVG namespace.*)
* _sx_ = X axis scale, defaults to 1.
* _sy_ = Y axis scale, defaults to 1.
* _dx_ = Set to 1 by default. If you want to snapshot a larger portion of an SVG (normally not necessary but there might be overflow elements in certain cases) set it to >1. Conversely, if you want a take smaller portion set it to <1. The center of the selected area is always the same with the center of parent SVG. In other words, the snapshot is always aligned middle.
* _dy_ = Similar to dx, but controls y axis portion and centering.
* _force_ = Forces the browser to open base64 string of the svg in new window regardless of whether the png generation was successfull.
	
&nbsp;&nbsp;&nbsp;&nbsp;If you want to hook several listeners on different elements at once you can use:
	
```
svgToPixels.hook(...).hook(...).hook(...)..
```

&nbsp;&nbsp;&nbsp;&nbsp;Although default scales are set to 1, this might result in a low resolution image. I recommend settign *sx,sy* to >2.

####__Examples__:
	

<pre>
<i>svgToPixels.hook("mySVG","myDIV","image/png","someFileName",false,false);</i>

<i>svgToPixels.hook("#mySVG","#myDIV","image/png","someFileName",false,false);</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,false);</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,false);</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",true,false);</i>

<i>svgToPixels.hook(svgNode,divNode,"image/jpeg","someFileName",true,"grayscale(100%)");</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,"invert(100%)");</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,false,10,10);</i> //about ~1 mb high resolution image.

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,false,10,10,undefined,undefined,true);</i> //the last argument forces the browser to display the base64 svg string in separate window. 
</pre>


##Lisence
&nbsp;&nbsp;&nbsp;&nbsp;Lisenced under [*ATTRIBUTION ASSURANCE LICENSE*](./LISENCE.md)
	
##Support
&nbsp;&nbsp;&nbsp;&nbsp;For any related questions drop an email at:
* _ibrahim.tanyalcin@i-pv.org_
	