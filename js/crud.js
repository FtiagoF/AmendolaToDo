const getLocalStorage = () => JSON.parse(localStorage.getItem('db_local')) ?? [];
const setLocalStorage = (call) => localStorage.setItem('db_local', JSON.stringify(call));

const deleteCall = (index) => {
    let data = readCall();
    data.splice(index, 1);
    setLocalStorage(data)
}

const updateCall = (index, call) => {
    let data = readCall();
    data[index] = call;
    setLocalStorage(data);
}

const readCall = () => getLocalStorage()

const createCall = (call) => {
    let calls = readCall();
    calls.push(call)
    setLocalStorage(calls);
}

export {createCall, readCall, updateCall, deleteCall};