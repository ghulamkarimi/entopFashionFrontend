const Footer = () => {
    return (
      <footer className="bg-gray-800 text-gray-200 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center text-sm px-4 gap-2">
          <p>&copy; 2025 ENTOP FASHION. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <a href="/agb" className="hover:underline text-gray-200 hover:text-white">AGB</a>
            <a href="/datenschutz" className="hover:underline text-gray-200 hover:text-white">Datenschutz</a>
            <a href="/impressum" className="hover:underline text-gray-200 hover:text-white">Impressum</a>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer;
  