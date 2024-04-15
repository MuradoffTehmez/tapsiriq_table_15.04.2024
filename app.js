const data = [
    { id: 1, ad: 'Tahmaz', soyad: 'Muradov', yas: 23 }
];

const table = document.getElementById('myTable');
const tbody = table.getElementsByTagName('tbody')[0];
const addNewButton = document.getElementById('addNewButton');
const formModal = document.getElementById('formModal');
const closeButton = document.getElementsByClassName('close-button')[0];
const dataForm = document.getElementById('dataForm');

function renderTable() {
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);
        const adCell = document.createElement('td');
        adCell.textContent = item.ad;
        row.appendChild(adCell);
        const soyadCell = document.createElement('td');
        soyadCell.textContent = item.soyad;
        row.appendChild(soyadCell);
        const yasCell = document.createElement('td');
        yasCell.textContent = item.yas;
        row.appendChild(yasCell);
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Düzəliş et';
        editButton.className = 'btn btn-primary';
        editButton.addEventListener('click', () => editItem(item.id));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.className = 'btn btn-danger';
        deleteButton.addEventListener('click', () => deleteItem(item.id));
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        tbody.appendChild(row);
    });
}

function saveItem(item) {
    const index = data.findIndex(i => i.id === item.id);
    if (index === -1) {
        item.id = data.length + 1;
        data.push(item);
    } else {
        data[index] = item;
    }
    renderTable();
    formModal.style.display = 'none';
}

function editItem(id) {
    const item = data.find(i => i.id === id);
    document.getElementById('adInput').value = item.ad;
    document.getElementById('soyadInput').value = item.soyad;
    document.getElementById('yasInput').value = item.yas;
    document.getElementById('formModalTitle').textContent = 'Məlumatları Düzəliş et';
    formModal.style.display = 'block';
    dataForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newItem = {
            id: item.id,
            ad: document.getElementById('adInput').value,
            soyad: document.getElementById('soyadInput').value,
            yas: document.getElementById('yasInput').value
        };
        saveItem(newItem);
    }, { once: true });
}

function addNewItem() {
    document.getElementById('adInput').value = '';
    document.getElementById('soyadInput').value = '';
    document.getElementById('yasInput').value = '';
    document.getElementById('formModalTitle').textContent = 'Yeni Məlumat Əlavə Et';
    formModal.style.display = 'block';
    dataForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newItem = {
            id: data.length + 1,
            ad: document.getElementById('adInput').value,
            soyad: document.getElementById('soyadInput').value,
            yas: document.getElementById('yasInput').value
        };
        saveItem(newItem);
    }, { once: true });
}

function deleteItem(id) {
    const index = data.findIndex(i => i.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        renderTable();
    }
}

addNewButton.addEventListener('click', addNewItem);
closeButton.addEventListener('click', () => formModal.style.display = 'none');
window.addEventListener('click', (event) => {
    if (event.target === formModal) {
        formModal.style.display = 'none';
    }
});

renderTable();