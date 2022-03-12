import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import {useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
export default function Edit(){
    const [startDate, setStartDate] = useState(new Date());
    return(
        <div className='editor'>
        <div className="entry-bar">
            <div className='title'>
            <p>Title:</p>
            <input type="text" id="title" name="title" placeholder='Enter entry name'></input>
            </div>
            <div className='date'>
            <p>Date:</p>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className='save'>
                <Button href='/edit'>Save</Button></div>
           
            <div className='image'>

                <Button>Add image</Button>
            </div>
            
        </div>
        <div className='form-group'>
                <textarea rows='5'></textarea>
                </div>
        </div>
    )
}