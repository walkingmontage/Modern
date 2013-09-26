/*!
 * Modern JavaScript Library v1.0
 *
 * Released under the GPL license
 * http://www.gnu.org/licenses/gpl.html
 * 
 * https://github.com/squarepants/modern
 */
 "use strict";
 window.M = window.M || {};

 M = function(){
 	var selector,ele;
 	if(arguments.length === 1){
 		ele = document;
 		selector = arguments[0];
 	}else{
 		ele = arguments[0];
 		selector = arguments[1];
 	}
 	var result = ele.querySelectorAll(selector);
 	if(result.length != 0){
 		if(result.length>1){
 			return result;
 		}
 		return result[0];
 	}
 	return null;
 }

 M.Function = M.prototype = {}
 M.extend = M.Function.extend = function(){
 	var source,	src, copy,
 	target = arguments[0] || {},
 	length = arguments.length,
 	i = 1;

 	if(typeof target !== "object" && typeof target !== 'function'){
 		target = {};
 	}
 	if(length === i){
 		target = this;
 		--i;
 	}
 	for(;i<length;i++){
 		if((source = arguments[i]) != null){
 			for(name in source){
 				src = target[name];
 				copy = source[name];

 				if(target === copy){
 					continue;
 				}
 				target[name] = copy;
 			}
 		}
 	}
 	return target;
 }

 M.extend({
 	isType:function(t,obj){
 		return (typeof obj === t);
 	},
 	isTypeObject:function(obj){
 		return this.isType('object',obj);
 	},
 	isTypeFunction:function(obj){
 		return this.isType('function',obj);
 	},
 	isNodeList:function(obj){
 		return (obj instanceof NodeList);
 	}
 });

 M.extend({
	// generate unique id in M
	uid: function m_uid() {
		if (!M._uid) {
			M._uid = 0;
		}
		return M._uid++;
	},
	namespace: function m_namespace(namespacePath) {
		var i;
		if (!(namespacePath && namespacePath.match && namespacePath.match(/\S/))) {
			throw 'Attempt to create M.namespace with no name.';
		}
		var splitnamespaceArr = namespacePath.split(/\./);
		var cursor = window;
		for (i = 0; i < splitnamespaceArr.length; i++) {
			cursor[splitnamespaceArr[i]] = cursor[splitnamespaceArr[i]] || {};
			cursor = cursor[splitnamespaceArr[i]];
		}
	}
});

 M.extend(NodeList.prototype,{
 	forEach:function(handler,context){
 		if(!context){
 			Array.prototype.forEach.call(this,handler);
 		}else{
 			Array.prototype.forEach.call(this,function(ele,index,all){
 				handler.call(context,ele,index,all);
 			});
 		}
 	}
 });

 M.namespace('M.Element');
 M.Element.eventHandlers = {
 	on:function(evtName,evtHandler,context,useCapture){
 		this.elesEvt(true,evtName,evtHandler,context,useCapture);
 	},
 	off:function(evtName,evtHandler,context,useCapture){
 		this.elesEvt(false,evtName,evtHandler,context,useCapture);
 	},
 	eleEvt:function(on,evtName,evtHandler,context,useCapture){
 		if(on){
 			if(!context){
 				this.addEventListener(evtName,evtHandler,!!useCapture);
 			}else{
 				this.addEventListener(evtName,function(e){
 					evtHandler.call(context,e,this);
 				},!!useCapture);
 			}
 		}else{
 			if(!context){
 				this.removeEventListener(evtName,evtHandler,!!useCapture);
 			}else{
 				this.removeEventListener(evtName,function(e){
 					evtHandler.call(context,e,this);
 				},!!useCapture);
 			}
 		}
 	},
 	elesEvt:function(on,evtName,evtHandler,context,useCapture){
 		if(M.isNodeList(this)){
 			this.forEach(function(ele,index,all){
 				ele.eleEvt(on,evtName,evtHandler,context,useCapture);
 			});
 		}else{
 			this.eleEvt(on,evtName,evtHandler,context,useCapture);
 		}
 	}
 };
 M.extend(NodeList.prototype,M.Element.eventHandlers);
 M.extend(Element.prototype,M.Element.eventHandlers);

 M.extend(HTMLDocument.prototype,{
 	domReady:function(handler){
 		if(!M.isDomReady){
 			var readyHandler;
 			if(!M.isDomLoading){
 				M.readyHandlers = M.readyHandlers || [];
 				M.readyHandlers.push(handler);
 				readyHandler = function(){
 					this.removeEventListener("DOMContentLoaded",readyHandler);
 					M.isDomReady = true;
 					M.isDomLoading = false;
 					M.readyHandlers.forEach(function(handler,index,all){
 						handler();
 					});
 					M.readyHandlers = null;
 				}
 				M.isDomLoading = true;
 				this.addEventListener("DOMContentLoaded",readyHandler);
 			}else{
 				M.readyHandlers.push(handler);
 			}
 		}else{
 			handler();
 		}
 	}
 });

 M.extend(HTMLFormElement.prototype,{
 	serialize:function(){
 		var appendingString = '';
 		var fields = M(this,'input:not([type=submit]),textarea,select');
 		fields.forEach(function(ele,index,all){
 			var field = (encodeURIComponent(ele.getAttribute('name')) + '=' + encodeURIComponent(ele.value));
 			appendingString+= (field + '&');
 		});
 		return appendingString.substring(0,appendingString.length-1);
 	}
 });