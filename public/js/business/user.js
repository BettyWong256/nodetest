function userMainH(){
    var height = window.innerHeight;
    $('.user-main').css('min-height',height-180+'px');
}



$(function(){
    userMainH();
})

window.onresize = function(){
    userMainH();
}