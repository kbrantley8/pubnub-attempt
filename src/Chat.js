import PubNub from 'pubnub';
import { useState, useEffect } from 'react'
import { PubNubProvider, usePubNub } from 'pubnub-react';

function Chat() {
    const pubnub = usePubNub();
    const [channels] = useState(['deckderby']);
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState('');
    const handleMessage = event => {
        console.log(event)
      const message = event.message;
      if (typeof message === 'string' || message.hasOwnProperty('text')) {
        const text = message.text || message;
        console.log(messages)
        addMessage(messages => [...messages, text]);
      }
    };
    useEffect(() => {
      pubnub.addListener({ message: handleMessage });
      pubnub.subscribe({ channels });
    }, [pubnub, channels]);

    const sendMessage = message => {
        if (message) {
            var new_message = {
                'text': message,
                'user': { username: 'butternife' }
            }
          pubnub
            .publish({ channel: channels[0], message: new_message })
            .then(() => setMessage(''));
        }
    };

    const pageStyles = {
        alignItems: 'center',
        background: '#282c34',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
      };
  
      const chatStyles = {
        display: 'flex',
        flexDirection: 'column',
        height: '50vh',
        width: '50%',
      };
  
      const headerStyles = {
        background: '#323742',
        color: 'white',
        fontSize: '1.4rem',
        padding: '10px 15px',
      };
  
      const listStyles = {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'auto',
        padding: '10px',
      };
  
      const messageStyles = {
        backgroundColor: '#eee',
        borderRadius: '5px',
        color: '#333',
        fontSize: '1.1rem',
        margin: '5px',
        padding: '8px 15px',
      };
  
      const footerStyles = {
        display: 'flex',
      };
  
      const inputStyles = {
        flexGrow: 1,
        fontSize: '1.1rem',
        padding: '10px 15px',
      };
  
      const buttonStyles = {
        fontSize: '1.1rem',
        padding: '10px 15px',
      };

    return (
        <div style={pageStyles}>
          <div style={chatStyles}>
            <div style={headerStyles}>React Chat Example</div>
            <div style={listStyles}>
              {messages.map((message, index) => {
                return (
                  <div key={`message-${index}`} style={messageStyles}>
                    {message}
                  </div>
                );
              })}
            </div>
            <div style={footerStyles}>
              <input
                type="text"
                style={inputStyles}
                placeholder="Type your message"
                value={message}
                onKeyPress={e => {
                  if (e.key !== 'Enter') return;
                  sendMessage(message);
                }}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                style={buttonStyles}
                onClick={e => {
                  e.preventDefault();
                  sendMessage(message);
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
    )

}

export default Chat