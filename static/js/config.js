// console.log("estoy usando handlebars desde el front CONFGI-VIEW");

const updateRol = document.getElementById("updateRol");
const btnUpdtaeRol = document.getElementById("btnUpdtaeRol");

const nuevoRol = document.getElementById("nuevoRol");

const userId = document.getElementById("userId");

const btnDeleteUser = document.getElementById("btnDeletedUser");

// console.log(btnDeleteUser)

btnUpdtaeRol.addEventListener("click", async (event) => {
  event.preventDefault();
  // console.log("updateRol");
  // console.log(updateRol);
  if (updateRol.classList == "d-none") {
    updateRol.classList.remove("d-none");
  } else {
    updateRol.classList.add("d-none");
  }
});

nuevoRol.addEventListener("change", async (event) => {
  event.preventDefault();
  // console.log('updateRol')
  // console.log(nuevoRol.value);
  if (nuevoRol.value == 1) {
    postNewRol(userId.value, "user");
  } else if (nuevoRol.value == 2) {
    // console.log("NUEVO ROL ADMIN");
    postNewRol(userId.value, "admin");
  } else if (nuevoRol.value == 3) {
    // console.log("NUEVO ROL PREMIUM");
    postNewRol(userId.value, "premium");
  } else {
    alert("Debe seleccionar un Rol");
  }  
});


async function postNewRol(id, rol) {
    const { status } = await fetch(`/api/users/updaterol/${id}/${rol}`, {
      method: "GET",
    });

    if (status == 201) {
      // console.log("El rol fue actualizado");
      location.reload();
    } else {
      // console.log("[logout] estado inesperado: " + status);
    }
  }


  btnDeleteUser.addEventListener("click", async (event) => {
    event.preventDefault();
    // console.log('Eliminar usuario ID')
    Swal.fire({
        title: 'Esta seguro de querer eliminar el usuario?',
        text: "Si continua el usuario sera eleminado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo!'
      }).then(async (result) => {
        if (result.isConfirmed) {
            const { status } = await fetch(`/api/users/delete/${userId.value}`, {
                method: "PUT",
              });

              // console.log(status)

          if(status == 201){
            Swal.fire(
                'Usuario Eliminado!',
                'success'
              )
          } 
          window.location.href = "/login";
          

          
        }
      })   
  
     
    
  });
  
  