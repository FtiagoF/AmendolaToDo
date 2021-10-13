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
            cidade: document.getElementById('cidade').value,
            problema: document.getElementById('problema').value,
            time: now.toLocaleTimeString(),
            day: now.toLocaleDateString(),
            check: (-1)
        }
        const index = document.getElementById('name').dataset.index
        if (index == 'new') {
            createCall(call);
            updateTable();
        } else {
            updateCall(index, call);
            updateTable();
        }
    }
}
document.getElementById('save').addEventListener('click', saveCall);

const editCall = (index) => {
    let call = readCall()[index];
    call.index = index;
    fillInputEdit(call);
}

const btnDeleteCall = (index) => {
    let call = readCall()[index];
    call.index = index;
    fillInputDelete(call);
}

const commitDelete = () => {
    let targetIndex = document.getElementById('index').value;
    deleteCall(targetIndex);
    updateTable();
}
document.getElementById('delete').addEventListener('click', commitDelete);

const checkUncheck = (index) => {
    let call = readCall()[index];
    call.check *= (-1);
    updateCall(index, call)
    console.log(call)
    updateTable();
}

const editDelete = (event) => {
    let targetId = event.currentTarget.dataset.registerId;
    switch (event.currentTarget.dataset.action) {
        case 'edit':
            editCall(targetId);
            break;
        case 'delete':
            btnDeleteCall(targetId);
            break;
        case 'check':
            checkUncheck(targetId);
            break;
    }
}

const createRow = (call, index) => {
    const check = () => {
        if(call.check !== -1)
            return 'check-false';
        else
            return 'check-true';
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                        <td scope="row">${index + 1}</td>
                        <td>${call.nome}</td>
                        <td>${call.cidade}</td>
                        <td>${call.problema}</td>
                        <td>${call.day} às ${call.time}</td>
                        <td><i class="bi bi-check-lg ${check()}"></i></td>
                        <td>
                            <button data-register-id="${index}" type="button" class="btn btn-success btn-sm" data-action="check"><i class="bi bi-check"></i></button>    
                            <button data-register-id="${index}" type="button" class="btn btn-warning btn-sm mx-1" data-action="edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pen"></i></button>
                            <button data-register-id="${index}" type="button" class="btn btn-danger btn-sm" data-action="delete" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-x-octagon"></i></button>
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

const fillInputEdit = (call) => {
    document.getElementById('name').value = call.nome;
    document.getElementById('cidade').value = call.cidade;
    document.getElementById('problema').value = call.problema;
    document.getElementById('name').dataset.index = call.index
}

const fillInputDelete = (call) => {
    document.getElementById('nameDel').value = call.nome;
    document.getElementById('cidadeDel').value = call.cidade;
    document.getElementById('problemaDel').value = call.problema;
    document.getElementById('index').value = call.index;
    document.getElementById('nameDel').dataset.index = call.index
}
