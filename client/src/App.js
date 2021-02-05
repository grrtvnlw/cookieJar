import React, {useState} from 'react'
import './App.css';

function App() {
const [input, setInput] = useState('');
const [route, setRoute] = useState('');
const [clear, setClear] = useState('');
const [cookie, setCookie] = useState([]);
const [data, setData] = useState()

  const fetchCookie = async () => {
    await fetch(`http://localhost:3000/giveCookie/${input}`, 
    {credentials: 'include'})
    .then(res => res.json())
    .then(data => setCookie([...cookie, data]))
    setData('')
    setInput('')
  };

  const clearCookies = async () => {
    await fetch(`http://localhost:3000/clearCookies/${clear}`, 
    {credentials: 'include'})
    .then(res => {
      const filtered = cookie.filter(cookie => cookie !== `${clear} 🍪`)
      console.log(filtered)
      res.status === 200 && setCookie(filtered)
    })
    setData('')
    setClear('')
  }

  const protectedRoute = async () => {
    await fetch(`http://localhost:3000/protectedRoute/${route}`, {credentials: 'include'})
    .then(res => res.json())
    .then(data => {
      setData(data)
      setRoute('')
    })
  }
 
  return (
    <div className="App">
      <header className="App-header">
        <br />
        <br />
        Cookie name: <input value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={() => fetchCookie('admin')}>Add 🍪</button>
        <br />
        Cookie to clear: <input value={clear} onChange={(e) => setClear(e.target.value)}></input>
        <button onClick={() => clearCookies()}>Clear 🍪</button>
        <br />
        Route to access: <input value={route} onChange={(e) => setRoute(e.target.value)}></input>
        <button onClick={() => protectedRoute()}>Access?</button>
            <p>
              Current Valid Cookies
              <br />
              {cookie.map((cookie) => {
                return (
                   cookie
                )
              })}
            </p>
            <br />
            {data}
      </header>
    </div>
  );
}

export default App;
