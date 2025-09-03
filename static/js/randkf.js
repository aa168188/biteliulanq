;(function () {
	var rwxqqkefu = {
		loadJS : function(url,callback){
			rwx001_flag=2;
			var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
				script,
				options,
				s;
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}

			s = options || {};
			url = url || s.url;
			callback = callback || s.success;
			script = document.createElement("script");
			script.async = s.async || false;
			script.type = "text/javascript";
			if (s.charset) {
				script.charset = s.charset;
			}else{
				script.charset = "utf-8";
			}
			if (s.cache === false) {
				url = url + ( /\?/.test(url) ? "&" : "?" ) + "_=" + (new Date()).getTime();
			}
			script.src = url;
			head.appendChild(script);
			if (callback) {
				script.onload = script.onreadystatechange = function() {
					if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
						callback();
						script.onload = script.onreadystatechange = null;
					}
				};
			}
		},
		loadStyle : function(url,callback){
			var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
				style,
				options,
				s;
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}
			s = options || {};
			url = url || s.url;
			callback = callback || s.success;
			style = document.createElement("link");
			style.rel = "stylesheet";
			style.type = "text/css";
			if (s.charset) {
				style.charset = s.charset;
			}
			if (s.cache === false) {
				url = url + ( /\?/.test(url) ? "&" : "?" ) + "_=" + (new Date()).getTime();
			}
			style.href = url;
			head.appendChild(style);
			if (callback) {
				document.addEventListener ? style.addEventListener("load", callback, false) : style.onreadystatechange = function () {
					if (/loaded|complete/.test(style.readyState)) {
						style.onreadystatechange = null
						callback()
					}
				}
			}
		},
		copycallback:function(){
		    var div = document.createElement("div");
        	div.setAttribute("class", "randkefu");
        	document.getElementsByTagName("body")[0].appendChild(div);
			var id="";
			var scripts=document.getElementsByTagName('script');
			$.each(scripts,function(kk,vv){
				if(vv.src.indexOf("randkf.js?id")>=0){
					id=vv.src.split("=")[1];
				}
			})
			$.ajax({
				type: 'post',
				url : url+"/home/kefuapi/randkf?id="+id,
				async:false,
				dataType:"jsonp",
				jsonp:"callback",
				success: function (msg){
				    console.log(msg)
					if(msg.code==1){
						$(".randkefu").html(msg.image);
					}else{
						$(".randkefu").html("");
					}
				}
			})
		}
	}

	var lang=1;
	var url="https://kefuapi.bitbrowser.net";
	rwxqqkefu.loadJS({"url":url+'/static/jquery-1.8.0.js', "async":false, "charset":"utf-8", "cache":false},rwxqqkefu.copycallback);


})()

