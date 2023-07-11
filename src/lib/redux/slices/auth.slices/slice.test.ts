import { authSlice } from "./slice";
import { fetchUser, signIn, signOut, signUp } from "./thunks";

const user = {
  id: 1,
  email: "johndoe@gmail.com",
  firstName: "John",
  lastName: "Doe",
};

describe("authSlice", () => {
  describe("reducers", () => {
    it("should return the initial state", () => {
      expect(authSlice.reducer(undefined, { type: undefined })).toEqual({
        user: null,
      });
    });

    it("should handle setUser", () => {
      expect(
        authSlice.reducer({ user: null }, authSlice.actions.setUser(user))
      ).toEqual({
        user,
      });
    });

    it("should handle clearUser", () => {
      expect(
        authSlice.reducer({ user }, authSlice.actions.clearUser())
      ).toEqual({
        user: null,
      });
    });
  });

  describe("extraReducers", () => {
    it("should handle signIn.fulfilled", () => {
      const action = {
        type: signIn.fulfilled.type,
        payload: user,
      };

      expect(authSlice.reducer({ user: null }, action)).toEqual({
        user,
      });
    });

    it("should handle signIn.rejected", () => {
      const action = {
        type: signIn.rejected.type,
      };

      expect(authSlice.reducer({ user }, action)).toEqual({
        user: null,
      });
    });

    it("should handle signUp.fulfilled", () => {
      const action = {
        type: signUp.fulfilled.type,
        payload: user,
      };

      expect(authSlice.reducer({ user: null }, action)).toEqual({
        user,
      });
    });

    it("should handle signOut.fulfilled", () => {
      const action = {
        type: signOut.fulfilled.type,
      };

      expect(authSlice.reducer({ user }, action)).toEqual({
        user: null,
      });
    });

    it("should handle fetchUser.fulfilled", () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: user,
      };

      expect(authSlice.reducer({ user: null }, action)).toEqual({
        user,
      });
    });
  });
});
