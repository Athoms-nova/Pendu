/*======================================================================================
===================                Projet Pendu                =========================
===================                 Athoms Nova                 =========================
=======================================================================================*/

import React from 'react';
import Menu from './menu';
import Jeu from './jeu';

import {CheckSaisie, NewTextCacher, textRandom} from './fonction';
import {liste, caraAutorise} from './variable';

class Pendu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fenetre : "Menu"
        };
        this.textSaisie = "";
        this.textATrouver = "";
        this.textCacher = [];
        this.normalMode = false;
    }

    render(){
        return(
            <div className="Pendu">
                { this.state.fenetre === "Menu" &&
                    <div className="MenuFond">
                        <Menu 
                            onchangeSaisie={this.onchangeSaisie} onSubmitSaisie={this.onSubmitSaisie} 
                            onClickJouer={this.onClickJouer}
                        /> 
                    </div>
                }
                { this.state.fenetre === "Jeu" &&
                    <Jeu
                        textCacher={this.textCacher}
                        textATrouver={this.textATrouver}
                        onClickMenu={this.onClickMenu}
                        normalMode={this.normalMode}
                    />
                    
                }
            </div>
        )
    }

    onSubmitSaisie = (event) => {
        event.preventDefault();
        if( CheckSaisie(this.textSaisie, caraAutorise) ){
            this.normalMode = false;
            this.textATrouver = this.textSaisie;
            this.textCacher = NewTextCacher(this.textATrouver);
            this.commencer();
        }
    }

    onchangeSaisie = (event) => {
        this.textSaisie = event.target.value.toLowerCase();
        console.log(this.textSaisie);
    }

    onClickJouer = () => {
        this.normalMode = true;
        this.textATrouver = textRandom(liste);
        this.textCacher = NewTextCacher(this.textATrouver);
        this.commencer();
    }

    onClickMenu = () => { this.setState({ fenetre : "Menu" }) }

    commencer = () => { this.setState({ fenetre : "Jeu" }); }

}


export default Pendu;