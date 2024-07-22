import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
import { emailSchema, emailType } from "@/types/districtAdminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<emailType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: emailType) {
    try {
      setIsSubmitting(true);
      const response = await api.post("/district/forgotPassword", values);

      if (response.data.success) {
        toast({
          title: "Email sent!",
          description: "Please check your email",
          style: {
            backgroundColor: "#dff0e0",
            borderColor: "#7f9f7f",
            color: "#388e3c",
          },
        });
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

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-orange-500 mb-2">Sahayta</h1>
            <p className="text-emerald-600 text-sm">Forgot Password</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Email
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
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center group"
                disabled={isSubmitting}
              >
                Send Email
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleBack}
            className="bg-white hover:bg-white border-gray-200 hover:border-gray-300 border text-emerald-600 hover:text-emerald-700 font-semibold flex items-center justify-center transition duration-300 ease-in-out w-full"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Login</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
