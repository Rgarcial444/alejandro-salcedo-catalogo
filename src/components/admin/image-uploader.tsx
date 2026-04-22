import * as React from "react";
import { useRef, useState } from "react";
import { Upload, Trash2, Star, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  onChange: (next: string[]) => void;
};

const MAX_BYTES = 4 * 1024 * 1024; // 4MB por imagen para no saturar localStorage

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUploader({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const addFiles = async (files: FileList | File[]) => {
    setError(null);
    setBusy(true);
    try {
      const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
      const tooBig = arr.find((f) => f.size > MAX_BYTES);
      if (tooBig) {
        setError(`La imagen "${tooBig.name}" supera los 4 MB.`);
      }
      const ok = arr.filter((f) => f.size <= MAX_BYTES);
      const urls = await Promise.all(ok.map(fileToDataUrl));
      onChange([...images, ...urls]);
    } finally {
      setBusy(false);
    }
  };

  const remove = (i: number) => onChange(images.filter((_, j) => j !== i));

  const makeCover = (i: number) => {
    if (i === 0) return;
    const next = [...images];
    const [item] = next.splice(i, 1);
    next.unshift(item);
    onChange(next);
  };

  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border bg-muted/40 hover:bg-muted/60",
        )}
      >
        <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">
          Arrastra fotos aquí o{" "}
          <span className="text-primary underline-offset-4 underline">
            elige desde tu dispositivo
          </span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          JPG, PNG o WEBP · hasta 4 MB cada una. La primera será la portada.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
      {busy && <p className="text-xs text-muted-foreground">Procesando imágenes…</p>}

      {/* Grid con drag para reordenar */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => {
                e.preventDefault();
                setOverIndex(i);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIndex !== null) reorder(dragIndex, i);
                setDragIndex(null);
                setOverIndex(null);
              }}
              className={cn(
                "group relative rounded-xl overflow-hidden border bg-card transition-all",
                dragIndex === i && "opacity-40",
                overIndex === i && dragIndex !== i && "ring-2 ring-primary",
              )}
            >
              <div className="aspect-[4/3] bg-muted">
                <img
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>

              {i === 0 && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-foreground text-background text-[10px] font-medium px-2 py-0.5 rounded-full">
                  <Star className="h-3 w-3 fill-current" /> Portada
                </span>
              )}

              <div className="absolute top-2 right-2 cursor-grab active:cursor-grabbing bg-background/90 backdrop-blur rounded-md p-1 border border-border opacity-0 group-hover:opacity-100 transition">
                <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-2 flex gap-1.5 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                {i !== 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-7 px-2 text-[11px]"
                    onClick={() => makeCover(i)}
                  >
                    <Star className="h-3 w-3" /> Portada
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="h-7 px-2 text-[11px] ml-auto"
                  onClick={() => remove(i)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              <span className="absolute bottom-1 left-2 text-[10px] text-white/90 drop-shadow opacity-0 group-hover:opacity-100">
                #{i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Aún no has agregado fotos. Sube al menos una para guardar el auto.
        </p>
      )}
    </div>
  );
}
