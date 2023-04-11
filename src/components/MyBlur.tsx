import {
  add,
  Canvas,
  Circle,
  LinearGradient,
  vec,
  sub,
  Fill,
  useLoop,
  mix,
  BackdropFilter,
  Blur,
  useComputedValue,
} from '@shopify/react-native-skia';
import * as React from 'react';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const c = vec(width / 2, (height / 2) * 1.5);
const r = c.x - 48;

const MyBlur = () => {
  const progress = useLoop({duration: 4000});
  const start = useComputedValue(
    () => sub(c, vec(0, mix(progress.current, r, r))),
    [progress],
  );
  const end = useComputedValue(
    () => add(c, vec(0, mix(progress.current, r, r / 2))),
    [progress],
  );
  const radius = useComputedValue(
    () => mix(progress.current, r, r / 2),
    [progress],
  );
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Canvas style={{width: width, height: height, position: 'absolute'}}>
      <Fill color={'#e5e8ef'} />
      <Circle c={c} r={radius}>
        <LinearGradient
          start={start}
          end={end}
          colors={['#6D6027', '#D3CBB8']}
        />
      </Circle>
      <BackdropFilter filter={<Blur blur={19} />}>
        <Fill color={'#DFE3E610'} />
      </BackdropFilter>
    </Canvas>
  );
};

export default MyBlur;
