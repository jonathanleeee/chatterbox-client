// YOUR CODE HERE:
var App = function() {

};


App.prototype.init = function( ) {

};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};    

App.prototype.fetch = function(link) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: link,
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}; 

App.prototype.clearMessages = function() {
  $('#chats').html('');
};

App.prototype.renderMessage = function(message) {
  var $message = $('<div></div>');
  $message.addClass('chat');
  var user = window.location.search;
  var $username = $('<h3></h3>');
  $username.text(user.slice(10));
  var $text = $('<p></p>');
  $text.text(message);
  $message.append($username);
  $message.append($text);
  $('#chats').append($message);
};

App.prototype.renderRoom = function(room) {
  var $room = $('<div></div>');
  $room.attr('id', room);
  $('#roomSelect').append($room);
};

var app = new App();

$( document ).ready(function() {
  $('#messageInput').on('click', function() {
    if ( $('#messageInput').val() === 'Talk to me!' ) {
      $('#messageInput').val('');
    }
  });
  $('#messageInput').keypress(function(key) {
    if ( key.which === 13 ) {
      var value = $('#messageInput').val(); 
      app.renderMessage(value);
      $('#messageInput').val('');

    }
  });
  $('button').on('click', function() {
    var message = $('#messageInput').val();
    app.renderMessage(message);
    $('#messageInput').val('');
  });
});
















