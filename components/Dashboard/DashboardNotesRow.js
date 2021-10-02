import { Flex, Text } from "@chakra-ui/react";

const DashboardNotesRow = ({ entry, time }) => {
  return (
    <Flex paddingTop="20px" alignItems="center" width="90%" mx="auto">
      <Text fontSize="xl" fontWeight="bold" marginRight="30px">
        {time}
      </Text>
      <Text fontSize="xl" isTruncated>
        {entry}
      </Text>
    </Flex>
  );
};

export default DashboardNotesRow;
