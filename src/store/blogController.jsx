import create from "zustand";
import { blogState } from "@/store/blogState";

export const useBlogState = create(set => ({
    blog: [],
    searchKey: "",
    currentBlog: [],
    blogs: blogState,
    blogByCategory: [],

    blogsByCategoryState: [],
    resultSearchCategory: [],

    handleSearchResults: () => {
        const allBlog = blogState;
        set(state => ({
            blogs: allBlog.filter((e) =>
                e.title.toLowerCase().includes(state.searchKey.toLowerCase().trim())
            )
        }));
    },
    handleChange: (e) => {
        set(state => ({
            searchKey: e.target.value
        }));
    },

    // Clear keyword search bar
    clearKeySearch: () => {
        set(state => ({
            searchKey: ""
        }));
        set(state => ({
            blogs: blogState
        }));
    },

    // Blog
    findBlog: (slug) => {
        set(state => ({
            blog: state.blogs.find((blog) => blog.slug === slug)
        }));
    },
    getCurrentBlog: () => {
        set(state => ({
            currentBlog: 1
        }))
    },


    // Category
    findBlogByCategory: (slugCategory) => {
        set(state => ({
            blogByCategory: state.blogs.filter((e) => e.slugCategory === slugCategory)
        }));
    },
    getBlogsByCategory: (slugCategory) => {
        set(state => ({
            blogsByCategoryState: state.blogs.filter((blog) => blog.slugCategory === slugCategory)
        }));
    },
    handleSearchResultsCategory: () => {
        set(state => ({
            blogsByCategoryState: state.blogsByCategoryState.filter((e) =>
                e.title.toLowerCase().includes(state.searchKey.toLowerCase().trim())
            )
        }));
    },
    clearKeySearchCategory: (slugCategory) => {
        set(state => ({
            searchKey: ""
        }));
        set(state => ({
            blogsByCategoryState: state.blogs.filter((blog) => blog.slugCategory === slugCategory)
        }));
    },
}));