(function (player) {
    function MyAudio() {
        this.audio = new Audio();
        this.status = 'pause';
    }
    MyAudio.prototype = {
        load: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        end: function (fn) {
            this.audio.onended = fn;
        },
        playTo: function (time) {
            this.audio.currentTime = time;
        },
    };
    player.audio = new MyAudio();
})(window.player || (window.player = {}));
