
function Footer() {
    const currentYear = new Date().getFullYear();

    return (
      
            <footer className="bg-light py-4 fixed-bottom footer">
                <div className="container text-center">
                    <p>&copy; {currentYear} by Valer Neufeld. Alle Rechte vorbehalten.</p>
                    <div>
                        <a href="/datenschutz">Datenschutz</a> | <a href="/impressum">Impressum</a>
                    </div>
                </div>
            </footer>
      
    );
}

export default Footer;
