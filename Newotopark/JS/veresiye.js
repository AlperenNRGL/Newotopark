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
    return `${dateFormat.hour}:${minute}&nbsp&nbsp  ${dateFormat.day}/${dateFormat.month}/${dateFormat.year}`
}

function showData(data) {

    document.getElementById("veresiye-list").innerHTML = "";
    for (let i = data.length - 1; i >= 0; i--) {
        document.getElementById("veresiye-list").innerHTML +=
            ` <div class="item" id ='item-${i}'>
                <p  class="plaka" >${data[i].plaka}</p>
                <p class="date" >${getDate(data[i].date)}</p>
                <p class="price">${data[i].price} ₺</p>
                <div class="button-group">
                    <button class="pay" onclick="veresiyeode('${i}','veresiye-ode')">Veresiye Öde</button>
                    <button class="delete" onclick="veresiyeode('${i}','veresiye-sil')">Veresiye Sil</button>
                </div>
            </div>
        `

    }
}


function focusinput(){
    document.getElementById("veresiye-input").focus();
}



showData(JSON.parse(localStorage.getItem("veresiye")))


document.getElementById("veresiye-input").addEventListener("keyup", (e) => {

    const inputData = document.getElementById("veresiye-input").value.toUpperCase();
    const data = JSON.parse(localStorage.getItem("veresiye"));

    var toplam = 0;

    document.getElementById("veresiye-list").innerHTML = "";
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].plaka.includes(inputData)) {
            document.getElementById("veresiye-list").innerHTML +=
                ` <div class="item" id ='item-${i}' >
                <p>${data[i].plaka}</p>
                <p>${getDate(data[i].date)}</p>
                <p>${data[i].price} ₺</p>
                <div class="button-group">
                    <button class="pay" onclick="veresiyeode('${i}','veresiye-ode')">Veresiye Öde</button>
                    <button class="delete" onclick="veresiyeode('${i}','veresiye-sil')">Veresiye Sil</button>
                </div>
            </div>
            `
            toplam += parseInt(data[i].price);
        }
    }
    document.getElementById("toplam").style.opacity = "0"
    if (inputData.length >= 3) veresiyetopla(toplam);
}
)


function veresiyetopla(toplam) {
    document.getElementById("toplam").style.opacity = "1"
    document.getElementById("toplam").innerHTML = `${toplam}₺` ;
}





function veresiyeode(i, style) {
    var data = JSON.parse(localStorage.getItem("veresiye"))

    var oldData = JSON.parse(localStorage.getItem("islemler"));
    var data2 = {
        "plaka": data[i].plaka,
        "date": Date.now(),
        "price": data[i].price,
        "islem": style,
    }
    oldData.push(data2);
    localStorage.setItem("islemler", JSON.stringify(oldData));


    data.splice(parseInt(i), 1)
    localStorage.setItem("veresiye", JSON.stringify(data));
    document.getElementById(`item-${i}`).remove();
}


