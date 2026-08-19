let guess=50;
let low=1;
let high=100;

const guessElement=document.getElementById("guess");
const rangeElement=document.getElementById("range");
const statusElement=document.getElementById("status");

const buttons=document.querySelectorAll("button");

function update(){
    guessElement.textContent=guess;
    rangeElement.textContent=`範圍：${low} ~ ${high}`;
}

buttons[0].addEventListener("click",function(){
    low=guess+1;
    guess=Math.floor((low+high)/2);
    statusElement.textContent="答案比較大";
    update();
});

buttons[1].addEventListener("click",function(){
    high=guess-1;
    guess=Math.floor((low+high)/2);
    statusElement.textContent="答案比較小";
    update();
});

buttons[2].addEventListener("click",function(){
    statusElement.textContent="猜中了！";
});

update();
