import React, { useEffect, useRef } from 'react'

function Credit() {
  const heartRef = useRef()
  // Heart beating effect
  useEffect(() => {
    const heartBeating = setInterval(() => {
      if(heartRef.current.style.width === '16px') {
        heartRef.current.style.width = '19px'
        heartRef.current.style.width = '19px'
      } else {
        heartRef.current.style.width = '16px'
        heartRef.current.style.width = '16px'
      }
    }, 500)

    return () => {
      clearInterval(heartBeating)
    }
  }, [])
  const heartWrapper = { maxHeight: '19px', height: '19px', maxWidth: '19px', width: '19px', margin: '0 2px' }
  const heart = { width: '16px', stroke: '#331010', strokeWidth: '5px' }
  
  return (
    <div className="full-center fs11" style={{ letterSpacing: '1.2px', gap: '2px' }}>
        <p className="unselectable bold no-margin ml2">Designed with</p>
        <div style={ heartWrapper } className="full-center" title="LOVE">
            <svg ref={ heartRef } fill="#FF0000" style={ heart } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 94.5"><path d="M86.82,26.63v-7.3H78.64V12H62.27v7.29H54.09v7.3H45.91v-7.3H37.73V12H21.36v7.29H13.18v7.3H5V48.5h8.18v7.29h8.18v7.29h8.19v7.29h8.18v7.3h8.18V85h8.18V77.67h8.18v-7.3h8.18V63.08h8.19V55.79h8.18V48.5H95V26.63Z"/></svg>
        </div>
        <p className="unselectable bold no-margin">by<a href="https://mouad-nassri.netlify.app" rel="noreferrer" target="_blank" className="no-underline" style={{ color: '#1993ff', marginLeft: '4px' }}>Mouad</a></p>
    </div>
  )
}

export default Credit