import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { loginSchema, loginType } from "@/types/districtAdminSchema";

const AdminLogin = () => {
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
      const response = await api.post("/admin/login", values);
      console.log(response);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin/homepage");
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
          <p className="text-emerald-600 mt-2">Admin Login</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <Dialog>
            <DialogTrigger className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-200 ease-in-out underline-offset-2 hover:underline">
              Forgot password?
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Password Recovery
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm text-gray-500">
                  Contact your District Admin to change your password.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-2 sm:flex sm:flex-row-reverse">
                <DialogClose className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
