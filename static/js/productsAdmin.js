const formEditProduct = document.querySelector("#formEditProduct");
const buttonAddCart = document.getElementsByClassName("btnAddCart");
const linKCarritoCompra = document.querySelector("#carritoCompra");
const cartTestingId = document.querySelector("#cartTesting");
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
const myModalEdit = new bootstrap.Modal(
  document.getElementById("exampleModalEdit")
);
const cartUser = document.querySelector("#cartUser");

const buttonEditCart = document.getElementsByClassName("btnEditCart");
const buttonDeleteCart = document.getElementsByClassName("btnDeleteCart");

const title = document.getElementById("input_title_edit");
const description = document.getElementById("input_description_edit");
const stock = document.getElementById("input_stock_edit");
const price = document.getElementById("input_price_edit");
const code = document.getElementById("input_code_edit");
const category = document.getElementById("input_category_edit");
const btnEditProdcut = document.getElementById("btnEditProductForm");


if (buttonEditCart) {
  for (let btn of buttonEditCart) {
    // console.log('editar prodcuto')
    btn.addEventListener("click", () => {
      // console.log("editar producto");
      // console.log(btn.id);
      myModalEdit.toggle();

      fetch(`/api/products/${btn.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.json().then((data) => {
            let product = data;
            // console.log(product);
            title.value = product.title
            description.value = product.description
            stock.value = product.stock
            price.value = product.price
            code.value = product.code
            category.value = product.category

            if (formEditProduct instanceof HTMLFormElement) {
              formEditProduct.addEventListener("submit", (event) => {
                event.preventDefault();
                const formData = new FormData(formEditProduct);
                const data = {};
                formData.forEach((value, key) => (data[key] = value));
                // console.log(data)
                fetch(`/api/products/${product._id}`, {
                  method: "PUT",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then((response) => {
                  // console.log(response);
                  if (response.status == 200) {                    
                    alertExito("El producto se actualizo correctamente");
                    
                    myModal.toggle();
                    
                    location.reload();
                  } else{
                    alertExito(
                      "error al actualizar el producto"
                    );
                  }
                });
              });
            }
            
            
          });
        })
        .catch((error) => console.log(error));
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
              alertExito('El producto se elimino');
              location.reload();
            })
            .catch((error) => console.log(error));
        }
      });
    });
  }
}

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
      console.log(response)
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

function alertExito(mensaje) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
  });
}
