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


let checkAndTrim = () => {
    input.value = input.value.trim();
    if (input.value.includes("=")) {
        let [name, value] = input.value.split('=');
        name = name.trim()
        value = value.trim()
        if (!!(name.match(/[^a-zA-Z0-9а-яА-ЯіІїЇ]+/g) || !!(value.match(/[^a-zA-Z0-9а-яА-ЯіІїЇ]+/g)))) {
            form.appendChild(incorrectPar);
            return false
        }
        else  if (name.length<=0 || value.length<=0)
        {
            form.appendChild(incorrectPar);
            return false
        }

        else {
            return [name, value]
        }
    } else {
        form.appendChild(incorrectPar);
        return false;
    }
}

function Input(name, value) {
    this.name = name.trim();
    this.value = value.trim();
    this.id = inpId()


}

let inpId = id()

function id() {

    let outputList = JSON.parse(localStorage.getItem("outputList")) || []
    let start = outputList[outputList.length - 1]?.id || 0;
    return function () {
        return ++start
    }

}

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
        console.log(input.value);
    }
    // input.value = '';

}

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


let outputList = JSON.parse(localStorage.getItem("outputList")) || []
showList(outputList);

// select.onchange = () => {
//     let selectedItems = Array.from(select.value);
// }

// let selectedItems = select.onchange=()=>{
//    return selectedItems = Array.from(select.selectedOptions.namedItem());
// }

deleteBtn.onclick = () => {
    if (localStorage.getItem('outputList')) {
        let outputList = JSON.parse(localStorage.getItem('outputList'))
        let selected = Array.from(select.selectedOptions);
        // console.log(outputList);
        // selected.forEach((item)=> console.log(item.id))
        console.log(selected);
        for (selectedItem of selected) {
            console.log(selectedItem.id);
            for (let i = 0; i < outputList.length; i++) {
                console.log(outputList[i].id, +selectedItem.id)

                if (+selectedItem.value === outputList[i].id) {
                    // console.log(outputList[i].id);
                    // console.log(outputList);
                    // console.log(outputList[i]);
                    //  console.log(id);
                    console.log(document.getElementById(`${id}`));
                    document.getElementById(`${outputList[i].id}`).remove();
                    outputList.splice(i, 1);
                    console.log(outputList);


                }
            }
        }
        localStorage.setItem("outputList", JSON.stringify(outputList))
        //console.log(s);

        if (outputList.length == 0) {
            localStorage.removeItem("outputList")

            select.before(nonePar);
            select.hidden = true;
            select.innerHTML = ""
        }


    }


}


valueSortBtn.onclick = () => {
    if (localStorage.getItem("outputList")) {
        let outputList = JSON.parse(localStorage.getItem("outputList"));
        let sortByValue = outputList.sort((a, b) => {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            else return 0;
        })
        // console.log(sortByValue);
        showList(outputList);

    }

}

nameSortBtn.onclick = () => {
    if (localStorage.getItem("outputList")) {
        let outputList = JSON.parse(localStorage.getItem("outputList"));
        let sortByValue = outputList.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            else return 0;
        })
        console.log(sortByValue);
        showList(outputList);

    }
}

