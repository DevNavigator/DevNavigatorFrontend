import api, { mercadopago } from "@/api";
import { Payment } from "mercadopago";
import { createSubscription } from "@/services/subsService";

export async function POST(req: Request) {
  const body: { action: string; data: { id: string }; type: string } =
    await req.json();
  if (body.action === "payment.created" && body.type === "payment") {
    const paymentId = body.data.id;

    try {
      const payment = await new Payment(mercadopago).get({ id: paymentId });

      if (payment.status === "approved") {
        const userId = payment.external_reference;
        if (userId) {
          await createSubscription(userId);
          console.log("Suscripción creada para el usuario:", userId);
        }
      }
    } catch (error) {
      console.error("Error al obtener el pago desde MercadoPago:", error);
    }
  } else {
    console.log("Notificación ignorada: no es una acción de pago.");
  }
  return new Response(null, { status: 200 });
}
