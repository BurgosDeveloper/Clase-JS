let productos = [];

function agregarProducto() {
  const nombre = document.getElementById('producto').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  const cantidad = parseInt(document.getElementById('cantidad').value);

  if (!nombre || isNaN(precio) || isNaN(cantidad)) {
    alert('Todos los campos son obligatorios y válidos.');
    return;
  }

  productos.push({ nombre, precio, cantidad });
  actualizarTabla();
  limpiarFormulario();
}

function actualizarTabla() {
  const tbody = document.getElementById('tabla-productos');
  tbody.innerHTML = '';
  let total = 0;

  productos.forEach((prod, index) => {
    const subtotal = prod.precio * prod.cantidad;
    total += subtotal;
    const fila = `
      <tr>
        <td>${prod.nombre}</td>
        <td>$${prod.precio.toFixed(2)}</td>
        <td>${prod.cantidad}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button class="eliminar" onclick="eliminarProducto(${index})">Eliminar</button></td>
      </tr>`;
    tbody.innerHTML += fila;
  });

  document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarProducto(indice) {
  productos.splice(indice, 1);
  actualizarTabla();
}

function limpiarFormulario() {
  document.getElementById('producto').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('cantidad').value = '';
}