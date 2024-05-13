<!doctype html>
<html lang="en">
<head>
    <title>Websocket Chat</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- CSS -->
    <link rel="stylesheet" href="/webjars/bootstrap/4.3.1/dist/css/bootstrap.min.css">
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
<div class="container" id="app" v-cloak>
    <div class="row">
        <div class="col-md-12">
            <h3>채팅방 테스트</h3>
        </div>
    </div>
    <button v-on:click="enterRoom">채팅방 입장</button>
</div>
<!-- JavaScript -->
<script src="/webjars/vue/2.5.16/dist/vue.min.js"></script>
<script src="/webjars/axios/0.17.1/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        methods: {
            enterRoom: function() {
                var roomId = prompt('roomId를 입력해주세요.');
                var sender = prompt('Access Token을 입력해 주세요.');
                var senderId = prompt('userId를 입력해 주세요.');
                var senderNickname = prompt('닉네임을 입력해 주세요.');
                localStorage.setItem('wschat.roomId', roomId);
                localStorage.setItem('wschat.sender', sender);
                localStorage.setItem('wschat.senderId', senderId);
                localStorage.setItem('wschat.senderNickname', senderNickname);
                location.href="/chat/room/enter/"+roomId;
            }
        }
    });
</script>
</body>
</html>