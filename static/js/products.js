

const formAddProduct = document.querySelector("#formAddProduct");
const buttonAddCart = document.getElementsByClassName("btnAddCart");
const linKCarritoCompra = document.querySelector("#carritoCompra");
const cartTestingId = document.querySelector("#cartTesting");
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
const cartUser = document.querySelector("#cartUser");

if (formAddProduct instanceof HTMLFormElement) {
  formAddProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formAddProduct);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // console.log(response)
      if(response.status == 403){
        alert("Solo pueden crear productos los usuarios con permiso de Administrador");
        myModal.toggle();
      }else{
        myModal.toggle();
        // alert("El producto se agrego con exito");
        alertExito()
        location.reload();
      }
    });
  });
}

if (buttonAddCart) {
  for (let btn of buttonAddCart) {
    btn.addEventListener("click", () => {      
      fetch(
        `/api/carts/${cartUser.value}/product/${btn.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) =>
          // alert(
          //   `El producto: ${btn.id}, se agrego con exito en el carrito ${cartUser.value}`
          // )
          alertExito()
        )
        .catch((error) => console.log(error));
    });
  }
}
linKCarritoCompra.href = `/carts/${cartUser.value}`;


const formLogout = document.querySelector('#formLogout2')

if (formLogout instanceof HTMLFormElement) {
  formLogout.addEventListener('submit', async event => {
    event.preventDefault()

    const { status } = await fetch('/api/sessions/logout', {
      method: 'POST'
    })

    if (status === 200) {
      window.location.href = '/login'
    } else {
      console.log('[logout] estado inesperado: ' + status)
    }

  })
}


function alertExito(cart, product) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: 'El producto se agrego con exito!',
    showConfirmButton: false,
    timer: 3000,
  });
}