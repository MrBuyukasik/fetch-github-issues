/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {color} from '../common/color';
import Text from '../components/atoms/Text';
import Button from '../components/molecules/Button';
import GithubSearchCard from '../components/organisms/GithubSearchCard';
import {
  fetchIssues,
  FetchIssuesRequestModel,
  issuesSelector,
  reset,
} from '../redux/issuesSlice';
import paths from '../routes/paths';

const StyledLoading = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background: ${color.WHITE};];
  opacity: 0.4;
`;

const StyledContainer = styled(View)`
  margin: 24px 18px 0px 18px;
`;

const StyledFavoriteIssuesButton = styled(Button)`
  background-color: ${color.RED};
  margin-top: 24px;
`;

const StyledWrapper = styled(View)`
  flex: 1;
`;
const IssuesSearchScreen = ({navigation}) => {
  const favoriteIssuesText = 'Go Favorite Issues';
  const activityIndicatorSize = 'large';
  const [orgs, setOrganization] = useState<string>('');
  const [repo, setRepository] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const dispatch = useDispatch<any>();
  const {loading, hasErrors, errorMessage} = useSelector(issuesSelector);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const prepareSearchRequest = () => {
    const request: FetchIssuesRequestModel = {
      orgs: orgs,
      repo: repo,
      author: author,
      page: 1,
    };

    return request;
  };

  const onSearchHandler = async () => {
    const resultAction = await dispatch(fetchIssues(prepareSearchRequest()));
    if (fetchIssues.fulfilled.match(resultAction)) {
      const response = resultAction.payload;
      !response.errorMessage &&
        navigation.navigate(paths.ISSUES_PRESENTATION_SCREEN, {
          isFavoriteScreen: false,
        });
    }
  };

  const handleNavigateToFavoriteIssues = () => {
    navigation.navigate(paths.ISSUES_PRESENTATION_SCREEN, {
      isFavoriteScreen: true,
    });
  };

  return (
    <StyledWrapper>
      <GithubSearchCard
        organization={setOrganization}
        repository={setRepository}
        author={setAuthor}
        onClick={onSearchHandler}
      />

      <StyledFavoriteIssuesButton
        label={favoriteIssuesText}
        onClick={handleNavigateToFavoriteIssues}
      />

      <StyledContainer>
        {hasErrors && <Text label={errorMessage} />}
      </StyledContainer>

      {loading && (
        <StyledLoading>
          <ActivityIndicator
            size={activityIndicatorSize}
            color={color.ACTIVITY_INDICATOR}
          />
        </StyledLoading>
      )}
    </StyledWrapper>
  );
};

export default IssuesSearchScreen;
