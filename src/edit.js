import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useState, useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore";
import { db } from './base.js'
import "react-datepicker/dist/react-datepicker.css";
export default function Edit() {
    const [ date, setDate ] = useState(new Date());
    const { id } = useParams();
    const [ data, setData ] = useState([]);
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    useEffect(() => {

        if (id) {
            const fetchData = async () => {
                const docRef = doc(db, "Diary", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    var data = docSnap.data()
                    var date = new Date(data.Date.seconds * 1000).toLocaleDateString('en-GB');
                    data.Date = date;
                    setTitle(data.Title);
                    setBody(data.Body);
                    setData(data)
                }
            };
            fetchData();
        } else {
            setData({ Title: "", Date: new Date(), Body: "" })
        }
    }, []);

    return (
        <div className='editor'>
            <form>
            <div className="entry-bar">
                <div className='title'>
                    <p>Title:</p>
                    <input type="text" id="title" name="title" placeholder='Enter entry name' value={title} onChange={(title) => setTitle(title)}></input>
                </div>
                <div className='date'>
                    <p>Date:</p>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />
                </div>
                <div className='save'>
                    <Button href='/edit'>Save</Button></div>

                <div className='image'>

                    <Button>Add image</Button>
                </div>

            </div>
            <div className='form-group'>
                <textarea rows='5' value={body} onChange={(body) => setBody(body)}></textarea>
            </div>
            </form>
        </div>
    )
}