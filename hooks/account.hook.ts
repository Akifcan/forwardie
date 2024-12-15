import { AccountProps } from '@/store/account/account.types'

export const useAccount = () => {
  const saveToAccounts = (account: AccountProps) => {
    const accounts = JSON.parse(localStorage.getItem('accounts') ?? '[]')
  }

  return {
    saveToAccounts,
  }
}
