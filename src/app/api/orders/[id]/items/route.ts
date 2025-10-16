"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: orderId } = await params;
    const { productId, quantity = 1, notes } = await request.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    const existingItem = await prisma.orderItem.findFirst({
      where: {
        orderId,
        productId,
      },
    });

    let orderItem;

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      const newTotalPrice = newQuantity * product.price;

      orderItem = await prisma.orderItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
          totalPrice: newTotalPrice,
          notes: notes || existingItem.notes,
        },
        include: {
          product: true,
        },
      });
    } else {
      orderItem = await prisma.orderItem.create({
        data: {
          orderId,
          productId,
          quantity,
          unitPrice: product.price,
          totalPrice: product.price * quantity,
          notes,
        },
        include: {
          product: true,
        },
      });
    }

    const allItems = await prisma.orderItem.findMany({
      where: { orderId },
    });

    const newTotal = allItems.reduce((sum, item) => sum + item.totalPrice, 0);

    await prisma.order.update({
      where: { id: orderId },
      data: {
        total: newTotal,
        status: "OCCUPIED",
      },
    });

    return NextResponse.json(orderItem);
  } catch (error) {
    console.error("Erro ao adicionar item ao pedido:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: orderId } = await params;

    const items = await prisma.orderItem.findMany({
      where: { orderId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens do pedido:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
