<!doctype html>
<html lang="en">
<head>
    <title>Websocket ChatRoom</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/webjars/bootstrap/4.3.1/dist/css/bootstrap.min.css">
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
<div class="container" id="app" v-cloak>
    <div>
        <h2>{{roomId}}</h2>
    </div>
    <div class="input-group">
        <div class="input-group-prepend">
            <label class="input-group-text">내용</label>
        </div>
        <input type="text" class="form-control" v-model="message" v-on:keypress.enter="sendMessage">
        <div class="input-group-append">
            <button class="btn btn-primary" type="button" @click="sendMessage">보내기</button>
        </div>
    </div>
    <ul class="list-group">
        <li class="list-group-item" v-for="message in messages">
            {{message.senderNickname}} - {{message.message}}</a>
        </li>
    </ul>
    <div></div>
</div>
<!-- JavaScript -->
<script src="/webjars/vue/2.5.16/dist/vue.min.js"></script>
<script src="/webjars/axios/0.17.1/dist/axios.min.js"></script>
<script src="/webjars/sockjs-client/1.1.2/sockjs.min.js"></script>
<script src="/webjars/stomp-websocket/2.3.3-1/stomp.min.js"></script>
<script>
    //alert(document.title);
    // websocket & stomp initialize
    var sock = new SockJS("/v1/chat/ws-stomp");
    var ws = Stomp.over(sock);
    var reconnect = 0;
    // vue.js
    var vm = new Vue({
        el: '#app',
        data: {
            roomId: '',
            senderId: 0,
            senderNickname: '',
            sender: '',
            message: '',
            messages: []
        },
        created() {
            this.roomId = localStorage.getItem('wschat.roomId');
            this.sender = localStorage.getItem('wschat.sender');
            this.senderId = localStorage.getItem('wschat.senderId');
            this.senderNickname = localStorage.getItem('wschat.senderNickname');
        },
        methods: {
            sendMessage: function() {
                ws.send("/pub/message", {Authorization: "Bearer " + this.sender}, JSON.stringify({roomId:this.roomId, senderId:this.senderId, senderNickname:this.senderNickname, message:this.message}));
                this.message = '';
            },
            recvMessage: function(recv) {
                this.messages.unshift({"senderId":recv.senderId, "senderNickname":recv.senderNickname, "message":recv.message})
            }
        }
    });

    function connect() {
        // pub/sub event
        ws.connect({Authorization: "Bearer " + vm.$data.sender}, function(frame) {
            ws.subscribe("/sub/room/"+vm.$data.roomId, function(message) {
                var recv = JSON.parse(message.body);
                console.log(recv);
                vm.recvMessage(recv);
            }, {Authorization: "Bearer " + vm.$data.sender});
        }, function(error) {
            if(reconnect++ < 5) {
                setTimeout(function() {
                    // console.log("connection reconnect");
                    sock = new SockJS("/v1/chat/ws-stomp");
                    ws = Stomp.over(sock);
                    connect();
                },10*1000);
            }
        });
    }
    connect();
</script>
</body>
</html>