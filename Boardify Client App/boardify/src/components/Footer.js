import "../styles/footer.scss"

export default function Footer() {
    return (
        <div className="footer">
            <div className="cta">
                <h1>Join our Boardify Newsletter</h1>
                <p>Recieve our monthly newsletter for the lastest deals on mechanical keyboards.</p>
                <div className="form">
                    <input type="text" id="email" placeholder="Enter your email"></input>
                    <button>Subscribe</button>
                </div>
            </div>
            
            <div className="contact">
                <h2>Contact</h2>
                <div className="links">
                    <a href="mailto: mazzuca115@gmail.com">Email</a>
                    <a href="https://github.com/vamazzuca">Github</a>
                </div>
            </div>
        </div>
    )
}