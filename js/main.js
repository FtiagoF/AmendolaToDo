import { createCall, readCall, updateCall, deleteCall } from './crud.js'

const isNotEmpty = () => {
    return document.getElementById('form').reportValidity();
}

const clearForm = () => {
    let fields = document.querySelectorAll('.inputs');
    fields.forEach(field => field.value = "");
}
document.getElementById('close').addEventListener('click', clearForm);
document.getElementById('x').addEventListener('click', clearForm);
document.getElementById('newCall').addEventListener('click', clearForm);

const saveCall = () => {
    if (isNotEmpty()) {
        let now = new Date();
        let call = {
            nome: document.getElementById('name').value,
            setor: document.getElementById('setor').value,
            setorLabel: document.getElementById('setor')[document.getElementById('setor').selectedIndex].label,
            problema: document.getElementById('problema').value,
            time: now.toLocaleTimeString(),
            day: now.toLocaleDateString()
        }
        const index = document.getElementById('name').dataset.index
        if(index == 'new'){
            createCall(call);
            updateTable();
        }else{
            updateCall(index, call);
            updateTable();
        } 
    }
}
document.getElementById('save').addEventListener('click', saveCall);

const editCall = (index) => {
    let call = readCall()[index];
    call.index = index;
    fillInput(call);
}

const editDelete = (event) => {
    let targetId = event.currentTarget.dataset.registerId;

    switch(event.currentTarget.dataset.action){
        case 'edit':
            editCall(targetId);
            break;
        case 'delete':
            deleteCall(targetId)
            updateTable();
            break;
    }
}

const createRow = (call, index) => {

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                        <th scope="row">${index}</th>
                        <td>${call.nome}</td>
                        <td>${call.setorLabel}</td>
                        <td>${call.day}</td>
                        <td>${call.time}</td>
                        <td>${call.problema}</td>
                        <td>
                            <button data-register-id="${index}" type="button" class="btn btn-warning btn-sm" data-action="edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pen"></i></button>
                            <button data-register-id="${index}" type="button" class="btn btn-danger btn-sm mx-2" data-action="delete"><i class="bi bi-x-octagon"></i></button>
                        </td>
                        `

    document.querySelector('#table>tbody').appendChild(newRow);
    let options = document.querySelectorAll('#table>tbody .btn');
    options.forEach(btn => btn.addEventListener('click', editDelete));
}

const clearTable = () => {
    const row = document.querySelectorAll('#table>tbody tr');
    row.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    clearTable();
    let calls = readCall();
    calls.forEach(createRow);
}
updateTable();

const fillInput = (call) => {
    console.log(call)
    document.getElementById('name').value = call.nome;
    document.getElementById('setor').value = call.setor;
    document.getElementById('problema').value = call.problema;
    document.getElementById('name').dataset.index = call.index
}
