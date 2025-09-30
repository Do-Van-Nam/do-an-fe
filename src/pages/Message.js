import React, { useContext, useEffect, useState,useRef } from 'react';
import api from '../api';
import { AppContext } from '../AppContext';

export default function Message() {
  const { acc } = useContext(AppContext);
  const [chatters, setChatters] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chosenChat, setChosenChat] = useState(-1);
  const messagesEndRef = useRef(null);
  const [chatMessage,setChatMessage]  = useState("")
  useEffect(() => {
    try {
      api.get(`/chatroom/${acc._id}`)
        .then(response => {
          setChatters(response.data.users);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    } 
  }, [acc]);
 
  const fetchMessage = async (chatRoomId) => {
    try {
      const response = await api.get(`/message/chatRoomId/${chatRoomId}`);
      const messages = response.data.messages;
      const sortedMessages = messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setMessages(sortedMessages);

      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.log(error);
    }
  };
const handleSendMessage = async()=>{
  try {
    const response  = await api.post(`/message/`,{
      chatRoomId : chatters[chosenChat].chatRoomId,
      senderId: acc._id,
      content: chatMessage,
      createdAt: new Date()

    })
    setMessages(prevMessages=>[...prevMessages,response.data.message])
    setChatMessage("")
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className='d-flex position-relative' style={{ height: '100vh', width: '100vw',maxWidth:'100vw' }}>
      <div className='border border-black d-flex flex-column' style={{ width: '25%', height: '100%', paddingTop: '100px' }}>
        {chatters.length ===0 ? (<h3 style={{textAlign:'center'}}>Bạn chưa có tin nhắn nào</h3>):(<></>)}
        
        {chatters.map((e, i) => (
          <div
            key={i}
            className={`border border-black ${i === chosenChat ? 'bg-body-secondary' : ''} d-flex justify-content-around align-items-center`}
            onClick={() => {
              setChosenChat(i);
              fetchMessage(e.chatRoomId);
            }}
            style={{ width: '100%', height: '100px', cursor: 'pointer' }}
          >
            <h5>{e.name}</h5>
            <i className="bi bi-three-dots"></i>
          </div>
        ))}
      </div>

      <div className=' d-flex flex-column' style={{ width: '75%', height: '100vh',maxHeight:'100vh', paddingBottom: '10vh', overflowY: 'auto' }}>
        <div 
        className='d-flex flex-column justify-content-end'
        style={{ paddingBottom: '2vh', paddingTop:'10vh' }}> 
          {messages.map((e, i) => (
            <div key={i} className={`${e.senderId === acc._id ? 'align-self-end' : 'align-self-start'} shadow-sm p-3 mb-2 rounded border border-dark-subtle`} style={{ maxWidth: '60%', width: 'auto' }}>
              {e.content}
            </div>
          ))}
          <div ref={messagesEndRef}/>
        </ div  >

        <div className="input-group position-absolute bottom-0 end-0" style={{ width: '75%' }}>
          <input
            type="text"
            className="form-control border border-black mb-4"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            onChange={(e)=>setChatMessage(e.target.value)}
            value={chatMessage}
          />
          <span className="input-group-text bg-white border border-black mb-4"
          onClick={handleSendMessage}
          >
            <i className="bi bi-send"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
