import {Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

type ComponentAnimatedProps = {
  children: JSX.Element | JSX.Element[];
};

function ComponentAnimated({children}: ComponentAnimatedProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      {children}
    </Animated.View>
  );
}

export default ComponentAnimated;
