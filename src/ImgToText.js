import Badge from 'react-bootstrap/Badge';
import { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ImgToText.css';
import { NavLink } from 'react-router-dom';
import { FaRegCopy, FaCopy } from 'react-icons/fa';
import copy from 'clipboard-copy';
const ImgtoText = () => {
  const [isloading, Setloading] = useState(false);
  const [response, Setresponse] = useState('Hello! I am Lofi AI, and I am here to welcome you to our chat. I am an AI assistant that can help you with a variety of tasks, including answering your questions, providing information, and generating creative content. I am still under development, but I am always learning and growing. I am excited to help you make the most of your chat experience.\n\t\t\t\t\t\t\t Image to Text \n 1. You can add Single image or mutliple Image. \n 2. Add some prompt .\n 3 .Click Sumbit button.');
  const [currequest, Setcurrequest] = useState('');
  const [request, Setrequest] = useState(
    'welcome the user to your chat and your name was Lofi AI , You trained by Logesh'
  );
  const [isOpen, setIsOpen] = useState(false);
  const [iscopy, setIscopy] = useState(false);
  const [fileInputs, setFileInputs] = useState([]);
  const API_KEY = 'AIzaSyAhJ_QIHXzG0cLuH2HYi4Bir7JvGJlZRsg';
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileInputs((prevFiles) => [...files]);
  };

  async function fileToGenerativeParts(files) {
    const promises = files.map((file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64Data = reader.result.split(',')[1];
          resolve({
            inlineData: {
              data: base64Data,
              mimeType: file.type,
            },
          });
        };

        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
      })
    );

    return Promise.all(promises);
  }

  async function grd(prompt) {
    try {
      if (fileInputs.length > 0) {
        const imageParts = await fileToGenerativeParts(fileInputs);

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return text
      } else {
        console.error('No file selected');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      Setloading(false);
    }
  }
// eslint-disable-next-line
  useEffect(() => {
    grd(request).then((res) => {
      Setresponse(res)
    });
  }, [request , fileInputs]);// eslint-disable-line react-hooks/exhaustive-deps

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const copynav = () => {
    setIscopy((prevIscopy) => !prevIscopy);
  };

  const handleCopy = () => {
    if (response !== '') {
      copy(response);
      alert('Text copied to clipboard!');
    }
  };

  useEffect(() => {
    Setresponse('Welcome To Gemini AI ');
  }, []);

  return (
    <>
      <div id='heading'>
        <span id='spa1'>LoFi AI </span>
        <a href='https://linktr.ee/me_logi' style={{ textDecoration: 'none' }}>
          <span id='spa2'>From Logesh</span>
        </a>
      </div>
    <div className='imgshow'></div>
      <button className='toggle-button' onClick={toggleNav}>
        <Badge>= </Badge>
      </button>

      <div className={`slide-nav ${isOpen ? 'open' : ''}`}>
        <button className='toggle-button' onClick={toggleNav}>
          <Badge>=</Badge>
        </button>
        <ul>
          <li>
            <NavLink to='/' style={{ color: 'white',textDecorationLine:'none' }}>
              Text To Text
            </NavLink>
          </li>
          <li>
            <NavLink to='/img' style={{ color: 'white',textDecorationLine:'none' }}>
              Image To Text
            </NavLink>
          </li>
          <a
            href='https://logesh-works.github.io/'
            style={{ textDecoration: 'none' }}
          >
            <li>About Developer</li>
          </a>
          <li>      <input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        multiple

      />  </li>
            {fileInputs.length > 0 && (
        <div className='selected-files'>
          <p style={{color:'white'}}>Selected Files:</p>
            {fileInputs.map((file, index) => (
              <li key={index}>
                <img className='meshow' src={URL.createObjectURL(file)} alt={`Selected  ${index + 1}`} />
              </li>
            ))}
        </div>
      )}
        </ul>
      </div>



      <textarea
        className='response'
        value={isloading ? 'Loading...' : response}
        readOnly
      ></textarea>
      <button className='copybtn' onClick={() => { copynav(); handleCopy(); }}>
        {iscopy ? <FaCopy /> : <FaRegCopy />}
      </button>
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
};

export default ImgtoText;
