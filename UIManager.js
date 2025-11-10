
<table id="usersTable">
  <thead>
    <tr>
      <th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Actions</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

document.querySelector('#usersTable tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        editUser(e.target.dataset.id);
    }
    if (e.target.classList.contains('delete-btn')) {
        confirmDelete(e.target.dataset.id);
    }
});


function editUser(id) {
    const user = userManager.getById(id);
    form.name.value = user.name;
    form.email.value = user.email;
    form.age.value = user.age;
    form.id.value = user.id;
}

function confirmDelete(id) {
    if (confirm("Do you really want to delete this user?")) {
        userManager.delete(id);
        render();
    }
}


function clearForm() {
    form.reset();
}

function render() {
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = "";

    userManager.getAll().forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            </tr>
        `;
    });
}
