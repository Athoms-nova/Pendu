/*======================================================================================
===================                Projet Pendu                =========================
===================                 Athoms Nova                 =========================
=======================================================================================*/

import React from "react";
import fondGagner from '../image/jeuGagner.png';
import fondPerdu from '../image/jeuPerdu.png';
import fondVert from '../image/jeuVert.png';
import fondOrange from '../image/jeuOrange.png';
import fondRouge from '../image/jeuRouge.png';


const Scroll = ({ pointDeVie, gagner }) => {
    let imageCentre = fondVert;
    let animationCentre = "CentreBatterie5";
    let animationCacher = "CacherBatterie5";

    if(gagner){
        animationCentre = "CentreGagner";
        animationCacher = "CacherGagner";
        imageCentre = fondGagner;
    }
    else if(gagner === false){
        animationCentre = "CentrePerdu";
        animationCacher = "CacherPerdu";
        imageCentre = fondPerdu;
    }
    else{   
        switch(pointDeVie){
            case 1 : imageCentre = fondRouge;
                    animationCacher = "CacherBatterie"+pointDeVie;
                    animationCentre = "CentreBatterie"+pointDeVie;
                    break;
            case 2 : imageCentre = fondOrange;
                    animationCacher = "CacherBatterie"+pointDeVie;
                    animationCentre = "CentreBatterie"+pointDeVie;
                    break;
            case 3 : imageCentre = fondOrange; 
                    animationCacher = "CacherBatterie"+pointDeVie;
                    animationCentre = "CentreBatterie"+pointDeVie;
                    break;
            case 4 : animationCacher = "CacherBatterie"+pointDeVie;
                    animationCentre = "CentreBatterie"+pointDeVie;
                    break;
        }
    }
    return(
        <div className="Scroll">
            <img src={imageCentre} alt="animation" className={animationCentre} />
            <img src={imageCentre} alt="animation" className={animationCacher}  />
        </div>
    );
}


export default Scroll;