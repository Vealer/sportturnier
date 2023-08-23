
function Footer() {
    const currentYear = new Date().getFullYear();

    return (
            <footer className="bg-light py-4  footer">
                <div className="container text-center">
                    <p>&copy; {currentYear} by Valer Neufeld. Alle Rechte vorbehalten.  | <a href="/datenschutz">Datenschutz</a> </p>
                </div>
            </footer>
    );
}

export default Footer;
