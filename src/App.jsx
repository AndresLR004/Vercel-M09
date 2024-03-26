import reactLogo from './assets/react.svg'
import './App.css'
import { LoginRegister } from './auth/LoginRegister'
import { useState, useEffect } from 'react'
//import { createContext } from 'react'

// import { TextToSpeech } from './speechsynthesis/TextToSpeech'
// import { TextToSpeechDoubleClick } from './speechsynthesis/TextToSpeechDobleClick'
// import SpeechAuthorization from './speechsynthesis/SpeechAuthorization'

import { UserContext } from './userContext'
import { Routes,Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Places } from './places/Places'
import { PlacesShow } from './places/PlacesShow'
import { About } from './components/aplicacio/About'
import { NotFound } from './components/aplicacio/NotFound'
import { PlaceEdit } from './places/PlaceEdit'
import { PlacesAdd } from './places/PlacesAdd'
import { PlacesMenu } from './places/PlacesMenu'
import { PlaceGrid } from './places/PlaceGrid'
import { PlacesGrid } from './places/PlacesGrid'
import { PlacesList } from './places/PlacesList'
import { Posts } from './posts/Posts'
import { PostsMenu } from './posts/PostsMenu'
import { PostsList } from './posts/PostsList'
import { PostsGrid } from './posts/PostsGrid'
import { PostsAdd } from './posts/PostsAdd'
import { Post } from './posts/Post'
import { PostEdit } from './posts/PostEdit'
import regenatorRuntime from 'regenerator-runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import dades from './dades.json'
import revis from './reviews.json'
import usus from './usuaris.json'
import { Login } from './auth/Login'
// "leaflet": "^1.9.3",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-leaflet": "^4.2.0",
//     "react-leaflet-marker": "^2.1.0",
//     "react-router-dom": "^6.4.3"
function App() {

  let [usuari, setUsuari] = useState("");
  let [ authToken,setAuthToken] = useState("");


  useEffect(() => {
    // Desa les receptes a localStorage només si no hi ha cap recepta desada encara
    if (!localStorage.getItem('places')) {
      localStorage.setItem('places', JSON.stringify(dades));
    }
    if (!localStorage.getItem('reviews')) {
      localStorage.setItem('reviews', JSON.stringify(revis));
    }
    if (!localStorage.getItem('usuaris')) {
      localStorage.setItem('usuaris', JSON.stringify(usus));
    }
    // NO me calientes
    // if (localStorage.getItem('authToken')) {
    //   let localToken = localStorage.getItem('authToken')
    //   setAuthToken(localToken)
    // }
    // if (localStorage.getItem('usuari')) {
    //   let localUser = localStorage.getItem('usuari')
    //   setUsuari(JSON.stringify(localUser))
    // }
  }, []);


  // const [scrollDirection, setScrollDirection] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const handleCommands = () => {
      if (transcript) {
        const command = transcript.toLowerCase();
        switch (command) {
          case 'su':
            window.scrollBy(0, -300);
            break;
          case 'va' :
            window.scrollBy(0, 300);
            break;
          case 'zo':
            document.body.style.zoom = '110%';
            break;
          case 'le':
            document.body.style.zoom = '90%';
            break;
          default:
            break;
        }
        resetTranscript();
      }
    };

    handleCommands();
  }, [transcript, resetTranscript]);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening(); 
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === 'x') { 
        document.body.style.zoom = '100%'; 
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  

  return (
   <>

    <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken }}>
      
      { authToken != "" ? (
      
        <>
        <Header/>
          <div className="App">
              <button onClick={startListening}>Iniciar reconocimiento</button>
              <button onClick={stopListening}>Detener reconocimiento</button>
            </div>
         <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path="/" element={<Places />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/places" element={<Places />} />
            <Route path="/places/list" element={ <><PlacesMenu/><PlacesList /></> } /> 
            <Route path="/places/grid" element={ <><PlacesMenu/><PlacesGrid /></> } /> 
            <Route path="/places/add" element={ <><PlacesMenu/><PlacesAdd /></> } /> 
            <Route path="/places/edit/:id" element={  <><PlacesMenu/><PlaceEdit /></> } />
            <Route path="/places/:id" element={ <><PlacesMenu/><PlacesShow /></> } /> 

            <Route path="/posts" element={<Posts/>} />
            <Route path="/posts/list" element={ <><PostsMenu/><PostsList/></> } /> 
            <Route path="/posts/grid" element={ <><PostsMenu/><PostsGrid/></> } /> 
            <Route path="/posts/add" element={ <><PostsMenu/><PostsAdd/></> } /> 
            <Route path="/posts/edit/:id" element={  <><PostsMenu/><PostEdit /></> } />
            <Route path="/posts/:id" element={ <><PostsMenu/><Post/></> } /> 
            
            
            
             {/* <Route path="/posts" element={ <Places />} />
            <Route path="/posts/:id" element={<PlacesShow />} /> */}
            <Route path="/about" element={<About />} />
        </Routes>

        {/* <Footer/> */}
       </>

    ) :  <LoginRegister /> }
    
    </UserContext.Provider>

    
    {/* <SpeechAuthorization authorizedKey="s" />
    <TextToSpeech text="Texto a ser leído al hacer clic" />
    <TextToSpeechDoubleClick text="Texto a ser leído al hacer doble clic" /> */}

      {/* <LoginRegister/> */}
   </>
  
  )
}

export default App

