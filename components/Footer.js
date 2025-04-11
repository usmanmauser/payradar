export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} PayRadar. All rights reserved.
      </div>
    </footer>
  );
}
