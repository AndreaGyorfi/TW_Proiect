import React, { useEffect } from "react";
import imprimante_pdf from '../assets/Imprimante-3D.pdf';
import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Imprimante3D = () => {

    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [allPages, setAllPages] = React.useState([]);

    useEffect(()=>{
        if(numPages !== null){
            console.log(numPages);
            setAllPages(Array.from(Array(numPages).keys()));
        }
    },[numPages])

    useEffect(()=>{
        console.log(allPages);
    },[allPages])

    function onDocumentLoadSuccess({ numPages }) {
        console.log(numPages);
        setNumPages(numPages);
    }

    return(
        <>
    
      <Document file={imprimante_pdf}  onLoadSuccess={onDocumentLoadSuccess}>
        { allPages.length !== 0 && allPages.map((item) => (
        <Page key={item} pageNumber={item+1} width={window.innerWidth} />
        ))
        }
      </Document>
      </>
    
    
    );
}

export default Imprimante3D;