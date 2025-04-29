checkLS();
showData();


function loaded() {
    document.getElementById("plaka").focus();
}


document.getElementById("plaka").addEventListener("keyup", (e) => {

    changeInput(e);
})


function checkLS() {

    if (localStorage.getItem("islemler") == null) {
        localStorage.setItem("islemler", JSON.stringify([]))
    }
    if (localStorage.getItem("islemler-arsiv") == null) {
        localStorage.setItem("islemler-arsiv", JSON.stringify([]))
    }
    if (localStorage.getItem("otopark") == null) {
        localStorage.setItem("otopark", JSON.stringify([]))
    }
    if (localStorage.getItem("veresiye") == null) {
        localStorage.setItem("veresiye", JSON.stringify([]))
    }
}


function changeInput(e) {
    var data = getData();
    const inputData = document.getElementById("plaka").value.toUpperCase()



    if (e.key == "Enter") {

        if (inputData == "") return;


        const itemCount = document.getElementById("number-list").getElementsByClassName("item").length;

        if (itemCount > 0) {
            if (document.getElementById("popbox").classList.contains("activated")) {
                document.getElementById("exit-car").click();
            } else {
                document.getElementById("popbox").classList.add("activated");
                resetButtons();
                showpopBox();

            }



        } else {
            if (document.getElementById("checkbox").classList.contains("activated")) {
                document.getElementById("new-car-ok").click();

            } else {
                document.getElementById("checkbox").classList.add("activated");
                document.getElementById("checkbox-input").focus();
                resetButtons();
            }

        }




    } else if (e.key == "ArrowUp") {
        itemFocus("Up");
    }
    else if (e.key == "ArrowDown") {
        itemFocus("Down");
    } else if (e.key == "Escape") {
        closemodal();
    }
    else {
        document.getElementById("number-list").innerHTML = "";
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].plaka.includes(inputData)) {
                document.getElementById("number-list").innerHTML +=
                    `<div class="item  ${data[i].tip}" onclick="tıkla('${data[i].plaka}')"><div class="plate">${data[i].plaka}</div><div class="date">${getDate(data[i].date)}</div></div>`
            }

        }
        itemFocus()
    }
}

function resetButtons() {
    var element = document.getElementById("checkbox").querySelectorAll("button")
    element.forEach(e => {
        e.classList.remove("focus");
    })
    element[0].classList.add("focus");



    element = document.getElementById("popbox").querySelector("#buttonbox").querySelectorAll("button")
    console.log(element);
    element.forEach(e => {
        e.classList.remove("focus");
    })
    element[0].classList.add("focus");

}



function getData() {
    return JSON.parse(localStorage.getItem("otopark"));
}


function saveData(data) {
    localStorage.setItem("otopark", JSON.stringify(data));
}

function tıkla(e) {
    document.getElementById("plaka").value = e
    document.getElementById("popbox").classList.add("activated");

    resetButtons();
    showpopBox("tıkla");
    document.getElementById("pop-box-input").focus();


}

function closemodal() {
    document.getElementById("popbox").classList.remove("activated");
    document.getElementById("checkbox").classList.remove("activated");
    document.getElementById("plaka").value = ""
    showData();
    document.getElementById("plaka").focus();
}


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
    if (new Date().getDate() == dateFormat.day) {

        return `${dateFormat.hour}:${minute}`
    }
    return `${dateFormat.hour}:${minute} &nbsp  ${dateFormat.day}/${dateFormat.month}/${dateFormat.year}`
}


function addNofication(data) {
    console.log(data);
    // islem cıkıs
    // islem giris
    // islem veresiye
    const rnd = Math.random();
    const element = document.getElementById("nofication");
    element.innerHTML += `
        <div class="${data.islem}" id="${rnd}">
                ${data.plaka}
            </div>
        `
    setTimeout(() => { document.getElementById(rnd).remove() }, 4000)

}


function itemFocus(style) {


    const element = document.getElementById("number-list").getElementsByClassName("item");
    const elementactivated = document.getElementById("number-list").getElementsByClassName("item-activated")[0];
    const elementCount = element.length;



    if (style == "Up") {
        if (elementactivated.previousSibling) {
            elementactivated.classList.remove("item-activated")
            elementactivated.previousSibling.classList.add("item-activated")
        }
    } else if (style == "Down") {
        if (elementactivated.nextSibling) {
            elementactivated.classList.remove("item-activated")
            elementactivated.nextSibling.classList.add("item-activated")
        }
    } else {
        if (elementCount > 0) {
            element[0].classList.add("item-activated");
        } else {
            document.getElementById("number-list").innerHTML = `<div class="findOut">Araç Bulunamadı</div></div>`
        }
    }

}



