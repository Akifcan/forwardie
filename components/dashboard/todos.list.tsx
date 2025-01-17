import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Checkbox } from '@nextui-org/react'
import List from '../list'
import { useQuery } from 'react-query'
import jsonPlaceholderApi from '@/http/json-placeholder.api'
import { TodoProps } from '@/store/todos/todo.types'
import useUserStore from '@/store/user/user.store'
export default function TodosList() {
  const { data, isError, isLoading } = useQuery<{ data: TodoProps[] }>({
    queryKey: ['todos-dashboard'],
    queryFn: () => jsonPlaceholderApi.get('/todos'),
  })

  const { user } = useUserStore()
  const HAS_ACCESS = user?.roles.permissions.find((role) => role === 'view-todo') ? true : false

  return (
    <List hasAccess={HAS_ACCESS} title="Todos" isLoading={isLoading} isError={isError}>
      {data?.data && (
        <Table aria-label="Last 5 Todos">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>COMPLETED</TableColumn>
          </TableHeader>
          <TableBody>
            {data.data.map((todo) => {
              return (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>
                    <Checkbox defaultSelected={todo.completed} size="lg" />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </List>
  )
}
