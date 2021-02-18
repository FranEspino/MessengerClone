import  React, {useState,useEffect} from 'react';
import './App.css';
import {Input,IconButton} from '@material-ui/core';
import Message from './mesagge.jsx'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';


/* configuracion de firebase para utilizar la base de datos */
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCH2Kv75GZcxY167XMjhZuetVvE9WlQcM8",
    authDomain: "msg-clone-71ec0.firebaseapp.com",
    projectId: "msg-clone-71ec0",
    storageBucket: "msg-clone-71ec0.appspot.com",
    messagingSenderId: "584204924861",
    appId: "1:584204924861:web:38568bcd573921b64004d4",
    measurementId: "G-X40ZXREY24"
})



function App() {
  //Estado que utilizatemos
  const [input,setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  /*Insertamos el nombre de usuario */
  useEffect(() => {
    setUsername( prompt("Insert your name"))
   }, [])

  /* Vamos a setear todos los mensajes que inserta el usuario actual y enviarlo a firebase */
  const db = firebaseApp.firestore() //Inicializamos la variabñe db de firebase
  useEffect( () => {
    db.collection('messages') //Llamamos a la coleccion
      .orderBy('timestamp','desc') //ordenamos de forma ascendente
      .onSnapshot(snapshot => { 
      //seteamos los estados del mensajes con los valores que tenemos en firebase, le pasamos la clave del id y el bojeto msg
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message:  doc.data() } ))) 
    })
  }, [])

   const sendMessage = (event) =>{
     //No refrescar la página
      event.preventDefault();
     //vamos a crear o insertar en una coleccion llamada message los valores 
      db.collection('messages').add({
        text: input,
        user: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
     //propagar(mantener lo que tenemos) el arreglo y agregar un nuevo mensaje al final
 
      setInput('');
   }
  return (
    <div className="App">
      <nav className="icon-msg">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/1200px-Facebook_Messenger_logo_2020.svg.png" width="100" height="100"></img>
      </nav>
      <nav className="text-p">
      <h1>Messeger Clone-App <br />by: Fraporitmos 🔥🚀  </h1>
      </nav>
      <form  className="input_message">
           {/*Cargamos el valor del input y cada vez que haya un evento se settee el estado con ese valor*/}

            <Input placeholder="Enter a message..." className="input_user" value={input} onChange={event => setInput(event.target.value)} />
            <IconButton
                disabled={!input}
                variant="contained"
                color="primary"
                type='submit'
                onClick={sendMessage}>
            <SendIcon/>
            </IconButton>
      </form>


      <FlipMove className="container">
      {
        messages.map( ({id,message}) => (
          /*Se pasa el message como objeto para recibir sus dos valores */
          <Message key= {id} message={message} username={username}   /> 
        ))
      }  
      </FlipMove>
    
    </div>
  );
}

export default App;