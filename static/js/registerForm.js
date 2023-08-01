//alert("ahora a trabajar con los datos del formulario")

const btn = document.getElementById("btn-submit");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const form = document.querySelector(".needs-validation");

form.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
    if (form.checkValidity()) {
      const data = {
        name: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      };
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        clearForm();
        alertExito()
        //console.log(response);
        //console.log("redireccionar");
        window.location.href = "/products";
      } else {
        alert("El usuario NO ESTA REGISTRADO EN LA BD");
        console.log("[login] estado inesperado: " + response.status);
      }
    }
  },
  false
);

function alertExito(respuesta) {
  console.log(respuesta);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Usuario Registrado",
    showConfirmButton: false,
    timer: 3000,
  });
}

function clearForm() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  form.classList.remove("was-validated");
}
