import pikachuImg from "../images/pika.png"

const ComingSoon = () => {
    return (
        <div>
            <div class="image-wrapper">
                <img src={pikachuImg} alt="Pikachu"/>
            </div>
            <h1>Coming Soon</h1>
            <div class="image-wrapper">
                <img src={pikachuImg} alt="Pikachu"/>
            </div>
        </div>
    )
}

export default ComingSoon
