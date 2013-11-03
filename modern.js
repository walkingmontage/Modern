/*!
 * Modern JavaScript Library v1.0 [EYES FRONT]
 * license GPL
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
 	var source,	src, copy,name,
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

//Type
 M.extend({
 	isType:function(t,obj){
 		return (toString.call(obj) === '[object '+t+']');
 	},
 	isObject:function(obj){
 		return obj == null ? false : this.isType('Object',obj);
 	},
 	isString:function(obj){
 		return this.isType('String',obj);
 	},
 	isArray:function(obj){
 		return this.isType('Array',obj);
 	},
 	isFunction:function(obj){
 		return this.isType('Function',obj);
 	},
 	isArguments:function(obj){
 		return this.isType('Arguments',obj);
 	},
 	isNodeList:function(obj){
 		return this.isType('NodeList',obj);
 	},
 	//deprecated
 	isTypeObject:function(obj){
 		return this.isType('Object',obj);
 	},
 	//deprecated
 	isTypeFunction:function(obj){
 		return this.isType('Function',obj);
 	}
 });

//NameSpace
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

//Event & Element
M.namespace('M.Element');

M.Element.forEach = {
	forEach:function(handler,context){
		if(!context){
			Array.prototype.forEach.call(this,handler);
		}else{
			Array.prototype.forEach.call(this,function(ele,index,all){
				handler.call(context,ele,index,all);
			});
		}
	}
}

M.extend(NodeList.prototype,M.Element.forEach);
M.extend(HTMLCollection.prototype,M.Element.forEach);

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
		if(M.isNodeList(this) || M.isHTMLCollection(this)){
			this.forEach(function(ele,index,all){
				ele.eleEvt(on,evtName,evtHandler,context,useCapture);
			});
		}else{
			this.eleEvt(on,evtName,evtHandler,context,useCapture);
		}
	}
};
M.extend(NodeList.prototype,M.Element.eventHandlers);
M.extend(HTMLCollection.prototype,M.Element.eventHandlers);
M.extend(Element.prototype,M.Element.eventHandlers);

//append
M.Element.append = {
	append:function(_str_){
		var cover = document.createElement('a');
		cover.innerHTML = _str_;
		var eles = cover.children;
		if(M.isNodeList(this) || M.isHTMLCollection(this)){
			this.forEach(function(target){
				target.append.call(target,_str_);
			});
		}else{
			eles.forEach(function(ele){
				this.appendChild(ele);
			},this)
		}
	}
}
M.extend(NodeList.prototype,M.Element.append);
M.extend(HTMLCollection.prototype,M.Element.append);
M.extend(Element.prototype,M.Element.append);

//Form
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

 //Document
 M.extend(HTMLDocument.prototype,{
 	ready:function(handler,seque){
 		if(!M.isDomReady){
 			var readyHandler;
 			if(!M.isDomLoading){
 				M.readyHandlers = M.readyHandlers || [];
 				M.readyHandlers.push(handler);
 				readyHandler = function(){
 					this.removeEventListener("DOMContentLoaded",readyHandler);
 					M.isDomReady = true;
 					M.isDomLoading = false;
 					if(M.startHandler){
 						M.startHandler();
 						delete M.startHandler;
 					}
 					M.readyHandlers.forEach(function(handler,index,all){
 						handler();
 					});
 					delete M.readyHandlers;
 					if(M.endHandler){
 						M.endHandler();
 						delete M.endHandler;
 					}
 				}
 				M.isDomLoading = true;
 				this.addEventListener("DOMContentLoaded",readyHandler);
 			}else{
 				if(seque){
 					if(seque==="start"){
 						M.startHandler = handler;
 					}else if(seque==='end'){
 						M.endHandler = handler;
 					}
 				}else{
 					M.readyHandlers.push(handler);
 				}
 			}
 		}else{
 			handler();
 		}
 	}
 });
