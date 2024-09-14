import React, {useState } from 'react'
import axios from 'axios'

function App() {
  const [videoName, setVideoName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/process_video', {
        video_name: videoName,
      })
      setMessage(response.data.message)
    } catch (error) {
      console.error('ERROR: ', error)
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
        placeholder="Enter video name"
      />
      <button onClick={handleSubmit}> Submit </button>
      <p> {message} </p>

    </div>
  )
}

export default App