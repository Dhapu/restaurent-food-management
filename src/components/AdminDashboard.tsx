import { useState } from 'react'
import { FiEdit2, FiLogOut, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { useAppContext } from '../context/useAppContext'
import { formatCurrency, formatDateTime } from '../utils/format'
import type { FoodCategory, FoodItem, OrderStatus } from '../types'

const categories: FoodCategory[] = [
  'Pizza',
  'Burger',
  'Pasta',
  'Salad',
  'Dessert',
  'Beverage',
  'Starter',
]

const emptyFoodForm = {
  name: '',
  price: 0,
  image: '',
  category: 'Pizza' as FoodCategory,
  description: '',
  featured: false,
}

function AdminDashboard() {
  const {
    foodItems,
    orders,
    addFoodItem,
    updateFoodItem,
    deleteFoodItem,
    updateOrderStatus,
    logoutAdmin,
  } = useAppContext()
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null)
  const [form, setForm] = useState(emptyFoodForm)

  const totalRevenue = orders
    .filter((order) => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name || !form.image || !form.description || form.price <= 0) {
      return
    }

    if (editingItem) {
      updateFoodItem(editingItem.id, form)
      setEditingItem(null)
    } else {
      addFoodItem(form)
    }

    setForm(emptyFoodForm)
  }

  const handleEdit = (item: FoodItem) => {
    setEditingItem(item)
    setForm({
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      description: item.description,
      featured: Boolean(item.featured),
    })
  }

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status)
  }

  return (
    <div className="min-h-screen bg-stone-950 px-4 py-8 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-gradient-to-r from-stone-900 via-stone-950 to-amber-950/50 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Admin Control Room</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Restaurant Operations Dashboard</h1>
            <p className="mt-3 max-w-2xl text-stone-300">
              Manage menu items, monitor incoming orders, and keep kitchen delivery statuses updated.
            </p>
          </div>
          <button
            type="button"
            onClick={logoutAdmin}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-red-400/40 hover:bg-red-400/10"
          >
            <FiLogOut />
            Logout
          </button>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-stone-400">Total Orders</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{orders.length}</h2>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-stone-400">Delivered Revenue</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{formatCurrency(totalRevenue)}</h2>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-stone-400">Menu Items</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{foodItems.length}</h2>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2">
              <FiPlusCircle className="text-amber-300" />
              <h2 className="text-2xl font-semibold text-white">
                {editingItem ? 'Edit Food Item' : 'Add Food Item'}
              </h2>
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <label className="space-y-2">
                <span className="text-sm text-stone-300">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
                  placeholder="Dish name"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-stone-300">Price</span>
                <input
                  required
                  min={1}
                  type="number"
                  value={form.price}
                  onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
                  className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
                  placeholder="299"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-stone-300">Image URL</span>
                <input
                  required
                  value={form.image}
                  onChange={(event) => setForm({ ...form, image: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
                  placeholder="https://..."
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-stone-300">Category</span>
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value as FoodCategory })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm text-stone-300">Description</span>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-stone-900/70 px-4 py-3 outline-none transition focus:border-amber-300"
                  placeholder="Tell customers what makes this dish special."
                />
              </label>

              <label className="flex items-center gap-3 text-sm text-stone-300 md:col-span-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) => setForm({ ...form, featured: event.target.checked })}
                  className="h-4 w-4 rounded border-white/10 bg-stone-900"
                />
                Mark as featured on the home page
              </label>

              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-amber-400 px-5 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
                >
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null)
                      setForm(emptyFoodForm)
                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-white/20"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Manage Menu</h2>
            <div className="mt-6 space-y-4">
              {foodItems.map((item) => (
                <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-stone-900/50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="mt-1 text-sm text-stone-400">
                        {item.category} • {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:border-amber-300/50"
                        aria-label={`Edit ${item.name}`}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteFoodItem(item.id)}
                        className="rounded-full border border-red-400/30 bg-red-400/10 p-2 text-red-200 transition hover:bg-red-400/20"
                        aria-label={`Delete ${item.name}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-stone-300">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Manage Orders</h2>
          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left">
                <thead className="bg-stone-900/80 text-sm uppercase tracking-[0.2em] text-stone-400">
                  <tr>
                    <th className="px-4 py-4">Order</th>
                    <th className="px-4 py-4">Customer</th>
                    <th className="px-4 py-4">Amount</th>
                    <th className="px-4 py-4">Placed</th>
                    <th className="px-4 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-stone-950/40 text-sm">
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-stone-400">
                        No orders yet. Customer orders will appear here.
                      </td>
                    </tr>
                  )}

                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-white">{order.id}</p>
                        <p className="mt-1 text-stone-400">{order.items.length} dishes</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-white">{order.customerName}</p>
                        <p className="mt-1 text-stone-400">{order.phone}</p>
                      </td>
                      <td className="px-4 py-4 font-semibold text-amber-300">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-4 py-4 text-stone-300">{formatDateTime(order.createdAt)}</td>
                      <td className="px-4 py-4">
                        <select
                          value={order.status}
                          onChange={(event) =>
                            handleStatusChange(order.id, event.target.value as OrderStatus)
                          }
                          className="rounded-full border border-white/10 bg-stone-900/80 px-4 py-2 capitalize outline-none transition focus:border-amber-300"
                        >
                          <option value="pending">pending</option>
                          <option value="preparing">preparing</option>
                          <option value="delivered">delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
