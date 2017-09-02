// YOUR CODE HERE:
var App = function() {
  this.friendList = {};
};


App.prototype.init = function( ) {
  this.friendList = null;
  this.friendList = {};
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    // processData: false,
    data: JSON.stringify(message),
    // data: message,
    contentType: 'application/JSON',
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

App.prototype.renderMessage = function({username, text, roomname}) {
  var $message = $('<div></div>');
  $message.addClass('chat');
  var $username = $('<div></div>');
  $username.addClass('username');
  $username.attr('data-user', username);
  $username.text(username);
  var $text = $('<p></p>');
  $text.text(text);
  $message.append($username);
  $message.append($text);
  $('#chats').append($message);
};

App.prototype.renderRoom = function(room) {
  var $room = $('<div></div>');
  $room.attr('id', room);
  $('#roomSelect').append($room);
};

App.prototype.handleUsernameClick = function(username) {
  this.friendList[username] = username;
};

App.prototype.handleSubmit = function() {


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
      var text = $('#messageInput').val();
      var username = window.location.search.slice(10);
      app.renderMessage({username, text});
      $('#messageInput').val('');

    }
  });

  $('button').on('click', function() {
    var text = $('#messageInput').val();
    var username = window.location.search.slice(10);
    app.renderMessage({username, text});
    $('#messageInput').val('Talk to me!');
  });
  
  $('#chats').on('click', '.username', function() {
    var name = $(this).data('user');
    console.log('clicked', name);
    app.handleUsernameClick(name);
  });

});
















