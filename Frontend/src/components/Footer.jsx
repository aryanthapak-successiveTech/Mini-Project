import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auhref px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-gray-400">Home</Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-400">About</Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-400">Services</Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-400">Contact</Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Us</h2>
              <p>Email: contact@quicklib.com</p>
              <p>Phone: +1 123 456 7890</p>
              <p>Address: 123 Main Street, City, Country</p>
            </div>
  
            {/* Social Media Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Follow Us</h2>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:text-gray-400">
                    <i className="fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-400">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-gray-400">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm">© 2024 QuickLib. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  