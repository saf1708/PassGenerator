import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")


  //useRef hook

const passRef = useRef(null) 
  

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str +="0123456789"
    if(character) str +="!@#$%&_-*"

    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length,numberAllowed,character,setPassword])

  const coppyPasswordToClipboard = useCallback(()=>{
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0,10) select a range of pass
    window.navigator.clipboard.writeText(password)
  },
[password])

  useEffect(() =>{
    passwordGenerator()
  }, [length,numberAllowed,character,passwordGenerator])
 
  return (
    <>
    <div className='w-full  max-w-xl mx-auto shadow-lg rounded-lg px-16 py-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-center text-white my-2 text-2xl'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passRef} />
        <button onClick={coppyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2 py-3'>
        <div className='flex items-center gap-x-1'>
          <input 
          onChange={(e)=>{setlength(e.target.value)}}
          type="range" min={6}
          max={50} value={length} className='cursor-pointer' />
          <label htmlFor="" >Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id='numberInput'
          onChange={()=>{

            setNumberAllowed((prev) =>!prev);
          }}
          />
          <label htmlFor="" >Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={character} id='character'
          onChange={()=>{

            setCharacter((prev) =>!prev);
          }}
          />
          <label htmlFor="" >Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
