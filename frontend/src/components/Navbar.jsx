import React from "react"
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div>
      <nav className="container flex w-full bg-amber-100">
        <ul className="flex bg-slate-500 max-w-xl ">
          <li className="bg-gray-800 p-2 ">
            <Link to={`/login`}>Log In</Link>
          </li>
          <li className="bg-red-600 p-2">
            <Link to={`/signup`}>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
