/*======================================================================================
===================                Projet Pendu                =========================
===================                 Athoms Nova                 =========================
=======================================================================================*/

import React from 'react';


const ItemMenuSaisie = ({onchangeSaisie, onSubmitSaisie}) => {
    return(
        <div className="Saisie">
            <h2> Saisir le texte à trouver </h2>
            <form onSubmit={onSubmitSaisie}>
                <input onChange={onchangeSaisie} maxLength="19" placeholder="Que des lettres! Merci!" />
                <input type="submit" value="Validé" className="Valide" />
            </form>
        </div>
    );
}

const ItemNormal = ({onClickJouer}) => {
    return(
        <div className="Normal">
            <h2> Deviner un mot Aléatoire </h2>
            <button onClick={onClickJouer}> Jouer </button>
        </div>
    );
}

const Menu = ({onchangeSaisie, onSubmitSaisie, onClickJouer}) => {
    return(
        <div className="Menu">
            <h1> Le Pendu </h1>
            <div className="itemMenu">
                <ItemMenuSaisie onchangeSaisie={onchangeSaisie} onSubmitSaisie={onSubmitSaisie} />
                <ItemNormal onClickJouer={onClickJouer} />
            </div>
        </div>
    )
}

export default Menu;