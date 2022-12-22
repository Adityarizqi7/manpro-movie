import React from "react"
import { GlobalContext } from '@/routes/Router'

import "@/styles/blog/_blogs.scss";

import Netray from "@/layouts/Netray";
import ListBlogs from "@/pages/blog/ListBlogs" 
import { useBlogState } from "@/store/blogController";
import SearchNotFound from "@/components/error/SearchNotFound";

export default function Blogs() {

    const status = null;    
    const inputRef = React.useRef()
    const theme = React.useContext(GlobalContext).theme;
    const [focusInput, setFocusInput] = React.useState(false)

    const blogs = useBlogState(state => state.blogs);
    const searchKey = useBlogState(state => state.searchKey);
    const handleChange = useBlogState(state => state.handleChange);
    const clearKeySearch = useBlogState(state => state.clearKeySearch);
    const handleSearchResults = useBlogState(state => state.handleSearchResults);

    const handleSearchBar = (e) => {
        e.preventDefault();
        handleSearchResults();
    };

    const handleFocusInput = React.useCallback((event) => {
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
            setFocusInput(true)
            event.preventDefault()
            inputRef.current.focus()
        }
        if (event.code === 'Escape') inputRef.current.blur() || clearKeySearch()
    }, [])

    const renderTheme = (theme, dark = "", light = "") =>{
        if(theme === "dark") {
            return dark;
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handleFocusInput)

        return () => {
            document.removeEventListener('keydown', handleFocusInput)
        }
    }, [handleFocusInput])

    return (
        <Netray
            title="Blogs | Netray"
            kw="Netray blogs, Netray artikel, Netray blogs, Netray id blogs, Netray blogs indonesia"
            desc="Kumpulan daftar blogs dan artikel yang berkaitan dengan Kesehatan dari Netray."
            ogUrl={status}
            ogType={status}
            ogTitle={status}
            ogDesc={status}
            twitTitle={status}
        >
            <main className={`${renderTheme(theme, "bg-dark-theme")} blog-component`}>
                <section id="container_blog">
                    <div className="heading-blog space-y-3 montserrat">
                        <h1 className={`${renderTheme(theme, "!text-neutral-100")}`}>Netray Insight</h1>
                        <h3 className={`${renderTheme(theme, "text-neutral-100")}`}>ini adalah sebuah halaman membaca. Baca semua artikel dari Netray.</h3>
                    </div>
                    <form className="search-blog space-x-5" onSubmit={handleSearchBar}>
                        <div className="box-search md:w-[35%] w-full montserrat relative">
                            <input
                                type='text'
                                name='search-blog'
                                autoComplete='off'
                                className={`${
                                    focusInput
                                        ? 'border-b-[rgb(72, 96, 228)]'
                                        : false
                                } w-full pr-[3rem] md:w-[35%] bg-transparent`}
                                placeholder='Cari movie yang akan datang ...'
                                onChange={handleChange}
                                ref={inputRef}
                                value={searchKey}
                            />
                            {searchKey !== '' && (
                                <>
                                    <kbd
                                        onClick={clearKeySearch}
                                        className='montserrat absolute top-[0.85rem] right-0 hidden cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:block'
                                    >
                                        Esc
                                    </kbd>
                                    <kbd
                                        onClick={clearKeySearch}
                                        className='montserrat absolute top-[0.85rem] right-0 block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:hidden'
                                    >
                                        Del
                                    </kbd>
                                </> 
                            )}
                            {
                                <h1
                                    onClick={() => inputRef.current.focus()}
                                    className={`${
                                        searchKey !== '' ? 'hidden' : 'block'
                                    } inter absolute top-[1.15rem] right-0 text-[14px] font-semibold text-gray-400`}
                                >
                                    Ctrl K
                                </h1>
                            }
                        </div>
                    </form>
                        {
                            blogs.length < 1 ? 
                            <div className="flex justify-center w-full">
                                <SearchNotFound 
                                    classGif="max-w-[30rem] w-full"
                                />
                            </div>
                            : 
                            <div className="wrapper-list-blog grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                <ListBlogs blogs={blogs} searchQuestion={searchKey} />
                            </div>
                        }
                </section>
            </main>
        </Netray>
    )
}