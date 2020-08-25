/*======================================================================================
===================                Projet Pendu                =========================
===================                 Athoms Nova                 =========================
=======================================================================================*/


const CheckSaisie = (text, tab) => {
    let valide = true;
    let indice = 0;
    if(text === ""){ valide = false; }
    else{
        while( (indice < text.length) && valide ){
            if( tab.indexOf(text[indice]) === -1 ){ valide = false }
            indice++;
        }
    }
    return valide;
}


const ActualisationTextCacher = (lettre, textCacher, textATrouver) => {
    let resultat = [...textCacher];
    let text = textATrouver;
    while( text.indexOf(lettre) !== -1 ){
        resultat[ text.indexOf(lettre) ] = text[ text.indexOf(lettre) ];
        text = text.replace(lettre,"0");
    }
    return resultat;
}

const NewTextCacher = (textATrouver) => {
    let textCacher = [];
    for(let i=0; i<textATrouver.length; i++){ textCacher.push("?"); }
    return textCacher;
}

// Fonction qui genere un chiffre aleatoire entier 
const chiffreAleatoire = (valMin, valMax) => {
    return Math.floor(Math.random() * (valMax + 1 - valMin) + valMin);
}


const textRandom = (liste) => { return liste[ chiffreAleatoire(0, liste.length - 1) ].toLowerCase() ; }

const Gagner = (liste) => {
    let win = true;
    let indice = 0;
    while( (indice < liste.length) && win ){
        if( liste[indice] === "?" ){ win = false; }
        indice++;
    }
    return win;
}

export {CheckSaisie, ActualisationTextCacher, NewTextCacher, textRandom, Gagner};