//Object houses parameters necessary to complete a successful ajax call
var apiParameters = {
      baseURL : 'https://api.giphy.com/v1/gifs/',
      clientID : '&api_key=pPF9Z4AXkjkA8KZ6jYFU5rMuZ5VA6U4A',
      searchTerm : 'search?q=',
      setSearchTerm : function(term){
         this.searchTerm += term.replace(' ','+');
         console.log("search term is " + this.searchTerm);
      },
      limit: '&limit=',
      rating: '&rating=',
      setRatings : function(ratings){
        console.log("parameter ratings = " + ratings);
        this.rating = (ratings === '' || ratings === null) ? '' :this.rating + ratings;
        console.log(this.rating);
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
              console.log(response.data);
              //return response.data;
              buildCarousel(response.data);
            })
};

function buildCarousel(data){
  for(var i=0; i < data.length; i++){
    var theImage = '<figure id="fig' + (i + 1) + '"><img src=' + data[i].images["480w_still"].url + ' ></figure>';
    var imgSource = data[i].images["480w_still"].url;
    console.log("img" + (i+1) +  imgSource);
    $("#img" + (i+1)).attr("src",imgSource);
    $("#img" + (i+1)).attr("data-index",i);
    $("#img" + (i+1)).attr("data-still",data[i].images["480w_still"].url);
    $("#img" + (i+1)).attr("data-giphy",data[i].images["downsized_large"].url);
 
/*
    $("#carousel").append(theImage);
    $("id" + (i+1)).data("index",i);
    $("id" + (i+1)).data("still",data[i].images["480w_still"].url);
    $("id" + (i+1)).data("giphy",data[i].images["downsized_large"].url);
    */

  }
}

//var subjects[""]


var terms = ["marvel films", "sports cars", "card racing","nba", "mlb","Groot","The Rock", "Agent Carter", "Mr Robot", "Hobbits"];
var term = terms[6];
var ratings = '';
apiParameters.setSearchTerm(term);
apiParameters.limit += 10;

apiParameters.setRatings(ratings);
console.log(apiParameters.apiURL());

getGiphy(apiParameters);
 