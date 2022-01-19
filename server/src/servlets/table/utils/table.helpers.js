exports.dataSanitizier = (data) => {
    let allData = [];
    let obj = data.products;
    for (const key in obj) {
        let tempArr = new Array();
        tempArr.push(parseInt(key));
        for (const k in obj[key]) {
            k == "price" || k == "popularity"
                ? tempArr.push(parseInt(obj[key][k]))
                : tempArr.push(obj[key][k]);
        }
        allData.push(tempArr);
    }
    obj = null;
    return allData;
};

exports.dataConverting = (myData) => {
    let allData = [];
    for (const key in myData)
        key == "price" || key == "popularity" || key == "id"
            ? allData.push(parseInt(myData[key]))
            : allData.push(myData[key]);
    return allData;
};

exports.currentTime = () => {
    const date = new Date();
    const todayDate = date.toISOString().slice(0, 10);
    const time = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    const formatedDate = todayDate + " " + time;
    return formatedDate;
};
