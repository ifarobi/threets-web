import { threetSlice } from "./slice";
import threetsMock from "@/mocks/threets";
import { addThreet, deleteThreet, editThreet, fetchThreets } from "./thunks";

describe("threetSlice", () => {
  describe("reducers", () => {
    it("should return the initial state", () => {
      expect(threetSlice.reducer(undefined, { type: undefined })).toEqual({
        posts: [],
        loading: false,
      });
    });

    it("should handle setThreets", () => {
      const threets = threetsMock;

      expect(
        threetSlice.reducer(
          { posts: [], loading: false },
          threetSlice.actions.setThreets(threets)
        )
      ).toEqual({
        posts: threets,
        loading: false,
      });
    });

    it("should handle deleteThreet", () => {
      const threets = threetsMock;
      const threetId = 1;

      expect(
        threetSlice.reducer(
          { posts: threets, loading: false },
          threetSlice.actions.deleteThreet(threetId)
        )
      ).toEqual({
        posts: threets.filter((threet) => threet.id !== threetId),
        loading: false,
      });
    });

    it("should handle addThreet", () => {
      const threets = threetsMock;
      const threet = threetsMock[0];

      expect(
        threetSlice.reducer(
          { posts: threets, loading: false },
          threetSlice.actions.addThreet(threet)
        )
      ).toEqual({
        posts: [threet, ...threets],
        loading: false,
      });
    });

    it("should handle editThreet", () => {
      const threets = threetsMock;
      const threet = threetsMock[0];

      expect(
        threetSlice.reducer(
          { posts: threets, loading: false },
          threetSlice.actions.editThreet(threet)
        )
      ).toEqual({
        posts: threets.map((th) => (th.id === threet.id ? threet : th)),
        loading: false,
      });
    });
  });

  describe("extraReducers", () => {
    it("should handle fetchThreets.pending", () => {
      expect(
        threetSlice.reducer(
          { posts: [], loading: false },
          { type: fetchThreets.pending.type }
        )
      ).toEqual({
        posts: [],
        loading: true,
      });
    });

    it("should handle fetchThreets.fulfilled", () => {
      const threets = threetsMock;

      expect(
        threetSlice.reducer(
          { posts: [], loading: true },
          {
            type: fetchThreets.fulfilled.type,
            payload: threets,
          }
        )
      ).toEqual({
        posts: threets,
        loading: false,
      });
    });

    it("should handle fetchThreets.rejected", () => {
      expect(
        threetSlice.reducer(
          { posts: [], loading: true },
          { type: fetchThreets.rejected.type }
        )
      ).toEqual({
        posts: [],
        loading: false,
      });
    });

    it("should handle addThreet.fulfilled", () => {
      const threets = threetsMock;
      const threet = threetsMock[0];

      expect(
        threetSlice.reducer(
          { posts: threets, loading: false },
          {
            type: addThreet.fulfilled.type,
            payload: threet,
          }
        )
      ).toEqual({
        posts: [threet, ...threets],
        loading: false,
      });
    });

    it("should handle deleteThreet.fulfilled", () => {
      const threets = threetsMock;
      const threetId = 1;

      expect(
        threetSlice.reducer(
          { posts: threets, loading: false },
          {
            type: deleteThreet.fulfilled.type,
            payload: threetId,
          }
        )
      ).toEqual({
        posts: threets.filter((threet) => threet.id !== threetId),
        loading: false,
      });
    });

    it("should handle editThreet.fulfilled", () => {
      const threets = threetsMock;
      const threet = threetsMock[0];

      expect(
        threetSlice.reducer(
          { posts: threets, loading: false },
          {
            type: editThreet.fulfilled.type,
            payload: threet,
          }
        )
      ).toEqual({
        posts: threets.map((th) => (th.id === threet.id ? threet : th)),
        loading: false,
      });
    });
  });
});
