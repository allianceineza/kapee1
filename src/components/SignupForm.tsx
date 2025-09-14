import { useState, useCallback, useMemo } from "react";
import { X, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import {Link} from "react-router-dom";
type AuthModalProps = {
  onClose: () => void;
  onSuccess?: (userData: any) => void;
};

interface FormData {
  Name: string;
  Email: string;
  Password: string;
  confirmPassword: string;
  Role: string;
}

interface ValidationErrors {
  Name?: string;
  Email?: string;
  Password?: string;
  confirmPassword?: string;
  general?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  token?: string;
  errors?: ValidationErrors;
}

const SignupModal = ({ onClose, onSuccess }: AuthModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    Name: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    Role: "user"
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Simplified validation that doesn't require touched fields for basic form completion
  const basicFormComplete = useMemo(() => {
    return formData.Name.trim() && 
           formData.Email.trim() && 
           formData.Password && 
           formData.confirmPassword &&
           formData.Password === formData.confirmPassword;
  }, [formData]);

  // Real-time validation (only for touched fields)
  const fieldValidations = useMemo(() => {
    const validations: ValidationErrors = {};
    
    if (touchedFields.has('Name') && !formData.Name.trim()) {
      validations.Name = "Full name is required";
    } else if (touchedFields.has('Name') && formData.Name.length < 2) {
      validations.Name = "Name must be at least 2 characters";
    }
    
    if (touchedFields.has('Email') && !formData.Email.trim()) {
      validations.Email = "Email is required";
    } else if (touchedFields.has('Email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.Email)) {
        validations.Email = "Please enter a valid email address";
      }
    }
    
    if (touchedFields.has('Password') && !formData.Password) {
      validations.Password = "Password is required";
    } else if (touchedFields.has('Password')) {
      if (formData.Password.length < 6) {
        validations.Password = "Password must be at least 6 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.Password)) {
        validations.Password = "Password must contain uppercase, lowercase, and number";
      }
    }
    
    if (touchedFields.has('confirmPassword') && formData.confirmPassword !== formData.Password) {
      validations.confirmPassword = "Passwords do not match";
    }
    
    return validations;
  }, [formData, touchedFields]);

  // Password strength indicator
  const passwordStrength = useMemo(() => {
    if (!formData.Password) return { score: 0, label: "", color: "" };
    
    let score = 0;
    const tests = [
      formData.Password.length >= 6,
      /[a-z]/.test(formData.Password),
      /[A-Z]/.test(formData.Password),
      /\d/.test(formData.Password),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.Password),
      formData.Password.length >= 10
    ];
    
    score = tests.filter(Boolean).length;
    
    if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
    if (score <= 4) return { score, label: "Medium", color: "bg-yellow-500" };
    return { score, label: "Strong", color: "bg-green-500" };
  }, [formData.Password]);

  // Handle input changes with touch tracking
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(name));
    
    // Clear server errors when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  }, [errors.general]);

  // Handle field blur for validation
  const handleFieldBlur = useCallback((fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  }, []);

  
  const signupUser = useCallback(async (userData: Omit<FormData, 'confirmPassword'>): Promise<ApiResponse> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch("http://localhost:3000/api/user/SignupForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        // Handle different types of errors
        if (response.status === 400 && data.errors) {
          return { success: false, errors: data.errors };
        }
        if (response.status === 409) {
          return { success: false, errors: { Email: "Email already exists" } };
        }
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      return { 
        success: true, 
        data: data.user, // Your controller returns user object here
        token: data.user.tokens?.accessToken, // Access token from user.tokens
        message: data.message || "Account created successfully!"
      };
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Signup error:", error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return { success: false, message: "Request timed out. Please try again." };
        }
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          return { success: false, message: "Network error. Please check your connection." };
        }
        return { success: false, message: error.message };
      }
      
      return { success: false, message: "An unexpected error occurred" };
    }
  }, []);

  // Form validation for submission
  const validateFormForSubmission = useCallback(() => {
    const validations: ValidationErrors = {};
    
    if (!formData.Name.trim()) {
      validations.Name = "Full name is required";
    } else if (formData.Name.length < 2) {
      validations.Name = "Name must be at least 2 characters";
    }
    
    if (!formData.Email.trim()) {
      validations.Email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.Email)) {
        validations.Email = "Please enter a valid email address";
      }
    }
    
    if (!formData.Password) {
      validations.Password = "Password is required";
    } else {
      if (formData.Password.length < 6) {
        validations.Password = "Password must be at least 6 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.Password)) {
        validations.Password = "Password must contain uppercase, lowercase, and number";
      }
    }
    
    if (formData.confirmPassword !== formData.Password) {
      validations.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(validations).length > 0) {
      setErrors(validations);
      setTouchedFields(new Set(['Name', 'Email', 'Password', 'confirmPassword']));
      return false;
    }
    
    return true;
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Button clicked!"); // Debug log
    console.log("Form data:", formData); // Debug log
    console.log("Basic form complete:", basicFormComplete); // Debug log
    
    if (!validateFormForSubmission()) {
      console.log("Validation failed"); // Debug log
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess("");

    try {
      const { confirmPassword, ...apiData } = formData;
      console.log("Sending to API:", apiData); // Debug log
      
      const result = await signupUser(apiData);
      console.log("API result:", result); // Debug log
      
      if (result.success) {
        setSuccess(result.message || "Account created successfully!");
        
        // Store authentication data
        if (result.token) {
          localStorage.setItem("authToken", result.token);
          localStorage.setItem("userEmail", result.data.Email || "");
          localStorage.setItem("userName", result.data.Name || "");
          localStorage.setItem("userRole", result.data.Role || "");
        }
        
        // Call success callback
        onSuccess?.(result.data);
        
        // Close modal after delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message || "Signup failed. Please try again." });
        }
      }
    } catch (error) {
      console.error("Submission error:", error); // Debug log
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  }, [formData, validateFormForSubmission, signupUser, onSuccess, onClose, basicFormComplete]);

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Debug Info - Remove in production */}
        {/* <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
          <div>Form Complete: {basicFormComplete ? "✅" : "❌"}</div>
          <div>Loading: {loading ? "Yes" : "No"}</div>
          <div>Errors: {Object.keys(fieldValidations).length}</div>
          <div>Name: "{formData.Name}"</div>
          <div>Email: "{formData.Email}"</div>
          <div>Password: "{formData.Password ? "***" : ""}"</div>
          <div>Confirm: "{formData.confirmPassword ? "***" : ""}"</div>
        </div> */}

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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us today and get started</p>
        </div>

        {/* Global Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-red-700 text-sm">{errors.general}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
            <CheckCircle className="text-green-500" size={20} />
            <span className="text-green-700 text-sm">{success}</span>
          </div>
        )}

        <div>
          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              onBlur={() => handleFieldBlur('Name')}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
                errors.Name 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              disabled={loading}
            />
            {errors.Name && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.Name}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              onBlur={() => handleFieldBlur('Email')}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
                errors.Email 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              disabled={loading}
            />
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
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('Password')}
                placeholder="Create a password"
                className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
                  errors.Password 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.Password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{passwordStrength.label}</span>
                </div>
              </div>
            )}
            
            {errors.Password && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.Password}</span>
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('confirmPassword')}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none ${
                  errors.confirmPassword 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle size={16} />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>

          {/* Role Select */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select 
              name="Role"
              value={formData.Role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button - Always enabled for debugging */}
          <button 
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-blue-700 text-white transform hover:scale-[1.02]"
            style={{ cursor: 'pointer' }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account </span>
            )}
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors">
             <Link to="/LoginForm"> Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;