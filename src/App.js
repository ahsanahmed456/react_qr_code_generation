import React, {useState, useRef} from "react";
// import './App. css';
import { 
  Container,
   Card, 
   CardContent, 
   Typography, 
   Grid, 
   TextField,
   Button,
   CardMedia, 
} from "@mui/material";

import QrCode from "qrcode";
import QrReader from 'react-qr-reader';

function App() {

  const qrRef = useRef(null);

  const [Text, setText] = useState('')
  const [imageURL, setimageURL] = useState('')
  const [ScanResultFile, setScanResultFile] = useState('')
  const [ScanResultWebCam, setScanResultWebCam] = useState('')


  const GenerateQRCode = async() => {
    try {
      const response = await QrCode.toDataURL(Text)
      setimageURL(response)
    } catch (error) {
      console.log(error)
    }
   };
    // 2nd grid
   const handleErrorFile = (error) => {
     console.log(error)
   };

   const handleScanFile = (result) => {
     if(result) {
       setScanResultFile(result);
     }
   };

   const onScanFile = () => {
     qrRef.current.openImageDialog();
   };
  //  3rd grid
  const handleErrorWebCam = (error) => {
    console.log(error)
  };

  const handleScanWebCam = (result) => {
    if(result){
    setScanResultWebCam(result)
    }
  };

  return (
      <Container style={{marginTop:"45px"}}>
         <Card>
            <Typography style={{padding:"20px", textAlign:"center", background:"#3f51b5", color:"#fff", fontSize:"20px"}}>
              Generate Download & Scan QR Code With React js
              </Typography>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    label="Enter Text Name"
                    variant="standard"
                    onChange={(e)=> setText(e.target.value)}
                     />
                  <Button 
                    onClick={()=> GenerateQRCode()}
                    color="primary"
                    variant="contained"
                     >
                       Generate
                   </Button>
                   {imageURL ? (<a href={imageURL} download> 
                   <CardMedia
                     style={{marginTop:"30px", width:"150px"}}
                     component="img"
                     image={imageURL}
                     alt="image" />
                    </a> ) : null}
                  </Grid> 
                  {/* 2nd grid */}
                <Grid item xs={12} md={6} lg={4}>
                  <Button
                   variant="contained"
                   color="error"
                   onClick={onScanFile}
                   >
                     Scan QR code
                   </Button>
                  <QrReader
                   ref={qrRef}
                   delay={300}
                   style={{width:"100%", marginTop:"15px"}}
                   onError={handleErrorFile}
                   onScan={handleScanFile}
                   legacyMode
                   />
                   <Typography variant="body1">Scanned Code: {ScanResultFile}</Typography>
                </Grid>
                {/* 3rd grid */}
                <Grid item xs={12} md={6} lg={4}>
                  <Typography variant="subtitle1">QR Code Scan by WebCam</Typography>
                <QrReader
                   delay={300}
                   style={{width:"100%", marginTop:"21px"}}
                   onError={handleErrorWebCam}
                   onScan={handleScanWebCam}
                   />
                   <Typography variant="body1">Scanned by WebCam Code: {ScanResultWebCam}</Typography>
                  </Grid>                  

              </Grid>
            </CardContent>
         </Card>
      </Container>
  );
}

export default App;
