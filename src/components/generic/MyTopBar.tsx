import {TranslateKeyProps} from '@assets/locales/locale';
import layoutStyle from '@style/layoutStyle';
import themeStyle from '@style/themeStyle';
import React, {memo, useEffect, useState} from 'react';
import {useCallback} from 'react';
import {
  Animated,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MyText from './MyText';

type MyTopBarProps = {
  entries: TranslateKeyProps[];
  onSelect: (selection: TranslateKeyProps) => void;
};

const MyTopBar = memo(({entries, onSelect}: MyTopBarProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [widths, setWidths] = useState<number[]>(entries.map(() => 0));
  const [leftBar] = useState<Animated.Value>(new Animated.Value(0));
  const [widthBar] = useState<Animated.Value>(new Animated.Value(0));
  useEffect(() => {
    if (widths[0] > 0) {
      setSelectedIndex(0);
    }
  }, [widths]);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (selectedIndex > -1) {
        onSelect(entries[selectedIndex]);
        Animated.parallel([
          Animated.timing(widthBar, {
            isInteraction: true,
            useNativeDriver: false,
            toValue: widths[selectedIndex] - 24,
          }),
          Animated.timing(leftBar, {
            isInteraction: true,
            useNativeDriver: false,
            toValue: sumWidth(selectedIndex),
          }),
        ]).start();
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const sumWidth = useCallback(
    _selectedIndex => {
      if (_selectedIndex === 0) {
        return 0;
      } else {
        return widths.slice(0, _selectedIndex).reduce((acc, v) => v + acc, 0);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedIndex],
  );

  return (
    <View style={layoutStyle.pt24}>
      <View style={[layoutStyle.rowCenter, layoutStyle.pv2]}>
        {entries.map((item, index) => (
          <TouchableOpacity
            key={index + 'myTopBar'}
            onPress={() => setSelectedIndex(index)}
            onLayout={e => {
              if (!widths[index]) {
                const w = [...widths];
                w[index] = e.nativeEvent.layout.width + 1;
                setWidths(w);
              }
            }}>
            <MyText
              _caption_big_bold={selectedIndex === index}
              _caption_big
              style={[layoutStyle.mr24]}
              keyText={item}
            />
          </TouchableOpacity>
        ))}
      </View>
      {/* Moving bar */}
      <Animated.View
        style={{
          ...styles.bar,
          width: widthBar,
          left: leftBar,
        }}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: themeStyle.accentPrimary,
    borderRadius: 200,
    height: 4,
  },
});

export default MyTopBar;
