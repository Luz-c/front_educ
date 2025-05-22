import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const studentFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  compositionNumber: z.string().min(4, {
    message: "Veuillez entrer un numéro de composition valide.",
  }),
});

const StudentLoginForm = ({ examId, onSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      compositionNumber: "",
    },
  });
  
  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Mock validation for composition number (in a real app this would check against stored numbers)
    setTimeout(() => {
      // Store the student info in localStorage
      const studentInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        compositionNumber: data.compositionNumber,
        examId: examId,
        accessTime: new Date().toISOString()
      };
      
      localStorage.setItem(`student-auth-${examId}`, JSON.stringify(studentInfo));
      
      setIsSubmitting(false);
      
      toast({
        title: "Authentification réussie",
        description: "Vous allez être redirigé vers l'examen.",
      });
      
      // Call success callback
      onSuccess();
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Identification de l'étudiant</CardTitle>
        <CardDescription>
          Veuillez vous identifier pour accéder à l'examen
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre.email@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="compositionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de composition</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: EXAM-123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Vérification..." : "Accéder à l'examen"}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Ce numéro de composition vous a été fourni par votre professeur
      </CardFooter>
    </Card>
  );
};

export default StudentLoginForm;