import { useState } from "react"

export default function Player({name, symbol}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function handleEditing(){
        setIsEditing(editing => !editing);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let nameView = isEditing ? 
            <input type="text" required value={playerName} onChange={handleChange} /> : 
            <span className='player-name'>{playerName}</span>;

    return <li>
        <span className="player">
          {nameView}
          <span className='player-symbol'>{symbol}</span>
        </span>
        <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
      </li>
}