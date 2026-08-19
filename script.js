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
        console.log(text.slice(0,500));
    })
    .catch(error=>{
        console.error(error);
    });
