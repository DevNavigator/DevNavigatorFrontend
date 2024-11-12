

import {ICourse} from "@/interfaces/Icourse"
import React from "react"

interface VerContenidoButtonProps {
course: ICourse

}

export const VerContenidoButton: React.FC<VerContenidoButtonProps>=({

course,

})=>{

    return(

        <div>
        <button onClick={()=>{}}>Ver curso</button>

        </div>
    )
}