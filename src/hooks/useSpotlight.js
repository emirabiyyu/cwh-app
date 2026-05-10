import { useState, useCallback } from 'react';

export function useSpotlight(sceneRef) {
  const [holding, setHolding] = useState(false);
  const [spotX, setSpotX] = useState('50%');
  const [spotY, setSpotY] = useState('50%');
  const [spotR, setSpotR] = useState('0px');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const updatePosition = useCallback((clientX, clientY) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
    const y = ((clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
    setSpotX(x);
    setSpotY(y);
  }, [sceneRef]);

  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setHolding(true);
    setSpotR('110px');
    updatePosition(e.clientX, e.clientY);
  }, [updatePosition]);

  const onPointerMove = useCallback((e, cardRefs) => {
    if (!holding) return;
    updatePosition(e.clientX, e.clientY);

    let isHoveringAny = false;
    for (const [id, ref] of Object.entries(cardRefs)) {
      if (!ref) continue;
      const rect = ref.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setHoveredCardId(id);
        isHoveringAny = true;
        break;
      }
    }

    if (!isHoveringAny) {
      setHoveredCardId(null);
    }
  }, [holding, updatePosition]);

  const onPointerUp = useCallback((e, onRelease) => {
    setHolding(false);
    setSpotR('0px');
    setHoveredCardId(null);
    if (onRelease) {
      onRelease(e.clientX, e.clientY);
    }
  }, []);

  const onPointerLeave = useCallback(() => {
    setHolding(false);
    setSpotR('0px');
    setHoveredCardId(null);
  }, []);

  return {
    spotX,
    spotY,
    spotR,
    hoveredCardId,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave
    }
  };
}
