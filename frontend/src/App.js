import logo from './logo.svg';
import './App.scss';
import Registration from './containers/Registration';
import Login from './containers/Login';
import Home from './containers/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Redirect
} from "react-router-dom";
import { useGlobalState } from './store';
import { useEffect } from 'react';

function App() {
  const [socket, setSocket] = useGlobalState('socket')
  const [conversationMessages, setConversationMessages] = useGlobalState('conversationMessages')
  useEffect(() => {
    // console.log('count')

    // const handleUpdateMessage = ({ data, conversationId }) => {
    //   let conversationMessagesTemp = { ...conversationMessages }
    //   conversationMessagesTemp[conversationId].push(data)
    //   setConversationMessages(conversationMessagesTemp)
    // };

    // socket.on("updateMessage", ({ data, conversationId }, handleUpdateMessage) => {
    //   let conversationMessagesTemp = { ...conversationMessages }
    //   conversationMessagesTemp[conversationId].push(data)
    //   setConversationMessages(conversationMessagesTemp)
    // })

    // return () => {
    //   socket.off("updateMessage", handleUpdateMessage);
    // };

    console.log('count')
    const handleUpdateMessage = ({ data, conversationId }) => {
      let conversationMessagesTemp = { ...conversationMessages }
      conversationMessagesTemp[conversationId].push(data)
      setConversationMessages(conversationMessagesTemp)
    };

    socket.on("updateMessage", handleUpdateMessage);

    return () => {
      socket.off("updateMessage", handleUpdateMessage);
    };

  }, [socket])
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* <Route exact path='/'>
          </Route> */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
