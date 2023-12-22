import './App.css';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaRegCopy , FaCopy} from "react-icons/fa";
import copy from 'clipboard-copy';

function App() {
  const [isloading , Setloading] = useState(true)
  const [response , Setresponse] = useState("");
  const [currequest , Setcurrequest] = useState("");
  const [request , Setrequest] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [iscopy, setIscopy] = useState(false);
  const API_KEY = "AIzaSyAs2stO1DOojDmaxRYwZpVLSvofVh-KYdk"
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  async function grd(prompt) {
    try {
      const result = await model.generateContent(prompt)
      const response = await result.response;
      let text = response.text();
      return text;
    } catch (error) {
      Setresponse(error.text)
      console.log(error.text)
    }
    finally{
      Setloading(false)
    }
      /* const result = await model.generateContent(prompt)
      .catch((Error) => { Setresponse() })
      .finally(() => {Setloading(false)});   */
      
  }
  // eslint-disable-next-line
  useEffect(() => {
    
    grd(request).then((res) => Setresponse(res) )
      
  }
    ,[request]);// eslint-disable-line react-hooks/exhaustive-deps
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  const copynav = () => {
    if(iscopy !== true){
      setIscopy(true)
    }
    else{
      setIscopy(false)
    }
  };
  const handleCopy = () => {
    if (response !== "") {
      copy(response);
      alert('Text copied to clipboard!');
    }
  }; 
  useEffect(() => {Setresponse("Welcome To Gemini AI ")} , [])
  return (
    <>
    <div id='heading'>
      <span id="spa1">GEMINI AI </span>
      <a href='https://linktr.ee/me_logi' style={{textDecoration:"none"}}><span id="spa2">From Logesh</span></a>
    </div>
    
    <button className="toggle-button" onClick={toggleNav}>
        <Badge>= </Badge>
      </button>
    <div className={`slide-nav ${isOpen ? 'open' : ''}`}>
    <button className="toggle-button" onClick={toggleNav}>
        <Badge>=</Badge>
      </button>
      <ul>
        <li>Text To Text</li>
        <li onClick={() => alert("Still under development")}>Image To Text</li>
        <a href="https://logesh-works.github.io/" style={{textDecoration:"none"}}><li>About Logesh</li></a>
      </ul>
    </div>
    {/* <div className='response'><p>{response}</p></div> */}
    <textarea className='response' value={(isloading ? "Loading...":response)} readOnly></textarea>
    <button className='copybtn' onClick={()=>{copynav()
    handleCopy()}}>{(iscopy ? <FaCopy /> : <FaRegCopy />  )}</button>
    <textarea className='protext' rows="1" onChange={(e) => {Setcurrequest(e.target.value) 
}} value={currequest} placeholder='Search Here...'></textarea>
    <button className='submit' onClick={() => {(currequest === "" ? Setresponse("Please enter some text"):Setrequest(currequest))
  Setloading(true)}}>Submit</button>
    
    </>
  );
}

export default App;
