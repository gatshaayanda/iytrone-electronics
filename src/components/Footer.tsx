export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#bce2ff] to-[#62A3E3] text-[#0E3A62] mt-12 shadow-inner">
      <div className="container px-4 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} IYTRONE Electronics (Pty) Ltd. All rights reserved.</p>
        <p className="opacity-80">Tech repairs & electronics solutions in Botswana.</p>
      </div>
    </footer>
  );
}
