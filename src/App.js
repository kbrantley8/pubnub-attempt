import logo from './logo.svg';
import './App.css';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import Chat from './Chat';

function App() {

  const pubnub = new PubNub({
    publishKey: "pub-c-6ca4f175-5e39-4b37-930c-ddf8091ca7e3",
    subscribeKey: "sub-c-b66a8f76-ac44-11eb-a2f9-7226f347561f"
  });

  // Create a room channel
  function onPressCreate(e) {
    // Create a random name for the channel
    var roomId = "CCpp1";
    var lobbyChannel = 'deckderby--' + roomId; // Lobby channel name
    pubnub.subscribe({
      channels: [lobbyChannel],
      withPresence: true // Checks the number of people in the channel
    });
  }

  return (
    <PubNubProvider client={pubnub}>
      <Chat />
    </PubNubProvider>
  );
}

export default App;