function showData() {
    document.getElementById("number-list").innerHTML = "";
    const data = getData();
    for (let i = data.length - 1; i > -1; i--) {
        document.getElementById("number-list").innerHTML +=
            `<div class="item ${data[i].tip}" onclick="tıkla('${data[i].plaka}')"><div class="plate">${data[i].plaka}</div><div class="date">${getDate(data[i].date)}</div></div>`
    }
    document.getElementById("liste_count").innerHTML = data.length;
    itemFocus();
}


function addCore(data) {

    var oldData = JSON.parse(localStorage.getItem("islemler"));
    data["date"] = new Date();
    oldData.push(data);
    localStorage.setItem("islemler", JSON.stringify(oldData));
}


function newCar(style) {
    oldData = getData();
    var newData = {
        plaka: document.getElementById("plaka").value.toUpperCase(),
        tip: style,
        date: Date.now(),
    }
    console.log(newData);

    oldData.push(newData);
    saveData(oldData);

    newData["islem"] = "giris";
    addCore(newData);

    closemodal();
    showData();
    addNofication(newData);
    document.getElementById("plaka").value = "";
    return newData;
}


function newCarwithFis(style) {
    var data = newCar(style);
    fisyazdir(data.plaka);
}

var veresiyeToplam = 0;
function showpopBox(style) {
    document.getElementById("pop-box-input").focus();
    if (style != "tıkla") {
        const element = document.getElementById("number-list").getElementsByClassName("item-activated")[0];
        element.click();
    }
    const inputData = document.getElementById("plaka").value.toUpperCase()
    data = getData()
    thisCar = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].plaka == inputData) {
            thisCar = data[i];
            id = i;
            break;
        }
    }
    const old = Date.now() - thisCar.date;
    var day = Math.floor(old / (1000 * 60 * 60 * 24))
    var minute = Math.floor(old / (1000 * 60))
    var hour = Math.floor(old / (1000 * 60 * 60))
    document.getElementById("value").innerHTML = `<h1>${thisCar.plaka}</h1>
                        
                        <h2>Giriş Saati : ${getDate(thisCar.date)}</h2>
                        <h2>Çıkış Saati : ${getDate(new Date())}</h2>
                        <h2>Geçen Süre : ${day} Gün ${hour % 24} Saat ${minute % 60} Dakika</h2>`

    document.getElementById("price").value = priceController(day, hour % 24, minute, thisCar.tip);

    document.getElementById("price").style.color = "black";
    if (((minute % 60) < 6 ) && document.getElementById("price").value < 180) {
        document.getElementById("price").style.color = "red";
        // document.getElementById("price").value -= 30; //? Fiyat Düşürme
    }

    veresiyeToplam = 0;
    const veresiyeData = JSON.parse(localStorage.getItem("veresiye"));
    document.getElementById("veresiye-list").innerHTML = "";

    for (let i = 0; i < veresiyeData.length; i++) {
        if (veresiyeData[i].plaka == inputData) {
            veresiyeToplam += parseInt(veresiyeData[i].price);
            // document.getElementById("veresiye-list").innerHTML +=
            //     `
            //     <p>Veresiye Ücreti ${veresiyeData[i].price} ₺ ${getDate(veresiyeData[i].date)}</p>
            // `
        }
    }

    if (veresiyeToplam > 0) {
        document.getElementById("veresiye-list").style.display = "block"
        document.getElementById("veresiye-list").innerHTML += `<p style="font-weight: bold;" >Toplam Ücret : <span id="totalveresiye">${veresiyeToplam + parseInt(document.getElementById("price").value)}</span>₺</p>`
        document.getElementById("veresiye-list").innerHTML += `<button class="totalexit" id="total-exit-car" onclick="totalexitcar('totalcıkıs')">Toplam Ücret Çıkış Yap</button>`
    } else {
        document.getElementById("veresiye-list").style.display = "none"
    }

}

document.getElementById("price").addEventListener("keyup", (e) => {
    const newPrice = parseInt(e.target.value);
    var totalVeresiye = document.getElementById("totalveresiye")

    if (isNaN(newPrice)) {
        totalVeresiye.innerHTML = veresiyeToplam
    } else {
        totalVeresiye.innerHTML = veresiyeToplam + newPrice
    }

})



