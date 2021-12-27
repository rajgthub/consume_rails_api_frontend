import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    
    (async function(){
      if(!document.cookie?.split(";")[0].split("=")[1]){
        const {data} = await axios.post("http://localhost:3000/v1/sessions?email=rraju@gmail.com&password=123456")
        document.cookie = `appAuth=${data.data.jwt_token}`
      }

      const contact = await axios.post("http://localhost:3000/v1/contacts", 
      {
        "first_name": "contact two first:REacg name ...",
        "last_name": "contact two last:React name",
        "email": "rraju12@gmail.com",
       },
       {
         headers: {
           Authorization: 'Bearer ' + document.cookie.split(";")[0].split("=")[1]
         }
       })
       const contacts = await axios.get("http://localhost:3000/v1/contacts", { withCredentials: true })
       setContacts(contacts.data)
    })();
  

  }, [])
  return (
    <div className="App">
      <p>{JSON.stringify(contacts)}</p>
    </div>
  );
}

export default App;
