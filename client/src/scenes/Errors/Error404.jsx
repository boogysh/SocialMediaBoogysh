import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './error.css'

function Error() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 400)
  }, [])
  return (
    show && (
      <div className="main_error">
        <h1 className="h1_error">404</h1>
        <h2 className="h2_error">
          Oups! La page que <span className='br'><br/></span> vous demandez n'existe pas
        </h2>
        <Link to="/" className="link_error">
          Retournez sur la page d'accueil
        </Link>
      </div>
    )
  )
}
export default Error