import { useEffect } from "react"

const useModalEsc = (callback) => {
  useEffect(() => {
    function handleEscapeKey(event) {
      if(event.code === 'Escape') {
        callback()
      }
    }
  
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useModalEsc