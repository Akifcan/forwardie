import { string, object } from 'yup'

const roleSchema = object({
  role: string().oneOf(['view-post', 'view-album']),
})

export default roleSchema
