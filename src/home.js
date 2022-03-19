import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { collection, getDocs } from "firebase/firestore";
import { db } from './base.js'
import React, { useState, useEffect } from 'react';
export default function Home() {
    const [ data, setData ] = useState([]);
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
                                <Button variant='danger'>Delete</Button>
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