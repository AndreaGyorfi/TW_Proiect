import React from "react";
import scanare_pdf from '../assets/Scanare-3D.pdf';

const Scanare = () => {

    return(
        <React.Fragment>
             <iframe src={scanare_pdf}  width={'100%'} height={900} />
        </React.Fragment>
    );
}

export default Scanare;