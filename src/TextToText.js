import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaRegCopy , FaCopy} from "react-icons/fa";
import copy from 'clipboard-copy';
import "./TextToText.css"
import { NavLink } from 'react-router-dom';
const TextToText = () => {
    const [isloading , Setloading] = useState(false)
    const [response , Setresponse] = useState("Hello! I am LoFi AI, and I am here to welcome you to our chat. I am an AI assistant that can help you with a variety of tasks, including answering your questions, providing information, and generating creative content. I am still under development, but I am always learning and growing. I am excited to help you make the most of your chat experience.");
    const [currequest , Setcurrequest] = useState("");
    const [request , Setrequest] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [iscopy, setIscopy] = useState(false);
    const API_KEY = "AIzaSyAYBEAabIlaCz0FAZpNDQPRfJDKrC0u2yY"
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
      console.log(1)
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
    return (
      <>
      <div id='heading'>
        <span id="spa1">LoFi AI </span>
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
        <li>
            <NavLink to="/" style={{color:'white',textDecorationLine:'none'}}>Text To Text</NavLink>
            </li>
          <li>
            <NavLink to="/img" style={{color:'white',textDecorationLine:'none'}}>Image To Text</NavLink>
          </li>
          <a href="https://logesh-works.github.io/" style={{textDecoration:"none"}}><li>About Developer</li></a>
        </ul>
      </div>
      {/* <div className='response'><p>{response}</p></div> */}
      <textarea className='response' value={(isloading ? "Loading...":response)} readOnly></textarea>
      <button className='copybtn' onClick={()=>{copynav()
      handleCopy()}}>{(iscopy ? <FaCopy /> : <FaRegCopy />  )}</button>
<form
  onSubmit={(e) => {
    e.preventDefault(); // Prevents the form from submitting normally
    if (currequest === '') {
      Setresponse('Please enter some text');
    } else {
      Setrequest(currequest);
      Setloading(true);
    }
  }}
>
  <textarea
    className='protext'
    rows="1"
    onChange={(e) => {
      Setcurrequest(e.target.value);
    }}
    value={currequest}
    placeholder='Search Here...'
    onKeyDown={(e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevents the default behavior of the Enter key
        // Trigger the form submission
        if (currequest === '') {
          Setresponse('Please enter some text');
        } else {
          Setrequest(currequest);
          Setloading(true);
        }
      }
    }}
  ></textarea>
  <button type="submit" className='submit'>
    Submit
  </button>
</form>

      
      </>
    );
}

export default TextToText;
