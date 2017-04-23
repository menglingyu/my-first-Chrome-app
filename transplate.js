

$(function(){
    let X = 0;
    let Y = 0;
    $.fn.longPress = function(fn) {
        var timeout = undefined;
        var $this = this;
        for(var i = 0;i<$this.length;i++){
            $this[i].addEventListener('touchstart', function(event) {
                timeout = setTimeout(fn, 800);
                }, false);
            $this[i].addEventListener('touchend', function(event) {
                clearTimeout(timeout);
                }, false);
        }
    }
    function stopEvent(event){
     var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
     if (e && e.stopPropagation) {
     // for Mozilla and Opera
     e.stopPropagation();
     } else if (window.event) {
     // for IE
      window.event.cancelBubble = true;
     }
    }

    function mouseMove(ev)
    {
        ev= ev || window.event;
        const mousePos = mouseCoords(ev);

        //alert(ev.pageX);
        // document.getElementById("xxx").value = mousePos.x;
        // document.getElementById("yyy").value = mousePos.y;
        // console.log(`X:${mousePos.x},Y:${mousePos.y}`)
        return {
            X : mousePos.x,
            Y : mousePos.y
        }
    }

    function mouseCoords(ev)
    {
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        if (ev.changedTouches[0].clientX ||ev.changedTouches[0].clientY) {
            return {x:ev.changedTouches[0].clientX, y:ev.changedTouches[0].clientY};
        }
        return {
            x:ev.clientX + $("body").scrollLeft - $("body").clientLeft,
            y:ev.clientY + $("body").scrollTop - $("body").clientTop
        };
    }
    $(".content").on('touchstart', function(e){
        const mouseMoves = mouseMove();
        X1 = parseInt(`${mouseMoves.X}`);
        Y1 = parseInt(`${mouseMoves.Y}`);
        return
    })


    $('<div></div>', {
        id: 'explain'
    }).appendTo($('.content'));
    $("#explain").hide();

    $('.content').click(function(){
        $("#explain").fadeOut(300)
    })
    $('#explain').click(function(){
        stopEvent(event)
    })
    $('.content').longPress(function(event){
        // console.log(X1)
        function selectText(){
            if(document.selection){
                return document.selection.createRange().text;// IE
            }else{
                return  window.getSelection().toString(); //标准
            }
        }
        const word = selectText();
        $.ajax({
           url: `https://api.shanbay.com/bdc/search/?word=${word}`,
           type: "get",
           dataType: "json",
           success: function(data){
            const audioUrl = data.data.audio;
            if (data.msg == "SUCCESS") {
                const cn_definition = data.data.cn_definition.defn;
                const audio = data.data.audio_addresses.uk[0];
                $('#explain').show().html(`<p>${cn_definition}</p><div class="audio">发音<audio src=${audio}  controls="controls">您的浏览器不支持 audio 标签。</audio></div> `);
                const explainWidth = $('#explain').width() +20;
                const explainHeight = $('#explain').height()+20;
                const bodyWidth= $("body").width()
                // console.log(explainHeight)
                if (X1>bodyWidth/2/*&& X1+explainWidth <$(body).width()*/ ) {
                    /*上偏左*/

                    if (Y1-explainHeight>40) {
                        console.log("偏左上")
                        $("#explain").css({
                            "top":`${Y1-explainHeight-20}px`,
                            "left":`${X1-explainWidth-20}px`,
                        })
                    }
                    else{
                        console.log("偏左下")
                         $("#explain").css({
                            "top":`${Y1+20}px`,
                            "right":`${bodyWidth-X1}px`,
                        })
                    }
                }
                else if (X1<bodyWidth/2) {
                    if (Y1-explainHeight>40) {
                        console.log("偏右上")
                        $("#explain").css({
                            "top":`${Y1-explainHeight-25}px`,
                            "left":`${X1+40}px`,
                        })
                    }
                    else{
                        console.log("偏右下")
                        $("#explain").css({
                            "top":`${Y1+20}px`,
                            "left":`${X1+6}px`,
                        })
                    }
                }
            }
            else{
                $('#explain').show().html(`<p>${data.msg}</p><p>1</p>`)
            }
           },
           error: function(XMLHttpRequest, textStatus, errorThrown){
            $('#explain').show().html(`<p>单词不存在</p>`)
           }
        })



    }.bind(this,$(".content")));
})







