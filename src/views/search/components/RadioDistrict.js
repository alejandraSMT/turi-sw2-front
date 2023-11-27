function RadioDistrict({ district, handleDistrictSelection, selectedDistrict }) {
    return (
        <>
            <div key={district.id} className="form-check">
                <input
                    onClick={() => handleDistrictSelection(district.id)}
                    className="form-check-input"
                    type="radio"
                    checked={selectedDistrict === district.id}
                    name="filter-disctrict"
                    id={`radio-disctrict-${district.id}`}
                />
                <label className="form-check-label" htmlFor={`radio-disctrict-${district.id}`}>
                    {district.distrito}
                </label>
            </div>
        </>
    );
}

export default RadioDistrict