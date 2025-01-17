import fs from 'fs/promises'
import { AccountProps } from '../../app/api/auth/auth.types'
import path from 'path'
export class AccountDb {
  #DB_PATH = path.join(path.resolve('./'), 'db', 'accounts', 'accounts.json')

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

  async getAccounts(sessionId: string) {
    const buffer = await fs.readFile(this.#DB_PATH)
    const data = JSON.parse(buffer.toString()) as AccountProps[]
    return data.filter((account) => account.sessionId === sessionId)
  }

  async getAccount(sessionId: string, accountId: number) {
    const buffer = await fs.readFile(this.#DB_PATH)
    const data = JSON.parse(buffer.toString()) as AccountProps[]
    return data.find((account) => account.sessionId === sessionId && account.id === accountId)
  }

  async removeAccount(sessionId: string, accountId: number) {
    const buffer = await fs.readFile(this.#DB_PATH)
    const data = JSON.parse(buffer.toString()) as AccountProps[]
    const accounts = data.filter((account) => account.sessionId === sessionId && account.id !== accountId)
    await fs.writeFile(this.#DB_PATH, JSON.stringify(accounts))
  }
}

const accountDb = new AccountDb()

export default accountDb
