import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useState, useEffect } from 'react';
import {getStorage, ref, uploadBytes} from 'firebase/storage'
import { getDoc, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from './base.js'
import "react-datepicker/dist/react-datepicker.css";
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';

function randomStringGenerator() {
    return new Date().getTime().toString();

}

export default function Edit() {
    const [ date, setDate ] = useState(new Date());
    const { id } = useParams();
    const [ data, setData ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const storage = getStorage();
    const storageRef = ref(storage, 'public/'+randomStringGenerator()+'.jpg');
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id);
        if (id) {
            await setDoc(doc(db, 'Diary', id), {
                Body: body,
                Title: title,
                Date: date
            });
        }
        else {
            //new entry
            await addDoc(collection(db, 'Diary'), {
                Body: body,
                Title: title,
                Date: date
            });
        }
        navigate('/');

    }
    useEffect(() => {

        if (id) {

            const fetchData = async () => {
                const docRef = doc(db, 'Diary', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    var data = docSnap.data()
                    var date = new Date(data.Date.seconds * 1000);
                    data.Date = date;
                    setTitle(data.Title);
                    setBody(data.Body);
                    setData(data)
                    setDate(date);
                }
            };
            fetchData();
        } else {
            setData({ Title: "", Date: new Date(), Body: "" })
        }
    }, []);
    const [ selectedFile, setSelectedFile ] = useState();
    const [ isFilePicked, setIsFilePicked ] = useState(false);
    const changeHandler = async (evt) => {
        
        
       
        setSelectedFile(evt.target.files[ 0 ]);
        console.log(evt.target.files[0]);
        console.log("file selected")
        const metadata = {
            contentType: 'image/jpeg'
        };
        await uploadBytes(storageRef, selectedFile, metadata);
        console.log("file uploaded")
    };

    return (
        <div className='editor'>
            <form onSubmit={e => { handleSubmit(e) }}>
                <div className="entry-bar">
                    <div className='title'>
                        <p>Title:</p>
                        <input type="text" id="title" name="title" placeholder='Enter entry name' value={title} onChange={(title) => setTitle(title.target.value)}></input>
                    </div>
                    <div className='date'>
                        <p>Date:</p>
                        <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} />
                    </div>
                    <div className='save'>
                        <input className="btn btn-primary" type="submit" value="Save" />
                    </div>

                    <div className='image'>

                        <input type='file' name='file' onChange={changeHandler} />
                        
                    </div>

                </div>
                <div className='form-group'>
                    <textarea rows='5' value={body} onChange={(body) => setBody(body.target.value)}></textarea>
                </div>
            </form>
        </div>
    )
}