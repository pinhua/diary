import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
export default function view() {
    return (
    <body>    
        <div className="entry-bar">
            <div className='title'>
                <h1>Entry 1</h1>
            </div>
            <div className='date'>
                <p>23/01/22</p>
            </div>
            <div className='edit'>
                <Button href='/edit'>Edit</Button></div>
            <div className='delete'>
                <Button variant='danger'>Delete</Button></div>
            <div className='back'>

                <Link to="/"><h1>Back</h1></Link>
            </div>

        </div>

<div className='entry-body '>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Nullam ut ante nisi. Integer sodales nulla et ligula cursus elementum a nec tortor. I
nteger tristique, felis vitae tincidunt iaculis, dolor ante suscipit nulla, vel
lacinia massa sapien eu lectus. Praesent in eleifend mauris, convallis
condimentum lacus
</div>
</body>
    )
}