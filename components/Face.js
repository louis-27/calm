import Image from "next/image";
import { Text } from "@chakra-ui/react";

const Face = ({ mood, size }) => {
  return (
    <div>
      <Image
        src={`/images/${mood}.png`}
        alt={mood}
        width={size}
        height={size}
      />
      <Text fontWeight="semibold" fontSize="xl">
        {mood[0].toUpperCase() + mood.substring(1)}
      </Text>
    </div>
  );
};

export default Face;
