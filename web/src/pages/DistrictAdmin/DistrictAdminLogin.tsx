import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/config";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { loginSchema, loginType } from "@/types/districtAdminSchema";

export default function DistrictAdminLogin() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      number: "",
      password: "",
    },
  });

  async function onSubmit(values: loginType) {
    try {
      setIsSubmitting(true);
      const response = await api.post("/district/login", values);
      console.log(response);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/districtadmin/homepage");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(axiosError);

      if (axiosError.response) {
        toast({
          variant: "destructive",
          title: axiosError.response.data.msg,
          description: "Please try again",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error logging in",
          description: "Please try again",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">Sahayta</h1>
          <p className="text-emerald-600 mt-2">District Admin Login</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={`w-full bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              Login
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <NavLink
            to={"/districtadmin/forgotpassword"}
            className="text-sm text-emerald-600 hover:underline"
          >
            Forgot password?
          </NavLink>
        </div>
      </div>
    </div>
  );
}
