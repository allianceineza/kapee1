import { useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  X,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  Lock,
} from "lucide-react";

type AuthModalProps = {
  onClose: () => void;
  onSuccess?: (userData: any) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
};

interface LoginFormData {
  Email: string;
  Password: string;
}

interface ValidationErrors {
  Email?: string;
  Password?: string;
  general?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  token?: string;
  errors?: ValidationErrors;
}

const LoginModal = ({
  onClose,
  onSuccess,
  onForgotPassword,
  onSignUp,
}: AuthModalProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [rememberMe, setRememberMe] = useState(false);

  // Real-time validation
  const fieldValidations = useMemo(() => {
    const validations: ValidationErrors = {};

    if (touchedFields.has("Email") && !formData.Email.trim()) {
      validations.Email = "Email is required";
    } else if (touchedFields.has("Email")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.Email)) {
        validations.Email = "Please enter a valid email address";
      }
    }

    if (touchedFields.has("Password") && !formData.Password) {
      validations.Password = "Password is required";
    } else if (touchedFields.has("Password") && formData.Password.length < 3) {
      validations.Password = "Password is too short";
    }

    return validations;
  }, [formData, touchedFields]);

  // Handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setTouchedFields((prev) => new Set(prev).add(name));

      if (errors.general) {
        setErrors((prev) => ({ ...prev, general: undefined }));
      }
    },
    [errors.general]
  );

  const handleFieldBlur = useCallback((fieldName: string) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName));
  }, []);

  // API call
  const loginUser = useCallback(
    async (userData: LoginFormData): Promise<ApiResponse> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 400 && data.errors) {
            return { success: false, errors: data.errors };
          }
          if (response.status === 401) {
            return {
              success: false,
              errors: { general: "Invalid email or password" },
            };
          }
          if (response.status === 404) {
            return { success: false, errors: { Email: "Account not found" } };
          }
          throw new Error(data.message || `Server error: ${response.status}`);
        }

        return {
          success: true,
          data,
          token: data.tokens?.accessToken || data.accessToken || data.token,
          message: data.message || "Login successful!",
        };
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Login error:", error);

        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return {
              success: false,
              message: "Request timed out. Please try again.",
            };
          }
          if (
            error.message.includes("NetworkError") ||
            error.message.includes("Failed to fetch")
          ) {
            return {
              success: false,
              message: "Network error. Please check your connection.",
            };
          }
          return { success: false, message: error.message };
        }

        return { success: false, message: "An unexpected error occurred" };
      }
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    const allFields = new Set(["Email", "Password"]);
    setTouchedFields(allFields);

    const validationErrors = {
      ...fieldValidations,
      ...(Object.keys(fieldValidations).length === 0 ? {} : fieldValidations),
    };

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    return true;
  }, [fieldValidations]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setLoading(true);
      setErrors({});
      setSuccess("");

      try {
        const result = await loginUser(formData);

        if (result.success) {
          setSuccess(result.message || "Login successful!");

          if (result.token) {
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem("authToken", result.token);
            storage.setItem("userEmail", result.data?.Email || formData.Email);
            storage.setItem("userName", result.data?.Name || "");
            storage.setItem("userRole", result.data?.Role || "user");
            storage.setItem("loginTime", new Date().toISOString());
          }

          onSuccess?.(result.data);

          // ✅ Redirect based on role
          setTimeout(() => {
            if (result.data?.Role === "admin") {
              navigate("/dashboard");
            } else {
              navigate("/home");
            }
            onClose();
          }, 1500);
        } else {
          if (result.errors) {
            setErrors(result.errors);
          } else {
            setErrors({
              general: result.message || "Login failed. Please try again.",
            });
          }
        }
      } catch (error) {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, validateForm, loginUser, onSuccess, onClose, rememberMe, navigate]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        !loading &&
        formData.Email &&
        formData.Password
      ) {
        handleSubmit(e as any);
      }
    },
    [handleSubmit, loading, formData]
  );

  const isFormValid =
    Object.keys(fieldValidations).length === 0 &&
    formData.Email &&
    formData.Password;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={loading}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Global Error */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-red-700 text-sm">{errors.general}</span>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-green-700 text-sm">{success}</span>
          </div>
        )}

        <div onKeyPress={handleKeyPress}>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur("Email")}
                placeholder="Enter your email"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
                  errors.Email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                disabled={loading}
                autoComplete="email"
              />
              <Mail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            {errors.Email && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.Email}</span>
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur("Password")}
                placeholder="Enter your password"
                className={`w-full pl-12 pr-12 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
                  errors.Password
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                disabled={loading}
                autoComplete="current-password"
              />
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.Password && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.Password}</span>
              </p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                disabled={loading}
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-black hover:text-blue-800 font-medium transition-colors"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              loading || !isFormValid
                ? "bg-yellow-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            }`}
            disabled={loading || !isFormValid}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          
        </div>

        {/* Sign Up */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSignUp}
              className="text-black hover:text-blue-800 font-medium cursor-pointer transition-colors"
              disabled={loading}
            >
              <Link to="/SignupForm">Sign Up</Link>
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your login is secured with industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
