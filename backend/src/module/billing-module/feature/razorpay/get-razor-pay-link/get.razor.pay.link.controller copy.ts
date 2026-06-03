
import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { GetRazorPayLinkService } from "./get.razor.pay.link.service";

@Controller()
export class GetRazorPayLinkController {
    constructor(private readonly getRazorPayLinkService: GetRazorPayLinkService) { }

    @Get("/razor/pay/link")
    async GetRazorPayLink(@Req() req: Request) {
        const { data } = await this.getRazorPayLinkService.GetRazorPayLink();
        return {
            data: data,
            message: "Razor Pay link Created successfully"
        };
    }
}