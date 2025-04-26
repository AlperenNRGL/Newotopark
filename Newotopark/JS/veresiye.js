

function getDate(date) {
    newDate = new Date(date);

    minute = 0;
    if (newDate.getMinutes() < 10) {
        minute = 0 + String(newDate.getMinutes())
    } else {
        minute = String(newDate.getMinutes());
    }

    dateFormat = {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
        hour: newDate.getHours(),
        minute: newDate.getMinutes(),
    }
    return `${dateFormat.hour}:${minute}  ${dateFormat.day}/${dateFormat.month}/${dateFormat.year}`
}

function showData(data) {

    document.getElementById("veresiye-list").innerHTML = "";
    for (let i = data.length -1; i >= 0; i--) {
        document.getElementById("veresiye-list").innerHTML +=
            ` <div class="item" id ='item-${i}'>
                <p  class="plaka" >${data[i].plaka}</p>
                <p class="date" >${getDate(data[i].date)}</p>
                <p class="price">${data[i].price} ₺</p>
                <div class="button-group">
                    <button class="pay" onclick="veresiyeode('${i}')">Veresiye Öde</button>
                </div>
            </div>
        `

    }
}





showData(JSON.parse(localStorage.getItem("veresiye")))


document.getElementById("veresiye-input").addEventListener("keyup", (e) => {
    const inputData = document.getElementById("veresiye-input").value.toUpperCase();
    const data = JSON.parse(localStorage.getItem("veresiye"));
    document.getElementById("veresiye-list").innerHTML = "";
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].plaka.includes(inputData)) {
            document.getElementById("veresiye-list").innerHTML +=
                ` <div class="item" id ='item-${i}' >
                <p>${data[i].plaka}</p>
                <p>${getDate(data[i].date)}</p>
                <p>${data[i].price} ₺</p>
                <div class="button-group">
                    <button class="pay" onclick="veresiyeode('${i}')">Veresiye Öde</button>
                </div>
            </div>
        `
        }
    }
}
)





function veresiyeode(i) {
    var data = JSON.parse(localStorage.getItem("veresiye")) 
    
    var oldData = JSON.parse(localStorage.getItem("islemler"));
    var data2 = {
        "plaka": data[i].plaka,
        "date": Date.now(),
        "price":data[i].price ,
        "islem" : "veresiye",
    }
    console.log(data2);
    oldData.push(data2);
    localStorage.setItem("islemler", JSON.stringify(oldData));


    data.splice(parseInt(i), 1)
    localStorage.setItem("veresiye", JSON.stringify(data));
    document.getElementById(`item-${i}`).remove();




}

