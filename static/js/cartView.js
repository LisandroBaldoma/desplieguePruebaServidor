console.log("estamos adentro con JS");

const btnComprar = document.getElementById("btnComprar");
const cart = document.getElementById("cartId");
const compraContenedor = document.getElementById("compraContenedor");
const carritoContenedor = document.getElementById("carritoContenedor");
const btnVolver = document.getElementById("btnVolver");
const btnVaciarCarrito = document.getElementById("btnVaciarCrrito");

console.log(btnVaciarCarrito);
const cartId = cart.value;

let detalleCompra = "";
let detalleProductos = "";

if (btnVaciarCarrito instanceof HTMLButtonElement) {
  btnVaciarCarrito.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log(cartId);
    const { status } = await fetch(
      `/api/carts/${cartId}`,
      {
        method: "DELETE",
      }
    );

    if (status === 200) {
      window.location.href = `/carts/${cartId}`;
    } else {
      console.log("[logout] estado inesperado: " + status);
    }
  });
}

if (btnComprar instanceof HTMLButtonElement) {
  btnComprar.addEventListener("click", (event) => {
    event.preventDefault();

    fetch(`/api/carts/${cartId}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          compraContenedor.classList.remove("d-none");
          carritoContenedor.classList.add("d-none");
          btnVolver.classList.remove("d-none");
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        compraContenedor.insertAdjacentHTML("afterend", detalleCompra);
        console.log(detalleCompra);
        if (data.tipo === 0) {
          detalleCompra = `                
                <div class="card text-center m-5">
                <div class="card-header">
                  ${data.response}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Code:${data.ticket.code}</h5>
                  <p class="card-text">Total: $${data.ticket.amount}</p>
                  <p class="card-text">Emil: ${data.ticket.purchaser}</p>                  
                </div>
                <div class="card-footer text-muted">
                  Fecha: ${data.ticket.purchase_dateTime}
                </div>
                </div>
                `;
          compraContenedor.insertAdjacentHTML("afterend", detalleCompra);
        } else if (data.tipo === 1) {
          data.cart.forEach((element) => {
            detalleProductos += `
                        <li>Producto: ${element.product.description} - Cantidad: ${element.quantity}  - Stock: ${element.product.stock} </li>
                    `;
          });
          //console.log(detalleProductos)
          detalleCompra = `
                <div class="card text-center m-5" >
                    <div class="card-header">
                    Estos productos no pudieron procesarse por falta de stock
                    </div>
                    <ul class="list-group list-group-flush">
                        ${detalleProductos}
                    </ul>
                    </div>
                `;
          detalleCompra += `
                
                <div class="card text-center m-5">
                <div class="card-header">
                  ${data.response}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Code:${data.ticket.code}</h5>
                  <p class="card-text">Total: $${data.ticket.amount}</p>
                  <p class="card-text">Emil: ${data.ticket.purchaser}</p>                  
                </div>
                <div class="card-footer text-muted">
                  Fecha: ${data.ticket.purchase_dateTime}
                </div>
                </div>
                `;
          compraContenedor.insertAdjacentHTML("afterend", detalleCompra);
        } else {
          data.cart.forEach((element) => {
            detalleProductos += `
                        <li>Producto: ${element.product.description} - Cantidad: ${element.quantity}  - Stock: ${element.product.stock} </li>
                    `;
          });
          //console.log(detalleProductos)
          detalleCompra = `
                
                <div class="card text-center m-5" >
                    <div class="card-header">
                        Estos productos no pudieron procesarse por falta de stock
                    </div>
                    <ul class="list-group list-group-flush">
                        ${detalleProductos}
                    </ul>
                    </div>
                `;
          compraContenedor.insertAdjacentHTML("afterend", detalleCompra);
        }
      });
  });
}
