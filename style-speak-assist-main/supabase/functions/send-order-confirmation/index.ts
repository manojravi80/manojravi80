import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  customerName: string;
  customerEmail: string;
  orderTotal: number;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  deliveryDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      customerName, 
      customerEmail, 
      orderTotal, 
      orderItems, 
      deliveryDate 
    }: OrderConfirmationRequest = await req.json();

    const itemsHtml = orderItems.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString()}</td>
      </tr>`
    ).join('');

    const emailResponse = await resend.emails.send({
      from: "Snapcart <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Order Confirmation - Snapcart",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Snapcart</h1>
            <p style="color: white; margin: 5px 0 0 0;">Order Confirmation</p>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #333;">Thank you for your order, ${customerName}!</h2>
            <p style="color: #666;">Your order has been confirmed and will be delivered by <strong>${deliveryDate}</strong>.</p>
            
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Order Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f5f5f5;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #ddd;">Total:</td>
                    <td style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #ddd; color: #667eea;">₹${orderTotal.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div style="background: #e8f4f8; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #333;">Delivery Information</h4>
              <p style="margin: 0; color: #666;">Expected delivery: <strong>${deliveryDate}</strong></p>
              <p style="margin: 5px 0 0 0; color: #666;">You will receive a tracking notification once your order ships.</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              If you have any questions about your order, please don't hesitate to contact our customer support.
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 12px;">
                Thank you for shopping with Snapcart!<br>
                This is an automated email, please do not reply.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Order confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);