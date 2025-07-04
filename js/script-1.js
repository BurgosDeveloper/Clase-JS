let clientes = [];

function registrarCliente() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nombre || !email) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  const existente = clientes.find(c => c.email === email);
  if (existente) {
    alert('Este cliente ya está registrado.');
    return;
  }

  clientes.push({ nombre, email });
  mostrarClientes();
  limpiarFormulario();
}

function mostrarClientes() {
  const lista = document.getElementById('lista-clientes');
  lista.innerHTML = '';

  clientes.forEach((cliente, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${cliente.nombre} (<a href="mailto:${cliente.email}">${cliente.email}</a>)</span>
      <button class="eliminar" onclick="eliminarCliente(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

function eliminarCliente(indice) {
  if (confirm('Deseas eliminar este cliente?')) {
    clientes.splice(indice, 1);
    mostrarClientes();
  }
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('email').value = '';
}