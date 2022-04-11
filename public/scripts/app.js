// input time per hours
var selection = "";
var i = 0;
for (var i = 0; i < 23; i++) {
    var j = zeroFill(i, 2);
    selection += "<option value='" + j + "00'>" + j + ":00" + "</option>";
}
$("#timeSelect").html(selection);

function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + "";
}


// START HERE
const carlist = document.getElementById("carlist");
const searchCapacity = document.getElementById("searchCapacity");
const dateSelect = document.getElementById("dateSelect");
const timeSelect = document.getElementById("timeSelect");
const buttonSearch = document.getElementById("buttonSearch");

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


async function loadCarList() {
    const cars = await Binar.listCars();

    buttonSearch.addEventListener("click", function (e) {
        const time = timeSelect.value
        const date = dateSelect.value;
        const capacitysearch = searchCapacity.value;
        const filteredCars = cars.filter(car => {
            return (car.capacity >= capacitysearch && date >= formatDate(car.availableAt) && car.available === true);
        })
        if (filteredCars.length > 0) {
            displayCarList(filteredCars);
        }
        else {
            carlist.innerHTML = `<div>No car available</div>`;
        }
    })

    // WITHOUT BUTTON SEARCH
    // dateSelect.onchange = () => {
    //     const date = dateSelect.value;
    //     const filteredCars = cars.filter((car) => {
    //         return (date >= formatDate(car.availableAt) && car.available === true);
    //     })
    //     displayCarList(filteredCars);
    //     if (date === "") {
    //         displayCarList(cars);
    //     }
    // }

    // searchCapacity.addEventListener("keyup", function (e) {
    //     const capacitysearch = e.target.value;
    //     // console.log(capacitysearch)
    // const filterdCar = cars.filter(car => {
    //     return (car.capacity >= capacitysearch);
    // })
    //     // console.log(filterdCar)
    //     if (filterdCar.length > 0) {
    //         displayCarList(filterdCar);
    //     } else {
    //         alert("no car found");
    //     }
    // });
    // displayCarList(cars);
}

const displayCarList = (cars) => {
    const html = cars.map((car) => {
        return `
        <div>
            <div> id car : ${car.id}</div>
            <div> plate car : ${car.plate}</div>
            <div> rent car : ${car.rentPerDay}</div>
            <div style="color: red; font-weight: bold;">available : ${car.available}</div>
            <img src="${car.image}" alt="" width="250px">
            <div> model : ${car.model}</div>
            <div> manufcature : ${car.manufacture}</div>
            <div> model : ${car.model}</div>
            <div> capacity : ${car.capacity}</div>
            <div> available at : ${car.availableAt}</div>
            <div> description : ${car.description}</div>
        </div>
        <hr>
        `;
    }).join('')
    carlist.innerHTML = html;
}
loadCarList()