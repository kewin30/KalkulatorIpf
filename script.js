const switchEl = document.getElementById("switch");
const imieL = document.getElementById("imieINazwiskoL");
const wagaL = document.getElementById("wagaL");
const kobietaL = document.getElementById("Kobieta");
const mezczyznaL = document.getElementById("Mezczyzna");
const squatL = document.getElementById("Squat");
const benchPressL = document.getElementById("BenchPress");
const deadliftL = document.getElementById("Deadlift");
const deadliftP = document.getElementById("PredictDeadlift");
const ipfRadio = document.getElementById("IPF");
const ipfRaw = document.getElementById("Raw");
const ipfEquip = document.getElementById("Equip");
const wilksRadio = document.getElementById("Wilks");
const dotsRadio = document.getElementById("Dots");
const osprzetDiv = document.querySelector('.osprzet');
wilksRadio.addEventListener('click', toggleOsprzetVisibility);
dotsRadio.addEventListener('click', toggleOsprzetVisibility);
ipfRadio.addEventListener('click', toggleOsprzetVisibility);

function toggleOsprzetVisibility() {
  if (wilksRadio.checked || dotsRadio.checked) {
    osprzetDiv.style.display = 'none';
  } else {
    osprzetDiv.style.display = 'block';
  }
}

function addDataToTable() {

  if(imieL.value =="" || wagaL.value == "" || squatL.value =="" || benchPressL.value =="" || deadliftL.value=="" || deadliftP.value==""){
    alert("Nie wprowadziłeś czegoś! ");
    return;
  }
  if(deadliftL.value >= deadliftP.value){
    alert("Predykcja powinna być większa niż początkowa wartość! ");
    return;
  }


  const newRow = document.createElement("tr");
  if (switchEl.checked) {
    newRow.classList.add("wynikiOsob");
    console.log("Test zaznaczony");
  } else {
    newRow.classList.add("wynikiZawodnika");
    newRow.classList.add("wynikiOsob");
    console.log("Test Niezaznaczony");
  }
  const nameCell = document.createElement("td");
  const sqCell = document.createElement("td");
  const bpCell = document.createElement("td");
  const dl1Cell = document.createElement("td");
  const totalCell = document.createElement("td");
  const dl2Cell = document.createElement("td");
  const predictCell = document.createElement("td");
  const katPunktyCell = document.createElement("td");

  let imie = imieL.value;
  let waga = wagaL.value;
  let squat = squatL.value;
  let benchPress = benchPressL.value;
  let deadlift = deadliftL.value;
  let predictDeadlift = deadliftP.value;
  let plec = kobietaL.checked ? "Kobieta" : "Mężczyzna";

  let total = parseInt(squat) + parseInt(benchPress) + parseInt(deadlift);
  let predictTotal = parseInt(squat) + parseInt(benchPress) + parseInt(predictDeadlift);
  // Ustawiamy wartości dla każdej komórki
  let kategoria;
  let nazwakategorii = "";




  if (wilksRadio.checked) {
    if (plec == "Mężczyzna") {
      kategoria = (total * 500) / (-216.0475144 + 16.2606339 * waga - 0.002388645 * Math.pow(waga, 2) - 0.00113732 * Math.pow(waga, 3) + 0.00000701863 * Math.pow(waga, 4) - 0.00000001291 * Math.pow(waga, 5));
      nazwakategorii = "Wilks ";
    }
    if (plec == "Kobieta") {
      kategoria = (total * 500) / (-216.0475144 + 16.2606339 * waga - 0.002388645 * Math.pow(waga, 2) - 0.00113732 * Math.pow(waga, 3) + 0.00000701863 * Math.pow(waga, 4) - 0.00000001291 * Math.pow(waga, 5));
      nazwakategorii = "Wilks ";
    }
  }
  if (ipfRadio.checked) {
    if (ipfEquip.checked) {
      if (plec == "Mężczyzna") {
        kategoria = (total * 100) / (1236.25115 - 1449.21864 * Math.exp(-0.01644 * waga));
        nazwakategorii = "IPF EQ ";
      }
      if (plec == "Kobieta") {
        kategoria = (total * 100) / (758.64 - 949.313820000 * Math.exp(-0.02435 * waga));
        nazwakategorii = "IPF EQ ";
      }
    }
    if (ipfRaw.checked) {
      if (plec == "Mężczyzna") {
        kategoria = (total * 100) / (1199.72839 - 1025.18162 * Math.exp(-0.00921 * waga));
        nazwakategorii = "IPF Raw ";
      }
      if (plec == "Kobieta") {
        kategoria = (total * 100) / (610.32796 - 1045.59282 * Math.exp(-0.03048 * waga));
        nazwakategorii = "IPF Raw ";
      }
    }
  }
  if (dotsRadio.checked) {
    if (plec == "Mężczyzna") {
      kategoria = (total * 500) / (-307.75076000 + 24.09007560 * waga - 0.19187592 * Math.pow(waga, 2) + 0.00073913 * Math.pow(waga, 3) - 0.00000109 * Math.pow(waga, 4) + 0 * Math.pow(waga, 5));
      nazwakategorii = "Dots ";
    }
    if (plec == "Kobieta") {
      kategoria = (total * 500) / (-57.962880000 + 13.6175032 * waga - 0.1126655495 * Math.pow(waga, 2) + 0.0005158568 * Math.pow(waga, 3) - 0.0000010706 * Math.pow(waga, 4) + 0 * Math.pow(waga, 5));
      nazwakategorii = "Dots ";
    }
  }


  nameCell.textContent = imie;
  sqCell.textContent = squat;
  bpCell.textContent = benchPress;
  dl1Cell.textContent = deadlift;
  totalCell.textContent = total;
  dl2Cell.textContent = predictDeadlift;
  predictCell.textContent = predictTotal;
  katPunktyCell.textContent = nazwakategorii + Math.round(kategoria);

  // Dodajemy komórki do wiersza
  newRow.appendChild(nameCell);
  newRow.appendChild(sqCell);
  newRow.appendChild(bpCell);
  newRow.appendChild(dl1Cell);
  newRow.appendChild(totalCell);
  newRow.appendChild(dl2Cell);
  newRow.appendChild(predictCell);
  newRow.appendChild(katPunktyCell);

  // Dodajemy wiersz do tabeli
  const tableBody = document.querySelector(".tabelka table tbody");
  tableBody.appendChild(newRow);
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

// Dodajemy event listener do guzika "success"
const successButton = document.getElementById("success");
successButton.addEventListener("click", addDataToTable);


const btnTotal = document.querySelector("#btnTotal");
const tableBody = document.querySelector(".tabelka table tbody");