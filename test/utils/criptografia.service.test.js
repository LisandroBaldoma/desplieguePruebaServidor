import assert from 'node:assert'
import { hashearPassword, ValidarPassword } from '../../src/utils/criptografia.js'

describe('servicio de criptografia', () => {
  it('encripta contraseñas correctamente', () => {
    const password = '123abc'
    const passwordHasheado = hashearPassword(password)
    assert.notStrictEqual(passwordHasheado, password) // realiza !== internamente
  })
  it('compara contraseñas hasheadas correctamente', () => {
    const password = '123abc'
    const passwordHasheado = hashearPassword(password)
    assert.ok(ValidarPassword(password, passwordHasheado))
  })
})

