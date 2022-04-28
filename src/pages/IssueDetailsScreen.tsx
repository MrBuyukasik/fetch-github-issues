/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import {color} from '../common/color';
import selectedStar from '../assets/images/selectedStar.png';
import unSelectedStar from '../assets/images/unSelectedStar.png';
import Storage from '../utils/store';
import Text from '../components/atoms/Text';
import {STORAGE_KEYS} from '../common/constats';
const StyledContainer = styled(ScrollView)`
  padding: 20px;
`;

const StyledBodyContainer = styled(View)`
  padding: 20px;
  border: 1px solid;
  margin-bottom: 20px;
`;

const StyledSectionTitle = styled(Text)`
  font-weight: bold;
  margin-bottom: 10px;
  color: ${color.AQUA_BLUE};
`;

const StyledImage = styled(Image)`
  height: 30px;
  width: 30px;
`;

const IssueDetailsScreen = ({route, navigation}) => {
  const {selectedItem} = route?.params;
  const [isIssueFavorite, setIsIssueFavorite] = useState<boolean>();

  useEffect(() => {
    try {
      const getStoreData = async () => {
        const favoriteIssues = JSON.parse(
          await Storage.getItem(STORAGE_KEYS.FAVORITE_ISSUES),
        );

        const isFavorite = favoriteIssues?.find(
          item => item.id === selectedItem.id,
        );

        setIsIssueFavorite(isFavorite ? true : false);
      };

      getStoreData();
    } catch (err) {
      //TODO
    }
  }, []);

  const handleRemoveItemFromStore = async () => {
    const favoriteIssues = JSON.parse(
      await Storage.getItem(STORAGE_KEYS.FAVORITE_ISSUES),
    );

    return favoriteIssues?.filter(item => item.id !== selectedItem.id);
  };

  const handleFavoriteIssue = async () => {
    if (isIssueFavorite) {
      const favoriteIssues = await handleRemoveItemFromStore();
      await Storage.setItem(
        STORAGE_KEYS.FAVORITE_ISSUES,
        JSON.stringify(favoriteIssues),
      );
      setIsIssueFavorite(false);
    } else {
      const favoriteIssues =
        JSON.parse(await Storage.getItem(STORAGE_KEYS.FAVORITE_ISSUES)) || [];

      await Storage.setItem(
        STORAGE_KEYS.FAVORITE_ISSUES,
        JSON.stringify([...favoriteIssues, selectedItem]),
      );

      setIsIssueFavorite(true);
    }
  };

  useEffect(() => {
    if (isIssueFavorite !== undefined) {
      navigation.setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity onPress={handleFavoriteIssue}>
              <StyledImage
                source={isIssueFavorite ? selectedStar : unSelectedStar}
              />
            </TouchableOpacity>
          );
        },
      });
    }
  }, [isIssueFavorite]);

  return (
    <SafeAreaView>
      <StyledContainer>
        <StyledBodyContainer>
          <StyledSectionTitle label={'Issue Author'} />
          <Text label={selectedItem?.user?.login} />
        </StyledBodyContainer>

        <StyledBodyContainer>
          <StyledSectionTitle label={'Issue Title'} />
          <Text label={selectedItem?.title} />
        </StyledBodyContainer>

        <StyledBodyContainer>
          <StyledSectionTitle label={'Issue Description'} />
          <Text label={selectedItem?.body} />
        </StyledBodyContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default IssueDetailsScreen;
