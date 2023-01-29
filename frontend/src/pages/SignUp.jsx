import { useEffect, useState } from "react"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: ""
  })
  console.log(formData)
  function handleSubmit(event) {
    event.preventDefault()
    postData("http://localhost:5000/api/v1/client/signUp", {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }).then((data) => {
      console.log(data) // JSON data parsed by `data.json()` call
    })
    setFormData({name:"", email: "", password: "" })
    console.log(formData)
    
  }

  function handleChange(event) {
    setFormData((prevFormData) => {
      const { value, name } = event.target
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleChange}
        />
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
        <button type="submit">resgister</button>
      </form>
    </div>
  )
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },

    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  // response.header("Access-Control-Allow-Origin", "*")
  // response.header("Access-Control-Allow-Headers", "*")
  return response.json() // parses JSON response into native JavaScript objects
}

export default SignUp
