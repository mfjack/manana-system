"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, name, description, price } = body;

    if (!name || !price) {
      return NextResponse.json({ message: "Nome e preço são obrigatórios." }, { status: 400 });
    }

    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json({ success: false, error: "Preço deve ser um número positivo" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        image,
        name,
        description,
        price,
      },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao adicionar produto." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar produtos." }, { status: 500 });
  }
}
