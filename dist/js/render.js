!function(m){m.render=function(e){var n,r=e.image,i=e.name,o=e.album,c=e.singer,l=e.isLike;m.blurImg(r),document.querySelector(".songImg img").src=r,(n=document.querySelector(".songInfo").children)[0].innerHTML=i,n[1].innerHTML=c,n[2].innerHTML=o,document.querySelector(".control").children[0].className=l?"liked":""}}(window.player||(window.player={}));