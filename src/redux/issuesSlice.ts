import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const BASE_URL: string = 'https://api.github.com/';
interface ListProps {
  urls: any[];
  issues: any;
  loading: boolean;
  hasErrors: boolean;
  currentPage: number;
  errorMessage: string;
  totalCount: number;
  orgs: string;
  repo: string;
  author: string;
}

export interface FetchIssuesRequestModel {
  orgs: string;
  repo: string;
  author: string;
  page: number;
}

export const initialState: ListProps = {
  loading: false,
  hasErrors: false,
  issues: {},
  urls: [],
  currentPage: 0,
  errorMessage: '',
  totalCount: 0,
  orgs: '',
  repo: '',
  author: '',
};

// Asynchronous thunk action
export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (request: FetchIssuesRequestModel) => {
    const {orgs, repo, author, page} = request;
    let url: string;
    if (author !== '') {
      url = `${BASE_URL}search/issues?q=author:${author} repo:${orgs}/${repo}&page=${page}`;
    } else {
      url = `${BASE_URL}search/issues?q=repo:${orgs}/${repo}&page=${page}`;
    }
    try {
      const response = await fetch(url);
      const link = response.headers.get('link');
      let urls: any;
      if (link) {
        const links = link.split(',');
        urls = links.map((item: any) => {
          const url = item
            .split(';')[0]
            .replace('>', '')
            .replace('<', '')
            .trim();
          const title = item.split(';')[1].split('rel="')[1].replace('"', '');
          const page = url.split('page=')[1];
          const showPage = false;
          return {url, title, page, showPage};
        });
      } else {
        urls = [];
      }

      const data = await response.json();
      if (
        (data.errors && Array.isArray(data.errors)) ||
        data.message?.includes('API rate limit exceeded')
      ) {
        return {
          errorMessage:
            data?.errors[0].message ||
            'Something went wrong , please try again!',
        };
      } else {
        if (link) {
          const pageInsertPosition = urls.length / 2;
          urls.splice(pageInsertPosition, 0, {showPage: true});
        }
        return {
          orgs,
          repo,
          author,
          data,
          urls,
          currentPage: page,
          totalCount: data.total_count,
        };
      }
    } catch (error) {
      return {errorMessage: 'Something went wrong , please try again!'};
    }
  },
);

// A slice for issues
const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [fetchIssues.pending.type]: state => {
      state.loading = true;
    },
    [fetchIssues.fulfilled.type]: (state, action) => {
      const {
        urls,
        data,
        currentPage,
        totalCount,
        orgs,
        repo,
        author,
        errorMessage,
      } = action.payload;

      state.urls = urls;
      state.issues[currentPage] = data;
      state.currentPage = currentPage;
      state.loading = false;
      state.hasErrors = errorMessage ? true : false;
      state.totalCount = totalCount;
      state.orgs = orgs;
      state.repo = repo;
      state.author = author;
      state.loading = false;
      state.errorMessage = errorMessage;
    },
    [fetchIssues.rejected.type]: (state, action) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMessage = action.payload.errorMessage;
      state.issues = {};
      state.urls = [];
    },
  },
});

// Actions generated from the slice
export const {reset} = issuesSlice.actions;

// selectors
export const issuesSelector = (state: any) => state.issues;

// The reducer
export default issuesSlice.reducer;
