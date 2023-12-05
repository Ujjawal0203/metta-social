import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Heading, Image, Input, Text } from "@chakra-ui/react";

const Home = () => {
  const [currencyCode, setCurrencyCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCurrencyCode(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/currency/${currencyCode}`
      );

      setCountries(response.data);
      setError("");
    } catch (err) {
      setCountries([]);
      setError("Error fetching data. Please check your input.");
    }
  };

  const getFlagCode = (countryName) => {
    const flagCodeMap = {
      "United States": "us",
      "United Kingdom": "gb",
    };

    return flagCodeMap[countryName] || "unknown";
  };

  return (
    <Box>
      <Heading marginBottom="50px">Country Search</Heading>

      <Box  >
        <Input
          type="text"
          id="currencyInput"
          value={currencyCode}
          onChange={handleInputChange}
          placeholder="Enter currency code"
          mr={{ base: 0, md: 2 }}
          mb={{ base: 2, md: 0 }}
          size="md"
          variant="filled"
          borderRadius="md"
          bg="white"
          border="2px solid "
          width={{ base: "50%", md: "20%" }}
          _hover={{ bg: "gray.100" }}
          _focus={{ bg: "gray.100", borderColor: "blue.300" }}
        />
        <Button colorScheme="blue"  size="md"  onClick={handleSearch}>Search</Button>
      </Box>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {countries.length > 0 && (
        <Box>
          <Text color="red" fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold" marginBottom="50px" >Results:</Text>
          <Box>
            {countries.map((country) => (
              <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold"  key={country.name.common}>
                {country.name.common}
                <Image
                  src={country.flags.png}  boxSize="10%" borderRadius="50%"
                  style={{ marginLeft: "10px" }}
                />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
