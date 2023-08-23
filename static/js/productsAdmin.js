const formAddProduct = document.querySelector("#formAddProduct");
const buttonAddCart = document.getElementsByClassName("btnAddCart");
const linKCarritoCompra = document.querySelector("#carritoCompra");
const cartTestingId = document.querySelector("#cartTesting");
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
const cartUser = document.querySelector("#cartUser");

const buttonEditCart = document.getElementsByClassName("btnEditCart");
const buttonDeleteCart = document.getElementsByClassName("btnDeleteCart");

// console.log(buttonEditCart)
// console.log(buttonDeleteCart)

if (buttonEditCart) {
  for (let btn of buttonEditCart) {
    // console.log('editar prodcuto')
    btn.addEventListener("click", () => {
      console.log("editar prodcuto");
      console.log(btn.id);      
      
      //   fetch(
      //     `/api/carts/${cartUser.value}/product/${btn.id}`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   )
      //     .then((response) =>
      //       // alert(
      //       //   `El producto: ${btn.id}, se agrego con exito en el carrito ${cartUser.value}`
      //       // )
      //       alertExito()
      //     )
      //     .catch((error) => console.log(error));
    });
  }
}
if (buttonDeleteCart) {
  for (let btn of buttonDeleteCart) {
    // console.log('editar prodcuto')
    btn.addEventListener("click", () => {
      Swal.fire({
        title: "Esta seguro?",
        text: "Si continua el producto se eiminara de forma permanente!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminarlo!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/api/products/${btn.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              alertExito();
              location.reload();
            })
            .catch((error) => console.log(error));
        }
      });
    });
  }
}

const formLogout = document.querySelector("#formLogout2");

if (formLogout instanceof HTMLFormElement) {
  formLogout.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { status } = await fetch("/api/sessions/logout", {
      method: "POST",
    });

    if (status === 200) {
      window.location.href = "/login";
    } else {
      console.log("[logout] estado inesperado: " + status);
    }
  });
}

function alertExito(cart, product) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "El producto se Elimino con exito!",
    showConfirmButton: false,
    timer: 3000,
  });
}
