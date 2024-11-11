import { MercadoPagoConfig, Preference } from "mercadopago";
import { ISuscriptionType } from "./interfaces/ISuscriptionType";
import { ICourse } from "./interfaces/Icourse";

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const api = {
  course: {
    async purchase(
      userId: string,
      suscription: ISuscriptionType,
      course: ICourse
    ) {
      const price = Number(suscription.price);
      // Crea la preferencia para el curso
      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: suscription.id,
              title: suscription.name,
              description: suscription.type,
              unit_price: price || 400,
              quantity: 1,
            },
          ],
          back_urls: {
            success: `${process.env.MP_SUCCESS_BACK_URL}/${course.id}`,
          },
          external_reference: userId,
        },
      });

      return preference.init_point!; // URL de pago
    },
  },
};

export default api;
