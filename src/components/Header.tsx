import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Box, VStack, Heading, Image} from 'native-base';

interface Props {
  title: string;
  image: ImageSourcePropType;
  children: React.ReactNode;
}

const Header = ({title, image, children}: Props) => {
  return (
    <VStack h="300px" pb={8}>
      <Image
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        w="100%"
        h="300px"
        resizeMode="cover"
        source={image}
        alt="Header image"
      />
      {children}
      <Box flex={1} />
      <Heading color="black" p={6} size="xl">
        {title}
      </Heading>
    </VStack>
  );
};

export default Header;
