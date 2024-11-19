import { useLocation } from "react-router-dom";

function DetailPage() {
    const location = useLocation();
    const types = location.state.detail.type;
    const name = location.state.detail.title;
    const image = location.state.detail.sprite;
    const stats = location.state.detail.stats;


    return(
        <div>
            <p>{name}</p>
            <img src = {image}/>
            <p>타입</p>
            <p>{types.map(type => (<span>{type} </span>))}</p>
            <p>스탯</p>
            <div>{stats.map(statData =>(<p>{statData.stat}: {statData.statFigure}</p>))} </div>
        </div>
    );
}

export default DetailPage;

