import { BadRequestException, Injectable } from "@nestjs/common";
import Razorpay from 'razorpay';

@Injectable()
export class GetRazorPayLinkService {
    constructor(
    ) { }

    async GetRazorPayLink() {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const razorOrder = await razorpay.orders.create({
            amount: 1000, // Amount in paise
            currency: "INR",
        });

        return {
            data: razorOrder
        };
    }
}