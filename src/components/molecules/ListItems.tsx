import React, {memo} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import Text from '../atoms/Text';
import {color} from '../../common/color';

const StyledContainer = styled(View)`
  width: 100%;
  flex: 1;
  padding: 10px;
`;

const StyledPageText = styled(Text)`
  width: 100%;
  flex: 1;
  padding: 10px;
`;

const StyledText = styled(Text)`
  color: ${color.ITEM_TITLE}
  font-size: 15px;
  font-weight: 800;
  padding-left: 6px;
  padding-right: 6px;
`;

const StyledNavText = styled(Text)`
  color: ${color.NAVBAR_TEXT};
  font-size: 15px;
  font-weight: 800;
  text-align: center;
`;

const StyledNavBar = styled(TouchableOpacity)`
  padding: 10px;
  background-color: ${color.NAVBAR};
`;

const StyledNavBarContainer = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledItemContainer = styled(TouchableOpacity)`
  padding: 10px;
  min-height: 60px;
  border: 1px;
  border-radius: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const StyledSeparatorStyle = styled(View)`
  height: 5px;
`;

const StyledStatucIcon = styled<{color: string}>(View)`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  ${props => `background-color:${props.color}`};
  align-self: center;
`;

const StyledViewContainer = styled(View)`
  flex-direction: row;
`;

const StyledNoDateFoundContainer = styled(View)`
  justify-content: center;
  flex: 1;
  align-self: center;
`;

interface ListProps {
  urls: any[];
  issues: any;
  loadMore: Function;
  currentPage: number;
  totalCount: number;
  handleSelectedItem: Function;
  selectedFilter: string;
  isFavoriteScreen: boolean;
}

const issueStatus = {
  OPEN: 'open',
  CLOSED: 'closed',
};

const keyExtractor = (item: any) => item.id;

const renderSeparator = () => {
  return <StyledSeparatorStyle />;
};
const renderPaggination = (
  urls: any[],
  loadMore: Function,
  currentPage: number,
  totalCount: number,
) => {
  const totalPages = Math.ceil(totalCount / 30);
  const pageText = `Page ${currentPage} of ${totalPages}`;
  const result = urls.map((item: any, index: number) => {
    if (item.showPage) {
      return <StyledPageText key={index} label={pageText} />;
    }
    return (
      <StyledNavBar key={index} onPress={() => loadMore(item.url, item.page)}>
        <StyledNavText label={item.title} />
      </StyledNavBar>
    );
  });
  return result;
};

const ListItems = (props: ListProps) => {
  const {
    issues,
    urls,
    currentPage,
    loadMore,
    totalCount,
    handleSelectedItem,
    isFavoriteScreen,
  } = props;

  const {items} = isFavoriteScreen
    ? issues || {}
    : (issues && issues[currentPage]) || {};
  const contentContainerStyle = {marginTop: 10, paddingBottom: 10};

  //  Issue Filter operations
  const handleDataFilter = () => {
    let filteredItems = items;
    if (props.selectedFilter === issueStatus.CLOSED) {
      filteredItems = items.filter(data => data.state === issueStatus.CLOSED);
    } else if (props.selectedFilter === issueStatus.OPEN) {
      filteredItems = items.filter(data => data.state === issueStatus.OPEN);
    }
    return filteredItems;
  };

  const handleNoDataFound = () => {
    const NO_DATE_TEXT = 'No Data Found';
    return (
      <StyledNoDateFoundContainer>
        <StyledText label={NO_DATE_TEXT} />
      </StyledNoDateFoundContainer>
    );
  };

  const renderItem = ({item}) => {
    // Set issue color by state
    const handleColor = () => {
      let statusColor;
      switch (item?.state) {
        case issueStatus.OPEN:
          statusColor = color.GREEN;
          break;
        case issueStatus.CLOSED:
          statusColor = color.RED;
          break;
        default:
          statusColor = color.DARK_GREY;
      }

      return statusColor;
    };

    return (
      <StyledItemContainer
        onPress={() => handleSelectedItem(item)}
        key={item.id}>
        <StyledViewContainer>
          <StyledStatucIcon color={handleColor()} />
          <StyledText label={item.title} />
        </StyledViewContainer>
      </StyledItemContainer>
    );
  };

  return (
    <StyledContainer>
      {handleDataFilter()?.length > 0 ? (
        <>
          <FlatList
            contentContainerStyle={contentContainerStyle}
            data={handleDataFilter()}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={renderSeparator}
          />
          {urls && urls.length > 0 && !isFavoriteScreen && (
            <StyledNavBarContainer>
              {renderPaggination(urls, loadMore, currentPage, totalCount)}
            </StyledNavBarContainer>
          )}
        </>
      ) : (
        handleNoDataFound()
      )}
    </StyledContainer>
  );
};

export default memo(ListItems);
