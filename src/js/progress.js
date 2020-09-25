(function (root) {

  function Progress(duration) {
    this.progressTimer = null;
    this.duration = duration;
    this.init();
  }

  Progress.prototype = {
    init: function () {
      this.initDom();
      this.render();
    },
    initDom: function () {
      this.curTime = document.querySelector('.curTime');
      this.endTime = document.querySelector('.endTime');
      this.circle = document.querySelector('.circle');
      this.frontBg = document.querySelector('.frontBg');
    },
    render: function () {
      var minutes = parseInt(this.duration / 60) + '';
      var seconds = (this.duration % 60) + '';
      this.endTime.innerHTML = minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
    },
    start: function () {
      var self = this;
      if (!this.progressTimer) {
        this.progressTimer = setInterval(function () {
          console.log('1');
          self.changeNowProgress(player.audio.audio.currentTime)
        }, 1000 / 60)
      }

    },
    stop: function () {
      clearInterval(this.progressTimer)
      this.progressTimer = null;
    },
    changeNowProgress: function (currentTime) {
      var currentTime = parseInt(currentTime)
      var minutes = parseInt(currentTime / 60) + '';
      var seconds = (currentTime % 60) + '';
      var time = minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');
      var scale = currentTime / this.duration * 100;
      var l = currentTime / this.duration * this.circle.parentNode.offsetWidth;
      if (this.curTime.innerHTML !== time) {
        this.curTime.innerHTML = time;
        this.frontBg.style.width = scale + '%';
        this.circle.style.left = l + 'px';
      }
    }
  }

  function Drag(drag, frontBg) {
    this.drag = drag;
    this.frontBg = frontBg;
    this.startX = 0;
    this.leftX = 0;
    this.disX = 0;
    this.init();
  }

  Drag.prototype = {
    init: function () {
      var self = this;
      this.drag.style.left = '0px';
      this.drag.addEventListener('touchstart', function (e) {
        self.startX = e.changedTouches[0].pageX;
        self.leftX = parseFloat(this.style.left)

        self.start && self.start();
      })
      this.drag.addEventListener('touchmove', function (e) {
        self.disX = e.changedTouches[0].pageX - self.startX;
        var l = self.disX + self.leftX;
        if (l < 0) {
          l = 0
        } else if (l > self.drag.parentNode.offsetWidth) {
          l = self.drag.parentNode.offsetWidth;
        }
        self.drag.style.left = l + 'px';
        var scale = l / self.drag.parentNode.offsetWidth * 100;
        self.frontBg.style.width = scale + '%';

        self.move && self.move(scale);
      })
      this.drag.addEventListener('touchend', function (e) {
        self.end && self.end();
      })
    }
  }

  function initProgress(duration) {
    return new Progress(duration)
  }

  function initDrag(dom, frontBg) {
    return new Drag(dom, frontBg)
  }

  root.progress = {
    progress: initProgress,
    drag: initDrag
  }
})(window.player || (window.player = {}))