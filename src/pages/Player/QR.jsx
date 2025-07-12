// ===== LIBRARIES ===== //
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Camera, Upload, X, ArrowLeft, CheckCircle } from "lucide-react";
import jsQR from "jsqr";
// Use QR-Scanner for better reliability
import QrScannerLib from 'qr-scanner';
import qrWorkerUrl from 'qr-scanner/qr-scanner-worker.min.js?url';
QrScannerLib.WORKER_PATH = qrWorkerUrl;

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ===== STYLES ===== //
import "@/index.css";

const QR = () => {
  const navigate = useNavigate();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [qrResult, setQrResult] = useState("");
  const [detectedUrl, setDetectedUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [scanningActive, setScanningActive] = useState(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const drawIntervalRef = useRef(null);
  const cameraStartTimeoutRef = useRef(null);
  const qrScannerRef = useRef(null);

  // Handler for continuous detection
  const onDetected = (result) => {
    stopCamera();
    setQrResult(result);
    if (result.startsWith('http://') || result.startsWith('https://')) {
      setDetectedUrl(result);
    } else {
      setDetectedUrl("");
      setCameraError('QR code does not contain a valid link.');
    }
  };

  // ===== HANDLERS ===== //
  const startCamera = async () => {
    if (isRequestingPermission) return;
    
    setCameraError("");
    setIsRequestingPermission(true);
    
    if (cameraStartTimeoutRef.current) {
      clearTimeout(cameraStartTimeoutRef.current);
    }
    
    // Stop any existing camera first to prevent conflicts
    stopCamera();
    
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported on this device/browser. Please use a secure (HTTPS) connection.");
      }

      // A small delay can help prevent race conditions on some devices
      await new Promise(resolve => setTimeout(resolve, 100));

      let stream;
      // Prefer back camera, square aspect ratio
      const videoConstraints = {
        facingMode: 'environment',
        width: { ideal: 720 },
        height: { ideal: 720 }
      };
      
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
      } catch (envError) {
        console.warn(`Environment camera failed, trying any camera:`, envError);
        // Fallback to any camera if the back camera fails
        stream = await navigator.mediaDevices.getUserMedia({ video: {
            width: { ideal: 720 },
            height: { ideal: 720 }
        } });
      }

      if (videoRef.current && stream) {
        const video = videoRef.current;
        video.srcObject = stream;
        
        video.onloadedmetadata = () => {
          video.play().catch(err => {
            console.warn("Video play failed in metadata handler:", err);
            setNeedsUserInteraction(true);
          });
          
          cameraStartTimeoutRef.current = setTimeout(() => {
            if (isCameraActive && video.videoWidth > 0) {
              startQRScanning();
            }
          }, 500);
        };
        
        video.onerror = (error) => {
          console.error("Video element error:", error);
          setCameraError("Video playback error. Please try again.");
          setIsCameraActive(false);
        };
        
        await video.play();
        setNeedsUserInteraction(false);
        setIsCameraActive(true);
        setCameraError("");
        // Initialize QR-Scanner for live detection
        if (qrScannerRef.current) {
          qrScannerRef.current.destroy();
        }
        qrScannerRef.current = new QrScannerLib(video, onDetected);
        qrScannerRef.current.start();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsCameraActive(false);
      
      if (error.name === 'NotAllowedError') {
        setCameraError("Camera permission denied. Please allow camera access in your browser settings and try again.");
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError("No camera found on this device.");
      } else if (error.name === 'NotSupportedError') {
        setCameraError("Camera access is not supported on this browser. Please use a modern browser like Chrome or Firefox.");
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setCameraError("Camera is busy or being used by another application. Please close other apps and try again.");
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        setCameraError("The selected camera does not support the required settings. Trying with basic settings.");
        setTimeout(() => startBasicCamera(), 500);
      } else {
        setCameraError(`An unexpected camera error occurred: ${error.message}. Please refresh the page.`);
      }
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const startBasicCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current && stream) {
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();
        setIsCameraActive(true);
        setCameraError("");
        setTimeout(() => { if (isCameraActive) startQRScanning(); }, 1000);
      }
    } catch (error) {
      console.error("Basic camera fallback failed:", error);
      setCameraError("Unable to access any camera. Please check permissions and ensure your camera is working.");
    }
  };

  const stopCamera = () => {
    // Stop QR-Scanner
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    if (cameraStartTimeoutRef.current) {
      clearTimeout(cameraStartTimeoutRef.current);
      cameraStartTimeoutRef.current = null;
    }
    
    stopQRScanning();
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
    setCameraError("");
  };

  const startQRScanning = () => {
    if (!isCameraActive || scanningActive) return;
    
    setScanningActive(true);
    
    // Draw the video to the canvas for the guide box
    drawIntervalRef.current = setInterval(drawVideoToCanvas, 100);
    // Faster scanning for better responsiveness - scan every 300ms
    scanIntervalRef.current = setInterval(() => {
      if (!isProcessing) {
        setIsProcessing(true);
        scanQRCode();
      }
    }, 300);
  };

  const stopQRScanning = () => {
    setScanningActive(false);
    
    if (drawIntervalRef.current) {
      clearInterval(drawIntervalRef.current);
      drawIntervalRef.current = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const drawVideoToCanvas = () => {
    if (!videoRef.current || !displayCanvasRef.current || videoRef.current.videoWidth === 0) return;
    
    const canvas = displayCanvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    if (scanningActive) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = Math.min(canvas.width, canvas.height) * 0.7; // Make the box a bit bigger
      context.strokeStyle = 'rgba(0, 255, 0, 0.7)';
      context.lineWidth = 4;
      context.setLineDash([15, 10]);
      context.strokeRect(centerX - size/2, centerY - size/2, size, size);
    }
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || videoRef.current.videoWidth === 0) {
        setIsProcessing(false);
        return;
    }
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Enhanced scanning strategies with angle detection
    const scanStrategies = [
      // Standard strategies
      { type: 'crop', size: 0.7, angle: 0, name: 'center-70' },
      { type: 'crop', size: 0.85, angle: 0, name: 'center-85' },
      { type: 'crop', size: 0.55, angle: 0, name: 'center-55' },
      
      // Angled strategies for tilted QR codes
      { type: 'crop', size: 0.7, angle: 15, name: 'center-70-15deg' },
      { type: 'crop', size: 0.7, angle: -15, name: 'center-70-minus15deg' },
      { type: 'crop', size: 0.7, angle: 30, name: 'center-70-30deg' },
      { type: 'crop', size: 0.7, angle: -30, name: 'center-70-minus30deg' },
      { type: 'crop', size: 0.85, angle: 45, name: 'center-85-45deg' },
      { type: 'crop', size: 0.85, angle: -45, name: 'center-85-minus45deg' },
      
      // Full frame with angles as fallback
      { type: 'full', angle: 0, name: 'full-frame' },
      { type: 'full', angle: 90, name: 'full-frame-90deg' },
      { type: 'full', angle: 180, name: 'full-frame-180deg' },
      { type: 'full', angle: 270, name: 'full-frame-270deg' }
    ];
    
    for (const strategy of scanStrategies) {
      try {
        let imageData, width, height;
        
        if (strategy.type === 'full') {
          // Full frame with rotation
          if (strategy.angle === 0) {
            imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            width = canvas.width;
            height = canvas.height;
          } else {
            const rotatedCanvas = document.createElement('canvas');
            const rotatedContext = rotatedCanvas.getContext('2d');
            
            if (strategy.angle === 90 || strategy.angle === 270) {
              rotatedCanvas.width = canvas.height;
              rotatedCanvas.height = canvas.width;
            } else {
              rotatedCanvas.width = canvas.width;
              rotatedCanvas.height = canvas.height;
            }
            
            rotatedContext.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
            rotatedContext.rotate((strategy.angle * Math.PI) / 180);
            rotatedContext.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
            
            imageData = rotatedContext.getImageData(0, 0, rotatedCanvas.width, rotatedCanvas.height);
            width = rotatedCanvas.width;
            height = rotatedCanvas.height;
          }
        } else {
          // Cropped with rotation
          const size = Math.floor(Math.min(canvas.width, canvas.height) * strategy.size);
          const sx = Math.floor((canvas.width - size) / 2);
          const sy = Math.floor((canvas.height - size) / 2);
          
          if (strategy.angle === 0) {
            imageData = context.getImageData(sx, sy, size, size);
            width = height = size;
          } else {
            // Create rotated cropped image
            const cropCanvas = document.createElement('canvas');
            const cropContext = cropCanvas.getContext('2d');
            cropCanvas.width = size;
            cropCanvas.height = size;
            
            const cropImageData = context.getImageData(sx, sy, size, size);
            cropContext.putImageData(cropImageData, 0, 0);
            
            const rotatedCanvas = document.createElement('canvas');
            const rotatedContext = rotatedCanvas.getContext('2d');
            rotatedCanvas.width = size;
            rotatedCanvas.height = size;
            
            rotatedContext.translate(size / 2, size / 2);
            rotatedContext.rotate((strategy.angle * Math.PI) / 180);
            rotatedContext.drawImage(cropCanvas, -size / 2, -size / 2);
            
            imageData = rotatedContext.getImageData(0, 0, size, size);
            width = height = size;
          }
        }
        
        console.log(`Scanning strategy: ${strategy.name} (${width}x${height})`);
        
        const code = jsQR(
          imageData.data, 
          width, 
          height, 
          { 
            inversionAttempts: 'attemptBoth',
            canOverwriteText: true,
            greyScaleWeights: {
              red: 0.299,
              green: 0.587,
              blue: 0.114
            }
          }
        );
        
        if (code) {
          console.log(`✅ QR Code detected with strategy: ${strategy.name}`, code);
          stopQRScanning();
          stopCamera();
          const url = code.data;
          setQrResult(url);
          setIsProcessing(false);
          if (url.startsWith('http://') || url.startsWith('https://')) {
            setDetectedUrl(url);
          } else {
            setDetectedUrl("");
            setCameraError("QR code does not contain a valid link.");
          }
          return; // Exit early on success
        }
      } catch (error) {
        console.warn(`Strategy ${strategy.name} failed:`, error);
        continue; // Try next strategy
      }
    }
    
    // If no strategy worked
    console.log('❌ No QR code detected with any strategy');
    setCameraError("No QR code could be detected. Please try again.");
    setIsProcessing(false);
  };

  const captureImage = () => {
    if (isCameraActive && !isProcessing) {
      setIsProcessing(true);
      setCameraError("");
      // Give a short delay for the UI to update to "Processing..."
      setTimeout(() => {
        scanQRCode();
      }, 50);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setCameraError("");
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        
        console.log(`📁 File loaded: ${img.width}x${img.height}`);
        
        // Try simple direct scan first (most reliable for file uploads)
        console.log('🔍 Trying direct full image scan...');
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let code = jsQR(imageData.data, canvas.width, canvas.height, { 
          inversionAttempts: 'attemptBoth'
        });
        
        if (code) {
          console.log(`✅ QR Code detected with direct scan!`, code);
          const url = code.data;
          setIsProcessing(false);
          if (url.startsWith('http://') || url.startsWith('https://')) {
            setQrResult(`URL detected! Redirecting...`);
            window.location.href = url;
          } else {
            setQrResult(`Detected content (not a URL): ${url}`);
            setCameraError("QR code in image does not contain a valid link.");
          }
          return;
        }
        
        // If direct scan fails, try scaled down version
        console.log('🔍 Trying scaled down scan...');
        const scaledCanvas = document.createElement('canvas');
        const scaledContext = scaledCanvas.getContext('2d');
        const scale = 0.5;
        scaledCanvas.width = Math.floor(canvas.width * scale);
        scaledCanvas.height = Math.floor(canvas.height * scale);
        scaledContext.drawImage(img, 0, 0, scaledCanvas.width, scaledCanvas.height);
        
        imageData = scaledContext.getImageData(0, 0, scaledCanvas.width, scaledCanvas.height);
        code = jsQR(imageData.data, scaledCanvas.width, scaledCanvas.height, { 
          inversionAttempts: 'attemptBoth'
        });
        
        if (code) {
          console.log(`✅ QR Code detected with scaled scan!`, code);
          const url = code.data;
          setIsProcessing(false);
          if (url.startsWith('http://') || url.startsWith('https://')) {
            setQrResult(`URL detected! Redirecting...`);
            window.location.href = url;
          } else {
            setQrResult(`Detected content (not a URL): ${url}`);
            setCameraError("QR code in image does not contain a valid link.");
          }
          return;
        }
        
        // If simple scans fail, try the advanced camera strategies
        console.log('🔍 Trying advanced camera strategies...');
        const scanStrategies = [
          // Standard strategies (same as camera)
          { type: 'crop', size: 0.7, angle: 0, name: 'center-70' },
          { type: 'crop', size: 0.85, angle: 0, name: 'center-85' },
          { type: 'crop', size: 0.55, angle: 0, name: 'center-55' },
          
          // Angled strategies for tilted QR codes (same as camera)
          { type: 'crop', size: 0.7, angle: 15, name: 'center-70-15deg' },
          { type: 'crop', size: 0.7, angle: -15, name: 'center-70-minus15deg' },
          { type: 'crop', size: 0.7, angle: 30, name: 'center-70-30deg' },
          { type: 'crop', size: 0.7, angle: -30, name: 'center-70-minus30deg' },
          { type: 'crop', size: 0.85, angle: 45, name: 'center-85-45deg' },
          { type: 'crop', size: 0.85, angle: -45, name: 'center-85-minus45deg' },
          
          // Full frame with angles as fallback (same as camera)
          { type: 'full', angle: 90, name: 'full-frame-90deg' },
          { type: 'full', angle: 180, name: 'full-frame-180deg' },
          { type: 'full', angle: 270, name: 'full-frame-270deg' }
        ];
        
        for (const strategy of scanStrategies) {
          try {
            let imageData, width, height;
            
            if (strategy.type === 'full') {
              // Full frame with rotation (SAME logic as camera)
              const rotatedCanvas = document.createElement('canvas');
              const rotatedContext = rotatedCanvas.getContext('2d');
              
              if (strategy.angle === 90 || strategy.angle === 270) {
                rotatedCanvas.width = canvas.height;
                rotatedCanvas.height = canvas.width;
              } else {
                rotatedCanvas.width = canvas.width;
                rotatedCanvas.height = canvas.height;
              }
              
              rotatedContext.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
              rotatedContext.rotate((strategy.angle * Math.PI) / 180);
              rotatedContext.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
              
              imageData = rotatedContext.getImageData(0, 0, rotatedCanvas.width, rotatedCanvas.height);
              width = rotatedCanvas.width;
              height = rotatedCanvas.height;
            } else {
              // Cropped with rotation (SAME logic as camera)
              const size = Math.floor(Math.min(canvas.width, canvas.height) * strategy.size);
              const sx = Math.floor((canvas.width - size) / 2);
              const sy = Math.floor((canvas.height - size) / 2);
              
              if (strategy.angle === 0) {
                imageData = context.getImageData(sx, sy, size, size);
                width = height = size;
              } else {
                // Create rotated cropped image (SAME logic as camera)
                const cropCanvas = document.createElement('canvas');
                const cropContext = cropCanvas.getContext('2d');
                cropCanvas.width = size;
                cropCanvas.height = size;
                
                const cropImageData = context.getImageData(sx, sy, size, size);
                cropContext.putImageData(cropImageData, 0, 0);
                
                const rotatedCanvas = document.createElement('canvas');
                const rotatedContext = rotatedCanvas.getContext('2d');
                rotatedCanvas.width = size;
                rotatedCanvas.height = size;
                
                rotatedContext.translate(size / 2, size / 2);
                rotatedContext.rotate((strategy.angle * Math.PI) / 180);
                rotatedContext.drawImage(cropCanvas, -size / 2, -size / 2);
                
                imageData = rotatedContext.getImageData(0, 0, size, size);
                width = height = size;
              }
            }
            
            console.log(`🔍 Trying file scan strategy: ${strategy.name} (${width}x${height})`);
            
            // Use EXACT same jsQR options as camera
            const code = jsQR(
              imageData.data, 
              width, 
              height, 
              { 
                inversionAttempts: 'attemptBoth',
                canOverwriteText: true,
                greyScaleWeights: {
                  red: 0.299,
                  green: 0.587,
                  blue: 0.114
                }
              }
            );
            
            if (code) {
              console.log(`✅ QR Code detected in file with strategy: ${strategy.name}`, code);
              const url = code.data;
              setIsProcessing(false);
              if (url.startsWith('http://') || url.startsWith('https://')) {
                setQrResult(`URL detected! Redirecting...`);
                // Redirect to the URL from the QR code
                window.location.href = url;
              } else {
                setQrResult(`Detected content (not a URL): ${url}`);
                setCameraError("QR code in image does not contain a valid link.");
              }
              return; // Exit early on success
            }
          } catch (error) {
            console.warn(`File strategy ${strategy.name} failed:`, error);
            continue; // Try next strategy
          }
        }
        
        // If no strategy worked
        console.log('❌ No QR code detected in uploaded file with any strategy');
        setCameraError("No QR code found in the uploaded image.");
        setIsProcessing(false);
      };
      img.onerror = () => {
        setIsProcessing(false);
        setCameraError("Could not load the selected image file.");
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      setIsProcessing(false);
      setCameraError("Failed to read the selected file.");
    };
    reader.readAsDataURL(file);
  };

  const goBack = () => {
    stopCamera();
    navigate(-1);
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const playVideoManually = async () => {
    if (videoRef.current && videoRef.current.paused) {
      try {
        await videoRef.current.play();
        setNeedsUserInteraction(false);
        setCameraError("");
      } catch (err) {
        console.error("Manual video play failed:", err);
        setCameraError("Failed to start video playback. Please try refreshing the page.");
      }
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

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
                      className={`w-full h-full object-cover transition-opacity duration-300 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                      onClick={playVideoManually}
                    />
                    
                    <canvas
                      ref={displayCanvasRef}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    
                    {/* QR Guide Frame */}
                    {isCameraActive && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-56 h-56 border-2 border-green-400 rounded-lg bg-transparent">
                          {/* Corner brackets */}
                          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-green-400"></div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-green-400"></div>
                          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-green-400"></div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-green-400"></div>
                        </div>
                      </div>
                    )}
                    
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {!isCameraActive && !isRequestingPermission && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
                        <QrCode className="w-16 h-16 text-white/60 mb-4" />
                        <p className="text-white/80 font-medium">Camera is off</p>
                      </div>
                    )}

                    {isRequestingPermission && (
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/80 mb-4"></div>
                        <p className="text-white/80 font-medium">Starting Camera...</p>
                      </div>
                    )}
                    
                    {isCameraActive && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Camera is active"></div>
                    )}
                    
                    {isCameraActive && needsUserInteraction && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center p-4 cursor-pointer" onClick={playVideoManually}>
                        <div>
                          <div className="text-4xl mb-2">▶️</div>
                          <p className="text-lg font-medium">Click to Start Video</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-foreground text-xl">Scan QR Code to Join Boss Battle</CardTitle>
                <CardDescription className="text-muted-foreground">Use your camera or upload an image</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {cameraError && (
                  <div className="text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="text-destructive font-medium text-sm">{cameraError}</p>
                    <Button onClick={() => setCameraError("")} variant="ghost" size="sm" className="mt-2">Dismiss</Button>
                  </div>
                )}
                
                {qrResult ? (
                  <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/20 space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <p className="text-green-800 dark:text-green-200 font-medium text-lg">{qrResult}</p>
                    <div className="flex flex-col space-y-2">
                      <Button onClick={() => {setQrResult(""); setDetectedUrl(""); setCameraError(""); setIsProcessing(false); startCamera();}} variant="outline">
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
                    {isCameraActive ? (
                      <div className="space-y-3">
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <p className="text-blue-800 dark:text-blue-200 font-medium">
                            {isProcessing ? "Scanning..." : "Point camera at a QR Code"}
                          </p>
                        </div>
                        <Button onClick={captureImage} disabled={isProcessing} size="lg" className="w-full">
                          <Camera className="w-5 h-5 mr-2" /> 
                          {isProcessing ? "Processing..." : "Capture Code"}
                        </Button>
                        <Button onClick={toggleCamera} variant="destructive" size="lg" className="w-full">
                          <X className="w-5 h-5 mr-2" /> Stop Camera
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button onClick={toggleCamera} disabled={isRequestingPermission || isProcessing} size="lg" className="w-full">
                          <Camera className="w-5 h-5 mr-2" />
                          {isRequestingPermission ? "Requesting..." : "Start Camera Scan"}
                        </Button>
                        <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="lg" className="w-full" disabled={isProcessing}>
                          <Upload className="w-5 h-5 mr-2" />
                          {isProcessing ? "Processing..." : "Upload Image"}
                        </Button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
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
