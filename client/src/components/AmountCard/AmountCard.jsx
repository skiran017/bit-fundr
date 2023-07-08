import React from 'react';
import { Flex, Text, Box, Image, chakra } from '@chakra-ui/react';
import { daysLeft } from '../../utils/helpers';

function AmountCard({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) {
  const remainingDays = daysLeft(deadline);

  return (
    <Box onClick={handleClick} rounded="14px" cursor="pointer" width="full">
      <Image
        src={image}
        alt="fund-card"
        height="158px"
        width="full"
        objectFit="cover"
        rounded="14px"
      />
      <Flex direction="column" p="4">
        <Flex direction="row" justifyItems="center" mb="18px">
          <Image
            w="16px"
            h="16px"
            objectFit="contain"
            alt="tag"
            // src={tagType}
          />
          {/* TODO: make dynamic categories list*/}
          <Text>Education</Text>
        </Flex>

        <Box display="block">
          <chakra.h3
            textAlign="left"
            fontSize="16px"
            fontWeight="semibold"
            // leading="26px"
            // truncate
          >
            {title}
          </chakra.h3>
          <chakra.p
            mt="4px"
            textAlign="left"
            // leading="26px"
          >
            {description}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" flexWrap="wrap" mt="14px" gap={2}>
          <Flex direction="column">
            <chakra.h4 fontWeight="semibold" fontSize="14px">
              {amountCollected}
            </chakra.h4>
            <chakra.p fontSize="12px" mt="4px">
              Raise of {target}
            </chakra.p>
          </Flex>

          <Flex direction="column">
            <chakra.h4>{remainingDays}</chakra.h4>
            <chakra.p mt="4px" fontSize="12px">
              Days Left
            </chakra.p>
          </Flex>
        </Flex>

        <Flex justifyItems="center" mt="20px" gap="12px">
          <chakra.p>
            by <chakra.span>{owner}</chakra.span>
          </chakra.p>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AmountCard;
