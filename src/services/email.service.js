import { createTransport } from 'nodemailer'
import { TEST_EMAIL_CONFIG } from '../config/email.config.js'

// const TEST_EMAIL_CONFIG = {
//   host: 'smtp.ethereal.email',
//   port: 587, 
//   secure: false,  
//   auth: {
//     user: 'katharina19@ethereal.email',
//     pass: '6KrF2J2yPV9KvKvrXV'
//   },
//   tls: {
//     rejectUnauthorized: false
// }
// }

class EmailService {
  #clienteNodemailer

  constructor(config) {
    this.#clienteNodemailer = createTransport(config)
  }

  // async send(destinatario, mensaje) {
  //   const mailOptions = {
  //     from: 'Enviador de mails molesto',
  //     to: destinatario,
  //     subject: 'Mail molesto!',
  //     text: mensaje,
  //   }
    async send(options) {
      const mailOptions = options
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      console.log(info)
      return info
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

// class EmailServiceMock {

//   constructor(config) { }

//   async send(destinatario, mensaje) {
//     console.log(`${destinatario}:  ${mensaje}`)
//     return { destinatario, mensaje }
//   }
// }

// const emailServiceMock = new EmailServiceMock()
const emailServiceGmail = new EmailService(TEST_EMAIL_CONFIG)

export const  emailService = emailServiceGmail
// if (process.env.NODE_ENV === 'PROD') {

// } else {
//   emailService = emailServiceMock
// }

