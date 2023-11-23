import MobNavbar from '../../components/Navbars/MobNavbar';
import MusicBar from '../../components/Navbars/MusicBar';
import Sidebar from '../../components/Navbars/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import PLSongCard from '../../components/SongCards/PLSongCard';
import Titles from '../../components/Titles/Titles';

import {getPlaylistbyID} from "../../services/songService";
import {useEffect, useState} from "react";

export default function PlaylistDetails({ songNumber = 0, plTime = "00:00"}) {

    
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState();
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  
  const [filterValue, setFilterValue] = useState("");

  const getData = async () => {
        
    try {
      
      setLoading(true);
    let response = await getPlaylistbyID("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb3JhbGVzbWoiLCJpYXQiOjE3MDA2MzY3NDUsImV4cCI6MTcwMTkzMjc0NX0.pVCc7qqWreFX_o0q5cVOUHhHG60gYxRTL4YThe7SmNk", "a892c8a6-db8f-4888-a2dd-6e7b34fa75ca");
    if (response) {
        setPlaylist(response);
      console.log(response);
      console.log(response.page.content);
      setSongs(response.page.content);
    } 
    } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    }
};


  useEffect(() => {
    getData();
  }, []);

  const handleSearchButtonClick = (inputValue) => {
    setFilterValue(inputValue);
  };

  const handleSelectedSong = (song) => {
    console.log(song);
    setSelectedSong(song);  
  };

  const filteredSongs = songs.filter((song) =>
  song.title.toLowerCase().includes(filterValue.toLowerCase())
);

  const handleTest = () => {
    console.log(songs);
  };
    return (
        <div className="drawer lg:drawer-open bg-greenish-black">
            <input type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col max-h-screen">
                {/* Mobile navbar and music player bar */}
                <MobNavbar />
                <MusicBar song={selectedSong}/>

                {/* Contenido*/}
                <main className="lg:flex-1 h-screen lg:h-full flex flex-col items-center imprima-400 text-white px-10 pt-10 pb-28 lg:p-10 gap-5 overflow-y-auto scrollbar">
                    <div className='grid md:grid-flow-col lg:justify-between items-start w-full pb-5 gap-10'>
                        <div className='flex flex-col order-last md:order-none items-center gap-2'>
                            <Titles title={playlist ? playlist.title : ""} />
                            <div className='flex justify-start w-full lg:px-10 px-15 pb-5 imprima-400'>
                                <a className='text-base'>{playlist ? playlist.page.content.length : ""} canciones, {playlist ? playlist.totalDuration : ""}</a>
                            </div>
                        </div>
                        <div className='lg:px-10 px-15 pt-2'>
                            <SearchBar onSearch={handleSearchButtonClick}  placeholder='Busca una canción...' />
                        </div>
                    </div>
                    {/* Display of songs in the playlist */}
                    {filteredSongs.map((song) => (
                 <PLSongCard key={song.code} onClick={() => handleSelectedSong(song)}  cover={song.album_cover} artist={song.artist} song={song.title} duration={song.duration} />
              ))}

                </main>
            </div>

            {/* Sidebar on web */}
            <Sidebar />
        </div>
    )
}
