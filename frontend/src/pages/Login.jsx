import { useState } from "react"
import axios from "axios"

const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   console.log(formData)
//   function handleSubmit(event) {
//     event.preventDefault()
//     console.log("Handle submit")
//   }

//   function handleChange(event) {
//     setFormData((prevFormData) => {
//       const { value, name } = event.target
//       return {
//         ...prevFormData,
//         [name]: value,
//       }
//     })
//   }
const [data, setData] = useState({
  email: "",
  password: ""
})
const handleChange = (e)=>{
  let{name, value}= e.target;
  let newData = {...data,[name]:value}
  setData(newData)
}
console.log(data)
// console.log(handleChange)
const handleSubmit = async (e)=>{
  e.preventDefault()
  if(!e.target.checkValidity()){
    console.log('Plis fulls all fields')
  }else{
    let res = await axios.post("http://localhost:5000/api/v1/client/login", data)
    console.log(res)
  }
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          value={data.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={data.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
