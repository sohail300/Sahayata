import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { ApiResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";
import { api } from "@/utils/config";
import { passwordSchema, passwordType } from "@/types/districtAdminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { token } = useParams();

  const form = useForm<passwordType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: passwordType) {
    try {
      setIsSubmitting(true);
      const response = await api.post("/district/resetPassword", {
        ...values,
        token,
      });
      console.log(response);

      if (response.data.success) {
        toast({
          title: "Password changed!",
          style: {
            backgroundColor: "#dff0e0",
            borderColor: "#7f9f7f",
            color: "#388e3c",
          },
        });
        navigate("/districtadmin/login");
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-orange-500 mb-2">Sahayta</h1>
            <p className="text-emerald-600 text-sm">Reset Your Password</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center group"
                disabled={isSubmitting}
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-emerald-600 text-center w-full">
            Remember your password?{" "}
            <NavLink
              to={"/districtadmin/login"}
              className="font-semibold hover:underline"
            >
              Login here
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
