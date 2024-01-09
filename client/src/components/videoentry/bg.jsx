async function handleAnswer({ from, ans }) {
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(ans));
      console.log('Remote description set successfully.');
    } catch (error) {
      console.error('Error setting remote description:', error);
    }
  }
  
  // Within your component
  useEffect(() => {
    // ... Other code
  
    socket.on('accepted', handleAnswer);
  
    return () => {
      socket.off('accepted', handleAnswer);
    };
  }, [socket]); // Ensure the socket is added as a dependency if it's used within useEffect
  
  // Ensure proper signaling state before setting remote description
  async function handleAccepted({ from, ans }) {
    if (pc.signalingState !== 'have-local-offer' && pc.signalingState !== 'stable') {
      console.warn('Cannot set remote description in the current signaling state:', pc.signalingState);
      return;
    }
  
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(ans));
      console.log('Remote description set successfully.');
    } catch (error) {
      console.error('Error setting remote description:', error);
    }
  }
  