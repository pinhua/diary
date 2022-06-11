import { Link, useHistory, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from './base.js'
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
export default function View() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [url, setUrl] = useState([]);
    const [imageUpload, setImageUpload]=useState(null);
    const [imageList, setImageList]=useState([]);
    const imageListRef = ref(storage, 'public/')
    useEffect(() => {
        console.log(imageListRef);
        listAll(imageListRef).then((response) => {
            response.items.forEach((item => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            }));
        });
    }, []);
    const [ data, setData ] = useState([]);
    const handleClick = async event => {
        await deleteDoc(doc(db, "Diary", event.target.dataset.id))
        navigate('/');
    }
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "Diary", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                var data = docSnap.data()
                var date = new Date(data.Date.seconds * 1000).toLocaleDateString('en-GB');
                data.Date = date;    
                console.log("Hwere are the images to view");            
                console.log(data.Image);
                setData(data);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <div className="entry-bar">
                <div className='title'>
                    <h1>{data.Title}</h1>
                </div>
                <div className='date'>
                    <p>{data.Date}</p>
                </div>
                <div className='edit'>
                    <Button href={'/edit/' + id}>Edit</Button></div>
                <div className='delete'>
                    <Button variant='danger' data-id={id} onClick={handleClick}>Delete</Button></div>
                <div className='back'>

                    <Link to="/"><h1>Back</h1></Link>
                </div>

            </div>

            <div className='entry-body '>
                {data.Body}
               
            </div>
            
            {/*data.Image.map((url) => {
                return <img src={url} />
            }) */}
           {/* */}
           <h3>Images</h3>
           {(data.Image != undefined) ? data.Image.map(url => {
               return <img src={url} />
           }) : 'No Images'}

        </div>
    )
}