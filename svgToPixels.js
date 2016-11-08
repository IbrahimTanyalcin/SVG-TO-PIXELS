!function () {
	function svgToPixels() {
		var _this_ = this;
		this.hook = function(container,target,type,fileName,once,filter,sx,sy,dx,dy) {
			var containerNode = registerNode(container);
			var targetNode = registerNode(target);
			type = type || "image/png";
			fileName = fileName === undefined ? "file."+(type.replace(/^.*\//,"")) : fileName+"."+(type.replace(/^.*\//,""));
			once = once ? true : false;
			filter = filter ? filter : "none";
			sx = sx === undefined ? 1 : (parseFloat(sx) || 1);
			sy = sy === undefined ? 1 : (parseFloat(sy) || 1);
			dx = dx === undefined ? 1 : (parseFloat(dx) || 1);
			dy = dy === undefined ? 1 : (parseFloat(dy) || 1);
			targetNode.addEventListener("click",function svgToPixelsListener(){
				try {
					invokeClick();
					_this_.clr();
				} catch (err) {
					console.log(err.message);
				} finally {
					once ? targetNode.removeEventListener("click",svgToPixelsListener) : void(0);
				}
			});
			function invokeClick() {
				var dims = getDims(containerNode);
				var cloneSVG = containerNode.cloneNode(true);
				_this_.sel(cloneSVG).set("width",dims.width).set("height",dims.height).set("viewBox",[dims.width*(1-dx)/2,dims.height*(1-dy)/2,dims.width*dx,dims.height*dy].join(" ")).rm("style").styl("filter",filter);
				var canvas = document.createElement("canvas");
				_this_.sel(canvas).set("width",dims.width*sx).set("height",dims.height*sy);
				var context = canvas.getContext("2d");
				context.imageSmoothingEnabled = false;
				var aTag = document.createElement("a");
				var serialized = new XMLSerializer().serializeToString(cloneSVG);
				var src = "btoa" in window ? "data:image/svg+xml;base64,"+window.btoa(serialized) : "data:image/svg+xml;charset=utf8,"+window.encodeURIComponent(serialized);
				var img = document.createElement("img");
				img.crossOrigin = "Anonymous";
				img.onload = function(){
					try {
						context.drawImage(img,0,0,dims.width,dims.height,0,0,dims.width*sx,dims.height*sy);
						var url = canvas.toDataURL(type,1.0);
						_this_.sel(aTag).styl("display","none").set("href",url).set("download",fileName);
						targetNode.appendChild(aTag);
						aTag.addEventListener("click",generatorClick(aTag));
						fire(aTag);
					} catch (err) {
						alert("Your browser security does not allow for data url API.");
						console.log(err.message);
						var blob = new Blob([serialized],{type:"image/svg+xml"});
						if (window.navigator.constructor.prototype.hasOwnProperty("msSaveBlob")) {
							window.navigator.msSaveBlob(blob,"svg.svg");
						}
					}
				}
				img.setAttribute("src",src);
				function fire (node) {
					if ("download" in node) {
						node.click();
					} else {
						window.open(node.href,"_blank");
						setTimeout(function(){window.URL.revokeObjectURL(node.href);targetNode.removeChild(node)},1000);
					}
				}
			}
			function registerNode(node){
				return typeof node === "string" ? ((/^#/).test(node) ? document.querySelector(node) : document.getElementById(node)) : node;
			}
			function generatorClick (node) {
				return function stimulateClick(event) {
					event.stopPropagation();
					var url = node.href;
					setTimeout(function(){window.URL.revokeObjectURL(url);targetNode.removeChild(node)},1000);
				};
			}
			function getDims (node) {
				if ("width" in node.attributes) {
					var width = parseFloat(node.getAttribute("width"));
					var height = parseFloat(node.getAttribute("height")) || width;
					return {width:width,height:height};
				} else if("viewBox" in node.attributes) {
					var dims = node.getAttribute("viewBox").split(/\s*[,]{1}\s*|\s+/gi);
					return {width:dims[2]-dims[0],height:dims[3]-dims[1]};
				}
			}
			return this;
		}
		this.active = undefined;
		this.clr = function(){this.active = undefined;}
		this.set = function(attr,value) {
			this.active.setAttribute(attr,value);
			return this;
		}
		this.rm = function(attr) {
			this.active.removeAttribute(attr);
			return this;
		}
		this.pro = function(property,value) {
			this.active[property] = value;
			return this;
		}
		this.styl = function(property,value) {
			this.active.style[property] = value;
			return this;
		}
		this.sel = function (node) {
			this.active = node;
			return this;
		}
	}
	window.svgToPixels = new svgToPixels;
}();