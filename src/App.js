import { useState, useSyncExternalStore } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [img, setImg] = useState("");
  function handleSearch(event) {
    //console.log("yadda yadda"); (just do in the process to check it is working)
    setSearchQuery(event.target.value);
    //console.log(searchQuery);(just to check it is working on the screen)
  }
  async function getImage() {
    try {
      const API = `http://localhost:8090/photos?subject=${searchQuery}`;
      const res = await axios.get(API);
      //console.log(res.data);
      setImg(res.data[0].img_url);
    } catch (error) {
      console.log(error);
    }
  }

  /*App.get("/photos", (request, response) => {
    const subject = request.query.subject;
    const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query${subject}`;
    const res = await axios.get(API);
    const photos=res.data.results.map((photo)=>{
      return{
        id: photo.id,
        img_url: photo.urls.regular,
        original_image: photo.links.self,
        photographer: photo.user.name,
    }
  });*/

  return (
    <div className="App">
      <header className="App-header">
        <h1>Find any image</h1>
        <input type="text" placeholder="enter image subject" on onChange={handleSearch} />
        <button>Explore!</button>
        {img && <img src={img} alt={searchQuery} />}
      </header>
    </div>
  );
}

export default App;
