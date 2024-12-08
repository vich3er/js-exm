let select = document.querySelector('select');
let form = document.forms.addValue;
let input = document.forms.addValue.addValueInp;
let deleteBtn = document.getElementById('delete');
let nameSortBtn = document.getElementById("NameSort");
let valueSortBtn = document.getElementById("ValueSort");
let nonePar = document.createElement('p');
nonePar.innerText = "you haven't added anything yet";
let incorrectPar = document.createElement('p');
incorrectPar.innerText = "incorrect input format";
let addBtn = document.querySelector("button")

// перевірка чи вілідний ввід та прибирання зайвих відступів
let checkAndTrim = () => {

    input.value = input.value.trim();
    if (input.value.includes("=")) {
        let [name, value] = input.value.split('=');
        name = name.trim()
        value = value.trim()
        if (!!(name.match(/[^a-zA-Z0-9а-яА-ЯіІїЇ]+/g) || !!(value.match(/[^a-zA-Z0-9а-яА-ЯіІїЇ]+/g)))) {
            form.appendChild(incorrectPar);
            return false
        } else if (name.length <= 0 || value.length <= 0) {
            form.appendChild(incorrectPar);
            return false
        } else {
            return [name, value]
        }
    } else {
        form.appendChild(incorrectPar);
        return false;
    }
}

// конструктор об'єкта який вводить користувач
function Input(name, value) {
    this.name = name
    this.value = value
    this.id = inpId() // для коректного видалення


}

let inpId = id()

// функція яка створює айді об'єкту
function id() {
    let outputList = JSON.parse(localStorage.getItem("outputList")) || []
    let start = outputList[outputList.length - 1]?.id || 0;
    return function () {
        return ++start
    }

}

// додає об'єкт до списку і локального сховища якщо ввід коректний
form.onsubmit = function (e) {
    e.preventDefault();
    if (checkAndTrim()) {
        select.hidden = false;
        let outputList = JSON.parse(localStorage.getItem('outputList')) || [];
        nonePar.remove();
        incorrectPar.remove();
        let [name, value] = checkAndTrim();
        let usrInput = new Input(name, value);
        outputList.push(usrInput);
        let option = document.createElement('option');
        option.value = `${usrInput.id}`
        option.id = `${usrInput.id}`
        option.innerText = `${name}=${value}`
        localStorage.setItem("outputList", JSON.stringify(outputList));
        select.appendChild(option);
        input.value = '';

    }


}
// вииводить список введених пар
let showList = (outputList) => {
    if (outputList.length > 0) {
        select.innerHTML = "";
        select.hidden = false;
        for (el of outputList) {
            let [name, value, id] = Object.values(el);
            let option = document.createElement('option');
            // option.value = `${name}=${value}`
            option.value = `${id}`
            option.id = `${id}`
            option.innerText = `${name}=${value}`
            select.appendChild(option);

        }

    } else {
        select.hidden = true;
        select.before(nonePar);

    }
}

// виводить список введених пар при завантаженні сторінки
let outputList = JSON.parse(localStorage.getItem("outputList")) || []
showList(outputList);
// видаляє обрані елементи
deleteBtn.onclick = () => {
    if (localStorage.getItem('outputList')) {
        let outputList = JSON.parse(localStorage.getItem('outputList'))
        let selected = Array.from(select.selectedOptions);

        for (selectedItem of selected) {

            for (let i = 0; i < outputList.length; i++) {


                if (+selectedItem.value === outputList[i].id) {

                    document.getElementById(`${outputList[i].id}`).remove();
                    outputList.splice(i, 1);


                }
            }
        }
        localStorage.setItem("outputList", JSON.stringify(outputList))


        if (outputList.length == 0) {
            localStorage.removeItem("outputList")

            select.before(nonePar);
            select.hidden = true;
            select.innerHTML = ""
        }


    }


}

// сортування за алфавітом по value
valueSortBtn.onclick = () => {
    if (localStorage.getItem("outputList")) {
        let outputList = JSON.parse(localStorage.getItem("outputList"));
        outputList.sort((a, b) => {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            else return 0;
        })

        showList(outputList);

    }

}
// сортування за алфавітом по name
nameSortBtn.onclick = () => {
    if (localStorage.getItem("outputList")) {
        let outputList = JSON.parse(localStorage.getItem("outputList"));
        outputList.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            else return 0;
        })
        showList(outputList);

    }
}
// додавання об'єкту в список через ентрер при відсутності фокусі на інпуті
document.addEventListener('keyup', event => {
    let isActive = document.activeElement.tagName == "INPUT";
    if (event.code == 'Enter' && !isActive) {
        addBtn.click()

    }

})

