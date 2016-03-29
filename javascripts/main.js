$(function(){
	var ref = new Firebase("https://epicconvos.firebaseio.com/convos");
	ref.on("value", function(snapshot) {
		snapshot.forEach(function(data) {
			$(".context").text(data.val().context);
			data.child("messages").forEach(function(message){
				var html = '<li class="line '+((message.val().you)?"you":"notYou")+'">'+message.val().message+'</li>';
				html+= '<div class="clear"></div>';
				$("#convoLines").append(html);
			});
		});
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
});