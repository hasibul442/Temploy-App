export function CommonValidation(values) {
  if (values.fname == "")
    return { field: "fname", message: "First name is required" };

  if (values.lname == "")
    return { field: "lname", message: "Last name is required" };

  if (values.email == "") return { field: "email", message: "Email is required" };

  if (values.email && !/\S+@\S+\.\S+/.test(values.email))
    return { field: "email", message: "Enter a valid email" };

  if (values.password == "")
    return { field: "password", message: "Password is required" };

  if (values.password.length < 6)
    return {
      field: "password",
      message: "Password must be at least 6 characters",
    };

  if (values.phone=="")
    return { field: "phone", message: "Phone number is required" };

  if (values.phone && !/^\d{10}$/.test(values.phone))
    return { field: "phone", message: "Enter a valid 10-digit phone number" };

  return null; // no errors
}
