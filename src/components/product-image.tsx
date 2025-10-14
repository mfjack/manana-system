import Image from "next/image";

type ProductImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  size?: number;
};

export function ProductImage({ src, alt, className = "", size = 64 }: ProductImageProps) {
  if (!src || src.trim() === "") {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center rounded ${className}`}
        style={{ width: size, height: size }}
      >
        Sem imagem
      </div>
    );
  }

  // Verificar se é uma imagem base64
  const isBase64 = src.startsWith("data:image/");

  if (isBase64) {
    return (
      <img
        src={src}
        alt={alt}
        className={`object-cover rounded ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Para URLs normais, usar o componente Image do Next.js
  return (
    <div
      className={`relative overflow-hidden rounded ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
