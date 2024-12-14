import { RoleProps } from '@/store/roles/role.types'
import fs from 'fs/promises'

class RolesDb {
  #DB_PATH = process.cwd() + '/app/api/db/sessions/roles.json'

  async getUserRole(userId: number) {
    const buffer = await fs.readFile(this.#DB_PATH)
    const data = JSON.parse(buffer.toString()) as RoleProps[]

    const roles = data.find((user) => user.userId === userId)

    return roles || { userId, permissions: [] }
  }
}

const rolesDb = new RolesDb()

export default rolesDb
