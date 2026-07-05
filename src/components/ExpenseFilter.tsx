
type ExpenseFilterProps = {
    searchText: string;
    setSearchText: (value: string) => void;
    // filterDate: string | "All";
    // setFilterDate: (value: string | "All") => void;
    filterCategory: string | "All";
    setFilterCategory: (value: string | "All") => void;
    t: Record<string, string>;
}
function ExpenseFilter({
    searchText,
    setSearchText,
    // filterDate,
    // setFilterDate,
    filterCategory,
    setFilterCategory,
    t }: ExpenseFilterProps) {
    return (
        <div className="expense-fliter">
            <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t.searchNote}
            />

            {/* <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
            >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
            </select> */}

            <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
            >
                <option value="All">{t.allCategories}</option>
                <option value="Transport">{t.transport}</option>
                <option value="Food">{t.food}</option>
                <option value="Office">{t.office}</option>
                <option value="Other">{t.other}</option>
            </select>
        </div>
    )
}
export default ExpenseFilter;