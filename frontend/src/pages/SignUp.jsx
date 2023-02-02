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
    
<div className="flex justify-center items-center h-screen bg-slate-500 ">
    <div className="flex justify-center items-center p-9  bg-slate-900">
      <form 
      className="flex flex-col gap-x-0.5"
      onSubmit={handleSubmit}
      >
        <input
        className="p-4"
          type="text"
          name="name"
          id="email"
          value={data.name}
          placeholder="Enter your name"
          onChange={handleChange}
        />
        <input
        className="p-4"
          type="text"
          name="email"
          id="email"
          value={data.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <input
        className="p-4"
          type="password"
          name="password"
          id="password"
          value={data.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button className="button" type="submit">register</button>
      </form>
    </div>
  </div>
  )
}


export default signUp
