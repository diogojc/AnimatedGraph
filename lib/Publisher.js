/*
	Publisher.js
	Publisher class from publisher/subscriber pattern
	Registers callbacks from subscribers, and publishes notifications to callbacks when appropriate.
*/

function Publisher(){};

Publisher.prototype.subscribe = function(callback, context){
	if( !this.subscribers )
		this.subscribers = new Array();
	this.subscribers.push({cb:callback,ct:context});
};

Publisher.prototype.unsubscribe = function(callback){
	if( !this.subscribers )
		this.subscribers = new Array();
	for(var i in this.subscribers)
		if(this.subscribers[i]==callback){
			delete this.subscribers[i];
			return;
		}
};

Publisher.prototype.publish = function(){
	if( !this.subscribers )
		this.subscribers = new Array();
	for(var i in this.subscribers){
		var callback = this.subscribers[i].cb;
		var context = this.subscribers[i].ct;
		callback.call(context,this);
	}
};
