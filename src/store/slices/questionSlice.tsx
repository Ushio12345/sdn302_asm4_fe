import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { QuestionType } from "../../types/quiz.type";
import { questionServices } from "../../services/questionServices";

interface QuestionState {
  questions: QuestionType[];
  current?: QuestionType | null;
  error: string | null;
  loading: boolean;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
  current: null,
};

export const fetchAllQuestions = createAsyncThunk(
  "questions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await questionServices.getAllQuestions();
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getQuestionByID = createAsyncThunk(
  "question/detail",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await questionServices.getQuestionById(id);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const createQuestion = createAsyncThunk(
  "questions/create",
  async (data: QuestionType, { rejectWithValue }) => {
    try {
      const res = await questionServices.createQuestion(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/update",
  async (
    { id, data }: { id: string; data: Partial<QuestionType> },
    { rejectWithValue }
  ) => {
    try {
      const res = await questionServices.updateQuestion(id, data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await questionServices.deleteQuestion(id);
      return { id, ...res };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const questionSlice = createSlice({
  initialState: initialState,
  name: "question",
  reducers: {
    setCurrent: (state, action: PayloadAction<QuestionType | null>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchAllQuestions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchAllQuestions.fulfilled,
      (state, action: PayloadAction<QuestionType[]>) => {
        state.loading = false;
        state.questions = action.payload;
      }
    );
    builder.addCase(
      fetchAllQuestions.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    // get by id
    builder.addCase(getQuestionByID.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getQuestionByID.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload || [];
    });
    builder.addCase(getQuestionByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateQuestion.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateQuestion.fulfilled,
      (state, action: PayloadAction<QuestionType>) => {
        state.loading = false;
        const index = state.questions.findIndex(
          (q) => q._id === action.payload._id
        );
        if (index !== -1) state.questions[index] = action.payload;
      }
    );
    builder.addCase(
      updateQuestion.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    // Delete
    builder.addCase(deleteQuestion.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteQuestion.fulfilled,
      (state, action: PayloadAction<{ id: string; success: boolean }>) => {
        state.loading = false;
        state.questions = state.questions.filter(
          (q) => q._id !== action.payload.id
        );
      }
    );
    builder.addCase(
      deleteQuestion.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { setCurrent } = questionSlice.actions;
export default questionSlice.reducer;
