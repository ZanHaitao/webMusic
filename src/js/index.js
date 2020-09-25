(function (player, wraper) {
    function MyMusic() {
        this.nowIndex = 0;
        this.rotateTimer = null;
        this.wraper = wraper;
        this.progress = null;
    }

    MyMusic.prototype = {
        init: function () {
            this.getData();
            this.getDom();
            this.handle();
        },

        //获取数据
        getData: function () {
            var self = this;
            $.ajax({
                url: '../mock/data.json',
                method: 'get',
                success: function (data) {
                    self.musicData = data;
                    self.musicList = new player.listRender(data, self.wraper);
                    self.index = new player.index(data.length);
                    player.render(data[self.nowIndex]);
                    self.musicListInfo = self.musicList.render();
                    self.last = self.musicListInfo.musicList[0];
                    self.changeList();
                    self.load(self.nowIndex);
                },
            });
        },

        //获取元素
        getDom: function () {
            this.listBtn = document.querySelector('.control').children;
            this.rotateImg = document.querySelector('.songImg img');
            this.rotateImg.dataset.deg = 0;
            this.dragDom = document.querySelector('.circle');
            this.frontBg = document.querySelector('.frontBg');
        },

        //事件绑定
        handle: function () {
            var self = this;
            this.playDom = this.listBtn[2];

            player.audio.end(function () {
                self.progress.stop();
                self.index.next();
                player.audio.status = 'play';
                self.load(self.index.get());
            })

            for (var i = 0; i < this.listBtn.length; i++) {
                this.listBtn[i].dataset.index = i;
                this.listBtn[i].addEventListener('touchend', function () {
                    //上一曲
                    if (this.dataset.index == 1) {
                        self.progress.stop();
                        self.index.prev();
                        player.audio.status = 'play';
                        self.load(self.index.get());
                    }

                    //下一曲
                    if (this.dataset.index == 3) {
                        self.progress.stop();
                        self.index.next();
                        player.audio.status = 'play';
                        self.load(self.index.get());
                    }

                    //播放暂停
                    if (this.dataset.index == 2) {
                        if (player.audio.status === 'play') {
                            player.audio.pause();
                            player.audio.status = 'pause';
                            this.className = '';
                            self.stopRotate();
                            self.progress.stop();
                        } else {
                            player.audio.play();
                            player.audio.status = 'play';
                            this.className = 'playing';
                            self.rotate();
                            self.progress.start();
                        }
                    }

                    //歌曲列表
                    if (this.dataset.index == 4) {
                        self.musicList.slideUp();
                    }
                });
            }
        },

        changeList: function () {
            //列表切歌
            var self = this;
            this.musicListInfo.musicList.forEach(function (item, index) {
                item.addEventListener('touchend', function () {
                    if (index === self.index.get()) {
                        return;
                    }
                    self.changeActive(item, index);
                    self.musicList.slideDown();
                    player.audio.status = 'play';
                    self.progress.stop();
                    self.load(self.index.get());
                });
            });
        },

        changeActive: function (dom, index) {
            this.last && (this.last.className = '');
            dom.className = 'active';
            this.index.nowIndex = index;
            this.last = dom;
        },

        //加载播放
        load: function (index) {
            player.audio.load(this.musicData[index].audioSrc);
            player.render(this.musicData[index]);
            this.changeActive(this.musicListInfo.musicList[index], index);
            this.progress = player.progress.progress(this.musicData[index].duration);

            this.handleDrag();
            if (player.audio.status === 'play') {
                player.audio.play();
                this.listBtn[2].className = 'playing';
                this.rotateImg.dataset.deg = 0;
                this.rotate();
                this.progress.start();
            }
        },

        //歌曲信息旋转
        rotate: function () {
            if (this.rotateTimer) {
                return;
            }
            var deg = 0;
            var self = this;
            this.rotateTimer = setInterval(function () {
                deg = +self.rotateImg.dataset.deg + 0.4;
                self.rotateImg.style.transform = 'rotate(' + deg + 'deg)';
                self.rotateImg.dataset.deg = deg;
            }, 1000 / 60);
        },

        //停止旋转
        stopRotate: function () {
            clearInterval(this.rotateTimer);
            this.rotateTimer = null;
        },


        handleDrag: function () {
            this.drag = player.progress.drag(this.dragDom, this.frontBg);
            var self = this;

            this.drag.start = function () {
                player.audio.pause();
                player.audio.status = 'pause';
                self.playDom.className = '';
                self.stopRotate();
                self.progress.stop();
            }

            this.drag.move = function (scale) {
                player.audio.playTo(scale / 100 * self.musicData[self.index.nowIndex].duration);
                self.progress.changeNowProgress(scale / 100 * self.musicData[self.index.nowIndex].duration)
            }

            this.drag.end = function () {
                player.audio.play();
                player.audio.status = 'play';
                self.playDom.className = 'playing';
                self.rotate();
                self.progress.start();
            }
        }
    };
    var music = new MyMusic();
    music.init();
})(window.player || (window.player = {}), document.getElementById('app'));
