import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from './base.js'
import React, { useState, useEffect } from 'react';
import { async } from '@firebase/util';
export default function Home() {
    
    const [ data, setData ] = useState([]);
    const handleClick = async event => {
        await deleteDoc(doc(db, "Diary", event.target.dataset.id))
        window.location.reload(false);
    }
    const deleteEntry = (id) => {
        //deleteDoc(doc(db, "Diary", id))
    }
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "Diary"));
            var entries = [];
            querySnapshot.forEach((doc) => {
                var data = doc.data();

                var date = new Date(data.Date.seconds * 1000).toLocaleDateString('en-GB')
                entries.push({ id: doc.id, title: data.Title, date: date, body: data.Body });
            });
            setData(entries);
        };
        fetchData();
    }, []);
    return (
        <div className="App container-fluid">

            <Link to={'/new/'}>New entry</Link>
            <div id="entries">

                {data.map(item => (
                    <div key={item.id} className='entry flex-column d-flex'>
                        <div className='entry-bar flex-row'>
                            <div className='title p-2'>
                                <Link to={'/view/'+item.id}><h1>{item.title}</h1></Link>
                            </div>
                            <div className='date p-2'>
                                <p>{item.date}</p>
                            </div>
                            <div className='delete p-2 ml-auto'>
                                <Button variant='danger' data-id={item.id} onClick={handleClick}>Delete</Button>
                            </div>

                        </div>

                        <div className='entry-body'>
                            <p>{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>




            
        </div>
    )
}