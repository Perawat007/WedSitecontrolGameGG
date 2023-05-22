import React, { useState, useEffect } from 'react';
import { Card, Button } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'
import "./Modal.css";
const DemoGame = () => {
    const [items, setItems] = useState([]);


    useEffect(() => {
        DataGet();
    }, [])

    const DataGet = () => {
        const token = localStorage.getItem("token");
        fetch('http://localhost:5000/post/game', {
            method: 'GET', // replace with the desired HTTP method
            headers: {
                'Authorization': `Bearer ${token}`, // include the token in the 'Authorization' header
                'Content-Type': 'application/json' // set the desired content type
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'gameAll') {
                    setItems(data.data);
                }
            })
            .catch(error => console.error(error))
    };

    const PlayGame = (linkGame) => {
        if (linkGame !== null) {
            window.open(linkGame);
        }
    }

    return (
        <div>
            <h3>ทดลองเล่นเกมส์</h3>
            <br />
            <Card
                header="Games Slot"
            >
                <div className='game-container'>
                    {items.map((row) => (
                        <div key={row.id} className='card'>
                            <div className='card-image'>
                                <img src={row.img} alt='' />
                            </div>
                            <div className='card-content'>
                                <span className='card-title'></span>
                                <p className='card-font'>{row.namegame}</p>
                            </div>
                            <div className='card-action'>
                                <Button className='submit-button' onClick={() => PlayGame(row.linkgame)}>เล่นเกม</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default DemoGame