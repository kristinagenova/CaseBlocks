function loadGlobalVariablesReferencingDOMObjects() {
	container = $('#container');
}

function show(id){
		$(id).css('display', 'block');
}


function hide(){
		$('#form').css('display', 'none');
}

//We set a listner on the event click for the class toggle. This function will be executed
//on evert click on an element with that class
$(document).on("click",".toggle",function() {
	//it gets the ID for the element that we want to show.
    var ID = $(this).data("id");
    // It finds the element with the given ID and it toggles the css class on it.
    $("#"+ID).toggle();
    $('.toggle').toggle();
});

function executeGet(ref) {
	if (ref == 29){
		show(container);
		hide();
		$.ajax({
		type: 'GET',
		url: 'https://login.caseblocks.com/case_blocks/search',
		dataType: 'json',
		data: {
			query: "client_reference:"+ref,
			auth_token: "bDm1bzuz38bpauzzZ_-z"
		},
		success: function(data) {
			debugger;
			var $table = $("#table");
			data.forEach(function(entry){
				if (entry.system_category == "O"){
					entry.cases.forEach(function(casee){
						$('#tableHeader').append(casee.client_name);
					})
				}
				if (entry.system_category == "W"){
					entry.cases.forEach(function(casee){
						var tr = $('<tr>');
						var td = $('<td>');
						td.append(casee.created_at);
						tr.append(td);
						var td = $('<td>');
						td.append(casee.enquiry_source);
						tr.append(td);
						var td = $('<td>');
						var addition = '<br/><button class="toggle" data-id="'+casee._id+'">SHOW</button><button style="display: none" class="toggle" data-id="'+casee._id+'">HIDE</button><div style="display: none;" id="'+casee._id+'"> ';
						if(casee.name != null)
							addition = addition +casee.name+' ';
						if(casee.country != null)
							addition = addition + casee.country +' ';
						if(casee.contact_number != null)
							addition = addition +'( '+casee.contact_number+') '
						
						addition = addition + '</div>'
						td.append(casee.message).append(addition);
						tr.append(td);
						$table.append(tr);
						//onclick="show('+casee._id+');"
						//'<br/><button class="show" data-id="'+casee._id+'">SHOW</button><div class="hidden" id="'+casee._id+'">'+casee.name + ' (' + casee.contact_number + ')</div>')
					});
					//$('#582d8a64b33c53006400017d').css('display', 'block');
				}
			});

		},
		error: function(data) {
			alert("fail");
            console.log("nooo");
        }
	});
	}else{
		$('#form').append("reference is not valid, try again")
	}
}