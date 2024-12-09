export default function SearchInput({ searchTerm, setSearchTerm }) {
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <form className="flex" action="">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                className="h-[50px] w-[367px] bg-black opacity-20 text-white placeholder:text-gray-500 rounded-sm max-md:w-full"
                placeholder="Search"
            />
        </form>
    );
}
