import store from '../store';
import issuesReducer, {
  issuesSelector,
  initialState,
  fetchIssues,
} from '../issuesSlice';
import {ISSUES_DATA} from '../../mock/mockData';
fetch = jest.fn(() => Promise.resolve());
describe('issuesSlice', () => {
  describe('Reducer and Actions', () => {
    it('should handle initial state', () => {
      expect(issuesReducer(undefined, {})).toEqual(initialState);
    });

    it('sets loading true on issuesReducer', () => {
      const state = {
        ...initialState,
        loading: false,
      };
      const action = {
        type: fetchIssues.pending.type,
        payload: true,
      };

      const nextState = issuesReducer(state, action);

      expect(nextState.loading).toBe(true);
    });

    it('sets fetchIssues on issuesReducer', () => {
      const state = {
        ...initialState,
      };
      const action = {
        type: fetchIssues.rejected.type,
        payload: {
          hasError: true,
          errorMessage: 'error',
        },
      };

      const nextState = issuesReducer(state, action);
      expect(nextState.hasErrors).toBe(true);
    });

    it('sets fetchIssuesSuccess on issuesReducer', () => {
      const state = {
        ...initialState,
      };
      const action = {
        type: fetchIssues.fulfilled.type,
        payload: {
          urls: [],
          data: ISSUES_DATA.issues,
          currentPage: 1,
          totalCount: 1,
        },
      };

      const nextState = issuesReducer(state, action);
      expect(nextState.issues[1][1].items.length).toBe(3);
    });

    it('calls fetchIssues handle Failure', async () => {
      const mockedUser = {
        orgs: 'microsoft',
        repo: 'CBL-Mariner',
        author: '',
        page: 1,
      };
      await store.dispatch(fetchIssues(mockedUser));
      const {issues} = store.getState();
      console.log('result:', store.getState());
      expect(issues.errorMessage).toBe(
        'Something went wrong , please try again!',
      );
    });
  });

  describe('Selectors', () => {
    it('selects game', () => {
      const state = {
        issues: ISSUES_DATA.issues,
      };

      expect(state.issues.total_count).toEqual(issuesSelector(1));
    });
  });
});
