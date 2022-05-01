let num = [ [0,0], [75,0], [150,0], [225,0],
            [0,75], [75,75], [150,75], [225,75],
            [0,150], [75,150], [150,150], [225,150],
            [0,225], [75,225], [150,225], [225,225] ];
let win = true;

// randomly divides the picture into 16 parts
function newGame(){
    win = true;
    let num2 = [true,true,true,true,
                true,true,true,true,
                true,true,true,true,
                true,true,true,true,];
    let detals = $('.number');           
    let randomNum = () => Math.round(Math.random() * 16);
    let first = true;
    for (let i=0; i<detals.length; i++) {
        let k = randomNum();
        while(!num2[k] || first){
            k = randomNum();
            first = false;
        }
        detals.eq(i).css({
            backgroundPosition: `-${num[k][0]}px -${num[k][1]}px`,
            top: 0,
            left: 0});
        num2[k] = false;
    };
};

newGame();

// timer
let timerID;
let timerSecunds = 60;
function startTimer() { 
    timerID = setTimeout(function tick() {
        timerSecunds--;
        if (timerSecunds < 10) timerSecunds = '0' + timerSecunds;
        if (timerSecunds == '0-1') {
            clearTimeout(timerID);
            $('.modal-box').css('display', 'block');
            $('.modal').animate({
                marginTop: '100px',
            },500, 'easeOutBack');
            checkResult();
        }
        else {
            $('.h1').text(`00:${timerSecunds}`);
            if($('.btn-m-check').css('display') == 'inline-block'){
                $('h2').text(`You still have time, you sure? 00:${timerSecunds}`);
            }
            timerID = setTimeout(tick, 1000);
        }
    }, 1000);
};

let startGame = true;
$('.btn-start').on('click', function(){
    startTimer();
    this.disabled = true;
    this.classList.add('off');
    $('.btn-result')[0].disabled = false;
    $('.btn-result')[0].classList.remove('off');
    startGame = false;
});

$(document).ready(function(){
    $('.number').draggable({
        zIndex: 3,
        snap: 'td',
        snapMode: 'inner',
        snapTolerance: 40,
        start: function(){
            if(startGame){
                startTimer();
                $('.btn-start')[0].disabled = true;
                $('.btn-start')[0].classList.add('off');
                $('.btn-result')[0].disabled = false;
                $('.btn-result')[0].classList.remove('off');
                startGame = false;
            }
        }
    });
});

$('.btn-result').on('click', function(){
    $('.btn-m-check').css('display', 'inline-block');
    $('.modal-box').css('display', 'block');
    $('.modal').animate({
        marginTop: '100px',
    },500, 'easeOutBack');
});

$('.btn-new').on('click', function(){
    clearTimeout(timerID);
    newGame();
    $('.h1').text(`01:00`);
    timerSecunds = 60;
    $('.btn-start')[0].disabled = false;
    $('.btn-start')[0].classList.remove('off');
    $('.btn-result')[0].disabled = true;
    $('.btn-result')[0].classList.add('off');
    startGame = true;
}); 

$('.btn-m-close').on('click', function(){
    $('.modal').animate({
        marginTop: '0',
    },500, 'easeOutBack');
    setTimeout(function(){
        $('.modal-box').css('display', 'none');
    }, 100);
});

// check the result
function checkResult(){
    let detals = $('.number');
    let k = 4;
    const regExp = /\d{1,3}/;
    const regExpY = /[0-9-]{1,4}/;
    for (let i=0; i<detals.length; i++) {
        let y = Math.floor(i/4);
        if(detals.eq(i).css('backgroundPositionY').match(regExp)[0] != (parseInt(detals.eq(i).css('top').match(regExpY)[0]) + y * 75)) {
            win = false;
        }
        if(detals.eq(i).css('backgroundPositionX').match(regExp)[0] != (detals.eq(i).css('left').match(regExp)[0] - (k * 75 + 50))) {
            win = false;
        }
        k--;
        if(k==0) k=4;
    };
    clearTimeout(timerID);
    $('.btn-m-check').css('display', 'none');
    if(win){
        $('h2').text(`Woohoo, well done, you did it!`);
    }
    else{
        $('h2').text(`It's a pity, but you lost`);
    }
    $('.btn-result')[0].disabled = true;
    $('.btn-result')[0].classList.add('off');
};

$('.btn-m-check').on('click', function(){
    checkResult();
});

$('button').mouseover(function(){
    $(this).addClass('hover');
})
$('button').mouseout(function(){
    $(this).removeClass('hover');
});
$('button').click(function(){
    $(this).removeClass('hover');
});