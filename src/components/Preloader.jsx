import React from "react";
import preloader from "../assets/images/preloader.png"
import logo from "../assets/images/logo_new.png"


const Preloader = () =>{
    return(
        <section className="preloader">
            <div className="flex items-center justify-center w-full h-full gap-4">
                <div className="preloader_img w-[100px] h-[100px]">
                    <img src={preloader} className="img_preloader w-full"></img>
                </div>
                <div className="w-[170px]">
                    <img src={logo} className="img_preloader w-full"></img>
                </div>
            </div>
        </section>
    )
}

export default Preloader;