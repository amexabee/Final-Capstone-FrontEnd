import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import images from '../../assets/images/images';

const classURL = 'https://rails-kicq.onrender.com/swim_classes';

const data = [
  {
    id: 1000001,
    name: 'Backstroke',
    location: 'New York',
    description:
      'Swum on the back with alternating arms and flutter kicks, great for spinal alignment.',
    image: images[0],
    fee: 120,
    booked: null,
  },
  {
    id: 1000002,
    name: 'Breaststroke',
    location: 'Indianapolis',
    description:
      'A slower, symmetrical stroke using frog-like kicks and simultaneous arm movements.',
    image: images[1],
    fee: 150,
    booked: null,
  },
  {
    id: 1000003,
    name: 'Freestyle (Front Crawl)',
    location: 'Raleigh',
    description:
      'Fastest and most common stroke, using alternating arm movements and flutter kicks.',
    image: images[2],
    fee: 100,
    booked: null,
  },
  {
    id: 1000004,
    name: 'Butterfly',
    location: 'Minneapolis',
    description:
      'Powerful and demanding stroke using dolphin kicks and symmetrical arm swings.',
    image: images[3],
    fee: 140,
    booked: null,
  },
  {
    id: 1000005,
    name: 'Sidestroke',
    location: 'Miami',
    description:
      'A relaxing and efficient stroke using scissor kicks, often used in lifesaving.',
    image: images[4],
    fee: 130,
    booked: null,
  },
];

if (!localStorage.getItem('Swim Classes')) localStorage.setItem('Swim Classes', JSON.stringify(data));

export const getClasses = createAsyncThunk(
  'swimClasses/getSwimClasses',
  async () => {
    const local = JSON.parse(localStorage.getItem('Swim Classes')) || [];
    try {
      const response = await fetch(classURL);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return [...local, ...data];
      }
      return local;
    } catch (err) {
      return local;
    }
  },
);

export const deleteClass = createAsyncThunk(
  'swimClasses/deleteClass',
  async (id) => {
    try {
      const response = await fetch(`${classURL}/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });
      return response.ok ? id : null;
    } catch (e) {
      return e.errors;
    }
  },
);

export const postClass = createAsyncThunk(
  'swimClasses/postClass',
  async (classData) => {
    await fetch(classURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(classData),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    });
  },
);
export const updateClass = createAsyncThunk(
  'swimClasses/updateClass',
  async (classData) => {
    await fetch(`${classURL}/${classData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(classData),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    });
  },
);

export const swimClassesSlice = createSlice({
  name: 'swim_classes',
  initialState: {
    swimClasses: JSON.parse(localStorage.getItem('Swim Classes')) || [],
    status: null,
    postStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteClass.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      swimClasses: state.swimClasses.filter(
        (swimClass) => swimClass.id !== action.payload,
      ),
    }));
    builder.addCase(deleteClass.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(deleteClass.rejected, (state) => ({
      ...state,
      status: 'failed',
    }));
    builder.addCase(postClass.fulfilled, (state, action) => ({
      ...state,
      postStatus: 'success',
      swimClasses: [...state.swimClasses, action.payload],
    }));
    builder.addCase(postClass.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(postClass.rejected, (state) => ({
      ...state,
      status: 'failed',
    }));
    builder.addCase(getClasses.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      swimClasses: action.payload,
    }));
    builder.addCase(getClasses.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(getClasses.rejected, (state) => ({
      ...state,
      status: 'failed',
    }));
  },
});

export const { swimClassesReducer } = swimClassesSlice.actions;

export default swimClassesSlice.reducer;
