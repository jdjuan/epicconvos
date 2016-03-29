$(function(){
	// Get a database reference to our posts
	var ref = new Firebase("https://epicconvos.firebaseio.com/");
// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
	console.log(snapshot.val());
}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});
});