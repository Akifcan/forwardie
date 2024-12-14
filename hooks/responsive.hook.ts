import { useEffect, useState } from 'react'

export const useResponsive = () => {
  const [isMobile, setMobile] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setMobile(false)
      } else {
        setMobile(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isMobile,
  }
}
