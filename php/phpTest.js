console.log('happening')
var hello = 'this is a string'
$.ajax({
	type: 'POST',
	url: '/php/mailForm.php',
	dataType: 'html',
	data: {
		hello: hello,
	}
}).done(function() {
	console.log('done')
})