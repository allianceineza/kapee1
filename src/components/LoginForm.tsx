function LoginForm() {
  return (
    <form className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-300 hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
