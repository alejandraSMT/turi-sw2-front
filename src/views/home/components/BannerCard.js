
function BannerCard({ element }) {
    return (
        <>
            <div key={element.id} className="">
                <div class="col" style={{ height:"30rem"}}>
                    <img src={element.fotobanner} class="img-fluid h-100 w-100" style={{ objectFit: "cover" }} />
                </div>
            </div>
        </>
    )
}

export default BannerCard