$(function() {
  // Initialize variables
  var $window = $(window);
  var $messages = $('.messages'); // Messages area

  var socket = io();

  // Log a message
  const log = (message, options) => {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  const addMessageElement = (el, options) => {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }

    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
  }

  // Whenever the server emits 'login', log the login message
  socket.on('login', (data) => {
    // Display the welcome message
    var message = "Welcome to Socket.IO Chat – ";
    log(message, {
      prepend: true
    });
  });

  socket.on('result', (data) => {
    var datetime = new Date();
    datetime.setTime(data.message.time);
    var hour = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds();
    log('(' + hour + ') Result received! - Data:[' + data.message.data.toString() + ']');
  });

  socket.on('disconnect', () => {
    log('you have been disconnected');
  });

  socket.on('reconnect', () => {
    log('you have been reconnected');
  });

  socket.on('reconnect_error', () => {
    log('attempt to reconnect has failed');
  });

});
