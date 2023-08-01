console.log("estoy en update passsword")

const formLogin = document.querySelector('#formupdatePasword')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')
    const input_ConfirmPassword = document.querySelector('#input_ConfirmPassword')
    const input_Token = document.querySelector('#input_Token')
    
    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement &&
      input_ConfirmPassword instanceof HTMLInputElement
    ) {

      const datosUsuario = {        
        email: input_email.value,
        newPassword: input_password.value,
        confirmPassword:input_ConfirmPassword.value,
        token: input_Token.value
      }

      const respuesta = await fetch('http://localhost:8080/api/user/passwordupdate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)        
      })
      
      console.log(respuesta)
      if (respuesta.status === 200) {
        alert('La contraseña fue actualizada con exito, en segundos sera redireccionado a la pagina de Login')
        setTimeout(function(){
            window.location.href = '/login'
        }, 5000);
      } else {
        alert('Error al cambiar la contraseña, revise los datos antes de enviarlos nuevamente')
        
      }
    }
  })
}