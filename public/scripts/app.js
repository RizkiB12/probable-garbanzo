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
        <div class="col-md-4">
        <div class="card">
          <img src="${car.image}" class="card-img-top" alt="gambar mobil">
          <div class="card-body">
            <h6 class="card-text">${car.manufacture}-${car.model}</h6>
            <h5 class="card-title">${car.rentPerDay}</h5>
            <p class="card-text">${car.description}</p>
            <p><img src="/images/fi_users.svg" alt="user"> ${car.capacity}</p>
            <p><img src="/images/fi_settings.svg" alt="settings"> ${car.transmission}</p>
            <p><img src="/images/fi_calendar.svg" alt="calender"> ${car.year}</p>
            <a href="#" class="btn btn-success">Pilih Mobil</a>
          </div>
        </div>
      </div>`;
    }).join('')
    carlist.innerHTML = html;
}
loadCarList()