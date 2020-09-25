(function (player) {
    function Index(len) {
        this.nowIndex = 0;
        this.len = len;
    }
    Index.prototype = {
        get: function () {
            return this.nowIndex;
        },
        prev: function () {
            return this.checked(-1);
        },
        next: function () {
            return this.checked(1);
        },
        checked: function (num) {
            return (this.nowIndex = (this.nowIndex + num + this.len) % this.len);
        },
    };
    player.index = Index;
})(window.player || (window.player = {}));
