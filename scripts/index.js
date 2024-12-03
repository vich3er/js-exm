let btnAdd = document.querySelector('button');
let ul = document.querySelector('ul');
let input = document.querySelector('input')
let deleteBtn = document.getElementById('delete');
let nameSortBtn = document.getElementById("NameSort");
let valueSortBtn = document.getElementById("ValueSort");
let nonePar = document.createElement('p');
nonePar.innerText = "you haven't added anything yet";
let incorrectPar = document.createElement('p');
incorrectPar.innerText = "Incorrect input format, use '=' to delimer";

function Input(name, value){
    this.name= name;
    this.value = value;
}

let showList = () => {
    if (localStorage.getItem("infoInput")) {
        let output = JSON.parse(localStorage.getItem("infoInput"))
        console.log(output);
        for (el of output){
            let li = document.createElement('li');
            for(key in el){
                li.innerText+=`${el[key]}`
            }
            ul.appendChild(li);
        }
    } else {
        ul.before(nonePar);

    }
}

showList();

deleteBtn.onclick = () => {
    if (localStorage.getItem('infoInput')) {
        localStorage.removeItem('infoInput');
        ul.innerText = "";
        ul.before(nonePar);

    }
}


let check = () => {
    input.value = input.value.trim();
    if (input.value.includes("=")) {
        return true;
    } else {
        input.after(incorrectPar);
        return false;
    }
}

btnAdd.onclick = () => {
    if (check()) {
        nonePar.remove();
        incorrectPar.remove();
        let infoInput = JSON.parse(localStorage.getItem("infoInput")) || [];
        let [name, value] = input.value.split("=");
     infoInput.push( new Input(name, value));
        let li = document.createElement('li');
        li.innerText = `${name}=${value}`
        ul.appendChild(li);
        console.log(infoInput);
        localStorage.setItem("infoInput", JSON.stringify(infoInput));
        input.value = '';
    }

}

nameSortBtn.onclick = () => {
    if (localStorage.getItem("infoInput")) {
        let output = JSON.parse(localStorage.getItem("infoInput"));
        let name = (Object.keys(output))
        console.log(name.sort());
        ul.innerText = "";
         for(let i of name){
             console.log(i, output[i]);
             let li = document.createElement('li');
             li.innerText = `${i} ${output[i]}`
             ul.appendChild(li);
         }
    }
}

valueSortBtn.onclick=()=>{
    if (localStorage.getItem("infoInput")) {
        let output = JSON.parse(localStorage.getItem("infoInput"));
      let sortByValue= output.sort((a, b)=>{
            if (a.value >b.value)return 1;
            if (a.value <b.value)return -1;
            else return 0;
        })
        console.log(sortByValue);
        console.log(output);
        showList();

    }

}