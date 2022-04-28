import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';

interface Props {
  selectedFilter: Function;
}

export const issueStatus = ['open', 'closed', 'all'];

const FilterModal = (props: Props) => {
  const defaultvValue = 'Filter Issues';
  const style = {borderWidth: 1, borderColor: 'black', padding: 5};
  const dropdownTextStyle = {fontSize: 14};
  const textStyle = {fontSize: 12};
  const dropdownStyle = {width: '30%'};

  return (
    <ModalDropdown
      style={style}
      dropdownTextStyle={dropdownTextStyle}
      textStyle={textStyle}
      dropdownStyle={dropdownStyle}
      options={issueStatus}
      defaultValue={defaultvValue}
      onSelect={value => {
        props.selectedFilter(issueStatus[value]);
      }}
    />
  );
};

export default FilterModal;
