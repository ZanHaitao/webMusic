!function(n){function e(n){this.nowIndex=0,this.len=n}e.prototype={get:function(){return this.nowIndex},prev:function(){return this.checked(-1)},next:function(){return this.checked(1)},checked:function(n){return this.nowIndex=(this.nowIndex+n+this.len)%this.len}},n.index=e}(window.player||(window.player={}));