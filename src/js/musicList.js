(function (player) {
    function ListRender(data, wrap) {
        this.data = data;
        this.wrap = wrap;
    }

    ListRender.prototype = {
        render: function () {
            var listArr = [];
            var list = document.createElement('div');
            list.className = 'list';
            var title = document.createElement('div');
            title.className = 'title';
            title.innerText = '歌曲列表';
            var close = document.createElement('div');
            close.className = 'close';
            close.innerText = '关闭';
            var musicList = document.createElement('ul');
            musicList.className = 'content';
            this.data.forEach(function (item, index) {
                var li = document.createElement('li');
                li.innerText = item.name;
                index === 0 ? (li.className = 'active') : '';
                listArr.push(li);
                musicList.appendChild(li);
            });

            list.appendChild(title);
            list.appendChild(musicList);
            list.appendChild(close);
            this.wrap.appendChild(list);

            this.list = list;

            var self = this;
            close.addEventListener('touchend', function () {
                self.slideDown();
            });

            return {
                list: list,
                musicList: listArr,
            };
        },

        slideUp: function () {
            this.list.classList.add('show');
        },

        slideDown: function () {
            this.list.classList.remove('show');
        },
    };

    player.listRender = ListRender;
})(window.player || (window.player = {}));
