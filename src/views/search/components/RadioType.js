function RadioType({ type, handleTypeSelection, selectedType }) {
    return (
        <>
            <div key={type.id} className="form-check">
                <input
                    checked={selectedType === type.id}
                    onClick={() => handleTypeSelection(type.id)}
                    className="form-check-input"
                    type="radio"
                    name="filter-type"
                    id={`radio-type-${type.id}`}
                />
                <label className="form-check-label" htmlFor={`radio-type-${type.id}`}>
                    {type.lugar}
                </label>
            </div>
        </>
    );
}

export default RadioType