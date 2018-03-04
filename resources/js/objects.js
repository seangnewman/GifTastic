var imgState = {
  "still": 0,
  "animated" : 1
}


//Object houses parameters necessary to complete a successful ajax call
var apiParameters = {
      baseURL : 'https://api.giphy.com/v1/gifs/',
      clientID : '&api_key=pPF9Z4AXkjkA8KZ6jYFU5rMuZ5VA6U4A',
      searchTerm : 'search?q=',
      setSearchTerm : function(term){
         this.searchTerm = 'search?q=' + term.replace(' ','+');
         
      },
      limit: '&limit=',
      setLimits: function(limits = null){
        this.limit += (limits === '' || limits === null) ? 10 :  limits;
         
      },
      rating: '&rating=',
      setRatings : function(ratings = null){
         this.rating = (ratings === '' || ratings === null) ? '' :this.rating + ratings;
         
      },
      apiURL : function(){
        return (this.baseURL + this.searchTerm + this.limit + this.rating + this.clientID);
      }
};

//Promise returns an array of objects to caller
var getGiphy = function(theParameters){
   
  $.ajax({
    url: theParameters.apiURL(),
    method: 'GET',
    dataType: "json"
  }).done(function(response){
    //return response.data;
      buildCarousel(response.data);
  })
};

function buildCarousel(data){
  $('#giphyImages').empty();
   
  for(var i=0; i < data.length; i++){
    var imgStill = data[i].images["480w_still"].url.trim();
    var imgAnimated = data[i].images.downsized_large.url.trim() ;
   
    var theFigure = $('<figure>');
    theFigure.attr("id", "fig" + (i+1));
    theFigure.attr("data-index", i);
    var theImage = $('<img>');
    theImage.attr("id", "img" + (i + 1));
    theImage.attr('src',imgStill);
    theImage.attr("data-state", imgState.still);
    theImage.attr("data-still", imgStill);
    theImage.attr("data-animated", imgAnimated);
    theImage.attr("data-index", i);

    theRating = $('<div>');
    theRating.addClass('ratings');
    theRating.attr("data-index",i);
    theRating.attr("id","rating"+(i+1));
    theRating.text('Rating : ' +  data[i].rating);

    theFigure.append(theImage);
    theFigure.append(theRating);

    $('#giphyImages').prepend(theFigure);
    }
}

var terms = ["avengers", "sports cars", "card racing","nba", "mlb","Groot","The Rock", "Agent Carter", "Mr Robot", "Hobbits"];
