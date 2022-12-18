import create from 'zustand'

export const useMovieController = create((set) => ({
    searchKey: '',
    upComingDataMV: [],

    handleChange: (e) => {
        set((state) => ({
            searchKey: e.target.value,
        }))
    },

    // Clear keyword search bar
    clearKeySearch: () => {
        set((state) => ({
            searchKey: '',
        }))
        set((state) => ({
            upComingDataMV: upComingDataMV,
        }))
    },

    handleSearchResults: (data) => {
        set((state) => ({
            upComingDataMV: data.filter((e) =>
                e.title
                    .toLowerCase()
                    .includes(state.searchKey.toLowerCase().trim())
            ),
        }))
    },
}))
