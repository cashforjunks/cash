import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    condition: "",
    zipCode: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // إرسال البيانات للواتساب API Backend
    await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // إعادة تعيين الحقول
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        year: "",
        make: "",
        model: "",
        condition: "",
        zipCode: "",
        description: "",
      });
    }, 3000);
  };

  return (
    <div id="quote-form" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Get Your Free Quote</h2>
          <p className="text-gray-600">Fill out the form below and we'll contact you shortly.</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>Provide info to receive a quote</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="text-green-600 text-2xl mb-3">Thank You!</h3>
                <p>Your request has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Full Name *</Label>
                    <Input value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} required />
                  </div>

                  <div>
                    <Label>Phone Number *</Label>
                    <Input type="tel" value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div><Label>Year *</Label><Input value={formData.year} onChange={(e)=>setFormData({...formData,year:e.target.value})} required/></div>
                  <div><Label>Make *</Label><Input value={formData.make} onChange={(e)=>setFormData({...formData,make:e.target.value})} required/></div>
                  <div><Label>Model *</Label><Input value={formData.model} onChange={(e)=>setFormData({...formData,model:e.target.value})} required/></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Condition *</Label>
                    <Select value={formData.condition} onValueChange={(v)=>setFormData({...formData,condition:v})} required>
                      <SelectTrigger><SelectValue placeholder="Select condition"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="not-running">Not Running</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                        <SelectItem value="totaled">Totaled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>ZIP Code *</Label>
                    <Input value={formData.zipCode} onChange={(e)=>setFormData({...formData,zipCode:e.target.value})} required />
                  </div>
                </div>

                <div>
                  <Label>Additional Details</Label>
                  <Textarea rows={4} value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})}/>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Send Request
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
