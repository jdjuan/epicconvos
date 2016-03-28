$(function() {
	// var line1 = ref.child("line1");
	// line1.on("value",function(snapshot){
	// 	var html="";
	// 	html += "<div id='"+line1.key()+"'>";
	// 	html += "<p>"+snapshot.val().text+"</p>";
	// 	html += '<button id="upvote" type="button" class="btn btn-success">Up</button>';
	// 	html += '<button id="upvote" type="button" class="btn btn-danger">Down</button>';
	// 	html += "</div>";
	// 	$("#mainContainer").append(html);
	// });

});

var messageIndex=2;

function addRow(){
	var html='<tr><td><div class="col-xs-10"><label class="radio-inline">';
	html+= '<input type="radio" name="radio'+messageIndex+'" id="inlineRadio1" value="option1"> You </label>';
	html+= '</div></td><td><div class="col-xs-10"><label class="radio-inline">';
	html+= '<input type="radio" name="radio'+messageIndex+'" id="inlineRadio2" value="option2"> Not you</label>';
	html+= '</div></td><td><div class="col-xs-12">'
	html+= '<input type="text" class="form-control" id="message'+messageIndex+'" placeholder="Message">';
	html+= '</div></td></tr>';
	$("table").append(html);
	messageIndex++;
}

function submitConvo(){
	var context=$("#context").val();

	var ref = new Firebase('https://epicconvos.firebaseio.com/');
	var convosRef = ref.child("convos");
	var convo = convosRef.push({
		context: context,
		upvotes: 0,
		downvotes: 0
	});
	var convoRef = convosRef.child(convo.key()).child("messages");
	for (var i = 1; i <= messageIndex; i++) {
		var you=$("input[type='radio'][name='radio"+i+"']:checked").val()=="you";
		var message = $("#message"+i).val();
		convoRef.push({
			you: you,
			message: message
		});
	}
}