"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string; itemId: string }> }) {
  try {
    const { id: orderId, itemId } = await params;

    const item = await prisma.orderItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    }

    await prisma.orderItem.delete({
      where: { id: itemId },
    });

    const remainingItems = await prisma.orderItem.findMany({
      where: { orderId },
    });

    const newTotal = remainingItems.reduce((sum, item) => sum + item.totalPrice, 0);

    await prisma.order.update({
      where: { id: orderId },
      data: {
        total: newTotal,
        status: remainingItems.length === 0 ? "FREE" : "OCCUPIED",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao remover item:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string; itemId: string }> }) {
  try {
    const { id: orderId, itemId } = await params;
    const { quantity } = await request.json();

    if (quantity <= 0) {
      return NextResponse.json({ error: "Quantidade deve ser maior que zero" }, { status: 400 });
    }

    const item = await prisma.orderItem.findUnique({
      where: { id: itemId },
      include: { product: true },
    });

    if (!item) {
      ("");
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    }

    const updatedItem = await prisma.orderItem.update({
      where: { id: itemId },
      data: {
        quantity,
        totalPrice: quantity * item.product.price,
      },
      include: {
        product: true,
      },
    });

    const allItems = await prisma.orderItem.findMany({
      where: { orderId },
    });

    const newTotal = allItems.reduce((sum, item) => sum + item.totalPrice, 0);

    await prisma.order.update({
      where: { id: orderId },
      data: {
        total: newTotal,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
