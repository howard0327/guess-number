fetch("nosure_dp.txt")
    .then(response=>{
        if(!response.ok){
            throw new Error("DP檔案讀取失敗");
        }
        return response.text();
    })
    .then(text=>{
        console.log("DP檔案讀取成功");
        console.log("檔案大小：",text.length);

        const lines=text.trim().split(/\r?\n/);

        console.log("總行數：",lines.length);
        console.log("前10行：");
        console.log(lines.slice(0,10));

        const dp0=lines[0];
        const value=Number(lines[1]);

        console.log("DP名稱：",dp0);
        console.log("第一個數值：",value);

        const data=lines.slice(2).map(line=>{
            const [a,b]=line.trim().split(/\s+/).map(Number);
            return [a,b];
        });

        console.log("資料筆數：",data.length);
        console.log("前10筆資料：",data.slice(0,10));
    })
    .catch(error=>{
        console.error(error);
    });
