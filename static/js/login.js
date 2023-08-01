
const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {

      const datosUsuario = {        
        email: input_email.value,
        password: input_password.value,
      }

      const respuesta = await fetch('http://localhost:8080/api/sessions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)        
      })
      //console.log(respuesta)

      if (respuesta.status === 201) {
        window.location.href = '/products'
      } else {
        alert("El usuario NO ESTA REGISTRADO EN LA BD")
        //console.log('[login] estado inesperado: ' + respuesta.status)
      }
    }
  })
}