var topics = ['soccer', 'basketball', 'tennis', 'lacrosse', 'water polo', 'Brazillian Jui Jitsu', 'wrestling', 'kick boxing', 'volleyball', 'ultimate frisbee']
var stillImage;
var animatedImage;
var gifRating;
var clickedTopic;

function renderButton(){
  // empty gif-btn
  $('#gif-btn').empty()
  // Generate initial buttons
  for(var i = 0; i < topics.length; i++){
    // variable for the default buttons
    var topicBtn = $('<button>')
    // this is assigning an id to 
    topicBtn.attr('id', 'sport-' + i).addClass('topic-btn btn btn-secondary')
    // take the content from the topics array and put text into the buttons
    topicBtn.text(topics[i])
    // move the button with text into gif div
    $('#gif-btn').append(topicBtn)
    // Generate content when buttons are pressed
  }
      $('.topic-btn').click(function(event){
        clickedTopic = $(this).text()
        giphyPull()
      })
}
renderButton();

// Create a "renderButton" function that allows new buttons to be created
$('#submit').click(function(){
  // get content from input bard
  var newSport = $('#sport-topic').val()
  topics.push(newSport)
  renderButton();
})

$('#clear').click(function(){
  $('#gif-dump').empty()
})

function renderContent() {
  // create a container div to house the rating and img
  var contentDiv = $('<div>')
  // create a 'p' to store img and rating
  var p = $('<p>')
  // create an image tag for stillImage, and create data attribute for animated image
  var imageDrop = $('<img>').attr('src', stillImage)
  imageDrop.attr('data-animate', animatedImage)
  imageDrop.attr('data-still', stillImage)
  imageDrop.attr('data-state', 'still')
  // add rating text to 'p'
  p.text('Rating: ' + gifRating.toUpperCase())
  // append img to 'div'
  contentDiv.append(imageDrop)
  // display still images and ratings
  contentDiv.append(p)
  //append div to #gif-dump
  $('#gif-dump').prepend(contentDiv)
  $('img').click(function(){
    if($(this).attr('data-state') === 'still'){
      $(this).attr('src', $(this).attr('data-animate'))
      imageDrop.attr('data-state', 'animate')
    } else if ($(this).attr('data-state') === 'animate'){
      $(this).attr('src', $(this).attr('data-still'))
      imageDrop.attr('data-state', 'still')
    }
  })
}    

function giphyPull(){
  var apiKey = 'JZlXDAwy0ppNliaMDE3MMVJvy3GbwFOS';
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + clickedTopic + '&api_key=' + apiKey + '&limit=10';
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    
    // store JSON data in variables
    for(var i = 0; i < response.data.length; i++) {
      var objectData = response.data[i]
      gifRating = objectData.rating
      stillImage = objectData.images.original_still.url
      animatedImage = objectData.images.fixed_height.url
          renderContent()
    }
  });
}

