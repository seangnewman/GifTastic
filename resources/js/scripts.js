// Wait until all objects in the DOM have loaded 
$(document).ready(function() {
    initializeButtons();

    //Listen if the user would like to add a search term 
    $('#addToTerms').on("click",function(event){
      //Picked this up in class on 3/3/2018
      //Prevents the default action on the form
      event.preventDefault();
   
      //Capture the contents of the input box.
      //if the contents are empty, take no action.
      var elementText = $('#searchInput').val();
      if(elementText.length > 0){
        terms.push(elementText);
        initializeButtons();
      }
         
    });// End Search Click Event

    

});

 function initializeButtons(){
    $('#btnContainer').empty();
     for( var i=0; i < terms.length; i++){
       createNewButton(terms[i]);
     }
 }

 function createNewButton(topic){
   var theButton = $('<button>');
   theButton.text(topic);
   theButton.addClass('btnClass');
   theButton.attr("data-name", topic);
   $('#btnContainer').prepend(theButton);
 }

 



var inc=1;
	$(function () {
			$('#next').click(
				function () {
					var currentFig = "#fig" + inc;
					if (inc == 10) {
						nextFig = "#fig1";
					} else {
						nextFig = "#fig" + (inc + 1);
					}
					$(nextFig).addClass('showFig');
					$(currentFig).removeClass('showFig');	
					inc++;
					if (inc == 11) { inc = 1; } 
				}
			);	
			$('#previous').click(
				function () {
					var currentFig = "#fig" + inc;
					if (inc == 1) {
						prevFig = "#fig10";
					} else {
						prevFig = "#fig" + (inc - 1);
					}
					$(prevFig).addClass('showFig');
					$(currentFig).removeClass('showFig');	
					inc--;
					if (inc == 0) { inc = 10; } 
			}
			);	
	});