import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { QuestionType, QuizType } from "../../types/quiz.type";
import { quizService, type QuizPayload } from "../../services/quizServices";

type QuizState = {
  quizzes: QuizType[];
  current?: QuizType | null;
  loading: boolean;
  error?: string | null;
};
const initialState: QuizState = {
  quizzes: [],
  current: null,
  loading: false,
  error: null,
};

//get all

export const fetchAllQuizzes = createAsyncThunk(
  "quiz/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await quizService.getAll();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//get by id

export const getQuizById = createAsyncThunk(
  "quiz/detail",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await quizService.getById(id);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//add new quiz
export const createQuiz = createAsyncThunk(
  "quiz/create",
  async (payload: QuizPayload, { rejectWithValue }) => {
    try {
      const res = await quizService.create(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
//update
export const updateQuiz = createAsyncThunk(
  "quiz/update",
  async (
    { id, data }: { id: string; data: Partial<QuizPayload> },
    { rejectWithValue }
  ) => {
    try {
      const res = await quizService.update(id, data);
      return res.data; // trả về quiz đã update
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//remove
export const deleteQuiz = createAsyncThunk(
  "quiz/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await quizService.remove(id);
      return id; // trả về id đã xóa để reducer loại bỏ
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//add 1 qs
export const addQuestion = createAsyncThunk(
  "quiz/addQuestion",
  async (
    { quizId, questionData }: { quizId: string; questionData: QuestionType },
    { rejectWithValue }
  ) => {
    try {
      const data = await quizService.addQuestion(quizId, questionData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Cannot add question"
      );
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<QuizType | null>) => {
      state.current = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearQuizzes: (state) => {
      state.quizzes = [];
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    // fetchQuizzes
    builder.addCase(fetchAllQuizzes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllQuizzes.fulfilled, (state, action) => {
      state.loading = false;
      state.quizzes = action.payload || [];
    });
    builder.addCase(fetchAllQuizzes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // get by id
    builder.addCase(getQuizById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload || [];
    });
    builder.addCase(getQuizById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //add
    builder.addCase(createQuiz.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createQuiz.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.quizzes.unshift(action.payload);
    });
    builder.addCase(createQuiz.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Update quiz
    builder.addCase(updateQuiz.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.quizzes.findIndex(
        (q) => q._id === action.payload._id
      );
      if (index !== -1) state.quizzes[index] = action.payload;
      if (state.current?._id === action.payload._id)
        state.current = action.payload;
    });

    builder.addCase(deleteQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
      if (state.current?._id === action.payload) state.current = null;
    });

    //add 1 qs
    //   .addCase(addQuestion.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(addQuestion.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.current?.questions = action.payload.quiz;
    //   })
    //   .addCase(addQuestion.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});
export const { setCurrent, clearError, clearQuizzes } = quizSlice.actions;
export default quizSlice.reducer;
