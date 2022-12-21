import layoutStyle from '@style/layoutStyle';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
  ScrollViewProps,
} from 'react-native';

let FULL_HEIGHT = Dimensions.get('window').height;
let FULL_WIDTH = Dimensions.get('window').width;
let PANEL_HEIGHT = FULL_HEIGHT - 100;

const STATUS = {
  CLOSED: 0,
  SMALL: 1,
  LARGE: 2,
};

type SwipeablePanelProps = {
  isActive: boolean;
  onClose: () => void;
  style?: object;
  closeOnTouchOutside?: boolean;
  smallPanelHeight: number;
  noBar?: boolean;
  scrollViewProps?: ScrollViewProps;
};

type SwipeablePanelState = {
  status: number;
  isActive: boolean;
  showComponent: boolean;
  opacity: Animated.Value;
  pan: any;
  deviceWidth: number;
  deviceHeight: number;
  panelHeight: number;
};

class SwipeablePanel extends Component<
  SwipeablePanelProps,
  SwipeablePanelState
> {
  pan: Animated.ValueXY;
  isClosing: boolean;
  _panResponder: any;
  animatedValueY: number;
  constructor(props: SwipeablePanelProps) {
    super(props);
    this.state = {
      status: STATUS.CLOSED,
      isActive: false,
      showComponent: false,
      opacity: new Animated.Value(0),
      pan: new Animated.ValueXY({x: 0, y: FULL_HEIGHT}),
      deviceWidth: FULL_WIDTH,
      deviceHeight: FULL_HEIGHT,
      panelHeight: PANEL_HEIGHT,
    };

    this.pan = new Animated.ValueXY({x: 0, y: FULL_HEIGHT});
    this.isClosing = false;
    this.animatedValueY = 0;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: 0,
          y: this.animatedValueY,
        });
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (evt, gestureState) => {
        if (
          (this.state.status === STATUS.LARGE &&
            this.state.pan.y._offset + this.state.pan.y._value > 10) ||
          (this.state.status === STATUS.SMALL &&
            Math.abs(this.state.pan.y._value) <= this.state.pan.y._offset)
        ) {
          this.state.pan.setValue({
            x: 0,
            y: gestureState.dy,
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.state.pan.flattenOffset();
        console.log('onPanResponderRelease', {
          dy: gestureState.dy,
          vy: gestureState.vy,
        });

        if (gestureState.dy === 0) {
          this._animateTo(this.state.status);
        } else if (gestureState.dy < -100 || gestureState.vy < -0.5) {
          console.log('onPanResponderRelease monte');
          if (this.state.status === STATUS.SMALL) {
            this._animateTo(STATUS.LARGE);
          }
        } else if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          console.log('onPanResponderRelease descend');
          if (this.state.status === STATUS.LARGE) {
            this._animateTo(STATUS.SMALL);
          } else {
            this._animateTo(STATUS.CLOSED);
          }
        } else {
          this._animateTo(this.state.status);
        }
      },
    });
  }

  componentDidMount = () => {
    const {isActive} = this.props;

    this.animatedValueY = 0;
    this.state.pan.y.addListener(
      (value: any) => (this.animatedValueY = value.value),
    );

    this.setState({isActive});

    if (isActive) {
      this._animateTo(STATUS.SMALL);
    }
  };

  componentDidUpdate(
    prevProps: SwipeablePanelProps,
    // prevState: SwipeablePanelState,
  ) {
    const {isActive} = this.props;

    if (prevProps.isActive !== isActive) {
      this.setState({isActive});

      if (isActive) {
        this._animateTo(STATUS.SMALL);
      } else {
        this._animateTo(STATUS.CLOSED);
      }
    }
  }

  _animateTo = (newStatus = STATUS.CLOSED) => {
    const {smallPanelHeight} = this.props;
    const {panelHeight} = this.state;
    let newY = 0;

    if (panelHeight < PANEL_HEIGHT) {
      if (newStatus === STATUS.CLOSED) {
        newY = PANEL_HEIGHT;
      } else if (newStatus === STATUS.SMALL) {
        newY = FULL_HEIGHT - (smallPanelHeight ?? 400);
      } else if (newStatus === STATUS.LARGE) {
        newY = 0;
      }
    } else {
      console.log('bigger');
      if (newStatus === STATUS.CLOSED) {
        newY = panelHeight;
      } else if (newStatus === STATUS.SMALL) {
        newY = panelHeight - smallPanelHeight;
      } else if (newStatus === STATUS.LARGE) {
        newY = panelHeight - PANEL_HEIGHT;
      }
    }
    console.log('newY', newY, newStatus, FULL_HEIGHT, smallPanelHeight);

    this.setState({
      showComponent: true,
      status: newStatus,
    });

    Animated.spring(this.state.pan, {
      toValue: {x: 0, y: newY},
      tension: 80,
      friction: 25,
      useNativeDriver: true,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    }).start(() => {
      if (newStatus === STATUS.CLOSED) {
        this.props.onClose();
        this.setState({
          showComponent: false,
          panelHeight: PANEL_HEIGHT,
        });
      }
    });
  };

  render() {
    const {showComponent, deviceWidth, panelHeight, status} = this.state;
    const {style, onClose, closeOnTouchOutside} = this.props;

    return showComponent ? (
      <Animated.View
        style={[
          SwipeablePanelStyles.background,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: 'rgba(0,0,0,0)',
            height:
              status === STATUS.LARGE
                ? panelHeight
                : this.props.smallPanelHeight - 100,
            width: deviceWidth,
          },
        ]}>
        {closeOnTouchOutside && (
          <TouchableWithoutFeedback
            onPress={() => {
              onClose();
              this.setState({panelHeight: PANEL_HEIGHT});
            }}>
            <View
              style={[
                SwipeablePanelStyles.background,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  width: deviceWidth,
                  // backgroundColor: 'rgba(0,0,0,0)',
                  height: 'auto',
                  backgroundColor: 'red',
                },
              ]}
            />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          style={[
            SwipeablePanelStyles.panel,
            {
              width: deviceWidth,
              height: panelHeight,
            },
            {transform: this.state.pan.getTranslateTransform()},
            style,
          ]}
          {...this._panResponder.panHandlers}>
          <View
            onLayout={_ => {
              this.setState({
                panelHeight: Math.max(
                  _.nativeEvent.layout.height,
                  PANEL_HEIGHT,
                ),
              });
              setTimeout(() => {
                this._animateTo(STATUS.SMALL);
              }, 10);

              console.log('panelHeight', _.nativeEvent.layout.height);
            }}
            onTouchStart={() => {
              return false;
            }}
            onTouchEnd={() => {
              return false;
            }}
            contentContainerStyle={
              SwipeablePanelStyles.scrollViewContentContainerStyle
            }
            {...this.props.scrollViewProps}>
            <Bar />
            {this.props.children}
            <View style={layoutStyle.h32p} />
          </View>
        </Animated.View>
      </Animated.View>
    ) : null;
  }
}

export const Bar = () => {
  return (
    <View style={[BarStyles.barContainer]}>
      <View style={[BarStyles.bar]} />
    </View>
  );
};

const SwipeablePanelStyles = StyleSheet.create({
  background: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  panel: {
    position: 'absolute',
    height: PANEL_HEIGHT,
    width: FULL_WIDTH - 50,
    transform: [{translateY: FULL_HEIGHT - 100}],
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    zIndex: 2,
  },
  scrollViewContentContainerStyle: {
    width: '100%',
  },
});

const BarStyles = StyleSheet.create({
  barContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: '10%',
    height: 5,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#e2e2e2',
  },
});

const SMALL_PANEL_CONTENT_HEIGHT = PANEL_HEIGHT - (FULL_HEIGHT - 400) - 25;
const LARGE_PANEL_CONTENT_HEIGHT = PANEL_HEIGHT - 25;

export {SwipeablePanel, LARGE_PANEL_CONTENT_HEIGHT, SMALL_PANEL_CONTENT_HEIGHT};
export type {SwipeablePanelProps};
