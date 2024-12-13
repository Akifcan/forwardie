import fs from 'fs/promises'
import { OtpProps } from '../../auth/auth.types'
class Session {
  DB_PATH = process.cwd() + '/app/api/db/sessions/sessions.json'

  async saveOTP(otp: number, email: string) {
    const buffer = await fs.readFile(this.DB_PATH)
    const data = JSON.parse(buffer.toString()) as OtpProps[]

    const MILLIS_TWO_MINUTE = 120000

    data.push({
      otp,
      email,
      expires: new Date().getTime() + MILLIS_TWO_MINUTE,
    })

    await fs.writeFile(this.DB_PATH, JSON.stringify(data))
  }

  async checkOTP() {}
}

const session = new Session()

export default session
