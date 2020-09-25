(function (root) {
    function render(data) {
        var image = data.image,
            name = data.name,
            album = data.album,
            singer = data.singer,
            isLike = data.isLike;

        function init() {
            renderBgImg();
            renderImg();
            renderMusicInfo();
            renderIsLike();
        }
        init();

        //渲染图片
        function renderImg() {
            var img = document.querySelector('.songImg img');
            img.src = image;
        }

        //渲染图片
        function renderBgImg() {
            root.blurImg(image);
        }

        //渲染歌曲信息
        function renderMusicInfo() {
            var info = document.querySelector('.songInfo').children;
            info[0].innerHTML = name;
            info[1].innerHTML = singer;
            info[2].innerHTML = album;
        }

        //渲染是否喜欢歌曲
        function renderIsLike() {
            var like = document.querySelector('.control').children[0];
            if (isLike) {
                like.className = 'liked';
            } else {
                like.className = '';
            }
        }
    }

    root.render = render;
})(window.player || (window.player = {}));
