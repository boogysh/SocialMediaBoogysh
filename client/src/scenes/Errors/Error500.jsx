import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './error.css'

function Error500() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 200)
  }, [])
  return (
    show && (
      <div className="main_error">
        <h1 className="h1_error">500</h1>
        <h2 className="h2_error">Oups! Problème server!</h2>
        <Link to="/" className="link_error">
          Retournez sur la page d'accueil
        </Link>
      </div>
    )
  )
}
export default Error500