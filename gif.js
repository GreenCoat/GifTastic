var topics = ["cat", "dog", "bird"];

$(document).ready(function(){
	createButtons();

	$(document).on("click", ".button", function(event){
		$("img").remove();
		var animal = event.target.innerHTML;

		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&limit=10&api_key=dc6zaTOxFJmzC";

    	$.ajax({
     		url: queryURL,
        	method: "GET"
      	}).done(function(response) {

      		for(var i = 0; i < response.data.length; i++){
      			var image = $("<img>").attr("src", response.data[i].images.fixed_width_still.url).attr("value", response.data[i].images.fixed_width.url);
        		$("#content").prepend(image);
      		}
      	});
	});

	$(document).on("click", "img", function(event){
		var temp = event.target.getAttribute("value");
		var temp2 = event.target.src;

		event.target.setAttribute("src", temp);
		event.target.setAttribute("value", temp2);
	});

	$("#submit-btn").on("click", function(){
		event.preventDefault();

		var newItem = $("#add-animal").val();

		topics.push(newItem);

		createButtons();
	});
});


function createButtons(){
	$(".button").remove();
	for(var i = 0; i < topics.length; i++){
		var b = $("<button>").text(topics[i]).attr("class", "button");
		$("#buttons").append(b);
	}
}



