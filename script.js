let dp0=new Map();

let ans=0;
let t=0;
let should=0;
let cost=0;
let lieStep=0;
let currentInput="";

const lieRates={
    20:[20,20,20,20,20],
    50:[17,17,16,16,17,17],
    100:[15,14,14,14,14,14,15],
    200:[13,13,12,12,12,12,13,13]
};

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
    currentInput="";

    lieStep=getLieStep(range);

    document.getElementById("menu").style.display="none";
    document.getElementById("game").style.display="block";

    document.getElementById("range").textContent="範圍：0 ~ "+t;
    document.getElementById("status").textContent="在 "+should+" 步內一定猜得出來";
    document.getElementById("result").textContent="";
    document.getElementById("cost").textContent="";
    document.getElementById("history").innerHTML="";
    document.getElementById("end").style.display="none";
    document.getElementById("inputDisplay").textContent="0";
}

function getLieStep(range){
    const rates=lieRates[range];
    const random=Math.random()*100;
    let sum=0;

    for(let i=0;i<rates.length;i++){
        sum+=rates[i];

        if(random<sum){
            return i+1;
        }
    }

    return rates.length;
}

function pressNumber(number){
    if(document.getElementById("end").style.display!=="none"){
        return;
    }

    if(currentInput==="0"){
        currentInput="";
    }

    currentInput+=number;
    updateInputDisplay();
}

function deleteNumber(){
    if(document.getElementById("end").style.display!=="none"){
        return;
    }

    currentInput=currentInput.slice(0,-1);

    if(currentInput===""){
        currentInput="0";
    }

    updateInputDisplay();
}

function updateInputDisplay(){
    document.getElementById("inputDisplay").textContent=currentInput;
}

function guess(){
    if(currentInput===""){
        return;
    }

    const guess=Number(currentInput);

    if(!Number.isInteger(guess)){
        return;
    }

    if(guess<1 || guess>=t){
        document.getElementById("result").textContent="請輸入範圍內的數字";
        currentInput="";
        updateInputDisplay();
        return;
    }

    cost++;

    if(guess===ans){
        addHistory(cost,guess,"猜中了");

        document.getElementById("result").textContent="答案就是 "+ans+"！";
        document.getElementById("cost").textContent="總共花了 "+cost+" 步";

        if(cost<=should){
            document.getElementById("status").textContent="挑戰成功";
            document.getElementById("endResult").textContent="挑戰成功！";
        }else{
            document.getElementById("status").textContent="挑戰失敗";
            document.getElementById("endResult").textContent="挑戰失敗！";
        }

        document.getElementById("end").style.display="block";

        currentInput="";
        updateInputDisplay();

        return;
    }

    let response="";
    const isLie=cost===lieStep;

    if(isLie){
        if(guess<ans){
            response="答案比 "+guess+" 小";
        }else{
            response="答案比 "+guess+" 大";
        }
    }else{
        if(guess<ans){
            response="答案比 "+guess+" 大";
        }else{
            response="答案比 "+guess+" 小";
        }
    }

    document.getElementById("result").textContent=response;

    addHistory(cost,guess,response,isLie);

    currentInput="";
    updateInputDisplay();
}

function addHistory(number,guess,response,isLie=false){
    const history=document.getElementById("history");

    const item=document.createElement("p");
    item.textContent="第 "+number+" 次：猜 "+guess+" → "+response;

    if(isLie){
        item.classList.add("lie");
    }

    history.insertBefore(item,history.firstChild);
}

function restartGame(){
    document.getElementById("game").style.display="none";
    document.getElementById("menu").style.display="block";
}
