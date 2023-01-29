import {useState } from "react"
import axios from "axios"

const signUp = () => {
  const [data, setData] = useState({
    name:"",
    email: "",
    password: ""
  })
  const handleChange = (e)=>{
    let{name, value}= e.target;
    let newData = {...data,[name]:value}
    setData(newData)
  }
  // console.log(handleChange)
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!e.target.checkValidity()){
      console.log('nanai')
    }else{
      let res = await axios.post("http://localhost:5000/api/v1/client/signup", data)
      console.log(res)
    }
  }
  return (
    <div>
      <form 
      onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          id="email"
          value={data.name}
          placeholder="Enter your name"
          onChange={handleChange}
        />
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
        <button type="submit">register</button>
      </form>
    </div>
  )
}


// async function postData(url = "", data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "no-cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json"
//     },

//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   })
//   // response.header("Access-Control-Allow-Origin", "*")
//   // response.header("Access-Control-Allow-Headers", "*")
//   return response.json() // parses JSON response into native JavaScript objects
// }

export default signUp
