// ===== LIBRARIES ===== //
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Camera, X, ArrowLeft, CheckCircle } from "lucide-react";

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ===== QR SCANNER LOGIC ===== //
import { QRScanner } from "@/lib/QR.js";

// ===== STYLES ===== //
import "@/index.css";

const QR = () => {
  const navigate = useNavigate();
  const [qrResult, setQrResult] = useState("");
  const [detectedUrl, setDetectedUrl] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [scannerState, setScannerState] = useState({
    isCameraActive: false,
    isProcessing: false,
    isRequestingPermission: false,
    scanningActive: false,
    needsUserInteraction: false,
    currentMessage: "Point camera at a QR Code"
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const qrScannerRef = useRef(null);

  // Initialize QR Scanner
  useEffect(() => {
    qrScannerRef.current = new QRScanner();
    
    // Set callbacks
    qrScannerRef.current.setCallbacks(
      // onStateChange
      (newState) => setScannerState(newState),
      // onResult
      (result) => {
        setQrResult(result);
        if (result.startsWith('http://') || result.startsWith('https://')) {
          setDetectedUrl(result);
        } else {
          setDetectedUrl("");
          setCameraError('QR code does not contain a valid link.');
        }
      },
      // onError
      (error) => setCameraError(error)
    );

    return () => {
      qrScannerRef.current?.cleanup();
    };
  }, []);

  // Set refs when they're available
  useEffect(() => {
    if (qrScannerRef.current) {
      qrScannerRef.current.setRefs(videoRef, canvasRef, displayCanvasRef);
    }
  }, []);

  // ===== HANDLERS ===== //
  const goBack = () => {
    qrScannerRef.current?.stopCamera();
    navigate(-1);
  };

  const handleStartCamera = () => {
    qrScannerRef.current?.startCamera();
  };

  const handleStopCamera = () => {
    qrScannerRef.current?.stopCamera();
  };

  const handleToggleCamera = () => {
    qrScannerRef.current?.toggleCamera();
  };

  const handleCaptureImage = () => {
    qrScannerRef.current?.captureImage();
  };

  const handlePlayVideoManually = () => {
    qrScannerRef.current?.playVideoManually();
  };

  const handleScanAgain = () => {
    setQrResult("");
    setDetectedUrl("");
    setCameraError("");
    setScannerState(prev => ({ ...prev, isProcessing: false }));
    qrScannerRef.current?.startCamera();
  };

  const handleDismissError = () => {
    setCameraError("");
  };

  // ===== RENDER ===== //
  return (
    <>
      {/* Main container for the entire page */}
      <main className="flex-grow min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button onClick={goBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">QR Scanner</h1>
            <div className="w-16"></div>
          </div>

          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-full max-w-xs aspect-square bg-black rounded-xl overflow-hidden border-2 border-border shadow-lg">
                    {/* Video and Overlay Container */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover transition-opacity duration-300 ${scannerState.isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                      onClick={handlePlayVideoManually}
                    />
                    
                    <canvas
                      ref={displayCanvasRef}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {!scannerState.isCameraActive && !scannerState.isRequestingPermission && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
                        <QrCode className="w-16 h-16 text-white/60 mb-4" />
                        <p className="text-white/80 font-medium">Camera is off</p>
                      </div>
                    )}

                    {scannerState.isRequestingPermission && (
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/80 mb-4"></div>
                        <p className="text-white/80 font-medium">Starting Camera...</p>
                      </div>
                    )}
                    
                    {scannerState.isCameraActive && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Camera is active"></div>
                    )}
                    
                    {scannerState.isCameraActive && scannerState.needsUserInteraction && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center p-4 cursor-pointer" onClick={handlePlayVideoManually}>
                        <div>
                          <div className="text-4xl mb-2">▶️</div>
                          <p className="text-lg font-medium">Click to Start Video</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-foreground text-xl">Scan QR Code to Join Boss Battle</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {qrResult ? "QR Found!" : 
                   scannerState.isCameraActive ? 
                     (scannerState.isProcessing ? "Scanning..." : scannerState.currentMessage) : 
                     "Use your camera to scan"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {cameraError && (
                  <div className="text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="text-destructive font-medium text-sm">{cameraError}</p>
                    <Button onClick={handleDismissError} variant="ghost" size="sm" className="mt-2">Dismiss</Button>
                  </div>
                )}
                
                {qrResult ? (
                  <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/20 space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <p className="text-green-800 dark:text-green-200 font-medium text-lg">{qrResult}</p>
                    <div className="flex flex-col space-y-2">
                      <Button onClick={handleScanAgain} variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Scan Again
                      </Button>
                      {detectedUrl && (
                        <Button onClick={() => window.location.href = detectedUrl}>
                          Go to Link
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {scannerState.isCameraActive ? (
                      <div className="space-y-3">
                        <Button onClick={handleCaptureImage} disabled={scannerState.isProcessing} size="lg" className="w-full">
                          <Camera className="w-5 h-5 mr-2" /> 
                          {scannerState.isProcessing ? "Processing..." : "Capture Code"}
                        </Button>
                        <Button onClick={handleToggleCamera} variant="destructive" size="lg" className="w-full">
                          <X className="w-5 h-5 mr-2" /> Stop Camera
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button onClick={handleToggleCamera} disabled={scannerState.isRequestingPermission || scannerState.isProcessing} size="lg" className="w-full">
                          <Camera className="w-5 h-5 mr-2" />
                          {scannerState.isRequestingPermission ? "Requesting..." : "Start Camera Scan"}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default QR;
