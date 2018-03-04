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

    //Listen for event to search Giphy
    $('#btnContainer').on("click", "button",function(){
        // Delegate to the container as buttons cannot be bound
        var btnTopic = $(this).attr("data-name");
  
        returnGiphy(btnTopic);
       
 
    });


    //At this point I don't really need to delegate images
    //But doing so for flexibility sake, may want to dynamically load images
    $('#giphyImages').on("click","img", function(){
       
        // If an active GIF is running, set it's status to 0 and the src to stil
        var activeID = '#' + findActiveGiphy();
        var thisID = '#' + $(this).attr("id");
        console.log("At initiation thisID = " + thisID);
        // if the current status of this element is active, turn off
        if(thisID === activeID){
            // set this element to still image
            setGiphyStill(thisID);
            //No further action needed
        }else if(activeID != "#none"){
            setGiphyStill(activeID); 
            setGiphyActive(thisID);   
        }else{
            //No active elements
            console.log("the current id is " + thisID);
            setGiphyActive(thisID);
        }

         
        
        
    });// End carousel click event


    

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

 function returnGiphy(searchParameter){
    var ratings = '';
    apiParameters.setSearchTerm(searchParameter.trim());
    apiParameters.limit += 10;
    apiParameters.setRatings(ratings);
    console.log(apiParameters.apiURL());
    getGiphy(apiParameters);
 }

 function findActiveGiphy(){
     if(document.querySelectorAll('[data-state="1"]').length > 0 ){
        return document.querySelectorAll('[data-state="1"]')[0].getAttribute("id");
     }else {
        return "none";
    }
 }

 function setGiphyStill(imgID){
  var stillImage = $(imgID).attr("data-still");
  console.log("inside set the value is " + imgID);
  $(imgID).attr("data-state", 0);
  $(imgID).attr("src", stillImage);
 }

 function setGiphyActive(imgID){
    var activeImage = $(imgID).attr("data-animated");
    console.log("Inset the active the image id and path are " + activeImage);
    $(imgID).attr("data-state", 1);
    $(imgID).attr("src", activeImage.trim());
   }
   
 