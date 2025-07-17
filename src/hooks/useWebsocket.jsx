import { useState, useEffect, useRef, useCallback } from "react";

/**
 * @typedef {Object} WebSocketOptions
 * @property {number} [reconnectAttempts] - Maximum number of reconnection attempts.
 * @property {number} [reconnectInterval] - Time in ms between reconnection attempts.
 * @property {function} [onOpen] - Callback for WebSocket open event.
 * @property {function} [onClose] - Callback for WebSocket close event.
 * @property {function} [onError] - Callback for WebSocket error event.
 * @property {function} [onMessage] - Callback for WebSocket message event.
 * @property {number} [heartbeatInterval] - Interval in ms for sending heartbeat messages.
 * @property {boolean} [autoReconnect] - Whether to automatically reconnect on disconnect.
 */

/**
 * Custom React hook for managing a WebSocket connection.
 * @param {string} url - The WebSocket server URL.
 * @param {WebSocketOptions} [options={}] - Configuration options.
 */
const useWebSocket = (url, options = {}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("Disconnected");
    const [lastMessage, setLastMessage] = useState(null);
    const [error, setError] = useState(null);

    const ws = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const reconnectAttempts = useRef(0);
    const messageQueue = useRef([]);

    const {
        reconnectAttempts: maxReconnectAttempts = 5,
        reconnectInterval = 3000,
        onOpen,
        onClose,
        onError,
        onMessage,
        heartbeatInterval = 30000, // 30 seconds
        autoReconnect = true,
    } = options;

    // Send heartbeat to keep connection alive
    const sendHeartbeat = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(
                JSON.stringify({ type: "heartbeat", timestamp: Date.now() })
            );
        }
    };

    // Connect to WebSocket
    const connect = () => {
        try {
            console.log("Attempting to connect to WebSocket:", url);
            setConnectionStatus("Connecting...");
            setError(null);

            ws.current = new WebSocket(url);

            ws.current.onopen = (event) => {
                console.log("WebSocket connected successfully to:", url);
                setIsConnected(true);
                setConnectionStatus("Connected");
                setError(null);
                reconnectAttempts.current = 0;

                // Send queued messages
                while (messageQueue.current.length > 0) {
                    const message = messageQueue.current.shift();
                    ws.current.send(message);
                }

                onOpen?.(event);
            };

            ws.current.onclose = (event) => {
                console.log("WebSocket closed:", event.code, event.reason);
                setIsConnected(false);
                setConnectionStatus("Disconnected");

                // Attempt reconnection if enabled and not a clean close
                if (
                    autoReconnect &&
                    event.code !== 1000 &&
                    reconnectAttempts.current < maxReconnectAttempts
                ) {
                    reconnectAttempts.current++;
                    console.log(
                        `Reconnecting... attempt ${reconnectAttempts.current}/${maxReconnectAttempts}`
                    );
                    setConnectionStatus(
                        `Reconnecting... (${reconnectAttempts.current}/${maxReconnectAttempts})`
                    );

                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect();
                    }, reconnectInterval);
                } else if (reconnectAttempts.current >= maxReconnectAttempts) {
                    console.error("Max reconnection attempts reached");
                    setConnectionStatus("Failed to connect");
                    setError("Max reconnection attempts reached");
                }

                onClose?.(event);
            };

            ws.current.onerror = (event) => {
                console.error("WebSocket error:", event);
                setError("WebSocket connection error");
                setConnectionStatus("Error");
                onError?.(event);
            };

            ws.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    if (data.type === "heartbeat") {
                        return;
                    }

                    setLastMessage(data);
                    onMessage?.(data);
                } catch (err) {
                    console.error("Error parsing WebSocket message:", err);
                    setError("Error parsing message");
                }
            };
        } catch (err) {
            console.error("WebSocket connection failed:", err);
            setError("Failed to connect to WebSocket");
            setConnectionStatus("Error");
        }
    };

    const sendMessage = useCallback((message) => {
        const messageString =
            typeof message === "string" ? message : JSON.stringify(message);

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(messageString);
        } else {
            // Queue message for when connection is restored
            messageQueue.current.push(messageString);
        }
    }, []);

    // Disconnect
    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }

        if (ws.current) {
            ws.current.close(1000, "Client disconnecting");
        }

        setIsConnected(false);
        setConnectionStatus("Disconnected");
    }, []);

    // Initialize connection
    useEffect(() => {
        connect();

        // Set up heartbeat interval
        const heartbeatTimer = setInterval(sendHeartbeat, heartbeatInterval);

        return () => {
            clearInterval(heartbeatTimer);
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (ws.current) {
                ws.current.close(1000, "Component unmounting");
            }
        };
    }, [heartbeatInterval]);

    return {
        isConnected,
        connectionStatus,
        lastMessage,
        error,
        sendMessage,
        disconnect,
        reconnect: connect,
    };
};

export default useWebSocket;
