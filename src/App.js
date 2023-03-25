import './App.css';
import {useState,useEffect} from 'react';
import Songs from './components/songs'

const CLIENT_ID="080182a5272247af8050d697d89f5ca2";
const CLIENT_SECRET="54d51b3f599543d5b8ceff0fe0d3ba2b";

function App() {
  
  const [searchInput,setSearchInput]=useState("");
  const [accessToken,setAccessToken]=useState("");
  const [albums,setAlbums]=useState([]);
  useEffect(()=>{
    // api access token
    var authParameters={
      method:'POST',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body:'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token',authParameters).then(result=>result.json())
    .then(data=>setAccessToken(data.access_token))
  },[]);


  async function search(){
    console.log("Searching for " + searchInput)
  
    
    // get request using search to get the Artist ID
  
    var searchParameters={
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    let singers=[];
    if(searchInput==="happy"){
      singers=["daler mehndi","honey singh","tony kakkar","vishal dadnali"];
    }
    else if(searchInput==="sad"){
      singers=["arijit singh","arman malik","zubin nautiyal"];
    }

    // let singers=["jassi gill","guru randhava","jubin nautiyaal","arijit singh","ar rehman","mohit chauhan","javed ali","monali thakur","shreya ghoshal","kumar sanu"];
    let encodedSearchInput = encodeURIComponent(singers);
    console.log(encodedSearchInput);
    // 'https:api.spotify.com/v1/search?q=${encodedSearchInput}&type=track%2Cartist&market=IN&limit=10&offset=5
    // let url='https://api.spotify.com/v1/search?q=genre%3D'+searchInput+'&'+encodedSearchInput+'&type=track%2Cartist&market=IN&limit=20&offset=5'
                // let url='https://api.spotify.com/v1/search?q='+encodedSearchInput+'&genre%3D'+searchInput+'&type=track%2Cartist&market=IN&limit=20&offset=5';
                let url='https://api.spotify.com/v1/search?q='+encodedSearchInput+'&type=track%2Cartist&market=IN&limit=20&offset=5';
                console.log(url);
                var genreId=[];
                genreId=await fetch(url,searchParameters).then(response=>response.json())
                .then(data =>{return data});
                console.log(genreId.tracks.items);
                var new_items=genreId.tracks.items
                setAlbums(new_items);
                
              var temp = [];
  
              await Promise.all(new_items.map(async (album, i) => {
                console.log(album);
                const result = await fetch('https://api.spotify.com/v1/tracks/' + album.id + '?include_groups=album&market=IN&limit=50', searchParameters)
                  .then(response => response.json())
                  .then(data => {
                    return {
                      url: data.artists[0].external_urls.spotify,
                      image: data.album.images[0].url
                    };
                  });
  
                temp[i] = result;
              }));
  
              console.log(temp);
              temp.forEach(x => {
                console.log(x.image);
                console.log(x.url)
              });
  
              setAlbums(temp);
  }

  
  return (
    <>
    <div className="container">
      <div className="input-group mb-3 my-3">
        <input type="text" className="form-control" placeholder="Enter your mood" onChange={event=>setSearchInput(event.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>
      </div>
      <button type="button" onClick={search} className="btn btn-primary">Search</button>
    </div>

  <div className="row">
    {albums.map((item,i)=>{
      var link;
      item.url?link=item.url:link="#";
    return  <div className="col-md-4" key={i}>
            { <Songs src={item.image} link={link} /> }
            </div>
    })}
  </div>

</>
  );
}

export default App;
