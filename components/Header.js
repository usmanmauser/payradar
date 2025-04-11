export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-blue-900">PayRadar</a>
        <nav className="space-x-4">
          <a href="/" className="text-gray-700 hover:text-blue-800">Home</a>
          <a href="tools" className="text-gray-700 hover:text-blue-800">Tools</a>
          <a href="about" className="text-gray-700 hover:text-blue-800">About</a>
        </nav>
      </div>
    </header>
  );
}