document.getElementById("checkbox-input").addEventListener("keyup", (e) => {
    const element = document.getElementById("checkbox");
    if (e.key == "Enter") {
        element.querySelector(".focus").click();
    }
    else if (e.key == "ArrowRight" && element.querySelector(".focus").nextElementSibling) {
        var old = element.querySelector(".focus");
        element.querySelector(".focus").nextElementSibling.classList.add("focus")
        old.classList.remove("focus");
    }
    else if (e.key == "ArrowLeft" && element.querySelector(".focus").previousElementSibling) {
        var old = element.querySelector(".focus");
        element.querySelector(".focus").previousElementSibling.classList.add("focus")
        old.classList.remove("focus");
    } else if (e.key == "Escape") {
        closemodal();
    }
})


document.getElementById("pop-box-input").addEventListener("keyup", (e) => {


    const element = document.getElementById("popbox").querySelector("#buttonbox")

    if (e.key == "Enter") {
        element.querySelector(".focus").click();
    }
    else if (e.key == "ArrowRight" && element.querySelector(".focus").nextElementSibling) {
        var old = element.querySelector(".focus");
        element.querySelector(".focus").nextElementSibling.classList.add("focus")
        old.classList.remove("focus");
    }
    else if (e.key == "ArrowLeft" && element.querySelector(".focus").previousElementSibling) {
        var old = element.querySelector(".focus");
        element.querySelector(".focus").previousElementSibling.classList.add("focus")
        old.classList.remove("focus");
    } else if (e.key == "Escape") {
        closemodal();
    }
})


function deleteCar() {
    const inputData = document.getElementById("plaka").value.toUpperCase()
    data = getData()
    var oldData;
    for (let i = 0; i < data.length; i++) {
        if (data[i].plaka == inputData) {
            oldData = data.splice(i, 1);
            break;
        }
    }

    oldData[0]["islem"] = "delete";
    addCore(oldData[0]);

    saveData(data);
    closemodal()
    showData();
    document.getElementById("plaka").value = ""
}

function totalexitcar(style) {
    const inputData = document.getElementById("plaka").value.toUpperCase()
    var data = JSON.parse(localStorage.getItem("veresiye"));
    for (let i = 0; i < data.length; i++) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].plaka == inputData) {
                data.splice(i, 1);
                break;
            }
        }
    }
    localStorage.setItem("veresiye", JSON.stringify(data));
    exitcar("totalcıkıs");
}

function fisyazdir(plaka) {
    var inputData = ""
    if (plaka) {
        inputData = plaka
    } else {
        inputData = document.getElementById("plaka").value.toUpperCase()
    }

    data = getData()
    thisCar = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].plaka == inputData) {
            thisCar = data[i];
            id = i;
            break;
        }
    }



    localStorage.setItem("fis", JSON.stringify(thisCar));
    closemodal();
    window.open("HTML/fis.html", '_blank');
}



function exitcar(islem) {

    const inputData = document.getElementById("plaka").value.toUpperCase()
    data = getData()
    var oldData;
    for (let i = 0; i < data.length; i++) {
        if (data[i].plaka == inputData) {
            oldData = data.splice(i, 1);
            break;
        }
    }



    if (islem == "veresiye") {
    } else if (islem == "totalcıkıs") {
        oldData[0]["islem"] = "totalcıkıs";
        oldData[0]["price"] = document.getElementById("totalveresiye").innerHTML;
        addCore(oldData[0]);
    }
    else {
        oldData[0]["islem"] = "cıkıs";
        oldData[0]["price"] = document.getElementById("price").value;
        addCore(oldData[0]);
        addNofication(oldData[0]);
    }

    saveData(data);
    closemodal()
    showData()

    document.getElementById("plaka").value = ""
}


function veresiyecar() {
    const inputData = document.getElementById("plaka").value.toUpperCase()

    var data = {
        "plaka": inputData,
        "date": Date.now(),
        "price": document.getElementById("price").value
    }

    var oldData = JSON.parse(localStorage.getItem("veresiye"));
    oldData.push(data);
    localStorage.setItem("veresiye", JSON.stringify(oldData));

    data["islem"] = "veresiye";
    addCore(data);
    exitcar("veresiye");
    addNofication(data);
}







function priceController(day, hour, minute, type) {
    var price = 0;
    if (type == "taksi") {
        if (day > 0) {
            price = day * 200;
        }
        switch (hour) {
            case 0: price += 70; break;
            case 1: price += 100; break;
            case 2: price += 130; break;
            case 3: price += 160; break;
            case 4: price += 190; break;
            default: price += 200; break;
        }



    } else {
        if (day > 0) {
            price = day * 280;
        }
        switch (hour) {
            case 0: price += 100; break;
            case 1: price += 140; break;
            case 2: price += 180; break;
            case 3: price += 220; break;
            case 4: price += 260; break;
            default: price += 280; break;
        }
    }

    return price;
}

