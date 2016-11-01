
#Aim
&nbsp;&nbsp;&nbsp;&nbsp;svgToPixels.js is an attempt to provide a cross browser js solution to download dynamically generated SVGs as any of the
image related [data mime types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

##Compatibility
&nbsp;&nbsp;&nbsp;&nbsp;*Chrome, Firefox, IE(>9;svg only), Safari(?)*
&nbsp;&nbsp;&nbsp;&nbsp;Currently tested with Chrome and Firefox. A fallback mechanism exists in ie >10 which displays an alert and subsequently downloads an svg file instead.
Unfortunately:

```
canvas.toDataURL(..
```

method will invoke a security error in IE. However, this seems to be a verified bug in IE<=11 and is already reported to be fixed in [edge](https://connect.microsoft.com/IE/feedback/details/828416/cavas-todataurl-method-doesnt-work-after-draw-svg-file-to-canvas).
&nbsp;&nbsp;&nbsp;&nbsp;For Safari, the a.download property and/or attribute does not exit, therefore the output is displayed in a new window.

&nbsp;&nbsp;&nbsp;&nbsp;Check that your pop-up blockers are __disabled__.

##Dependencies
&nbsp;&nbsp;&nbsp;&nbsp;None.

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
svgToPixels.hook(<i>container,target[,type[,fileName[,once[,filter]]]]</i>)
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
	
&nbsp;&nbsp;&nbsp;&nbsp;If you want to hook several listeners on different elements at once you can use:
	
```
svgToPixels.hook(...).hook(...).hook(...)..
```

####__Examples__:
	

<pre>
<i>svgToPixels.hook("mySVG","myDIV","image/png","someFileName",false,false);</i>

<i>svgToPixels.hook("#mySVG","#myDIV","image/png","someFileName",false,false);</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,false);</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,false);</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",true,false);</i>

<i>svgToPixels.hook(svgNode,divNode,"image/jpeg","someFileName",true,"grayscale(100%)");</i>

<i>svgToPixels.hook(svgNode,divNode,"image/png","someFileName",false,"invert(100%)");</i>
</pre>


##Lisence
&nbsp;&nbsp;&nbsp;&nbsp;Lisenced under [*ATTRIBUTION ASSURANCE LICENSE*](./LISENCE.md)
	
##Support
&nbsp;&nbsp;&nbsp;&nbsp;For any related questions drop an email at:
* _ibrahim.tanyalcin@i-pv.org_
	