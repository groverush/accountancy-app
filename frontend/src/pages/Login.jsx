import { useState } from "react"
import axios from "axios"

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    let { name, value } = e.target
    let newData = { ...data, [name]: value }
    setData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!e.target.checkValidity()) {
      console.log("Please fill all fields")
    } else {
      let res = await axios.post(
        "http://localhost:5000/api/v1/client/login",
        data
      )
      console.log(res)
    }
  }
  return (
    <div className="flex justify-center items-center  align-middle h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex flex-col justify-center items-center rounded-md px-12 py-8 bg-white min-w-max shadow shadow-xl">
        <h3 className="text-3xl mb-4 font-bold">Login</h3>
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
          <input
            className="px-1 py-3 focus:border-hidden border-b-2 border-gray-300 placeholder:italic placeholder:text-slate-400"
            type="text"
            name="email"
            id="email"
            value={data.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <input
            className="px-1 py-3 focus:border-hidden border-b-2 border-gray-300 placeholder:italic placeholder:text-slate-400"
            type="password"
            name="password"
            id="password"
            value={data.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button
            className="px-2 py-4 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold hover:bg-gradient-to-r hover:from-violet-400 hover:to-pink-500"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
