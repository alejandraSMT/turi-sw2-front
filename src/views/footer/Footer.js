import "./style/FooterStyle.css"

let logo = require("./logo-turi.png")

function Footer() {

    return (
        <>
            <footer class="footer-turi d-flex" style={{ padding: "2rem" }}>
                <div class="col-lg-3" style={{margin:"5px"}}>
                    <h4 style={{ textAlign: "start" }}>Sobre TURI</h4>
                    <p style={{ textAlign: "start" }}>TURI es una plataforma para que los aventureros puedan organizar sus viajes de manera libre.</p>
                    <img style={{maxWidth:"30%"}} src={logo}/>
                </div>
                <div class="col-lg-3" style={{margin:"5px"}}>
                    <h4 style={{ textAlign: "start" }}>Contáctanos</h4>
                    <p style={{ textAlign: "start" }}>Teléfono: <text>(+51) 444 4444</text></p>
                    <p style={{ textAlign: "start" }}>Correo: <text href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">turi@gmail.com</text></p>
                </div>
                <div class="col-lg-3" style={{margin:"5px"}}>
                    <h4 style={{ textAlign: "start" }}>Información importante</h4>
                    <p onClick={() => { window.location = "/PreguntasFrecuentes" }} style={{ textAlign: "start", cursor: "default" }}>Preguntas frecuentes</p>
                </div>
                <div class="col-lg-3" style={{margin:"5px"}}>
                    <h4 style={{ textAlign: "start" }}>Equipo TURI</h4>
                    <div class="row d-flex">
                        <text class="text-turi" style={{ textAlign: "start" }}>Jazmin Naomi Cardenas Zapata</text>
                        <text class="text-turi" style={{ textAlign: "start" }}>Hubert Alfredo Pacheco Lizares</text>
                        <text class="text-turi" style={{ textAlign: "start" }}>Cristopher Jaffet Barrenechea Chavez</text>
                        <text class="text-turi" style={{ textAlign: "start" }}>Andrea Pilar Llerena Zuñiga</text>
                        <text class="text-turi" style={{ textAlign: "start" }}>Frank Andre Vicente Valenzuela</text>
                        <text class="text-turi" style={{ textAlign: "start" }}>Alejandra San Martin Tavera</text>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;