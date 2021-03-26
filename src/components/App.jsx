import React, { useEffect, useState } from 'react';
import styles from '../style/main.module.less'
import  { ReactComponent as Logo } from '../assets/logo.svg'
import Map from './Map.jsx'
import { useMapData } from '../hooks/useMapData.js'

const App = () => {
    const [filter, setFilter] = useState('0-250')
    const { selectedStates } = useMapData(filter)

    return (
        <div>
            <div className={ styles.header }>
                <Logo/>
            </div>
            <div className={ styles.main }>
                <div>
                    <div className={ styles.selection } >
                        <div>User visits</div>
                        <select onChange={ (evt) => setFilter(evt.target.value) }>
                            <option value="0-250">0-250</option>
                            <option value="250-500">250-500</option>
                            <option value="500-1000">500-1000</option>
                            <option value="1000+">1000+</option>
                        </select>
                    </div>
                    <Map selections={ selectedStates }></Map>
                </div>
            </div>
        </div>
    );
};

export default App;
