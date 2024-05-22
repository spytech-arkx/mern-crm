import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// define actions :

export const fetchCompanies = createAsyncThunk("companies/fetchCompanies", async () => {
  const token = import.meta.env.VITE_API_KEY;

  const response = await fetch("http://localhost:3000/api/companies", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }
  const data = await response.json();
  return data;
});

export const fetchCompanyById = createAsyncThunk(
  "companies/fetchCompanyById",
  async (id) => {
    const token = import.meta.env.VITE_API_KEY;

    const response = await fetch(`http://localhost:3000/api/companies/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch company");
    }
    const data = await response.json();
    return data.item;
  },
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (updatedCompany) => {
    const token = import.meta.env.VITE_API_KEY;

    console.log("Updated Company:", updatedCompany); // Ajouté pour debugging

    const response = await fetch(
      `http://localhost:3000/api/companies/${updatedCompany._id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCompany),
      },
    );
    if (!response.ok) {
      const errorText = await response.text(); // Ajouté pour lire le texte de l'erreur
      console.error("Server error:", errorText); // Log de l'erreur serveur
      throw new Error("Failed to update company");
    }
    const data = await response.json();

    return data;
  },
);

const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    items: [],
    status: "idle",
    fetchCompanyStatus: "idle",
    error: null,
    selectedCompany: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.fetchCompanyStatus = "loading";
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.fetchCompanyStatus = "succeeded";
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.fetchCompanyStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (company) => company._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.selectedCompany = action.payload;
      });
  },
});

export default companiesSlice.reducer;
