let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

function guardar() {
  localStorage.setItem('inventario', JSON.stringify(inventario));
}

function agregarProducto() {
  const nombre = document.getElementById('nombre').value.trim();
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const precio = parseFloat(document.getElementById('precio').value);
  if (!nombre || isNaN(cantidad) || isNaN(precio)) return;
  inventario.push({ nombre, cantidad, precio });
  guardar();
  mostrar();
  document.getElementById('nombre').value = '';
  document.getElementById('cantidad').value = '';
  document.getElementById('precio').value = '';
}

function mostrar() {
  const tbody = document.getElementById('tabla');
  tbody.innerHTML = '';
  inventario.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td><input type="number" value="${item.cantidad}" onchange="actualizarcantidad(${index}, this.value)" /></td>
      <td><input type="number" step="0.01" value="${item.precio}" onchange="actualizarPrecio(${index}, this.value)" /></td>
      <td><button onclick="eliminar(${index})">Eliminar</button></td>
    `;
    tbody.appendChild(fila);
  });
}

function actualizarcantidad(index, nuevocantidad) {
  inventario[index].cantidad = parseInt(nuevocantidad);
  guardar();
}

function actualizarPrecio(index, nuevoPrecio) {
  inventario[index].precio = parseFloat(nuevoPrecio);
  guardar();
}

function eliminar(index) {
  if (confirm('¿Eliminar este producto?')) {
    inventario.splice(index, 1);
    guardar();
    mostrar();
  }
}

window.onload = mostrar;