$(function() {
    //Variables
    var socket = io();
    var nickInput = $('.usernameInput');
    var signInput = $('.signInput');
    var loginPage = $('.login-form');
    var gamePage = $('.gameWrap');
    var nickname;
    var sign;

    //Create username
    socket.on('connect', function(data){
        function setUsername () {
            nickname = nickInput.val();
            sign = signInput.val();
            // If the username is valid
            if (nickname && sign) {
                loginPage.fadeOut();
                socket.emit('join', nickname, sign);
                gamePage.show();
            }
        }
        signInput.on('keydown',function (event) {
            // When the client hits ENTER on their keyboard
            if (event.which === 13) {
                setUsername();
            }
        });
    });
});