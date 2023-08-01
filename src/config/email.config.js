// const PROD_EMAIL_CONFIG = {
//   service: 'gmail',
//   port: 587,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// }

// const TEST_EMAIL_CONFIG = {
//   host: 'smtp.ethereal.email',
//   port: 587,
//   auth: {
//     user: process.env.TEST_EMAIL_USER,
//     pass: process.env.TEST_EMAIL_PASS
//   }
// }

// export let EMAIL_CONFIG
// if (process.env.NODE_ENV === 'PROD') {
//   EMAIL_CONFIG = PROD_EMAIL_CONFIG
// } else {
//   EMAIL_CONFIG = TEST_EMAIL_CONFIG
// }



// export const TEST_EMAIL_CONFIG = {
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

export const TEST_EMAIL_CONFIG = {
  service: 'gmail',
  port: 587, 
  secure: false,  
  auth: {
    user: 'lrsolucionesintegrales@gmail.com',
    pass: 'pnhoeujqydsedcyy'
  },
  tls: {
    rejectUnauthorized: false
}
}