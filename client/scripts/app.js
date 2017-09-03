// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.username = window.location.search.slice(10);
  this.lastId = null;
  this.roomname = 'lobby';
};


App.prototype.init = function( ) {
  var context = this;

  $( document ).ready(function() {

    $('#messageInput').keypress(function(key) {
      if ( key.which === 13 ) {
        var text = $('#messageInput').val();
        var username = context.username;
        app.send({username, text});
        $('#messageInput').val('');
      }
    });

    $('button').on('click', function() {
      var text = $('#messageInput').val();
      var username = context.username;
      app.send({username, text});
      $('#messageInput').val('');
    });
    
    $('#chats').on('click', '.username', function() {
      var name = $(this).data('user');
      console.log('clicked', name);
      app.handleUsernameClick(name);
    });

  });

  this.fetch();

  setInterval(function() {
    this.fetch();
  }.bind(this), 800);
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
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
  var context = this;
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: {order: '-createdAt'},
    success: function (data) {
      data.results.forEach( function(message) {
        if ( context.lastId !== message.objectId ) {
          context.renderMessage(message);
          context.lastId = message.objectId;
        }
      });
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

app.init();

















