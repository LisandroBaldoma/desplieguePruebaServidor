import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ValidarPassword } from "../utils/criptografia.js";
import { ErrorDeAutenticacion } from "../dao/Models/errors/ErrorDeAutenticacion.js";
import { Strategy as GithubStrategy } from "passport-github2";
import {
  JWT_PRIVATE_KEY,
  githubCallbackUrl,
  githubClientSecret,
  githubClienteId,
} from "../config/auth.config.js";
import { userRepository } from "../repositories/user.repository.js";

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      //console.log(username, password);
      console.log('pasaport login')
      try {
        const user = await userRepository.findOne({ email: username });
        //console.log("Este es el usuaario que tenria que encontrar", user);
        if (!user) {
         return done(new ErrorDeAutenticacion());
        }
        if (!ValidarPassword(password, user.password)){
          return done(new ErrorDeAutenticacion());
        }        
        // console.log(user)
        delete user.password;
        user.last_connection = new Date().toLocaleString()
        user.save()
        //console.log(user)
        done(null, user);
        
      } catch (error) {
       return done(new Error('NOT FOUND ERROR') )
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: githubClienteId,
      clientSecret: githubClientSecret,
      callbackURL: githubCallbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log(profile);
      const user = {
        name: profile.username,
        profile: profile
      };
      done(null, user);
    }
  )
);

//TODO de acá saqué todo lo que tiene que ver con session! ---------------------------

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize();
export const passportSession = passport.session();

// estos son para cargar como middlewares antes de los controladores correspondientes
export const autenticacionUserPass = passport.authenticate("local", {
  failWithError: true,
});
export const autenticacionPorGithub = passport.authenticate("github", {
  scope: ["user:email"],
});
export const antenticacionPorGithub_CB = passport.authenticate("github", {
  failWithError: true,
});

//TODO hasta acá ----------------------------------------------------------------------

//TODO agregado para jwt desde acá ---------------------------------------------------------

// import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

// passport.use('jwt', new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
//         let token = null
//         if (req && req.signedCookies) {
//             token = req.signedCookies['jwt_authorization']
//         }
//         return token
//     }]),
//     secretOrKey: JWT_PRIVATE_KEY,
// }, async (jwt_payload, done) => {
//     try {
//         done(null, jwt_payload) // payload es el contenido del token, ya descifrado
//     } catch (error) {
//         done(error)
//     }
// }))

// export function autenticacionJwtApi(req, res, next) {
//     passport.authenticate('jwt', (error, jwt_payload, info) => {
//         if (error || !jwt_payload) return next(new ErrorDeAutenticacion())
//         req.user = jwt_payload
//         next()
//     })(req, res, next)
// }

// export function autenticacionJwtView(req, res, next) {
//     passport.authenticate('jwt', (error, jwt_payload) => {
//         if (error || !jwt_payload) return res.redirect('/login')
//         req.user = jwt_payload
//         next()
//     })(req, res, next)
// }
//TODO hasta acá ---------------------------------------------------------
