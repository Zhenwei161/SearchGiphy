
var currentPage = 1;
var imgPerPage = 50;
var searchKey = "";
getTending(0,true);

function getTending(offset,clear){
  var turl = "http://api.giphy.com/v1/gifs/trending?api_key=m4lwIGixbFUFbsWmwnU3Onkhs34djrpK&limit=50&offset=";
  var txhr = $.get(turl+offset);
  txhr.done(function(response) {
    if(clear){
      $('.result').empty();
    }
    console.log("success got data", response);
    var imgs = response.data
    for (i in imgs){
      $('.result').append("<div class='container'><img onclick= window.location.href='"+imgs[i].images.original.url+"' src='"+imgs[i].images.original.url+"'title = "+imgs[i].title.replace(/ /g, "_")+"><div class='overlay'></div></div>");
    }
  });
}

function getData(offset,clear){
  var url = "http://api.giphy.com/v1/gifs/search?q=";
  var url2 = "&api_key=m4lwIGixbFUFbsWmwnU3Onkhs34djrpK&limit=";
  var limit = "50"
  var url3 = "&offset="
  searchKey = $('.searchkey').val();
  console.log(searchKey+' '+offset);
  var xhr = $.get(url+searchKey+url2+limit+url3+offset);
  xhr.done(function(response) {
    if(clear){
      $('.result').empty();
    }
    $('.searchkey').val('');
    console.log("success got data", response);
    var imgs = response.data
    for (i in imgs){
      $('.result').append("<div class='container'><img onclick= window.location.href='"+imgs[i].images.original.url+"' src='"+imgs[i].images.original.url+"'title = "+imgs[i].title.replace(/ /g, "_")+"><div class='overlay'></div></div>");
    }
  });
}


$(document).ready(function(){
  $('.result').imagesLoaded().done(function() {
    console.log('all images successfully loaded');
    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
          currentPage = currentPage + 1;
          if(searchKey==0){
            getTending((currentPage-1)*imgPerPage,false);
          }
          else{
            $('.searchkey').val(searchKey);
            getData((currentPage-1)*imgPerPage,false);
          }
        }

    });
  });
});
