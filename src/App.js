import React , {useEffect , useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

   const [id, setId] = useState(1);
   const [topic, setTopic] = useState('');

  useEffect(()=>{

    let id = 2 ; 

    const myquery =  `
    query getcourse($id : Int! ){
      course( id:$id  ){
        id
        title
      }
    }
    `
    
  

    fetch('http://localhost:4000/graphql' , {
      headers : { 'Content-Type' : 'application/json' } , 
      method : 'post' ,
      body : JSON.stringify(
        {
          query : myquery ,
          variables : { id  }

        }
      )
    })
    .then( res => res.json() )
    .then( data => console.log(data) )
  } , [])

  const handleSubmit = () =>{
    const myquery =  `
    mutation getcourse($id : Int! , $topic: String! ){
      updateTopic( id:$id  , topic : $topic ){
        id
        title
      }
    }
    `
    
  

    fetch('http://localhost:4000/graphql' , {
      headers : { 'Content-Type' : 'application/json' } , 
      method : 'post' ,
      body : JSON.stringify(
        {
          query : myquery ,
          variables : { id , topic  }

        }
      )
    })
    .then( res => res.json() )
    .then( data => console.log(data.data.updateTopic) )
  }

  return (
    <div className="App">
      <h2> Change topic  </h2>
      <input value = { id } onChange={ e => setId(+(e.target.value))  } />
      <input value={topic}  onChange={ e => setTopic(e.target.value)  } />
      <button onClick={handleSubmit}> Submit </button>
    </div>
  );
}

export default App;
