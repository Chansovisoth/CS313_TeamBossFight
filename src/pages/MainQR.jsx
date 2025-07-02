// ===== LIBRARIES ===== //
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Camera, Upload, X, ArrowLeft, CheckCircle, Maximize2, Minimize2 } from "lucide-react";

// ===== COMPONENTS ===== //
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ===== STYLES ===== //
import "../index.css";

const MainQR = () => {
  const navigate = useNavigate();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [qrResult, setQrResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // ===== HANDLERS ===== //
  const startCamera = async () => {
    setCameraError("");
    setIsRequestingPermission(true);
    
    try {
      // Check if we're in a secure context (HTTPS or localhost)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported on this device/browser");
      }

      // Try with back camera first, then fallback to any camera
      let stream;
      try {
        // Prefer back camera for QR scanning with higher resolution
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
      } catch (backCameraError) {
        console.warn("Back camera not available, trying any camera:", backCameraError);
        try {
          // Fallback to any camera with decent resolution
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
              width: { ideal: 1280, min: 640 },
              height: { ideal: 720, min: 480 }
            }
          });
        } catch (fallbackError) {
          console.warn("High resolution not available, using basic camera:", fallbackError);
          // Final fallback to basic camera
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: true 
          });
        }
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to load metadata
        videoRef.current.onloadedmetadata = () => {
          console.log(`Video dimensions: ${videoRef.current.videoWidth}x${videoRef.current.videoHeight}`);
        };
        
        setIsCameraActive(true);
        setCameraError("");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsCameraActive(false);
      
      // Provide specific error messages based on error type
      if (error.name === 'NotAllowedError') {
        setCameraError("Camera permission denied. Please allow camera access and try again.");
      } else if (error.name === 'NotFoundError') {
        setCameraError("No camera found on this device.");
      } else if (error.name === 'NotSupportedError') {
        setCameraError("Camera not supported on this browser.");
      } else if (error.name === 'NotReadableError') {
        setCameraError("Camera is being used by another application.");
      } else if (error.message.includes("not supported")) {
        setCameraError("Camera not supported on this device/browser. Try using HTTPS or a different browser.");
      } else {
        setCameraError("Unable to access camera. Please check permissions and try again.");
      }
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
    setCameraError("");
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      setIsProcessing(true);
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      // Ensure video is ready and has dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn("Video not ready for capture");
        setIsProcessing(false);
        return;
      }
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data for QR processing (you can add real QR library here)
      const imageData = canvas.toDataURL('image/png');
      console.log("Captured image data:", imageData.substring(0, 50) + "...");
      
      // Simulate QR code processing
      setTimeout(() => {
        setQrResult("QR Code detected! Redirecting to boss battle...");
        setIsProcessing(false);
        stopCamera();
        
        // Simulate joining boss battle
        setTimeout(() => {
          navigate("/boss-battle"); // Navigate to boss battle page
        }, 2000);
      }, 1500);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        // Simulate QR code processing
        setTimeout(() => {
          setQrResult("QR Code detected in uploaded image! Redirecting to boss battle...");
          setIsProcessing(false);
          
          // Simulate joining boss battle
          setTimeout(() => {
            navigate("/boss-battle"); // Navigate to boss battle page
          }, 2000);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const goBack = () => {
    stopCamera();
    navigate(-1); // Go back to previous page
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Cleanup camera on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isCameraActive && !isFullscreen) {
        if (event.code === 'Space' || event.code === 'Enter') {
          event.preventDefault();
          captureImage();
        } else if (event.code === 'Escape') {
          event.preventDefault();
          stopCamera();
        }
      }
      if (isFullscreen && event.code === 'Escape') {
        event.preventDefault();
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isCameraActive, isFullscreen]);

  // ===== RENDER ===== //
  return (
    <>
      {/* Fullscreen Camera View */}
      {isFullscreen && isCameraActive && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Fullscreen Header */}
          <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Minimize2 className="w-4 h-4 mr-2" />
              Exit Fullscreen
            </Button>
            <h2 className="text-white font-semibold">Scan QR Code</h2>
            <Button
              onClick={captureImage}
              disabled={isProcessing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              {isProcessing ? "Processing..." : "Capture"}
            </Button>
          </div>

          {/* Fullscreen Video */}
          <div className="flex-1 relative" onClick={captureImage}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover cursor-pointer"
            />
            {/* Fullscreen Overlay Guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-white/60 rounded-2xl relative">
                {/* Corner guides */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                
                {/* Center guidance */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <QrCode className="w-12 h-12 mx-auto mb-2 opacity-60" />
                    <p className="text-sm opacity-80">Position QR code here</p>
                    <p className="text-xs opacity-60 mt-1">Tap anywhere to capture</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-lg font-medium">Processing QR Code...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Regular View */}
      <main className="flex-grow min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={goBack}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              QR Code Scanner
            </h1>
            <div className="w-16"></div> {/* Spacer for center alignment */}
          </div>

          {/* Main Content */}
          <div className="max-w-md mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {isCameraActive ? (
                    // Live camera display in header when camera is active
                    <div className="relative w-40 h-40 md:w-48 md:h-48 bg-black rounded-xl overflow-hidden border-2 border-white/30 shadow-lg">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      <canvas
                        ref={canvasRef}
                        className="hidden"
                      />
                      {/* Overlay guide for header camera */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-white/50 rounded-lg relative">
                          {/* Corner guides */}
                          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-3 border-l-3 border-white/80 rounded-tl-md"></div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-3 border-r-3 border-white/80 rounded-tr-md"></div>
                          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-3 border-l-3 border-white/80 rounded-bl-md"></div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-3 border-r-3 border-white/80 rounded-br-md"></div>
                        </div>
                      </div>
                      {/* Camera active indicator */}
                      <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      {/* Fullscreen button */}
                      <Button
                        onClick={toggleFullscreen}
                        size="sm"
                        className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    // QR Icon when camera is not active
                    <QrCode className="w-16 h-16 text-white" />
                  )}
                </div>
                <CardTitle className="text-white text-xl">
                  Scan QR Code to Join Boss Battle
                </CardTitle>
                <CardDescription className="text-white/80">
                  Use your camera or upload an image containing a QR code
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {cameraError && (
                  <div className="text-center p-4 bg-red-500/20 rounded-lg border border-red-400/30">
                    <X className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <p className="text-red-100 font-medium text-sm">
                      {cameraError}
                    </p>
                    <Button 
                      onClick={() => setCameraError("")}
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-red-500/20 border-red-400/30 text-red-100 hover:bg-red-500/30"
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
                
                {qrResult ? (
                  <div className="text-center p-6 bg-green-500/20 rounded-lg border border-green-400/30">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <p className="text-green-100 font-medium text-lg">
                      {qrResult}
                    </p>
                  </div>
                ) : (
                  <>
                    {isCameraActive ? (
                      <div className="space-y-4">
                        <div className="text-center p-6 bg-blue-500/20 rounded-lg border border-blue-400/30">
                          <Camera className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                          <p className="text-blue-100 font-medium text-lg mb-2">
                            Camera is Active
                          </p>
                          <p className="text-blue-200/80 text-sm mb-3">
                            Position the QR code within the frame above and tap capture
                          </p>
                          <Button 
                            onClick={toggleFullscreen}
                            variant="outline"
                            size="sm"
                            className="bg-blue-500/20 border-blue-400/30 text-blue-100 hover:bg-blue-500/30"
                          >
                            <Maximize2 className="w-4 h-4 mr-2" />
                            Fullscreen View
                          </Button>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            onClick={captureImage}
                            disabled={isProcessing}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            {isProcessing ? "Processing..." : "Capture"}
                          </Button>
                          <Button 
                            onClick={stopCamera}
                            variant="outline"
                            className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Stop
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          
                          <Button 
                            onClick={() => fileInputRef.current?.click()}
                            variant="outline"
                            size="lg"
                            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 py-6"
                            disabled={isProcessing}
                          >
                            <Upload className="w-6 h-6 mr-3" />
                            <div className="text-left">
                              <div className="font-semibold">
                                {isProcessing ? "Processing..." : "Upload Image"}
                              </div>
                            </div>
                          </Button>
                        </div>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        
                        <div className="text-center">
                          {!navigator.mediaDevices && (
                            <p className="text-yellow-300/80 text-xs">
                              ⚠️ Camera access requires HTTPS or localhost
                            </p>
                          )}
                        </div>
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

export default MainQR;
