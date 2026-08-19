let dp0=new Map();

let ans=0;
let t=0;
let should=0;
let cost=0;
let re=0;
let can=true;

fetch("nosure_dp.txt")
    .then(response=>{
        if(!response.ok){
            throw new Error("DP檔案讀取失敗");
        }
        return response.text();
    })
    .then(text=>{
        console.log("DP檔案讀取成功");

        const lines=text.trim().split(/\r?\n/);
        let index=0;

        const type=lines[index++].trim();

        if(type!=="DP0"){
            throw new Error("DP檔案格式錯誤");
        }

        const n=Number(lines[index++]);

        for(let i=0;i<n;i++){
            const [key,val]=lines[index++].trim().split(/\s+/).map(Number);
            dp0.set(key,val);
        }

        console.log("DP0載入完成：",dp0.size);

        window.dpLoaded=true;
    })
    .catch(error=>{
        console.error(error);
    });

function startGame(range){
    if(!window.dpLoaded){
        alert("DP檔案還沒載入完成，請稍等一下再開始");
        return;
    }

    t=range;
    ans=Math.floor(Math.random()*(t-1))+1;

    should=dp0.get(t);

    if(should===undefined){
        alert("找不到這個範圍的DP資料");
        return;
    }

    cost=0;

    if(t===20){
        re=35;
    }else if(t===50){
        re=25;
    }else if(t===100){
        re=20;
    }else{
        re=15;
    }

    can=true;

    document.getElementById("menu").style.display="none";
    document.getElementById("game").style.display="block";

    document.getElementById("range").textContent="範圍：0 ~ "+t;
    document.getElementById("status").textContent="在 "+should+" 步內一定猜得出來";
    document.getElementById("result").textContent="";
    document.getElementById("cost").textContent="";

    document.getElementById("history").innerHTML="";

    document.getElementById("restart").style.display="none";

    const input=document.getElementById("input");
    input.value="";
    input.disabled=false;
    input.focus();
}

function guess(){
    const input=document.getElementById("input");
    const guess=Number(input.value);

    if(!Number.isInteger(guess)){
        return;
    }

    if(guess<1 || guess>=t){
        document.getElementById("result").textContent="請輸入範圍內的數字";
        return;
    }

    cost++;

    if(guess===ans){
        document.getElementById("result").textContent="答案就是 "+ans+"！";
        document.getElementById("cost").textContent="總共花了 "+cost+" 步";

        addHistory(cost,guess,"猜中了");

        if(cost<=should){
            document.getElementById("status").textContent="挑戰成功";
        }else{
            document.getElementById("status").textContent="挑戰失敗";
        }

        input.disabled=true;
        document.getElementById("restart").style.display="block";
        return;
    }

    let response="";

    if(can){
        const ttt=Math.floor(Math.random()*100)+1;

        if(ttt<=re){
            can=false;

            if(guess<ans){
                response="答案比 "+guess+" 小";
            }else{
                response="答案比 "+guess+" 大";
            }
        }else{
            re+=10;

            if(guess<ans){
                response="答案比 "+guess+" 大";
            }else{
                response="答案比 "+guess+" 小";
            }
        }
    }else{
        if(guess<ans){
            response="答案比 "+guess+" 大";
        }else{
            response="答案比 "+guess+" 小";
        }
    }

    document.getElementById("result").textContent=response;

    addHistory(cost,guess,response);

    input.value="";
    input.focus();
}

function addHistory(number,guess,response){
    const history=document.getElementById("history");

    const item=document.createElement("p");
    item.textContent="第 "+number+" 次：猜 "+guess+" → "+response;

    history.appendChild(item);
}

function restartGame(){
    document.getElementById("game").style.display="none";
    document.getElementById("menu").style.display="block";
}
