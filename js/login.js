var loginObj = {
  login: function(){

    // form is showing

    // grab user's username

    // grab user's room number

    // send username and room number to firebase

    // hide form
    $('.login-screen').fadeOut();
    $('.container').show();
  },
  
};

$(document).ready(function(){
  $('#join').on('click', function(){
    console.log('hi I am a working form');
    loginObj.login();
  })
});