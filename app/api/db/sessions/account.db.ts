import { AccountProps } from '@/store/account/account.types'
import fs from 'fs/promises'

export class AccountDb {
  #DB_PATH = process.cwd() + '/app/api/db/sessions/accounts.json'

  async saveAccount(sessionId: string, id: number) {
    const buffer = await fs.readFile(this.#DB_PATH)
    const data = JSON.parse(buffer.toString()) as AccountProps[]
    const currentSession = data.find((session) => session.id === id && session.sessionId === sessionId)
    if (currentSession) {
      return
    }
    data.push({ sessionId, id })
    await fs.writeFile(this.#DB_PATH, JSON.stringify(data))
  }
}

const accountDb = new AccountDb()

export default accountDb
