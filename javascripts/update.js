$(function() {
	$("#formConvo").submit(function( event ) {
		event.preventDefault();
		submitConvo();
	});
});

var messageIndex=1;

function removeRow(row){
	$("#tr"+row).remove();
}

function addRow(){
	messageIndex++;
	var html='<tr id="tr'+messageIndex+'"><td><div class="col-xs-10"><label class="radio-inline">';
	html+= '<input type="radio" name="radio'+messageIndex+'" id="inlineRadio1" value="option1" required> You </label>';
	html+= '</div></td><td><div class="col-xs-10"><label class="radio-inline">';
	html+= '<input type="radio" name="radio'+messageIndex+'" id="inlineRadio2" value="option2"> Not you</label>';
	html+= '</div></td><td><div class="col-xs-12">'
	html+= '<input type="text" class="form-control" id="message'+messageIndex+'" placeholder="Message" required>';
	html+= '</div></td><td><button type="button" onClick="removeRow('+messageIndex+')" class="btn btn-danger">X</button></td>';
	html+= '</tr>';
	$("table").append(html);
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
		var message = $("#message"+i);
		if (message.length){
			var you=$("input[type='radio'][name='radio"+i+"']:checked").val()==="you";
			convoRef.push({
				you: you,
				message: message.val()
			});
		}
	}
	$("#formConvo")[0].reset();
}