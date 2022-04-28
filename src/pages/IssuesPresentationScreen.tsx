/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState, useEffect} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styled from 'styled-components';
import ListItems from '../components/molecules/ListItems';
import {
  fetchIssues,
  FetchIssuesRequestModel,
  issuesSelector,
} from '../redux/issuesSlice';
import paths from '../routes/paths';
import {objectEmptyCheck} from '../utils/ObjectUtils';
import FilterModal from '../components/molecules/FilterModal';
import {STORAGE_KEYS} from '../common/constats';
import Storage from '../utils/store';

const StyledSefaAreaView = styled(SafeAreaView)`
  flex: 1;
`;

//This screen is shared by Issues Favorite Issues  and IssuesPresentationScreen oeprations
const IssuesPresentationScreen = ({route, navigation}) => {
  const {isFavoriteScreen} = route?.params;

  const dispatch = useDispatch<any>();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [issueItems, setIssueItems] = useState<any>();
  const {
    orgs,
    repo,
    author,
    urls,
    currentPage,
    issues,
    totalCount,
    hasErrors,
    errorMessage,
  } = useSelector(issuesSelector);

  const handleScreenTitle = () => {
    if (isFavoriteScreen) {
      return paths.ISSUES_FAVORITE_SCREEN;
    } else {
      return paths.ISSUES_PRESENTATION_SCREEN;
    }
  };

  // Handle user selected filter operation
  useEffect(() => {
    navigation.setOptions({
      title: handleScreenTitle(),
      headerRight: () => <FilterModal selectedFilter={setSelectedFilter} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (hasErrors) {
      Alert.alert(
        'Fetch Error',
        errorMessage,
        [
          {
            text: 'Return Issue Search Screen',
            onPress: () => {
              navigation.navigate(paths.ISSUES_SEARCH_SCREEN);
            },
          },
        ],
        {cancelable: false},
      );
    }
  }, [hasErrors]);

  useEffect(() => {
    const handleListData = () => {
      //handle Favorite Screen data operations
      if (isFavoriteScreen) {
        try {
          const getFavoriteIssuesFromLocalStore = async () => {
            const favoriteIssues = JSON.parse(
              await Storage.getItem(STORAGE_KEYS.FAVORITE_ISSUES),
            );

            const issuesObject = {
              items: favoriteIssues,
            };

            setIssueItems(issuesObject);
          };

          getFavoriteIssuesFromLocalStore();
        } catch (err) {
          console.log(err);
        }
      } else {
        //otherwise handle presentation data operations
        setIssueItems(issues);
      }
    };

    if (isFavoriteScreen) {
      const willFocusSubscription = navigation.addListener('focus', () => {
        handleListData();
        return willFocusSubscription;
      });
    } else {
      handleListData();
    }
  }, [issues]);

  const loadMoreCallback = useCallback((_url: string, _page: number) => {
    onLoadMore(_url, _page);
  }, []);

  const handleSelectedItem = (item: any) => {
    item &&
      navigation.navigate(paths.ISSUES_DETAIL_SCREEN, {selectedItem: item});
  };

  const onLoadMore = (_url: string, _page: number) => {
    const request: FetchIssuesRequestModel = {
      orgs: orgs,
      repo: repo,
      author: author,
      page: _page,
    };

    dispatch(fetchIssues(request));
  };

  return (
    <StyledSefaAreaView>
      {!objectEmptyCheck(issueItems) && (
        <ListItems
          urls={urls}
          issues={issueItems}
          currentPage={currentPage}
          loadMore={loadMoreCallback}
          totalCount={totalCount}
          handleSelectedItem={handleSelectedItem}
          selectedFilter={selectedFilter}
          isFavoriteScreen={isFavoriteScreen}
        />
      )}
    </StyledSefaAreaView>
  );
};

export default IssuesPresentationScreen;
