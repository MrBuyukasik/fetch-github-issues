import React from 'react';
import paths from './paths';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IssuesPresentatıonScreen from '../pages/IssuesPresentatıonScreen';
import IssuesSearchScreen from '../pages/IssuesSearchScreen';
import IssueDetailsScreen from '../pages/IssueDetailsScreen';

const Stack = createNativeStackNavigator();

const Routers = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={paths.ISSUES_SEARCH_SCREEN}
          component={IssuesSearchScreen}
        />
        <Stack.Screen
          name={paths.ISSUES_PRESENTATION_SCREEN}
          component={IssuesPresentatıonScreen}
        />
        <Stack.Screen
          name={paths.ISSUES_DETAIL_SCREEN}
          component={IssueDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
