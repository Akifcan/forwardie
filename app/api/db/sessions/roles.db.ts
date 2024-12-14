import { RoleProps } from '@/store/roles/role.types'
import fs from 'fs/promises'

class RolesDb {
  #DB_PATH = process.cwd() + '/app/api/db/sessions/roles.json'
  #ROLES?: RoleProps[]

  async getUserRole(userId: number) {
    const buffer = await fs.readFile(this.#DB_PATH)
    const data = JSON.parse(buffer.toString()) as RoleProps[]
    this.#ROLES = data

    const roles = data.find((user) => user.userId === userId)

    return roles || { userId, permissions: [] }
  }
  async hasRole(userId: number, role?: string) {
    if (!this.#ROLES) {
      const buffer = await fs.readFile(this.#DB_PATH)
      const data = JSON.parse(buffer.toString()) as RoleProps[]
      this.#ROLES = data
    }

    const roles = this.#ROLES.find((user) => user.userId === userId)

    if (!roles) {
      return false
    }

    const isExists = roles.permissions.find((permission) => permission === role)

    if (!isExists) {
      return false
    }

    return true
  }
}

const rolesDb = new RolesDb()

export default rolesDb
