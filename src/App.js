
import './App.css';

import Modal from './Modal';

import {useState} from "react";

import { upperCaseLetters,lowerCaseLetters,numbers,special } from './data';

function App() {

  const [password,setPassword]=useState("");
  const [counter,setCounter]=useState(6);
  const [isUppercase,setUppercase]=useState(false);
  const [isLowercase,setLowercase]=useState(false);
  const [isNumber,setNumber]=useState(false);
  const [isSymbol,setSymbol]=useState(false);
  const [modal,setModal]=useState({
    title:"",
    show:false,
    message:"",
  });

  const increaseCounter = (e) =>{
    e.preventDefault();

    if(counter <20){

      setCounter((prevCounter) => prevCounter+1);
    }
  };

  const decreaseCounter = (e) =>{
    e.preventDefault();

    if(counter >6){

      setCounter((prevCounter) => prevCounter-1);
    }
  };


  const getpassword = (e) =>{
    e.preventDefault();

    let _password = "";
    //console.log(counter);
    for(let i=0;i<counter;i++) {
     // console.log(getRandom());
      _password+=getRandom();
    }
    //console.log(_password);
    setPassword(_password);
  };

  const getRandom = () =>{
    const chars=[];

    if(isUppercase){
     // console.log(upperCaseLetters);
      //console.log(Math.floor(Math.random()*upperCaseLetters.length));
      chars.push(upperCaseLetters[Math.floor(Math.random()*upperCaseLetters.length)]
      );
    }

    if(isLowercase){
      chars.push(lowerCaseLetters[Math.floor(Math.random()*lowerCaseLetters.length)]
      );
    }

    if(isNumber){
      chars.push(numbers[Math.floor(Math.random()*numbers.length)]
      );
    }

    if(isSymbol){
      chars.push(special[Math.floor(Math.random()*special.length)]
      );
    }

    if(chars.length===0) return "";

    return chars[Math.floor(Math.random()*chars.length)];
  };

  const createCopy = () =>{
    const textAreaEl=document.createElement("textarea");
    textAreaEl.innerText=password;
    document.body.appendChild(textAreaEl);
    textAreaEl.select();
    navigator.clipboard.writeText(textAreaEl.value);
    textAreaEl.remove();
  }

  const copyPasswordHandler = (e) =>{
    e.preventDefault();

    if(password.trim().length===0){
      setModal({
        title:"Error",
        message:"There is nothing to copy",
        show:true,
      });
    }

    else{
      setModal({
        title:"Succes",
        message:"Password successfully copied to clipboard",
        show:true,
      });
    }
    createCopy();
  };

  const closeModalHandler = () => {
    setModal({...modal,show:false});
  };

  return (
    <div className="App">
      {modal.show && <Modal onClose={closeModalHandler}title={modal.title} message={modal.message} />}

      <div className="generator">
        <h2 className="generator_title">Password Generator</h2>
        <h4 className="password">{password}</h4>
      


      <form className="generator_form">
        <div className="generator_form_controls">

          <div className="generator_form_control">
            <label htmlFor="uppercase">Uppercase</label>
            <input checked={isUppercase} onChange={(e)=>setUppercase(e.target.checked)}type="checkbox" id='uppercase' name='uppercase' />
          </div>

          <div className="generator_form_control">
            <label htmlFor="lowercase">Lowercase</label>
            <input checked={isLowercase} onChange={(e)=>setLowercase(e.target.checked)}type="checkbox" id='lowercase' name='lowercase' />
          </div>

          <div className="generator_form_control">
            <label htmlFor="numbers">Numbers</label>
            <input checked={isNumber} onChange={(e)=>setNumber(e.target.checked)}type="checkbox" id='numbers' name='numbers' />
          </div>

          <div className="generator_form_control">
            <label htmlFor="symbols">Symbols</label>
            <input checked={isSymbol} onChange={(e)=>setSymbol(e.target.checked)}type="checkbox" id='symbols' name='symbols' />
          </div>


          <div className="generator_length">
            <h4 className="generator_length_title">Password Length</h4>
            <div className="generator_length_counter">
              <button onClick={decreaseCounter}>-</button>
              <span>{counter}</span>
              <button onClick={increaseCounter}>+</button>
            </div>
          </div>

          <div className="generator_form_actions">
            <button className='btn generator-btn' onClick={getpassword}>Generator Password</button>
            <button className='btn copy-btn' onClick={copyPasswordHandler}>Copy Password</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

export default App;
