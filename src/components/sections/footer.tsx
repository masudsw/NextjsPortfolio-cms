import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Copyright Information */}
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Golam Mustafa. All rights reserved.
          </p>

          {/* Quick Links / Social Media */}
          <div className="flex space-x-6">
            
            {/* Example: Link to GitHub */}
            <Link 
              href="https://github.com/masudsw" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-indigo-400 transition duration-300 text-sm"
            >
              GitHub
            </Link>
            
            {/* Example: Link to LinkedIn */}
            <Link 
              href="https://www.linkedin.com/in/golam-mustafa-masud" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-indigo-400 transition duration-300 text-sm"
            >
              LinkedIn
            </Link>

            {/* Example: Link to Contact/Email */}
            <Link 
              href="mailto:golammustafa@gmail.com" 
              className="text-gray-400 hover:text-indigo-400 transition duration-300 text-sm"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}