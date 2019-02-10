var n = N$('first','last');

$('#selectLang').click(function(){
	var greeter = N$('Nishant','Niket');
	console.log(greeter);
	greeter.setLanguage($('#language-option').val()).HTMLGreetingGenerator('#greeting',true).log();
})