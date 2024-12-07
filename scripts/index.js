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

// console.log(document.getElementsByClassName('p-ul')[1]);


let checkAndTrim = () => {
    input.value = input.value.trim();// хз чи тут треба трім
    if (input.value.includes("=")) {
        let [name, value] = input.value.split('=');
        name = name.trim()
        value = value.trim()
        if  (!!(name.match(/[^a-zA-Z0-9-а-яА-Я0-9-іІ_]+/g) || !!(value.match(  /[^a-zA-Z0-9-а-яА-Я0-9-іІ_]+/g)))) {
            form.appendChild(incorrectPar);
            return  false
        } else {
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
    this.id =  inpId()


}
let inpId = id()
function id(){

    let outputList = JSON.parse(localStorage.getItem("outputList")) || []
    let start = outputList.length;
    return function (){
        return ++start
    }

}

form.onsubmit = function (e) {
    e.preventDefault();
    if (checkAndTrim()) {
        //  ul.style.display = block;
        select.hidden = false;
        let outputList = JSON.parse(localStorage.getItem('outputList')) || [];
        nonePar.remove();
        incorrectPar.remove();
        let [name, value] = checkAndTrim();
        // let [name, value] = input.value.split("=");
        outputList.push(new Input(name, value));
        let option = document.createElement('option');
         option.value = `${name}=${value}`
        option.innerText=     `${name}=${value}`
        localStorage.setItem("outputList", JSON.stringify(outputList));
        input.value = '';
        select.appendChild(option);
    }
}

let showList = (outputList) => {
    if (outputList.length > 0) {
        select.innerHTML = "";
       // console.log(select.options);
        select.hidden = false;
        console.log(outputList);
        //  let ul = document.createElement('ul');
        for (el of outputList) {
            let [name, value, id] = Object.values(el);
            let option = document.createElement('option');
            // option.value = `${name}=${value}`
            option.value = `${name}=${value} ${id}`
            option.innerText = `${name}=${value}`
            select.appendChild(option);

        }
        // nameSortBtn.before(ul);
        //console.log(document.getElementsByClassName('p-ul')[1]);
      //  document.getElementsByClassName('p-ul')[1].after(select);
    } else {
        select.hidden = true;
        select.before(nonePar);

    }
}





let outputList = JSON.parse(localStorage.getItem("outputList")) || []
showList(outputList);

select.onchange=()=>{
    let selectedItems = Array.from(select.value);
}

let selectedItems = select.onchange=()=>{
   return selectedItems = select.selectedOptions;
}

deleteBtn.onclick = () => {
    if (localStorage.getItem('outputList')) {
        // localStorage.removeItem('outputList');
        let outputList = JSON.parse(localStorage.getItem("outputList"))

            // console.log(selectedItems)
            console.log(selectedItems);
            for (selId of selectedItems){
               for (el of outputList){
                   if (selId.id ==el.id) {
                       console.log(selId.id, el.id);
                       console.log(el);
                       outputList.splice(el);
                       console.log(outputList);
                   }
               }

                console.log(outputList.length);
                if (outputList.length===0) localStorage.removeItem("outputList", outputList)
            localStorage.setItem("outputList", outputList);
            console.log(outputList);
            showList(outputList);


        }


        // select.innerHTML = "";
        // select.before(nonePar);
        // select.hidden = true;
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

