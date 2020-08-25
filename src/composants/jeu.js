/*======================================================================================
===================                Projet Pendu                =========================
===================                 Athoms Nova                 =========================
=======================================================================================*/

import React from 'react';
import {ActualisationTextCacher, NewTextCacher, textRandom, CheckSaisie, Gagner} from './fonction';
import {liste, tabClavier, caraAutorise, pdv} from './variable';
import Scroll from './scroll';

import niveau0 from '../image/batterie0.png';
import niveau1 from '../image/batterie1.png';
import niveau2 from '../image/batterie2.png';
import niveau3 from '../image/batterie3.png';
import niveau4 from '../image/batterie4.png';
import niveau5 from '../image/batterie5.png';

const ClavierVirtuel = ({onClickToucheVirtuel, lettreSaisie}) => {
    return(
        <div className="Clavier">
            { tabClavier.map( item => (
                <button 
                    key={item} 
                    className={ lettreSaisie.indexOf(item) === -1 ? "Disponible" : "DejaUtiliser" }
                    onClick={onClickToucheVirtuel} 
                    name={item}
                > 
                    {item} 
                </button>
            )) }
        </div>
    );
}

const BarreDeVie = ({batterie}) => {
    return(
        <div className="BarreDeVie">
            <img src={batterie} alt="Niveau batterie" />
        </div>
    );
}

const BarreTextCacher = ({text, victoire}) => {
    let indice = 0;
    return(
        <div className="TextCacher">
            <ul>
                { text.map( item => (
                    <li key={indice++}> {item} </li>
                )) }
            </ul>
            { victoire === true && <h1 className="Victoire"> Victoire </h1> }
            { victoire === false && <h1 className="Perdu"> Perdu </h1> }
        </div>
    );
}


const BarreBoutton = ({onClickNouvellePartie, onClickMenu, normalMode}) => {
    return(
        <div className="BarreBoutton">
            { normalMode === true &&  <button onClick={onClickNouvellePartie} > Nouvelle Partie </button>}
            <button onClick={onClickMenu} > Menu </button>
        </div>
    )
}

const Resultat = () => {
    return(
        <div className="Resultat">
        
        </div>
    );
}


class Jeu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            textCacher : this.props.textCacher,
            batterie : niveau5,
            victoire : undefined,
        }
        this.pdv = pdv;
        this.textATrouver = this.props.textATrouver;
        this.lettreSaisie = "";
    }

    render(){
        return(
            <div className="Jeu">
                <Scroll pointDeVie={this.pdv} gagner={this.state.victoire} />
                <div className="JeuBordure">
                    <h1> Le Pendu </h1>
                    <BarreDeVie batterie={this.state.batterie} />
                    <BarreTextCacher text={this.state.textCacher} victoire={this.state.victoire} />
                    <ClavierVirtuel onClickToucheVirtuel={this.onClickToucheVirtuel} lettreSaisie={this.lettreSaisie} />
                    <BarreBoutton 
                        onClickMenu={this.props.onClickMenu} onClickNouvellePartie={this.onClickNouvellePartie} 
                        normalMode={this.props.normalMode}
                    />
                </div>
            </div>
        )
    }

    onClickNouvellePartie = () => {
        this.pdv = pdv;
        this.textATrouver = textRandom(liste);
        this.lettreSaisie = "";
        this.setState({ 
            textCacher : NewTextCacher(this.textATrouver),
            batterie : niveau5,
            victoire : undefined,
        })
    }

    onClickToucheVirtuel = (event) => {
        if(this.state.victoire === undefined){ this.jeu(event.target.name); }
    }

    niveauBatterie = (niveau) => {
        switch(niveau){
            case 0 : this.setState({ batterie : niveau0 }); break;
            case 1 : this.setState({ batterie : niveau1 }); break;
            case 2 : this.setState({ batterie : niveau2 }); break;
            case 3 : this.setState({ batterie : niveau3 }); break;
            case 4 : this.setState({ batterie : niveau4 }); break;
        }
    }


    jeu = (lettre) => {
        // Vérifier si la lettre à deja était saisie
        if( (this.lettreSaisie.indexOf(lettre) === -1) && (this.pdv > 0) ){
            // On ajoute la lettre dans les lettres deja saisies
            this.lettreSaisie = this.lettreSaisie + lettre;
            // Vérifier si la lettre est present dans le text a trouver
            if( this.textATrouver.indexOf(lettre) !== -1 ){
                // on actualise le text cacher
                let textCacher = ActualisationTextCacher(lettre, this.state.textCacher, this.textATrouver);
                if( Gagner(textCacher) ){ 
                    this.setState({ 
                        victoire : true
                    }) 
                }
                this.setState({ textCacher : textCacher });
            }
            else{ // Sinon on enlève 1 pdv
                this.pdv--;
                this.niveauBatterie(this.pdv);
                if( this.pdv === 0 ){ 
                    this.setState({ 
                        textCacher : this.textATrouver.split(""),
                        victoire : false
                    }); 
                }
            }
        }
    }

    clavierTouch = (event) => {
        if(this.state.victoire === undefined){
            let lettre = event.key.toLowerCase();
            if(lettre.length === 1){
                if( CheckSaisie(lettre, caraAutorise) ){
                    this.jeu(lettre);
                }
            }
        }
    }

    componentDidMount(){
        document.addEventListener("keyup", this.clavierTouch, false);
    }
}


export default Jeu;