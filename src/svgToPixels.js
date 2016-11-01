!function () {
	function svgToPixels() {
		this.hook = function(container,target,type,fileName,once,filter) {
			var containerNode = registerNode(container);
			var targetNode = registerNode(target);
			type = type || "image/png";
			fileName = fileName === undefined ? "file."+(type.replace(/^.*\//,"")) : fileName+"."+(type.replace(/^.*\//,""));
			once = once ? true : false;
			filter = filter ? filter : "none";
			targetNode.addEventListener("click",function svgToPixelsListener(){
				try {
					invokeClick();
				} catch (err) {
					console.log(err.message);
				} finally {
					once ? targetNode.removeEventListener("click",svgToPixelsListener) : void(0);
				}
			});
			function invokeClick() {
				var cloneSVG = containerNode.cloneNode(true);
				cloneSVG.style.filter = filter;
				var canvas = document.createElement("canvas");
				var context = canvas.getContext("2d");
				var aTag = document.createElement("a");
				var serialized = new XMLSerializer().serializeToString(cloneSVG);
				var src = "data:image/svg+xml;base64,"+window.btoa(serialized);
				var img = document.createElement("img");
				img.crossOrigin = "Anonymous";
				img.onload = function(){
					try {
						context.drawImage(img,0,0);
						var url = canvas.toDataURL(type,1.0);
						aTag.style.display = "none";
						aTag.setAttribute("href",url);
						aTag.setAttribute("download",fileName);
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
			return this;
		}
	}
	window.svgToPixels = new svgToPixels;
}();