import React from "react"
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/login`}>Log In</Link>
          </li>
          <li>
            <Link to={`/signup`}>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
