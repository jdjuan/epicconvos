$(function(){
	var ref = new Firebase("https://epicconvos.firebaseio.com/convos");
	var convos=[];

	ref.orderByChild("upvotes").once("value", function(snapshot) {
		snapshot.forEach(function(data) {
			var convo = data.val();
			convo.key = data.key();
			convos.push(convo);
		});
		renderConvo();
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});

	$("#upvoteButton").click(function(){
		vote(1);	
	});
	$("#downvoteButton").click(function(){
		vote(-1);
	});

	function renderConvo(){
		if (convos.length>0) {
			var convo = convos.pop();
			$(".convoContainer").attr("id",convo.key);
			$(".context").text(convo.context);
			for (var key in convo.messages) {
				var you = convo.messages[key].you;
				var message = convo.messages[key].message;
				var html = '<li class="line '+((you)?"you":"notYou")+'">'+message+'</li>';
				html += '<div class="clear"></div>';
				$("#convoLines").append(html);
			}
		}else{
			$(".context").text("No more convos to show");
			$("#convoLines").remove();
			$(".voteColumn").children().remove();
		}
	}

	function vote(value){
		var key = $(".convoContainer").attr("id");
		if (value>0) {
			var ref = new Firebase("https://epicconvos.firebaseio.com/convos/"+key+"/upvotes");
		}else{
			var ref = new Firebase("https://epicconvos.firebaseio.com/convos/"+key+"/downvotes");
		}
		ref.transaction(function(currentVotes) {
			return currentVotes+value;
		});
		renderConvo();
	}
});

