import {useEffect, useState} from "react";
import {FaSearch} from 'react-icons/fa';
import Photos from "./components/Photos";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl ='https://api.unsplash.com/photos/';
const searchUrl ='https://api.unsplash.com/search/photos/';

function App() {
    const [loading, setLoading]=useState(false)
    const [photos, setPhotos]=useState([]);
    const [page, setPage]=useState(1);
    const [query, setQuery]=useState('');

    const fetchImages =async ()=>{
        let url;
        const urlPage =`&page=${page}`
        const urlQuery =`&query=${query}`
        // !RESTART SERVER altfel nu merge env
        // let url=`${mainUrl}${clientID}`;

        if (query){ //dc am query asta e link ul dc nu..ala de mai jos
            url=`${searchUrl}${clientID}${urlQuery}`;
        } else {
            url=`${mainUrl}${clientID}${urlPage}`;
        }

        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            // setPhotos(data); pt ca adaug trebuie sa folosesc ...
            setPhotos((oldPhotos)=>{
                // ca sa sterg vechile poze si sa adaug poze query
                if(query && page ===1){
                    return data.results
                }
               else if (query){
                    return [...oldPhotos, ...data.results]
                } else
                    return [...oldPhotos, ...data]
            });
            setLoading(false)
        }
        catch (error){
            setLoading(false)
            console.log(error);
        }
    }
    useEffect(()=>{
        setLoading(true)
        fetchImages()
    },[page])

    useEffect(()=>{
        // console.log(`innerHeight ${window.innerHeight}`);
        // console.log(`scrollY ${window.scrollY}`);
        // console.log(`odyHeight ${document.body.scrollHeight}`);

        const event = window.addEventListener('scroll',()=>{
            // sa nu suprapun loading cu fetch "!loading"
            if ((loading &&
                window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2){
                // console.log('it worked');
                // ? DC inaltimea este mai mare decat atunci fetch
                setPage((oldPage)=>{
                    return oldPage + 1;
                })
            }
        });
        // e bine sa scoti ev linst
        return ()=>window.removeEventListener('scroll', event)
    },[])

    const handleSubmit =(e)=>{
        e.preventDefault();
        if (page === 1) {
            fetchImages();
        }
        setPage(1);
    }

    if (loading){
        return <div>Loading ..</div>
    }

  return (
    <main className=" min-h-screen">
        <h1 className="text-3xl font-bold underline text-center">Search for photos</h1>
        <section className='my-12 flex items-center justify-center'>
            <form className='border-b-2 border-gray-400'>
                <input type="text" placeholder='search' className='focus:outline-none' value={query} onChange={(e)=>
                setQuery(e.target.value)}/>
                <button className='text-gray-400 pr-2' onClick={handleSubmit}>
                    <FaSearch />
                </button>
            </form>
        </section>
        <section>
            <ul className='flex flex-col md:flex-row flex-wrap justify-center items-center gap-2'>
                {photos.map((image, id)=>{
                    // console.log(image);
                    return <Photos key={image.id} {...image} />
                })}
            </ul>
            {loading && <h2>Loading .......</h2>}
        </section>

    </main>
  );
}

export default App;
