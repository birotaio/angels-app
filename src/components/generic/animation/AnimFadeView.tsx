import React, {memo, useEffect, useState} from 'react';
import {Animated, ViewProps, ViewStyle} from 'react-native';

const AnimFadeView = memo(
  ({
    children,
    style,
    show,
    ...props
  }: {
    children: React.ReactNode;
    style: ViewStyle;
    show: boolean;
  } & ViewProps) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: show ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    return (
      <Animated.View
        style={[style, {opacity: fadeAnim}]}
        pointerEvents={show ? 'auto' : 'none'}
        {...props}>
        {children}
      </Animated.View>
    );
  },
);

export default AnimFadeView;
