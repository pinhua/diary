import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDoc, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db, storage } from './base.js'
import "react-datepicker/dist/react-datepicker.css";
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
function randomStringGenerator() {
    return new Date().getTime().toString();

}
export default function Edit() {
    const [ date, setDate ] = useState(new Date());
    const { id } = useParams();
    const [ data, setData ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ imageUpload, setImageUpload ] = useState(null);
    const [ imageList, setImageList ] = useState([]);
    const [ image, setImage ] = useState([]);
    let navigate = useNavigate();
    const uploadImage = async () => {
        console.log("We are here");
        if (imageUpload == null) return;
        const imageRef = ref(storage, 'public/' + randomStringGenerator() + '.jpg');
        let snapshot = await uploadBytes(imageRef, imageUpload)
        let url = await getDownloadURL(snapshot.ref)
        
        console.log("here 2: " + url);
        setImageList((prev) =>[ ...prev, url ])
        console.log("before append");
        console.log(image);
        let newImageList = image.concat(url);
        setImage(newImageList);
        console.log("after append");
        console.log(image);
        updateFirebase(newImageList=newImageList);
        navigate('/');
    }
    const updateFirebase = async (newImageList=image) => {
        if (id) {
            await setDoc(doc(db, 'Diary', id), {
                Body: body,
                Title: title,
                Date: date,
                Image: newImageList
            });
        }
        else {
            //new entry
            await addDoc(collection(db, 'Diary'), {
                Body: body,
                Title: title,
                Date: date,
                Image: newImageList
            });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // call uploadImage if necessary
        if (imageUpload) {
            uploadImage();       
        }else {
            updateFirebase();
            navigate('/');
        }
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
                    setData(data);
                    setDate(date);
                    if (data.Image != undefined) {
                        setImage(data.Image);
                    }
                }
            };
            fetchData();
        } else {
            setData({ Title: "", Date: new Date(), Body: "", Image: [] })
        }
    }, []);
    const [ selectedFile, setSelectedFile ] = useState();
    const [ isFilePicked, setIsFilePicked ] = useState(false);
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

                        <input type='file' name='file' onChange={(event) => {
                            setImageUpload(event.target.files[ 0 ]);
                        }} />

                    </div>

                </div>
                <div className='form-group'>
                    <textarea rows='5' value={body} onChange={(body) => setBody(body.target.value)}></textarea>
                </div>
            </form>
        </div>
    )
}