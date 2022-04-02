import { Link, useHistory, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from './base.js'
import React, { useState, useEffect } from 'react';
export default function View() {
    let navigate = useNavigate();
    const { id } = useParams();
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
                setData(data)
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
        </div>
    )
}