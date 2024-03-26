// import React, { useState, useEffect } from 'react';

// const SpeechAuthorization = ({ authorizedKey }) => {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.ctrlKey && event.altKey && event.key === 's') {
//         setAuthenticated(true);
//         setUsername('Andrés León'); 
//       }
//     };

//     const handleKeyUp = (event) => {
//       if (event.key === authorizedKey) {
//         setAuthenticated(false);
//         setUsername('');
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, [authorizedKey]);

//   return (
//     <div>
//       {authenticated ? (
//         <p>Autorizado como: {username}</p>
//       ) : (
//         <p>Presiona la combinación de teclas Ctrl + Alt + S para autorizar.</p>
//       )}
//     </div>
//   );
// };

// export default SpeechAuthorization;
