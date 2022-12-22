import Blog from '@/pages/blog/Blog'

export default function ListBlogs({ blogs, searchQuestion }) {
    return blogs
        .filter((value) => {
            // eslint-disable-line array-callback-return
            if (searchQuestion === '') {
                return value
            } else if (
                value.title
                    .toLowerCase()
                    .includes(searchQuestion.toLowerCase().trim())
            ) {
                return value
            }
        })
        .map((blog, index) => <Blog key={index} blog={blog} />)
}
