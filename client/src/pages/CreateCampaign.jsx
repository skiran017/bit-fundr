import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, chakra, useColorModeValue } from '@chakra-ui/react';
import * as ethers from 'ethers';
import CustomButton from '../components/CustomButton/CustomButton';
import FormField from '../components/FormField/FormField';
import { checkIfImage, currentDate } from '../utils/helpers';
import { useStateContext } from '../context';
import { Spinner } from '@chakra-ui/react';
function CreateCampaign() {
  const navigate = useNavigate();
  const { publishCampaign } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    checkIfImage(form.image, async exists => {
      if (exists) {
        setIsLoading(true);
        await publishCampaign({
          ...form,
          target: ethers.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        alert('Provide valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <Box w={'full'} bg={useColorModeValue('white', 'gray.900')}>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="column"
        rounded="10px"
        p={{ base: '10', md: '4' }}
        h={'92vh'}
      >
        {isLoading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.custom"
            size="xl"
          />
        )}
        {!isLoading && (
          <chakra.form
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            w="full"
            // mt="32px"
            gap="30px"
          >
            <Flex flexWrap="wrap" gap={{ base: '20px', md: '40px' }}>
              <FormField
                labelName="Your Name *"
                placeholder="John Doe"
                inputType="text"
                value={form.name}
                handleChange={e => handleFormFieldChange('name', e)}
              />
              <FormField
                labelName="Campaign Title *"
                placeholder="Write a title"
                inputType="text"
                value={form.title}
                handleChange={e => handleFormFieldChange('title', e)}
              />
            </Flex>

            <FormField
              labelName="Story *"
              placeholder="Write your story"
              isTextArea
              value={form.description}
              handleChange={e => handleFormFieldChange('description', e)}
            />

            <Flex
              w="full"
              justifyContent="center"
              alignItems="center"
              p={4}
              h={'120px'}
              rounded="10px"
              bg={'#ff910026'}
            >
              <chakra.h4 fontWeight="bold" fontSize="26px" ml="20px">
                You will get 100% of the raised amount
              </chakra.h4>
            </Flex>

            <Flex flexWrap="wrap" gap="40px">
              <FormField
                labelName="Goal *"
                placeholder="RBTC 0.50"
                inputType="text"
                value={form.target}
                handleChange={e => handleFormFieldChange('target', e)}
              />
              <FormField
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                value={form.deadline}
                min={currentDate}
                handleChange={e => handleFormFieldChange('deadline', e)}
              />
            </Flex>

            <FormField
              labelName="Campaign image *"
              placeholder="Place image URL of your campaign"
              inputType="url"
              value={form.image}
              handleChange={e => handleFormFieldChange('image', e)}
            />

            <Flex justifyContent="center" alignItems="center" mt="40px">
              <CustomButton btnType="submit" title="Submit New Campaign" />
            </Flex>
          </chakra.form>
        )}
      </Flex>
    </Box>
  );
}

export default CreateCampaign;
