//reducer main logic

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// Async thunks for API calls
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, postData }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

// Initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
  editPostId: null,
  editPost: { title: '', body: '' },
  newPost: { title: '', body: '' },
};

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Sync actions
    setEditPostId: (state, action) => {
      state.editPostId = action.payload;
    },
    setEditPost: (state, action) => {
      state.editPost = action.payload;
    },
    setNewPost: (state, action) => {
      state.newPost = action.payload;
    },
    startEdit: (state, action) => {
      const post = action.payload;
      state.editPostId = post.id;
      state.editPost = { title: post.title, body: post.body };
    },
    cancelEdit: (state) => {
      state.editPostId = null;
      state.editPost = { title: '', body: '' };
    },
  },
  extraReducers: (builder) => {
    // Fetch posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.newPost = { title: '', body: '' };
      })
      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.editPostId = null;
        state.editPost = { title: '', body: '' };
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

// Export actions
export const { 
  setEditPostId, 
  setEditPost, 
  setNewPost, 
  startEdit, 
  cancelEdit 
} = postsSlice.actions;

// Export reducer
export default postsSlice.reducer;
