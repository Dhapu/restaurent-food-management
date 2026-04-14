function Footer() {
  return (
    <footer className="border-t border-white/10 bg-stone-950/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-stone-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-base font-semibold text-stone-100">Flame & Fork</p>
          <p>Freshly prepared dishes, fast checkout, and easy restaurant management.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <span>Open daily: 11:00 AM - 11:00 PM</span>
          <span>Support: +91 98765 43210</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
