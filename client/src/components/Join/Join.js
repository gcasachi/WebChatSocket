import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css';

const Join = () => {
    const [nome, setNome] = useState('');
    const [sala, setSala] = useState('');

    return(
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className="heading">Entrar</h1>
                    <div><input placeholder="Nome" className="joinInput" type="text" onChange={(event) => setNome(event.target.value)} /></div>
                    <div><input placeholder="Sala" className="joinInput mt-20" type="text" onChange={(event) => setSala(event.target.value)} /></div>
                    <Link onClick={event => (!nome || !sala) ? event.preventDefault() : null} to={`/chat?nome=${nome}&sala=${sala}`}>
                        <button className='button mt-20' type="submit">Entrar</button>
                    </Link>
            </div>

        </div>
    )
}

export default Join;