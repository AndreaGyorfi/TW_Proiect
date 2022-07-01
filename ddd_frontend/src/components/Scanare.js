import React, { useEffect } from "react";
import scanare_pdf from '../assets/Scanare-3D.pdf';
import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Scanare = () => {

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
        {/*
        <React.Fragment>
             <iframe src={scanare_pdf}  width={'100%'} height={900} />
        </React.Fragment>
         */}
    
      <Document file={scanare_pdf}  onLoadSuccess={onDocumentLoadSuccess}>
        { allPages.length !== 0 && allPages.map((item) => (
        <Page key={item} pageNumber={item+1} width={window.innerWidth} />
        ))
        }
      </Document>
      </>
    
    
    );
}

export default Scanare;