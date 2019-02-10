//TODO: Add more comments
;(function(global,$){

/* Instead of Function Constructor in which you will have to use keyword 'new'
	Greeter should return the result of a different function constructor.
	Similar to .init in jQuery.
*/
	var Greeter = function(firstName,lastName,language){
		//new always creates an empty object and makes the proto property point to the 
		//newly created object by Greeter.init()
		return new Greeter.init(firstName,lastName,language);
		}

/*
	Here goes all the usefull common properties that are not meant to be shared outside.
	These won't be a part of the object that gets returned by this function. kind of private variabled.
	These are not exposed any where. it just sits in the memory space of this function.
	And even though they are not available in that object, the object will still be able to use those values
	Reason being Closures, It will close in on this variable even after this IIFE is done running. So the object 
	still has access to variables. And they are hidden to other developers. The only way to change them is by changing 
	the source code.

*/
	var greetings = {
		en : 'Hello',
		es : 'Hola'
	};
// 	my purpose here is to access messages per language basic , on key basis.
	var formalGreetings = {
		en : 'Greetings',
		es : 'Saludos'
	};

	var logMessages = {
		en : 'Logged In',
		es : '	Inicio sesion'
	}  		
	var supportedLanguages = ['en','es'];
/*
	Here all usefull methods will be go. Methods that can be used inside the object
	We will also have properties that we want to expose. All those properties will be attached to
	this object returned by Greeter function
	that's returned from Greeter.
	In jQuery this is a giant object literal with lots of useful methods being tossed around. 
*/
	Greeter.prototype = {

		fullName: function() {
			return this.firstName + ' ' + this.lastName; 
		},
		validate: function() {
			if (supportedLanguages.indexOf(this.language) === -1) {
				throw "unsupported language";
			}
		},
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstName + '!';
		},
		formalGreeting: function() {
			return formalGreetings[this.language] + ',' + this.fullName();
		},
		greet: function(formalOrSocial){
			var msg;
			if (formalOrSocial) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}

			if (console) {
				console.log(msg);
			}
			/*
				'this' refers to the calling object at the execution time
				we return this so that the methods are chainable.
				This is similar to jQuery where you call a function and after that function is done making changes 
				to that object and returns it , we pass this modified object to another function that is chained next 
				in the execution order.
			*/
			return this;
		},
		log: function(){
			//console is just a function sitting on the global object. 
			if (console) {
				console.log(logMessages[this.language] + ':'+this.fullName());
			}
			return this;
		},
		setLanguage: function(updatedLanguage){
			this.language = updatedLanguage;
			this.validate();
			return this;
		},
		HTMLGreetingGenerator: function(selector,formal) {
			if (!$) {
				throw 'jQuery not found';
			}
			if (!selector) {
				throw 'Missing jQuery selector';
			}
			var msg;
			if (formal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}

			$(selector).html(msg);
			return this;
		}
	};

	Greeter.init =function(firstName,lastName,language){
		//set the default properties of the constructor function and set properties of this object 
		var self = this;
		self.firstName = firstName || '';
		self.lastName = lastName || '' ;
		self.language = language || 'en';
		self.validate()
	}
/*
	When a function constructor is invoked it returns an object with the properties set 
	or defined in that function.
	This object has a property called prototype which points to another object.This object can be our usefull 
	Method collection object 'Greeter.prototype'. So in order to make the returned object (by Greeter function) 
	have all the usefull methods we set its prototype property point to our Greeter.prototype.
	This is similar to what jQuery does.
*/
	Greeter.init.prototype = Greeter.prototype;
	/*
		now we want to make this Greeter expose to outside world . we need to attach this to global object
		so that its accessible to us , similar to how $ is accessible globally.
		also set the alias like $ for jQuery.
	*/
	global.Greeter = global.N$ = Greeter;	


}(window,jQuery));