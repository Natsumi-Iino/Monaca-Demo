// This is a JavaScript file

$(function() {
        var canvas = $('#canvas')[0];
        var context = canvas.getContext('2d');
        var start = {}, color = 'red';
        init();
        function init() {
            // 画面にサイズを合わせる
            var rect = document.body.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            // 線のスタイルを設定する
            context.lineWidth = 7;
            context.lineJoin = 'round';
            context.lineCap = 'round';
        }
        $('canvas').on('touchstart', function(event) {
            start = getCanvasPoint(event.originalEvent.touches[0]);
        });
        $('canvas').on('touchmove', function(event) {
            var end = getCanvasPoint(event.originalEvent.touches[0]);
            // colorを設定して描画する
            context.strokeStyle = color;
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.stroke();
            // 次の開始位置を変数に入れてメモしておく
            start = end;
            event.preventDefault();
        });
        $('.painter-menu-item').on('touchstart', function() {
            if ($(this).hasClass('painter-menu-item-delete')) {
                clearCanvas();
            } else {
                $('.painter-menu-item').removeClass('active');
                $(this).addClass('active');
                color = $(this).attr('data-color');
            }
        });
        // 画面のx,y座標からcanvasのx,y座標に変換する
        function getCanvasPoint(screenXY) {
            var base = canvas.getBoundingClientRect();
            return {
                x: screenXY.pageX - base.left,
                y: screenXY.pageY - base.top
            };
        }
        // キャンバスを消す
        function clearCanvas() {
            setTimeout(function() {
                if (confirm('描いた絵を消しますか?')) {
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                }
            }, 100);
        }
        $(window).on('orientationchange', function() {
            setTimeout(init, 100);
        });
    });