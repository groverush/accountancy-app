import { useState } from "react"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  console.log(formData)
  function handleSubmit(event) {
    event.preventDefault()
    console.log("Handle submit")
  }

  function handleChange(event) {
    setFormData((prevFormData) => {
      const { value, name } = event.target
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
