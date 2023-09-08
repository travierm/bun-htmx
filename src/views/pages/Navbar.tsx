export function Navbar() {
  return (
    <nav hx-boost="true" className="bg-blue-700 flex p-2 text-white text-xl">
      <div className="mr-4">Bun+HTMX</div>

      <div className="flex gap-2 mr-2">
        <a href="/orders">Orders</a>
        <a href="/customers">Customers</a>
      </div>

      <div className="flex ml-auto">
        <a href="/logout">Logout</a>
      </div>
    </nav>
  );
}
