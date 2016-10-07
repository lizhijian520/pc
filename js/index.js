var oInput = document.getElementsByName("seaTxt");
var oDiv = document.getElementById('xx');
var oDiv2 = document.getElementById('hhd');

for(var i=0,len=oInput.length;i<len;i++){
    oInput[i].onfocus=showTips;
    oInput[i].onblur=hideTips;
}
function showTips(){
    oDiv.style.display = 'block';
    oDiv2.style.display = 'block';
    this.placeholder = '';
};
function hideTips(){
    oDiv.style.display = 'none';
    oDiv2.style.display = 'none';
};

//轮播
(function(){
    //获取元素
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var step=0;
    oBoxInner.innerHTML+='<div><img src="images/banner1.jpg" alt=""/></div>';
    utils.css(oBoxInner,'width',aDiv.length*aDiv[0].offsetWidth);
    //1.自动播放的轮播图
    var timer=null;
    clearInterval(timer);
    timer=setInterval(autoMove,1200);
    function autoMove(){
        //当我们走到最后一张后，其实看到的是第一张的替身，这个时候，快速的替换为真正的第一张；然后通过step++；再用运动过渡到第二张；
        if(step>=aDiv.length-1){
            step=0;
            utils.css(oBoxInner,'left',0);
            //animate(oBoxInner,{left:0},1000)
        }
        step++;//1 2 3 4
        //utils.css(oBoxInner,'left',-step*1000)//-1000  -2000 -3000 -4000
        animate(oBoxInner,{left:-step*715})
        bannerTip();
    }
    //2.焦点自动播放
    function bannerTip(){
        var tmpStep=step>=aLi.length?0:step;
        for(var i=0; i<aLi.length; i++){
            aLi[i].className=i==tmpStep?'on':null;
        }
    }
    //3.移入停止，移出继续
    oBox.onmouseover=function(){
        clearInterval(timer);
        utils.css(oBtnLeft,'display','block');
        utils.css(oBtnRight,'display','block');
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,2000);
        utils.css(oBtnLeft,'display','none');
        utils.css(oBtnRight,'display','none');
    };
    //4.点击按钮，手动切换焦点
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index;
                animate(oBoxInner,{left:-step*715});
                bannerTip();
            }
        }
    }
    //5.点击左右按钮进行切换
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(step<=0){
            step=aDiv.length-1;
            utils.css(oBoxInner,'left',-step*715);
        }
        step--;
        animate(oBoxInner,{left:-step*715});
        bannerTip();
    }
})();
/*搜索框*/
var oSearch=utils.getByClass("hiddenBar")[0];
document.documentElement.onscroll=document.body.onscroll=function(){
    var t = document.body.scrollTop||document.documentElement.scrollTop; 
    if(t>=this.innerHeight){
     animate(oSearch,{top:0});
    }else{
     animate(oSearch,{top:-300});
    }
}

var oType=utils.getByClass("type")[0];
oType.onmouseover=function(){
    this.getElementsByTagName("ol")[0].style.display="block";
}
oType.onmouseout=function(){
    this.getElementsByTagName("ol")[0].style.display="none";
}


var otypeBtn1=document.getElementById("typeBtn1");
var otypeOl1=document.getElementById("typeArea1");
var otypeBtn2=document.getElementById("typeBtn2");
var otypeOl2=document.getElementById("typeArea2");
otypeOl2.onclick=otypeOl1.onclick=function(ev){
    ev=ev||window.event;
    var oTar=ev.target||ev.srcElement;
    otypeBtn1.innerHTML="搜"+oTar.innerHTML;
    otypeBtn2.innerHTML="搜"+oTar.innerHTML;
}




















