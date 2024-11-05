"use server";
import api from "@/api";
import { ICourse } from "@/interfaces/Icourse";
import { ISuscriptionType } from "@/interfaces/ISuscriptionType";

export async function purchaseCourse(
  userId: string,
  suscription: ISuscriptionType,
  course: ICourse
) {
  const url = await api.course.purchase(userId, suscription, course);
  return url;
}
