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

  // 🔥 إرسال البيانات إلى Telegram
  const sendToTelegram = async () => {
    const BOT_TOKEN = "8443764227:AAHnOFSJ5xSlOkZhN0AGnWi3sG6piCmvFUU"; // ضع توكن البوت هنا
    const CHAT_ID = "1230522788"; // ضع معرف الدردشة هنا

    const message = `
📩 *New Quote Request*

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
🚗 Car: ${formData.year} ${formData.make} ${formData.model}
⚙ Status: ${formData.condition}
📍 ZIP: ${formData.zipCode}
📝 Details: ${formData.description || "No details"}
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: 1230522788,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendToTelegram(); // إرسال الطلب مباشرة للتلجرام
    setSubmitted(true);

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
    }, 2000);
  };

  return (
    <div id="quote-form" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Get Your Free Quote</h2>
          <p className="text-gray-600">
            Fill out the form below and we'll get back to you with an offer within minutes!
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>
              Tell us about your vehicle to get an accurate quote
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-green-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  We've received your request. Our team will contact you shortly with a quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

              
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                      placeholder="2015"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="make">Make *</Label>
                    <Input
                      id="make"
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      required
                      placeholder="Toyota"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      required
                      placeholder="Camry"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => setFormData({ ...formData, condition: value })}
                      required
                    >
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="not-running">Not Running</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                        <SelectItem value="totaled">Totaled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      required
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us more about your vehicle's condition, mileage, etc."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Get My Free Quote
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
