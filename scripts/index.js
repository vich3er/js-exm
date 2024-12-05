let ul = document.querySelector('ul');
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
    input.value = input.value.trim();// хз чи тут треба трім
    if (input.value.includes("=")) {
        let [name, value] = input.value.split('=');
        name = name.trim()
        value = value.trim()
        if  (!!!(name.match(/\W+/g) && !!!(value.match( /\W+/g)))) {
           // form.appendChild(incorrectPar);
           // return false
           //  console.log(!!name.match(/\W+/g), name);
           //  console.log(!!value.match( /\W+/g), value);
            console.log(name);
            return [name, value]
        } else {
            form.appendChild(incorrectPar);
            return  false
        }

    } else {
        form.appendChild(incorrectPar);
        return false;
    }
}

function Input(name, value) {
    this.name = name.trim();
    this.value = value.trim();
}

form.onsubmit = function (e) {
    e.preventDefault();
    if (checkAndTrim()) {
        //  ul.style.display = block;
        ul.hidden = false;
        let outputList = JSON.parse(localStorage.getItem('outputList')) || [];
        nonePar.remove();
        incorrectPar.remove();
        let [name, value] = checkAndTrim();
        // let [name, value] = input.value.split("=");
        outputList.push(new Input(name, value));
        let li = document.createElement('li');
        li.innerText = `${name}=${value}`
        localStorage.setItem("outputList", JSON.stringify(outputList));
        input.value = '';
        ul.appendChild(li);
    }
}

let showList = (outputList) => {
    if (outputList.length > 0) {
        ul.innerText = "";
        ul.hidden = false;
        console.log(outputList);
        //  let ul = document.createElement('ul');
        for (el of outputList) {
            let [name, value] = Object.values(el);
            let li = document.createElement('li');
            li.innerText = `${name}=${value}`
            ul.appendChild(li);

        }
        // nameSortBtn.before(ul);
        document.getElementsByClassName('p-ul')[1].after(ul);
    } else {
        ul.hidden = true;
        ul.before(nonePar);

    }
}

let outputList = JSON.parse(localStorage.getItem("outputList")) || []
showList(outputList);

deleteBtn.onclick = () => {
    if (localStorage.getItem('outputList')) {
        localStorage.removeItem('outputList');
        ul.innerText = "";
        ul.before(nonePar);

        ul.hidden = true;
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
        console.log(sortByValue);
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