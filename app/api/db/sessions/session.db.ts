import fs from 'fs/promises'
import { OtpProps, UserProps } from '../../auth/auth.types'
import jwt from 'jsonwebtoken'
import rolesDb from './roles.db'

class Session {
  #DB_PATH = process.env.ENV === 'local' ? process.cwd() + '/app/api/db/sessions/sessions.json' : process.cwd() + '/var/task/tmp/sessions.json'

  async saveOTP(otp: number, user: UserProps) {
    const buffer = await fs.readFile(this.#DB_PATH)
    let data = JSON.parse(buffer.toString()) as OtpProps[]

    const MILLIS_TWO_MINUTE = 120000

    const isRecordExists = data.find((record) => record.email === user.email)

    if (isRecordExists) {
      data = data.filter((record) => record.email !== user.email)
    }

    data.push({
      otp,
      email: user.email,
      user,
      expires: Date.now() + MILLIS_TWO_MINUTE,
    })

    await fs.writeFile(this.#DB_PATH, JSON.stringify(data))
  }

  async checkOTP(otp: number, email: string) {
    const buffer = await fs.readFile(this.#DB_PATH)
    let data = JSON.parse(buffer.toString()) as OtpProps[]

    const record = data.find((record) => record.email === email && record.otp === otp && record.expires > Date.now())
    if (!record) {
      return false
    }

    data = data.filter((record) => record.email !== email)
    await fs.writeFile(this.#DB_PATH, JSON.stringify(data))
    const roles = await rolesDb.getUserRole(record.user.id)
    console.log({ ...record.user, roles })
    const token = jwt.sign({ ...record.user, roles }, process.env.AUTH_SECRET!)
    return token
  }
}

const session = new Session()

export default session
