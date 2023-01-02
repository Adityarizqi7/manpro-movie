import { Spin } from "../loading/Spin"

export const LoadMore = ({onClick, state}) => {
    return (
        <button
            onClick={onClick}
            className={`${
                state === 0 && 'pointer-events-none'
            } poppins shadow-sm' w-full bg-blue-500 py-3 text-[1.125rem] text-white transition-colors duration-300 hover:bg-opacity-80 focus:outline-none`}
        >
            {state === 0 ? <Spin /> : 'load more'}
        </button>
    )
}