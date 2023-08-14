const btn = document.getElementById("btn-submit");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const rol = document.getElementById("rolInput");
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
        rol: rol.value
      };
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        clearForm();
        alertExito();
        window.location.href = "/products";
      } else {
        alertFail(response);
        clearFormFail();
      }
    }
  },
  false
);

function alertExito(respuesta) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Usuario Registrado",
    showConfirmButton: false,
    timer: 3000,
  });
}
function alertFail(respuesta) {
  Swal.fire({
    icon: "error",
    title: "Lo sentimos...",
    text: "El email que intenta registrar, ya existe en la BASE DE DATOS",
  });
}

function clearForm() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  rol.value = "";
  form.classList.remove("was-validated");
}
function clearFormFail() {
  email.value = "";
  password.value = "";
  form.classList.remove("was-validated");
}
