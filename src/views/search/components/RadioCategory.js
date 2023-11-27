function RadioCategory({ cat, handleCategorySelection, selectedCategory }) {
    return (
        <>
            <div key={cat.idCategoriaPadre} className="form-check">
                <input
                    checked={selectedCategory === cat.idCategoriaPadre}
                    onClick={() => handleCategorySelection(cat.idCategoriaPadre)}
                    className="form-check-input"
                    type="radio"
                    name="filter-category"
                    id={`radio-category-${cat.idCategoriaPadre}`}
                />
                <label className="form-check-label" htmlFor={`radio-category-${cat.idCategoriaPadre}`}>
                    {cat.nombreCategoriaPadre}
                </label>
            </div>
        </>
    );
}

export default RadioCategory