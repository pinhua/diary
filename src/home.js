import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
export default function home() {
    return (
        <div className="App container-fluid">

            <button>New Entry</button>

            <div className='entry flex-column d-flex'>
                <div className='entry-bar flex-row'>
                    <div className='title p-2'>
                        <Link to="/view"><h1>Entry 1</h1></Link>
                    </div>
                    <div className='date p-2'>
                        <p>23/01/22</p>
                    </div>
                    <div className='delete p-2 ml-auto'>
                        <Button variant='danger'>Delete</Button>
                    </div>
                </div>
                <div className='entry-body '>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam ut ante nisi. Integer sodales nulla et ligula cursus elementum a nec tortor. I
                    nteger tristique, felis vitae tincidunt iaculis, dolor ante suscipit nulla, vel
                    lacinia massa sapien eu lectus. Praesent in eleifend mauris, convallis
                    condimentum lacus
                </div>
            </div>
        </div>
    )
}