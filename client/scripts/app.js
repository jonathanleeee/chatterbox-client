// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.username = 'anonymous';
  this.roomname = 'lobby';
  this.messages = [];
  this.lastMessageId = null;
  this.friends = {};
};


App.prototype.init = function( ) {
  // Get username
  this.username = window.location.search.substr(10);

  // Cache jQuery selectors
  this.$message = $('#messageInput');
  this.$chats = $('#chats');
  this.$roomSelect = $('#roomSelect');
  this.$send = $('#send');

  // Add event listeners
  this.$send.on('submit', this.handleSubmit);
  this.$roomSelect.on('change', this.handleRoomChange);
  this.$chats.on('click', '.username', this.handleUsernameClick);

  // Fetch previous messages
  this.fetch();

  // Poll for new messages
  setInterval(function() {
    this.clearMessages();
    this.fetch();
  }.bind(this), 3000);
};

App.prototype.send = function(message) {
  this.startSpinner();
  var context = this;
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    // processData: false,
    data: JSON.stringify(message),
    contentType: 'application/JSON',
    success: function (data) {
      context.$message.val('');
      context.fetch();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function(link) {
  this.startSpinner();  
  var context = this;
  $.ajax({
    url: this.server,
    type: 'GET',
    data: {order: '-createdAt'},
    success: function (data) {
      if ( !data.results || !data.results.length ) { return; }
      context.messages = data.results;
      let mostRecentMessage = app.messages[app.messages.length - 1];
      if ( mostRecentMessage.objectId !== context.lastMessageId ) {
        context.renderMessages(context.messages);
        context.renderRoomList(context.messages);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.renderMessages = function(messages) {
  this.clearMessages();
  messages
    .filter(function(message) {
      if ( app.roomname === 'lobby' && !message.roomname ) {
        return true;
      } else if ( message.roomname === app.roomname ) {
        return true;
      } else {
        return false;
      }
    })
    .forEach(this.renderMessage);

  this.stopSpinner();
};

App.prototype.renderMessage = function({username, text, roomname}) {
  var room = roomname ? roomname : 'lobby';
  var $message = $('<div></div>');
  $message.addClass('chat');
  var $username = $('<div></div>');
  $username
    .addClass('username')
    .attr('data-user', username)
    .text(username);
  if ( app.friends[username] === true ) {
    $username.toggleClass('friend');
  }
  var $text = $('<p></p>');
  $text.text(text);
  $message.append($username);
  $message.append($text);
  $('#chats').append($message);
};

App.prototype.clearMessages = function() {
  $('#chats').html('');
};

App.prototype.renderRoomList = function(messages) {
  this.$roomSelect.html('<option value="__newRoom">New Room...</option>');

  if ( messages ) {
    var rooms = {};
    messages.forEach( message => {
      var roomname = message.roomname;
      if ( roomname && !rooms[roomname]) {
        rooms[roomname] = true;
        app.renderRoom(roomname);
      }
    });
  }

  this.$roomSelect.val(app.roomname);
};

App.prototype.renderRoom = function(roomname) {
  var $option = $('<option/>').val(roomname).text(roomname);
  app.$roomSelect.append($option);
};

App.prototype.handleRoomChange = function(event) {
  var selectedIndex = app.$roomSelect.prop('selectedIndex');
  if ( selectedIndex === 0 ) {
    var roomname = prompt('Enter a new room name');
    if ( roomname ) {
      app.roomname = roomname;
      app.renderRoom(roomname);
      app.$roomSelect.val(roomname);
    }
  } else {
    app.roomname = app.$roomSelect.val();
  }
  app.renderMessages(app.messages);
};

App.prototype.handleSubmit = function(event) {
  var username = app.username;
  var text = app.$message.val();
  var roomname = app.roomname || 'lobby';
  app.send({username, text, roomname});
  event.preventDefault();
};

App.prototype.handleUsernameClick = function(event) {
  var username = $(event.target).data('user');

  if ( username !== undefined ) {
    app.friends[username] = !app.friends[username];
    var $usernames = $(`[data-user="${username}"]`).toggleClass('friend');
  }
};

App.prototype.startSpinner = function() {
  $('.spinner').show();
  $('.form input[type=submit]').attr('disabled', true);
};

App.prototype.stopSpinner = function() {
  $('.spinner').fadeOut('fast');
  $('.form input[type=submit]').attr('disabled', null);

};

var app = new App();

app.init();
